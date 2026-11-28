/* Einheit Motivation · gemeinsame Daten aller Stunden und der Einheitsseite.
   Termini nach dem Unterrichtsmaterial M1–M9 (Walter). Bucays Geschichten werden vorgelesen; hier stehen
   nur Bilder in eigenen Worten (kein Zitat). Jede Merkseite ist die Quelle für Hinweise, Lernkarten und Druck. */
window.EINHEIT = (function () {
  "use strict";
  var E = {};
  E.LEITFRAGE = "Was treibt mich an – und was bremst mich?";

  E.STUNDEN = [
    { id: "ka1", ka: true, titel: "Klassenarbeit 1", kurz: "Wahrnehmung · geschrieben" },
    { id: "ds06", nr: 1, titel: "Was treibt mich an?", kurz: "Motiv, Motivation · intrinsisch, extrinsisch", datei: "ds06-antrieb.html", geschichte: "Der Kreis der 99" },
    { id: "ds07", nr: 2, titel: "Wann wird ein Muss zum Wollen?", kurz: "Grundbedürfnisse · Kontinuum der Regulation", datei: "ds07-wollen.html", geschichte: "Linsen · Der Kreis der 99" },
    { id: "ds08", nr: 3, titel: "Wann lohnt sich Anstrengung?", kurz: "Anspruchsniveau · Erwartung mal Wert", datei: "ds08-anstrengung.html", geschichte: "Die Frösche in der Sahne" },
    { id: "ds09", nr: 4, titel: "Wie erkläre ich mir Erfolg?", kurz: "Attribution · erlernte Hilflosigkeit", datei: "ds09-erklaeren.html", geschichte: "Die taube Ehefrau · Der angekettete Elefant" },
    { id: "ds10", nr: 5, titel: "Wer bin ich im Vergleich?", kurz: "Selbstkonzept · Fischteich · Selbstwirksamkeit", datei: "ds10-vergleich.html", geschichte: "Der wahre Wert des Rings · Der angekettete Elefant" },
    { id: "ds11", nr: 6, titel: "Wie lese ich mich selbst?", kurz: "Vom Wollen zum Tun · Geschichten analysieren", datei: "ds11-lesen.html", geschichte: "Die Frösche in der Sahne · eine Geschichte selbst analysieren" },
    { id: "ka2", ka: true, titel: "Klassenarbeit 2", kurz: "Motivation · auf Papier" }
  ];

  /* Der Motivationskreis – eigene Vereinfachung nach dem Grundmodell (Person und Situation → Motivation → Handeln),
     der Idee »Erwartung mal Wert« und der Attributionstheorie. */
  E.STATIONEN = [
    { id: "ich", name: "Ich", frage: "Was bringe ich mit?" },
    { id: "umgebung", name: "Umgebung", frage: "Was bietet die Situation?" },
    { id: "erwartung", name: "Erwartung", frage: "Schaffe ich das?" },
    { id: "wert", name: "Wert", frage: "Lohnt es sich – und wofür tue ich es?" },
    { id: "handeln", name: "Motivation und Handeln", frage: "Ich will – und ich tue es." },
    { id: "ergebnis", name: "Ergebnis", frage: "Erfolg oder Misserfolg?" },
    { id: "erklaerung", name: "Erklärung", frage: "Warum ist es so gekommen?" }
  ];

  /* Begriffe zum Verorten: z = zentrale Station, b = auch begründbare Stationen, kt = Rückmeldung bei »passt kaum« */
  E.BEGRIFFE = {
    motiv: { ds: "ds06", name: "Motiv", z: "ich", zt: "Ein Motiv bringt die Person dauerhaft mit: eine Vorliebe für bestimmte Ziele.",
      b: { wert: "Ein Motiv macht ein Ziel wertvoll. Es ist aber schon vor der Situation da – als Teil der Person." },
      kt: "Ein Motiv bringt die Person mit – darum gehört es zu »Ich«. Erwartung und Wert fragen, wie ich eine bestimmte Aufgabe einschätze; Ergebnis und Erklärung kommen erst nach dem Handeln." },
    bedingungen: { ds: "ds06", name: "Bedingungen (z. B. Interesse, Vorwissen)", z: "ich", zt: "Interesse und Vorwissen bringt die Person mit. Sie beeinflussen, ob Motivation entsteht.",
      b: { umgebung: "Manche Bedingungen liegen in der Situation – etwa, ob ich mitentscheiden darf.", erwartung: "Vorwissen beeinflusst, ob ich mir etwas zutraue. Das kommt in Stunde 3 genauer." },
      kt: "Interesse und Vorwissen bringe ich mit, bevor eine Aufgabe beginnt – darum »Ich«. Sie beeinflussen, ob Motivation überhaupt entsteht." },
    intrinsisch: { ds: "ds06", name: "intrinsische Motivation", z: "wert", zt: "Der Wert liegt in der Tätigkeit selbst: Ich tue es um der Sache willen.",
      b: { handeln: "Es ist eine Form von Motivation. Der Kreis fragt genauer, woher sie ihren Wert bezieht – aus der Sache selbst." },
      kt: "Intrinsisch beschreibt, wofür ich etwas tue. Im Kreis ist das die Frage nach dem Wert." },
    extrinsisch: { ds: "ds06", name: "extrinsische Motivation", z: "wert", zt: "Der Wert liegt außerhalb der Tätigkeit: in einer Belohnung, einer Note, im Vermeiden von Ärger.",
      b: { umgebung: "Belohnungen kommen oft aus der Umgebung. Extrinsisch beschreibt aber, wofür ich etwas tue – also den Wert.", handeln: "Es ist eine Form von Motivation. Der Kreis fragt genauer, woher ihr Wert kommt – von außerhalb der Tätigkeit." },
      kt: "Extrinsisch beschreibt, wofür ich etwas tue. Im Kreis ist das die Frage nach dem Wert." },
    merkmale: { ds: "ds06", name: "Zielrichtung, Ausdauer, Intensität", z: "handeln", zt: "Daran erkennt man Motivation von außen: am Handeln.",
      b: { ergebnis: "Ausdauer und Intensität beeinflussen das Ergebnis. Sichtbar werden sie aber schon im Handeln." },
      kt: "Diese Merkmale beschreiben Verhalten. Man sieht sie, während jemand handelt." },

    beduerfnisse: { ds: "ds07", name: "drei Grundbedürfnisse", z: "ich", zt: "Kompetenz, Selbstbestimmung und soziale Eingebundenheit bringt jeder Mensch mit (Deci und Ryan).",
      b: { umgebung: "Ob sie erfüllt werden, hängt stark von der Umgebung ab – vom Klassenklima, von Wahlfreiheit, von passenden Aufgaben." },
      kt: "Die Grundbedürfnisse sind angeboren. Sie liegen in der Person, nicht im Ergebnis oder seiner Erklärung." },
    belohnung: { ds: "ds07", name: "erwartete Belohnung für das Tun", z: "umgebung", zt: "Die Belohnung kommt aus der Situation. Sie kann die Freude an der Sache untergraben – unter Bedingungen.",
      b: { wert: "Sie verschiebt den Wert nach außen: Ich tue es für die Belohnung. Ausgelöst wird das aber von der Umgebung." },
      kt: "Eine Belohnung, die man für das Tun erwartet, bietet die Situation an – darum »Umgebung«. Sie wirkt, bevor ich handle; das Ergebnis ist etwas anderes." },
    regulation: { ds: "ds07", name: "Regulationsformen (external … integriert)", z: "wert", zt: "Sie beschreiben, wie sehr der Grund für mein Tun zu mir gehört – also, wofür ich es tue.",
      b: { ich: "Je weiter rechts auf dem Kontinuum, desto mehr gehört der Grund zum Selbst.", handeln: "Es sind Formen von Motivation. Der Kreis fragt genauer: Woher kommt der Grund? – das ist der Wert." },
      kt: "Die Regulationsformen beantworten die Frage »Wofür tue ich es?« – das ist der Wert." },
    internalisierung: { ds: "ds07", name: "Internalisierung", z: "wert", zt: "Werte von außen werden zu eigenen: Der Grund für mein Tun rückt nach innen.",
      b: { ich: "Was internalisiert ist, wird Teil des Selbst.", umgebung: "Die Werte kommen zuerst von außen – von Eltern, Schule, Freunden.", handeln: "Es geht um Motivation, das stimmt. Der Kreis fragt genauer: Woher kommt der Grund? – das ist der Wert." },
      kt: "Internalisierung verändert, wofür ich etwas tue – das ist die Frage nach dem Wert. Mit »Schaffe ich das?« oder einem Ergebnis hat sie nichts zu tun." },

    anspruch: { ds: "ds08", name: "Anspruchsniveau", z: "ergebnis", zt: "Das Anspruchsniveau entscheidet, ob ein Ergebnis als Erfolg erlebt wird: Erfolg ist, was mein Ziel erreicht.",
      b: { erwartung: "Ich setze es mir vor dem Handeln – nah an dem, was ich mir zutraue. Nach Erfolg steigt es meist, nach Misserfolg sinkt es." },
      kt: "Das Anspruchsniveau ist das Ziel, an dem ich mein Ergebnis messe." },
    leistungsmotiv: { ds: "ds08", name: "Erfolg suchen – Misserfolg meiden", z: "ich", zt: "Ob jemand eher Erfolg sucht oder Misserfolg meidet, bringt er als Motiv mit (Atkinson).",
      b: { wert: "Das Motiv bestimmt, was ein Ergebnis wert ist: Stolz bei den einen, Erleichterung bei den anderen." },
      kt: "Das Leistungsmotiv ist ein Motiv – es liegt in der Person." },
    erwartung: { ds: "ds08", name: "Erfolgserwartung", z: "erwartung", zt: "Das ist genau die Frage »Schaffe ich das?«.",
      b: { ich: "Sie hängt eng mit dem Bild von den eigenen Fähigkeiten zusammen. Im Modell ist sie aber ein eigener Faktor." },
      kt: "Die Erfolgserwartung ist die Einschätzung vor dem Handeln: Schaffe ich das?" },
    wertkomp: { ds: "ds08", name: "Wert: Wichtigkeit, Interesse, Nützlichkeit, Kosten", z: "wert", zt: "Das sind die vier Seiten des Werts nach Eccles und Wigfield: Lohnt es sich – und wofür?",
      b: { ich: "Was mir wichtig ist und was mich interessiert, bringe ich mit. Im Modell wird daraus der Wert einer Aufgabe." },
      kt: "Die vier Komponenten beschreiben, was eine Aufgabe wert ist." },

    attribution: { ds: "ds09", name: "Attribution", z: "erklaerung", zt: "Attribution ist die Erklärung, die ich mir für ein Ergebnis gebe.",
      b: {}, kt: "Eine Attribution kommt nach dem Ergebnis: Es ist die Antwort auf »Warum ist es so gekommen?«." },
    stabilitaet: { ds: "ds09", name: "Stabilität der Ursache", z: "erklaerung", zt: "Ob eine Ursache bleibt oder sich ändert, ist eine Frage an die Erklärung.",
      b: { erwartung: "Genau hier wirkt sie: Wer stabil erklärt, erwartet beim nächsten Mal dasselbe. Das ist die Rückwirkung im Kreis." },
      kt: "Stabil oder instabil ist eine Eigenschaft der Erklärung eines Ergebnisses." },
    hilflosigkeit: { ds: "ds09", name: "erlernte Hilflosigkeit", z: "erwartung", zt: "Nach der klassischen Deutung lernt man: Was ich tue, ändert nichts. Nach neuerer Forschung ist Aufgeben die Grundreaktion, und es fehlt die gelernte Erfahrung, etwas bewirken zu können. In beiden Deutungen fehlt die Erwartung, etwas zu bewirken.",
      b: { erklaerung: "Sie entsteht aus einer Erklärung: Die Ursache liegt außerhalb meiner Kontrolle.", handeln: "Sichtbar wird sie im Handeln – oder genauer: im Nicht-Handeln." },
      kt: "Erlernte Hilflosigkeit betrifft die Erwartung: Es fehlt die Erwartung, mit dem eigenen Handeln etwas zu bewirken." },

    selbstkonzept: { ds: "ds10", name: "Fähigkeitsselbstkonzept", z: "ich", zt: "Das Bild von meinen Fähigkeiten bringe ich in jede Situation mit.",
      b: { erwartung: "Es bestimmt mit, was ich mir zutraue – darum wirkt es direkt auf die Erwartung." },
      kt: "Das Selbstkonzept ist ein Teil der Person: das Bild, das ich von mir habe." },
    fischteich: { ds: "ds10", name: "Fischteicheffekt", z: "umgebung", zt: "Die Vergleichsgruppe gehört zur Situation: Wer im starken Teich schwimmt, hält sich für kleiner.",
      b: { ich: "Er verändert das Selbstkonzept. Ausgelöst wird er aber von der Umgebung." },
      kt: "Der Fischteicheffekt beschreibt, wie die Gruppe um mich herum mein Selbstbild verändert." },
    selbstwirksamkeit: { ds: "ds10", name: "Selbstwirksamkeitserwartung", z: "erwartung", zt: "Das ist das Zutrauen, eine Handlung selbst ausführen zu können (Bandura).",
      b: { ich: "Sie wächst aus Erfahrungen und wird Teil des Bildes von mir." },
      kt: "Selbstwirksamkeit ist eine Erwartung: Kann ich das selbst tun?" },

    rubikon: { ds: "ds11", name: "Rubikon (die Entscheidung)", z: "handeln", zt: "Zwischen Wollen und Tun liegt die Entscheidung. Danach geht es nicht mehr um das Ob, sondern um das Wie.",
      b: { wert: "Vor dem Rubikon wird abgewogen, ob es sich lohnt – das ist die Frage nach dem Wert." },
      kt: "Der Rubikon trennt das Abwägen vom Handeln." },
    vorsatz: { ds: "ds11", name: "Wenn-dann-Plan", z: "handeln", zt: "Ein Vorsatz bringt mich vom Wollen ins Tun.",
      b: { umgebung: "Er knüpft das Tun an eine Situation: Wenn ich nach Hause komme, …" },
      kt: "Ein Wenn-dann-Plan hilft beim Umsetzen – also beim Handeln." },
    loslassen: { ds: "ds11", name: "Loslassen unerreichbarer Ziele", z: "erwartung", zt: "Ist ein Ziel wirklich unerreichbar, sinkt die Erwartung gegen null. Dann geht Loslassen oft mit mehr Wohlbefinden einher als Festhalten.",
      b: { wert: "Loslassen heißt auch: dem alten Ziel weniger Wert geben und ein neues suchen.", erklaerung: "Es beginnt mit einer ehrlichen Erklärung: Liegt es an etwas, das ich ändern kann?", handeln: "Loslassen ist auch eine Entscheidung: aufhören und ein neues Ziel suchen." },
      kt: "Loslassen ist eine Antwort auf eine sehr niedrige Erwartung." }
  };

  /* Der Fall (ausgedachter Fall aus dem Unterrichtsmaterial, sprachlich geglättet) – begleitet die ganze Einheit */
  E.PERSONEN = [
    { name: "Josef", art: "honig", text: "Kam von der Realschule. Dort hielt er sich für gut, besonders in Mathe. Jetzt war keine Arbeit besser als 3–4. Er macht immer seltener Hausaufgaben. »Ich check es ohnehin nicht.« Sein Vater ist enttäuscht. Die Eltern versprechen eine Belohnung, wenn aus jeder 3–4 eine 3 wird." },
    { name: "Slobodan", text: "Kam vom Gymnasium. Dort gehörte er nicht zu den Stärksten. Hier sind seine Noten besser geworden. Vieles, was für Josef neu ist, kennt er schon." },
    { name: "Ali", text: "Auch seine Noten sind abgestürzt. Er nimmt es leicht: »Die Arbeit war viel zu schwer.« – »Das war einfach Pech.« Er möchte unbedingt Psychologie studieren." },
    { name: "Melissa", text: "Vergisst beim Lernen die Zeit und fühlt sich dabei »beflügelt«." }
  ];
  E.FALL = [
    "Josef geht in die 11. Klasse eines beruflichen Gymnasiums. Das zweite Halbjahr hat begonnen, die ersten Klassenarbeiten sind geschrieben. Bis zur 10. Klasse war Josef auf einer Realschule; er ist erst zu Beginn dieses Schuljahres an die Schule gekommen. Gekannt hat er anfangs fast niemanden – nur Ali und Melissa, die an der Realschule in den Parallelklassen waren, und Slobodan, der vom Gymnasium gewechselt ist und mit Josef im Verein Handball spielt. Inzwischen sind die vier eine kleine Gruppe. Seitdem freut sich Josef manchmal sogar auf die Schule.",
    "Josefs Halbjahreszeugnis sah weniger gut aus als sein Abschlusszeugnis. Vor diesem Schuljahr war er überzeugt, in den Hauptfächern gut zu sein, besonders in Mathe. Seit er in keiner Arbeit besser als 3–4 war, ist er sich nicht mehr sicher. Er kann sich immer seltener dazu durchringen, die Hausaufgaben zu machen. Seiner Mutter bleibt das nicht verborgen; sie macht sich Sorgen. Fragt sie nach, sagt Josef nur, er checke es ohnehin nicht. Sein Vater ist immer enttäuscht, wenn Josef keine guten Noten schreibt. Die Eltern haben beschlossen: Schafft er es, jede 3–4 zu einer 3 zu verbessern, bekommt er am Ende des Schuljahres eine Belohnung.",
    "Slobodans Noten sind besser geworden, seit er an der Schule ist. Deshalb hat er auch gewechselt: An seiner alten Schule gehörte er nicht zu den Leistungsstärksten. Vieles, was für Josef neu ist, ist für Slobodan ein alter Hut.",
    "Auch Ali ist in einigen Fächern abgestürzt. Josef bewundert, wie leicht Ali das nimmt. Bei einer schlechten Note sagt Ali: »Die Lehrerin hat die Arbeit auch viel zu schwer gemacht.« – »Ich hatte halt nicht genügend Zeit zum Lernen.« – »Das war einfach Pech. Ich hatte etwas anderes gelernt.« Manchmal widersprechen ihm Slobodan und Josef. Ali möchte unbedingt Psychologie studieren.",
    "Melissa vergisst beim Lernen die Zeit und fühlt sich dabei »beflügelt«."
  ];
  E.fallHTML = function (titel) {
    return '<details class="k-hilfe"><summary>' + (titel || "Den ganzen Fall lesen") + '</summary><p><span class="k-pille">ausgedachter Fall</span></p>' + E.FALL.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</details>";
  };

  /* Selbsttest M1 aus dem Unterrichtsmaterial (sprachlich geglättet). Gruppe: a = Selbstbestimmung, v = Vorgaben,
     k = Kompetenz (es schaffen), n = es nicht schaffen, s = soziale Eingebundenheit, e = allein. Wird erst ab Stunde 2 ausgewertet. */
  E.M1 = [
    ["ich mir die Aufgaben selbst einteilen kann", "a"], ["ich mir die Zeit selbst einteilen kann", "a"], ["ich klare Zeitvorgaben habe", "v"],
    ["ich das Gefühl habe, dass ich es schaffen kann", "k"], ["ich mit anderen zusammenarbeite", "s"], ["ich mich zu einem Team zähle", "s"],
    ["ich aussuchen kann, welche Lerninhalte mich interessieren", "a"], ["mir vorgegeben wird, wie ich den Lerninhalt bearbeiten muss", "v"],
    ["mir Lerninhalte vorgegeben werden", "v"], ["ich aussuche, wo ich lerne", "a"], ["mein Lernort vorgegeben ist", "v"], ["ich alleine lerne", "e"],
    ["ich meine Lernumgebung schön eingerichtet habe", "a"], ["ich in eine fertige Lernumgebung komme", "v"], ["ich aussuche, welche Themen ich lernen will", "a"],
    ["ich einbezogen werde, wann und wie Prüfungen sind", "a"], ["mir Prüfungsformate vorgegeben sind", "v"], ["ich das Gefühl habe, dass ich es kann", "k"],
    ["ich das Gefühl habe, dass ich es nicht kann", "n"], ["ich das Gefühl habe, dass ich es nicht schaffen kann", "n"],
    ["ich aussuchen kann, wie ich die Lerninhalte bearbeite (Mindmap, Plakat …)", "a"]
  ];

  /* Für Stunde 1: Verbindung zum Block Wahrnehmung */
  E.WAHRNEHMUNG = [
    ["w-selektiv", "selektive Wahrnehmung"], ["w-erwartung", "Erwartungen prägen die Wahrnehmung"], ["w-aufmerksamkeit", "Aufmerksamkeit"],
    ["w-schema", "Schema"], ["w-andere", "Einfluss anderer (Konformität)"]
  ];
  E.ARTEN = ["erklärt", "beeinflusst", "ist ein Beispiel für", "ist das Gegenteil von", "baut auf"];

  /* Eine Geschichte je Inhalt (Fassung 2.2, 28.11.2026). Nur Geschichten, deren Handlung gesichert ist: im Kurs aus dem Buch
     vorgelesen (Kreis, Frösche, Elefant) oder in dieser Fassung an einer zweiten Quelle bestätigt (Linsen, Die taube Ehefrau,
     Der wahre Wert des Rings). Die Einheitsseite zeigt nur Zeilen begonnener Stunden – sonst verriete sie spätere Aufgaben. */
  E.JE_INHALT = [
    { ds: "ds06", geschichte: "Der Kreis der 99", inhalt: "intrinsische und extrinsische Motivation" },
    { ds: "ds07", geschichte: "Linsen", inhalt: "Kontinuum der Regulation (Theorie der organismischen Integration)" },
    { ds: "ds07", geschichte: "Der Kreis der 99", inhalt: "Unterminierungseffekt und Selbstbestimmung" },
    { ds: "ds08", geschichte: "Die Frösche in der Sahne", inhalt: "Erwartung mal Wert" },
    { ds: "ds09", geschichte: "Die taube Ehefrau", inhalt: "internal oder external" },
    { ds: "ds09", geschichte: "Der angekettete Elefant", inhalt: "erlernte Hilflosigkeit" },
    { ds: "ds10", geschichte: "Der wahre Wert des Rings", inhalt: "Vergleiche und Bezugsrahmen" },
    { ds: "ds10", geschichte: "Der angekettete Elefant", inhalt: "Fähigkeitsselbstkonzept und Selbstwirksamkeit" },
    { ds: "ds11", geschichte: "Die Frösche in der Sahne", inhalt: "Einzelfall oder Befund" }
  ];
  E.inhaltVon = function (geschichte, ds) {
    var r = ""; E.JE_INHALT.forEach(function (z) { if (z.ds === ds && z.geschichte === geschichte) r = z.inhalt; }); return r;
  };

  /* Zwei Sprachen: Bucays Bilder in eigenen Worten → Fachsprache. id = Wahl-Aufgabe in der Stunde.
     Reihenfolge je Stunde wie im Ablauf der Stunde (die Tabellen gruppieren nach Geschichte und Stunde). */
  E.BILDER = [
    { id: "k1", kurz: "fröhlich ohne Lohn", ds: "ds06", geschichte: "Der Kreis der 99", bild: "Der Diener ist fröhlich bei der Arbeit, obwohl ihm niemand etwas dafür versprochen hat.", fach: "intrinsische Motivation" },
    { id: "k2", kurz: "die fehlende Münze", ds: "ds06", geschichte: "Der Kreis der 99", bild: "Die eine Münze, die zum Hundert fehlt.", fach: "extrinsischer Anreiz: Ziel außerhalb der Handlung" },
    { id: "k3", kurz: "mehr Arbeit, keine Freude", ds: "ds06", geschichte: "Der Kreis der 99", bild: "Der Diener arbeitet mehr als je zuvor – und die Freude ist weg.", fach: "Wechsel der Motivationsform; Intensität steigt, Freude sinkt" },
    { id: "li1", kurz: "schmeichelt für ein bequemes Leben", ds: "ds07", geschichte: "Linsen", bild: "Der Höfling schmeichelt dem König und lebt dafür bequem am Hof.", fach: "externale Regulation: Er tut es für einen Lohn von außen" },
    { id: "li2", kurz: "lieber Linsen", ds: "ds07", geschichte: "Linsen", bild: "Diogenes isst lieber einfache Linsen, als dem König zu schmeicheln.", fach: "selbstbestimmt (identifiziert oder integriert): Die Linsen sind Mittel zum Zweck, aber der Zweck – frei bleiben – gehört zu ihm" },
    { id: "k4", kurz: "keine Ruhe mehr", ds: "ds07", geschichte: "Der Kreis der 99", bild: "Der Diener kommt nicht mehr zur Ruhe, bis die fehlende Münze da ist.", fach: "introjizierte Regulation: innerer Druck, der nicht zu ihm gehört" },
    { id: "k5", kurz: "Geschenk, kein Lohn", ds: "ds07", geschichte: "Der Kreis der 99", bild: "Die Münzen waren ein Geschenk, kein Lohn für seine Arbeit.", fach: "Unterminierungseffekt – nur teilweise: keine Belohnung für das Tun" },
    { id: "k6", kurz: "singt bei der Arbeit", ds: "ds07", geschichte: "Der Kreis der 99", bild: "Am Anfang singt der Diener bei der Arbeit.", fach: "Selbstbestimmung geht verloren" },
    { id: "fr1", kurz: "erster Frosch hört auf", ds: "ds08", geschichte: "Die Frösche in der Sahne", bild: "Der erste Frosch fragt, welchen Sinn es hat, sich für eine aussichtslose Sache abzustrampeln – und hört auf.", fach: "Erwartung null, Wert hoch: Erwartung × Wert = 0" },
    { id: "fr2", kurz: "zweiter strampelt weiter", ds: "ds08", geschichte: "Die Frösche in der Sahne", bild: "Auch der zweite Frosch hält die Lage für aussichtslos – und strampelt trotzdem weiter.", fach: "umstritten: Weiterkämpfen als eigener Wert – oder Grenze des Modells" },
    { id: "fr3", kurz: "Butter – er springt heraus", ds: "ds08", geschichte: "Die Frösche in der Sahne", bild: "Aus der Sahne wird Butter – der zweite Frosch springt heraus.", fach: "Erfolg wirkt zurück: Erwartung und Anspruchsniveau steigen" },
    { id: "te1", kurz: "sie hört schlecht", ds: "ds09", geschichte: "Die taube Ehefrau", bild: "Der Mann ist überzeugt: Seine Frau hört immer schlechter.", fach: "externale Attribution: Er sucht die Ursache bei ihr" },
    { id: "te2", kurz: "er hört schlecht", ds: "ds09", geschichte: "Die taube Ehefrau", bild: "Sie hat ihm jedes Mal geantwortet. Schlecht hört er selbst.", fach: "Eine Attribution ist eine subjektive Erklärung und kann falsch sein: Die Ursache liegt bei ihm (internal)" },
    { id: "el1", kurz: "zerrt vergeblich", ds: "ds09", geschichte: "Der angekettete Elefant", bild: "Der kleine Elefant zerrt tagelang am Pflock – vergeblich. Eines Tages gibt er auf.", fach: "erlernte Hilflosigkeit entsteht: Handeln bewirkt nichts" },
    { id: "el2", kurz: "versucht es nicht mehr", ds: "ds09", geschichte: "Der angekettete Elefant", bild: "Der große Elefant könnte den Pflock mühelos herausreißen. Er versucht es nicht.", fach: "erlernte Hilflosigkeit zeigt sich: alte Erfahrung, neue Lage" },
    { id: "el3", kurz: "glaubt, er kann nicht", ds: "ds09", geschichte: "Der angekettete Elefant", bild: "Er glaubt, dass er es nicht kann – weil er es damals nicht konnte.", fach: "ungünstige Attribution: internal, stabil, nicht kontrollierbar" },
    { id: "ri1", kurz: "Markt und Juwelier", ds: "ds10", geschichte: "Der wahre Wert des Rings", bild: "Der Markt bietet kaum etwas, der Juwelier viel mehr.", fach: "kriterialer Vergleich: fester Maßstab" },
    { id: "ri2", kurz: "wie der Ring", ds: "ds10", geschichte: "Der wahre Wert des Rings", bild: "Du bist wie der Ring: Nicht jeder erkennt deinen Wert.", fach: "Spiegel der anderen (Cooley)" },
    { id: "el4", kurz: "nie wieder geprüft", ds: "ds10", geschichte: "Der angekettete Elefant", bild: "Er hat seine Kraft nie wieder auf die Probe gestellt.", fach: "kein temporaler Vergleich: veraltetes Selbstkonzept" },
    { id: "el5", kurz: "noch einmal versuchen", ds: "ds10", geschichte: "Der angekettete Elefant", bild: "Ob man etwas kann, erfährt man nur, wenn man es noch einmal mit ganzem Herzen versucht.", fach: "Selbstwirksamkeit wächst durch eigene Erfolgserfahrung (Bandura)" },
    { id: "fr4", kurz: "nur einer erzählt", ds: "ds11", geschichte: "Die Frösche in der Sahne", bild: "Erzählt wird vom Frosch, der es geschafft hat.", fach: "Einzelfall: Wer kämpfte und unterging, erzählt keine Geschichte" }
  ];

  /* Merkseiten: je Stunde Kernsatz, höchstens sechs Begriffe, ein Denkwerkzeug, Abruf für die nächste Stunde */
  E.MERK = {
    ds06: {
      kernsatz: "Motiv und Motivation sieht man nicht. Man erkennt Motivation am Verhalten – daran, wofür sich jemand entscheidet, wie lange er dranbleibt und wie sehr er sich anstrengt. Ob ihr Wert in der Sache selbst liegt oder außerhalb, unterscheidet intrinsische und extrinsische Motivation. Wer Verhalten erklärt, nennt den Zielzustand und geht drei Schritte: Bedingung, Form, Merkmal.",
      begriffe: [
        ["Motiv", "was jemand dauerhaft mitbringt: eine Vorliebe für bestimmte Ziele, etwa etwas zu leisten oder dazuzugehören; man erschließt es aus dem Verhalten", "Josef möchte seinen Vater nicht enttäuschen."],
        ["Motivation", "was jetzt wirkt, wenn ein Motiv auf einen passenden Anreiz der Situation trifft; Definition: »Motivation ist die aktuelle Ausrichtung des momentanen Lebensvollzugs auf einen als positiv bewerteten Zielzustand.« Erklären heißt: Zielzustand nennen, dann Bedingung (Motiv trifft Anreiz), Form, Merkmal. Lernmotivation: Motivation, die sich auf das Lernen richtet", "Melissa setzt sich hin und lernt – jetzt."],
        ["Bedingungen", "beeinflussen, ob Motivation entsteht: Interesse, Selbstbestimmung, soziale Eingebundenheit, Vorwissen", "»Ich check es ohnehin nicht.«"],
        ["Verhaltensmerkmale", "Zielrichtung, Ausdauer, Intensität (auch: Verarbeitungstiefe)", "Josef fängt immer seltener an (Zielrichtung)."],
        ["intrinsisch", "um der Sache selbst willen; das Ziel liegt in der Handlung (Interesse, Neugier, Flow)", "Melissa vergisst beim Lernen die Zeit."],
        ["extrinsisch", "Mittel zum Zweck; das Ziel liegt außerhalb der Handlung (Belohnung, Note, Ärger vermeiden)", "Belohnung der Eltern; Alis Studienwunsch"]
      ],
      denkwerkzeug: ["Beschreiben – erklären – bewerten", "<b>Beschreiben:</b> Was kann ich beobachten? · <b>Erklären:</b> Welcher Grund könnte dahinterstehen? · <b>Bewerten:</b> Wie finde ich das? – Psychologie beginnt beim Beschreiben. »Faul« ist eine Bewertung, keine Erklärung."],
      abruf: ["Was ist der Unterschied zwischen Motiv und Motivation?", "Woran erkennt man Motivation von außen? Nenne drei Merkmale.", "Was hat sich beim Diener im Kreis der 99 verändert – in Fachsprache?", "Schreibe die Definition von Motivation aus dem Kopf auf."],
      quellen: "Unterrichtsmaterial M1–M3 · Deci &amp; Ryan (1993), Zeitschrift für Pädagogik 39 (2), 223–238 · Definition nach Rheinberg, Motivation (Wortlaut im Kurs: »aktuelle Ausrichtung …«; zitiert bei Hasselhorn &amp; Gold, Pädagogische Psychologie) · Csikszentmihalyi (1975)"
    },
    ds07: {
      kernsatz: "Intrinsische Motivation entsteht eher, wenn drei Grundbedürfnisse erfüllt sind. Auch extrinsische Motivation kann selbstbestimmt sein – je mehr der Grund zu mir selbst gehört.",
      begriffe: [
        ["Kompetenz", "sich beim Handeln als fähig erleben; Aufgaben weder zu leicht noch zu schwer (Harter 1978)", "Josef: »Ich check es ohnehin nicht.«"],
        ["Selbstbestimmung (Autonomie)", "erleben, dass man selbst entscheidet", "selbst wählen, wie man ein Thema bearbeitet"],
        ["soziale Eingebundenheit", "sich mit anderen verbunden fühlen", "Josefs kleine Gruppe"],
        ["Unterminierungseffekt", "eine erwartete, greifbare Belohnung für das Tun kann die Freude an einer Tätigkeit untergraben (Deci 1971); ehrliches Lob eher nicht", "Puzzeln für Geld"],
        ["Kontinuum der Regulation", "external – introjiziert – identifiziert – integriert: vier Formen extrinsischer Motivation, von fremd- zu selbstbestimmt", "Ali lernt für sein selbst gewähltes Studium (identifiziert)."],
        ["Internalisierung", "Werte und Regeln von außen werden zu eigenen; die Motivation rückt nach rechts", "Aus »weil die Eltern es wollen« wird »weil es mir wichtig ist«."]
      ],
      denkwerkzeug: ["Zusammenhang oder Ursache?", "Treten zwei Dinge zusammen auf (Korrelation), heißt das noch nicht, dass das eine das andere verursacht (Kausalität). Es kann umgekehrt sein, oder ein Drittes beeinflusst beides. Ursachen zeigt erst ein Experiment wie das von Deci."],
      abruf: ["Nenne die drei Grundbedürfnisse nach Deci und Ryan.", "Was ist der Unterschied zwischen introjiziert und identifiziert?", "Woran erkennt man Motivation von außen?"],
      quellen: "Unterrichtsmaterial M4–M5 · Deci &amp; Ryan (1993) · Deci (1971) · Deci, Koestner &amp; Ryan (1999), Psychological Bulletin 125 (6) · Harter (1978) · Wigfield u. a. (2006) · Jerusalem &amp; Schwarzer (1991) · Schaubild in Anlehnung an Deci &amp; Ryan (2002) · Jorge Bucay: Komm, ich erzähl dir eine Geschichte (Linsen, Der Kreis der 99); die Anekdote von Diogenes erzählt schon Diogenes Laertios (II 68)"
    },
    ds08: {
      kernsatz: "Ob ich mich anstrenge, hängt an zwei Fragen: Schaffe ich das? (Erwartung) und Was ist es mir wert? (Wert). Ist eine der Antworten »gar nicht«, bleibt die Motivation aus.",
      begriffe: [
        ["Anspruchsniveau", "das Ziel, an dem jemand seine Leistung misst; steigt meist nach Erfolg, sinkt nach Misserfolg (Hoppe 1930)", "Nach einer guten Note nimmt man sich oft mehr vor."],
        ["Leistungsmotiv", "eher Erfolg suchen (Hoffnung auf Erfolg) oder eher Misserfolg meiden (Furcht vor Misserfolg)", "Wer Misserfolg meidet, wählt oft sehr leichte oder sehr schwere Aufgaben."],
        ["Risikowahl (Atkinson)", "Antrieb = Erfolgswahrscheinlichkeit × Anreiz; für Erfolgsuchende am größten bei mittlerer Schwierigkeit", "ein Ziel »schwer, aber machbar«"],
        ["Erfolgserwartung", "Einschätzung, ob ich eine Aufgabe schaffe", "»Ich check es ohnehin nicht.« (Josef)"],
        ["Wert (Eccles und Wigfield)", "Wichtigkeit · Interesse · Nützlichkeit · Kosten", "»Mathe brauche ich für die Ausbildung.« (Nützlichkeit)"],
        ["Erwartung × Wert", "Motivation entsteht, wenn beides da ist; ist ein Faktor null, ist die Motivation null (vereinfacht)", "Die Belohnung hebt Josefs Wert – seine Erwartung bleibt klein."]
      ],
      denkwerkzeug: ["Ein Konstrukt messen", "Motivation sieht man nicht. Man macht sie messbar über etwas Beobachtbares – zum Beispiel die gewählte Entfernung im Zielspiel – oder über Fragen wie im Selbsttest. Jede Messung erfasst nur einen Ausschnitt: Die Wahl im Spiel ist nicht »die« Motivation eines Menschen."],
      abruf: ["Was ist das Anspruchsniveau, und wie verändert es sich nach Erfolg?", "Erwartung mal Wert: Was passiert, wenn die Erwartung null ist?", "Nenne die vier Wertkomponenten nach Eccles und Wigfield."],
      quellen: "Unterrichtsmaterial M6 · Hoppe (1930), Psychologische Forschung 14 · Atkinson (1957), Psychological Review 64 · Atkinson &amp; Litwin (1960) · Wigfield &amp; Eccles (2000), Contemporary Educational Psychology 25, 68–81 · Nagengast u. a. (2011), Psychological Science 22"
    },
    ds09: {
      kernsatz: "Wie ich mir ein Ergebnis erkläre, bestimmt, was ich beim nächsten Mal erwarte. Günstig nach einem Misserfolg ist eine Ursache, die sich ändern lässt – zum Beispiel Anstrengung oder der Lernweg.",
      begriffe: [
        ["Attribution", "Ursachenzuschreibung: wie Menschen sich ein Ergebnis erklären – subjektiv erlebt, nicht objektiv", "»Das war einfach Pech.« (Ali)"],
        ["internal – external", "Liegt die Ursache in mir oder außerhalb? (Heider)", "Begabung, Anstrengung – Aufgabenschwierigkeit, Glück"],
        ["stabil – instabil", "Bleibt die Ursache, oder ändert sie sich?", "Begabung bleibt, Anstrengung ändert sich."],
        ["kontrollierbar – nicht kontrollierbar", "Kann ich die Ursache beeinflussen?", "Wissen, Anstrengung, Nachhilfe – Begabung, Glück"],
        ["günstiges Attributionsmuster", "Erfolg: eigene Fähigkeit und Anstrengung · Misserfolg: instabil und kontrollierbar (Anstrengung, Lernweg)", "»Ich habe falsch geübt – nächstes Mal rechne ich alte Arbeiten.«"],
        ["erlernte Hilflosigkeit", "Wer erlebt, dass sein Handeln nichts bewirkt, versucht es später oft nicht mehr – es fehlt die Erwartung, etwas bewirken zu können (Seligman; neu gedeutet von Maier &amp; Seligman 2016)", "der große Elefant am kleinen Pflock"]
      ],
      denkwerkzeug: ["Prognose: Was sagt eine Theorie voraus?", "Eine gute Theorie erklärt nicht nur hinterher, sie sagt vorher, was passiert – und lässt sich daran prüfen. Die Attributionstheorie sagt voraus: Wer einen Misserfolg stabil erklärt, erwartet wieder Misserfolg und strengt sich weniger an."],
      abruf: ["Nenne die drei Fragen, die die Attributionstheorie an eine Erklärung stellt.", "Welche Erklärung eines Misserfolgs ist für die Motivation günstig – und warum?", "Was hat der Elefant gelernt – in Fachsprache?"],
      quellen: "Unterrichtsmaterial M7 · Weiner (1985), Psychological Review 92 · Heider (1958) · Hasselhorn &amp; Gold (2013) · Seligman &amp; Maier (1967), Journal of Experimental Psychology 74 · Maier &amp; Seligman (2016), Psychological Review 123 · Jorge Bucay: Komm, ich erzähl dir eine Geschichte (Die taube Ehefrau, Der angekettete Elefant)"
    },
    ds10: {
      kernsatz: "Das Bild von meinen Fähigkeiten entsteht im Vergleich – mit anderen, mit mir früher, zwischen Fächern. Es bestimmt mit, was ich mir zutraue, und wirkt auf meine Leistung zurück.",
      begriffe: [
        ["Fähigkeitsselbstkonzept", "Bild von den eigenen Fähigkeiten in einem Bereich; entsteht aus Rückmeldungen und Vergleichen", "»In Mathe bin ich schwach.«"],
        ["I und Me (James)", "»I«: das betrachtende Ich, das denkt und handelt · »Me«: das betrachtete Ich – das Selbstkonzept", "Ich (I) denke darüber nach, wie ich (Me) in Mathe bin."],
        ["Vergleiche", "sozial (mit anderen) · temporal (mit mir früher) · dimensional (Fach mit Fach) · kriterial (mit festem Maßstab)", "»In Deutsch bin ich besser als in Mathe.« (dimensional)"],
        ["Fischteicheffekt", "bei gleicher Leistung niedrigeres Selbstkonzept in einer leistungsstarken Gruppe (Marsh 1987)", "Josef nach dem Wechsel von der Realschule"],
        ["Skill-Development und Self-Enhancement", "Leistung formt das Selbstkonzept – und das Selbstkonzept formt die Leistung: Beides wirkt wechselseitig (reziprok)", "kleine Erfolge → mehr Zutrauen → mehr Lernen"],
        ["Selbstwirksamkeitserwartung", "Zutrauen, eine Handlung selbst ausführen zu können; Quellen: eigene Erfolge (am stärksten), Vorbilder, Zuspruch, Körper und Gefühl (Bandura 1977)", "Josef löst drei Aufgaben hintereinander richtig."]
      ],
      denkwerkzeug: ["Bezugsrahmen prüfen", "Ein Ergebnis bedeutet erst im Vergleich etwas: Eine 3 ist in einer starken Klasse etwas anderes als in einer schwachen. Frage bei jeder Zahl, jeder Note, jedem Selbstbild: Verglichen womit?"],
      abruf: ["Was besagt der Fischteicheffekt?", "Nenne zwei Arten von Vergleichen, aus denen das Selbstkonzept entsteht – mit Beispiel.", "Welche Quelle der Selbstwirksamkeit wirkt am stärksten?"],
      quellen: "Unterrichtsmaterial M8, M9 und »Das Selbstkonzept« · Marsh (1987), Journal of Educational Psychology 79 (3), 280–295 · Helmke (1998) · Wigfield &amp; Eccles (2000) · Bandura (1977), Psychological Review 84"
    },
    ds11: {
      kernsatz: "Zwischen Wollen und Tun liegt eine Entscheidung – danach hilft ein Plan. Geschichten erzählen Einzelfälle; die Psychologie prüft, ob ihre Botschaft für viele gilt.",
      begriffe: [
        ["Rubikon-Modell", "vier Phasen: abwägen – planen – handeln – bewerten; die Entscheidung (der Rubikon) trennt das Ob vom Wie (Heckhausen &amp; Gollwitzer 1987)", "Josef entscheidet sich für Nachhilfe."],
        ["Motivation und Volition", "Motivation: abwägen, ob ich etwas will · Volition: den Willen umsetzen und dranbleiben", "das Handy stumm schalten, als eine Nachricht kommt"],
        ["Wenn-dann-Plan (Vorsatz)", "verknüpft eine Situation mit einer Handlung; hilft im Durchschnitt deutlich, Ziele zu erreichen – belegt in vielen Studien (Gollwitzer &amp; Sheeran 2006)", "»Wenn ich nach Hause komme, packe ich zuerst das Matheheft aus.«"],
        ["Loslassen unerreichbarer Ziele", "sich von einem unerreichbaren Ziel lösen und ein neues suchen; geht mit mehr Wohlbefinden einher (Wrosch u. a. 2003)", "nach drei Absagen ein anderes Studienfach prüfen"],
        ["Analyse einer Geschichte", "Bild finden → Station im Kreis → Fachbegriff → Botschaft → mit Forschung prüfen", "der Elefant: erlernte Hilflosigkeit"]
      ],
      denkwerkzeug: ["Einzelfall oder Befund?", "Eine Geschichte erzählt einen Fall – meist den, der gut ausging. Wer genauso kämpfte und scheiterte, erzählt keine Geschichte. Eine Regel wie »Wer kämpft, schafft alles« braucht Befunde aus vielen Fällen."],
      abruf: ["Nenne die vier Phasen des Rubikon-Modells.", "Formuliere einen Wenn-dann-Plan für dein Lernen.", "Was fehlt, wenn man aus einer Geschichte eine Regel ableitet?"],
      quellen: "Heckhausen &amp; Gollwitzer (1987), Motivation and Emotion 11 · Gollwitzer &amp; Sheeran (2006), Advances in Experimental Social Psychology 38 · Wrosch u. a. (2003), Personality and Social Psychology Bulletin 29 · Jorge Bucay: Komm, ich erzähl dir eine Geschichte"
    }
  };

  /* Das muss ich für die Klassenarbeit können – vier Aufgabentypen */
  E.KOENNEN = [
    { typ: "Erklären", text: "einen Begriff, ein Modell oder einen Befund in eigenen Worten mit Beispiel darstellen", ziele: [
      "Motiv, Motivation und Lernmotivation erklären", "die drei Grundbedürfnisse und das Kontinuum der Regulation erklären", "den Unterminierungseffekt mit seinen Bedingungen erklären",
      "Anspruchsniveau, Risikowahl und das Erwartungs-Wert-Modell (Erwartung mal Wert) erklären", "Attribution und erlernte Hilflosigkeit erklären", "Selbstkonzept, Vergleiche, Fischteicheffekt und Selbstwirksamkeit erklären", "das Rubikon-Modell und Wenn-dann-Pläne erklären", "die Definition von Motivation im Wortlaut nennen und ihre drei Teile erklären"] },
    { typ: "Anwenden", text: "einen Fall oder eine unbekannte Geschichte mit Fachbegriffen deuten", ziele: [
      "Bedingungen, Formen und Verhaltensmerkmale in einem Fall unterscheiden", "Gründe auf dem Kontinuum einordnen", "Verhalten mit Erwartung mal Wert erklären", "ein günstiges Attributionsmuster formulieren und begründen", "ein Verhalten mit Zielzustand und dem Dreischritt Bedingung – Form – Merkmal erklären"] },
    { typ: "Auswerten", text: "ein kleines Ergebnis beschreiben und prüfen: Was zeigt es – und was nicht?", ziele: [
      "beschreiben, erklären und bewerten trennen", "Zusammenhang und Ursache unterscheiden", "sagen, was eine Messung erfasst und was nicht", "einen Einzelfall von einem Befund unterscheiden"] },
    { typ: "Stellung nehmen", text: "eine Behauptung oder die Botschaft einer Geschichte begründet beurteilen", ziele: [
      "eine Geschichte mit zwei Motivationstheorien analysieren", "zur Botschaft einer Geschichte begründet Stellung nehmen"] }
  ];
  return E;
})();
