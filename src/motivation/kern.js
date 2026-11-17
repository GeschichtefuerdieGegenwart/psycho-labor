/* Einheit Motivation · gemeinsamer Kern (Fassung 2.0)
   Eine Bedienung für alle sechs Stunden und die Einheitsseite: Register, ein Auftrag je Seite,
   Bausteine aus Daten (window.STUNDE), Speicher im Browser, Datei, Lernmappe.
   Grundsätze: Erst festlegen, dann Rückmeldung (die Rückmeldung entsteht erst nach dem Festlegen im Dokument).
   Beim Urteilen schweigt das Gerät: Urteile bekommen Kriterien, keine Bewertung. */
(function () {
  "use strict";
  var E = window.EINHEIT || {}, ST = window.STUNDE || null;
  var KEY = "psycholabor:motivation:v2", KEY1 = "psycholabor:motivation:v1";
  var doc = document;
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function worte(t) { t = String(t || "").trim(); return t ? t.split(/\s+/).length : 0; }
  function heute() { var d = new Date(); return ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear(); }
  function el(html) { var t = doc.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  var WORT = { zentral: "zentral", begruendbar: "auch begründbar", kaum: "passt kaum" };
  var AMPEL = ["noch nicht", "teilweise", "erfüllt"];

  /* ================= Speicher ================= */
  function leer() { return { v: 2, st: {} }; }
  function uebernehmen(a) {
    /* Eingaben aus Fassung 1 (Schlüssel v1) in Fassung 2 übernehmen, soweit die Aufgaben gleich geblieben sind */
    var d = leer();
    if (!a || typeof a !== "object") return d;
    d.uebernommen = 1;
    var s6 = a.ds06, s7 = a.ds07;
    if (s6) {
      var n6 = d.st.ds06 = { uebernommen: 1, fest: {}, wahl: s6.wahl || {}, skala: {}, sort: {}, schreiben: {}, kann: s6.kann || {} };
      if (s6.test) n6.skala.m1 = s6.test;
      ["hypo", "vermutung", "diener", "jetzt"].forEach(function (k) { if (s6[k]) n6.fest[k] = s6[k]; });
      if (s6.sort) n6.sort.begriffe = { lage: s6.sort, ok: !!s6.sortOk };
      if (s6.produkt) n6.schreiben.josef = { text: s6.produkt, fest: true };
    }
    if (s7) {
      var n7 = d.st.ds07 = { uebernommen: 1, fest: {}, wahl: s7.wahl || {}, skala: {}, sort: {}, schreiben: {}, kann: s7.kann || {}, abruf: {} };
      if (s7.abruf) n7.abruf.erinnern = 1;
      if (s7.ta) n7.skala.kompetenz = s7.ta;
      if (s7.tr) n7.skala.regulation = s7.tr;
      ["hypA", "hypB", "hypC", "selbst"].forEach(function (k) { if (s7[k]) n7.fest[k] = s7[k]; });
      if (s7.josef) n7.josef = { wert: s7.josef, beleg: s7.beleg || {} };
      if (s7.kont) n7.sort.kontinuum = { lage: s7.kont, ok: !!s7.kontOk };
      if (s7.produkt) n7.schreiben.botschaft = { text: s7.produkt, fest: true };
    }
    return d;
  }
  function laden() {
    var d = null, alt = null;
    try { d = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { d = null; }
    try { alt = JSON.parse(localStorage.getItem(KEY1) || "null"); } catch (e) { alt = null; }
    if (!(d && d.v === 2 && d.st)) return uebernehmen(alt);
    /* Fassung 2 gibt es schon: Stunden aus Fassung 1, die dort noch fehlen, einmal ergänzen (egal, welche Seite zuerst geöffnet wurde) */
    if (alt && !d.uebernommen) {
      var u = uebernehmen(alt);
      Object.keys(u.st).forEach(function (id) {
        var hat = d.st[id] && Object.keys(d.st[id]).some(function (k) { var v = d.st[id][k]; if (k === "ort") return false; return v && typeof v === "object" ? Object.keys(v).length > 0 : !!v; });
        if (!hat) d.st[id] = u.st[id];
      });
      d.uebernommen = 1;
    }
    return d;
  }
  var D = laden(), aus = false;
  function sichern() { if (aus) return; D.stand = new Date().toISOString().slice(0, 10); try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} }
  function stunde(id) {
    if (!D.st[id]) D.st[id] = {};
    var S = D.st[id];
    ["fest", "wahl", "skala", "sort", "schreiben", "kann", "abruf", "ansage", "klassenbild", "regler", "eigen"].forEach(function (k) { if (!S[k] || typeof S[k] !== "object") S[k] = {}; });
    return S;
  }
  function alsDatei() {
    var blob = new Blob([JSON.stringify({ art: "psycho-labor-motivation", version: 2, daten: D }, null, 1)], { type: "application/json" });
    var a = doc.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "mein-motivprofil.json";
    doc.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }
  function ausDatei(file, fertig) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var j = JSON.parse(r.result);
        if (!j || j.art !== "psycho-labor-motivation" || !j.daten) throw 0;
        D = j.version === 2 ? j.daten : uebernehmen(j.daten);
        if (!D.st) D.st = {};
        D.v = 2; sichern(); fertig(true);
      } catch (e) { fertig(false); }
    };
    r.readAsText(file);
  }
  function allesLoeschen() { aus = true; try { localStorage.removeItem(KEY); localStorage.removeItem(KEY1); } catch (e) {} }
  function stundeLoeschen(id) { delete D.st[id]; sichern(); aus = true; }

  /* Ansicht hell · dunkel · Beamer */
  function ansichtSetzen(v) { if (!v || v === "hell") doc.documentElement.removeAttribute("data-theme"); else doc.documentElement.setAttribute("data-theme", v); }
  function ansichtLaden() { var t = "hell"; try { t = localStorage.getItem("g-ansicht") || "hell"; } catch (e) {} ansichtSetzen(t); return t; }
  ansichtLaden();
  try { if (localStorage.getItem("g-bewegung") === "weniger") doc.documentElement.setAttribute("data-bewegung", "weniger"); } catch (e) {}

  /* ================= Einheit: Begriffe, Kreis, Landkarte, Sprachen ================= */
  function stundenListe() { return (E.STUNDEN || []).filter(function (s) { return !s.ka; }); }
  function stundeVon(id) { var r = null; (E.STUNDEN || []).forEach(function (s) { if (s.id === id) r = s; }); return r; }
  function begriffeVon(id) { return Object.keys(E.BEGRIFFE || {}).filter(function (k) { return E.BEGRIFFE[k].ds === id; }); }
  function frueher(id) { var ids = stundenListe().map(function (s) { return s.id; }); var i = ids.indexOf(id); return i < 0 ? ids : ids.slice(0, i); }
  function urteilVerorten(bid, station) {
    var b = E.BEGRIFFE[bid];
    if (station === b.z) return ["zentral", b.zt];
    if (b.b && b.b[station]) return ["begruendbar", b.b[station]];
    return ["kaum", b.kt];
  }
  /* Wo liegt ein Begriff? Eigene Lage aus der Stunde, sonst (für die Übersicht) die zentrale Station, wenn gewünscht */
  function lageVon(bid, mitStandard) {
    var b = E.BEGRIFFE[bid], S = D.st[b.ds];
    if (S && S.verorten && S.verorten.lage && S.verorten.lage[bid]) return S.verorten.lage[bid];
    return mitStandard ? b.z : null;
  }
  function kreisHTML(opt) {
    /* opt: { chips: {station: [html…]}, knoepfe: bool, ziel: stationId|null, klein: bool } */
    opt = opt || {};
    var stat = E.STATIONEN || [];
    function station(s) {
      var liegt = (opt.chips && opt.chips[s.id]) || [];
      return '<section class="k-station" style="grid-area:' + s.id + '" data-station="' + s.id + '"' + (opt.ziel === s.id ? ' data-ziel="ja"' : "") + ' aria-label="Station ' + esc(s.name) + '">' +
        "<h4>" + esc(s.name) + " <small>" + esc(s.frage) + "</small></h4>" +
        '<div class="k-station__liegt">' + liegt.join("") + "</div>" +
        (opt.knoepfe ? '<button type="button" class="g-knopf g-knopf--sekundaer" data-hierhin="' + s.id + '">Hierhin legen</button>' : "") + "</section>";
    }
    return '<div class="k-kreis' + (opt.klein ? " k-kreis--klein" : "") + '" role="group" aria-label="Der Motivationskreis: Ich und Umgebung führen zu Erwartung mal Wert, daraus Motivation und Handeln, dann Ergebnis und Erklärung; die Erklärung wirkt zurück auf das Ich und die Erwartung.">' +
      '<div class="k-kreis__schiene" aria-hidden="true"><b></b><i></i><span>wirkt zurück</span></div>' +
      stat.map(station).join("") +
      '<div class="k-pfeil" style="grid-area:pf1" aria-hidden="true">↓</div><div class="k-pfeil k-pf2" style="grid-area:pf2" aria-hidden="true">↓</div>' +
      '<div class="k-mal" aria-hidden="true"><span>×</span></div>' +
      '<div class="k-pfeil" style="grid-area:pf3" aria-hidden="true">↓</div><div class="k-pfeil" style="grid-area:pf4" aria-hidden="true">↓</div><div class="k-pfeil" style="grid-area:pf5" aria-hidden="true">↓</div>' +
      "</div>";
  }
  function landkarteHTML(hierId) {
    return '<ol class="k-landkarte" aria-label="Landkarte der Einheit">' + (E.STUNDEN || []).map(function (s) {
      if (s.ka) return '<li class="k-lk-ka"><span class="k-lk"><b>' + esc(s.titel) + "</b><small>" + esc(s.kurz) + "</small></span></li>";
      var hier = s.id === hierId;
      return '<li class="' + (hier ? "k-lk-hier" : "") + '"><a href="' + esc(s.datei) + '"' + (hier ? ' aria-current="page"' : "") + "><small>Stunde " + s.nr + "</small><b>" + esc(s.titel) + "</b><small>" + esc(s.kurz) + "</small>" + (hier ? "<small>du bist hier</small>" : "") + "</a></li>";
    }).join("") + "</ol>";
  }
  function sprachenZeilen(bisId) {
    /* Alle Bilder der Geschichten bis zu einer Stunde, mit der eigenen Begründung */
    var ids = bisId ? frueher(bisId).concat([bisId]) : stundenListe().map(function (s) { return s.id; });
    return (E.BILDER || []).filter(function (b) { return ids.indexOf(b.ds) >= 0; }).map(function (b) {
      var S = D.st[b.ds], w = S && S.wahl && S.wahl[b.id];
      return { b: b, eigen: w ? w.g : "", st: stundeVon(b.ds) };
    });
  }
  function sprachenHTML(bisId) {
    var z = sprachenZeilen(bisId), letzte = null;
    return '<table class="k-tabelle"><thead><tr><th scope="col">Bucays Bild</th><th scope="col">Fachsprache</th><th scope="col">Deine Begründung</th></tr></thead><tbody>' + z.map(function (r) {
      var kopf = r.b.geschichte + r.st.nr !== letzte ? '<tr><td colspan="3"><b>' + esc(r.b.geschichte) + '</b> <span class="k-klein">· Stunde ' + r.st.nr + "</span></td></tr>" : "";
      letzte = r.b.geschichte + r.st.nr;
      return kopf + '<tr><td style="font:italic 600 1.05rem/1.4 var(--font-stimme)">' + esc(r.b.bild) + "</td><td>" + esc(r.b.fach) + '</td><td class="k-dein">' + esc(r.eigen) + "</td></tr>";
    }).join("") + "</tbody></table>";
  }

  /* ================= Stunde ================= */
  var S = null, AKT = null, LK = false;
  try { LK = sessionStorage.getItem("psycholabor:tafel") === "1"; } catch (e) {}
  function auftraege() { return ST.auftraege; }
  function auftragVon(id) { var r = null; auftraege().forEach(function (a) { if (a.id === id) r = a; }); return r; }
  function index(a) { return auftraege().indexOf(a); }
  var BAUSTEINE = {};
  function interaktiv(b) { var t = BAUSTEINE[b.typ]; return !!(t && t.erledigt) && !b.optional; }
  function erledigt(b) { var t = BAUSTEINE[b.typ]; return t && t.erledigt ? !!t.erledigt(b) : true; }
  function sperrt(b) { if (b.sperrt === false || b.optional) return false; var t = BAUSTEINE[b.typ]; return !!(t && t.erledigt) && t.sperrt !== false; }
  function fertig(a) { if (!a || !a.bloecke) return true; return a.bloecke.every(function (b) { return !interaktiv(b) || erledigt(b); }); }
  function offen(a) {
    /* Stunden mit übernommenen Eingaben aus Fassung 1 sind schon gelaufen: Alle Aufträge bleiben offen, auch neue wie »Verorten« */
    if (LK || a.id === "start" || S.uebernommen) return true;
    if (a.oeffnet === "ansage") return !!S.ansage[a.id];
    if (a.oeffnet === "nach") { var i = index(a); for (var j = i - 1; j >= 0; j--) { var v = auftraege()[j]; if (v.id !== "start") return fertig(v); } return true; }
    return true;
  }
  function stand(a) {
    if (a.id === "start") return { s: AKT === a ? "hier" : "erledigt", t: AKT === a ? "du bist hier" : "" };
    if (AKT === a) return { s: "hier", t: "du bist hier" };
    if (!offen(a)) return a.oeffnet === "ansage" ? { s: "ansage", t: "öffnet auf Ansage" } : { s: "gesperrt", t: "öffnet nach deiner Antwort" };
    if (a.bloecke && a.bloecke.some(interaktiv) && fertig(a)) return { s: "erledigt", t: "✓ erledigt" };
    return { s: "offen", t: "offen" };
  }

  function kopfHTML() {
    var s = stundeVon(ST.id), alle = stundenListe(), i = alle.indexOf(s);
    var davor = i > 0 ? "Stunde " + alle[i - 1].nr : "Klassenarbeit 1", danach = i < alle.length - 1 ? "Stunde " + alle[i + 1].nr : "Klassenarbeit";
    return '<header class="k-kopf"><span class="k-zeichen" aria-hidden="true">' + s.nr + '</span><div class="k-kopf__titel"><b>Stunde ' + s.nr + " · " + esc(s.titel) + "</b><small>Einheit Motivation · Arbeitsblatt · davor " + davor + " · danach " + danach + '</small></div><nav aria-label="Zurück"><a class="k-kopflink k-kopflink--haupt" href="motivation.html"><span aria-hidden="true">←</span> Einheit</a><a class="k-kopflink" href="index.html">Psycho-Labor</a></nav></header>';
  }
  function fussHTML() {
    return '<div class="k-register__fuss">' +
      '<button type="button" class="g-knopf g-knopf--sekundaer" data-k="datei">Stand als Datei sichern</button>' +
      '<label class="g-knopf g-knopf--sekundaer" style="justify-content:center">Stand aus Datei laden<input type="file" accept="application/json,.json" class="k-sr" data-k="laden"></label>' +
      '<p class="k-klein" data-k="datei-rueck" aria-live="polite"></p>' +
      '<button type="button" class="g-knopf g-knopf--sekundaer" data-k="loeschen-auf">Eingaben löschen …</button>' +
      '<div class="k-loeschen" data-k="loeschen" hidden><b>Was soll gelöscht werden?</b><button type="button" class="g-knopf g-knopf--sekundaer" data-k="loeschen-stunde">Nur diese Stunde</button><button type="button" class="g-knopf g-knopf--sekundaer" data-k="loeschen-alles">Die ganze Einheit</button><button type="button" class="g-knopf g-knopf--still" data-k="loeschen-nein">Nichts löschen</button><p class="k-klein">Gelöschtes lässt sich nicht zurückholen.</p></div>' +
      '<label>Ansicht <select data-k="ansicht"><option value="hell">Hell</option><option value="dunkel">Dunkel</option><option value="beamer">Beamer</option></select></label>' +
      '<span class="g"><label class="g-schalter" data-g="bewegung"><input type="checkbox"> Weniger Bewegung</label></span>' +
      '<button type="button" class="g-knopf g-knopf--still" data-k="tafel">' + (LK ? "Tafelmodus beenden" : "Für Lehrkräfte: alle Aufträge öffnen") + "</button>" +
      '<div class="k-rueckfrage" data-k="tafel-frage" hidden><p>Nur für das Gerät an der Tafel: Alle Aufträge sind dann ohne Festlegung offen. Nichts wird gelöscht.</p><div class="k-zeile"><button type="button" class="g-knopf g-knopf--primaer" data-k="tafel-ja">Ja, öffnen</button><button type="button" class="g-knopf g-knopf--still" data-k="tafel-nein">Abbrechen</button></div></div>' +
      '<p class="k-klein">Alles bleibt auf diesem Gerät. Nichts wird gesendet. Selbsttests sind Denkanstöße, keine Diagnose.</p>' +
      '<p class="k-urheber">© 2026 Mario Walter · Inhalte CC BY-NC-SA 4.0 · Code MIT · mit KI-Unterstützung entwickelt</p></div>';
  }
  function registerHTML() {
    return '<aside class="k-register" aria-label="Aufträge dieser Stunde"><p class="k-register__kopf">Dieses Blatt · ' + ST.minuten + ' Minuten</p><ol>' + auftraege().map(function (a) {
      return '<li><button type="button" class="k-reg" data-a="' + a.id + '"><span class="k-reg__nr" aria-hidden="true">' + esc(a.nr) + '</span><span class="k-reg__text"><b>' + esc(a.titel) + "</b><small>" + esc(a.sozial || "") + (a.min ? " · " + a.min + " Min." : "") + '</small><span class="k-reg__stand"></span></span></button></li>';
    }).join("") + "</ol>" + fussHTML() + "</aside>";
  }
  function registerAktualisieren() {
    $$(".k-reg").forEach(function (b) {
      var a = auftragVon(b.getAttribute("data-a")), st = stand(a);
      b.setAttribute("data-stand", st.s);
      $(".k-reg__stand", b).textContent = st.t;
      if (a === AKT) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      b.setAttribute("aria-label", a.nr + " " + a.titel + (st.t ? ", " + st.t : ""));
      if (a.bloecke && a.bloecke.some(interaktiv) && fertig(a) && a !== AKT) $(".k-reg__nr", b).textContent = "✓"; else $(".k-reg__nr", b).textContent = a.nr;
    });
  }

  function zeigen(id, fokus) {
    var a = auftragVon(id) || auftraege()[0];
    AKT = a; S.ort = a.id; sichern();
    var blatt = $("#blatt");
    blatt.innerHTML = "";
    var seite = el('<article class="k-seite k-neu" aria-labelledby="t-' + a.id + '"></article>');
    seite.appendChild(el('<div class="k-blattkopf"><span>Psychologie · Motivation</span><span>Stunde ' + stundeVon(ST.id).nr + " · Arbeitsblatt</span><span>Datum: " + heute() + "</span></div>"));
    if (a.id === "start") startSeite(seite, a);
    else if (a.id === "z") zusammenfassung(seite, a);
    else if (!offen(a)) tuer(seite, a);
    else auftragSeite(seite, a);
    blatt.appendChild(seite);
    /* Erst wenn die Seite im Dokument hängt: verbergen, was erst nach einer Festlegung kommt (sonst stünden Befunde vor der Vorhersage da) */
    sichtbarkeit(); auffrischen(); weiterAktualisieren();
    if (location.hash !== "#" + a.id) history.replaceState(null, "", "#" + a.id);
    registerAktualisieren();
    window.scrollTo(0, 0);
    if (fokus) { var h = $("h1,h2", seite); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } }
    /* Schmales Register: nur das Register seitlich verschieben, nie das Fenster (Fallstrick scrollIntoView) */
    var reg = $('.k-reg[data-a="' + a.id + '"]'), leiste = $(".k-register");
    if (reg && leiste && window.innerWidth <= 980) leiste.scrollLeft = Math.max(0, reg.offsetLeft - leiste.clientWidth / 2 + reg.offsetWidth / 2);
  }
  function auftragKopf(a) {
    return '<header class="k-auftrag__kopf"><span class="k-nr" aria-hidden="true">' + esc(a.nr) + '</span><div><h2 id="t-' + a.id + '">Arbeitsauftrag ' + esc(a.nr) + ": " + esc(a.titel) + '</h2><p class="k-meta">' + (a.sozial ? "<span>" + esc(a.sozial) + "</span>" : "") + (a.min ? "<span>" + a.min + " Minuten</span>" : "") + (a.zusatz ? "<span>" + esc(a.zusatz) + "</span>" : "") + "</p></div></header>";
  }
  function naechster(a) { var i = index(a); return auftraege()[i + 1] || null; }
  function vorheriger(a) { var i = index(a); return auftraege()[i - 1] || null; }
  function fussLeiste(a) {
    var n = naechster(a), v = vorheriger(a);
    var f = el('<footer class="k-fuss"></footer>');
    if (v) f.appendChild(el('<button type="button" class="g-knopf g-knopf--still" data-geh="' + v.id + '"><span aria-hidden="true">←</span> ' + esc(v.id === "start" ? "Zum Start" : "Auftrag " + v.nr) + "</button>"));
    if (n) {
      var b = el('<button type="button" class="g-knopf g-knopf--primaer" data-geh="' + n.id + '" data-weiter>' + esc(n.id === "z" ? "Zur Zusammenfassung" : "Weiter: Auftrag " + n.nr) + ' <span aria-hidden="true">→</span></button>');
      f.appendChild(b);
      f.appendChild(el('<p class="k-weiter-hinweis" data-weiter-hinweis></p>'));
    }
    return f;
  }
  function weiterAktualisieren() {
    var b = $("[data-weiter]"), h = $("[data-weiter-hinweis]");
    if (!b || !AKT) return;
    var n = naechster(AKT), ok = AKT.id === "start" || fertig(AKT) || (n && offen(n));
    b.disabled = !ok;
    if (h) h.textContent = ok ? (n && n.oeffnet === "ansage" && !offen(n) ? "Der nächste Auftrag öffnet auf Ansage." : "") : "Erst alle Aufgaben dieses Auftrags festlegen.";
  }
  function tuer(seite, a) {
    seite.innerHTML += auftragKopf(a);
    var t;
    if (a.oeffnet === "ansage") {
      t = el('<div class="k-tuer"><h3>Dieser Auftrag öffnet auf Ansage.</h3><p>Warte, bis deine Lehrkraft sagt, dass es weitergeht. So bleibt die Klasse beisammen.</p><button type="button" class="g-knopf g-knopf--primaer" data-k="ansage">Auftrag öffnen</button><div class="k-rueckfrage" hidden><p><b>Hat deine Lehrkraft gesagt, dass es weitergeht?</b></p><div class="k-zeile"><button type="button" class="g-knopf g-knopf--primaer" data-k="ansage-ja">Ja, öffnen</button><button type="button" class="g-knopf g-knopf--still" data-k="ansage-nein">Noch nicht</button></div></div></div>');
      $('[data-k="ansage"]', t).addEventListener("click", function () { $(".k-rueckfrage", t).hidden = false; $('[data-k="ansage-ja"]', t).focus(); });
      $('[data-k="ansage-nein"]', t).addEventListener("click", function () { $(".k-rueckfrage", t).hidden = true; });
      $('[data-k="ansage-ja"]', t).addEventListener("click", function () { S.ansage[a.id] = 1; sichern(); zeigen(a.id, true); });
    } else {
      var v = vorheriger(a);
      t = el('<div class="k-tuer"><h3>Dieser Auftrag öffnet nach deiner Antwort.</h3><p>Lege erst in Auftrag ' + esc(v ? v.nr : "") + " alles fest. Dann geht es hier weiter.</p>" + (v ? '<button type="button" class="g-knopf g-knopf--primaer" data-geh="' + v.id + '">Zu Auftrag ' + esc(v.nr) + "</button>" : "") + "</div>");
    }
    seite.appendChild(t);
  }

  /* ---------- Bausteine einer Auftragsseite ---------- */
  function ctx() { return { S: S, D: D, E: E, ST: ST, LK: LK, sichern: sichern, aktualisieren: aktualisieren, esc: esc, $: $, $$: $$, el: el, worte: worte, stunde: stunde, kreisHTML: kreisHTML, wort: wortStufe, stationName: stationName, begriffeVon: begriffeVon, frueher: frueher }; }
  function auftragSeite(seite, a) {
    seite.innerHTML += auftragKopf(a);
    var box = el('<div class="k-bloecke"></div>');
    a.bloecke.forEach(function (b, i) {
      var t = BAUSTEINE[b.typ];
      if (!t) return;
      var knoten = t.bauen(b, ctx());
      knoten.setAttribute("data-block", i);
      box.appendChild(knoten);
    });
    seite.appendChild(box);
    seite.appendChild(fussLeiste(a));
    if (window.Gegenwart) window.Gegenwart.init(seite);
  }
  function sichtbarkeit() {
    if (!AKT || !AKT.bloecke) return;
    var zu = false;
    AKT.bloecke.forEach(function (b, i) {
      var k = $('#blatt [data-block="' + i + '"]');
      if (!k) return;
      k.hidden = zu && !LK;
      if (!zu && sperrt(b) && !erledigt(b)) zu = true;
    });
  }
  /* Bausteine, die von früheren Eingaben abhängen (Auswertung, Übersetzungstabelle), frischen sich auf, sobald sie sichtbar sind */
  function auffrischen() { $$("#blatt [data-block]").forEach(function (n) { if (n.kNeu && !n.hidden) n.kNeu(); }); }
  function aktualisieren() { sichern(); sichtbarkeit(); auffrischen(); registerAktualisieren(); weiterAktualisieren(); }

  /* ---------- Einfache Bausteine ---------- */
  BAUSTEINE.text = { bauen: function (b) { return el('<div class="k-text">' + b.html + "</div>"); } };
  BAUSTEINE.kasten = { bauen: function (b) {
    var art = b.art || "info";
    return el('<div class="k-kasten k-kasten--' + art + '">' + (b.titel ? '<div class="k-kasten__kopf">' + (art === "privat" ? '<span class="k-pille k-pille--privat">Nur für dich</span>' : "") + esc(b.titel) + "</div>" : "") + b.html + "</div>");
  } };
  BAUSTEINE.merk = { bauen: function (b) { return el('<div class="k-merk"><p class="k-merk__titel">' + esc(b.titel) + "</p>" + b.html + "</div>"); } };
  BAUSTEINE.befund = { bauen: function (b) { return el('<div class="k-befund"><p><span class="k-pille k-pille--beleg">' + esc(b.status || "belegte Quelle") + "</span></p>" + b.html + (b.quelle ? '<p class="k-befund__quelle">' + esc(b.quelle) + "</p>" : "") + "</div>"); } };
  BAUSTEINE.karten = { bauen: function (b) {
    return el('<div class="k-karten-wrap">' + (b.status ? '<p><span class="k-pille">' + esc(b.status) + "</span></p>" : "") + '<div class="k-karten' + (b.karten.length === 3 ? " k-karten--drei" : b.karten.length === 4 ? " k-karten--vier" : "") + '">' + b.karten.map(function (k) {
      return '<div class="k-karte' + (k.art ? " k-karte--" + k.art : "") + '">' + (k.titel ? "<h3>" + esc(k.titel) + "</h3>" : "") + k.html + "</div>";
    }).join("") + "</div></div>");
  } };
  BAUSTEINE.tabelle = { bauen: function (b) {
    return el('<div><table class="k-tabelle">' + (b.kopf ? "<thead><tr>" + b.kopf.map(function (k) { return '<th scope="col">' + esc(k) + "</th>"; }).join("") + "</tr></thead>" : "") + "<tbody>" + b.zeilen.map(function (z) { return "<tr>" + z.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>" + (b.status ? '<p class="k-klein">' + esc(b.status) + "</p>" : "") + "</div>");
  } };
  BAUSTEINE.bild = { bauen: function (b) { return el('<figure class="k-bild"' + (b.max ? ' style="max-width:' + b.max + '"' : "") + ">" + b.svg + (b.unterschrift ? "<figcaption>" + b.unterschrift + "</figcaption>" : "") + "</figure>"); } };
  BAUSTEINE.landkarte = { bauen: function () { return el("<div>" + landkarteHTML(ST.id) + "</div>"); } };

  /* Erst erinnern: Antworten erscheinen erst nach dem Aufdecken */
  BAUSTEINE.abruf = {
    sperrt: false,
    erledigt: function (b) { return !!S.abruf[b.id || "erinnern"]; },
    bauen: function (b) {
      var id = b.id || "erinnern";
      var k = el('<div class="k-abruf"><div class="k-kasten k-kasten--auftrag"><div class="k-kasten__kopf">Allein · ohne Heft · ' + (b.min || 3) + ' Minuten</div><p><b>Erst erinnern.</b> Antworte im Kopf oder auf Papier. Stichworte reichen. Es geht nicht um richtig oder falsch, sondern darum, was noch da ist.</p><ol>' + b.fragen.map(function (f) { return "<li>" + f + "</li>"; }).join("") + '</ol></div><div class="k-zeile" style="margin-top:var(--space-4)"><button type="button" class="g-knopf g-knopf--sekundaer" data-k="auf">Ich habe geantwortet – aufdecken</button></div><div data-k="loes"></div></div>');
      function zeige() {
        $('[data-k="auf"]', k).hidden = true;
        $('[data-k="loes"]', k).innerHTML = '<div class="k-kasten k-kasten--sichern"><div class="k-kasten__kopf">Zum Vergleich</div><ol>' + b.antworten.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol>" + (b.danach ? "<p>" + b.danach + "</p>" : "") + "</div>";
      }
      $('[data-k="auf"]', k).addEventListener("click", function () { S.abruf[id] = 1; zeige(); aktualisieren(); });
      if (S.abruf[id]) zeige();
      return k;
    }
  };

  /* Auf Ansage: Auflösung erst, wenn die Lehrkraft es sagt (Knopf mit Rückfrage, kein Codewort) */
  BAUSTEINE.ansage = {
    erledigt: function (b) { return !!S.ansage["b-" + b.id]; },
    bauen: function (b) {
      var k = el('<div class="k-tuer" style="padding:var(--space-5)"><p style="margin:0"><b>' + esc(b.titel || "Auflösung") + "</b> – " + esc(b.text || "erst auf Ansage deiner Lehrkraft.") + '</p><button type="button" class="g-knopf g-knopf--primaer" data-k="auf">Auflösen</button><div class="k-rueckfrage" hidden><p><b>Hat deine Lehrkraft gesagt, dass aufgelöst wird?</b></p><div class="k-zeile"><button type="button" class="g-knopf g-knopf--primaer" data-k="ja">Ja, auflösen</button><button type="button" class="g-knopf g-knopf--still" data-k="nein">Noch nicht</button></div></div></div>');
      function fertigZeigen() { k.innerHTML = '<p class="k-klein" style="margin:0">' + esc(b.titel || "Auflösung") + " · aufgelöst</p>"; k.className = ""; }
      if (S.ansage["b-" + b.id]) { fertigZeigen(); return k; }
      $('[data-k="auf"]', k).addEventListener("click", function () { $(".k-rueckfrage", k).hidden = false; $('[data-k="ja"]', k).focus(); });
      $('[data-k="nein"]', k).addEventListener("click", function () { $(".k-rueckfrage", k).hidden = true; });
      $('[data-k="ja"]', k).addEventListener("click", function () { S.ansage["b-" + b.id] = 1; fertigZeigen(); aktualisieren(); });
      return k;
    }
  };

  /* Festlegen: eigener Text, danach versiegelt */
  BAUSTEINE.fest = {
    erledigt: function (b) { return !!(S.fest[b.id] && String(S.fest[b.id]).trim()); },
    bauen: function (b) {
      var mind = b.mind || 10, wz = !!b.worte;
      var k = el('<div class="k-fest"><label class="k-feld">' + (b.luecke ? '<span class="k-luecke">' + b.label + "</span>" : "<span>" + b.label + "</span>") + (b.hilfe ? '<span class="k-klein" style="font-weight:400">' + b.hilfe + "</span>" : "") + '<textarea rows="' + (b.zeilen || 3) + '" maxlength="' + (b.max || 600) + '" placeholder="' + esc(b.platzhalter || "") + '"></textarea>' + (wz ? '<span class="k-zaehler"></span>' : "") + '</label><div class="k-zeile" style="margin-top:8px"><button type="button" class="g-knopf g-knopf--primaer">Festlegen</button><span class="g-stempel k-stempel" hidden>Festgelegt</span></div></div>');
      var feld = $("textarea", k), knopf = $("button", k), z = $(".k-zaehler", k);
      function menge() { return wz ? worte(feld.value) : feld.value.trim().length; }
      function zu() { feld.readOnly = true; knopf.hidden = true; $(".g-stempel", k).hidden = false; }
      function pruefe() { knopf.disabled = menge() < mind; if (z) z.textContent = worte(feld.value) + " von mindestens " + mind + " Wörtern"; }
      if (S.fest[b.id]) { feld.value = S.fest[b.id]; zu(); }
      feld.addEventListener("input", pruefe); pruefe();
      knopf.addEventListener("click", function () { if (menge() < mind) return; S.fest[b.id] = feld.value.trim(); zu(); aktualisieren(); });
      return k;
    }
  };

  /* Zurück zur Vermutung: eigener früherer Text, dann »Was denkst du jetzt?« */
  BAUSTEINE.rueckblick = {
    erledigt: function (b) { return !!S.fest[b.id]; },
    bauen: function (b) {
      var quelle = b.von.indexOf(":") > 0 ? (D.st[b.von.split(":")[0]] || {}).fest : S.fest;
      var alt = quelle ? quelle[b.von.split(":").pop()] : "";
      var k = el('<div class="k-rueckblick"><p><b>' + esc(b.vorher || "Das hast du am Anfang vermutet:") + '</b></p><blockquote class="k-dein-text"></blockquote></div>');
      $("blockquote", k).textContent = alt || "";
      k.appendChild(BAUSTEINE.fest.bauen({ id: b.id, label: b.label || "Was denkst du jetzt – und warum?", mind: b.mind || 15, zeilen: 3 }));
      return k;
    }
  };

  /* Wahl mit Begründung: Rückmeldung je Option erst nach dem Festlegen */
  function wahlItem(z) {
    var w = S.wahl[z.id], zu = !!w;
    var k = el('<div class="k-wahl" data-id="' + z.id + '"' + (zu ? " data-zu" : "") + '><fieldset><legend>' + z.text + "</legend>" + z.opt.map(function (o, i) {
      var urteil = zu ? ' data-urteil="' + o[1] + '"' : "";
      return '<label class="g-option"' + urteil + '><input type="radio" name="w-' + z.id + '" value="' + i + '"' + (w && w.o === i ? " checked" : "") + (zu ? " disabled" : "") + "><span>" + esc(o[0]) + (zu ? '<span class="k-urteil"><b>' + WORT[o[1]] + "</b> – " + esc(o[2]) + "</span>" : "") + "</span></label>";
    }).join("") + '</fieldset><label class="k-feld"><span>Begründung in einem Satz</span><textarea rows="2" maxlength="220" placeholder="Ich wähle das, weil …"' + (zu ? " readonly" : "") + "></textarea></label>" +
      '<div class="k-wahl__fuss"><button type="button" class="g-knopf g-knopf--primaer" data-k="fest"' + (zu ? " hidden" : "") + '>Festlegen</button><span class="g-stempel k-stempel"' + (zu ? "" : " hidden") + ">Festgelegt</span>" + (z.stimmkarte && zu ? '<button type="button" class="g-knopf g-knopf--sekundaer" data-k="karte">Stimmkarte zeigen</button>' : "") + '<span class="k-sr" aria-live="polite"></span></div></div>');
    var feld = $("textarea", k), los = $('[data-k="fest"]', k);
    if (w) feld.value = w.g || "";
    function sperre() { if (!zu) los.disabled = !$("input:checked", k) || feld.value.trim().length < 8; }
    k.addEventListener("change", sperre); feld.addEventListener("input", sperre); sperre();
    los.addEventListener("click", function () {
      var gew = $("input:checked", k); if (!gew || feld.value.trim().length < 8) return;
      S.wahl[z.id] = { o: +gew.value, g: feld.value.trim() };
      var neu = wahlItem(z); k.replaceWith(neu);
      var o = z.opt[S.wahl[z.id].o];
      $(".k-sr", neu).textContent = "Festgelegt. Deine Wahl: " + WORT[o[1]] + ". " + o[2];
      aktualisieren();
      var f = $('[data-k="karte"]', neu) || $(".g-stempel", neu); if (f && f.focus) f.setAttribute("tabindex", "-1");
    });
    var karte = $('[data-k="karte"]', k);
    if (karte) karte.addEventListener("click", function () { stimmkarte(z.opt[w.o][3] || z.opt[w.o][0], karte); });
    return k;
  }
  function stimmkarte(text, zurueck) {
    var o = el('<div class="k-stimmkarte" role="dialog" aria-modal="true" aria-label="Stimmkarte"><div><b></b><p>Halte das Tablet hoch, damit deine Lehrkraft zählen kann.</p><button type="button" class="g-knopf">Schließen</button></div></div>');
    $("b", o).textContent = text;
    function zu() { o.remove(); doc.removeEventListener("keydown", taste); if (zurueck) zurueck.focus(); }
    function taste(e) { if (e.key === "Escape") zu(); }
    $("button", o).addEventListener("click", zu); doc.addEventListener("keydown", taste);
    doc.body.appendChild(o); $("button", o).focus();
  }
  BAUSTEINE.wahl = {
    erledigt: function (b) { return b.items.every(function (z) { return !!S.wahl[z.id]; }); },
    bauen: function (b) {
      var k = el('<div class="k-wahlen"></div>');
      if (b.einleitung) k.appendChild(el("<p>" + b.einleitung + "</p>"));
      b.items.forEach(function (z) { k.appendChild(wahlItem(z)); });
      return k;
    }
  };

  /* Klassenbild: Die Lehrkraft zählt die hochgehaltenen Stimmkarten und tippt die Zahlen vorne ein */
  BAUSTEINE.klassenbild = {
    bauen: function (b) {
      /* Gezählt wird nur am Gerät vorne (Tafelmodus); die Tablets zeigen nur, worum es geht */
      if (!LK) return el('<p class="k-klein k-kb-hinweis"><b>Vorne am Board wird gezählt:</b> ' + esc(b.frage) + "</p>");
      var z = S.klassenbild[b.id] || (S.klassenbild[b.id] = b.optionen.map(function () { return 0; }));
      var k = el('<div class="k-klassenbild"><p class="k-kasten__kopf">Klassenbild · für das Gerät vorne</p><p><b>' + esc(b.frage) + '</b></p><p class="k-klein">' + esc(b.hinweis || "Alle halten ihre Stimmkarte hoch. Die Lehrkraft zählt und tippt die Zahlen ein.") + ' Kleine Zahlen sind kein Befund – sie sind ein Anlass zum Gespräch.</p><div data-k="zeilen"></div><p class="k-klein" data-k="summe" aria-live="polite"></p></div>');
      function malen() {
        var max = Math.max.apply(null, z.concat([1])), sum = z.reduce(function (a, c) { return a + c; }, 0);
        $('[data-k="zeilen"]', k).innerHTML = b.optionen.map(function (o, i) {
          return '<div class="k-kb-zeile"><span>' + esc(o) + '</span><span class="k-kb-zahl"><button type="button" data-i="' + i + '" data-d="-1" aria-label="' + esc(o) + ': eins weniger">−</button><output aria-label="' + esc(o) + '">' + z[i] + '</output><button type="button" data-i="' + i + '" data-d="1" aria-label="' + esc(o) + ': eins mehr">+</button></span><span class="k-kb-balken" aria-hidden="true"><i style="width:' + Math.round(z[i] / max * 100) + '%"></i></span></div>';
        }).join("");
        $('[data-k="summe"]', k).textContent = sum ? "Gezählt: " + sum + " Stimmen. " + b.optionen.map(function (o, i) { return o + ": " + z[i]; }).join(" · ") : "Noch nichts gezählt.";
      }
      k.addEventListener("click", function (e) {
        var t = e.target.closest("[data-d]"); if (!t) return;
        var i = +t.getAttribute("data-i"); z[i] = Math.max(0, z[i] + +t.getAttribute("data-d")); sichern(); malen();
        var n = $('[data-i="' + i + '"][data-d="' + t.getAttribute("data-d") + '"]', k); if (n) n.focus();
      });
      malen();
      return k;
    }
  };

  /* Selbsttest (Skala) */
  var STUFEN = {
    vier: [["++", "stimme voll zu", 3], ["+", "eher ja", 2], ["−", "eher nein", 1], ["−−", "stimme gar nicht zu", 0]],
    fuenf: [["1", "trifft nicht zu", 1], ["2", "trifft eher nicht zu", 2], ["3", "teils, teils", 3], ["4", "trifft eher zu", 4], ["5", "trifft voll zu", 5]]
  };
  function wortStufe(m, art) {
    if (art === "fuenf") return m >= 4.2 ? "trifft voll zu" : m >= 3.4 ? "trifft eher zu" : m >= 2.6 ? "teils, teils" : m >= 1.8 ? "trifft eher nicht zu" : "trifft nicht zu";
    return m >= 2.5 ? "stimmst du voll zu" : m >= 1.5 ? "stimmst du eher zu" : m >= 0.5 ? "stimmst du eher nicht zu" : "stimmst du gar nicht zu";
  }
  BAUSTEINE.skala = {
    erledigt: function (b) { var a = S.skala[b.id] || {}; return b.items.every(function (x, i) { return a[i] !== undefined; }); },
    bauen: function (b) {
      var a = S.skala[b.id] || (S.skala[b.id] = {}), st = STUFEN[b.stufen || "vier"];
      var k = el('<div class="k-skala">' + (b.privat !== false ? '<p><span class="k-pille k-pille--privat">Nur für dich</span></p>' : "") + (b.einleitung ? "<p>" + b.einleitung + "</p>" : "") + '<p class="k-legende" aria-hidden="true">' + st.map(function (s) { return "<span><b>" + esc(s[0]) + "</b> " + esc(s[1]) + "</span>"; }).join("") + "</p>" + (b.stamm ? "<p><b>" + esc(b.stamm) + '</b> <span class="k-klein" data-k="stand" aria-live="polite"></span></p>' : '<p class="k-klein" data-k="stand" aria-live="polite"></p>') + '<div class="k-test"></div></div>');
      $(".k-test", k).innerHTML = b.items.map(function (it, i) {
        var text = typeof it === "string" ? it : it[0];
        return '<fieldset class="k-item" data-i="' + i + '"><legend>' + esc(text) + '</legend><div class="k-stufen">' + st.map(function (s) {
          return '<label><input type="radio" name="s-' + b.id + "-" + i + '" value="' + s[2] + '"' + (a[i] === s[2] ? " checked" : "") + '><span aria-hidden="true">' + esc(s[0]) + '</span><span class="k-sr">' + esc(s[1]) + "</span></label>";
        }).join("") + "</div></fieldset>";
      }).join("");
      function stand() {
        var n = Object.keys(a).length, alle = n === b.items.length;
        $('[data-k="stand"]', k).textContent = n + " von " + b.items.length + " Sätzen";
        $$(".k-item", k).forEach(function (f) { f.classList.toggle("k-offen", n >= Math.ceil(b.items.length / 2) && !alle && a[f.getAttribute("data-i")] === undefined); });
      }
      k.addEventListener("change", function (e) { var f = e.target.closest(".k-item"); if (!f) return; a[f.getAttribute("data-i")] = +e.target.value; stand(); aktualisieren(); });
      stand();
      return k;
    }
  };

  /* Sortieren in Fächer oder ein Raster; Zwischenstand ab fünf Karten, falsche zurücklegen */
  BAUSTEINE.sortieren = {
    erledigt: function (b) { var st = S.sort[b.id]; return !!(st && (st.ok || (S.uebernommen && st.lage && b.karten.every(function (x, i) { return st.lage[i] === x[1]; })))); },
    bauen: function (b) {
      var st = S.sort[b.id] || (S.sort[b.id] = { lage: {}, ok: false });
      if (!st.lage) st.lage = {};
      var K = b.karten, gew = null;
      /* Übernommener Stand aus Fassung 1: vollständig und passend gelegt gilt als geprüft */
      if (!st.ok && S.uebernommen && K.every(function (x, i) { return st.lage[i] === x[1]; })) st.ok = true;
      var geprueft = !!st.ok;
      var faecher = b.faecher || [];
      if (b.raster) { faecher = []; b.raster.zeilen.forEach(function (z) { b.raster.spalten.forEach(function (s) { faecher.push({ id: z.id + "|" + s.id, titel: z.titel + " · " + s.titel, zeile: z, spalte: s }); }); }); }
      var k = el('<div class="k-sortieren"><div class="k-stapel" aria-label="Kartenstapel"></div><div data-k="faecher"></div><div class="k-zeile" style="margin-top:var(--space-3)"><button type="button" class="g-knopf g-knopf--sekundaer" data-k="pruefen" disabled>Zwischenstand prüfen</button><button type="button" class="g-knopf g-knopf--still" data-k="zurueck" hidden>Falsche Karten zurück in den Stapel</button></div><div data-k="rueck" aria-live="polite" style="margin-top:var(--space-3)"></div></div>');
      function chip(i, extra) { return '<button type="button" class="k-chip' + (b.satz ? " k-chip--satz" : "") + (extra || "") + '" data-c="' + i + '" aria-pressed="' + (gew === i) + '">' + esc(K[i][0]) + "</button>"; }
      function fach(f) {
        var drin = K.map(function (x, i) { return i; }).filter(function (i) { return st.lage[i] === f.id; });
        return '<div class="k-fach" data-f="' + esc(f.id) + '">' + (b.raster ? "" : "<h4>" + esc(f.titel) + "</h4>" + (f.text ? "<p>" + esc(f.text) + "</p>" : "")) + '<div class="k-fach__liegt">' + drin.map(function (i) { return chip(i, geprueft && K[i][1] !== f.id ? '" data-urteil="kaum' : ""); }).join("") + '</div><button type="button" class="g-knopf g-knopf--sekundaer" data-hier="' + esc(f.id) + '"' + (gew === null ? " disabled" : "") + ' aria-label="Hierhin legen: ' + esc(f.titel) + '">Hierhin</button></div>';
      }
      function malen() {
        var frei = K.map(function (x, i) { return i; }).filter(function (i) { return !st.lage[i]; });
        $(".k-stapel", k).innerHTML = frei.length ? frei.map(function (i) { return chip(i); }).join("") : '<span class="k-klein">Alle Karten sind abgelegt.</span>';
        var h;
        if (b.raster) {
          h = '<div class="k-raster" style="--spalten:' + b.raster.spalten.length + '"><div class="k-raster__kopf k-raster__kopf--leer"></div>' + b.raster.spalten.map(function (s) { return '<div class="k-raster__kopf">' + esc(s.titel) + "</div>"; }).join("");
          b.raster.zeilen.forEach(function (z) { h += '<div class="k-raster__kopf">' + esc(z.titel) + "</div>" + b.raster.spalten.map(function (s) { return fach({ id: z.id + "|" + s.id, titel: z.titel + ", " + s.titel }); }).join(""); });
          h += "</div>";
        } else h = '<div class="k-faecher' + (faecher.length === 3 ? " k-faecher--drei" : "") + '">' + faecher.map(fach).join("") + "</div>";
        $('[data-k="faecher"]', k).innerHTML = h;
        var n = Object.keys(st.lage).length, p = $('[data-k="pruefen"]', k);
        p.disabled = n < Math.min(b.mind || 5, K.length);
        p.textContent = n === K.length ? "Prüfen" : "Zwischenstand prüfen";
      }
      function fertig() { return K.every(function (x, i) { return st.lage[i] === x[1]; }); }
      function leeren() { geprueft = false; $('[data-k="rueck"]', k).innerHTML = ""; $('[data-k="zurueck"]', k).hidden = true; }
      function rueck() {
        var falsch = Object.keys(st.lage).filter(function (i) { return st.lage[i] !== K[i][1]; }), n = Object.keys(st.lage).length, r = $('[data-k="rueck"]', k);
        $('[data-k="zurueck"]', k).hidden = !falsch.length;
        if (falsch.length) r.innerHTML = '<div class="k-rueck k-rueck--weiter"><strong>' + (n - falsch.length) + " von " + n + " Karten liegen passend.</strong> Überlege bei den anderen noch einmal:<ul>" + falsch.map(function (i) { return "<li><strong>" + esc(K[i][0]) + "</strong> " + esc(K[i][2]) + "</li>"; }).join("") + "</ul></div>";
        else if (n < K.length) r.innerHTML = '<div class="k-rueck k-rueck--gut"><strong>Bisher liegt alles passend.</strong> Lege die übrigen Karten ab.</div>';
        else r.innerHTML = '<div class="k-rueck k-rueck--gut"><strong>Alle Karten liegen passend.</strong> ' + esc(b.fertigText || "") + "</div>";
      }
      k.addEventListener("click", function (e) {
        var c = e.target.closest(".k-chip"), f = e.target.closest("[data-hier]");
        if (c) {
          var i = +c.getAttribute("data-c");
          if (st.lage[i]) { delete st.lage[i]; gew = i; st.ok = false; } else gew = gew === i ? null : i;
          leeren(); malen(); aktualisieren();
          var neu = $('.k-chip[data-c="' + i + '"]', k); if (neu) neu.focus();
        } else if (f && gew !== null) {
          st.lage[gew] = f.getAttribute("data-hier"); var war = gew; gew = null; st.ok = false; leeren(); malen(); aktualisieren();
          var n2 = $('.k-chip[data-c="' + war + '"]', k); if (n2) n2.focus();
        }
      });
      $('[data-k="pruefen"]', k).addEventListener("click", function () { geprueft = true; if (fertig()) st.ok = true; malen(); rueck(); aktualisieren(); });
      $('[data-k="zurueck"]', k).addEventListener("click", function () { Object.keys(st.lage).forEach(function (i) { if (st.lage[i] !== K[i][1]) delete st.lage[i]; }); leeren(); malen(); aktualisieren(); });
      malen(); if (st.ok) rueck();
      return k;
    }
  };

  /* Verorten: die Begriffe der Stunde in den Motivationskreis legen; Rückmeldung gestuft */
  BAUSTEINE.verorten = {
    erledigt: function () { return !!(S.verorten && S.verorten.ok); },
    bauen: function () {
      if (!S.verorten) S.verorten = { lage: {}, geprueft: false, ok: false };
      var V = S.verorten, ids = begriffeVon(ST.id), gew = null;
      var k = el('<div class="k-verorten"><p>Tippe einen Begriff an, dann die Station, an die er gehört. Gepunktet: Begriffe aus früheren Stunden – so, wie du sie gelegt hast, sonst an ihrem üblichen Platz.</p><div class="k-stapel" aria-label="Begriffe dieser Stunde"></div><div data-k="kreis"></div><div class="k-zeile" style="margin-top:var(--space-3)"><button type="button" class="g-knopf g-knopf--primaer" data-k="pruefen" disabled>Prüfen</button></div><div data-k="rueck" aria-live="polite" style="margin-top:var(--space-3)"></div><p class="k-klein">Modell: eigene Vereinfachung nach dem Grundmodell der Motivationspsychologie (Person und Situation → Motivation → Handeln), der Idee »Erwartung mal Wert« und der Attributionstheorie. Was lässt es weg? Zum Beispiel Gefühle, Gewohnheiten und Zufall.</p></div>');
      function chipHTML(bid) {
        var u = V.geprueft && V.lage[bid] ? urteilVerorten(bid, V.lage[bid])[0] : "";
        return '<button type="button" class="k-chip" data-b="' + bid + '" aria-pressed="' + (gew === bid) + '"' + (u ? ' data-urteil="' + u + '"' : "") + ">" + esc(E.BEGRIFFE[bid].name) + (u ? '<span class="k-sr"> – ' + WORT[u] + "</span>" : "") + "</button>";
      }
      function malen() {
        var frei = ids.filter(function (b) { return !V.lage[b]; });
        $(".k-stapel", k).innerHTML = frei.length ? frei.map(chipHTML).join("") : '<span class="k-klein">Alle Begriffe liegen im Kreis.</span>';
        var chips = {};
        frueher(ST.id).forEach(function (sid) { begriffeVon(sid).forEach(function (bid) { var l = lageVon(bid, true); (chips[l] = chips[l] || []).push('<span class="k-chip k-chip--alt">' + esc(E.BEGRIFFE[bid].name) + "</span>"); }); });
        ids.forEach(function (bid) { var l = V.lage[bid]; if (l) (chips[l] = chips[l] || []).push(chipHTML(bid)); });
        $('[data-k="kreis"]', k).innerHTML = kreisHTML({ chips: chips, knoepfe: gew !== null });
        $('[data-k="pruefen"]', k).disabled = frei.length > 0;
      }
      function rueck() {
        var r = $('[data-k="rueck"]', k), kaum = 0;
        var li = ids.map(function (bid) { var u = urteilVerorten(bid, V.lage[bid]); if (u[0] === "kaum") kaum++; return '<li><b>' + esc(E.BEGRIFFE[bid].name) + "</b> bei »" + esc(stationName(V.lage[bid])) + "«: <b>" + WORT[u[0]] + "</b> – " + esc(u[1]) + "</li>"; }).join("");
        r.innerHTML = '<div class="k-rueck ' + (kaum ? "k-rueck--weiter" : "k-rueck--gut") + '"><strong>' + (kaum ? kaum + " Begriff" + (kaum > 1 ? "e passen" : " passt") + " kaum. Tippe sie an und lege sie neu." : "Alle Begriffe liegen an einer Stelle, die du begründen kannst.") + "</strong><ul>" + li + "</ul></div>";
        V.ok = !kaum; aktualisieren();
      }
      k.addEventListener("click", function (e) {
        var c = e.target.closest(".k-chip[data-b]"), h = e.target.closest("[data-hierhin]");
        if (c) {
          var bid = c.getAttribute("data-b");
          if (V.lage[bid]) { delete V.lage[bid]; V.ok = false; gew = bid; } else gew = gew === bid ? null : bid;
          malen(); aktualisieren();
          var n = $('.k-chip[data-b="' + bid + '"]', k); if (n) n.focus();
        } else if (h && gew) {
          V.lage[gew] = h.getAttribute("data-hierhin"); var war = gew; gew = null; V.ok = false; malen();
          if (V.geprueft && ids.every(function (b) { return V.lage[b]; })) rueck(); else aktualisieren();
          var n3 = $('.k-chip[data-b="' + war + '"]', k); if (n3) n3.focus();
        }
      });
      $('[data-k="pruefen"]', k).addEventListener("click", function () { V.geprueft = true; malen(); rueck(); });
      malen(); if (V.geprueft && ids.every(function (b) { return V.lage[b]; })) rueck();
      return k;
    }
  };
  function stationName(id) { var n = id; (E.STATIONEN || []).forEach(function (s) { if (s.id === id) n = s.name; }); return n; }

  /* Vernetzen: eine eigene, begründete Verbindung – keine Bewertung, sie kommt ins Gespräch */
  BAUSTEINE.verbindung = {
    erledigt: function () { return !!(S.verbindung && S.verbindung.fest); },
    bauen: function (b) {
      if (!S.verbindung) S.verbindung = {};
      var V = S.verbindung, neu = begriffeVon(ST.id), alt = [];
      frueher(ST.id).forEach(function (sid) { begriffeVon(sid).forEach(function (bid) { alt.push([bid, E.BEGRIFFE[bid].name + " (Stunde " + stundeVon(sid).nr + ")"]); }); });
      if (!alt.length) (E.WAHRNEHMUNG || []).forEach(function (w) { alt.push([w[0], w[1] + " (Wahrnehmung)"]); });
      function name(id) { if (E.BEGRIFFE[id]) return E.BEGRIFFE[id].name; var n = id; (E.WAHRNEHMUNG || []).forEach(function (w) { if (w[0] === id) n = w[1]; }); return n; }
      var k = el('<div class="k-verbindung">' + (b.einleitung ? "<p>" + b.einleitung + "</p>" : "") + '<div class="k-zwei"><label class="k-feld"><span>Ein Begriff von heute</span><select data-k="neu"><option value="">bitte wählen</option>' + neu.map(function (id) { return '<option value="' + id + '">' + esc(E.BEGRIFFE[id].name) + "</option>"; }).join("") + '</select></label><label class="k-feld"><span>Ein Begriff von früher</span><select data-k="alt"><option value="">bitte wählen</option>' + alt.map(function (x) { return '<option value="' + x[0] + '">' + esc(x[1]) + "</option>"; }).join("") + '</select></label></div><label class="k-feld"><span>Wie hängen sie zusammen?</span><select data-k="art"><option value="">bitte wählen</option>' + (E.ARTEN || []).map(function (a) { return '<option value="' + a + '">' + esc(a) + "</option>"; }).join("") + '</select></label><label class="k-feld"><span>Dein Satz mit einem Beispiel</span><textarea rows="3" maxlength="400" data-k="satz" placeholder="… weil … Zum Beispiel …"></textarea><span class="k-zaehler"></span></label><div class="k-zeile" style="margin-top:8px"><button type="button" class="g-knopf g-knopf--primaer" data-k="fest">Festlegen</button><span class="g-stempel k-stempel" hidden>Festgelegt</span></div><p data-k="satz-zeigen" class="k-dein-text" hidden></p><p class="k-klein">Eine gute Verbindung nennt einen Grund und ein Beispiel. Bewertet wird sie nicht – zeigt vorne eine, die euch überrascht.</p></div>');
      var sn = $('[data-k="neu"]', k), sa = $('[data-k="alt"]', k), sr = $('[data-k="art"]', k), ss = $('[data-k="satz"]', k), los = $('[data-k="fest"]', k), z = $(".k-zaehler", k);
      function pruefe() { z.textContent = worte(ss.value) + " von mindestens 8 Wörtern"; los.disabled = !(sn.value && sa.value && sr.value && worte(ss.value) >= 8); }
      function zu() {
        [sn, sa, sr].forEach(function (x) { x.disabled = true; }); ss.readOnly = true; los.hidden = true; $(".g-stempel", k).hidden = false;
        var p = $('[data-k="satz-zeigen"]', k); p.hidden = false; p.textContent = "»" + name(V.neu) + "« " + V.art + " »" + name(V.alt) + "«: " + V.satz;
      }
      if (V.fest) { sn.value = V.neu; sa.value = V.alt; sr.value = V.art; ss.value = V.satz; zu(); }
      [sn, sa, sr].forEach(function (x) { x.addEventListener("change", pruefe); }); ss.addEventListener("input", pruefe); pruefe();
      los.addEventListener("click", function () { V.neu = sn.value; V.alt = sa.value; V.art = sr.value; V.satz = ss.value.trim(); V.fest = true; zu(); aktualisieren(); });
      return k;
    }
  };

  /* Lernspur: ein Satz je Stunde zur Leitfrage der Einheit */
  BAUSTEINE.lernspur = {
    erledigt: function () { return !!(S.lernspur && S.lernspur.trim()); },
    bauen: function (b) {
      var bisher = frueher(ST.id).map(function (sid) { var x = D.st[sid]; return x && x.lernspur ? "<li><b>Stunde " + stundeVon(sid).nr + ":</b> " + esc(x.lernspur) + "</li>" : ""; }).join("");
      var k = el('<div class="k-lernspur"><p class="k-frage" style="font-size:1.35rem;margin-bottom:var(--space-3)">' + esc(E.LEITFRAGE) + "</p>" + (bisher ? '<p><b>Deine Lernspur bisher:</b></p><ul class="k-dein">' + bisher + "</ul>" : "") + "</div>");
      k.appendChild(BAUSTEINE.fest.bauen({ id: "__lernspur", label: "Ein Satz von heute", hilfe: b.satzanfang ? "Zum Beispiel: »" + esc(b.satzanfang) + "«" : "", mind: 6, worte: true, zeilen: 2, max: 300 }));
      var feld = $("textarea", k);
      if (S.lernspur && !S.fest.__lernspur) { S.fest.__lernspur = S.lernspur; }
      $("button", k).addEventListener("click", function () { S.lernspur = feld.value.trim(); aktualisieren(); });
      if (S.fest.__lernspur && !S.lernspur) S.lernspur = S.fest.__lernspur;
      return k;
    }
  };

  /* Schreiben wie in der Klassenarbeit – drei Zugänge, getippt oder von Hand, Kriterien erst danach */
  BAUSTEINE.schreiben = {
    erledigt: function (b) { return !!(S.schreiben[b.id] && S.schreiben[b.id].fest); },
    bauen: function (b) {
      var W = S.schreiben[b.id] || (S.schreiben[b.id] = {});
      var k = el('<div class="k-schreiben"><div class="k-kasten k-kasten--auftrag"><div class="k-kasten__kopf">So wie in der Klassenarbeit · Operator: ' + esc(b.operator) + "</div><p><b>" + b.aufgabe + "</b></p>" + (b.hinweis ? "<p>" + b.hinweis + "</p>" : "") + '</div>' + (b.material ? '<div style="margin-top:var(--space-4)">' + b.material + "</div>" : "") +
        '<p style="margin-top:var(--space-4)"><b>Wähle deinen Zugang.</b> Du kannst jederzeit wechseln.</p><div class="k-zugang" role="group" aria-label="Zugang wählen"><button type="button" data-z="beispiel" aria-pressed="false">Mit Beispiel</button><button type="button" data-z="karte" aria-pressed="false">Mit Hilfekarte</button><button type="button" data-z="ohne" aria-pressed="false">Ohne Hilfe</button></div><div data-k="hilfe" style="margin-top:var(--space-3)"></div>' +
        '<p style="margin-top:var(--space-4)"><b>Wo schreibst du?</b></p><div class="k-zugang" role="group" aria-label="Wo schreibst du?"><button type="button" data-w="tippen" aria-pressed="false">Am Tablet</button><button type="button" data-w="hand" aria-pressed="false">Von Hand auf Papier</button></div>' +
        '<div data-k="tippen" hidden style="margin-top:var(--space-3)"><label class="k-feld"><span>Dein Text</span><textarea rows="9" maxlength="2400"></textarea><span class="k-zaehler"></span></label></div>' +
        '<div data-k="hand" hidden style="margin-top:var(--space-3)"><label class="k-feld" style="grid-template-columns:auto 1fr;align-items:center;font-weight:400"><input type="checkbox" style="width:24px;height:24px"> <span>Ich habe meinen Text auf Papier geschrieben (mindestens ' + Math.round((b.mind || 60) / 12) + " Sätze).</span></label></div>" +
        '<div class="k-zeile" style="margin-top:var(--space-3)"><button type="button" class="g-knopf g-knopf--primaer" data-k="fest" disabled>Festlegen und mit den Kriterien vergleichen</button><span class="g-stempel k-stempel" hidden>Festgelegt</span></div><div data-k="danach" style="margin-top:var(--space-4)"></div></div>');
      var feld = $('[data-k="tippen"] textarea', k), z = $('[data-k="tippen"] .k-zaehler', k), hand = $('[data-k="hand"] input', k), los = $('[data-k="fest"]', k);
      function zugang(art) {
        W.zugang = art; sichern();
        $$("[data-z]", k).forEach(function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-z") === art)); });
        var h = $('[data-k="hilfe"]', k);
        if (art === "beispiel") h.innerHTML = '<div class="k-kasten k-kasten--hilfe"><div class="k-kasten__kopf">So könnte ein Anfang aussehen</div>' + b.beispiel + "</div>";
        else if (art === "karte") h.innerHTML = '<div class="k-kasten k-kasten--hilfe"><div class="k-kasten__kopf">Hilfekarte</div><p><b>Satzanfänge</b></p><ul>' + b.satzanfaenge.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><p><b>Wortspeicher:</b> " + b.wortspeicher.map(esc).join(" · ") + "</p></div>";
        else h.innerHTML = '<p class="k-klein">Ohne Hilfe – wie in der Klassenarbeit. Die Hilfen bleiben hier, falls du sie brauchst.</p>';
      }
      function wo(art) {
        W.wo = art; sichern();
        $$("[data-w]", k).forEach(function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-w") === art)); });
        $('[data-k="tippen"]', k).hidden = art !== "tippen"; $('[data-k="hand"]', k).hidden = art !== "hand"; pruefe();
      }
      function pruefe() {
        if (W.fest) return;
        z.textContent = worte(feld.value) + " von mindestens " + (b.mind || 60) + " Wörtern";
        los.disabled = !((W.wo === "tippen" && worte(feld.value) >= (b.mind || 60)) || (W.wo === "hand" && hand.checked));
      }
      function danach() {
        feld.readOnly = true; hand.disabled = true; los.hidden = true; $(".g-stempel", k).hidden = false;
        $$("[data-w]", k).forEach(function (x) { x.disabled = true; });
        var sel = W.check || (W.check = {});
        var d = $('[data-k="danach"]', k);
        var muster = typeof b.muster === "function" ? b.muster(S, ctx()) : b.muster;
        var zelle = b.ampel ? function (i) {
          return '<span class="k-stufen k-ampel" role="radiogroup" aria-label="' + esc(b.kriterien[i][0]) + '">' + AMPEL.map(function (a, j) { return '<label><input type="radio" name="amp-' + b.id + "-" + i + '" value="' + j + '" data-c="' + i + '"' + (sel[i] === j ? " checked" : "") + '><span data-ampel="' + j + '">' + a + "</span></label>"; }).join("") + "</span>";
        } : function (i) {
          return '<label style="display:flex;gap:8px;align-items:center;min-height:44px"><input type="checkbox" data-c="' + i + '" style="width:22px;height:22px"' + (sel[i] ? " checked" : "") + "> zeigt mein Text</label>";
        };
        d.innerHTML = '<h3>' + (b.ampel ? "Prüfe deinen Text mit dem Ampel-Raster" : "Vergleiche mit den Kriterien") + '</h3><p class="k-klein">' + (b.ampel ? "So bewertet auch die Klassenarbeit. Schätze jede Zeile ehrlich ein – niemand sieht das außer dir." : "Kreuze an, was dein Text schon zeigt. Niemand sieht das außer dir.") + '</p><table class="k-kriterien' + (b.ampel ? " k-kriterien--ampel" : "") + '"><tbody>' + b.kriterien.map(function (c, i) {
          return "<tr><th scope=\"row\">" + esc(c[0]) + "</th><td>" + c[1] + "</td><td>" + zelle(i) + "</td></tr>";
        }).join("") + "</tbody></table>" + (muster ? '<details class="k-hilfe" style="margin-top:var(--space-4)"><summary>Eine mögliche Lösung – erst nach deinem Text</summary>' + muster + "</details>" : "") + (b.danach ? "<p style=\"margin-top:var(--space-4)\">" + b.danach + "</p>" : "");
        d.addEventListener("change", function (e) { var c = e.target.getAttribute("data-c"); if (c !== null) { sel[c] = b.ampel ? +e.target.value : e.target.checked; sichern(); } });
      }
      $$("[data-z]", k).forEach(function (x) { x.addEventListener("click", function () { zugang(x.getAttribute("data-z")); }); });
      $$("[data-w]", k).forEach(function (x) { x.addEventListener("click", function () { wo(x.getAttribute("data-w")); }); });
      feld.addEventListener("input", function () { W.text = feld.value; sichern(); pruefe(); });
      hand.addEventListener("change", pruefe);
      los.addEventListener("click", function () { if (los.disabled) return; W.text = W.wo === "tippen" ? feld.value.trim() : ""; W.hand = W.wo === "hand"; W.fest = true; danach(); aktualisieren(); });
      if (W.text) feld.value = W.text;
      if (W.zugang) zugang(W.zugang);
      if (W.fest) { wo(W.hand ? "hand" : "tippen"); if (W.hand) hand.checked = true; danach(); }
      else if (W.wo) wo(W.wo);
      return k;
    }
  };

  BAUSTEINE.kann = {
    bauen: function (b) {
      var a = S.kann;
      var k = el('<div><h3>Das kann ich</h3><ul class="k-kann">' + b.items.map(function (x, i) {
        return "<li><span>" + esc(x) + '</span><span class="k-stufen" role="radiogroup" aria-label="' + esc(x) + '">' + ["sicher", "geht so", "noch nicht"].map(function (s, j) { return '<label><input type="radio" name="kann-' + i + '" value="' + j + '"' + (a[i] === j ? " checked" : "") + "><span>" + s + "</span></label>"; }).join("") + "</span></li>";
      }).join("") + '</ul><p class="k-klein">»Noch nicht« ist ein guter Hinweis: Diese Karten übst du auf der Einheitsseite unter »Lernkarten«.</p></div>');
      k.addEventListener("change", function (e) { var i = e.target.name.split("-")[1]; a[i] = +e.target.value; sichern(); });
      return k;
    }
  };
  BAUSTEINE.sprachen = { bauen: function () {
    var n = el('<div><h3>Zwei Sprachen: deine Übersetzungstabelle</h3><div data-t></div><p class="k-klein">Die Tabelle wächst mit jeder Geschichte. Du findest sie auch auf der Einheitsseite.</p></div>');
    n.kNeu = function () { $("[data-t]", n).innerHTML = sprachenHTML(ST.id); };
    n.kNeu();
    return n;
  } };
  BAUSTEINE.geschichte = { bauen: function (b) {
    return el('<div class="k-kasten k-kasten--auftrag"><div class="k-kasten__kopf">' + esc(b.wie || "Zuhören · Tablet umdrehen") + "</div><p><b>" + esc(b.titel) + "</b> · Jorge Bucay: Komm, ich erzähl dir eine Geschichte</p><p>" + b.hoerauftrag + '</p><p style="opacity:.9">Die Geschichte steht nicht auf dieser Seite. Deine Lehrkraft liest sie aus dem Buch vor.</p></div>');
  } };
  BAUSTEINE.eigen = {
    erledigt: function (b) { return b.erledigt ? !!b.erledigt(S, ctx()) : true; },
    bauen: function (b) { var k = b.bauen(ctx()); return typeof k === "string" ? el(k) : k; }
  };
  BAUSTEINE.eigen.sperrt = true;

  /* ---------- Start und Zusammenfassung ---------- */
  function startSeite(seite, a) {
    var s = stundeVon(ST.id);
    seite.innerHTML += '<p class="k-leise" style="margin:0 0 6px;font-weight:700">Stunde ' + s.nr + " von " + stundenListe().length + " · " + esc(ST.material || "") + " · Doppelstunde, " + ST.minuten + ' Minuten</p><h1 id="t-start">' + esc(s.titel) + '</h1><p class="k-frage">' + esc(ST.frage) + "</p>" +
      '<div class="k-zwei" style="margin:var(--space-5) 0"><div><h3>Darum geht es</h3>' + ST.darum + '</div><div><h3>So arbeitest du mit diesem Blatt</h3><ul><li>Links stehen alle Aufträge. Du siehst immer, wo du bist und was noch kommt.</li><li>Jeder Auftrag hat eine eigene Seite. Du scrollst von oben nach unten.</li><li>Manche Aufträge öffnen sich erst nach deiner Antwort, manche auf Ansage deiner Lehrkraft.</li><li>Am Ende steht die Zusammenfassung zum Abheften: Wissen und Können.</li></ul></div></div>' +
      '<h3>Die Einheit · ' + esc(E.LEITFRAGE) + "</h3>" + landkarteHTML(ST.id) +
      '<div class="k-zwei" style="margin-top:var(--space-6)"><div class="k-merk"><p class="k-merk__titel">Am Ende kannst du …</p><ul>' + ST.ziele.map(function (z) { return "<li>" + z + "</li>"; }).join("") + "</ul></div>" +
      '<div class="k-kasten k-kasten--info"><div class="k-kasten__kopf">Gut zu wissen</div><p>Wir gehen gemeinsam am Board durch die Stunde; du arbeitest an deinem Gerät mit. Was du eintippst, bleibt auf deinem Gerät. Selbsttests sind nur für dich – sie sind ein Denkanstoß, keine Diagnose.</p>' + (ST.hinweis ? "<p>" + ST.hinweis + "</p>" : "") + "</div></div>";
    seite.appendChild(fussLeiste(a));
  }
  function merkHTML() {
    var m = ST.merkseite;
    return '<div class="k-zwei"><div><h3>Kernsatz</h3><div class="k-merk"><p>' + m.kernsatz + '</p></div></div><div><h3>Denkwerkzeug: ' + esc(m.denkwerkzeug[0]) + "</h3><p>" + m.denkwerkzeug[1] + "</p></div></div>" +
      '<h3 style="margin-top:var(--space-5)">Begriffe</h3><table class="k-tabelle"><thead><tr><th scope="col">Begriff</th><th scope="col">Bedeutung</th><th scope="col">Beispiel</th></tr></thead><tbody>' + m.begriffe.map(function (z) { return "<tr><td><b>" + esc(z[0]) + "</b></td><td>" + z[1] + "</td><td>" + z[2] + "</td></tr>"; }).join("") + "</tbody></table>";
  }
  function zusammenfassung(seite, a) {
    seite.innerHTML += '<header class="k-auftrag__kopf"><span class="k-nr" aria-hidden="true">Z</span><div><h2 id="t-z">Zusammenfassung zum Abheften</h2><p class="k-meta"><span>Allein</span><span>5 Minuten</span></p></div></header>' +
      '<p>Die Zusammenfassung hat zwei Teile – so, wie es die Klassenarbeit verlangt: <b>Was du wissen musst</b> und <b>was du können musst</b>. Als PDF sind es vier Seiten für GoodNotes.</p>' +
      '<h3>Wissen</h3>' + merkHTML() +
      '<h3 style="margin-top:var(--space-6)">Können: deine Ergebnisse von heute</h3><div data-k="koennen"></div>' +
      '<div class="k-kasten k-kasten--sichern" style="margin-top:var(--space-6)"><div class="k-kasten__kopf">Sichern</div><p>Die Lernmappe enthält die Merkseite (zwei Seiten) und deine Ergebnisse. Dein Stand für die Einheit – Motivprofil, Kreis, Lernspur – lässt sich als Datei sichern und auf jedem Gerät wieder laden.</p><div class="k-zeile"><button type="button" class="g-knopf g-knopf--primaer" data-k="drucken">Lernmappe als PDF sichern</button><button type="button" class="g-knopf g-knopf--sekundaer" data-k="datei">Stand als Datei sichern</button><a class="g-knopf g-knopf--sekundaer" href="motivation.html">Zur Einheitsseite</a></div></div>' +
      '<p class="k-intro" style="margin-top:var(--space-6)"><b>Fertig.</b> Tablet umdrehen – wir sprechen vorne weiter.</p>';
    $('[data-k="koennen"]', seite).innerHTML = koennenHTML(false);
    var v = vorheriger(a); if (v) { var f = el('<footer class="k-fuss"></footer>'); f.appendChild(el('<button type="button" class="g-knopf g-knopf--still" data-geh="' + v.id + '"><span aria-hidden="true">←</span> Auftrag ' + esc(v.nr) + "</button>")); seite.appendChild(f); }
  }
  /* Können: die tatsächlich eingegebenen Ergebnisse, in der Reihenfolge der Aufträge */
  function koennenHTML(druck) {
    var teile = [];
    function dein(t) { return '<div class="' + (druck ? "d-dein" : "k-dein-text") + '">' + esc(t || "") + "</div>"; }
    auftraege().forEach(function (a) {
      (a.bloecke || []).forEach(function (b) {
        if (b.druck === false) return;
        if (b.typ === "fest" && S.fest[b.id]) teile.push("<p><b>" + (b.kurz || stripTags(b.label)) + "</b></p>" + dein(S.fest[b.id]));
        else if (b.typ === "rueckblick" && S.fest[b.id]) teile.push("<p><b>" + esc(b.label || "Was ich jetzt denke") + "</b></p>" + dein(S.fest[b.id]));
        else if (b.typ === "wahl") {
          var z = b.items.filter(function (x) { return S.wahl[x.id]; });
          if (z.length && b.druck !== "kurz") teile.push("<table" + (druck ? "" : ' class="k-tabelle"') + "><thead><tr><th>Aufgabe</th><th>Meine Wahl</th><th>Meine Begründung</th></tr></thead><tbody>" + z.map(function (x) { var w = S.wahl[x.id]; return "<tr><td>" + esc(kurz(stripTags(x.text), 110)) + "</td><td>" + esc(x.opt[w.o][0]) + "</td><td>" + esc(w.g) + "</td></tr>"; }).join("") + "</tbody></table>");
        }
        else if (b.typ === "verorten" && S.verorten && S.verorten.ok) teile.push("<p><b>Im Motivationskreis verortet:</b> " + begriffeVon(ST.id).map(function (bid) { return esc(E.BEGRIFFE[bid].name) + " → " + esc(stationName(S.verorten.lage[bid])); }).join(" · ") + "</p>");
        else if (b.typ === "verbindung" && S.verbindung && S.verbindung.fest) { var V = S.verbindung; teile.push("<p><b>Meine Verbindung:</b></p>" + dein("»" + nameBegriff(V.neu) + "« " + V.art + " »" + nameBegriff(V.alt) + "«: " + V.satz)); }
        else if (b.typ === "lernspur" && S.lernspur) teile.push("<p><b>Meine Lernspur (" + esc(E.LEITFRAGE) + "):</b></p>" + dein(S.lernspur));
        else if (b.typ === "schreiben" && S.schreiben[b.id] && S.schreiben[b.id].fest) {
          var W = S.schreiben[b.id], ch = W.check || {};
          var krit = b.ampel ? b.kriterien.map(function (c, i) { return esc(c[0]) + ": " + (ch[i] === undefined ? "–" : AMPEL[ch[i]]); }).join(" · ") : (b.kriterien.filter(function (c, i) { return ch[i]; }).map(function (c) { return esc(c[0]); }).join(", ") || "noch keine angekreuzt");
          teile.push("<p><b>Wie in der Klassenarbeit (" + esc(b.operator) + "):</b> " + b.aufgabe + "</p>" + (W.hand ? "<p>Von Hand auf Papier geschrieben.</p>" : dein(W.text)) + "<p>" + (b.ampel ? "Meine Ampel: " : "Kriterien, die mein Text schon zeigt: ") + krit + "</p>");
        }
        else if (b.typ === "eigen" && b.druck && typeof b.druck === "function") { var x = b.druck(ctx()); if (x) teile.push(x); }
        else if (b.typ === "kann") { var a2 = S.kann; teile.push("<p><b>Das kann ich:</b> " + b.items.map(function (t, i) { return esc(t) + " – " + (a2[i] === undefined ? "noch nicht eingeschätzt" : ["sicher", "geht so", "noch nicht"][a2[i]]); }).join("; ") + "</p>"); }
      });
    });
    return teile.length ? teile.join("") : '<p class="k-klein">Noch keine Ergebnisse. Sie erscheinen hier, sobald du etwas festlegst.</p>';
  }
  function stripTags(h) { return String(h || "").replace(/<[^>]+>/g, ""); }
  function kurz(t, n) { t = String(t); return t.length > n ? t.slice(0, n - 1) + "…" : t; }
  function nameBegriff(id) { if (E.BEGRIFFE && E.BEGRIFFE[id]) return E.BEGRIFFE[id].name; var n = id; (E.WAHRNEHMUNG || []).forEach(function (w) { if (w[0] === id) n = w[1]; }); return n; }

  /* ---------- Druck: Merkseite (zwei Seiten) und Können ---------- */
  function druckBauen() {
    var s = stundeVon(ST.id), m = ST.merkseite;
    var kreis = (E.STATIONEN || []).map(function (st) {
      var bs = []; stundenListe().forEach(function (x) { if (frueher(ST.id).concat([ST.id]).indexOf(x.id) < 0) return; begriffeVon(x.id).forEach(function (bid) { if (lageVon(bid, true) === st.id) bs.push(E.BEGRIFFE[bid].name); }); });
      return '<div class="' + (["handeln", "ergebnis", "erklaerung"].indexOf(st.id) >= 0 ? "d-breit" : "") + '"><b>' + esc(st.name) + " – " + esc(st.frage) + "</b>" + (bs.length ? esc(bs.join(" · ")) : "–") + "</div>";
    }).join("");
    var spr = sprachenZeilen(ST.id).filter(function (r) { return r.b.ds === ST.id; });
    $("#druck").innerHTML =
      '<section class="d-seite"><p class="d-meta">Psycho-Labor · Einheit Motivation · Stunde ' + s.nr + " · Merkseite · " + heute() + "</p><h1>" + esc(s.titel) + '</h1><p class="d-meta">Leitfrage der Einheit: ' + esc(E.LEITFRAGE) + '</p><div class="d-kasten"><b>Kernsatz:</b> ' + m.kernsatz + "</div><h2>Begriffe</h2><table><tr><th>Begriff</th><th>Bedeutung</th><th>Beispiel</th></tr>" + m.begriffe.map(function (z) { return "<tr><td>" + esc(z[0]) + "</td><td>" + z[1] + "</td><td>" + z[2] + "</td></tr>"; }).join("") + "</table><h2>Denkwerkzeug: " + esc(m.denkwerkzeug[0]) + "</h2><p>" + m.denkwerkzeug[1] + "</p>" + (m.extra1 || "") + "</section>" +
      '<section class="d-seite"><p class="d-meta">Merkseite, Seite 2</p><h2>Der Motivationskreis (Modell, bis heute)</h2><p class="d-meta">Ich und Umgebung → Erwartung × Wert → Motivation und Handeln → Ergebnis → Erklärung → wirkt zurück auf Ich und Erwartung.</p><div class="d-kreis">' + kreis + "</div>" + (m.extra2 || "") +
      (spr.length ? "<h2>Zwei Sprachen: " + esc(spr[0].b.geschichte) + "</h2><table><tr><th>Bucays Bild</th><th>Fachsprache</th></tr>" + spr.map(function (r) { return "<tr><td>" + esc(r.b.bild) + "</td><td>" + esc(r.b.fach) + "</td></tr>"; }).join("") + "</table>" : "") +
      "<h2>Erinnern ohne Heft (Beginn der nächsten Stunde)</h2><ol>" + m.abruf.map(function (f) { return "<li>" + f + "</li>"; }).join("") + '</ol><p class="d-meta">Quellen: ' + m.quellen + "</p></section>" +
      '<section class="d-seite"><p class="d-meta">Können · meine Ergebnisse · nur für mich</p><h1>Mein Lernweg in Stunde ' + s.nr + "</h1>" + koennenHTML(true) + "</section>";
  }

  /* ---------- Start der Stunde ---------- */
  function stundeStarten() {
    S = stunde(ST.id);
    if (!ST.auftraege[0] || ST.auftraege[0].id !== "start") ST.auftraege.unshift({ id: "start", nr: "S", titel: "Start", sozial: "Plenum", min: 3 });
    if (ST.auftraege[ST.auftraege.length - 1].id !== "z") ST.auftraege.push({ id: "z", nr: "Z", titel: "Zusammenfassung", sozial: "Zum Abheften", min: 5, oeffnet: "nach" });
    var app = $("#app");
    app.innerHTML = kopfHTML() + '<div class="k-rahmen">' + registerHTML() + '<main class="k-blatt" id="blatt" tabindex="-1"></main></div><div class="k-unten"></div><div class="k-druck" id="druck"></div>';
    var unten = $(".k-unten"); unten.innerHTML = fussHTML().replace("k-register__fuss", "k-register__fuss k-unten-fuss");
    if (window.Gegenwart) window.Gegenwart.init(app);
    doc.addEventListener("click", function (e) {
      var r = e.target.closest(".k-reg"); if (r) { zeigen(r.getAttribute("data-a"), true); return; }
      var g = e.target.closest("[data-geh]"); if (g && !g.disabled) { zeigen(g.getAttribute("data-geh"), true); return; }
      var k = e.target.closest("[data-k]"); if (!k) return;
      var was = k.getAttribute("data-k"), box = k.closest(".k-register__fuss, .k-seite") || doc;
      if (was === "datei") alsDatei();
      else if (was === "drucken") { druckBauen(); window.print(); }
      else if (was === "loeschen-auf") { var l = $('[data-k="loeschen"]', box); l.hidden = !l.hidden; if (!l.hidden) $("button", l).focus(); }
      else if (was === "loeschen-nein") { $('[data-k="loeschen"]', box).hidden = true; }
      else if (was === "loeschen-stunde") { stundeLoeschen(ST.id); location.hash = ""; location.reload(); }
      else if (was === "loeschen-alles") { allesLoeschen(); location.hash = ""; location.reload(); }
      else if (was === "tafel") { if (LK) { try { sessionStorage.removeItem("psycholabor:tafel"); } catch (x) {} location.reload(); } else { var q = $('[data-k="tafel-frage"]', box); q.hidden = !q.hidden; } }
      else if (was === "tafel-nein") { $('[data-k="tafel-frage"]', box).hidden = true; }
      else if (was === "tafel-ja") { try { sessionStorage.setItem("psycholabor:tafel", "1"); } catch (x) {} location.reload(); }
    });
    doc.addEventListener("change", function (e) {
      var k = e.target.getAttribute && e.target.getAttribute("data-k");
      if (k === "ansicht") { ansichtSetzen(e.target.value); try { localStorage.setItem("g-ansicht", e.target.value); } catch (x) {} $$('[data-k="ansicht"]').forEach(function (s) { s.value = e.target.value; }); }
      if (k === "laden" && e.target.files[0]) {
        var rueck = e.target.closest(".k-register__fuss").querySelector('[data-k="datei-rueck"]');
        ausDatei(e.target.files[0], function (ok) { if (ok) location.reload(); else rueck.textContent = "Diese Datei passt nicht. Wähle »mein-motivprofil.json«."; });
      }
    });
    $$('[data-k="ansicht"]').forEach(function (s) { s.value = ansichtLaden(); });
    window.addEventListener("hashchange", function () { var id = location.hash.slice(1); if (id && (!AKT || id !== AKT.id) && auftragVon(id)) zeigen(id, true); });
    window.addEventListener("beforeprint", druckBauen);
    var start = location.hash.slice(1) || S.ort || "start";
    zeigen(auftragVon(start) ? start : "start", false);
    if (/[?&]druck=/.test(location.search)) druckBauen();
  }

  window.Kern = {
    daten: function () { return D; }, stunde: stunde, sichern: sichern, esc: esc, el: el, $: $, $$: $$, worte: worte, wortStufe: wortStufe,
    kreisHTML: kreisHTML, landkarteHTML: landkarteHTML, sprachenHTML: sprachenHTML, sprachenZeilen: sprachenZeilen, lageVon: lageVon, begriffeVon: begriffeVon, stundeVon: stundeVon, stundenListe: stundenListe, nameBegriff: nameBegriff, stationName: stationName,
    alsDatei: alsDatei, ausDatei: ausDatei, allesLoeschen: allesLoeschen, ansichtSetzen: ansichtSetzen, ansichtLaden: ansichtLaden, STUFEN: STUFEN
  };
  if (ST) { if (doc.readyState !== "loading") stundeStarten(); else doc.addEventListener("DOMContentLoaded", stundeStarten); }
})();
