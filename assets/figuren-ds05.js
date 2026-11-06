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

  /* Herr Fotiou – selbst gezeichnete, ausgedachte Person (rechtefrei).
     Zwei Fassungen, die sich NUR im Gesichtsausdruck unterscheiden: "laecheln" | "ernst".
     So lässt sich der Halo-Effekt im Kurs prüfen (Fassung über Code 1 / Code 2). */
  function fotiou(fassung) {
    var smile = fassung !== "ernst";
    var SKIN = "#c98f6b", SKIND = "#b07a58", HAIR = "#3a2f2a", GREY = "#8c847c", SHIRT = "#f4efe6", JACKET = "#33506b", JACKETD = "#284257";
    var s = '<svg viewBox="0 0 320 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zeichnung: Herr Fotiou, ein Mann um die 45 mit kurzen dunklen Haaren, grauen Schläfen, Brille und Sakko, ' + (smile ? "er lächelt freundlich" : "er schaut ernst, ohne zu lächeln") + '">';
    s += '<rect width="320" height="360" rx="18" fill="#e7eeea"/>';
    s += '<circle cx="160" cy="150" r="118" fill="#d4e3dd"/>';
    // Oberkörper
    s += '<path d="M40 360 C 48 290, 96 262, 160 258 C 224 262, 272 290, 280 360 Z" fill="' + JACKET + '"/>';
    s += '<path d="M128 258 L160 330 L192 258 C 182 252, 138 252, 128 258 Z" fill="' + SHIRT + '"/>';
    s += '<path d="M128 258 L112 300 L150 312 L160 330 Z M192 258 L208 300 L170 312 L160 330 Z" fill="' + JACKETD + '"/>';
    // Hals
    s += '<path d="M138 222 L138 262 C 150 272, 170 272, 182 262 L182 222 Z" fill="' + SKIND + '"/>';
    // Ohren
    s += '<ellipse cx="96" cy="160" rx="13" ry="20" fill="' + SKIND + '"/><ellipse cx="224" cy="160" rx="13" ry="20" fill="' + SKIND + '"/>';
    // Kopf
    s += '<path d="M100 140 C 100 92, 128 70, 160 70 C 192 70, 220 92, 220 140 C 220 196, 196 236, 160 236 C 124 236, 100 196, 100 140 Z" fill="' + SKIN + '"/>';
    // Haare mit grauen Schläfen
    s += '<path d="M98 138 C 94 96, 118 62, 160 60 C 204 60, 228 92, 222 138 C 216 120, 212 104, 200 96 C 176 104, 140 104, 116 96 C 106 106, 102 120, 98 138 Z" fill="' + HAIR + '"/>';
    s += '<path d="M99 136 C 98 124, 101 112, 107 104 L 110 132 Z M221 136 C 222 124, 219 112, 213 104 L 210 132 Z" fill="' + GREY + '"/>';
    // Augenbrauen: beim Lächeln etwas angehoben, ernst gerade und tiefer
    s += smile ? '<path d="M122 128 Q136 120 150 126" stroke="' + HAIR + '" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M170 126 Q184 120 198 128" stroke="' + HAIR + '" stroke-width="6" fill="none" stroke-linecap="round"/>'
               : '<path d="M122 131 L150 130" stroke="' + HAIR + '" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M170 130 L198 131" stroke="' + HAIR + '" stroke-width="6" fill="none" stroke-linecap="round"/>';
    // Augen
    s += smile ? '<path d="M128 150 Q136 143 144 150" stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M176 150 Q184 143 192 150" stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round"/>'
               : '<circle cx="136" cy="149" r="4.5" fill="' + INK + '"/><circle cx="184" cy="149" r="4.5" fill="' + INK + '"/>';
    // Brille
    s += '<rect x="116" y="134" width="40" height="30" rx="9" fill="none" stroke="' + INK + '" stroke-width="3.5"/><rect x="164" y="134" width="40" height="30" rx="9" fill="none" stroke="' + INK + '" stroke-width="3.5"/><path d="M156 147 L164 147 M116 145 L104 140 M204 145 L216 140" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round"/>';
    // Nase
    s += '<path d="M160 156 C 156 172, 154 180, 162 184" stroke="' + SKIND + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
    // Mund: einziger Unterschied neben Augen und Brauen
    s += smile ? '<path d="M136 200 Q160 222 184 200 Q160 210 136 200 Z" fill="#fffaf4" stroke="#7a3b2c" stroke-width="3.5" stroke-linejoin="round"/><path d="M128 196 Q132 202 136 200 M184 200 Q188 202 192 196" stroke="' + SKIND + '" stroke-width="3" fill="none" stroke-linecap="round"/>'
               : '<path d="M140 206 L180 206" stroke="#7a3b2c" stroke-width="4" fill="none" stroke-linecap="round"/>';
    // Bartschatten
    s += '<path d="M118 196 C 124 226, 144 236, 160 236 C 176 236, 196 226, 202 196 C 196 218, 178 228, 160 228 C 142 228, 124 218, 118 196 Z" fill="' + SKIND + '" opacity=".55"/>';
    return s + "</svg>";
  }

  /* Aufbau der Asch-Studie von oben: Tisch, sieben Plätze, Tafel mit Linien */
  function aschTisch() {
    var s = '<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schaubild Asch-Studie: sieben Personen sitzen in einer Reihe vor einer Tafel mit Linien. Sechs sind eingeweiht, die echte Versuchsperson sitzt auf dem vorletzten Platz und antwortet als Sechste." ' + FONT + '>' + defs();
    s += '<rect width="560" height="300" rx="14" fill="#fff"/>';
    s += '<rect x="170" y="16" width="220" height="70" rx="8" fill="' + GOLDS + '" stroke="' + LINE + '" stroke-width="2"/>';
    s += '<text x="280" y="36" text-anchor="middle" font-size="14" fill="' + SOFT + '">Tafel</text>';
    s += '<line x1="200" y1="76" x2="200" y2="46" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>';
    s += '<line x1="290" y1="76" x2="290" y2="56" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/><line x1="320" y1="76" x2="320" y2="46" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/><line x1="350" y1="76" x2="350" y2="40" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>';
    s += '<path d="M60 190 Q280 120 500 190" fill="none" stroke="' + LINE + '" stroke-width="26" stroke-linecap="round"/>';
    var pos = [[78, 214], [148, 186], [214, 170], [280, 164], [346, 170], [412, 186], [482, 214]];
    pos.forEach(function (p, i) {
      var echt = i === 5;
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="22" fill="' + (echt ? WARM : ACCS) + '" stroke="' + (echt ? WARM : ACC) + '" stroke-width="2.5"/>';
      s += '<text x="' + p[0] + '" y="' + (p[1] + 6) + '" text-anchor="middle" font-size="17" font-weight="700" fill="' + (echt ? "#fff" : ACC) + '">' + (i + 1) + "</text>";
    });
    s += '<text x="412" y="246" text-anchor="middle" font-size="15" font-weight="700" fill="' + WARM + '">echte Versuchsperson</text>';
    s += '<text x="412" y="264" text-anchor="middle" font-size="14" fill="' + SOFT + '">antwortet als Sechste</text>';
    s += '<text x="150" y="262" text-anchor="middle" font-size="15" font-weight="700" fill="' + ACC + '">eingeweiht</text>';
    s += '<text x="150" y="280" text-anchor="middle" font-size="14" fill="' + SOFT + '">sagen absichtlich Falsches</text>';
    s += '<text x="548" y="292" text-anchor="end" font-size="12" fill="' + SOFT + '">Schaubild · vereinfacht</text>';
    return s + "</svg>";
  }

  /* Zwei Gründe, sich anzupassen (nach Deutsch & Gerard 1955) – Modell */
  function gruende() {
    var s = '<svg viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schaubild: Zwei Wege zur Anpassung. Oben informativ: Ich bin unsicher, die anderen sind meine Information, meine Überzeugung ändert sich. Unten normativ: Die Gruppe hört zu, ich will nicht auffallen, meine Antwort ändert sich – die Überzeugung oft nicht." ' + FONT + '>' + defs();
    function reihe(y, farbe, hell, titel, a, b, c) {
      var r = box(6, y, 180, 96, farbe, farbe, [titel[0], titel[1]], { color: "#fff", top: 40, lh: 24, size1: 18, size: 16 });
      r += arrow(188, y + 48, 222, y + 48);
      r += box(226, y, 200, 96, hell, farbe, a, { top: 38, lh: 22, size1: 16, size: 15 });
      r += arrow(428, y + 48, 462, y + 48);
      r += box(466, y, 200, 96, hell, farbe, b, { top: 38, lh: 22, size1: 16, size: 15 });
      r += arrow(668, y + 48, 702, y + 48);
      r += box(706, y, 188, 96, "#fff", farbe, c, { top: 38, lh: 22, size1: 16, size: 15 });
      return r;
    }
    s += reihe(8, ACC, ACCS, ["informativ", ""], ["Aufgabe unklar", "„Ich bin unsicher.“"], ["Die anderen sind", "meine Information"], ["Ich glaube es", "dann oft wirklich"]);
    s += reihe(128, WARM, WARMS, ["normativ", ""], ["Gruppe hört zu", "„Alle sehen mich.“"], ["Ich will nicht", "auffallen"], ["Ich sage es –", "glaube es oft nicht"]);
    s += '<text x="894" y="246" text-anchor="end" font-size="12" fill="' + SOFT + '">Schaubild · Modell nach Deutsch &amp; Gerard (1955)</text>';
    return s + "</svg>";
  }

  window.FIGUREN_DS05 = { punkte: punkte, linien: linien, halo: halo, vorurteil: vorurteil, fotiou: fotiou, aschTisch: aschTisch, gruende: gruende };
})();
