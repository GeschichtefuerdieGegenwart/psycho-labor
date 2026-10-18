/* Figuren für DS 5 „Wie sehr beeinflussen mich andere?“
   Punktwolken (Schätzaufgabe), Linienaufgabe nach Asch, Schaubilder für die Lernübersicht.
   Schaubilder sind vereinfachte Modelle und stehen immer auf weißem Grund. */
(function () {
  "use strict";
  var INK = "#1d2230", SOFT = "#545b6b", ACC = "#0e6b68", ACCS = "#d8ecea", WARM = "#d9643f", WARMS = "#fbe3d9", LINE = "#cfc7ba", GOLDS = "#f6ead0";
  var FONT = 'font-family="-apple-system, Segoe UI, Calibri, Arial, sans-serif"';
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  /* Punktwolke mit genau n Punkten; feste Lage (alle sehen dasselbe Bild) */
  function punkte(n, seed) {
    var r = seed || 11, pts = [], tries = 0;
    function rnd() { r = (r * 9301 + 49297) % 233280; return r / 233280; }
    while (pts.length < n && tries < 20000) {
      tries++;
      var x = 14 + rnd() * 372, y = 14 + rnd() * 272, ok = true;
      for (var i = 0; i < pts.length; i++) { var dx = pts[i][0] - x, dy = pts[i][1] - y; if (dx * dx + dy * dy < 120) { ok = false; break; } }
      if (ok) pts.push([x, y]);
    }
    var s = '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Punktwolke"><rect width="400" height="300" rx="14" fill="#fff"/>';
    pts.forEach(function (p) { s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4.2" fill="' + INK + '"/>'; });
    return s + "</svg>";
  }

  /* Linienaufgabe nach Asch: Vergleichslinie links, A/B/C rechts (Längen in px) */
  function linien(std, a, b, c) {
    var base = 230;
    function ln(x, h, lbl) { return '<line x1="' + x + '" y1="' + base + '" x2="' + x + '" y2="' + (base - h) + '" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' + (lbl ? '<text x="' + x + '" y="' + (base + 26) + '" text-anchor="middle" font-size="20" font-weight="700" fill="' + INK + '">' + lbl + "</text>" : ""); }
    var s = '<svg viewBox="0 0 520 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linienaufgabe" ' + FONT + '><rect width="520" height="270" rx="14" fill="#fff"/>';
    s += '<rect x="20" y="14" width="140" height="246" rx="10" fill="none" stroke="' + LINE + '" stroke-width="2"/><rect x="200" y="14" width="300" height="246" rx="10" fill="none" stroke="' + LINE + '" stroke-width="2"/>';
    s += ln(90, std, "") + '<text x="90" y="' + (base + 26) + '" text-anchor="middle" font-size="17" fill="' + SOFT + '">Vergleich</text>';
    s += ln(270, a, "A") + ln(350, b, "B") + ln(430, c, "C");
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
  function defs() { return '<defs><marker id="a5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="' + SOFT + '"/></marker><marker id="w5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="' + WARM + '"/></marker></defs>'; }
  function arrow(x1, y1, x2, y2, warm) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (warm ? WARM : SOFT) + '" stroke-width="3" marker-end="url(#' + (warm ? "w5" : "a5") + ')"/>'; }

  /* Halo-Effekt: ein auffälliges Merkmal strahlt auf andere aus */
  function halo() {
    var s = '<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Halo-Effekt" ' + FONT + '>' + defs();
    s += box(10, 70, 200, 90, ACC, ACC, ["auffälliges Merkmal", "z. B. sympathisches", "Lächeln"], { color: "#fff", top: 30 });
    var T = [["klug?", 10], ["fair?", 66], ["kompetent?", 122], ["hilfsbereit?", 178]];
    T.forEach(function (t) {
      s += arrow(212, 115, 330, t[1] + 21);
      s += box(334, t[1], 216, 42, WARMS, WARM, [t[0]], { top: 27, size1: 16 });
    });
    s += '<text x="280" y="244" text-anchor="middle" font-size="15" font-style="italic" fill="' + SOFT + '">wird übertragen – obwohl man es nicht sehen kann</text>';
    return s + "</svg>";
  }

  /* Vorurteil als besonders starke Erwartung (Verbindung zu DS 4) */
  function vorurteil() {
    var s = '<svg viewBox="0 0 900 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wie ein Vorurteil stabil bleibt" ' + FONT + '>' + defs();
    s += box(6, 20, 200, 104, "#fff", LINE, ["Andere teilen es", "„Die sind alle …“", "(sozialer Einfluss)"], { top: 30, lh: 23 });
    s += arrow(208, 72, 236, 72);
    s += box(240, 20, 200, 104, ACC, ACC, ["Sehr starke", "Erwartung über", "eine ganze Gruppe"], { color: "#fff", top: 30, lh: 23 });
    s += arrow(442, 72, 470, 72);
    s += box(474, 20, 200, 104, "#fff", LINE, ["Prüfen fällt aus", "Mehrdeutiges bestätigt,", "Gegenbeispiel = „Ausnahme“"], { top: 30, lh: 23, size: 14 });
    s += arrow(676, 72, 704, 72);
    s += box(708, 20, 186, 104, WARMS, WARM, ["Vorurteil", "bleibt bestehen"], { top: 40, lh: 26 });
    s += '<path d="M800 126 C 800 175, 340 175, 340 128" fill="none" stroke="' + WARM + '" stroke-width="3" marker-end="url(#w5)"/>';
    s += '<text x="570" y="178" text-anchor="middle" font-size="14" font-style="italic" fill="' + WARM + '">wird noch stärker</text>';
    return s + "</svg>";
  }

  window.FIGUREN_DS05 = { punkte: punkte, linien: linien, halo: halo, vorurteil: vorurteil };
})();
