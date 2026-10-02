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

  /* Angekündigte Bausteine (noch nicht gebaut) */
  B.geplant = [
    { ds: 4, titel: "Sehe ich, was ich erwarte?", thema: "Erwartungen und erster Eindruck" },
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
