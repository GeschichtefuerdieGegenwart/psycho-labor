/* Block Motivation – gemeinsame Werkzeuge für DS 6–11.
   Ein Speicher für den ganzen Block, weil Motivprofil, Begriffsnetz und »Zwei Sprachen« von Stunde zu Stunde wachsen.
   Alles bleibt im Browser; nichts wird gesendet. */
(function () {
  "use strict";
  var KEY = "psycholabor:motivation:v1";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var M = { $: $, $$: $$, esc: esc, KEY: KEY };

  /* ---------- Speicher ---------- */
  M.laden = function () {
    try { var d = JSON.parse(localStorage.getItem(KEY) || "{}"); return d && typeof d === "object" ? d : {}; } catch (e) { return {}; }
  };
  M.sichern = function (d) { try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; } };
  M.daten = M.laden();
  M.stunde = function (id) { if (!M.daten[id]) M.daten[id] = {}; return M.daten[id]; };
  M.merken = function () { if (M.aus) return; M.daten.stand = new Date().toISOString().slice(0, 10); M.sichern(M.daten); };

  /* ---------- Datei: speichern und laden (Ergebnisse brauchen eine Datei) ---------- */
  M.alsDatei = function () {
    var blob = new Blob([JSON.stringify({ art: "psycho-labor-motivation", version: 1, daten: M.daten }, null, 1)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "mein-motivprofil.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  };
  M.ausDatei = function (file, fertig) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var j = JSON.parse(r.result);
        if (!j || j.art !== "psycho-labor-motivation" || !j.daten) throw 0;
        M.daten = j.daten; M.sichern(M.daten); fertig(true);
      } catch (e) { fertig(false); }
    };
    r.readAsText(file);
  };

  /* ---------- Ansicht (hell · dunkel · Beamer) ---------- */
  M.ansicht = function (select) {
    var t = "hell";
    try { t = localStorage.getItem("g-ansicht") || "hell"; } catch (e) {}
    function setzen(v) { if (v === "hell") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", v); }
    setzen(t);
    if (!select) return;
    select.value = t;
    select.addEventListener("change", function () { setzen(select.value); try { localStorage.setItem("g-ansicht", select.value); } catch (e) {} });
  };

  /* ---------- Schritte ---------- */
  M.schritte = function (opt) {
    var teile = $$(".m-schritt"), weg = $("#weg"), st = M.stunde(opt.id);
    if (!st.besucht) st.besucht = {};
    weg.innerHTML = teile.map(function (s) { return '<li><button type="button" data-ziel="' + s.id + '">' + esc(s.getAttribute("data-name")) + "</button></li>"; }).join("");
    function zeigen(id, ohneFokus) {
      var ziel = document.getElementById(id) || teile[0];
      teile.forEach(function (s) { s.classList.toggle("akt", s === ziel); });
      st.besucht[ziel.id] = 1; st.ort = ziel.id; M.merken();
      $$("button", weg).forEach(function (b) {
        var hier = b.getAttribute("data-ziel") === ziel.id;
        if (hier) { b.setAttribute("aria-current", "step"); if (b.scrollIntoView) b.scrollIntoView({ block: "nearest", inline: "center" }); } else b.removeAttribute("aria-current");
        b.classList.toggle("da", !hier && !!st.besucht[b.getAttribute("data-ziel")]);
      });
      if (location.hash !== "#" + ziel.id) history.replaceState(null, "", "#" + ziel.id);
      window.scrollTo(0, 0);
      if (!ohneFokus) { var h = $("h1,h2", ziel); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } }
      if (opt.beiWechsel) opt.beiWechsel(ziel.id);
    }
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-ziel]");
      if (b && !b.disabled) zeigen(b.getAttribute("data-ziel"));
    });
    window.addEventListener("hashchange", function () { zeigen(location.hash.slice(1), true); });
    zeigen(location.hash.slice(1) || st.ort || teile[0].id, true);
    return zeigen;
  };

  /* ---------- Festlegen: eigener Text, danach versiegelt ---------- */
  M.festlegen = function (wurzel, st, nach) {
    $$("[data-fest]", wurzel).forEach(function (box) {
      var key = box.getAttribute("data-fest"), feld = $("textarea", box), knopf = $("button", box), mind = +(box.getAttribute("data-mind") || 8);
      var zaehler = $(".m-zaehler", box), worte = box.hasAttribute("data-worte");
      function menge() { var v = feld.value.trim(); return worte ? (v ? v.split(/\s+/).length : 0) : v.length; }
      function zu() { feld.readOnly = true; knopf.hidden = true; var s = $(".g-stempel", box); if (s) s.hidden = false; $$('[data-nach="' + key + '"]').forEach(function (n) { n.hidden = false; }); }
      function pruefen() { knopf.disabled = menge() < mind; if (zaehler) zaehler.textContent = worte ? menge() + " von mindestens " + mind + " Wörtern" : ""; }
      if (st[key]) { feld.value = st[key]; zu(); }
      feld.addEventListener("input", pruefen); pruefen();
      knopf.addEventListener("click", function () { st[key] = feld.value.trim(); M.merken(); zu(); if (nach) nach(key); });
    });
  };

  /* ---------- Wahl mit gestufter Rückmeldung (Gegenwart »wahl«) ---------- */
  var WORT = { zentral: "zentral", begruendbar: "auch begründbar", kaum: "passt kaum" };
  M.wahlHTML = function (z, s) {
    var zu = !!s;
    return '<div class="g"><div class="g-wahl" data-g="wahl" data-mind="8" data-id="' + z.id + '"' + (zu ? " data-zu" : "") + "><fieldset><legend>" + esc(z.text) + "</legend>" + z.opt.map(function (o, i) {
      return '<label class="g-option" data-urteil="' + o[1] + '" data-grund="' + esc(o[2]) + '"><input type="radio" name="w-' + z.id + '" value="' + i + '"' + (s && s.o === i ? " checked" : "") + (zu ? " disabled" : "") + "><span>" + esc(o[0]) + '<span class="g-option__urteil">' + WORT[o[1]] + " – " + esc(o[2]) + "</span></span></label>";
    }).join("") + "</fieldset><label>Begründung in einem Satz<textarea rows=\"2\" maxlength=\"160\"" + (zu ? " readonly" : "") + ' placeholder="Ich wähle das, weil …">' + esc(s ? s.g : "") + '</textarea></label><div class="g-wahl__fuss"><button type="button" class="g-knopf g-knopf--primaer" data-g-festlegen' + (zu ? " disabled" : "") + '>Festlegen</button><span class="g-stempel"' + (zu ? "" : " hidden") + '>Festgelegt</span><span class="m-sr" aria-live="polite"></span></div></div></div>';
  };
  M.wahlen = function (wurzel, liste, st, nach) {
    if (!st.wahl) st.wahl = {};
    wurzel.innerHTML = liste.map(function (z) { return M.wahlHTML(z, st.wahl[z.id]); }).join("");
    if (window.Gegenwart) window.Gegenwart.init(wurzel);
    $$(".g-wahl", wurzel).forEach(function (el) {
      var feld = $("textarea", el), los = $("[data-g-festlegen]", el);
      function sperre() { if (!el.hasAttribute("data-zu")) los.disabled = !$("input:checked", el) || feld.value.trim().length < 8; }
      el.addEventListener("change", sperre); feld.addEventListener("input", sperre); sperre();
      los.addEventListener("click", function () {
        var gew = $("input:checked", el); if (!gew) return;
        st.wahl[el.getAttribute("data-id")] = { o: +gew.value, g: feld.value.trim() }; M.merken();
        if (nach) nach();
      });
    });
  };
  M.alleGewaehlt = function (liste, st) { return liste.every(function (z) { return st.wahl && st.wahl[z.id]; }); };

  /* ---------- Löschen mit Rückfrage auf der Seite ---------- */
  M.loeschen = function (opt) {
    var box = $("#loeschen"), auf = $("#loeschen-auf");
    auf.addEventListener("click", function () { box.hidden = !box.hidden; if (!box.hidden) $("button", box).focus(); });
    $("#loeschen-stunde").addEventListener("click", function () { delete M.daten[opt.id]; opt.stundeWeg(M.daten); M.sichern(M.daten); M.aus = true; location.hash = ""; location.reload(); });
    $("#loeschen-alles").addEventListener("click", function () { M.aus = true; try { localStorage.removeItem(KEY); } catch (e) {} location.hash = ""; location.reload(); });
    $("#loeschen-nein").addEventListener("click", function () { box.hidden = true; auf.focus(); });
  };

  /* ---------- Sortieren in Fächer (ab DS 7 gemeinsam genutzt) ----------
     opt: { wurzel, karten: [[text, fach, tipp]], faecher: [{id, titel, text}], st, key, mind, weiter, satz, fertigText } */
  M.sortieren = function (opt) {
    var st = opt.st, key = opt.key, w = opt.wurzel, K = opt.karten, mind = opt.mind || 5;
    if (!st[key]) st[key] = {};
    var lage = st[key], gewaehlt = null, geprueft = false;
    w.innerHTML = '<div class="m-stapel" aria-label="Kartenstapel"></div><div class="m-faecher' + (opt.klasse ? " " + opt.klasse : "") + '"></div>' +
      '<div class="g-wahl__fuss" style="margin-bottom:var(--space-4)"><button type="button" class="g-knopf g-knopf--sekundaer" data-s="pruefen" disabled>Zwischenstand prüfen</button><button type="button" class="g-knopf g-knopf--still" data-s="zurueck" hidden>Falsche Karten zurück in den Stapel</button></div><div data-s="rueck" aria-live="polite"></div>';
    var stapel = $(".m-stapel", w), faecher = $(".m-faecher", w), pruefen = $('[data-s="pruefen"]', w), zurueck = $('[data-s="zurueck"]', w), rueck = $('[data-s="rueck"]', w);
    function chip(i, extra) { return '<button type="button" class="m-chip' + (opt.satz ? " m-chip--satz" : "") + (extra || "") + '" data-k="' + i + '" aria-pressed="' + (gewaehlt === i) + '">' + esc(K[i][0]) + "</button>"; }
    function zeichnen() {
      var frei = K.map(function (k, i) { return i; }).filter(function (i) { return !lage[i]; });
      stapel.innerHTML = frei.length ? frei.map(function (i) { return chip(i); }).join("") : '<span class="m-klein">Alle Karten sind abgelegt.</span>';
      faecher.innerHTML = opt.faecher.map(function (f) {
        var drin = K.map(function (k, i) { return i; }).filter(function (i) { return lage[i] === f.id; });
        return '<div class="m-fach"><h3>' + esc(f.titel) + "</h3>" + (f.text ? "<p>" + esc(f.text) + "</p>" : "") + '<div class="m-fach__liegt">' + drin.map(function (i) { return chip(i, geprueft && K[i][1] !== f.id ? " falsch" : ""); }).join("") + '</div><button type="button" class="g-knopf g-knopf--sekundaer" data-fach="' + f.id + '"' + (gewaehlt === null ? " disabled" : "") + ">Hierhin legen</button></div>";
      }).join("");
      var n = Object.keys(lage).length;
      pruefen.disabled = n < mind; pruefen.textContent = n === K.length ? "Prüfen" : "Zwischenstand prüfen";
    }
    function fertig() { return K.every(function (k, i) { return lage[i] === k[1]; }); }
    function leeren() { geprueft = false; rueck.innerHTML = ""; zurueck.hidden = true; }
    w.addEventListener("click", function (e) {
      var c = e.target.closest(".m-chip"), f = e.target.closest("[data-fach]");
      if (c) { var i = +c.getAttribute("data-k"); if (lage[i]) { delete lage[i]; gewaehlt = i; } else gewaehlt = gewaehlt === i ? null : i; leeren(); M.merken(); zeichnen(); opt.weiter(); }
      else if (f && gewaehlt !== null) { lage[gewaehlt] = f.getAttribute("data-fach"); gewaehlt = null; leeren(); M.merken(); zeichnen(); opt.weiter(); }
    });
    pruefen.addEventListener("click", function () {
      geprueft = true; zeichnen();
      var falsch = Object.keys(lage).filter(function (i) { return lage[i] !== K[i][1]; }), n = Object.keys(lage).length;
      zurueck.hidden = !falsch.length;
      if (falsch.length) rueck.innerHTML = '<div class="m-rueck m-rueck--weiter"><strong>' + (n - falsch.length) + " von " + n + " Karten liegen passend.</strong> Überlege bei den anderen noch einmal:<ul>" + falsch.map(function (i) { return "<li><strong>" + esc(K[i][0]) + "</strong> " + esc(K[i][2]) + "</li>"; }).join("") + "</ul></div>";
      else if (n < K.length) rueck.innerHTML = '<div class="m-rueck m-rueck--gut"><strong>Bisher liegt alles passend.</strong> Lege die übrigen Karten ab.</div>';
      else { st[key + "Ok"] = true; M.merken(); rueck.innerHTML = '<div class="m-rueck m-rueck--gut"><strong>Alle Karten liegen passend.</strong> ' + esc(opt.fertigText || "") + "</div>"; }
      opt.weiter();
    });
    zurueck.addEventListener("click", function () { Object.keys(lage).forEach(function (i) { if (lage[i] !== K[i][1]) delete lage[i]; }); leeren(); M.merken(); zeichnen(); opt.weiter(); });
    zeichnen();
    if (st[key + "Ok"]) { geprueft = true; zeichnen(); rueck.innerHTML = '<div class="m-rueck m-rueck--gut"><strong>Alle Karten liegen passend.</strong> ' + esc(opt.fertigText || "") + "</div>"; }
    return { fertig: function () { return !!st[key + "Ok"] && fertig(); } };
  };

  /* ---------- Antwortskala (Stufen-Knöpfe) ---------- */
  M.skala = function (wurzel, items, stufen, ablage, nach) {
    wurzel.innerHTML = items.map(function (it, i) {
      return '<fieldset class="m-item" data-i="' + i + '"><legend>' + esc(it) + '</legend><div class="m-stufen">' + stufen.map(function (s) {
        return '<label><input type="radio" name="' + wurzel.id + i + '" value="' + s[2] + '"' + (ablage[i] === s[2] ? " checked" : "") + '><span aria-hidden="true">' + esc(s[0]) + '</span><span class="m-sr">' + esc(s[1]) + "</span></label>";
      }).join("") + "</div></fieldset>";
    }).join("");
    wurzel.addEventListener("change", function (e) { var f = e.target.closest(".m-item"); if (!f) return; ablage[f.getAttribute("data-i")] = +e.target.value; M.merken(); nach(); });
  };

  window.Motiv = M;
})();
