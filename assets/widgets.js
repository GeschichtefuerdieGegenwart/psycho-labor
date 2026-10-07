/* Psycho-Labor – wiederverwendbare Lern-Widgets
   Gebaut nach dem Orientierungsmodell für digitale Lernpfade:
   P1 Denken vor Klicken  – erst festlegen und kurz begründen, dann Rückmeldung
   P3 Feedback, das erklärt – zu jeder Antwortoption eine eigene Erklärung plus nächster Schritt
   P4 Unterstützung, die sich zurückzieht – Tipps erst nach dem eigenen Versuch, je nach Zugang
   Inhalte kommen als Datenobjekt; die Widgets kennen keine Fachinhalte.
   Zustand liegt nur lokal (Lab.load/Lab.save). */

(function () {
  "use strict";

  var W = {};
  var esc = Lab.esc;
  var KEY = "widgets";
  var st = {};

  /* Speicher für eine Seite festlegen */
  W.use = function (key) { KEY = key; st = Lab.load(KEY, {}); };
  W.get = function (id, d) { return Object.prototype.hasOwnProperty.call(st, id) ? st[id] : d; };
  W.set = function (id, v) { st[id] = v; Lab.save(KEY, st); };
  W.reset = function () { st = {}; Lab.save(KEY, st); };

  /* Zugang bei Anwendungsaufgaben: "beispiel" | "hilfe" | "ohne" */
  W.mode = function (m) { if (m) W.set("_modus", m); return W.get("_modus", "hilfe"); };
  W.tipsAllowed = function () { return W.mode() !== "ohne"; };

  var LEVEL = {
    zentral: { label: "zentral", cls: "lv-ok" },
    begruendbar: { label: "auch begründbar", cls: "lv-mid" },
    kaum: { label: "passt kaum", cls: "lv-low" }
  };

  function reasonHTML(d) {
    if (!d.begruenden) return "";
    return '<label class="w-reason"><span>' + esc(d.begruendenText || "Begründe kurz – ein Satz reicht:") + '</span><textarea rows="2" maxlength="400"></textarea></label>';
  }
  function reasonOK(root, d) {
    if (!d.begruenden) return true;
    var t = root.querySelector(".w-reason textarea");
    return t && t.value.trim().length >= (d.minReason || 12);
  }
  function reasonVal(root) { var t = root.querySelector(".w-reason textarea"); return t ? t.value.trim() : ""; }
  function setReason(root, v) { var t = root.querySelector(".w-reason textarea"); if (t && v) t.value = v; }

  /* ---------- Einfachwahl mit Rückmeldung je Option ---------- */
  /* d = {id, frage, optionen:[{t, ok, fb}], begruenden, tipp, weiter} */
  W.single = function (root, d) {
    root.classList.add("w");
    root.innerHTML = '<p class="w-q">' + d.frage + "</p>" +
      '<div class="choices">' + d.optionen.map(function (o, i) { return '<button type="button" class="choice" data-i="' + i + '">' + o.t + "</button>"; }).join("") + "</div>" +
      reasonHTML(d) +
      '<div class="actions"><button type="button" class="btn w-check" disabled>Festlegen und prüfen</button><button type="button" class="btn secondary w-tip" hidden>Tipp</button></div>' +
      '<div class="w-tipbox" hidden></div><div class="w-fb" aria-live="polite"></div>';
    var sel = -1, rec = W.get(d.id, null), btns = Lab.$$(".choice", root), check = root.querySelector(".w-check");
    function upd() { check.disabled = sel < 0 || !reasonOK(root, d); }
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        if (root.classList.contains("done")) return;
        btns.forEach(function (x) { x.classList.remove("selected", "right", "wrong"); });
        b.classList.add("selected"); sel = +b.getAttribute("data-i"); upd();
      });
    });
    var ta = root.querySelector(".w-reason textarea"); if (ta) ta.addEventListener("input", upd);
    function show(i, first) {
      var o = d.optionen[i], fb = root.querySelector(".w-fb");
      btns[i].classList.add(o.ok ? "right" : "wrong");
      fb.className = "w-fb " + (o.ok ? "fb-ok" : "fb-no");
      fb.innerHTML = "<strong>" + (o.ok ? "Passt." : "Noch nicht.") + "</strong> " + o.fb +
        (o.ok ? (d.weiter ? '<p class="w-next">' + d.weiter + "</p>" : "") : '<p class="w-next">Nächster Schritt: Lies die Erklärung und lege dich neu fest.</p>');
      if (o.ok) { root.classList.add("done"); check.hidden = true; root.querySelector(".w-tip").hidden = true; }
      else if (d.tipp && W.tipsAllowed()) root.querySelector(".w-tip").hidden = false;
      if (first !== false) {
        var r = W.get(d.id, null) || { erste: i, versuche: 0 };
        r.letzte = i; r.ok = !!o.ok; r.versuche++; r.grund = reasonVal(root); W.set(d.id, r);
      }
    }
    check.addEventListener("click", function () { if (sel >= 0) show(sel); });
    root.querySelector(".w-tip").addEventListener("click", function () { var t = root.querySelector(".w-tipbox"); t.innerHTML = d.tipp; t.hidden = false; });
    if (rec && rec.ok) { setReason(root, rec.grund); btns[rec.letzte].classList.add("selected"); show(rec.letzte, false); }
  };

  /* ---------- Zuordnungsraster: jede Zeile einer Kategorie zuordnen ---------- */
  /* d = {id, frage, kategorien:[{k,label}], items:[{t, k, fb:{k:text}}]} */
  W.grid = function (root, d) {
    root.classList.add("w");
    root.innerHTML = '<p class="w-q">' + d.frage + "</p>" +
      '<div class="w-grid">' + d.items.map(function (it, i) {
        return '<div class="w-row" data-i="' + i + '"><div class="w-item">' + it.t + '</div><div class="seg">' +
          d.kategorien.map(function (c) { return '<button type="button" data-k="' + c.k + '">' + esc(c.label) + "</button>"; }).join("") +
          '</div><div class="w-rowfb" aria-live="polite"></div></div>';
      }).join("") + "</div>" +
      '<div class="actions"><button type="button" class="btn w-check" disabled>Alle festlegen und prüfen</button><span class="small w-count"></span></div>';
    var rows = Lab.$$(".w-row", root), check = root.querySelector(".w-check"), rec = W.get(d.id, {});
    function chosen(row) { var b = row.querySelector(".seg button.on"); return b ? b.getAttribute("data-k") : null; }
    function upd() { check.disabled = rows.some(function (r) { return !chosen(r); }); }
    rows.forEach(function (row) {
      Lab.$$(".seg button", row).forEach(function (b) {
        b.addEventListener("click", function () {
          Lab.$$(".seg button", row).forEach(function (x) { x.classList.remove("on"); });
          b.classList.add("on"); row.classList.remove("right", "wrong", "checked"); upd();
        });
      });
    });
    function evaluate(save) {
      var right = 0, ans = {};
      rows.forEach(function (row) {
        var it = d.items[+row.getAttribute("data-i")], k = chosen(row), ok = k === it.k;
        ans[row.getAttribute("data-i")] = k;
        if (ok) right++;
        row.classList.remove("right", "wrong"); row.classList.add("checked", ok ? "right" : "wrong");
        row.querySelector(".w-rowfb").innerHTML = "<strong>" + (ok ? "Passt." : "Noch nicht.") + "</strong> " + ((it.fb && it.fb[k]) || "");
      });
      root.querySelector(".w-count").textContent = right + " von " + rows.length + " passend" + (right < rows.length ? " – ändere die markierten Zeilen und prüfe erneut." : ".");
      if (save) { var r = W.get(d.id, { versuche: 0 }); r.versuche = (r.versuche || 0) + 1; r.antworten = ans; r.richtig = right; W.set(d.id, r); }
    }
    check.addEventListener("click", function () { evaluate(true); });
    if (rec && rec.antworten) {
      rows.forEach(function (row) { var k = rec.antworten[row.getAttribute("data-i")]; var b = row.querySelector('.seg button[data-k="' + k + '"]'); if (b) b.classList.add("on"); });
      upd(); evaluate(false);
    }
  };

  /* ---------- Erkunden mit gestufter Rückmeldung (Deutungsfragen) ---------- */
  /* d = {id, titel, situation, frage, optionen:[{t, stufe, fb}], tipp, beispiel} */
  W.explore = function (root, d) {
    root.classList.add("w", "w-explore");
    var worked = d.beispiel && W.mode() === "beispiel";
    root.innerHTML = (d.titel ? "<h3>" + d.titel + "</h3>" : "") +
      '<div class="w-situation">' + d.situation + "</div>" +
      (worked ? '<div class="w-worked"><span class="kicker">Beispiel zum Nachmachen</span>' + d.beispiel + "</div>" : "") +
      '<p class="w-q">' + d.frage + "</p>" +
      '<div class="choices">' + d.optionen.map(function (o, i) { return '<button type="button" class="choice" data-i="' + i + '">' + o.t + "</button>"; }).join("") + "</div>" +
      reasonHTML({ begruenden: true, begruendenText: d.begruendenText || "Woran in der Szene machst du das fest?" }) +
      '<div class="actions"><button type="button" class="btn w-check" disabled>Festlegen</button><button type="button" class="btn secondary w-tip" hidden>Hilfekarte</button><button type="button" class="btn secondary w-all" hidden>Alle Deutungen vergleichen</button></div>' +
      '<div class="w-tipbox" hidden></div><div class="w-fb" aria-live="polite"></div><div class="w-allbox" hidden></div>';
    var sel = -1, btns = Lab.$$(".choice", root), check = root.querySelector(".w-check");
    var rd = { begruenden: true, minReason: 12 };
    function upd() { check.disabled = sel < 0 || !reasonOK(root, rd); }
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.classList.remove("selected"); });
        b.classList.add("selected"); sel = +b.getAttribute("data-i"); upd();
      });
    });
    root.querySelector(".w-reason textarea").addEventListener("input", upd);
    var NEXT = {
      zentral: "Stark begründet. Prüfe mit „Alle Deutungen vergleichen“, ob noch eine zweite Deutung zentral ist.",
      begruendbar: "Vertretbar. Welche Deutung erklärt die Szene noch genauer? Wähle eine zweite und vergleiche.",
      kaum: "Lies die Szene noch einmal genau. Was passiert dort wirklich? Lege dich dann neu fest."
    };
    function show(i, save) {
      var o = d.optionen[i], lv = LEVEL[o.stufe], fb = root.querySelector(".w-fb");
      btns.forEach(function (x) { x.classList.remove("lv-ok", "lv-mid", "lv-low"); });
      btns[i].classList.add(lv.cls);
      fb.className = "w-fb " + (o.stufe === "zentral" ? "fb-ok" : o.stufe === "kaum" ? "fb-no" : "fb-mid");
      fb.innerHTML = '<span class="lv-badge ' + lv.cls + '">' + lv.label + "</span> " + o.fb + '<p class="w-next">' + NEXT[o.stufe] + "</p>";
      root.querySelector(".w-all").hidden = false;
      if (d.tipp && W.tipsAllowed() && o.stufe !== "zentral") root.querySelector(".w-tip").hidden = false;
      if (save) {
        var r = W.get(d.id, { versuche: 0 });
        if (r.erste == null) { r.erste = i; r.ersteStufe = o.stufe; }
        r.letzte = i; r.stufe = o.stufe; r.grund = reasonVal(root); r.versuche++; W.set(d.id, r);
      }
    }
    check.addEventListener("click", function () { if (sel >= 0) show(sel, true); });
    root.querySelector(".w-tip").addEventListener("click", function () { var t = root.querySelector(".w-tipbox"); t.innerHTML = d.tipp; t.hidden = false; });
    root.querySelector(".w-all").addEventListener("click", function () {
      var box = root.querySelector(".w-allbox");
      box.innerHTML = d.optionen.map(function (o) { var lv = LEVEL[o.stufe]; return '<div class="w-allrow"><span class="lv-badge ' + lv.cls + '">' + lv.label + "</span> <strong>" + o.t + "</strong><br>" + o.fb + "</div>"; }).join("");
      box.hidden = false;
    });
    var rec = W.get(d.id, null);
    if (rec && rec.letzte != null) { setReason(root, rec.grund); btns[rec.letzte].classList.add("selected"); sel = rec.letzte; upd(); show(rec.letzte, false); }
  };

  /* ---------- Vorhersage festhalten ---------- */
  /* d = {id, frage, optionen:[text] | regler:{min,max,links,rechts,start}, begruenden} */
  W.predict = function (root, d, onCommit) {
    root.classList.add("w", "w-predict");
    var body = d.regler
      ? '<div class="slider-row"><span class="small">' + esc(d.regler.links) + '</span><input type="range" min="' + d.regler.min + '" max="' + d.regler.max + '" step="1" value="' + d.regler.start + '" aria-label="' + esc(d.frage) + '"><span class="small">' + esc(d.regler.rechts) + '</span></div><p class="center"><span class="slider-value w-val"></span></p>'
      : '<div class="choices">' + d.optionen.map(function (t, i) { return '<button type="button" class="choice" data-i="' + i + '">' + t + "</button>"; }).join("") + "</div>";
    root.innerHTML = '<p class="w-q">' + d.frage + "</p>" + body + reasonHTML({ begruenden: d.begruenden !== false, begruendenText: d.begruendenText }) +
      '<div class="actions"><button type="button" class="btn w-check" disabled>Vorhersage festhalten</button></div><div class="w-fb" aria-live="polite"></div>';
    var check = root.querySelector(".w-check"), val = null, rd = { begruenden: d.begruenden !== false };
    function upd() { check.disabled = val === null || !reasonOK(root, rd); }
    if (d.regler) {
      var r = root.querySelector("input[type=range]"), out = root.querySelector(".w-val");
      var fmt = d.regler.fmt || function (v) { return v; };
      r.addEventListener("input", function () { val = +r.value; out.textContent = fmt(val); upd(); });
      out.textContent = "–";
    } else {
      Lab.$$(".choice", root).forEach(function (b) { b.addEventListener("click", function () { if (root.classList.contains("done")) return; Lab.$$(".choice", root).forEach(function (x) { x.classList.remove("selected"); }); b.classList.add("selected"); val = +b.getAttribute("data-i"); upd(); }); });
    }
    var ta = root.querySelector(".w-reason textarea"); if (ta) ta.addEventListener("input", upd);
    function lock(rec) {
      root.classList.add("done");
      Lab.$$("input, textarea, .choice", root).forEach(function (x) { x.disabled = true; });
      check.hidden = true;
      root.querySelector(".w-fb").className = "w-fb fb-mid";
      root.querySelector(".w-fb").innerHTML = "<strong>Festgehalten.</strong> " + (d.festText || "Am Ende der Stunde kommst du auf deine Vorhersage zurück.");
      if (d.regler) { root.querySelector("input[type=range]").value = rec.v; root.querySelector(".w-val").textContent = (d.regler.fmt || String)(rec.v); }
      else Lab.$$(".choice", root)[rec.v].classList.add("selected");
      setReason(root, rec.grund);
    }
    check.addEventListener("click", function () { var rec = { v: val, grund: reasonVal(root) }; W.set(d.id, rec); lock(rec); if (onCommit) onCommit(rec); });
    var rec = W.get(d.id, null); if (rec) lock(rec);
  };

  /* ---------- Vorhersage auflösen: erst eigene Vorhersage zeigen, dann Auflösung ---------- */
  /* d = {id (der Vorhersage), optionen?, aufloesung: html | function(rec), fb?: {index: text}} */
  W.reveal = function (root, d) {
    root.classList.add("w");
    var rec = W.get(d.id, null);
    var mine = rec ? (d.optionen ? d.optionen[rec.v] : String(rec.v)) : "<em>keine Vorhersage</em>";
    root.innerHTML = (d.kompakt ? "" : '<div class="w-mine"><span class="kicker">Deine Vorhersage</span><p><strong>' + mine + "</strong>" + (rec && rec.grund ? "<br><span class=\"small\">Begründung: " + esc(rec.grund) + "</span>" : "") + "</p></div>") +
      '<div class="actions"><button type="button" class="btn w-open">Auflösen</button></div><div class="w-res" aria-live="polite" hidden></div>';
    root.querySelector(".w-open").addEventListener("click", function () {
      var res = root.querySelector(".w-res"), html = typeof d.aufloesung === "function" ? d.aufloesung(rec) : d.aufloesung;
      if (rec && d.fb && d.fb[rec.v] != null) html += '<p class="w-next">' + d.fb[rec.v] + "</p>";
      res.innerHTML = html; res.hidden = false; this.hidden = true;
      W.set(d.id + "_offen", true);
    });
    if (W.get(d.id + "_offen", false)) root.querySelector(".w-open").click();
  };

  /* ---------- Regler mit Live-Modell (nur, wenn ein Zusammenhang der Lerngegenstand ist) ---------- */
  /* d = {id, min, max, start, links, rechts, render(v) -> html} */
  W.slider = function (root, d) {
    root.classList.add("w");
    root.innerHTML = '<div class="slider-row"><span class="small">' + esc(d.links) + '</span><input type="range" min="' + d.min + '" max="' + d.max + '" step="1" value="' + W.get(d.id, d.start) + '" aria-label="' + esc(d.aria || d.links + " bis " + d.rechts) + '"><span class="small">' + esc(d.rechts) + '</span></div><div class="w-live" aria-live="polite"></div>';
    var r = root.querySelector("input"), out = root.querySelector(".w-live");
    function draw() { out.innerHTML = d.render(+r.value); W.set(d.id, +r.value); }
    r.addEventListener("input", draw); draw();
  };

  /* ---------- Kriterienraster zur Selbstkontrolle ---------- */
  /* d = {id, stufen:[{name, kriterien:[text]}]} */
  W.criteria = function (root, d) {
    root.classList.add("w", "w-criteria");
    var rec = W.get(d.id, {});
    root.innerHTML = '<div class="crit">' + d.stufen.map(function (s, si) {
      return '<div class="crit-col"><h4>' + esc(s.name) + "</h4>" + s.kriterien.map(function (k, ki) {
        var key = si + "-" + ki;
        return '<label class="crit-item"><input type="checkbox" data-k="' + key + '"' + (rec[key] ? " checked" : "") + "><span>" + k + "</span></label>";
      }).join("") + "</div>";
    }).join("") + "</div>";
    Lab.$$("input", root).forEach(function (c) { c.addEventListener("change", function () { var r = W.get(d.id, {}); r[c.getAttribute("data-k")] = c.checked; W.set(d.id, r); }); });
  };

  /* ---------- Selbsteinschätzung zu den Ich-kann-Zielen ---------- */
  W.selfcheck = function (root, d) {
    root.classList.add("w");
    var rec = W.get(d.id, {}), labels = { s: "sicher", t: "teilweise", n: "noch nicht" };
    root.innerHTML = d.ziele.map(function (z, i) {
      return '<div class="sort-item"><div>' + z + '</div><div class="seg">' + Object.keys(labels).map(function (k) { return '<button type="button" data-z="' + i + '" data-v="' + k + '"' + (rec[i] === k ? ' class="on"' : "") + ">" + labels[k] + "</button>"; }).join("") + "</div></div>";
    }).join("");
    Lab.$$(".seg button", root).forEach(function (b) {
      b.addEventListener("click", function () {
        Lab.$$('.seg button[data-z="' + b.getAttribute("data-z") + '"]', root).forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); var r = W.get(d.id, {}); r[b.getAttribute("data-z")] = b.getAttribute("data-v"); W.set(d.id, r);
      });
    });
  };

  /* ---------- Freitext, der sich selbst speichert ---------- */
  W.text = function (ta, id) { ta.value = W.get(id, ""); ta.addEventListener("input", function () { W.set(id, ta.value); }); };

  window.Lab.W = W;
})();
