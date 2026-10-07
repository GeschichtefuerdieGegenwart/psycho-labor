/* Figuren für DS 4 „Sehe ich, was ich erwarte?“
   Spielkarten (nach Bruner & Postman 1949) und das Modell der Hypothesentheorie. */
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

  /* Modell: Hypothesentheorie (Bruner & Postman) – als Fließbild */
  function modell(opt) {
    opt = opt || {};
    var ink = opt.ink || "#1d2230", soft = opt.soft || "#545b6b", acc = opt.accent || "#0e6b68", warm = opt.warm || "#d9643f", paper = opt.paper || "#fffdf9", line = opt.line || "#e2dbcf";
    function box(x, y, w, h, fill, stroke, title, sub, tc) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>' +
        '<text x="' + (x + w / 2) + '" y="' + (y + 30) + '" text-anchor="middle" font-size="19" font-weight="700" fill="' + (tc || ink) + '">' + title + "</text>" +
        (sub || []).map(function (t, i) { return '<text x="' + (x + w / 2) + '" y="' + (y + 54 + i * 21) + '" text-anchor="middle" font-size="15" fill="' + (tc || soft) + '">' + t + "</text>"; }).join("");
    }
    function arrow(x1, y1, x2, y2, c) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || soft) + '" stroke-width="3" marker-end="url(#ah)"/>'; }
    var s = '<svg viewBox="0 0 900 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Modell der Hypothesentheorie" font-family="-apple-system, Segoe UI, Calibri, Arial, sans-serif">' +
      '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="' + soft + '"/></marker></defs>';
    s += box(10, 20, 200, 130, paper, line, "Einflussfaktoren", ["individuell: Erfahrung,", "Gefühl, Bedürfnis", "sozial: andere, Gruppe"]);
    s += box(10, 175, 200, 110, paper, line, "Situation", ["Kontext, Hinweise,", "z. B. ein Horoskop"]);
    s += arrow(212, 85, 288, 140); s += arrow(212, 230, 288, 175);
    s += box(292, 95, 220, 130, acc, acc, "Erwartung", ["= Hypothese", "„Gleich sehe ich …“", "stark oder schwach"], "#fff");
    s += arrow(514, 160, 578, 160);
    s += box(582, 105, 130, 110, paper, line, "Reize", ["prüfen die", "Erwartung"]);
    s += arrow(714, 140, 748, 70); s += arrow(714, 160, 748, 160); s += arrow(714, 180, 748, 250);
    s += box(752, 30, 140, 72, paper, acc, "bestätigt", ["wahrgenommen"]);
    s += box(752, 125, 140, 72, paper, warm, "umgedeutet", ["oder übersehen"]);
    s += box(752, 220, 140, 72, paper, line, "verworfen", ["neue Hypothese"]);
    return s + "</svg>";
  }

  window.FIGUREN_DS04 = { karte: karte, maske: maske, modell: modell, NAME: NAME, SYM: SYM, NATURAL: NATURAL, RED: RED, BLACK: BLACK };
})();
