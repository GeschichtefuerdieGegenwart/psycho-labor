/* Szenen für den Selbstversuch "Veränderungsblindheit" (DS 2).
   Alle Bilder sind selbst gezeichnet (SVG), keine fremden Bildrechte.
   Jede Szene hat zwei Fassungen (a/b), die sich in genau einem Detail unterscheiden. */

(function () {
  "use strict";

  function R(x, y, w, h, f, rx, extra) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + f + '"' + (rx ? ' rx="' + rx + '"' : "") + (extra || "") + "/>"; }
  function C(cx, cy, r, f, extra) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + f + '"' + (extra || "") + "/>"; }
  function E(cx, cy, rx, ry, f, extra) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '"' + (extra || "") + "/>"; }
  function P(d, f, extra) { return '<path d="' + d + '" fill="' + f + '"' + (extra || "") + "/>"; }
  function L(x1, y1, x2, y2, s, w) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + s + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"/>'; }

  /* Zufall mit festem Startwert: beide Fassungen sehen gleich aus */
  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  var BOOK = ["#c0504d", "#4f81bd", "#9bbb59", "#8064a2", "#f79646", "#2c4d75", "#d9a441", "#5b9a8b", "#a5594f", "#7a8b99"];

  function tree(x, y, s, c) { return R(x - 6 * s, y - 10 * s, 12 * s, 60 * s, "#7a5432") + C(x, y - 30 * s, 42 * s, c || "#4f8a4a") + C(x - 30 * s, y - 5 * s, 30 * s, c || "#5a9a52") + C(x + 30 * s, y - 8 * s, 32 * s, c || "#467f41"); }
  function cloud(x, y, s) { return E(x, y, 46 * s, 20 * s, "#fff") + C(x - 22 * s, y - 10 * s, 20 * s, "#fff") + C(x + 12 * s, y - 16 * s, 24 * s, "#fff"); }
  function plant(x, y) { return P("M" + (x - 26) + " " + y + "h52l-8 50h-36z", "#b5653b") + E(x - 18, y - 22, 14, 34, "#4f8a4a", ' transform="rotate(-25 ' + (x - 18) + " " + (y - 22) + ')"') + E(x + 18, y - 24, 14, 34, "#5a9a52", ' transform="rotate(25 ' + (x + 18) + " " + (y - 24) + ')"') + E(x, y - 36, 13, 38, "#467f41"); }

  var scenes = [];

  /* 0 – Kontrolle: Bücherregal (wird OHNE graue Lücke gezeigt) */
  scenes.push({
    id: "regal", name: "Bücherregal", type: "kontrolle",
    change: { x: 362, y: 30, w: 96, h: 92 }, what: "die orange Vase oben auf dem Regal",
    draw: function (v) {
      var r = rng(11), s = R(0, 0, 800, 500, "#efe6d8") + R(0, 432, 800, 68, "#c9a27a");
      s += R(176, 120, 448, 312, "#8a5a37") + R(190, 132, 420, 290, "#6e4528");
      [214, 304, 394].forEach(function (yb) {
        var x = 196;
        while (x < 600) { var w = 16 + Math.floor(r() * 18), h = 56 + Math.floor(r() * 26); if (x + w > 604) break; s += R(x, yb - h, w, h, BOOK[Math.floor(r() * BOOK.length)], 2); x += w + 2; }
        s += R(190, yb, 420, 10, "#8a5a37");
      });
      s += C(100, 160, 44, "#fffdf9", ' stroke="#3a3a3a" stroke-width="5"') + L(100, 160, 100, 132, "#3a3a3a", 4) + L(100, 160, 120, 170, "#3a3a3a", 4);
      s += R(660, 110, 96, 72, "#fffdf9", 4, ' stroke="#8a5a37" stroke-width="6"') + P("M668 172l26-30 18 18 14-12 22 24z", "#5b9a8b");
      s += plant(700, 380) + R(40, 360, 110, 72, "#5b6b8c", 8) + R(48, 346, 94, 18, "#7a8bab", 6);
      if (v === "a") s += P("M392 120c-18-6-22-30-12-46 6-10 6-22 0-30h40c-6 8-6 20 0 30 10 16 6 40-12 46z", "#e0702f") + R(388, 40, 44, 8, "#c75d22", 3);
      return s;
    }
  });

  /* 1 – Mittelpunkt: Straße, das Auto wechselt die Farbe */
  scenes.push({
    id: "strasse", name: "Straße", type: "mitte",
    change: { x: 272, y: 282, w: 256, h: 118 }, what: "die Farbe des Autos (rot ↔ blau)",
    draw: function (v) {
      var r = rng(23), s = R(0, 0, 800, 500, "#cfe6f2") + C(700, 70, 34, "#f6d36b") + cloud(160, 70, 1) + cloud(470, 50, .8);
      var bx = [0, 120, 230, 380, 520, 650], bw = [110, 100, 140, 130, 120, 150], bh = [170, 210, 150, 230, 180, 200], bc = ["#c9b8a6", "#a9b6c4", "#d8c3a0", "#b9a7b5", "#c4c9b0", "#aeb9b2"];
      for (var i = 0; i < 6; i++) {
        var top = 300 - bh[i];
        s += R(bx[i], top, bw[i], bh[i], bc[i]);
        for (var wy = top + 16; wy < 280; wy += 34) for (var wx = bx[i] + 12; wx < bx[i] + bw[i] - 20; wx += 30) s += R(wx, wy, 16, 20, r() > .3 ? "#f3f0e6" : "#6f7d8c", 2);
      }
      s += R(0, 300, 800, 30, "#d8d2c8") + R(0, 330, 800, 170, "#5d6168");
      for (var lx = 20; lx < 800; lx += 90) s += R(lx, 410, 50, 8, "#f2efe8", 2);
      s += tree(70, 300, .9) + tree(730, 300, 1) + R(610, 200, 8, 130, "#3e434b") + E(614, 198, 22, 8, "#3e434b") + C(614, 206, 8, "#f6d36b");
      s += R(170, 240, 6, 90, "#3e434b") + C(173, 236, 20, "#fffdf9", ' stroke="#c0392b" stroke-width="6"') + R(162, 232, 22, 8, "#c0392b");
      var body = v === "a" ? "#d33c2f" : "#2f63d3", dark = v === "a" ? "#a82a20" : "#214aa6";
      s += P("M286 370v-34c0-10 8-16 18-18l46-6 30-30c6-6 14-8 22-8h66c10 0 18 4 24 12l26 30 18 4c10 2 16 10 16 20v30z", body);
      s += P("M370 312l26-24c4-4 8-5 13-5h34v29z", "#cfe3ef") + P("M456 283h18c6 0 10 2 14 7l18 22h-50z", "#cfe3ef");
      s += R(290, 340, 236, 10, dark) + C(340, 376, 24, "#2a2d33") + C(340, 376, 10, "#9aa1aa") + C(470, 376, 24, "#2a2d33") + C(470, 376, 10, "#9aa1aa");
      s += R(512, 334, 14, 8, "#f6d36b", 2) + R(288, 334, 10, 8, "#f1c0b8", 2);
      return s;
    }
  });

  /* 2 – Mittelpunkt: Frühstück, das Croissant verschwindet */
  scenes.push({
    id: "fruehstueck", name: "Frühstückstisch", type: "mitte",
    change: { x: 322, y: 210, w: 156, h: 100 }, what: "das Croissant auf dem Teller",
    draw: function (v) {
      var s = R(0, 0, 800, 500, "#d9b38c");
      for (var y = 30; y < 500; y += 46) s += L(0, y, 800, y + 8, "#c9a074", 3);
      s += R(150, 70, 500, 370, "#f0e6d6", 22) + R(170, 90, 460, 330, "#e8dcc8", 16);
      s += C(400, 260, 104, "#fffdf9", ' stroke="#d7d0c4" stroke-width="3"') + C(400, 260, 78, "none", ' stroke="#ece6dc" stroke-width="3"');
      s += R(262, 180, 12, 160, "#b8bec6", 5) + P("M262 180h12v-34c0-8-12-8-12 0z", "#b8bec6");
      s += R(528, 180, 10, 160, "#b8bec6", 4) + P("M524 140h18l-2 44h-14z", "#b8bec6");
      s += C(600, 160, 54, "#fffdf9", ' stroke="#d7d0c4" stroke-width="3"') + C(600, 160, 34, "#6b4226") + C(600, 160, 26, "#7c5133") + P("M634 150c22 0 22 24 0 24", "none", ' stroke="#fffdf9" stroke-width="9"');
      s += C(212, 160, 38, "#f4f1ea", ' stroke="#d7d0c4" stroke-width="3"') + C(212, 160, 30, "#f2a72e") + C(204, 152, 8, "#f6c25f");
      s += R(580, 330, 64, 74, "#e9eef2", 10, ' stroke="#c8d0d8" stroke-width="3"') + R(584, 352, 56, 48, "#b8324a", 8) + R(576, 320, 72, 18, "#d0a33c", 6);
      s += C(204, 360, 62, "#c88b4f") + C(204, 360, 50, "#e0b07a") + C(186, 346, 20, "#d33c2f") + C(222, 352, 19, "#f28c28") + C(200, 376, 18, "#8cbf3f") + C(226, 380, 16, "#d33c2f");
      s += P("M300 400l90-20 30 34-90 20z", "#6aa5c9") + P("M480 96l60 0 0 40-60 0z", "#f6d36b", ' opacity=".0"');
      if (v === "a") {
        s += P("M330 268c10-36 46-56 70-56s60 20 70 56c-14-8-26-6-34 2-10-14-26-18-36-18s-26 4-36 18c-8-8-20-10-34-2z", "#d99a45");
        s += P("M360 236c8 10 10 22 8 34M400 222v40M440 236c-8 10-10 22-8 34", "none", ' stroke="#b8772d" stroke-width="5" stroke-linecap="round"');
      }
      return s;
    }
  });

  /* 3 – Mittelpunkt: Park, die Person verliert ihre Mütze */
  scenes.push({
    id: "park", name: "Park", type: "mitte",
    change: { x: 360, y: 186, w: 80, h: 56 }, what: "die rote Mütze der Person auf der Bank",
    draw: function (v) {
      var r = rng(7), s = R(0, 0, 800, 500, "#d6ecf3") + cloud(620, 70, 1) + cloud(250, 50, .7) + R(0, 250, 800, 250, "#8cc66e");
      s += P("M0 470c200-60 260-120 420-140s300 10 380-30v200H0z", "#e3d3b0");
      s += tree(110, 250, 1.1) + tree(690, 245, 1.2, "#3f7d3c") + tree(560, 230, .7);
      for (var i = 0; i < 18; i++) { var fx = 20 + r() * 760, fy = 300 + r() * 60; if (fx > 280 && fx < 520) continue; s += C(fx, fy, 5, ["#f2c14e", "#e86f7a", "#fffdf9"][i % 3]); }
      s += R(290, 300, 220, 14, "#8a5a37", 4) + R(290, 266, 220, 12, "#8a5a37", 4) + R(290, 284, 220, 12, "#8a5a37", 4) + R(300, 314, 10, 46, "#5c3a22") + R(490, 314, 10, 46, "#5c3a22");
      s += R(376, 244, 48, 62, "#3f6fb0", 14) + R(380, 300, 18, 54, "#2e3a55", 6) + R(404, 300, 18, 54, "#2e3a55", 6) + C(400, 222, 24, "#e8b894");
      s += R(352, 268, 30, 12, "#3f6fb0", 6) + R(420, 268, 30, 12, "#3f6fb0", 6) + R(360, 262, 30, 24, "#f2efe6", 3);
      if (v === "a") s += P("M374 220c0-20 12-30 26-30s26 10 26 30z", "#d33c2f") + R(370, 214, 60, 9, "#b52e23", 4) + C(400, 188, 6, "#fffdf9");
      s += P("M640 130l12-8 12 8", "none", ' stroke="#3a3a3a" stroke-width="3"') + P("M200 110l10-6 10 6", "none", ' stroke="#3a3a3a" stroke-width="3"');
      s += E(600, 380, 50, 22, "#6fae55") + E(180, 390, 60, 24, "#6fae55");
      return s;
    }
  });

  /* 4 – Nebensache: Wohnzimmer, ein Bild an der Wand verschwindet */
  scenes.push({
    id: "wohnzimmer", name: "Wohnzimmer", type: "rand",
    change: { x: 10, y: 104, w: 112, h: 104 }, what: "das kleine Bild links an der Wand",
    draw: function (v) {
      var s = R(0, 0, 800, 500, "#e9e1d3") + R(0, 380, 800, 120, "#b48a62");
      for (var x = 0; x < 800; x += 70) s += L(x, 380, x - 30, 500, "#a37a54", 2);
      s += R(560, 70, 170, 190, "#cfe6f2", 4, ' stroke="#fffdf9" stroke-width="10"') + L(645, 70, 645, 260, "#fffdf9", 8) + R(540, 56, 22, 230, "#c45a4a", 6) + R(728, 56, 22, 230, "#c45a4a", 6);
      s += R(250, 250, 300, 110, "#5b7fa6", 22) + R(230, 230, 50, 140, "#4b6d92", 18) + R(520, 230, 50, 140, "#4b6d92", 18) + R(270, 220, 120, 70, "#6a8fb6", 18) + R(410, 220, 120, 70, "#6a8fb6", 18);
      s += R(300, 236, 54, 44, "#f2c14e", 10) + R(456, 236, 54, 44, "#e86f7a", 10);
      s += E(400, 440, 240, 40, "#d9643f", ' opacity=".55"') + R(320, 390, 160, 18, "#7a5432", 6) + R(334, 408, 10, 34, "#5c3a22") + R(456, 408, 10, 34, "#5c3a22") + C(420, 382, 12, "#fffdf9") + R(360, 374, 30, 10, "#4f81bd", 2);
      s += R(140, 130, 6, 250, "#3e434b") + P("M110 140h66l-12-48h-42z", "#f3e1a6") + E(143, 380, 30, 8, "#3e434b");
      s += plant(760, 380) + R(290, 110, 140, 90, "#fffdf9", 4, ' stroke="#7a5432" stroke-width="7"') + P("M300 190l40-50 30 30 20-16 32 36z", "#5b9a8b") + C(400, 130, 10, "#f6d36b");
      if (v === "a") s += R(22, 116, 88, 80, "#fffdf9", 4, ' stroke="#2c4d75" stroke-width="7"') + C(66, 156, 22, "#e86f7a") + R(50, 172, 32, 14, "#9bbb59", 3);
      return s;
    }
  });

  /* 5 – Nebensache: Strand, ein Segelboot am Horizont verschwindet */
  scenes.push({
    id: "strand", name: "Strand", type: "rand",
    change: { x: 610, y: 150, w: 92, h: 80 }, what: "das Segelboot hinten am Horizont",
    draw: function (v) {
      var s = R(0, 0, 800, 230, "#bfe0f0") + C(130, 70, 38, "#f6d36b") + cloud(420, 60, .9) + R(0, 220, 800, 110, "#3f8fbf");
      for (var x = 20; x < 800; x += 80) s += P("M" + x + " 260q12-8 24 0", "none", ' stroke="#9fd0ea" stroke-width="3"');
      s += P("M0 215c40-12 80-16 140-6l10 11H0z", "#6a8f5a") + R(0, 320, 800, 180, "#ecd9a8");
      for (var i = 0; i < 40; i++) s += C((i * 97) % 800, 340 + (i * 53) % 150, 2, "#d6bf86");
      s += R(395, 200, 8, 200, "#7a5432") + P("M260 214c40-60 240-60 280 0z", "#d9643f") + P("M330 214c20-60 120-60 140 0z", "#f2efe6");
      s += R(330, 400, 150, 56, "#4f81bd", 6) + R(330, 416, 150, 10, "#fffdf9") + R(330, 436, 150, 10, "#fffdf9");
      s += C(560, 430, 26, "#fffdf9") + P("M534 430a26 26 0 0 1 52 0z", "#d33c2f") + P("M548 408q12 22 24 0", "none", ' stroke="#4f81bd" stroke-width="4"');
      s += R(206, 412, 34, 40, "#f2c14e", 4) + P("M210 412q13-20 26 0", "none", ' stroke="#3a3a3a" stroke-width="3"');
      s += R(80, 260, 12, 190, "#8a5a37", 4) + E(60, 260, 50, 14, "#4f8a4a", ' transform="rotate(-20 60 260)"') + E(116, 256, 50, 14, "#5a9a52", ' transform="rotate(20 116 256)"') + E(86, 244, 14, 44, "#467f41");
      s += P("M500 120l10-6 10 6M540 100l8-5 8 5", "none", ' stroke="#3a3a3a" stroke-width="3"');
      if (v === "a") s += P("M624 210h70l-10 14h-50z", "#fffdf9") + R(656, 158, 4, 52, "#3a3a3a") + P("M660 160l30 44h-30z", "#fffdf9") + P("M656 166l-24 38h24z", "#f2c14e");
      return s;
    }
  });

  /* 6 – Nebensache: Schreibtisch, die Uhr an der Wand verschwindet */
  scenes.push({
    id: "schreibtisch", name: "Schreibtisch", type: "rand",
    change: { x: 628, y: 38, w: 104, h: 104 }, what: "die Uhr oben rechts an der Wand",
    draw: function (v) {
      var s = R(0, 0, 800, 500, "#dfe4e8") + R(0, 330, 800, 170, "#a8774e") + R(0, 330, 800, 16, "#8a5a37");
      s += R(60, 70, 240, 170, "#c9a27a", 6, ' stroke="#8a5a37" stroke-width="8"');
      [["#f6d36b", 80, 90], ["#e86f7a", 150, 100], ["#9fd0ea", 220, 86], ["#b7e0a6", 96, 160], ["#f6d36b", 190, 168]].forEach(function (n) { s += R(n[1], n[2], 54, 50, n[0], 2) + L(n[1] + 8, n[2] + 18, n[1] + 44, n[2] + 18, "#7a6a50", 2); });
      s += C(108, 86, 5, "#d33c2f") + C(176, 96, 5, "#4f81bd");
      s += R(300, 240, 210, 100, "#3e434b", 8) + R(312, 250, 186, 80, "#7fb2d6", 4) + P("M280 340h250l-20 14H300z", "#596069");
      s += R(352, 268, 90, 8, "#fffdf9", 3) + R(352, 284, 120, 8, "#e9f3f9", 3) + R(352, 300, 70, 8, "#e9f3f9", 3);
      s += R(560, 290, 40, 46, "#fffdf9", 8) + P("M600 302c18 0 18 22 0 22", "none", ' stroke="#fffdf9" stroke-width="7"') + R(564, 292, 32, 8, "#6b4226", 3);
      s += R(140, 300, 110, 14, "#4f81bd", 3) + R(146, 286, 100, 14, "#c0504d", 3) + R(136, 272, 104, 14, "#9bbb59", 3);
      s += R(660, 330, 12, 4, "#3e434b") + L(666, 330, 700, 230, "#3e434b", 6) + L(700, 230, 650, 190, "#3e434b", 6) + P("M620 170l50 12-14 36-48-18z", "#d9643f");
      s += plant(740, 280);
      if (v === "a") s += C(680, 90, 40, "#fffdf9", ' stroke="#3e434b" stroke-width="6"') + L(680, 90, 680, 64, "#3e434b", 4) + L(680, 90, 698, 98, "#3e434b", 4) + C(680, 90, 4, "#d9643f");
      return s;
    }
  });

  window.SZENEN_DS02 = scenes;
})();
