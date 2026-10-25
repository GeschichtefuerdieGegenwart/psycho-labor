/* Figuren für DS 6 „Was treibt mich an?“
   Zahlenfeld (Labor), Ziel-Ergebnis-Kurve, Schaubild Anspruchsniveau.
   Schaubilder sind vereinfachte Modelle und stehen immer auf weißem Grund.
   Farben: Petrol und Koralle. Petrol liegt unter der Sättigungsgrenze des Farbprüfers,
   deshalb tragen Ziel und Ergebnis zusätzlich Linienart, Punktform und Beschriftung. */
(function () {
  "use strict";
  var INK = "#1d2230", SOFT = "#545b6b", ACC = "#0e6b68", ACCS = "#d8ecea", WARM = "#d9643f", WARMS = "#fbe3d9", LINE = "#cfc7ba", GRID = "#e8e2d8";
  var FONT = 'font-family="-apple-system, Segoe UI, Calibri, Arial, sans-serif"';
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  /* feste Mischung der Zahlen 1..n je Runde (alle sehen dasselbe Feld) */
  function mischung(n, seed) {
    var a = [], r = seed * 7919 + 13;
    for (var i = 1; i <= n; i++) a.push(i);
    function rnd() { r = (r * 9301 + 49297) % 233280; return r / 233280; }
    for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; }
    return a;
  }

  /* Ziel (gestrichelt, Quadrate) und Ergebnis (durchgezogen, Kreise) je Runde */
  function kurve(rows, opt) {
    opt = opt || {};
    var W = 560, H = 270, L = 48, R = 92, T = 18, B = 44, n = Math.max(rows.length, 1);
    var vals = []; rows.forEach(function (r) { if (r.z != null) vals.push(r.z); if (r.e != null) vals.push(r.e); });
    var max = Math.max(10, Math.ceil((Math.max.apply(null, vals.concat([1])) + 2) / 5) * 5);
    function x(i) { return L + (n === 1 ? (W - L - R) / 2 : i * (W - L - R) / (n - 1)); }
    function y(v) { return T + (H - T - B) * (1 - v / max); }
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(opt.aria || "Ziel und Ergebnis je Runde") + '" ' + FONT + '><rect width="' + W + '" height="' + H + '" rx="14" fill="#fff"/>';
    for (var g = 0; g <= max; g += 5) s += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(g) + '" y2="' + y(g) + '" stroke="' + GRID + '" stroke-width="1"/><text x="' + (L - 8) + '" y="' + (y(g) + 5) + '" text-anchor="end" font-size="13" fill="' + SOFT + '">' + g + "</text>";
    rows.forEach(function (r, i) { s += '<text x="' + x(i) + '" y="' + (H - 16) + '" text-anchor="middle" font-size="14" fill="' + SOFT + '">' + esc(r.label) + "</text>"; });
    function path(key) { var p = ""; rows.forEach(function (r, i) { if (r[key] == null) return; p += (p ? " L" : "M") + x(i) + " " + y(r[key]); }); return p; }
    var pz = path("z"), pe = path("e");
    if (pz) s += '<path d="' + pz + '" fill="none" stroke="' + WARM + '" stroke-width="2" stroke-dasharray="6 5"/>';
    if (pe) s += '<path d="' + pe + '" fill="none" stroke="' + ACC + '" stroke-width="2"/>';
    rows.forEach(function (r, i) {
      if (r.z != null) s += '<rect x="' + (x(i) - 5) + '" y="' + (y(r.z) - 5) + '" width="10" height="10" fill="#fff" stroke="' + WARM + '" stroke-width="2.5"><title>' + esc(r.label) + ": Ziel " + r.z + "</title></rect>";
      if (r.e != null) s += '<circle cx="' + x(i) + '" cy="' + y(r.e) + '" r="5.5" fill="' + ACC + '" stroke="#fff" stroke-width="2"><title>' + esc(r.label) + ": Ergebnis " + r.e + "</title></circle>";
    });
    /* direkte Beschriftung am letzten Punkt jeder Linie */
    function last(key) { for (var i = rows.length - 1; i >= 0; i--) if (rows[i][key] != null) return i; return -1; }
    var lz = last("z"), le = last("e");
    var yz = lz >= 0 ? y(rows[lz].z) : null, ye = le >= 0 ? y(rows[le].e) : null;
    if (yz != null && ye != null && Math.abs(yz - ye) < 18) { if (yz <= ye) { yz -= 9; ye += 9; } else { yz += 9; ye -= 9; } }
    if (lz >= 0) s += '<text x="' + (x(lz) + 12) + '" y="' + (yz + 5) + '" font-size="15" font-weight="700" fill="' + INK + '">Ziel</text>';
    if (le >= 0) s += '<text x="' + (x(le) + 12) + '" y="' + (ye + 5) + '" font-size="15" font-weight="700" fill="' + INK + '">Ergebnis</text>';
    return s + "</svg>";
  }

  function box(x, y, w, h, fill, stroke, lines, o) {
    o = o || {};
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>';
    var lh = o.lh || 21, y0 = y + (o.top || 27);
    lines.forEach(function (l, i) {
      var bold = i === 0, size = bold ? (o.size1 || 17) : (o.size || 15);
      s += '<text x="' + (x + w / 2) + '" y="' + (y0 + i * lh) + '" text-anchor="middle" font-size="' + size + '"' + (bold ? ' font-weight="700"' : "") + ' fill="' + (o.color || (bold ? INK : SOFT)) + '">' + esc(l) + "</text>";
    });
    return s;
  }
  function defs() { return '<defs><marker id="a6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="' + SOFT + '"/></marker></defs>'; }
  function arrow(x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + SOFT + '" stroke-width="3" marker-end="url(#a6)"/>'; }

  /* Anspruchsniveau: Ziel → Leistung → Vergleich → Erfolg oder Misserfolg → neues Ziel */
  function anspruch() {
    var s = '<svg viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wie sich das Anspruchsniveau verschiebt" ' + FONT + '>' + defs();
    s += box(6, 70, 170, 92, ACC, ACC, ["Anspruchsniveau", "„Diesmal schaffe", "ich 15.“"], { color: "#fff", top: 30 });
    s += arrow(178, 116, 206, 116);
    s += box(210, 70, 150, 92, "#fff", LINE, ["Leistung", "z. B. 17"], { top: 38, lh: 26 });
    s += arrow(362, 116, 390, 116);
    s += box(394, 70, 170, 92, "#fff", LINE, ["Vergleich", "Leistung mit dem", "eigenen Ziel"], { top: 30 });
    s += arrow(566, 100, 604, 58);
    s += arrow(566, 132, 604, 176);
    s += box(608, 16, 286, 84, ACCS, ACC, ["Ziel erreicht → Erfolg", "nächstes Ziel meist höher"], { top: 34, lh: 26 });
    s += box(608, 136, 286, 84, WARMS, WARM, ["nicht erreicht → Misserfolg", "nächstes Ziel meist niedriger"], { top: 34, lh: 26 });
    s += '<path d="M750 222 C 750 238, 90 238, 90 166" fill="none" stroke="' + SOFT + '" stroke-width="2.5" stroke-dasharray="5 5" marker-end="url(#a6)"/>';
    return s + "</svg>";
  }

  window.FIGUREN_DS06 = { mischung: mischung, kurve: kurve, anspruch: anspruch };
})();
