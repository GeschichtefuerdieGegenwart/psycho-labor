/* Stunde 5 · Wer bin ich im Vergleich? – nach M8, M9 und dem Text »Das Selbstkonzept«, dazu Selbstwirksamkeit (Bandura).
   Korrektur gegenüber dem Text: »Me« ist das betrachtete Objekt, »I« das betrachtende Subjekt. */
(function () {
  "use strict";
  var E = window.EINHEIT;
  function bild(id) { var r = ""; E.BILDER.forEach(function (b) { if (b.id === id) r = b.bild; }); return r; }

  function teichBild() {
    var x0 = 70, x1 = 490, y0 = 260, yT = 30, gx = 300;
    function y(a, b, x) { return a + (b - a) * (x - x0) / (x1 - x0); }
    var ya = y(170, 66, gx), yb = y(232, 128, gx);
    return '<svg class="k-svg" viewBox="0 0 540 320" role="img" aria-label="Modell nach Marsh: Zwei ansteigende Linien. Je höher die eigene Leistung, desto höher das Fähigkeitsselbstkonzept. Die Linie für eine leistungsschwache Klasse liegt höher als die für eine leistungsstarke Klasse. Bei gleicher Leistung ist das Selbstkonzept in der schwachen Klasse höher.">' +
      '<path class="l-text" d="M' + x0 + " " + y0 + " H" + (x1 + 10) + " M" + x0 + " " + y0 + " V" + (yT - 6) + '"/>' +
      '<path class="l-kuli" d="M' + x0 + " 170 L" + x1 + ' 66"/><path class="l-oxid" d="M' + x0 + " 232 L" + x1 + ' 128"/>' +
      '<path class="l-leise" stroke-dasharray="5 5" d="M' + gx + " " + y0 + " V" + (ya - 8) + '"/>' +
      '<circle cx="' + gx + '" cy="' + ya + '" r="8" class="f-kuli"/><circle cx="' + gx + '" cy="' + yb + '" r="8" class="f-oxid"/>' +
      '<path class="l-kuli" d="M92 44 H126"/><text x="134" y="50">leistungsschwache Klasse</text>' +
      '<path class="l-oxid" d="M92 76 H126"/><text x="134" y="82">leistungsstarke Klasse</text>' +
      '<text x="' + gx + '" y="' + (y0 + 24) + '" text-anchor="middle" class="t-18">gleiche Leistung</text>' +
      '<text x="' + (x1 + 10) + '" y="' + (y0 + 50) + '" text-anchor="end" class="t-leise t-18">eigene Leistung →</text>' +
      '<text x="26" y="' + ((y0 + yT) / 2) + '" text-anchor="middle" transform="rotate(-90 26 ' + ((y0 + yT) / 2) + ')" class="t-leise t-18">Fähigkeitsselbstkonzept →</text></svg>';
  }

  window.STUNDE = {
    id: "ds10", minuten: 90, material: "nach M8, M9 und dem Text »Das Selbstkonzept«",
    frage: "Warum hält sich jemand in einer Klasse für schlecht – und in einer anderen für gut, mit derselben Leistung?",
    darum: "<p>Josef war an der Realschule gut in Mathe. Jetzt hält er sich für schlecht. Ist er schlechter geworden – oder nur sein Bild von sich? Heute untersuchst du, wie das Bild von den eigenen Fähigkeiten entsteht, warum es vom »Teich« abhängt und wie Zutrauen wachsen kann. Der Elefant kommt noch einmal vor.</p>",
    ziele: ["erklären, was ein Selbstkonzept ist und aus welchen Vergleichen es entsteht,", "den Fischteicheffekt erklären und auf Josef anwenden,", "die Quellen der Selbstwirksamkeit nennen und zu einer Behauptung Stellung nehmen."],
    auftraege: [
      { id: "a1", nr: "1", titel: "Erst erinnern", sozial: "allein, ohne Heft", min: 4, oeffnet: "offen", bloecke: [
        { typ: "abruf", min: 3, fragen: E.MERK.ds09.abruf, antworten: [
          "Wo liegt die Ursache (internal – external)? Bleibt sie (stabil – instabil)? Kann ich sie beeinflussen (kontrollierbar – nicht kontrollierbar)?",
          "Eine instabile, kontrollierbare Ursache – zum Beispiel Anstrengung oder der Lernweg. Dann bleibt die Erwartung erhalten, und Anstrengung lohnt sich.",
          "Dass sein Handeln nichts bewirkt: erlernte Hilflosigkeit."] }
      ] },
      { id: "a2", nr: "2", titel: "Vom Optimisten zum Realisten?", sozial: "allein, dann Plenum", min: 8, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p><b>Andreas Helmke</b> wollte wissen, wie sich das Bild von den eigenen Fähigkeiten bei Kindern entwickelt. Er bat Kinder, ihre Figur auf einer Treppe dorthin zu setzen, wo sie im Vergleich zu ihrer Klasse stehen. Ältere Kinder füllten Fragebögen aus. Dann verglich er ihre Einschätzung mit ihren tatsächlichen Leistungen.</p><p>Bevor du das Ergebnis erfährst: Was vermutest du?</p>" },
        { typ: "wahl", items: [
          { id: "q1", stimmkarte: true, text: "Wohin setzen die meisten Kindergartenkinder ihre Figur?", opt: [
            ["ganz nach oben", "zentral", "So war es: Fast alle Kinder halten sich für die Besten. Ihr Bild von sich ist sehr optimistisch.", "oben"],
            ["in die Mitte", "kaum", "Das wäre realistisch – so schätzen sich kleine Kinder aber kaum ein.", "Mitte"],
            ["ganz nach unten", "kaum", "Das Gegenteil war der Fall.", "unten"]] },
          { id: "q2", text: "Was passiert mit der Einschätzung in den ersten Schuljahren?", opt: [
            ["Sie steigt, weil die Kinder mehr können.", "kaum", "Die Kinder können mehr – aber sie vergleichen sich auch mehr. Das Selbstbild sinkt."],
            ["Sie sinkt und passt besser zu den tatsächlichen Leistungen.", "zentral", "Helmke nannte das den Weg »vom Optimisten zum Realisten«. Auch Wigfield fand: Die Einschätzung der eigenen Fähigkeiten sinkt in der Grundschule und noch einmal nach dem Wechsel auf die weiterführende Schule."],
            ["Sie bleibt gleich.", "kaum", "Sie verändert sich deutlich: Sie sinkt in den ersten Schuljahren – und bei vielen noch einmal nach dem Wechsel auf die weiterführende Schule."]] },
          { id: "q3", text: "Woher kommt die Veränderung vor allem?", opt: [
            ["Die Kinder werden schlechter.", "kaum", "Sie lernen ja dazu. Nicht die Leistung sinkt, sondern das Bild davon."],
            ["Die Eltern loben weniger.", "begruendbar", "Rückmeldung von Eltern spielt eine Rolle. Als wichtigste Gründe gelten aber Noten, Rückmeldungen in der Schule und der wachsende Vergleich mit anderen."],
            ["Sie bekommen Noten und vergleichen sich mit anderen.", "zentral", "Rückmeldungen und Vergleiche formen das Selbstbild. Genau darum geht es heute."]] }
        ] },
        { typ: "befund", status: "belegte Quelle · vereinfacht", quelle: "Helmke (1998), Vom Optimisten zum Realisten?, in Weinert (Hrsg.), Entwicklung im Kindesalter, 115–132; Wigfield & Eccles (2000), aus dem Unterrichtsmaterial M6 und M9", html: "<p>Junge Kinder überschätzen sich fast alle. In den ersten Schuljahren sinkt die Einschätzung deutlich und passt besser zu den Leistungen. Nach dem Wechsel auf die weiterführende Schule sinkt sie bei vielen noch einmal (Wigfield). Als Gründe gelten Noten, Rückmeldungen und der wachsende Vergleich mit anderen.</p>" }
      ] },
      { id: "a3", nr: "3", titel: "Das Bild von mir", sozial: "Plenum, dann allein", min: 12, oeffnet: "ansage", bloecke: [
        { typ: "karten", karten: [
          { art: "honig", titel: "Selbstkonzept", html: "<p>Das Bild, das ich von mir habe: alle Vorstellungen, Einschätzungen und Bewertungen über mich – gefühlt oder überlegt. Es kann einen Bereich betreffen (Mathe) oder die ganze Person. Das <b>Fähigkeitsselbstkonzept</b> ist das Bild von meinen Fähigkeiten.</p>" },
          { titel: "I und Me", html: "<p>William James unterschied zwei Seiten des Selbst: Das <b>»I«</b> ist das betrachtende Ich, das denkt und handelt. Das <b>»Me«</b> ist das betrachtete Ich – das Bild von mir, also das Selbstkonzept.</p>" },
          { titel: "Spiegel der anderen", html: "<p>Charles Cooley sprach vom »looking-glass self«: Ich sehe mich im Spiegel der anderen. Mein Bild von mir entsteht auch daraus, wie ich glaube, dass andere mich sehen.</p>" }
        ] },
        { typ: "text", html: "<p class=\"k-klein\">Nach dem Text »Das Selbstkonzept« aus dem Unterrichtsmaterial.</p><h3>Woraus entsteht das Bild? Aus Vergleichen</h3><p>Lege jeden Satz zu der Art von Vergleich, die darin steckt.</p>" },
        { typ: "sortieren", id: "vergleiche", satz: true, faecher: [
          { id: "sozial", titel: "sozialer Vergleich", text: "mit anderen (interindividuell)" }, { id: "temporal", titel: "temporaler Vergleich", text: "mit mir früher" },
          { id: "dimensional", titel: "dimensionaler Vergleich", text: "Fach mit Fach, bei mir" }, { id: "kriterial", titel: "kriterialer Vergleich", text: "mit einem festen Maßstab" }],
          karten: [
            ["»In Mathe bin ich besser als die meisten in meiner Klasse.«", "sozial", "Du vergleichst dich mit anderen – zwischen Personen."],
            ["»In Englisch bin ich besser als im letzten Halbjahr.«", "temporal", "Du vergleichst dich mit dir selbst zu einem früheren Zeitpunkt."],
            ["»In Deutsch bin ich besser als in Mathe.«", "dimensional", "Du vergleichst zwei Bereiche bei dir selbst, zur selben Zeit."],
            ["»Ich habe die Führerscheinprüfung bestanden.«", "kriterial", "Du prüfst, ob du ein festes Kriterium erreicht hast – ganz ohne andere."],
            ["»Slobodan versteht Chemie viel schneller als ich.«", "sozial", "Vergleich mit einer anderen Person."],
            ["»Vor einem Jahr konnte ich keine zwei Sätze Spanisch, jetzt kann ich mich unterhalten.«", "temporal", "Du vergleichst dich mit dir selbst, früher und heute."],
            ["»Sport liegt mir mehr als Musik.«", "dimensional", "Zwei Bereiche bei dir selbst."],
            ["»Ich schaffe 50 Meter unter acht Sekunden.«", "kriterial", "Ein fester Maßstab, an dem du dich misst."]
          ], fertigText: "Meistens mischen sich die Vergleiche. Wie sich das Selbstkonzept verändert, hängt davon ab, wie stark jemand welchen Vergleich gewichtet." },
        { typ: "wahl", items: [{ id: "v0", text: "Josef sagt jetzt: »Ich bin in Mathe schlecht.« An der Realschule hielt er sich für gut. Welcher Vergleich steckt dahinter?", opt: [
          ["ein sozialer Vergleich mit der neuen Klasse", "zentral", "Was »gut« heißt, misst er jetzt an der neuen Klasse – und dort sind viele stärker. Genau das untersucht der nächste Auftrag."],
          ["ein temporaler Vergleich mit seinen alten Noten", "zentral", "Er vergleicht mit seinen alten Noten: Sein Halbjahreszeugnis ist schlechter als sein Abschlusszeugnis. Warum das Bild gerade jetzt kippt, zeigt der nächste Auftrag."],
          ["ein dimensionaler Vergleich mit Deutsch", "kaum", "Über Deutsch sagt der Fall nichts."]] }] }
      ] },
      { id: "a4", nr: "4", titel: "Kleiner Fisch im großen Teich", sozial: "allein, dann Plenum", min: 14, oeffnet: "nach", bloecke: [
        { typ: "wahl", items: [{ id: "v1", stimmkarte: true, text: "Lena und Tom haben in Mathe genau dieselbe Leistung. Lena geht in eine sehr starke Klasse, Tom in eine schwächere. Wer hält sich für besser in Mathe?", opt: [
          ["Lena – sie lernt ja mit den Besten.", "kaum", "Das klingt plausibel, ist aber umgekehrt: Neben lauter Starken fühlt sich Lena eher klein.", "Lena"],
          ["Tom", "zentral", "Neben Schwächeren wirkt dieselbe Leistung größer. Das Selbstkonzept entsteht im Vergleich.", "Tom"],
          ["beide gleich – die Leistung ist ja gleich", "begruendbar", "Logisch gedacht. Das Selbstkonzept entsteht aber im Vergleich: Wer mehr Bessere um sich hat, sieht sich kleiner.", "gleich"]] }] },
        { typ: "bild", svg: teichBild(), max: "36rem", min: 512, name: "Schaubild Fischteicheffekt", unterschrift: "Modell nach Marsh (1987) – keine Messwerte. So ähnlich sieht die Grafik in deinem Material M8 aus." },
        { typ: "befund", status: "belegte Quelle", quelle: "Marsh (1987), The Big-Fish-Little-Pond Effect on Academic Self-Concept, Journal of Educational Psychology 79 (3), 280–295", html: "<p>Bei gleicher Leistung haben Schülerinnen und Schüler in leistungsstarken Klassen ein <b>niedrigeres</b> Fähigkeitsselbstkonzept als in leistungsschwächeren. Herbert Marsh nannte das den <b>Big-Fish-Little-Pond-Effekt</b>, auf Deutsch Fischteicheffekt. Er wurde in vielen Ländern gefunden.</p>" },
        { typ: "kasten", art: "info", titel: "Und die Leistung? – noch offen", html: "<p>Ob man in einer starken Klasse auch mehr lernt, ist umstritten. Manche Studien finden einen kleinen Vorteil, andere keinen. Gut belegt ist vor allem der Effekt aufs Selbstkonzept.</p>" },
        { typ: "wahl", items: [
          { id: "jo1", text: "Josef war an der Realschule gut in Mathe. Jetzt ist keine Arbeit besser als 3–4. Was erklärt der Fischteicheffekt?", opt: [
            ["Josef ist schlechter geworden.", "kaum", "Das wissen wir nicht. Der Effekt zeigt: Das Selbstkonzept kann sinken, auch wenn die Leistung gleich bleibt."],
            ["Josef ist vom großen Fisch im kleinen Teich zum kleinen Fisch im großen Teich geworden.", "zentral", "Neue Klasse, neuer Maßstab: Neben stärkeren Mitschülerinnen und Mitschülern sinkt sein Selbstkonzept – und mit ihm seine Erfolgserwartung."],
            ["Josef erklärt seine Noten falsch.", "begruendbar", "Seine Erklärung kommt dazu. Der Fischteicheffekt erklärt aber, woher sein neues Bild von sich stammt: aus dem Vergleich."]] },
          { id: "jo2", text: "Und Slobodan? Am Gymnasium gehörte er nicht zu den Stärksten; jetzt sind seine Noten besser geworden.", opt: [
            ["Sein Selbstkonzept dürfte steigen: Aus dem kleinen Fisch ist ein größerer geworden.", "zentral", "Derselbe Effekt in die andere Richtung – der Fall ist dafür wie gemacht."],
            ["Er ist einfach klüger als Josef.", "kaum", "Das sagt der Fall nicht. Beide haben vor allem den Teich gewechselt."],
            ["Sein Selbstkonzept ändert sich nicht – er kannte den Stoff schon.", "begruendbar", "Vorwissen erklärt seine besseren Noten. Wie er sich selbst sieht, hängt aber auch vom neuen Vergleich ab."]] }
        ] },
        { typ: "fest", id: "eltern", label: "Warum wird diese Grafik oft Eltern gezeigt, deren Kinder in der vierten Klasse sind?", platzhalter: "Weil die Eltern bald entscheiden …", mind: 15, max: 400, zeilen: 3, kurz: "Warum die Grafik Eltern von Viertklässlern gezeigt wird" }
      ] },
      { id: "a5", nr: "5", titel: "Henne oder Ei?", sozial: "allein", min: 6, oeffnet: "nach", bloecke: [
        { typ: "karten", karten: [
          { art: "honig", titel: "Skill-Development", html: "<p><b>Leistung → Selbstkonzept.</b> Gute Leistungen machen ein gutes Bild von den eigenen Fähigkeiten.</p>" },
          { art: "petrol", titel: "Self-Enhancement", html: "<p><b>Selbstkonzept → Leistung.</b> Wer sich viel zutraut, lernt mehr und leistet mehr.</p>" }
        ] },
        { typ: "befund", status: "aus dem Unterrichtsmaterial", quelle: "Text »Das Selbstkonzept«", html: "<p>Beide Ansätze treffen zu: Selbstkonzept und Lernleistung beeinflussen sich <b>wechselseitig</b> (reziprok).</p>" },
        { typ: "wahl", items: [
          { id: "r1", text: "»Seit ich die Arbeit verhauen habe, glaube ich nicht mehr, dass ich Mathe kann.« Welcher Ansatz passt?", opt: [
            ["Self-Enhancement", "kaum", "Hier wirkt die Leistung aufs Selbstkonzept, nicht umgekehrt."],
            ["Skill-Development", "zentral", "Die schlechte Leistung formt das Bild von sich."],
            ["keiner von beiden", "kaum", "Der Satz zeigt genau einen der beiden Wege."]] },
          { id: "r2", text: "Was folgt aus dem wechselseitigen Zusammenhang für Josef?", opt: [
            ["Man muss nur sein Selbstkonzept stärken, dann kommen die Noten von allein.", "begruendbar", "Das ist eine Hälfte. Ohne echte kleine Erfolge hält ein gestärktes Selbstbild aber nicht lange."],
            ["Man kann an beiden Stellen ansetzen: Kleine Erfolge stärken das Selbstkonzept, ein stärkeres Selbstkonzept fördert das Lernen.", "zentral", "Ein Kreis lässt sich an jeder Stelle anstoßen – am besten an beiden."],
            ["Man kann nichts tun – es ist ein Teufelskreis.", "kaum", "Ein Kreis lässt sich in beide Richtungen drehen."]] }
        ] }
      ] },
      { id: "a6", nr: "6", titel: "Wie wächst Zutrauen?", sozial: "zuhören, dann allein", min: 14, oeffnet: "ansage", bloecke: [
        { typ: "geschichte", titel: "Der angekettete Elefant – zweite Lektüre", wie: "Zuhören · noch einmal", hoerauftrag: "Diesmal mit der Frage: Was müsste der Elefant erleben, damit er es wieder versucht?" },
        { typ: "wahl", items: [{ id: "el4", text: "Bild 4: " + bild("el4") + " – Welcher Vergleich fehlt ihm?", opt: [
          ["der soziale Vergleich", "begruendbar", "Ein Vergleich mit anderen Elefanten könnte helfen – siehe gleich: Vorbilder. Was ihm vor allem fehlt, ist der Blick auf sein eigenes Wachstum."],
          ["der temporale Vergleich", "zentral", "Er vergleicht sich nie mit sich selbst früher: Sein Bild von sich stammt aus der Zeit, als er klein war. Sein Selbstkonzept ist veraltet."],
          ["der kriteriale Vergleich", "begruendbar", "Stimmt: Er prüft sich nie am Pflock. Vor allem fehlt ihm aber der Blick darauf, wie sehr er gewachsen ist – der temporale Vergleich."]] }] },
        { typ: "text", html: "<p>Albert Bandura (1977) nennt das Zutrauen, eine Handlung selbst ausführen zu können, <b>Selbstwirksamkeitserwartung</b>. Er beschreibt vier Quellen, aus denen es wächst.</p>" },
        { typ: "karten", karten: [
          { art: "honig", titel: "Eigene Erfolge", html: "<p>Ich habe es selbst geschafft. <b>Die stärkste Quelle.</b></p>" },
          { titel: "Vorbilder", html: "<p>Jemand, der mir ähnlich ist, schafft es.</p>" },
          { titel: "Zuspruch", html: "<p>Jemand, dem ich glaube, traut es mir zu.</p>" },
          { titel: "Körper und Gefühl", html: "<p>Wie ich meine Aufregung deute: Herzklopfen als Angst – oder als Bereitschaft.</p>" }
        ] },
        { typ: "sortieren", id: "quellen", satz: true, faecher: [
          { id: "erfolg", titel: "eigene Erfolge", text: "selbst geschafft" }, { id: "vorbild", titel: "Vorbilder", text: "jemand Ähnliches schafft es" },
          { id: "zuspruch", titel: "Zuspruch", text: "jemand traut es mir zu" }, { id: "koerper", titel: "Körper und Gefühl", text: "Aufregung deuten" }],
          karten: [
            ["Der Elefant zieht einmal kräftig – und der Pflock wackelt.", "erfolg", "Eine eigene kleine Erfahrung, dass Ziehen etwas bewirkt – die stärkste Quelle."],
            ["Er sieht einen anderen Elefanten, der sich losreißt.", "vorbild", "Jemand, der ihm ähnlich ist, schafft es – das macht Mut."],
            ["Ein Kind ruft ihm zu: »Du bist längst stärker als der Pflock!«", "zuspruch", "Ermutigende Worte von anderen."],
            ["Sein Herz rast nicht mehr, wenn er an der Kette steht.", "koerper", "Wie sich der Körper anfühlt, beeinflusst, was man sich zutraut."],
            ["Josef löst drei leichte Aufgaben hintereinander richtig.", "erfolg", "Eigene Erfolge – je mehr, desto stärker das Zutrauen."],
            ["Josef sieht, wie Ali – auch von der Realschule – eine ähnliche Aufgabe löst.", "vorbild", "Ein Vorbild, das ihm ähnlich ist, wirkt besonders."],
            ["Die Lehrerin sagt: »Dein Lösungsweg stimmt – du kannst das.«", "zuspruch", "Ermutigung von jemandem, dem er glaubt."],
            ["Vor der Arbeit deutet Josef sein Herzklopfen als Aufregung, nicht als Zeichen, dass er versagt.", "koerper", "Er deutet seinen Körperzustand um – das stärkt das Zutrauen."]
          ], fertigText: "Vier Wege zu mehr Zutrauen – und alle lassen sich gestalten." },
        { typ: "wahl", items: [
          { id: "se1", text: "Welche Quelle wirkt nach Bandura am stärksten?", opt: [
            ["Zuspruch", "kaum", "Worte helfen, wirken aber schwächer – vor allem, wenn eigene Erfahrungen dagegen sprechen."],
            ["Vorbilder", "begruendbar", "Vorbilder helfen, besonders wenn sie einem ähnlich sind. Am stärksten bleibt aber die eigene Erfahrung."],
            ["eigene Erfolge", "zentral", "Was ich selbst geschafft habe, überzeugt mich am meisten."]] },
          { id: "el5", text: "Bild 5: Am Ende der Geschichte heißt es sinngemäß: " + bild("el5") + " – Welche Quelle meint das?", opt: [
            ["eigene Erfolgserfahrung", "zentral", "Nur ein eigener Versuch kann zeigen, dass der Pflock nicht mehr hält. Das ist Banduras stärkste Quelle."],
            ["Zuspruch", "begruendbar", "Die Geschichte selbst ist eine Art Zuspruch. Ihr Rat zielt aber auf eine eigene Erfahrung."],
            ["Vorbilder", "kaum", "Von einem Vorbild ist in diesem Satz keine Rede."]] }
        ] },
        { typ: "sprachen" }
      ] },
      { id: "a7", nr: "7", titel: "Verorten und vernetzen", sozial: "allein, dann am Board", min: 6, oeffnet: "nach", bloecke: [
        { typ: "verorten" },
        { typ: "text", html: "<h3>Eine Verbindung knüpfen</h3>" },
        { typ: "verbindung", einleitung: "Verbinde einen Begriff von heute mit einem früheren. Zum Beispiel: Was hat der Fischteicheffekt mit der Erfolgserwartung zu tun?" },
        { typ: "text", html: "<h3>Deine Lernspur</h3>" },
        { typ: "lernspur", satzanfang: "Was ich mir zutraue, hängt auch davon ab, mit wem …" }
      ] },
      { id: "a8", nr: "8", titel: "Lieber großer Fisch?", sozial: "allein", min: 14, oeffnet: "nach", bloecke: [
        { typ: "schreiben", id: "teich", operator: "Stellung nehmen", mind: 60,
          aufgabe: "»Eltern sollten ihr Kind lieber auf eine Schule schicken, auf der es zu den Besten gehört.« Nimm Stellung zu dieser Aussage.",
          hinweis: "Nutze den Fischteicheffekt und den wechselseitigen Zusammenhang von Selbstkonzept und Leistung. Wäge ab und komm zu einem eigenen Urteil.",
          beispiel: "<p>»Für die Aussage spricht der Fischteicheffekt: Bei gleicher Leistung … Dagegen spricht, dass … Ich halte die Aussage deshalb für …, weil …«</p>",
          satzanfaenge: ["Für die Aussage spricht der Fischteicheffekt: …", "Weil Selbstkonzept und Leistung sich wechselseitig beeinflussen, …", "Dagegen spricht, dass …", "Offen ist noch, ob …", "Insgesamt halte ich die Aussage für …, weil …"],
          wortspeicher: ["Fähigkeitsselbstkonzept", "Fischteicheffekt", "sozialer Vergleich", "Skill-Development", "Self-Enhancement", "wechselseitig", "Erfolgserwartung", "Selbstwirksamkeit"],
          kriterien: [
            ["Grundlegend", "Ich erkläre den Fischteicheffekt und beziehe ihn auf die Aussage."],
            ["Sicher", "Ich wäge ab: Was spricht dafür (Selbstkonzept), was dagegen (Anregung durch Stärkere, offene Forschungslage zur Leistung)?"],
            ["Souverän", "Ich nutze den wechselseitigen Zusammenhang von Selbstkonzept und Leistung und komme zu einem begründeten, abgewogenen Urteil."]],
          muster: "<p>Für die Aussage spricht der Fischteicheffekt (Marsh 1987): Bei gleicher Leistung haben Kinder in einer leistungsschwächeren Gruppe ein höheres Fähigkeitsselbstkonzept, weil sie sich mit anderen vergleichen. Ein hohes Selbstkonzept ist kein Selbstzweck: Selbstkonzept und Leistung beeinflussen sich wechselseitig. Wer sich mehr zutraut, erwartet eher Erfolg, strengt sich an und lernt mehr – das kann sich langfristig auch in Noten zeigen. Dagegen spricht, dass eine starke Klasse anregen kann: Man lernt von Besseren, und Vorbilder stärken die Selbstwirksamkeit. Ob man dort tatsächlich mehr lernt, ist allerdings umstritten. Ich halte die Aussage deshalb nur für teilweise richtig: Eltern sollten das Selbstkonzept ihres Kindes ernst nehmen, aber auch schauen, wo es sich wohlfühlt, gefordert wird und Erfolge erleben kann. Eine Schule, auf der ein Kind ständig zu den Schwächsten gehört, kann sein Zutrauen beschädigen – eine, auf der es nie gefordert wird, aber auch.</p>" },
        { typ: "kann", items: ["Ich kann erklären, was ein Fähigkeitsselbstkonzept ist und aus welchen Vergleichen es entsteht.", "Ich kann den Fischteicheffekt erklären und auf einen Fall anwenden.", "Ich kann die vier Quellen der Selbstwirksamkeit nennen.", "Ich kann zu einer Behauptung begründet Stellung nehmen."] },
        { typ: "text", html: "<details class=\"k-hilfe\"><summary>Für Schnelle – oder zu Hause</summary><p>Zeichne ein Schaubild deines eigenen Selbstkonzepts (Material M8, Aufgabe 5): In der Mitte du, außen Bereiche wie Schule, Sport, Freundschaften. Welche Vergleiche haben dein Bild in einem Bereich geprägt? Nur für dich – es wird nicht eingesammelt.</p></details>" }
      ] }
    ],
    merkseite: Object.assign({}, E.MERK.ds10, {
      extra2: '<h2>Fischteicheffekt <span class="d-meta">(Modell nach Marsh 1987)</span></h2><div style="max-width:11cm">' + teichBild() + "</div>"
    })
  };
})();
