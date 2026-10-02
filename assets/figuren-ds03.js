/* Figuren für DS 3 "Wie baut mein Gehirn Bilder?" – alle selbst gezeichnet (SVG).
   Jede Funktion liefert den Inhalt eines <svg viewBox="0 0 400 300">.
   Wird im Psycho-Labor und für Folien/Arbeitsblätter (als Bild) verwendet. */

(function () {
  "use strict";
  var INK = "#1d2230", PET = "#0e6b68", COR = "#d9643f", GOLD = "#b9871c", PAPER = "#fffdf9", SOFT = "#d8ecea";

  function C(cx, cy, r, f, ex) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + f + '"' + (ex || "") + "/>"; }
  function R(x, y, w, h, f, ex) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + f + '"' + (ex || "") + "/>"; }
  function P(d, f, ex) { return '<path d="' + d + '" fill="' + f + '"' + (ex || "") + "/>"; }

  /* glatte Kurve durch Punkte (Catmull-Rom) */
  function smooth(pts) {
    var d = "M" + pts[0][0] + " " + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6, c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += "C" + c1x.toFixed(1) + " " + c1y.toFixed(1) + " " + c2x.toFixed(1) + " " + c2y.toFixed(1) + " " + p2[0] + " " + p2[1];
    }
    return d;
  }

  var F = {};

  /* Figur und Grund: Vase oder zwei Gesichter (nach Rubin, 1915). swap tauscht die Farben. */
  F.figurGrund = function (swap) {
    var prof = [[16, 95], [30, 70], [46, 52], [70, 47], [92, 42], [104, 48], [114, 44], [132, 22], [143, 38], [151, 31], [159, 40], [167, 32], [179, 44], [196, 34], [216, 58], [244, 76], [268, 90], [282, 95]];
    var right = prof.map(function (p) { return [200 + p[1], p[0]]; });
    var left = prof.slice().reverse().map(function (p) { return [200 - p[1], p[0]]; });
    var d = smooth(right) + "L" + (200 - 96) + " 282" + smooth(left).replace(/^M[^C]+/, "L" + left[0][0] + " " + left[0][1]) + "Z";
    var bg = swap ? INK : PAPER, fg = swap ? PAPER : INK;
    return R(0, 0, 400, 300, bg) + P(d, fg);
  };

  /* Nähe: Punktraster mit waagerechtem Abstand dx und senkrechtem Abstand dy */
  F.naehe = function (dx, dy, color2) {
    var s = R(0, 0, 400, 300, PAPER), cols = 6, rows = 6;
    var w = (cols - 1) * dx, h = (rows - 1) * dy, x0 = 200 - w / 2, y0 = 150 - h / 2;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) s += C(x0 + c * dx, y0 + r * dy, 9, color2 && r % 2 ? color2 : PET);
    return s;
  };

  /* Ähnlichkeit: gleich weit entfernte Punkte, Zeilen abwechselnd gefärbt; shape=true: Kreise/Quadrate */
  F.aehnlichkeit = function (useShape) {
    var s = R(0, 0, 400, 300, PAPER);
    for (var r = 0; r < 6; r++) for (var c = 0; c < 6; c++) {
      var x = 95 + c * 42, y = 45 + r * 42, odd = r % 2 === 1;
      if (useShape) s += odd ? R(x - 9, y - 9, 18, 18, INK) : C(x, y, 9, INK);
      else s += C(x, y, 9, odd ? COR : PET);
    }
    return s;
  };

  /* Wettstreit Nähe gegen Ähnlichkeit: Zeilen gleich gefärbt (Ähnlichkeit -> Zeilen),
     waagerechter Abstand dx wächst (Nähe -> Spalten). */
  F.wettstreit = function (dx) {
    var s = R(0, 0, 400, 300, PAPER), dy = 38, cols = 6, rows = 6, w = (cols - 1) * dx, h = (rows - 1) * dy, x0 = 200 - w / 2, y0 = 150 - h / 2;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) s += C(x0 + c * dx, y0 + r * dy, 8, r % 2 ? COR : PET);
    return s;
  };

  /* Geschlossenheit: Scheinkonturen-Dreieck (nach Kanizsa, 1955). turned=true: Kreise nach außen gedreht */
  F.geschlossenheit = function (turned) {
    var s = R(0, 0, 400, 300, PAPER), pts = [[200, 62], [112, 214], [288, 214]], cx = 200, cy = 163;
    pts.forEach(function (p) {
      var ang = Math.atan2(cy - p[1], cx - p[0]) + (turned ? Math.PI : 0), r = 52, a1 = ang - Math.PI / 6, a2 = ang + Math.PI / 6;
      var x1 = p[0] + r * Math.cos(a1), y1 = p[1] + r * Math.sin(a1), x2 = p[0] + r * Math.cos(a2), y2 = p[1] + r * Math.sin(a2);
      s += P("M" + p[0] + " " + p[1] + " L" + x2.toFixed(1) + " " + y2.toFixed(1) + " A" + r + " " + r + " 0 1 1 " + x1.toFixed(1) + " " + y1.toFixed(1) + " Z", INK);
    });
    return s;
  };

  /* Gute Fortsetzung: Wellenlinie und Zacken-Linie kreuzen sich. split=true färbt die tatsächlichen Linien */
  F.fortsetzung = function (split) {
    var s = R(0, 0, 400, 300, PAPER), wave = "M30 150", zig = "M30 150";
    for (var i = 0; i < 4; i++) { var x = 30 + i * 85; wave += " Q" + (x + 21) + " 70 " + (x + 42.5) + " 150 T" + (x + 85) + " 150"; }
    zig += " H72 V95 H157 V205 H242 V95 H327 V205 H370";
    var c1 = split ? PET : INK, c2 = split ? COR : INK;
    s += P(zig, "none", ' stroke="' + c2 + '" stroke-width="8" stroke-linejoin="round"');
    s += P(wave, "none", ' stroke="' + c1 + '" stroke-width="8" stroke-linecap="round"');
    return s;
  };

  /* Prägnanz: Kreis und Quadrat überlappen. split=true zeigt die "seltsame" Alternative aus drei Teilen */
  F.praegnanz = function (split) {
    var s = R(0, 0, 400, 300, PAPER), st = ' stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"';
    if (!split) return s + C(160, 150, 80, "none", st) + R(170, 80, 140, 140, "none", st);
    /* dieselben Linien, anders gedeutet: drei unregelmäßige Teile */
    s += P("M198.7 80 A80 80 0 1 0 198.7 220 L170 220 L170 80 Z", SOFT, st + ' transform="translate(-34 0)"');
    s += P("M170 80 L198.7 80 A80 80 0 0 1 198.7 220 L170 220 Z", "#f6ead0", st);
    s += P("M198.7 80 L310 80 L310 220 L198.7 220 A80 80 0 0 0 198.7 80 Z", "#fbe3d9", st + ' transform="translate(34 0)"');
    return s;
  };

  /* Gemeinsames Schicksal: Punkte zum Animieren (Positionen werden im Baustein bewegt) */
  F.schicksalStart = function (n) {
    var pts = [], seed = 5;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < n; i++) pts.push({ x: 40 + rnd() * 320, y: 30 + rnd() * 240, group: i % 4 === 0 });
    return pts;
  };

  /* ---------- Quiz-Figuren (klein, eindeutig) ---------- */
  F.quiz = {
    naehe: function () { var s = R(0, 0, 400, 300, PAPER); [70, 170, 270].forEach(function (x) { for (var r = 0; r < 4; r++) { s += C(x, 70 + r * 52, 11, INK) + C(x + 40, 70 + r * 52, 11, INK); } }); return s; },
    aehnlichkeit: function () { var s = R(0, 0, 400, 300, PAPER); for (var r = 0; r < 5; r++) for (var c = 0; c < 7; c++) { var x = 80 + c * 40, y = 60 + r * 45; s += c % 2 ? '<text x="' + x + '" y="' + (y + 10) + '" text-anchor="middle" font-size="30" font-weight="700" fill="' + INK + '">X</text>' : C(x, y, 12, "none", ' stroke="' + INK + '" stroke-width="5"'); } return s; },
    geschlossenheit: function () { var s = R(0, 0, 400, 300, PAPER); for (var i = 0; i < 14; i++) { var a = i / 14 * 2 * Math.PI; s += C(200 + 100 * Math.cos(a), 150 + 100 * Math.sin(a), 8, INK); } return s; },
    fortsetzung: function () { return R(0, 0, 400, 300, PAPER) + P("M60 260 Q200 150 340 40", "none", ' stroke="' + INK + '" stroke-width="9"') + P("M60 40 Q200 150 340 260", "none", ' stroke="' + INK + '" stroke-width="9"'); },
    schicksal: function () { var s = R(0, 0, 400, 300, PAPER), seed = 9; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; } for (var i = 0; i < 18; i++) { var x = 40 + rnd() * 300, y = 40 + rnd() * 220, g = i < 6; var ang = g ? -20 : rnd() * 360; s += '<g transform="translate(' + x.toFixed(0) + " " + y.toFixed(0) + ") rotate(" + ang.toFixed(0) + ')">' + P("M-14 -8 L14 0 L-14 8 L-8 0 Z", g ? COR : INK) + "</g>"; } return s; },
    figurGrund: function () { return F.figurGrund(false); },
    praegnanz: function () { return R(0, 0, 400, 300, PAPER) + C(150, 150, 75, "none", ' stroke="' + INK + '" stroke-width="7"') + C(250, 150, 75, "none", ' stroke="' + INK + '" stroke-width="7"'); },
    tabelle: function () { var s = R(0, 0, 400, 300, PAPER); [60, 210].forEach(function (x0) { for (var r = 0; r < 6; r++) for (var c = 0; c < 3; c++) s += R(x0 + c * 38, 50 + r * 36, 28, 10, INK, ' rx="3"'); }); return s; }
  };

  /* ---------- Teil B: Ergänzen ---------- */
  /* mehrdeutiges Zeichen: kann als "B" oder als "13" gelesen werden */
  F.mehrdeutig = function (x, y, h, color) {
    var w = h * 0.62, sw = h * 0.13;
    return '<g transform="translate(' + x + " " + y + ')" fill="none" stroke="' + (color || INK) + '" stroke-width="' + sw.toFixed(1) + '" stroke-linecap="butt">' +
      '<path d="M0 0 V' + h + '"/>' +
      '<path d="M' + (w * 0.28).toFixed(1) + " " + (sw / 2).toFixed(1) + " H" + (w * 0.6).toFixed(1) + " A" + (h * 0.24).toFixed(1) + " " + (h * 0.235).toFixed(1) + " 0 0 1 " + (w * 0.6).toFixed(1) + " " + (h * 0.5).toFixed(1) + " H" + (w * 0.36).toFixed(1) + '"/>' +
      '<path d="M' + (w * 0.36).toFixed(1) + " " + (h * 0.5).toFixed(1) + " H" + (w * 0.62).toFixed(1) + " A" + (h * 0.25).toFixed(1) + " " + (h * 0.25).toFixed(1) + " 0 0 1 " + (w * 0.62).toFixed(1) + " " + (h - sw / 2).toFixed(1) + " H" + (w * 0.28).toFixed(1) + '"/></g>';
  };
  F.kontext = function (art, zeigen) {
    var s = R(0, 0, 400, 300, PAPER), h = 110, y = 95, txt = function (x, t) { return '<text x="' + x + '" y="' + (y + h - 4) + '" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="' + (h * 1.02).toFixed(0) + '" font-weight="700" fill="' + INK + '">' + t + "</text>"; };
    if (art === "buchstaben") s += txt(80, "A") + txt(320, "C");
    else s += txt(70, "12") + txt(330, "14");
    if (zeigen !== false) s += F.mehrdeutig(172, y, h);
    return s;
  };

  /* Pareidolie: ein Gesicht, wo keines ist */
  F.pareidolie = function () {
    return R(0, 0, 400, 300, "#efe6d8") + R(110, 40, 180, 220, PAPER, ' rx="26" stroke="#c9bfae" stroke-width="4"') +
      C(165, 115, 15, INK) + C(235, 115, 15, INK) + P("M150 185 Q200 225 250 185", "none", ' stroke="' + INK + '" stroke-width="12" stroke-linecap="round"') +
      R(193, 140, 14, 26, "#c9bfae", ' rx="6"');
  };

  window.FIGUREN_DS03 = F;
})();
