/* Stunde 4 · Wie erkläre ich mir Erfolg? – nach M7 (Attributionstheorie), dazu erlernte Hilflosigkeit.
   Das Raster der Ursachen folgt dem Erwartungshorizont des Unterrichtsmaterials. */
(function () {
  "use strict";
  var E = window.EINHEIT;
  function bild(id) { var r = ""; E.BILDER.forEach(function (b) { if (b.id === id) r = b.bild; }); return r; }

  var RASTER = {
    zeilen: [{ id: "k", titel: "kontrollierbar" }, { id: "u", titel: "nicht kontrollierbar" }],
    spalten: [{ id: "is", titel: "internal · stabil" }, { id: "ii", titel: "internal · instabil" }, { id: "es", titel: "external · stabil" }, { id: "ei", titel: "external · instabil" }]
  };
  var URSACHEN = [
    ["Begabung", "u|is", "Begabung liegt in dir und bleibt. Beeinflussen kannst du sie kaum."],
    ["Anstrengung", "k|ii", "Anstrengung liegt in dir, kann jedes Mal anders sein – und du steuerst sie selbst."],
    ["Glück oder Zufall", "u|ei", "Glück liegt außerhalb, wechselt und lässt sich nicht beeinflussen."],
    ["Wissen", "k|is", "Wissen liegt in dir und bleibt – und du kannst es durch Lernen verändern."],
    ["Aufgaben\u00ADschwierigkeit", "u|es", "Wie schwer die Aufgabe ist, liegt außerhalb von dir und bleibt gleich. Ändern kannst du sie nicht."],
    ["Konzen\u00ADtration (Tagesform)", "u|ii", "Wie gut du dich gerade konzentrieren kannst, liegt in dir und schwankt von Tag zu Tag – müde, krank, abgelenkt. Steuern kannst du das kaum."],
    ["dauerhafte Nachhilfe", "k|es", "Hilfe von außen, die bleibt – und die du dir selbst holen kannst."],
    ["einmalige Nachhilfe", "k|ei", "Hilfe von außen, die nur einmal da ist – und die du dir holen kannst."]
  ];
  function rasterDruck() {
    var zelle = {}; URSACHEN.forEach(function (u) { zelle[u[1]] = u[0]; });
    return "<table><thead><tr><th></th>" + RASTER.spalten.map(function (s) { return "<th>" + s.titel + "</th>"; }).join("") + "</tr></thead><tbody>" + RASTER.zeilen.map(function (z) {
      return "<tr><th>" + z.titel + "</th>" + RASTER.spalten.map(function (s) { return "<td>" + zelle[z.id + "|" + s.id] + "</td>"; }).join("") + "</tr>";
    }).join("") + "</tbody></table>";
  }

  window.STUNDE = {
    id: "ds09", minuten: 90, material: "nach M7",
    frage: "Warum macht dieselbe schlechte Note den einen mutlos – und den anderen nicht?",
    darum: "<p>Ali und Josef haben beide schlechte Noten geschrieben. Ali nimmt es leicht, Josef gibt auf. Heute untersuchst du, wie Menschen sich Erfolg und Misserfolg erklären – und was diese Erklärungen für das nächste Mal bedeuten. Am Ende hörst du Bucays Geschichte vom angeketteten Elefanten.</p>",
    ziele: ["erklären, was eine Attribution ist, und Ursachen nach drei Fragen ordnen,", "vorhersagen, wie eine Erklärung auf die Motivation wirkt,", "erlernte Hilflosigkeit erklären und ein günstiges Muster formulieren."],
    hinweis: "In dieser Stunde geht es auch um Aufgeben und Hilflosigkeit. Wenn dich das persönlich betrifft, sprich mit jemandem, dem du vertraust.",
    auftraege: [
      { id: "a1", nr: "1", titel: "Erst erinnern", sozial: "allein, ohne Heft", min: 4, oeffnet: "offen", bloecke: [
        { typ: "abruf", min: 3, fragen: E.MERK.ds08.abruf, antworten: [
          "Das Ziel, an dem ich meine Leistung messe. Nach Erfolg steigt es meist, nach Misserfolg sinkt es.",
          "Dann ist die Motivation – vereinfacht gesagt – null, egal, wie groß der Wert ist.",
          "Wichtigkeit, Interesse, Nützlichkeit, Kosten."] }
      ] },
      { id: "a2", nr: "2", titel: "Ali und Josef", sozial: "zu zweit", min: 8, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p>Ali und Josef reagieren ganz unterschiedlich auf ihre schlechten Mathenoten.</p>" },
        { typ: "karten", status: "ausgedachter Fall", karten: [
          { art: "honig", titel: "Ali sagt", html: "<ul><li>»Die Lehrerin hat die Arbeit auch viel zu schwer gemacht.«</li><li>»Ich hatte halt nicht genügend Zeit zum Lernen.«</li><li>»Das war einfach Pech. Ich hatte etwas anderes gelernt.«</li></ul>" },
          { art: "petrol", titel: "Josef sagt", html: "<ul><li>»Ich check es ohnehin nicht.«</li></ul><p class=\"k-klein\">Er macht immer seltener Hausaufgaben.</p>" }
        ] },
        { typ: "kasten", art: "auftrag", titel: "Auftrag", html: "<p>Beschreibt zu zweit, wie die beiden mit der schlechten Note umgehen. Dann schreibt jede Person ihre Vermutung auf.</p>" },
        { typ: "fest", id: "vergleich", label: "Haben ihre Erklärungen Einfluss auf ihre Lernmotivation? Deine Vermutung mit Begründung.", platzhalter: "Ich vermute, dass Ali …, während Josef …, weil …", mind: 15, max: 400, zeilen: 3, kurz: "Meine Vermutung zu Ali und Josef" }
      ] },
      { id: "a3", nr: "3", titel: "Drei Fragen an eine Erklärung", sozial: "Plenum, dann allein", min: 14, oeffnet: "ansage", bloecke: [
        { typ: "text", html: "<p>Wie Menschen sich ein Ergebnis erklären, nennt die Psychologie <b>Attribution</b> (Ursachenzuschreibung). Es geht nicht darum, was wirklich die Ursache war, sondern was ein Mensch dafür hält. Die Attributionstheorie stellt jeder Erklärung drei Fragen:</p>" },
        { typ: "karten", karten: [
          { art: "honig", titel: "Wo liegt die Ursache?", html: "<p><b>internal</b>: in mir · <b>external</b>: in der Situation</p><p class=\"k-klein\">nach Heider</p>" },
          { art: "honig", titel: "Bleibt sie?", html: "<p><b>stabil</b>: bleibt gleich · <b>instabil</b>: ändert sich</p>" },
          { art: "honig", titel: "Kann ich sie beeinflussen?", html: "<p><b>kontrollierbar</b> · <b>nicht kontrollierbar</b></p>" }
        ] },
        { typ: "wahl", items: [
          { id: "at1", text: "»Ich check es ohnehin nicht.« – Was antwortet Josefs Erklärung auf die drei Fragen?", opt: [
            ["in mir · bleibt · nicht beeinflussbar", "zentral", "Josef sucht die Ursache in seiner Begabung. Die bleibt – und er kann sie nicht ändern. Nach einem Misserfolg ist das die ungünstigste Erklärung."],
            ["in mir · ändert sich · beeinflussbar", "kaum", "So klänge »Ich habe zu wenig geübt«. Josef sagt aber, er checke es »ohnehin« nicht – also immer."],
            ["außerhalb · bleibt · nicht beeinflussbar", "kaum", "Josef macht nicht die Arbeit oder die Lehrerin verantwortlich, sondern sich selbst."]] },
          { id: "at2", text: "»Das war einfach Pech.« – Was antwortet Alis Erklärung auf die drei Fragen?", opt: [
            ["in mir · bleibt · nicht beeinflussbar", "kaum", "Pech liegt nicht in Ali. Er schiebt die Ursache gerade von sich weg."],
            ["außerhalb · bleibt · nicht beeinflussbar", "begruendbar", "Außerhalb und nicht beeinflussbar stimmt. Aber Pech bleibt nicht – beim nächsten Mal kann es anders sein."],
            ["außerhalb · ändert sich · nicht beeinflussbar", "zentral", "Genau: Pech liegt außerhalb, wechselt und lässt sich nicht steuern. Was daraus für Alis nächste Arbeit folgt, sagst du in Auftrag 4 voraus."]] }
        ] },
        { typ: "text", html: "<h3>Ordne die Ursachen</h3><p>Acht Ursachen, acht Felder: Tippe eine Ursache an, dann das Feld, in das sie gehört. Jedes Feld bekommt genau eine.</p>" },
        { typ: "sortieren", id: "raster", karten: URSACHEN, raster: RASTER, fertigText: "Lies die obere Zeile noch einmal: Das sind die Ursachen, an denen man selbst etwas ändern kann." },
        { typ: "befund", status: "belegte Quelle · vereinfacht", quelle: "Weiner (1985), Psychological Review 92; Stangl, Online-Lexikon für Psychologie und Pädagogik (2020), aus dem Unterrichtsmaterial M7", html: "<p><b>Weiner (1985):</b> Für die Erwartung zählt vor allem die <b>Stabilität</b>. Wer einen Misserfolg mit etwas Stabilem erklärt (Begabung, Schwierigkeit), erwartet beim nächsten Mal wieder Misserfolg. Ob die Ursache in mir liegt, beeinflusst vor allem Gefühle: Stolz nach Erfolg, Scham nach Misserfolg.</p><p>Studien zeigen außerdem: Die meisten Menschen führen Erfolg eher auf sich selbst zurück und Misserfolg eher auf die Umstände. Das schützt den Selbstwert.</p>" }
      ] },
      { id: "a4", nr: "4", titel: "Was sagt die Theorie voraus?", sozial: "allein", min: 9, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<h3>Denkwerkzeug: Prognose</h3><p>Eine gute Theorie erklärt nicht nur hinterher. Sie sagt vorher, was passiert – und lässt sich daran prüfen. Was sagt die Attributionstheorie voraus?</p>" },
        { typ: "wahl", items: [
          { id: "p1", text: "Ali erklärt seine schlechte Note mit Pech. Was sagt die Theorie für die nächste Arbeit voraus?", opt: [
            ["Er erwartet wieder Misserfolg und lernt weniger.", "kaum", "Pech ist instabil: Beim nächsten Mal kann es anders laufen. Seine Erwartung bleibt eher erhalten."],
            ["Seine Erwartung bleibt, er gibt nicht auf – aber er ändert auch nichts an seinem Lernen.", "zentral", "Pech schützt Alis Selbstwert und seine Erwartung. Weil die Ursache außerhalb liegt und nicht kontrollierbar ist, sieht er aber keinen Grund, anders zu lernen."],
            ["Er lernt mehr, weil er sich ärgert.", "kaum", "Das sagt die Theorie nicht voraus: Pech lässt sich nicht steuern – mehr Lernen ist darauf keine Antwort."]] },
          { id: "p2", text: "Josef erklärt seine schlechte Note mit fehlender Begabung. Was sagt die Theorie voraus?", opt: [
            ["Er strengt sich jetzt erst recht an.", "kaum", "Wozu, wenn es an der Begabung liegt? Eine stabile, nicht kontrollierbare Ursache nimmt der Anstrengung den Sinn."],
            ["Er erwartet wieder Misserfolg – und strengt sich weniger an.", "zentral", "Begabung ist stabil und nicht kontrollierbar. Genau das zeigt sich im Fall: Er macht immer seltener Hausaufgaben. Die Vorhersage passt."],
            ["Nichts – Erklärungen haben keine Folgen.", "kaum", "Die Theorie sagt das Gegenteil, und Josefs Verhalten bestätigt sie."]] },
          { id: "p3", text: "Melissa schreibt eine 1 und sagt: »Da hatte ich Glück.« Was sagt die Theorie voraus?", opt: [
            ["Sie ist stolz und traut sich beim nächsten Mal mehr zu.", "kaum", "Stolz entsteht, wenn man den Erfolg sich selbst zuschreibt. Glück liegt außerhalb."],
            ["Ihr Erfolg stärkt ihre Erwartung kaum – Glück ist außerhalb, instabil und nicht kontrollierbar.", "zentral", "Darum ist das nach einem Erfolg ungünstig. Günstig wäre: »Ich habe es verstanden und gut geübt.«"],
            ["Sie wird nächstes Mal weniger lernen, weil sie auf Glück hofft.", "begruendbar", "Möglich, aber nicht zwingend. Sicher ist: Ihre Erklärung macht sie weder stolz noch zuversichtlicher."]] }
        ] },
        { typ: "merk", titel: "Ein günstiges Attributionsmuster", html: "<p><b>Nach Erfolg:</b> eigene Fähigkeit und Anstrengung – »Ich habe es verstanden und gut geübt.«</p><p><b>Nach Misserfolg:</b> eine Ursache, die sich ändern lässt – »Ich habe zu spät angefangen und falsch geübt.«</p><p class=\"k-klein\">Wer lernmotiviert ist und so erklärt, lernt auf lange Sicht mehr (Unterrichtsmaterial M7, nach Hasselhorn &amp; Gold 2013).</p>" }
      ] },
      { id: "a5", nr: "5", titel: "Gelernt, dass nichts hilft", sozial: "zuhören, dann allein", min: 18, oeffnet: "ansage", bloecke: [
        { typ: "befund", status: "belegte Quelle · vereinfacht", quelle: "Seligman & Maier (1967), Journal of Experimental Psychology 74", html: "<p><b>Ein Tierversuch aus den 1960er-Jahren:</b> Hunde bekamen schmerzhafte Stromstöße. Eine Gruppe konnte sie abschalten, indem sie mit der Schnauze gegen eine Platte drückte. Eine zweite Gruppe nicht – bei ihr endeten die Stöße, egal was sie tat. Danach kamen alle in eine Box, in der sie den Stößen leicht entkommen konnten: Sie mussten nur über eine niedrige Wand springen.</p><p class=\"k-klein\">Versuche wie dieser sind heute streng geregelt und umstritten. Wir besprechen ihn, weil er die Forschung zur Hilflosigkeit begründet hat.</p>" },
        { typ: "wahl", items: [{ id: "h1", stimmkarte: true, text: "Deine Vorhersage: Was tun die Hunde der zweiten Gruppe in der neuen Box?", opt: [
          ["Sie springen schnell über die Wand – sie kennen die Stöße ja schon.", "kaum", "Klingt logisch, so kam es aber nicht.", "springen"],
          ["Sie bleiben liegen und versuchen es kaum.", "zentral", "So kam es bei den meisten. Sie hatten gelernt: Was ich tue, ändert nichts.", "bleiben liegen"],
          ["Sie suchen nach der Platte aus dem ersten Teil.", "begruendbar", "Eine kluge Überlegung. Beobachtet wurde aber vor allem, dass sie es kaum versuchten.", "suchen Platte"]] }] },
        { typ: "befund", status: "belegte Quelle · vereinfacht", html: "<p><b>Befund:</b> Die meisten Hunde der zweiten Gruppe versuchten kaum zu entkommen. Die Hunde der ersten Gruppe sprangen über die Wand. Seligman nannte das <b>erlernte Hilflosigkeit</b>: Wer erlebt, dass sein Handeln nichts bewirkt, erwartet das auch in neuen Situationen – und hört auf, es zu versuchen.</p>" },
        { typ: "kasten", art: "info", titel: "Fünfzig Jahre später", html: "<p>Neuere Forschung dreht die Deutung teilweise um: Aufgeben ist die Grundreaktion auf lang anhaltende, belastende Ereignisse. Gelernt wird etwas anderes – die Erfahrung, dass man <b>etwas bewirken kann</b>. Diese Erfahrung schützt (Maier &amp; Seligman 2016).</p><p>Nach der klassischen Deutung lernt man: Was ich tue, ändert nichts. Nach der neueren fehlt die gelernte Erfahrung, etwas bewirken zu können. In beiden Deutungen fehlt am Ende dasselbe: die Erwartung, etwas zu bewirken.</p>" },
        { typ: "geschichte", titel: "Der angekettete Elefant", hoerauftrag: "Achte darauf: Was hat der Elefant gelernt – und wann?" },
        { typ: "wahl", items: [
          { id: "el1", text: "Bild 1: " + bild("el1") + " – Was hat er gelernt?", opt: [
            ["Dass der Pflock stärker ist als er – damals stimmte das.", "begruendbar", "Richtig beobachtet, und es war damals wahr. Gelernt hat er aber mehr: dass sein Ziehen überhaupt nichts bewirkt."],
            ["Dass sein Handeln nichts bewirkt.", "zentral", "Wie die Hunde der zweiten Gruppe: Was er tut, ändert nichts. Das ist der Kern erlernter Hilflosigkeit."],
            ["Dass er sich mehr anstrengen muss.", "kaum", "Er hat sich ja angestrengt – tagelang. Gerade das hat ihm gezeigt, dass Anstrengung nichts bringt."]] },
          { id: "el2", text: "Bild 2: " + bild("el2") + " – Welcher Fachbegriff passt?", opt: [
            ["Unterminierungseffekt", "kaum", "Es gibt keine Belohnung, die eine Freude untergräbt."],
            ["fehlende Motivation (Amotivation)", "begruendbar", "Von außen sieht es so aus. Die Theorie erklärt aber, woher das kommt: aus einer gelernten Erwartung."],
            ["erlernte Hilflosigkeit", "zentral", "Die Erfahrung von damals wird auf eine neue Lage übertragen, in der sie nicht mehr stimmt."]] },
          { id: "el3", text: "Bild 3: " + bild("el3") + " – Wie erklärt er sich sein Scheitern?", opt: [
            ["internal, stabil, nicht kontrollierbar – »Ich bin zu schwach.«", "zentral", "Er sucht die Ursache in sich, hält sie für dauerhaft und für unveränderlich. Dasselbe Muster wie Josefs »Ich check es ohnehin nicht«."],
            ["external, stabil – »Der Pflock ist zu stark.«", "begruendbar", "Auch möglich: Dann liegt es am Pflock. Doch auch das ist stabil gedacht – er prüft nie, ob es noch stimmt."],
            ["internal, instabil – »Ich habe mich zu wenig angestrengt.«", "kaum", "Dann würde er es noch einmal versuchen. Genau das tut er nicht."]] }
        ] },
        { typ: "sprachen" },
        { typ: "kasten", art: "privat", titel: "Wenn dich das betrifft", html: "<p>Hast du selbst oft das Gefühl, dass nichts, was du tust, etwas ändert? Dann sprich mit jemandem, dem du vertraust – mit Freundinnen und Freunden, der Familie, einer Lehrkraft oder der Beratung an der Schule. Das ist kein Zeichen von Schwäche. Dieser Unterricht kann so etwas nicht klären.</p>" }
      ] },
      { id: "a6", nr: "6", titel: "Verorten und vernetzen", sozial: "allein, dann am Board", min: 6, oeffnet: "nach", bloecke: [
        { typ: "verorten" },
        { typ: "text", html: "<h3>Eine Verbindung knüpfen</h3>" },
        { typ: "verbindung", einleitung: "Verbinde einen Begriff von heute mit einem früheren. Zum Beispiel: Wie hängt die Stabilität einer Ursache mit der Erfolgserwartung zusammen?" },
        { typ: "text", html: "<h3>Deine Lernspur</h3>" },
        { typ: "lernspur", satzanfang: "Wie ich mir eine schlechte Note erkläre, entscheidet mit, ob …" }
      ] },
      { id: "a7", nr: "7", titel: "Ein günstiges Muster für Josef", sozial: "allein", min: 15, oeffnet: "nach", bloecke: [
        { typ: "schreiben", id: "muster", operator: "anwenden und begründen", mind: 60,
          aufgabe: "Formuliere, was Josef zu sich sagen könnte, wenn er (1) eine gute und (2) wieder eine schlechte Note bekommt – so, dass seine Motivation wächst. Erkläre zuerst, was eine Attribution ist, und begründe dann mit der Attributionstheorie.",
          hinweis: "Ordne beide Sätze den drei Fragen zu: Wo liegt die Ursache? Bleibt sie? Kann Josef sie beeinflussen?",
          beispiel: "<p>»Eine Attribution ist … (1) Nach einer guten Note könnte Josef sagen: ›Ich habe die Aufgaben verstanden, weil ich …‹ Diese Ursache liegt in ihm (internal) und …«</p>",
          satzanfaenge: ["Eine Attribution ist …", "Nach einer guten Note sollte Josef sagen: »…« Diese Ursache ist …", "Nach einer schlechten Note sollte er sagen: »…« Diese Ursache ist instabil und kontrollierbar, deshalb …", "Seine bisherige Erklärung »Ich check es ohnehin nicht« ist dagegen …"],
          wortspeicher: ["Attribution", "internal", "external", "stabil", "instabil", "kontrollierbar", "Erfolgserwartung", "Selbstwert", "Anstrengung"],
          kriterien: [
            ["Grundlegend", "Ich erkläre, was eine Attribution ist, und formuliere für beide Fälle einen Satz, den Josef zu sich sagen könnte."],
            ["Sicher", "Ich ordne beide Sätze den drei Fragen zu (internal oder external, stabil oder instabil, kontrollierbar oder nicht)."],
            ["Souverän", "Ich begründe mit der Theorie, wie diese Erklärungen auf Josefs Erwartung und Gefühle wirken, und grenze sie von seiner bisherigen Erklärung ab."]],
          muster: "<p>Eine Attribution ist die Erklärung, die sich ein Mensch für ein Ergebnis gibt – so, wie er es erlebt, nicht unbedingt, wie es objektiv war. (1) Nach einer guten Note sollte Josef sagen: »Ich habe die Aufgaben verstanden, weil ich regelmäßig geübt habe – ich kann das.« Die Ursache liegt in ihm (internal) und ist durch Lernen kontrollierbar; Wissen bleibt (stabil). Das macht stolz und hebt seine Erwartung für die nächste Arbeit. (2) Nach einer schlechten Note sollte er sagen: »Diesmal habe ich zu spät angefangen und falsch geübt. Nächstes Mal rechne ich alte Arbeiten.« Diese Ursache ist instabil und kontrollierbar: Er kann sie ändern, also bleibt seine Erwartung erhalten, und Anstrengung lohnt sich. Seine bisherige Erklärung »Ich check es ohnehin nicht« ist dagegen internal, stabil und nicht kontrollierbar. Nach der Theorie erwartet er damit wieder Misserfolg – und genau das zeigt sich: Er macht immer seltener Hausaufgaben.</p>" },
        { typ: "rueckblick", id: "vergleich-jetzt", von: "vergleich", vorher: "Das hast du am Anfang über Ali und Josef vermutet:", label: "Was denkst du jetzt – und warum?" },
        { typ: "kann", items: ["Ich kann erklären, was eine Attribution ist.", "Ich kann Ursachen nach internal/external, stabil/instabil und kontrollierbar ordnen.", "Ich kann vorhersagen, wie eine Erklärung auf die Motivation wirkt.", "Ich kann erlernte Hilflosigkeit erklären."] }
      ] }
    ],
    merkseite: Object.assign({}, E.MERK.ds09, {
      extra2: "<h2>Ursachen ordnen</h2>" + rasterDruck()
    })
  };
})();
