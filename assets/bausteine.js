/* Verzeichnis aller Bausteine – für die Startseite und die Kursauswertung der Lehrkraft.
   Neue Bausteine werden hier ergänzt. */

(function () {
  "use strict";

  var B = {};

  B.ds02 = {
    ds: 2,
    titel: "Siehst du, was sich ändert?",
    thema: "Wahrnehmung · Veränderungsblindheit",
    datei: "ds02-veraenderungsblindheit.html",
    /* Code: ds02.id.kontrolle.strasse.fruehstueck.park.wohnzimmer.strand.schreibtisch.vorhersage.hypothese */
    decode: function (parts) {
      if (parts.length !== 11) return null;
      var t = parts.slice(2, 9).map(function (x) { return +x / 10; });
      if (t.some(isNaN)) return null;
      return {
        id: parts[1],
        kontrolle: t[0],
        mitte: (t[1] + t[2] + t[3]) / 3,
        rand: (t[4] + t[5] + t[6]) / 3,
        einzel: t,
        vorhersage: +parts[9],
        hypothese: { m: "mitte", r: "rand", g: "gleich" }[parts[10]] || "?"
      };
    },
    gruppen: [
      { key: "kontrolle", label: "Ohne Flackern", color: "#545b6b" },
      { key: "mitte", label: "Flackern: Mittelpunkt", color: "#0e6b68" },
      { key: "rand", label: "Flackern: Nebensache", color: "#d9643f" }
    ],
    render: function (recs) {
      var groups = this.gruppen.map(function (g) { return { label: g.label, color: g.color, values: recs.map(function (r) { return r[g.key]; }) }; });
      var main = Lab.dotPlot(groups, { aria: "Kursergebnis", rowH: 92 }) + '<p class="small">Jeder Punkt ist eine Person (Durchschnitt ihrer Bilder). Der Strich zeigt den Kursdurchschnitt.</p>';
      var predM = Lab.mean(recs.map(function (r) { return r.vorhersage; })), flM = Lab.mean(recs.map(function (r) { return (r.mitte + r.rand) / 2; }));
      var hyp = { mitte: 0, rand: 0, gleich: 0 }; recs.forEach(function (r) { if (r.hypothese in hyp) hyp[r.hypothese]++; });
      var rest = '<div class="card"><h3>Vorhersage und Ergebnis</h3><p>Vorhergesagt im Mittel: <strong>' + Lab.sec(predM) + "</strong> · Tatsächlich mit Flackern: <strong>" + Lab.sec(flM) + "</strong></p><p>Vermutungen: Mittelpunkt schneller " + hyp.mitte + " · Nebensache schneller " + hyp.rand + " · kein Unterschied " + hyp.gleich + "</p></div>";
      return { main: main, rest: rest };
    },
    befund: "Rensink, O’Regan & Clark (1997): Ohne Lücke fällt eine Änderung fast sofort auf. Mit Lücke brauchen Menschen oft viele Bildwechsel, und Änderungen an Nebensachen werden deutlich langsamer entdeckt als Änderungen an Dingen im Mittelpunkt.",
    fragen: [
      "Was beobachten wir? Beschreibt das Diagramm, bevor ihr es deutet.",
      "Stimmt unser Ergebnis mit der Forschung überein?",
      "Was können 7 Personen zeigen – und was nicht?",
      "Welche anderen Unterschiede zwischen den Bildern könnten die Zeiten beeinflusst haben?"
    ],
    beispiel: function () {
      /* klar gekennzeichnete Beispieldaten zum Ausprobieren */
      var rows = [[1.2, 9.8, 6.1, 12.4, 18.2, 22.5, 15.0, 6, "m"], [0.9, 4.2, 8.8, 7.5, 31.0, 14.2, 25.4, 4, "g"], [1.5, 12.0, 5.5, 9.1, 60, 19.8, 21.3, 8, "m"], [1.1, 6.6, 4.9, 15.2, 12.7, 28.4, 33.1, 5, "r"], [0.8, 8.3, 10.2, 6.4, 24.6, 60, 17.9, 10, "m"], [1.3, 5.1, 7.7, 11.0, 16.3, 20.5, 12.2, 3, "g"], [1.0, 14.6, 6.8, 8.2, 22.1, 18.0, 29.5, 7, "m"]];
      return rows.map(function (r, i) { return ["ds02", "bsp" + i].concat(r.slice(0, 7).map(function (x) { return Math.round(x * 10); })).concat([r[7], r[8]]).join("."); });
    }
  };


  B.ds03 = {
    ds: 3,
    titel: "Wie baut mein Gehirn Bilder?",
    thema: "Wahrnehmung · Gestaltgesetze und Vorwissen",
    datei: "ds03-gestalten.html",
    /* Code: ds03.id.gruppe(L/Z).antwort(b/d/x).kipp(x100).normal.vertauscht (Zehntelsekunden) */
    decode: function (parts) {
      if (parts.length !== 7 || (parts[2] !== "L" && parts[2] !== "Z")) return null;
      return { id: parts[1], gruppe: parts[2], antwort: parts[3], kipp: +parts[4] / 100, normal: +parts[5] / 10, vertauscht: +parts[6] / 10 };
    },
    render: function (recs) {
      function count(g, a) { return recs.filter(function (r) { return r.gruppe === g && r.antwort === a; }).length; }
      var nL = recs.filter(function (r) { return r.gruppe === "L"; }).length, nZ = recs.length - nL;
      function bar(label, n, total, color) { var w = total ? Math.round(n / total * 100) : 0; return '<div style="display:grid;grid-template-columns:150px 1fr 40px;gap:10px;align-items:center;margin:6px 0"><span>' + label + '</span><div style="background:#efe9df;border-radius:8px;height:30px"><div style="width:' + w + '%;height:30px;border-radius:8px;background:' + color + '"></div></div><strong>' + n + "</strong></div>"; }
      var main = "<h3>Blitzbild: Was stand in der Mitte?</h3>" +
        '<div class="grid2"><div><p><strong>Zwischen Buchstaben</strong> (A ? C) · ' + nL + ' Personen</p>' + bar("„B“", count("L", "b"), nL, "#0e6b68") + bar("„13“", count("L", "d"), nL, "#d9643f") + bar("anderes", count("L", "x"), nL, "#a7adb8") + "</div>" +
        '<div><p><strong>Zwischen Zahlen</strong> (12 ? 14) · ' + nZ + " Personen</p>" + bar("„B“", count("Z", "b"), nZ, "#0e6b68") + bar("„13“", count("Z", "d"), nZ, "#d9643f") + bar("anderes", count("Z", "x"), nZ, "#a7adb8") + "</div></div>" +
        '<p class="small">Beide Gruppen haben genau dasselbe Zeichen gesehen. Die Gruppen wurden zufällig eingeteilt.</p>';
      var read = recs.filter(function (r) { return r.normal > 0 && r.vertauscht > 0; });
      var rest = '<div class="card"><h3>Lesen: normaler Text und vertauschte Buchstaben</h3>' + Lab.dotPlot([
        { label: "normal", color: "#0e6b68", values: read.map(function (r) { return r.normal; }) },
        { label: "vertauscht", color: "#d9643f", values: read.map(function (r) { return r.vertauscht; }) }
      ], { aria: "Lesezeiten", rowH: 80 }) + '<p class="small">Jeder Punkt ist eine Person. Forschung: Vertauschte Buchstaben in der Wortmitte verlangsamen das Lesen um etwa ein Zehntel (Rayner u. a., 2006).</p></div>';
      var kipp = recs.filter(function (r) { return r.kipp > 0; }), nie = recs.length - kipp.length;
      rest += '<div class="card"><h3>Nähe gegen Ähnlichkeit: Wo kippt das Bild?</h3>' + Lab.dotPlot([{ label: "Kipppunkt", color: "#b9871c", values: kipp.map(function (r) { return r.kipp; }) }], { aria: "Kipppunkte", rowH: 90, unit: "waagerechter Abstand ÷ senkrechter Abstand", max: 2.5, fmt: function (x) { return (Math.round(x * 100) / 100).toString().replace(".", ",") + "-fach"; } }) +
        '<p class="small">' + nie + " Person(en): kippt gar nicht. Je weiter rechts, desto länger hat die Farbe (Ähnlichkeit) gewonnen. Die Streuung zeigt: Wahrnehmung ist subjektiv.</p></div>";
      return { main: main, rest: rest };
    },
    befund: "Bruner & Minturn (1955): Dasselbe mehrdeutige Zeichen wird zwischen Buchstaben meist als „B“, zwischen Zahlen meist als „13“ gelesen. Vorwissen und Erwartungen ergänzen die Wahrnehmung (top-down).",
    fragen: [
      "Was seht ihr? Vergleicht die beiden Gruppen beim Blitzbild – nur beschreiben.",
      "Wie lässt sich der Unterschied erklären? Was hat das mit Vorwissen zu tun?",
      "Warum war es wichtig, dass die Gruppen zufällig eingeteilt wurden?",
      "Lesen und Kipppunkt: Was zeigen die Punkte über Unterschiede zwischen Menschen?"
    ],
    beispiel: function () {
      var rows = [["L", "b", 128, 132, 151], ["Z", "d", 140, 118, 139], ["L", "b", 0, 145, 160], ["Z", "d", 115, 126, 141], ["L", "b", 162, 110, 127], ["Z", "b", 131, 139, 158], ["Z", "d", 150, 122, 133]];
      return rows.map(function (r, i) { return ["ds03", "bsp" + i].concat(r).join("."); });
    }
  };


  B.ds04 = {
    ds: 4,
    titel: "Sehe ich, was ich erwarte?",
    thema: "Wahrnehmung · Erwartungen (Spielkarten und Wortliste)",
    datei: "ds04-erwartungen.html",
    /* Code: ds04.id.normalErkannt(0–7).trickBemerkt(0–3).trickFormGewinnt(0–3).liste(A/B).sympathisch(×10).satz(f/s) */
    decode: function (parts) {
      if (parts.length !== 8 || "AB".indexOf(parts[5]) < 0 || !parts[5]) return null;
      var n = parts.slice(2, 5).map(Number);
      if (n.some(isNaN)) return null;
      return { id: parts[1], nk: n[0], tk: n[1], tf: n[2], L: parts[5], l: +parts[6] / 10, e: parts[7] };
    },
    render: function (recs) {
      var N = recs.length;
      function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
      function bar(label, val, color, txt) { return '<div style="display:grid;grid-template-columns:240px 1fr 80px;gap:10px;align-items:center;margin:8px 0"><span>' + label + '</span><div style="background:#efe9df;border-radius:8px;height:30px"><div style="width:' + val + '%;height:30px;border-radius:8px;background:' + color + '"></div></div><strong>' + txt + "</strong></div>"; }
      var nk = recs.reduce(function (s, r) { return s + r.nk; }, 0), tk = recs.reduce(function (s, r) { return s + r.tk; }, 0), tf = recs.reduce(function (s, r) { return s + r.tf; }, 0);
      var main = "<h3>Versuch 1 · Spielkarten</h3>" +
        bar("normale Karten richtig erkannt", pct(nk, 7 * N), "#0e6b68", pct(nk, 7 * N) + " %") +
        bar("Trickkarten als seltsam bemerkt", pct(tk, 3 * N), "#d9643f", pct(tk, 3 * N) + " %") +
        '<p class="small">Bei den übrigen Trickkarten wurde ' + tf + "-mal das Symbol behalten (Farbe passend gemacht) und " + (3 * N - tk - tf) + "-mal die Farbe behalten (Symbol passend gemacht) oder anders geantwortet. Alle Karten waren gleich lange zu sehen.</p>";
      var fmt = function (x) { return isNaN(x) ? "–" : (Math.round(x * 10) / 10).toString().replace(".", ","); };
      var A = recs.filter(function (r) { return r.L === "A"; }), Bl = recs.filter(function (r) { return r.L === "B"; });
      function cnt(arr, v) { return arr.filter(function (r) { return r.e === v; }).length; }
      var rest = '<div class="card"><h3>Versuch 2 · Wie sympathisch wirkt die Person? (1–7)</h3>' + Lab.dotPlot([
        { label: "Liste A: intelligent … (" + A.length + ")", color: "#0e6b68", values: A.map(function (r) { return r.l; }) },
        { label: "Liste B: neidisch … (" + Bl.length + ")", color: "#d9643f", values: Bl.map(function (r) { return r.l; }) }
      ], { aria: "Wortliste", rowH: 84, max: 7, ticks: 7, unit: "1 = gar nicht sympathisch · 7 = sehr sympathisch", fmt: fmt }) +
        '<p>„eine fähige Person, die ein paar Schwächen hat“: Liste A <strong>' + cnt(A, "f") + "</strong> von " + A.length + " · Liste B <strong>" + cnt(Bl, "f") + "</strong> von " + Bl.length + '</p><p class="small">Jeder Punkt ist eine Person. Die Listen wurden zufällig verteilt.</p></div>';
      return { main: main, rest: rest };
    },
    befund: "Bruner &amp; Postman (1949): Normale Karten wurden im Mittel nach 28 ms erkannt, Trickkarten erst nach 114 ms; viele meldeten zunächst eine „passende“ Karte. Asch (1946): Dieselben Eigenschaften in umgekehrter Reihenfolge erzeugen einen anderen Eindruck (Primacy-Effekt); mit Wortlisten heute als kleiner Effekt wiederholt.",
    fragen: [
      "Spielkarten: Was beobachten wir? Erst nur beschreiben.",
      "Wortliste: Unterscheiden sich die beiden Gruppen? Wie sicher ist das bei 3 gegen 4 Personen?",
      "Warum war es wichtig, dass das iPad die Listen zufällig verteilt hat?"
    ],
    beispiel: function () {
      var rows = [[7, 1, 1, "A", 50, "f"], [6, 0, 2, "B", 40, "s"], [7, 2, 0, "B", 50, "f"], [7, 0, 1, "A", 60, "f"], [5, 1, 1, "A", 40, "f"], [7, 0, 3, "B", 30, "s"], [6, 1, 0, "A", 50, "f"]];
      return rows.map(function (r, i) { return ["ds04", "bsp" + i].concat(r).join("."); });
    }
  };

  /* Angekündigte Bausteine (noch nicht gebaut) */
  B.geplant = [
    { ds: 5, titel: "Wie sehr beeinflussen mich andere?", thema: "Gruppenmeinung und Schätzen" },
    { ds: 7, titel: "Die Malstift-Studie", thema: "Belohnung und Motivation" },
    { ds: 8, titel: "Wie weit wirfst du?", thema: "Leistungsmotivation" },
    { ds: 11, titel: "Was bleibt hängen?", thema: "Gedächtnis und Reihenfolge" },
    { ds: 13, titel: "Kannst du deinem Gedächtnis trauen?", thema: "Falsche Erinnerungen" },
    { ds: 14, titel: "Lernkarten", thema: "Abrufen statt Wiederlesen" },
    { ds: 17, titel: "Was sagt ein IQ-Wert?", thema: "Normalverteilung und Messfehler" }
  ];

  window.BAUSTEINE = B;
})();
