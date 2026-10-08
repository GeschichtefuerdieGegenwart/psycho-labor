/* Figuren für DS 4 „Sehe ich, was ich erwarte?“
   Spielkarten (nach Bruner & Postman 1949) und Schaubilder für die Lernübersicht.
   Die Schaubilder sind vereinfachte Modelle; sie stehen immer auf weißem Grund (auch im Dunkelmodus und im Druck). */
(function () {
  "use strict";

  var RED = "#c8322b", BLACK = "#1d2230";

  /* Symbole in einem 100 × 100-Feld */
  var SUIT = {
    herz: '<path d="M50 90 C 22 68, 4 50, 4 30 C 4 14, 16 4, 29 4 C 39 4, 46 10, 50 19 C 54 10, 61 4, 71 4 C 84 4, 96 14, 96 30 C 96 50, 78 68, 50 90 Z"/>',
    karo: '<path d="M50 3 L86 50 L50 97 L14 50 Z"/>',
    pik: '<path d="M50 4 C 78 30, 96 44, 96 62 C 96 76, 86 84, 74 84 C 65 84, 58 80, 54 73 C 55 83, 59 90, 67 96 L 33 96 C 41 90, 45 83, 46 73 C 42 80, 35 84, 26 84 C 14 84, 4 76, 4 62 C 4 44, 22 30, 50 4 Z"/>',
    kreuz: '<circle cx="50" cy="27" r="21"/><circle cx="27" cy="59" r="21"/><circle cx="73" cy="59" r="21"/><rect x="40" y="34" width="20" height="26"/><path d="M46 62 C 46 80, 42 89, 33 96 L 67 96 C 58 89, 54 80, 54 62 Z"/>'
  };
  var NAME = { herz: "Herz", karo: "Karo", pik: "Pik", kreuz: "Kreuz" };
  var SYM = { herz: "♥", karo: "♦", pik: "♠", kreuz: "♣" };
  var NATURAL = { herz: "rot", karo: "rot", pik: "schwarz", kreuz: "schwarz" };

  /* Lage der Symbole für 2–10 (x: L, M, R; y von oben) */
  var X = { L: 72, M: 100, R: 128 };
  var LAYOUT = {
    2: [["M", 72], ["M", 208]],
    3: [["M", 72], ["M", 140], ["M", 208]],
    4: [["L", 72], ["R", 72], ["L", 208], ["R", 208]],
    5: [["L", 72], ["R", 72], ["M", 140], ["L", 208], ["R", 208]],
    6: [["L", 72], ["R", 72], ["L", 140], ["R", 140], ["L", 208], ["R", 208]],
    7: [["L", 72], ["R", 72], ["M", 106], ["L", 140], ["R", 140], ["L", 208], ["R", 208]],
    8: [["L", 72], ["R", 72], ["M", 106], ["L", 140], ["R", 140], ["M", 174], ["L", 208], ["R", 208]],
    9: [["L", 72], ["R", 72], ["L", 117], ["R", 117], ["M", 140], ["L", 163], ["R", 163], ["L", 208], ["R", 208]],
    10: [["L", 72], ["R", 72], ["M", 95], ["L", 117], ["R", 117], ["L", 163], ["R", 163], ["M", 185], ["L", 208], ["R", 208]]
  };

  function sym(suit, cx, cy, size, flip) {
    var s = size / 100;
    return '<g transform="translate(' + cx + " " + cy + ")" + (flip ? " rotate(180)" : "") + " scale(" + s + ") translate(-50 -50)\">" + SUIT[suit] + "</g>";
  }

  /* Spielkarte als SVG. farbe: "rot" | "schwarz" (darf von der üblichen abweichen) */
  function karte(rang, suit, farbe) {
    var col = farbe === "rot" ? RED : BLACK, pip = rang >= 9 ? 26 : 30;
    var s = '<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spielkarte"><rect x="3" y="3" width="194" height="274" rx="16" fill="#fff" stroke="#c9c2b6" stroke-width="3"/><g fill="' + col + '">';
    LAYOUT[rang].forEach(function (p) { s += sym(suit, X[p[0]], p[1], pip, p[1] > 140); });
    s += '<text x="22" y="40" font-family="Georgia, serif" font-size="30" font-weight="700" text-anchor="middle">' + rang + "</text>" + sym(suit, 22, 58, 18, false);
    s += '<g transform="rotate(180 100 140)"><text x="22" y="40" font-family="Georgia, serif" font-size="30" font-weight="700" text-anchor="middle">' + rang + "</text>" + sym(suit, 22, 58, 18, false) + "</g>";
    return s + "</g></svg>";
  }

  /* Maske nach dem Aufblitzen: unruhiges Muster aus Kartenfarben */
  function maske(seed) {
    var s = '<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="mk"><rect x="6" y="6" width="188" height="268" rx="14"/></clipPath></defs><rect x="3" y="3" width="194" height="274" rx="16" fill="#fff" stroke="#c9c2b6" stroke-width="3"/><g clip-path="url(#mk)">';
    var r = seed || 7;
    function rnd() { r = (r * 9301 + 49297) % 233280; return r / 233280; }
    for (var i = 0; i < 70; i++) {
      var x = 14 + rnd() * 172, y = 14 + rnd() * 252, w = 8 + rnd() * 26, h = 3 + rnd() * 10, c = rnd() < 0.5 ? RED : BLACK;
      s += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" fill="' + c + '" transform="rotate(' + Math.round(rnd() * 180) + " " + x.toFixed(1) + " " + y.toFixed(1) + ')" opacity=".85"/>';
    }
    return s + "</g></svg>";
  }

  var INK = "#1d2230", SOFT = "#545b6b", ACC = "#0e6b68", ACCS = "#d8ecea", WARM = "#d9643f", WARMS = "#fbe3d9", LINE = "#cfc7ba", GOLDS = "#f6ead0";
  var FONT = 'font-family="-apple-system, Segoe UI, Calibri, Arial, sans-serif"';

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function box(x, y, w, h, fill, stroke, lines, o) {
    o = o || {};
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>';
    var lh = o.lh || 21, y0 = y + (o.top || 28);
    lines.forEach(function (l, i) {
      var bold = i === 0 && !o.noBoldFirst, size = bold ? (o.size1 || 19) : (o.size || 16);
      s += '<text x="' + (x + w / 2) + '" y="' + (y0 + i * lh) + '" text-anchor="middle" font-size="' + size + '"' + (bold ? ' font-weight="700"' : "") + ' fill="' + (o.color || (bold ? INK : SOFT)) + '">' + esc(l) + "</text>";
    });
    return s;
  }
  function arrow(x1, y1, x2, y2, c, id) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || SOFT) + '" stroke-width="3" marker-end="url(#' + (id || "ah") + ')"/>'; }
  function defs() {
    return '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="' + SOFT + '"/></marker>' +
      '<marker id="aw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="' + WARM + '"/></marker></defs>';
  }

  /* Schaubild 1: Hypothesentheorie als Ablauf, darunter das Beispiel der Trickkarte */
  function ablauf() {
    var s = '<svg viewBox="0 0 900 286" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ablauf der Hypothesentheorie" ' + FONT + '>' + defs();
    s += box(6, 40, 184, 118, "#fff", LINE, ["Einflussfaktoren", "individuell", "sozial"], { top: 34, lh: 26 });
    s += arrow(192, 99, 226, 99);
    s += box(230, 40, 214, 118, ACC, ACC, ["Erwartung", "(Hypothese)", "„Gleich sehe ich …“"], { top: 34, lh: 26, color: "#fff" });
    s += arrow(446, 99, 480, 99);
    s += box(484, 40, 172, 118, "#fff", LINE, ["Reiz", "wird mit der", "Erwartung verglichen"], { top: 34, lh: 26 });
    s += arrow(658, 76, 694, 34); s += arrow(658, 99, 694, 112); s += arrow(658, 122, 694, 196);
    s += box(698, 4, 196, 60, "#fff", ACC, ["passt:", "Erwartung bestätigt"], { top: 25, lh: 23, size1: 17, size: 15 });
    s += box(698, 72, 196, 80, WARMS, WARM, ["passt nicht,", "Erwartung stark:", "umgedeutet/übersehen"], { top: 25, lh: 22, size1: 17, size: 15 });
    s += box(698, 160, 196, 80, "#fff", LINE, ["passt nicht,", "Erwartung schwach:", "wird verworfen"], { top: 25, lh: 22, size1: 17, size: 15 });
    s += '<text x="98" y="186" text-anchor="middle" font-size="14" fill="' + SOFT + '" font-style="italic">lösen aus</text>';
    s += '<text x="337" y="186" text-anchor="middle" font-size="14" fill="' + SOFT + '" font-style="italic">entsteht vorher, oft unbemerkt</text>';
    s += '<text x="570" y="186" text-anchor="middle" font-size="14" fill="' + SOFT + '" font-style="italic">kommt über die Sinne an</text>';
    s += '<rect x="6" y="250" width="888" height="32" rx="8" fill="' + GOLDS + '"/>';
    s += '<text x="18" y="272" font-size="15" fill="' + INK + '"><tspan font-weight="700">Beispiel Trickkarte:</tspan> Erwartung „schwarz = Pik oder Kreuz“ → Reiz: schwarzes Herz → umgedeutet: viele melden „4 Pik“</text>';
    return s + "</svg>";
  }

  /* Schaubild 2: Kreislauf der selbsterfüllenden Prophezeiung (optional mit Beispieltexten oder Schreiblinien) */
  function kreislauf(bsp) {
    var s = '<svg viewBox="0 0 600 352" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kreislauf der selbsterfüllenden Prophezeiung" ' + FONT + '>' + defs();
    var w = 232, h = 98;
    var N = [
      { x: 184, y: 4, t: "1 Erwartung" },
      { x: 366, y: 128, t: "2 Verhalten ändert sich" },
      { x: 184, y: 250, t: "3 Folge / Ergebnis" },
      { x: 2, y: 128, t: "4 „Ich hatte recht!“" }
    ];
    N.forEach(function (n, i) {
      var fill = i === 0 ? ACC : (i === 3 ? WARMS : "#fff"), stroke = i === 0 ? ACC : (i === 3 ? WARM : LINE);
      s += '<rect x="' + n.x + '" y="' + n.y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>';
      s += '<text x="' + (n.x + w / 2) + '" y="' + (n.y + 28) + '" text-anchor="middle" font-size="19" font-weight="700" fill="' + (i === 0 ? "#fff" : INK) + '">' + esc(n.t) + "</text>";
      var lines = bsp ? bsp[i] : ["_______________________", "_______________________"];
      lines.forEach(function (l, k) { s += '<text x="' + (n.x + w / 2) + '" y="' + (n.y + 56 + k * 22) + '" text-anchor="middle" font-size="17" fill="' + (i === 0 ? "#fff" : SOFT) + '">' + esc(l) + "</text>"; });
    });
    s += arrow(400, 56, 470, 124); s += arrow(470, 230, 404, 284); s += arrow(180, 284, 118, 230); s += arrow(118, 124, 180, 56, WARM, "aw");
    s += '<text x="40" y="76" font-size="15" fill="' + WARM + '" font-style="italic">wird stärker</text>';
    return s + "</svg>";
  }

  window.FIGUREN_DS04 = { karte: karte, maske: maske, ablauf: ablauf, kreislauf: kreislauf, NAME: NAME, SYM: SYM, NATURAL: NATURAL, RED: RED, BLACK: BLACK };
})();
