/* Baut aus src/*.html eine einzige, in sich geschlossene HTML-Datei im Hauptordner.
   CSS und Skripte aus ../assets/ werden direkt eingebettet (Orientierungsmodell: eine Datei, keine externen Skripte).
   Aufruf: node tools/inline.js src/ds04-erwartungen.html */
const fs = require("fs"), path = require("path");
const src = process.argv[2];
if (!src) { console.error("Bitte Quelldatei angeben."); process.exit(1); }
const dir = path.dirname(src);
let html = fs.readFileSync(src, "utf8");
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (m, href) => {
  const css = fs.readFileSync(path.join(dir, href), "utf8");
  return "<style>\n/* eingebettet: " + path.basename(href) + " */\n" + css + "\n</style>";
});
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, s) => {
  const js = fs.readFileSync(path.join(dir, s), "utf8");
  if (/<\/script/i.test(js)) throw new Error("</script in " + s);
  return "<script>\n/* eingebettet: " + path.basename(s) + " */\n" + js + "\n</script>";
});
html = html.replace("<head>", "<head>\n<!-- Automatisch erzeugt aus " + src + " mit tools/inline.js – bitte dort bearbeiten. -->");
const out = path.join(dir, "..", path.basename(src));
fs.writeFileSync(out, html);
console.log("geschrieben:", out, Math.round(html.length / 1024) + " KB");
