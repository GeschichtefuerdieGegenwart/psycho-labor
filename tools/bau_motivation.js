/* Baut die Einheit Motivation: sechs Stunden und die Einheitsseite, je eine in sich geschlossene HTML-Datei im Hauptordner.
   Quelle: src/motivation/ (Vorlagen stunde.html und einheit.html, Kern kern.css/kern.js, Daten einheit-daten.js und dsXX.js).
   Aufruf: node tools/bau_motivation.js        (alle)
           node tools/bau_motivation.js ds08   (nur eine Stunde) */
const fs = require("fs"), path = require("path");
const wurzel = path.join(__dirname, ".."), quelle = path.join(wurzel, "src", "motivation");
const SEITEN = [
  { id: "ds06", datei: "ds06-antrieb.html", vorlage: "stunde.html", daten: "ds06.js", titel: "Was treibt mich an? – Motivation 1 · Psycho-Labor", beschreibung: "Motivation, Stunde 1: Motiv und Motivation, intrinsisch und extrinsisch, Der Kreis der 99." },
  { id: "ds07", datei: "ds07-wollen.html", vorlage: "stunde.html", daten: "ds07.js", titel: "Wann wird ein Muss zum Wollen? – Motivation 2 · Psycho-Labor", beschreibung: "Motivation, Stunde 2: Grundbedürfnisse, Unterminierungseffekt, Kontinuum der Regulation, Linsen, Der Kreis der 99." },
  { id: "ds08", datei: "ds08-anstrengung.html", vorlage: "stunde.html", daten: "ds08.js", titel: "Wann lohnt sich Anstrengung? – Motivation 3 · Psycho-Labor", beschreibung: "Motivation, Stunde 3: Zielspiel, Anspruchsniveau, Risikowahl, Erwartung mal Wert, Die Frösche in der Sahne." },
  { id: "ds09", datei: "ds09-erklaeren.html", vorlage: "stunde.html", daten: "ds09.js", titel: "Wie erkläre ich mir Erfolg? – Motivation 4 · Psycho-Labor", beschreibung: "Motivation, Stunde 4: Attribution, erlernte Hilflosigkeit, Die taube Ehefrau, Der angekettete Elefant." },
  { id: "ds10", datei: "ds10-vergleich.html", vorlage: "stunde.html", daten: "ds10.js", titel: "Wer bin ich im Vergleich? – Motivation 5 · Psycho-Labor", beschreibung: "Motivation, Stunde 5: Selbstkonzept, Vergleiche, Fischteicheffekt, Selbstwirksamkeit, Der wahre Wert des Rings." },
  { id: "ds11", datei: "ds11-lesen.html", vorlage: "stunde.html", daten: "ds11.js", titel: "Wie lese ich mich selbst? – Motivation 6 · Psycho-Labor", beschreibung: "Motivation, Stunde 6: Rubikon-Modell, Wenn-dann-Pläne, Geschichten analysieren." },
  { id: "einheit", datei: "motivation.html", vorlage: "einheit.html", daten: "einheit.js", titel: "Motivation – Einheit · Psycho-Labor", beschreibung: "Einheit Motivation: Landkarte, Motivationskreis, Lernspur, Zwei Sprachen, Lernkarten und Vorbereitung auf die Klassenarbeit." }
];
function lesen(datei) { return fs.readFileSync(datei, "utf8"); }
function bauen(s) {
  let html = lesen(path.join(quelle, s.vorlage)).replace("{{TITEL}}", s.titel).replace("{{BESCHREIBUNG}}", s.beschreibung).replace("{{DATEN}}", s.daten);
  html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (m, href) => {
    const css = lesen(path.join(quelle, href)).replace(/url\("\.\.\/fonts\//g, 'url("assets/fonts/');
    return "<style>\n/* eingebettet: " + path.basename(href) + " */\n" + css + "\n</style>";
  });
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
    const js = lesen(path.join(quelle, src));
    if (/<\/script/i.test(js)) throw new Error("</script in " + src);
    return "<script>\n/* eingebettet: " + path.basename(src) + " */\n" + js + "\n</script>";
  });
  html = html.replace("<head>", "<head>\n<!-- Automatisch erzeugt aus src/motivation/ mit tools/bau_motivation.js – bitte dort bearbeiten. -->");
  if (/\{\{[A-Z]+\}\}/.test(html)) throw new Error("Platzhalter übrig in " + s.datei);
  fs.writeFileSync(path.join(wurzel, s.datei), html);
  console.log("geschrieben:", s.datei, Math.round(html.length / 1024) + " KB");
}
const nur = process.argv[2];
SEITEN.filter(s => !nur || s.id === nur).forEach(s => {
  if (!fs.existsSync(path.join(quelle, s.daten))) { console.log("übersprungen (noch keine Daten):", s.datei); return; }
  bauen(s);
});
