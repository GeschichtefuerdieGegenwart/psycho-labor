/* Psycho-Labor – gemeinsame Werkzeuge für alle Bausteine.
   Alles läuft im Browser. Es werden keine Daten an einen Server gesendet.
   Ergebnisse liegen nur im Speicher dieses Geräts (localStorage). */

(function () {
  "use strict";

  var Lab = {};

  /* ---------- Speicher (mit Absicherung, falls blockiert) ---------- */
  var memory = {};
  Lab.load = function (key, fallback) {
    try {
      var raw = window.localStorage.getItem("psycholabor:" + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return key in memory ? memory[key] : fallback;
    }
  };
  Lab.save = function (key, value) {
    memory[key] = value;
    try { window.localStorage.setItem("psycholabor:" + key, JSON.stringify(value)); } catch (e) { /* nur im Arbeitsspeicher */ }
  };
  Lab.remove = function (key) {
    delete memory[key];
    try { window.localStorage.removeItem("psycholabor:" + key); } catch (e) {}
  };

  /* ---------- Hilfen ---------- */
  Lab.$ = function (sel, root) { return (root || document).querySelector(sel); };
  Lab.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  Lab.uid = function () { return Math.random().toString(36).slice(2, 6); };
  Lab.mean = function (arr) { var a = arr.filter(function (x) { return typeof x === "number" && !isNaN(x); }); return a.length ? a.reduce(function (s, x) { return s + x; }, 0) / a.length : NaN; };
  Lab.sec = function (x) { return isNaN(x) ? "–" : (Math.round(x * 10) / 10).toString().replace(".", ",") + " s"; };
  Lab.shuffle = function (arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  Lab.esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  Lab.logo = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#0e6b68"/><path d="M9 17c0-4.4 3.1-8 7.2-8 3.6 0 6.3 2.6 6.3 6 0 2.1-1 3.5-2.4 4.4l.4 3.6h-5.1l-.3-2.2H12c-1.7 0-3-1.6-3-3.8z" fill="#fffdf9"/><circle cx="17.5" cy="14.5" r="2.2" fill="#d9643f"/></svg>';
  Lab.lockIcon = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><rect x="4" y="9" width="12" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

  /* ---------- Schritte und Fortschritt ---------- */
  Lab.Steps = function (opts) {
    var steps = Lab.$$(".step");
    var bar = Lab.$(".lab-progress");
    var current = 0;
    if (bar) bar.innerHTML = steps.map(function () { return "<span></span>"; }).join("");
    function show(i) {
      current = Math.max(0, Math.min(steps.length - 1, i));
      steps.forEach(function (s, k) { s.classList.toggle("active", k === current); });
      if (bar) Lab.$$("span", bar).forEach(function (d, k) { d.className = k < current ? "done" : (k === current ? "now" : ""); });
      window.scrollTo(0, 0);
      if (opts && opts.onShow) opts.onShow(steps[current].id, current);
    }
    Lab.$$("[data-next]").forEach(function (b) { b.addEventListener("click", function () { show(current + 1); }); });
    Lab.$$("[data-prev]").forEach(function (b) { b.addEventListener("click", function () { show(current - 1); }); });
    show(0);
    return { show: show, get index() { return current; }, goto: function (id) { show(steps.findIndex(function (s) { return s.id === id; })); } };
  };

  /* Auswahl-Kacheln: genau eine Option */
  Lab.choiceGroup = function (root, onChange) {
    Lab.$$(".choice", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        Lab.$$(".choice", root).forEach(function (b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
        if (onChange) onChange(btn.getAttribute("data-value"));
      });
    });
  };

  /* ---------- QR-Code als SVG ---------- */
  Lab.qrSVG = function (text, size) {
    if (!window.PsyQR) return "";
    var q = window.PsyQR(text), n = q.getModuleCount(), cell = 1, quiet = 2, dim = n + quiet * 2, d = "";
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) d += "M" + (c + quiet) + " " + (r + quiet) + "h1v1h-1z";
    return '<svg viewBox="0 0 ' + dim + " " + dim + '" width="' + (size || 220) + '" height="' + (size || 220) + '" shape-rendering="crispEdges" role="img" aria-label="QR-Code"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#1d2230"/></svg>';
  };

  /* Adresse der Auswertungsseite der Lehrkraft mit den Daten im Anker (#) –
     der Anker wird beim Öffnen nicht an den Server übertragen. */
  Lab.resultURL = function (payload) {
    var u = new URL("auswertung.html", window.location.href);
    u.hash = "d=" + payload;
    return u.toString();
  };

  /* ---------- Punktdiagramm: jede Person ein Punkt, dazu der Mittelwert ---------- */
  /* groups: [{label, color, values:[...], highlight: number|null}] */
  Lab.dotPlot = function (groups, opt) {
    opt = opt || {};
    var W = 820, rowH = opt.rowH || 78, left = 230, right = 30, top = 18, bottom = 46;
    var H = top + bottom + rowH * groups.length;
    var all = [];
    groups.forEach(function (g) { all = all.concat(g.values.filter(function (v) { return !isNaN(v); })); if (g.highlight != null) all.push(g.highlight); });
    var maxV = opt.max || Math.max(10, Math.ceil((Math.max.apply(null, all.concat([1])) * 1.1) / 5) * 5);
    function x(v) { return left + (W - left - right) * (v / maxV); }
    var s = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + Lab.esc(opt.aria || "Diagramm") + '">';
    var ticks = 5, step = maxV / ticks;
    for (var t = 0; t <= ticks; t++) {
      var tv = Math.round(step * t * 10) / 10, tx = x(tv);
      s += '<line x1="' + tx + '" y1="' + top + '" x2="' + tx + '" y2="' + (H - bottom + 6) + '" stroke="#e2dbcf" stroke-width="1"/>';
      s += '<text x="' + tx + '" y="' + (H - bottom + 26) + '" text-anchor="middle" font-size="15" fill="#545b6b">' + String(tv).replace(".", ",") + "</text>";
    }
    s += '<text x="' + (W - right) + '" y="' + (H - 4) + '" text-anchor="end" font-size="14" fill="#545b6b">' + Lab.esc(opt.unit || "Sekunden") + "</text>";
    groups.forEach(function (g, i) {
      var cy = top + rowH * i + rowH / 2;
      s += '<text x="' + (left - 16) + '" y="' + (cy + 6) + '" text-anchor="end" font-size="17" font-weight="600" fill="#1d2230">' + Lab.esc(g.label) + "</text>";
      var vals = g.values.filter(function (v) { return !isNaN(v); });
      vals.forEach(function (v, k) {
        var jitter = ((k % 5) - 2) * 6;
        s += '<circle cx="' + x(v) + '" cy="' + (cy + jitter) + '" r="9" fill="' + g.color + '" fill-opacity=".45" stroke="' + g.color + '" stroke-width="1.5"/>';
      });
      var m = Lab.mean(vals);
      if (!isNaN(m)) {
        s += '<line x1="' + x(m) + '" y1="' + (cy - 26) + '" x2="' + x(m) + '" y2="' + (cy + 26) + '" stroke="#1d2230" stroke-width="4" stroke-linecap="round"/>';
        s += '<text x="' + (x(m) + 10) + '" y="' + (cy - 14) + '" font-size="15" font-weight="700" fill="#1d2230">Ø ' + Lab.sec(m) + "</text>";
      }
      if (g.highlight != null && !isNaN(g.highlight)) {
        s += '<circle cx="' + x(g.highlight) + '" cy="' + cy + '" r="12" fill="none" stroke="#d9643f" stroke-width="4"/>';
      }
    });
    s += "</svg>";
    return s;
  };

  /* ---------- Sortieraufgabe "Beobachtung oder Deutung?" ---------- */
  /* items: [{text, answer:'b'|'d', why}] ; labels: {b:'Beobachtung', d:'Deutung'} */
  Lab.sortTask = function (root, items, labels) {
    root.innerHTML = items.map(function (it, i) {
      return '<div class="sort-item" data-i="' + i + '"><div>' + Lab.esc(it.text) + '</div><div class="seg">' +
        Object.keys(labels).map(function (k) { return '<button type="button" data-v="' + k + '">' + labels[k] + "</button>"; }).join("") +
        '</div><div class="feedback"></div></div>';
    }).join("");
    Lab.$$(".sort-item", root).forEach(function (row) {
      Lab.$$(".seg button", row).forEach(function (b) {
        b.addEventListener("click", function () {
          Lab.$$(".seg button", row).forEach(function (x) { x.classList.remove("on"); });
          b.classList.add("on");
          row.classList.remove("right", "wrong", "checked");
        });
      });
    });
    return function check() {
      var right = 0;
      Lab.$$(".sort-item", root).forEach(function (row) {
        var it = items[+row.getAttribute("data-i")], on = Lab.$(".seg button.on", row);
        row.classList.remove("right", "wrong");
        row.classList.add("checked");
        var ok = on && on.getAttribute("data-v") === it.answer;
        if (ok) right++;
        row.classList.add(ok ? "right" : "wrong");
        Lab.$(".feedback", row).textContent = (ok ? "Richtig. " : (on ? "Noch einmal überlegen. " : "Noch nicht zugeordnet. ")) + it.why;
      });
      return right;
    };
  };

  window.Lab = Lab;
})();
