/* Wiederholung Wahrnehmung: Merkkästen, Lernlandkarte, Zusammenfassung, Probeklausur, Lernkarten, Erwartungshorizont.
   Die Merkkästen auf der Seite und die Lernlandkarte im Druck kommen aus derselben Quelle (wortgleich). */
(function () {
  "use strict";
  var D = window.WDH, Q3 = window.FIGUREN_DS03 && window.FIGUREN_DS03.quiz, F4 = window.FIGUREN_DS04;
  function e(t) { return Lab.esc(t || ""); }
  function lines(n) { var s = ""; for (var i = 0; i < n; i++) s += '<div class="ln"></div>'; return s; }
  function mini(name, label) { return Q3 ? '<svg viewBox="0 0 400 300" role="img" aria-label="' + label + '">' + Q3[name]() + "</svg>" : ""; }

  var MERK = {
    grund:
      "<p><b>Wahrnehmung</b> ist der Prozess und das Ergebnis der Informationsgewinnung und -verarbeitung von Reizen aus der Umwelt (<b>Umweltreize</b>, z. B. Ampel, Musik) und dem Körperinneren (<b>Körperreize</b>, z. B. Schmerz, Hunger).</p>" +
      '<div class="prozess" role="img" aria-label="Ablauf: Reiz, Sinnesorgan, Weiterleitung, Gehirn, Wahrnehmung"><div><b>Reiz</b>Licht, Schall …</div><i>→</i><div><b>Sinnesorgan</b>Auge, Ohr …</div><i>→</i><div><b>Weiterleitung</b>über Nerven</div><i>→</i><div><b>Gehirn</b>auswählen · ordnen · ergänzen · deuten</div><i>→</i><div><b>Wahrnehmung</b>„Ich sehe …“</div></div>' +
      "<p><b>selektiv:</b> Wir nehmen nur einen Teil der Reize bewusst wahr – vor allem das, worauf sich unsere Aufmerksamkeit richtet. Flacker-Test (Rensink u. a. 1997); Tür-Studie (Simons & Levin 1998): Etwa die Hälfte bemerkte den Personenwechsel nicht.</p>" +
      "<p><b>subjektiv:</b> Dieselben Reize werden von verschiedenen Menschen unterschiedlich gedeutet.</p>" +
      '<table class="cmp"><tr><th>individuelle Faktoren</th><th>soziale Faktoren</th><th>sonstige Faktoren</th></tr><tr><td>Erfahrungen, Erwartungen, Bedürfnisse (Hunger, Müdigkeit), Gefühle und Stimmung, Interessen, Wissen, Einstellungen</td><td>Werte und Normen, Kultur, andere Personen und Gruppen (Familie, Freunde), Erwartungen anderer</td><td>Umwelt und Situation: Wetter, Hitze, Lärm, Licht, aktuelles Geschehen</td></tr></table>' +
      '<p class="merk">Einflussfaktoren entscheiden mit, was wir auswählen (selektiv) und wie wir es deuten (subjektiv).</p>',
    ordnen:
      "<p>Das Gehirn ordnet Reize nach <b>Gestaltgesetzen</b> (Gestaltpsychologie: Wertheimer, Köhler, Koffka) zu sinnvollen Ganzen.</p>" +
      '<div class="gestalt">' + [["naehe", "Nähe", "Was nah beieinander liegt, gehört zusammen."], ["aehnlichkeit", "Ähnlichkeit", "Was gleich aussieht, gehört zusammen."], ["geschlossenheit", "Geschlossenheit", "Lücken werden zu geschlossenen Formen ergänzt."], ["fortsetzung", "gute Fortsetzung (Kontinuität)", "Linien laufen möglichst glatt weiter."], ["schicksal", "gemeinsames Schicksal", "Was sich gemeinsam bewegt, gehört zusammen."], ["praegnanz", "Prägnanz", "Wir sehen die einfachste, klarste Form."], ["figurGrund", "Figur und Grund", "Wir trennen eine Figur vom Hintergrund; manchmal kippt das Bild."]].map(function (g) {
        return "<div>" + mini(g[0], g[1]) + "<b>" + g[1] + "</b>" + g[2] + "</div>"; }).join("") + "</div>" +
      "<p><b>Ergänzen:</b> bottom-up = vom Reiz aus · top-down = Vorwissen und Umgebung ergänzen den Reiz (Zeichen „B“ oder „13“, Bruner & Minturn 1955).</p>" +
      '<p class="merk">Wir sehen nicht Einzelteile, sondern Gestalten – das Gehirn ordnet und ergänzt.</p>',
    erwart:
      "<p><b>Hypothesentheorie</b> (Bruner & Postman): Jede Wahrnehmung beginnt mit einer <b>Erwartungshypothese</b>, ausgelöst von individuellen und sozialen Faktoren. Passen die Reize, wird sie bestätigt; passen sie nicht, wird eine schwache Erwartung verworfen – bei einer starken werden die Reize übersehen, umgedeutet oder abgewertet.</p>" +
      (F4 ? '<div class="fig900">' + F4.ablauf() + "</div>" : "") +
      "<p><b>Hypothesenstärke</b> – je stärker die Erwartung, (1) desto eher wird sie aktiviert, (2) desto weniger Informationen braucht sie zur Bestätigung, (3) desto mehr Gegeninformationen braucht es, um sie zu widerlegen. Stark wird eine Erwartung, wenn sie oft bestätigt wurde, andere sie teilen und man kaum andere Erklärungen kennt.</p>" +
      '<table class="cmp"><tr><th></th><th>Primacy-Effekt</th><th>selbsterfüllende Prophezeiung</th></tr>' +
      "<tr><td><b>Was passiert</b></td><td>Die ersten Informationen über eine Person bilden einen Rahmen; spätere werden passend gedeutet.</td><td>Eine Erwartung verändert das Verhalten – dadurch tritt ein, was erwartet wurde.</td></tr>" +
      "<tr><td><b>Studie</b></td><td>Asch (1946), Wortlisten: „intelligent“ am Anfang → die Person wirkt fähiger.</td><td>Rosenthal & Jacobson (1968), „Rosenthal-Effekt“: Ausgeloste „Aufblüher“ legten stärker zu, vor allem in Klasse 1 und 2. Vermutlich wurden sie stärker gefördert, Fortschritte deutlicher gelobt, man reagierte geduldiger.</td></tr>" +
      "<tr><td><b>Gut zu wissen</b></td><td>Bei echtem Verhalten fand sich kein Primacy-Effekt (Wiedenroth u. a. 2020).</td><td>Der Effekt ist meist klein (Jussim & Harber 2005).</td></tr></table>" +
      '<p class="merk">Beim Primacy-Effekt verändert die Erwartung unser Urteil, bei der selbsterfüllenden Prophezeiung das Verhalten – und damit das Ergebnis.</p>',
    andere:
      "<p><b>Konformität:</b> sein Urteil oder Verhalten an eine Gruppe anpassen. <b>Asch (1951, 1956):</b> Eine echte Versuchsperson saß mit sechs bis acht Eingeweihten am Tisch; alle nannten laut die gleich lange Linie, in 12 von 18 Durchgängen nannten die Eingeweihten absichtlich eine falsche. Allein: unter 1 % Fehler. Mit falscher Mehrheit folgte etwa jede dritte Antwort der Gruppe; drei von vier Personen gingen mindestens einmal mit, jede vierte nie; zwei Drittel der Antworten blieben richtig. Im Interview sahen nur wenige die Linien wirklich anders; viele zweifelten an ihrem Urteil; andere wollten nicht auffallen.</p>" +
      '<table class="cmp"><tr><th>informativer Einfluss</th><th>normativer Einfluss</th></tr><tr><td>„Die anderen wissen es vielleicht besser.“ Stark bei unklaren Aufgaben; oft ändert sich die Überzeugung (Sherif 1935: Lichtpunkt im Dunkeln).</td><td>„Ich will nicht auffallen.“ Stark, wenn die Gruppe die Antwort hört; oft ändert sich nur die Antwort nach außen.</td></tr></table>' +
      "<p><b>Weniger Anpassung:</b> schon ein Verbündeter (auf etwa ein Viertel des Werts) · geheime Antwort (≈ 12,5 %) · Mehrheit aus nur einer Person (≈ 3 %); mehr als drei Personen erhöhen kaum noch.</p>" +
      "<p><b>Halo-Effekt:</b> Ein auffälliges Merkmal (Aussehen, Lächeln) färbt auf ganz andere Eigenschaften ab (Thorndike 1920). <b>Vorurteil:</b> starres, verallgemeinerndes Urteil über Menschen, nur weil sie zu einer Gruppe gehören – eine besonders starke, geteilte Erwartung; Gegenbeispiele werden umgedeutet.</p>" +
      '<p class="merk">Andere verändern, was wir sagen – und bei Unsicherheit auch, was wir glauben.</p>',
    denk:
      '<table class="cmp"><tr><td><b>Beobachtung oder Deutung?</b> (DS 2)</td><td>Eine Beobachtung beschreibt, was gemessen oder gesehen wurde. Eine Deutung erklärt oder verallgemeinert.</td></tr>' +
      "<tr><td><b>Einzelfall oder Befund?</b> (DS 4)</td><td>Unser Kursergebnis beschreibt, was bei uns passiert ist. Ein Befund beruht auf vielen Personen und wurde wiederholt bestätigt.</td></tr>" +
      "<tr><td><b>Demo oder Studie?</b> (DS 5)</td><td>Eine Demo zeigt anschaulich, wie etwas wirken kann; eine Studie zeigt, wie stark und unter welchen Bedingungen. Täuschung nur, wenn sie harmlos und nötig ist und danach aufgeklärt wird.</td></tr></table>"
  };

  function landkarte() {
    var titel = {}; D.runden.forEach(function (r) { titel[r.id] = r.titel; });
    return '<div class="pg ue lm"><div class="ph"><span>Psychologie J2 · Wiederholung Wahrnehmung</span><span>Lernlandkarte · 2 Seiten</span></div><h1>Lernlandkarte · Wahrnehmung</h1>' +
      '<p class="kern">Wir nehmen die Welt nicht ab, wie sie ist: Das Gehirn wählt aus, ordnet, ergänzt und deutet – gelenkt von Erwartungen und von anderen Menschen.</p>' +
      '<p class="status" style="margin:0 0 3pt">Alle Personen in Beispielen und Fällen sind ausgedacht. Schaubilder sind vereinfachte Modelle. Zahlen zu Asch nach Lehrbuch-Sekundärquellen.</p>' +
      "<h2>" + titel.grund + "</h2>" + MERK.grund + "<h2>" + titel.ordnen + "</h2>" + MERK.ordnen +
      "<h2>" + titel.erwart + "</h2>" + MERK.erwart + "<h2>" + titel.andere + "</h2>" + MERK.andere + "<h2>5 · Denkwerkzeuge</h2>" + MERK.denk + "</div>";
  }

  function alleFragen() { var a = []; D.runden.forEach(function (r) { r.fragen.forEach(function (f) { a.push({ r: r, f: f }); }); }); return a; }
  function nochmal(s) {
    return alleFragen().filter(function (x) { var o = (s.q || {})[x.f.id]; return o === undefined || x.f.opt[o][1] !== "ok"; }).map(function (x) { return x.f.thema + ((s.q || {})[x.f.id] === undefined ? " (noch nicht beantwortet)" : ""); });
  }
  var WORT = { zentral: "zentral", begruendbar: "auch begründbar", kaum: "passt kaum" };
  var SELW = ["erfüllt", "teilweise", "noch nicht"];

  function ergebnisse(s, leer) {
    var h = '<div class="pg"><div class="ph"><span>Wiederholung Wahrnehmung · Meine Ergebnisse</span><span>Seite 3 von 4</span></div>';
    h += '<h2 style="margin-top:0">1 · Aus dem Kopf</h2><div class="scn avoid"><div class="erg-txt" style="color:#1e4fb5">' + (leer || !s.kopf ? lines(3) : e(s.kopf)) + "</div></div>";
    h += '<h2>2 · Die vier Bereiche</h2><table class="mine-p erg avoid"><tr><th>Bereich</th><td><b>sicher gewusst</b></td><td><b>noch einmal ansehen</b></td></tr>';
    D.runden.forEach(function (r) {
      var q = s.q || {}, ok = r.fragen.filter(function (f) { return q[f.id] !== undefined && f.opt[q[f.id]][1] === "ok"; }).length;
      var no = r.fragen.filter(function (f) { return q[f.id] === undefined || f.opt[q[f.id]][1] !== "ok"; }).map(function (f) { return f.thema; });
      h += "<tr><th>" + e(r.titel) + "</th><td style=\"width:24mm\">" + (leer ? "___ von " + r.fragen.length : ok + " von " + r.fragen.length) + "</td><td>" + (leer ? "" : no.length ? e(no.join(" · ")) : "–") + "</td></tr>";
    });
    h += "</table>";
    h += '<h2>3 · Fall Ferienjob – meine Zuordnungen</h2><table class="mine-p erg avoid"><tr><th>Situation</th><td><b>Meine Wahl und Begründung</b></td><td><b>Rückmeldung</b></td></tr>';
    D.fall.forEach(function (z) { var a = (s.zu || {})[z.id], o = a ? z.opt[a.o] : null; h += '<tr><th style="width:56mm">' + e(z.text) + '</th><td class="ich" style="color:#1e4fb5">' + (leer || !a ? "" : "<b>" + e(o[0]) + "</b> – " + e(a.g)) + "</td><td>" + (leer || !a ? "" : WORT[o[1]] + ": " + e(o[2])) + "</td></tr>"; });
    h += "</table></div>";
    h += '<div class="pg"><div class="ph"><span>Wiederholung Wahrnehmung · Meine Ergebnisse</span><span>Seite 4 von 4</span></div>';
    [["fall", "4 · Fallaufgabe: Einflussfaktoren, selektiv und subjektiv", D.rasterFall, 5], ["disk", "5 · Diskussion: „" + D.diskThese + "“", D.rasterDisk, 9]].forEach(function (x, k) {
      var sel = (s.sel || {})[x[0]] || [];
      h += "<h2" + (k ? "" : ' style="margin-top:0"') + ">" + x[1] + '</h2><div class="scn avoid"><div class="erg-txt" style="color:#1e4fb5">' + (leer || !s[x[0]] ? lines(x[3]) : e(s[x[0]])) + '</div><p style="font-size:9pt;margin:4pt 0 0">Selbsteinschätzung: ' + x[2].map(function (r, i) { return r[0] + " – " + (leer || sel[i] === undefined ? "____" : SELW[sel[i]]); }).join(" · ") + "</p></div>";
    });
    h += '<h2>6 · Mein Plan bis zur Klassenarbeit</h2><table class="mine-p avoid"><tr><th>Diese Themen wiederhole ich</th><td>' + lines(2) + "</td></tr><tr><th>So übe ich</th><td>○ Probeklausur schreiben (90 Min.) ○ Lernkarten abfragen ○ Lernlandkarte erklären ○ " + "_______________</td></tr></table></div>";
    return h;
  }

  function probe() {
    function A(nr, pt, html) { return '<div class="ka-auf"><p><b>Aufgabe ' + nr + ".</b> " + html + ' <span class="pt">(' + pt + " Punkte)</span></p></div>"; }
    return '<div class="pg"><div class="ka-kopf"><h1>Probeklausur · Wahrnehmung</h1><span>Psychologie J2 · zur Vorbereitung auf die Klassenarbeit</span><span>Zeit: 90 Minuten</span><span>Name: ______________________</span><span>Punkte: ____ / 40</span></div>' +
      A(1, 3, "Erläutern Sie den Begriff Wahrnehmung. Unterscheiden Sie dabei Umwelt- und Körperreize und verdeutlichen Sie den Wahrnehmungsprozess an einem eigenen Beispiel.") +
      '<div class="ka-auf"><p><b>Aufgabe 2.</b> Ordnen Sie den beiden Situationen je ein Gestaltgesetz zu und erklären Sie das jeweilige Prinzip. <span class="pt">(2 Punkte)</span></p><div class="fall">a) Auf einem Wanderschild sind alle Wege einer Tour mit einem roten Punkt markiert; man erkennt sofort, welche Wege zusammengehören.<br>b) Auf einem Klassenfoto sieht man drei Grüppchen, weil die Personen jeweils dicht beieinanderstehen.</div><p>Wählen Sie ein weiteres Gestaltgesetz und veranschaulichen Sie es an einem eigenen Beispiel, das weder aus dem Unterricht noch aus diesen Wiederholungsmaterialien stammt. <span class="pt">(2 Punkte)</span></p></div>' +
      '<div class="ka-auf"><p><b>Aufgabe 3.</b> Eine Klasse kommt auf ihrer Abschlussfahrt am Abend in einem großen Bahnhof an.</p><div class="fall">Mehmet fotografiert in seiner Freizeit und hat seine neue Kamera dabei. Sophie hat seit zwei Tagen Heimweh und ist traurig. Lukas hat von Freunden gehört, in der Stadt werde ständig geklaut. Es ist Feierabendverkehr: voll, laut und hektisch. <i>(ausgedachter Fall)</i></div>' +
      '<p>a) Stellen Sie dar, worauf Mehmet und Lukas im Bahnhof vermutlich besonders achten. <span class="pt">(2 Punkte)</span></p><p>b) Erläutern Sie am Beispiel von Sophie, wie Einflussfaktoren dazu führen, dass Wahrnehmung selektiv und subjektiv ist. <span class="pt">(6 Punkte)</span></p></div>' +
      A(4, 8, "„Gegen eine Mehrheit kommt niemand an.“ Diskutieren Sie diese Aussage auf der Grundlage des Asch-Experiments.") +
      "</div>" +
      '<div class="pg"><div class="ph"><span>Probeklausur · Wahrnehmung</span><span>Seite 2 von 2</span></div>' +
      '<div class="ka-auf"><p><b>Aufgabe 5.</b></p><div class="fall">Frau Kern zieht in eine neue Wohnung. Eine Bekannte erzählt ihr, der Nachbar Herr Ott sei „total unfreundlich“. Auch ihr letzter Nachbar war unfreundlich. Als Herr Ott im Treppenhaus nicht grüßt, denkt sie: „Wusste ich’s doch.“ Dass er später ein Paket für sie annimmt, erklärt sie so: „Der ist doch nur neugierig.“ <i>(ausgedachter Fall)</i></div>' +
      '<p>Analysieren Sie die Wahrnehmung von Frau Kern mithilfe der Hypothesentheorie von Bruner und Postman. Erläutern Sie dabei die drei Aussagen zur Hypothesenstärke und beurteilen Sie, was nötig wäre, damit Frau Kern ihre Erwartung aufgibt. <span class="pt">(8 Punkte)</span></p></div>' +
      A(6, 9, "Eine Firma vergibt ihre Praktikumsplätze nach einem zehnminütigen Vorstellungsgespräch. Nehmen Sie Stellung zu diesem Verfahren. Beziehen Sie den Primacy-Effekt, den Halo-Effekt und die selbsterfüllende Prophezeiung ein und machen Sie einen begründeten Verbesserungsvorschlag.") +
      '<div class="opbox avoid"><b>Arbeitsaufträge verstehen</b> <span style="color:#545b6b">(orientiert an üblichen Operatorenlisten; im Zweifel gilt die Liste Ihrer Schule)</span><table>' +
      [["nennen", "aufzählen, ohne zu erklären"], ["zuordnen", "einen Sachverhalt einem Begriff oder Gesetz begründet zuweisen"], ["beschreiben", "einen Sachverhalt in eigenen Worten wiedergeben – noch ohne Gründe"], ["darstellen", "einen Zusammenhang geordnet wiedergeben, mit Fachbegriffen"], ["erklären", "Gründe und Ursachen mit einer Theorie nachvollziehbar machen"], ["erläutern", "erklären und an Beispielen verdeutlichen"], ["veranschaulichen", "an einem passenden Beispiel zeigen"], ["analysieren", "einen Fall mit Theorie und Fachbegriffen gezielt untersuchen"], ["beurteilen", "eine Frage mit Fachwissen begründet entscheiden"], ["diskutieren", "Argumente dafür und dagegen abwägen und zu einem begründeten Urteil kommen"], ["Stellung nehmen", "ein eigenes, mit Fachwissen begründetes Urteil formulieren"]].map(function (o) { return "<tr><td>" + o[0] + "</td><td>" + o[1] + "</td></tr>"; }).join("") + "</table></div>" +
      '<div class="opbox avoid" style="border-color:#b9871c"><b>Tipps für die Klassenarbeit</b><ul style="margin:2pt 0 0;padding-left:14pt"><li>Fachbegriff → Erklärung → Beispiel: In dieser Reihenfolge holen Sie die Punkte.</li><li>Bei Studien immer Aufbau und Ergebnis nennen – bei Asch beide Seiten.</li><li>Bei „diskutieren“: dafür, dagegen, begründetes Urteil. Ohne Urteil fehlt ein Teil.</li><li>„Eigenes Beispiel“ heißt: nicht das Beispiel aus dem Unterricht.</li></ul></div></div>';
  }

  function karten() {
    var K = [
      ["Wahrnehmung", "Prozess und Ergebnis der Informationsgewinnung und -verarbeitung von Reizen aus der Umwelt und dem Körperinneren", "Ich höre mein Lieblingslied und erkenne es sofort."],
      ["Umweltreiz / Körperreiz", "Reiz von außen / Reiz aus dem Körperinneren", "Ampel, Musik / Bauchschmerzen, Hunger"],
      ["selektiv", "Nur ein Teil der Reize wird bewusst wahrgenommen – vor allem das, worauf sich die Aufmerksamkeit richtet.", "Flacker-Test: Änderungen an Nebensachen werden spät entdeckt."],
      ["subjektiv", "Dieselben Reize werden von verschiedenen Menschen unterschiedlich gedeutet.", "Derselbe Film: spannend für die eine, langweilig für die andere."],
      ["individuelle Faktoren", "Einflüsse aus der Person selbst", "Erfahrungen, Bedürfnisse, Stimmung, Interessen"],
      ["soziale Faktoren", "Einflüsse von anderen Menschen, Gruppen und der Kultur", "Werte und Normen, was Freunde erzählen"],
      ["sonstige Faktoren", "Einflüsse von Umwelt und Situation", "Hitze, Lärm, Licht"],
      ["Gestaltgesetze", "Regeln, nach denen das Gehirn Reize zu sinnvollen Ganzen ordnet (Gestaltpsychologie)", "Nähe, Ähnlichkeit, Geschlossenheit …"],
      ["Gesetz der Nähe", "Was nah beieinander liegt, gehört zusammen.", "Grüppchen auf dem Schulhof"],
      ["Gesetz der Ähnlichkeit", "Was gleich aussieht, gehört zusammen.", "Packungen in derselben Farbe"],
      ["Gesetz der Geschlossenheit", "Lücken werden zu geschlossenen Formen ergänzt.", "Punkte im Kreis wirken wie ein Kreis."],
      ["gute Fortsetzung (Kontinuität)", "Linien laufen möglichst glatt weiter.", "zwei Linien, die sich kreuzen"],
      ["gemeinsames Schicksal", "Was sich gemeinsam bewegt, gehört zusammen.", "Vögel, die gemeinsam abdrehen"],
      ["Prägnanz", "Wir sehen die einfachste, klarste Form.", "zwei überlappende Kreise statt drei Einzelteile"],
      ["Figur und Grund", "Wir trennen eine Figur vom Hintergrund; manchmal kippt das Bild.", "Vase oder zwei Gesichter"],
      ["bottom-up / top-down", "vom Reiz aus / Vorwissen und Umgebung ergänzen den Reiz", "Zeichen „B“ oder „13“ je nach Umgebung"],
      ["Hypothesentheorie", "Jede Wahrnehmung beginnt mit einer Erwartung; Reize werden mit ihr verglichen (Bruner & Postman).", "Trickkarte: schwarzes Herz wird als „Pik“ gemeldet."],
      ["Erwartungshypothese", "Annahme, was man gleich wahrnehmen wird; ausgelöst von individuellen und sozialen Faktoren", "„Die Chefin ist streng.“"],
      ["Hypothesenstärke", "Je stärker: eher aktiviert, weniger Informationen zur Bestätigung, mehr Gegeninformationen zur Widerlegung", "Ein Blick reicht als „Beweis“."],
      ["Primacy-Effekt", "Die ersten Informationen über eine Person bilden den Rahmen für spätere (Asch 1946).", "Erst „hilfsbereit“, dann „unpünktlich“ – sie bleibt sympathisch."],
      ["selbsterfüllende Prophezeiung (Rosenthal-Effekt)", "Eine Erwartung verändert das Verhalten, sodass sie eintritt (Rosenthal & Jacobson 1968; meist kleiner Effekt).", "„Aufblüher“ werden stärker gefördert und legen stärker zu."],
      ["Konformität", "sein Urteil oder Verhalten an eine Gruppe anpassen (Asch 1951, 1956)", "etwa jede dritte Antwort folgte der falschen Mehrheit"],
      ["informativer Einfluss", "„Die anderen wissen es vielleicht besser.“ – stark bei Unsicherheit", "Sherif (1935): Lichtpunkt im Dunkeln"],
      ["normativer Einfluss", "„Ich will nicht auffallen.“ – stark, wenn die Gruppe zuhört", "Alle schicken „😂“, also ich auch."],
      ["Halo-Effekt", "Ein auffälliges Merkmal färbt auf ganz andere Eigenschaften ab (Thorndike 1920).", "schöne Schrift → bessere Note für den Inhalt"],
      ["Vorurteil", "starres, verallgemeinerndes Urteil über Menschen, nur weil sie zu einer Gruppe gehören", "„Gamer sind unsportlich.“"],
      ["Beobachtung / Deutung", "was gemessen oder gesehen wurde / Erklärung oder Verallgemeinerung", "„14 Sekunden im Schnitt“ / „Wir sind unaufmerksam“"],
      ["Einzelfall / Befund", "was bei uns passiert ist / beruht auf vielen Personen, wiederholt bestätigt", "unser Kurs / Asch-Wiederholungen"],
      ["Demo / Studie", "zeigt anschaulich, wie etwas wirken kann / zeigt, wie stark und wann", "unser Labor / Asch-Experiment"]
    ];
    function tab(rows) { return '<table class="lk"><tr><th>Begriff</th><th>Erklärung</th><th>Beispiel</th></tr>' + rows.map(function (r) { return "<tr><td>" + e(r[0]) + "</td><td>" + e(r[1]) + "</td><td>" + e(r[2]) + "</td></tr>"; }).join("") + "</table>"; }
    return '<div class="pg"><div class="ph"><span>Lernkarten · Wahrnehmung</span><span>Seite 1 von 2 · Begriffsspalte umknicken, erklären, aufdecken</span></div>' + tab(K.slice(0, 15)) + "</div>" +
      '<div class="pg"><div class="ph"><span>Lernkarten · Wahrnehmung</span><span>Seite 2 von 2</span></div>' + tab(K.slice(15)) + '<p class="status">Oder umgekehrt: Erklärung abdecken und aus dem Begriff erklären. Am besten mehrmals mit Abstand – nicht alles an einem Abend.</p></div>';
  }

  function eh() {
    function R(a, b, pt) { return "<tr><td>" + a + "</td><td>" + b + '</td><td class="c">' + pt + "</td></tr>"; }
    function H(t, pt) { return '<tr class="auf"><td colspan="2">' + t + '</td><td class="c">' + pt + "</td></tr>"; }
    return '<div class="pg loes"><div class="ph"><span>Erwartungshorizont zur Probeklausur · Wahrnehmung</span><span>Seite 1 von 2</span></div>' +
      '<table class="eh"><tr><th style="width:44mm">Teil</th><th>Erwartung</th><th class="c">Punkte</th></tr>' +
      H("Aufgabe 1 · Begriff Wahrnehmung (erläutern)", 3) +
      R("Definition", "Prozess und Ergebnis der Informationsgewinnung und -verarbeitung von Reizen aus der Umwelt und dem Körperinneren – beide Aspekte (Prozess und Ergebnis).", 1) +
      R("Umwelt- und Körperreize", "Unterschied mit je einem Beispiel (z. B. Ampel / Bauchschmerzen).", 1) +
      R("eigenes Beispiel am Prozess", "Reiz → Sinnesorgan → Weiterleitung über Nerven → Verarbeitung im Gehirn → Wahrnehmung, an einem selbst gewählten Beispiel.", 1) +
      H("Aufgabe 2 · Gestaltgesetze (zuordnen, erklären, veranschaulichen)", 4) +
      R("a) und b)", "a) Gesetz der Ähnlichkeit: Was gleich aussieht (rote Markierung), gehört zusammen. b) Gesetz der Nähe: Was nah beieinander liegt, gehört zusammen. Je Zuordnung mit richtiger Erklärung 1 Punkt.", "2 × 1") +
      R("weiteres Gesetz", "Prinzip richtig beschrieben (1) und eigenes, passendes Beispiel (1), z. B. gemeinsames Schicksal: Menschen, die an der Ampel bei Grün gleichzeitig losgehen · Geschlossenheit: ein Logo aus unterbrochenen Strichen wird als ein Kreis gesehen · gute Fortsetzung: zwei Kabel, die sich hinter dem Schreibtisch kreuzen · Prägnanz: ein Stapel Bücher wird als einfache Quaderform gesehen · Figur und Grund: Schrift hebt sich vom Plakat ab. Beispiele aus dem Unterricht oder diesen Materialien zählen nicht.", 2) +
      H("Aufgabe 3 · Fall Bahnhof", 8) +
      R("a) Mehmet und Lukas (darstellen)", "Mehmet: Motive, Licht, Perspektiven (Interesse) · Lukas: Gedränge, Taschen, Personen, die dicht vorbeigehen (was Freunde erzählt haben). Je 1 Punkt.", 2) +
      R("b) Begriffe", "Selektivität (Auswahl aus vielen Reizen) und Subjektivität (individuell gefärbte Deutung) richtig erklärt.", 2) +
      R("b) Einflussfaktoren", "Bei Sophie: Stimmung und Gefühl (Heimweh, Traurigkeit) als individuelle Faktoren benannt; Umwelt (Hektik, Lärm) als sonstiger Faktor möglich.", 2) +
      R("b) Verknüpfung am Fall", "Kette Faktor → Auswahl → Deutung, z. B. Sophie achtet auf Familien und Abschiede (selektiv) und erlebt den Bahnhof als fremd und kalt, wo andere Aufbruch sehen (subjektiv).", 2) +
      H("Aufgabe 4 · „Gegen eine Mehrheit kommt niemand an.“ (diskutieren)", 8) +
      R("Darstellung Asch", "Aufbau: echte Versuchsperson mit sechs bis acht Eingeweihten, Linienvergleich, laute Antworten, 12 von 18 Durchgängen falsch (1). Ergebnis mit beiden Seiten: allein unter 1 % Fehler; etwa jede dritte Antwort konform, drei von vier mindestens einmal, jede vierte nie, zwei Drittel richtig (2).", 3) +
      R("dafür", "Konformität schon bei eindeutiger Aufgabe; drei von vier gingen mindestens einmal mit; normativer Einfluss (nicht auffallen wollen) und informativer Einfluss (Zweifel am eigenen Urteil).", 2) +
      R("dagegen / Grenzen", "zwei Drittel der Antworten richtig, jede vierte Person nie angepasst; ein Verbündeter senkte die Anpassung auf etwa ein Viertel des Werts; geheime Antwort ≈ 12,5 %; gegenüber nur einer Person kaum Anpassung.", 2) +
      R("Urteil", "begründetes eigenes Urteil, z. B. „trifft nicht zu: Eine Mehrheit hat viel Einfluss, aber viele bleiben bei ihrem Urteil – vor allem, wenn sie nicht allein sind“.", 1) +
      "</table></div>" +
      '<div class="pg loes"><div class="ph"><span>Erwartungshorizont zur Probeklausur · Wahrnehmung</span><span>Seite 2 von 2</span></div><table class="eh"><tr><th style="width:44mm">Teil</th><th>Erwartung</th><th class="c">Punkte</th></tr>' +
      H("Aufgabe 5 · Hypothesentheorie am Fall Frau Kern (analysieren, erläutern, beurteilen)", 8) +
      R("Theorie", "Bruner & Postman: Jede Wahrnehmung beginnt mit einer oder mehreren Erwartungshypothesen, ausgelöst von individuellen und sozialen Faktoren; Reize werden verglichen, bestätigt oder – bei starker Erwartung – umgedeutet, übersehen, abgewertet.", 2) +
      R("Hypothesenstärke", "alle drei Aussagen: je stärker, desto eher aktiviert; desto weniger Informationen zur Bestätigung; desto mehr Gegeninformationen zur Widerlegung (je 1).", 3) +
      R("Analyse des Falls", "Erwartung „Herr Ott ist unfreundlich“ – sozial (Bekannte) und individuell (Erfahrung mit dem letzten Nachbarn) → stark; ein fehlender Gruß reicht als Bestätigung; das angenommene Paket wird umgedeutet („neugierig“).", 2) +
      R("Beurteilung", "Nötig wären viele und deutliche Gegeninformationen (z. B. wiederholt freundliches Verhalten) oder bewusstes Prüfen anderer Erklärungen (er hat sie nicht gesehen, war in Eile).", 1) +
      H("Aufgabe 6 · Praktikumsplätze nach zehn Minuten (Stellung nehmen)", 9) +
      R("Effekte erklärt", "Primacy-Effekt (erste Informationen bilden den Rahmen; Asch 1946), Halo-Effekt (ein Merkmal färbt ab; Thorndike 1920), selbsterfüllende Prophezeiung (Erwartung verändert Verhalten; Rosenthal & Jacobson 1968) – je 1.", 3) +
      R("Anwendung auf das Verfahren", "z. B. Nervosität in den ersten Minuten prägt das ganze Urteil; Aussehen oder Auftreten färbt auf „fleißig“ oder „klug“ ab; wer als schwach eingeschätzt wird, bekommt im Praktikum weniger Aufgaben und zeigt deshalb weniger.", 3) +
      R("Stellungnahme und Vorschlag", "begründetes Urteil (kurze Gespräche sind besonders anfällig; Effekte sind real, oft aber klein – bei echtem Verhalten fand sich kein Primacy-Effekt, Wiedenroth u. a. 2020) und begründeter Vorschlag, z. B. strukturierte Fragen für alle, mehrere Beurteilende, Arbeitsprobe, Entscheidung erst nach Abgleich mit Kriterien.", 3) +
      '<tr class="auf"><td colspan="2">Summe</td><td class="c">40</td></tr></table>' +
      '<p class="status">Darstellung und Fachsprache fließen in die Teilpunkte ein. Die Punkte sind ein Vorschlag; maßgeblich ist der Notenschlüssel der Lehrkraft.</p></div>';
  }

  function bauen(root, mode, st) {
    var h;
    if (mode === "probe") h = probe();
    else if (mode === "karten") h = karten();
    else if (mode === "eh") h = eh();
    else if (mode === "landkarte") h = landkarte();
    else { var s = mode === "beispiel" ? D.beispiel : st; h = landkarte() + (mode === "beispiel" ? "" : "") + ergebnisse(s, mode === "leer"); }
    root.innerHTML = h;
  }

  window.WDH_DRUCK = { merk: function (id) { return MERK[id] || ""; }, bauen: bauen, nochmal: nochmal };
})();
