/* Stunde 1 · Was treibt mich an? – nach M1–M3. Aufgaben-IDs und die Reihenfolge der Antworten sind dieselben wie in Fassung 1,
   damit gespeicherte Eingaben passen. */
(function () {
  "use strict";
  var E = window.EINHEIT;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var W_FALL = [
    { id: "f1", text: "»Josef macht immer seltener seine Hausaufgaben.« – Was ist das für ein Satz?", opt: [
      ["eine Bewertung", "kaum", "Der Satz urteilt nicht über Josef. Er sagt nur, was man sehen kann."],
      ["eine Beschreibung", "zentral", "Der Satz hält fest, was man beobachten kann – ohne Grund und ohne Urteil."],
      ["eine Erklärung", "kaum", "Eine Erklärung nennt einen Grund (»weil …«). Der fehlt hier noch."]] },
    { id: "f2", text: "»Josef ist einfach faul.« – Was ist das für ein Satz?", opt: [
      ["eine Beschreibung", "kaum", "»Faul« kann man nicht beobachten. Beobachten kann man nur, was Josef tut oder lässt."],
      ["eine Erklärung", "begruendbar", "Der Satz klingt wie ein Grund. Er erklärt aber nichts: Warum war Josef auf der Realschule dann nicht »faul«?"],
      ["eine Bewertung", "zentral", "»Faul« ist ein Urteil über die Person. Es beendet das Nachdenken, statt es zu beginnen."]] }
  ];
  var FAECHER = [
    { id: "b", titel: "Bedingungen", text: "Sie beeinflussen, ob Motivation entsteht." },
    { id: "f", titel: "Motivationsformen", text: "Arten von Motivation. Sie ziehen unterschiedliches Lernen nach sich." },
    { id: "m", titel: "Verhaltensmerkmale", text: "Daran erkennt man Motivation von außen." }
  ];
  var KARTEN = [
    ["Interesse", "b", "Interesse ist vorher da und macht Motivation wahrscheinlicher."], ["Zielrichtung", "m", "Wofür sich jemand entscheidet, kann man beobachten."],
    ["intrinsisch", "f", "Das ist eine Art von Motivation."], ["Selbstbestimmung", "b", "Wer mitentscheiden darf, ist eher motiviert – eine Bedingung."],
    ["Ausdauer", "m", "Wie lange jemand dranbleibt, kann man beobachten."], ["Vorwissen", "b", "Vorwissen ist vorher da und beeinflusst, ob man sich etwas zutraut."],
    ["extrinsisch", "f", "Das ist eine Art von Motivation."], ["Intensität", "m", "Wie sehr sich jemand anstrengt, zeigt sich im Verhalten."],
    ["soziale Eingebundenheit", "b", "Dazuzugehören ist eine Bedingung, kein Verhalten."], ["Verarbeitungstiefe", "m", "Wie gründlich jemand lernt, ist ein Merkmal des Lernverhaltens."]
  ];
  var W_BEGRIFFE = [
    { id: "b1", text: "»Er kann sich immer seltener dazu durchringen, die Hausaufgaben zu machen.« – Welches Verhaltensmerkmal zeigt sich hier vor allem?", opt: [
      ["Zielrichtung", "zentral", "Es geht darum, ob Josef die Handlung überhaupt wählt. Er entscheidet sich immer öfter für etwas anderes."],
      ["Intensität", "kaum", "Wie stark er sich anstrengt, wenn er arbeitet, sagt der Satz nicht."],
      ["Ausdauer", "begruendbar", "Über Wochen lässt sein Dranbleiben nach. Im Kern geht es aber ums Anfangen."]] },
    { id: "b2", text: "»Ich check es ohnehin nicht.« – Wozu gehört diese Überzeugung?", opt: [
      ["zu den Verhaltensmerkmalen", "kaum", "Eine Überzeugung ist kein Verhalten. Man kann sie nicht beobachten, nur erfragen."],
      ["zu den Motivationsformen", "kaum", "Der Satz sagt nicht, ob Josef von innen oder von außen angetrieben wird."],
      ["zu den Bedingungen", "zentral", "Wer nicht glaubt, etwas zu schaffen, fängt seltener an. Die Überzeugung beeinflusst, ob Motivation entsteht."]] }
  ];
  var W_FORMEN = [
    { id: "g1", text: "Melissa vergisst beim Lernen die Zeit und fühlt sich »beflügelt«.", opt: [
      ["intrinsisch", "zentral", "Die Freude liegt im Lernen selbst. Zeitvergessenheit ist ein Zeichen von Flow."],
      ["extrinsisch", "kaum", "Von einer Folge außerhalb des Lernens ist nicht die Rede."],
      ["weder noch", "kaum", "Melissa ist deutlich motiviert – man erkennt es an Ausdauer und Erleben."]] },
    { id: "g2", text: "Josefs Eltern versprechen eine Belohnung, wenn er seine Noten verbessert.", opt: [
      ["intrinsisch", "kaum", "Die Belohnung hat mit dem Lernstoff nichts zu tun."],
      ["weder noch", "kaum", "Die Eltern setzen einen Anreiz. Ob er wirkt, ist eine andere Frage."],
      ["extrinsisch", "zentral", "Das Ziel liegt außerhalb der Handlung: Lernen wird Mittel zum Zweck."]] },
    { id: "g3", text: "Ali möchte unbedingt Psychologie studieren und lernt dafür.", opt: [
      ["extrinsisch", "zentral", "Nach der Definition ja: Lernen ist hier Mittel zum Zweck. Das Ziel – der Studienplatz – liegt außerhalb der Lernhandlung."],
      ["intrinsisch", "begruendbar", "Verständlich, denn Ali hat sich das Ziel selbst gesetzt. Selbst gewählt heißt aber noch nicht intrinsisch. Genau das klärt Stunde 2."],
      ["weder noch", "kaum", "Ali hat ein klares Ziel, auf das er sein Lernen ausrichten kann."]] }
  ];
  /* Bilder der Geschichte in eigenen Worten (kein Zitat) – dieselben Sätze wie in EINHEIT.BILDER */
  function bild(id) { var r = ""; E.BILDER.forEach(function (b) { if (b.id === id) r = b.bild; }); return r; }
  var W_GESCHICHTE = [
    { id: "k1", text: "Bild 1: " + bild("k1") + " – Welcher Fachbegriff passt?", opt: [
      ["extrinsische Motivation", "kaum", "Er arbeitet nicht für eine Folge. Niemand hat ihm etwas in Aussicht gestellt."],
      ["intrinsische Motivation", "zentral", "Die Freude liegt im Tun selbst – ohne Versprechen und ohne Drohung."],
      ["Ausdauer", "begruendbar", "Er bleibt dabei, das stimmt. Ausdauer beschreibt aber nur das Verhalten, nicht den Antrieb."]] },
    { id: "k2", text: "Bild 2: " + bild("k2") + " – Welcher Fachbegriff passt?", opt: [
      ["ein Ziel außerhalb der Handlung (extrinsisch)", "zentral", "Die Arbeit wird Mittel zum Zweck. Sie dient nur noch dazu, die Münze zu bekommen."],
      ["ein Verhaltensmerkmal", "kaum", "Die Münze ist kein Verhalten. Sie ist das, worauf sich das Verhalten jetzt richtet."],
      ["ein Motiv", "begruendbar", "Dahinter steht ein Beweggrund: Besitz, Vollständigkeit. Die Münze selbst ist aber der Anreiz von außen."]] },
    { id: "k3", text: "Bild 3: " + bild("k3") + " – Was ist passiert?", opt: [
      ["Er ist nicht mehr motiviert.", "kaum", "Er arbeitet mehr denn je. Intensität und Ausdauer sind gestiegen."],
      ["Seine Ausdauer ist gestiegen.", "begruendbar", "Das stimmt, erklärt aber nicht, warum die Freude verschwindet."],
      ["Die Form der Motivation hat gewechselt: von intrinsisch zu extrinsisch.", "zentral", "Er ist stark motiviert, aber anders. Aus Freude am Tun ist Arbeit für ein Ziel außerhalb geworden."]] }
  ];

  /* Baustein »Motivation erklären«: Definition (verbindlicher Wortlaut der Lehrkraft), Zielzustand, Dreischritt Bedingung – Form – Merkmal */
  var ZIEL_OPT = ["ein Zielzustand", "eine Tätigkeit oder ein Verhalten", "eine Eigenschaft der Person", "eine Bewertung durch andere"];
  function zielItem(id, satz, richtig, erkl) {
    var hinweis = [
      "Ein Zielzustand sagt, was am Ende der Fall ist – und die Person kann ihn anstreben.",
      "Eine Tätigkeit ist der Weg zum Ziel; beobachtbares Verhalten ist das, was erklärt werden soll.",
      "Eine dauerhafte Eigenschaft gehört zum Motiv, nicht zum Zielzustand.",
      "Es zählt, was die Person selbst gut findet – nicht, was andere für sie wollen."];
    return { id: id, text: satz + " – Was ist das?", opt: ZIEL_OPT.map(function (o, i) { return [o, i === richtig ? "zentral" : "kaum", i === richtig ? erkl : hinweis[i] + " Hier passt das nicht."]; }) };
  }
  var W_ZIEL = [
    zielItem("z1", "»Mara hat den Führerschein in der Tasche.«", 0, "Ein Zustand, der am Ende der Fall ist. Woran merkt Mara, dass sie angekommen ist? Der Führerschein ist in der Tasche."),
    zielItem("z2", "»Mara nimmt Fahrstunden.«", 1, "Das ist eine Tätigkeit – der Weg zum Ziel, nicht das Ziel."),
    zielItem("z3", "»Mara ist ein ehrgeiziger Mensch.«", 2, "Eine dauerhafte Eigenschaft. Sie gehört zum Motiv, nicht zum Zielzustand."),
    zielItem("z4", "»Maras Vater findet, sie solle endlich den Führerschein machen.«", 3, "Das ist die Bewertung des Vaters. Zählen würde, was Mara selbst gut findet."),
    zielItem("z5", "»Das Kind sitzt beim Mittagessen neben seiner Freundin.«", 0, "Ein Zustand, den das Kind anstreben kann – so formuliert, wie es am Ende sein soll."),
    zielItem("z6", "»Das Kind rennt zum Esstisch.«", 1, "Beobachtbares Verhalten – genau das, was man mit einem Zielzustand erklären will.")
  ];
  var F_DREI = [
    { id: "bed", titel: "1 Bedingung", text: "Wodurch entsteht die Motivation? Motiv trifft Anreiz." },
    { id: "form", titel: "2 Form", text: "Wo liegt das Positive? Im Tun oder in einer Folge?" },
    { id: "merk", titel: "3 Merkmal", text: "Woran erkenne ich die Motivation am Verhalten?" }
  ];
  var K_DREI = [
    ["Mara lernt Theoriefragen, statt mit ihren Freundinnen ins Kino zu gehen.", "merk", "Merkmal: Zielrichtung – sie wählt das Lernen und lässt das Kino liegen."],
    ["In drei Wochen ist die Theorieprüfung.", "bed", "Bedingung: der Anreiz in der Situation."],
    ["Mara möchte unabhängig sein.", "bed", "Bedingung: das Motiv der Person – eher dauerhaft."],
    ["Das Lernen selbst macht ihr keinen Spaß; es geht ihr um das, was danach kommt.", "form", "Form: extrinsisch – das Positive liegt in einer Folge des Tuns."],
    ["Sie arbeitet hoch konzentriert und lässt das Handy aus.", "merk", "Merkmal: Intensität – wie stark sie sich jetzt anstrengt."],
    ["Auch nach zwei verpatzten Probeläufen macht sie weiter.", "merk", "Merkmal: Ausdauer – sie bleibt trotz Hindernis dran."]
  ];
  var FALL_JONAS = "<p>Jonas baut im Freispiel seit 40 Minuten an einem Turm aus Holzklötzen. Zweimal stürzt der Turm ein; Jonas seufzt und beginnt von vorn. Als neben ihm andere Kinder laut Fangen spielen, schaut er nicht auf. Die Erzieherin ruft zum Aufräumen. Jonas bittet: »Nur noch, bis er so groß ist wie ich!« Eine Belohnung hat ihm niemand versprochen.</p>";
  var FALL_KIMNOAH = "<p>Kim und Noah trainieren seit sechs Wochen dreimal pro Woche für den Stadtlauf über 10 km. Kim sagt: »Beim Laufen wird mein Kopf frei. Die Zeit ist mir egal.« Noah hat mit seinem Bruder gewettet, dass er unter 60 Minuten bleibt. Nach jedem Training trägt er seine Zeit in eine Tabelle ein. Eine Woche vor dem Termin wird der Stadtlauf abgesagt.</p>";
  var GERUEST_INNEN = "<ol><li><b>Beschreiben:</b> [Name] … (was man beobachten kann, ohne Wertung).</li><li><b>Zielzustand:</b> Dieses Verhalten lässt sich mit Motivation erklären: [Name] richtet das Handeln in dieser Situation auf den Zielzustand aus, dass … Diesen Zustand bewertet [sie/er] vermutlich positiv, weil …</li><li><b>Bedingung:</b> Die Motivation entsteht, weil das Motiv … (Person) auf den Anreiz … (Situation) trifft.</li><li><b>Form:</b> Sie ist intrinsisch / extrinsisch, denn das Positive liegt im Tun selbst / in einer Folge des Tuns: …</li><li><b>Merkmal:</b> Erkennbar ist die Motivation an der Zielrichtung (… statt …), an der Intensität (…) und an der Ausdauer (…).</li></ol><p class=\"k-klein\"><b>Vorsichtswörter</b> für alles, was du nicht sehen kannst: vermutlich · das spricht dafür, dass … · lässt sich erklären mit …</p>";
  var GERUEST = "<div class=\"k-kasten k-kasten--sichern\"><div class=\"k-kasten__kopf\">Satzgerüst für Erklärungen · fünf Sätze, immer in dieser Reihenfolge</div>" + GERUEST_INNEN + "<p class=\"k-klein\"><b>Kurzform:</b> [Name] tut …, um den Zustand … zu erreichen, der [ihr/ihm] wichtig ist, weil …</p></div>";
  var KRIT = [
    ["Grundlegend", "Ich nenne einen Zielzustand als Zustand (nicht als Tätigkeit) und ordne die Form richtig zu."],
    ["Sicher", "Ich gehe alle drei Schritte: Bedingung mit Motiv <b>und</b> Anreiz, Form mit dem Ort des Positiven, Merkmale mit Beleg aus dem Fall."],
    ["Souverän", "Ich kennzeichne Vermutungen (»vermutlich«), nutze die Bewertung der Person, nicht meine, und schreibe hin, wenn ein Beleg fehlt."]];
  var MUSTER_KIMNOAH = "<table class=\"k-tabelle\"><thead><tr><th></th><th>Kim</th><th>Noah</th></tr></thead><tbody>" +
    "<tr><td><b>Zielzustand</b></td><td>»Mein Kopf ist frei.« Der Zustand stellt sich beim Laufen selbst ein.</td><td>»Ich bin unter 60 Minuten geblieben und habe die Wette gewonnen.«</td></tr>" +
    "<tr><td><b>1 Bedingung</b></td><td>Motiv: sich wohlfühlen, Freude an Bewegung (vermutet). Anreiz: Zeit und Gelegenheit zum Laufen.</td><td>Motiv: sich messen, etwas leisten (vermutet). Anreiz: Wette mit dem Bruder, Termin des Stadtlaufs.</td></tr>" +
    "<tr><td><b>2 Form</b></td><td>intrinsisch</td><td>extrinsisch</td></tr>" +
    "<tr><td><b>3 Merkmal</b></td><td>Zielrichtung: laufen statt anderer Freizeit. Ausdauer: sechs Wochen, dreimal pro Woche. Intensität: im Fall nicht belegt.</td><td>Zielrichtung: wie Kim. Intensität: misst und notiert jede Zeit. Ausdauer: sechs Wochen, dreimal pro Woche.</td></tr></tbody></table>" +
    "<p><b>b)</b> Beide zeigen dasselbe Verhalten. Der Unterschied liegt im Zielzustand: Bei Kim liegt er im Laufen selbst, bei Noah in einer Folge des Laufens. Daraus ergibt sich die Form.</p>" +
    "<p><b>Für Schnelle:</b> Kim läuft vermutlich weiter, denn ihr Zielzustand hängt nicht am Stadtlauf. Bei Noah fällt mit der Absage der Anreiz weg; er hört vermutlich eher auf. Dagegen spricht: Die Wette lässt sich verschieben, und Noah kann inzwischen Freude am Laufen gefunden haben – Motivation hat oft mehr als eine Quelle. Die Vorhersage bleibt eine Vermutung.</p>" +
    "<p class=\"k-klein\">Wenn ein Fall ein Merkmal nicht belegt (Kims Intensität), schreib das hin. Erfinde keinen Beleg.</p>";

  var personen = E.PERSONEN.map(function (p) { return { art: p.art, titel: p.name, html: "<p>" + p.text + "</p>" }; });

  window.STUNDE = {
    id: "ds06", minuten: 90, material: "nach M1–M3",
    frage: "Warum fange ich manches sofort an – und anderes schiebe ich wochenlang vor mir her?",
    darum: "<p>Mit dieser Stunde beginnt die Einheit Motivation. Du lernst, Motivation zu beschreiben und zu erklären: erst an dir, dann an einem Fall, dann an einer Geschichte von Jorge Bucay.</p><p>Drei Dinge wachsen über sechs Stunden mit: <b>dein Motivprofil</b> (nur für dich), <b>der Motivationskreis</b> mit allen Begriffen und <b>zwei Sprachen</b> – Bucays Bilder und die Fachbegriffe.</p>",
    ziele: ["Motiv und Motivation erklären,", "intrinsische und extrinsische Motivation an einem Fall unterscheiden,", "ein Verhalten mit Zielzustand und dem Dreischritt Bedingung – Form – Merkmal erklären,", "ein Bild aus einer Geschichte in einen Fachbegriff übersetzen."],
    auftraege: [
      { id: "a1", nr: "1", titel: "Wann bin ich motiviert?", sozial: "allein", min: 10, oeffnet: "offen", bloecke: [
        { typ: "kasten", art: "auftrag", titel: "Selbsttest · nur für dich", html: "<p>Tippe bei jedem Satz an, wie sehr er auf dich zutrifft. Denk dabei an das Lernen für die Schule. Es gibt keine richtigen Antworten.</p>" },
        { typ: "skala", id: "m1", stufen: "vier", stamm: "Ich bin motiviert, wenn …", items: E.M1.map(function (x) { return "… " + x[0] + "."; }) },
        { typ: "eigen", bauen: function (c) {
          var n = c.el('<div class="k-karte k-karte--honig"><h3>Das fällt auf</h3><div data-x></div><p class="k-klein">Der Bogen ist kein geprüfter Test. Er sagt nichts darüber, wie du »bist«. Er hilft dir nur, eine Vermutung aufzustellen.</p></div>');
          n.kNeu = function () {
            var a = c.S.skala.m1 || {};
            if (c.S.skala["m1:frei"] && !Object.keys(a).length) { c.$("[data-x]", n).innerHTML = "<p>Du hast den Bogen übersprungen. Denk für deine Vermutung an eine ausgedachte Person – oder an viele in deinem Alter.</p>"; return; }
            function liste(w) { var z = E.M1.filter(function (it, i) { return a[i] === w; }); return z.length ? "<ul>" + z.map(function (x) { return "<li>… " + esc(x[0]) + "</li>"; }).join("") + "</ul>" : '<p class="k-klein">Hier hast du nichts so deutlich angetippt.</p>'; }
            c.$("[data-x]", n).innerHTML = "<p><b>Dem stimmst du voll zu:</b></p>" + liste(3) + "<p><b>Dem stimmst du gar nicht zu:</b></p>" + liste(0);
          };
          n.kNeu();
          return n;
        } },
        { typ: "fest", id: "hypo", druck: false, label: "Meine Vermutung: Ich bin – oder viele in meinem Alter sind – vor allem dann motiviert, wenn …", platzhalter: "… man selbst entscheiden kann, wie …", mind: 15, max: 300, kurz: "Meine Vermutung: Ich bin – oder viele in meinem Alter sind – vor allem dann motiviert, wenn …" }
      ] },
      { id: "a2", nr: "2", titel: "Vier aus einer Klasse", sozial: "zu zweit", min: 10, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p>Josef, Slobodan, Ali und Melissa gehen in die 11. Klasse eines beruflichen Gymnasiums. Sie begleiten uns durch die ganze Einheit.</p>" },
        { typ: "karten", status: "ausgedachter Fall", karten: personen },
        { typ: "text", html: E.fallHTML() },
        { typ: "kasten", art: "auftrag", titel: "Auftrag", html: "<p>Besprecht kurz zu zweit. Dann schreibt jede Person ihre eigene Vermutung auf.</p>" },
        { typ: "fest", id: "vermutung", label: "Warum macht Josef immer seltener seine Hausaufgaben?", platzhalter: "Ich vermute, dass …", mind: 15, max: 300, kurz: "Warum macht Josef seltener Hausaufgaben? – meine erste Vermutung" },
        { typ: "text", html: "<h3>Denkwerkzeug: beschreiben oder bewerten?</h3><p>Psychologie beschreibt und erklärt zuerst. Bewertet wird später – oder gar nicht. Prüfe deine Vermutung an diesen zwei Sätzen.</p>" },
        { typ: "wahl", items: W_FALL, druck: "kurz" }
      ] },
      { id: "a3", nr: "3", titel: "Motiv und Motivation", sozial: "Plenum, dann allein", min: 15, oeffnet: "ansage", bloecke: [
        { typ: "text", html: "<p>Was jemand dauerhaft mitbringt und was ihn gerade jetzt antreibt, ist nicht dasselbe. Die Psychologie trennt deshalb zwei Dinge. Beide sieht man nicht direkt – man erschließt sie aus dem Verhalten.</p>" },
        { typ: "karten", karten: [
          { art: "honig", titel: "Motiv", html: "<p>Was jemand <b>dauerhaft</b> mitbringt: eine Vorliebe für bestimmte Ziele – etwa etwas zu leisten oder dazuzugehören. Ein Motiv ist auch dann da, wenn es gerade nicht wirkt.</p><p class=\"k-klein\">Beispiel: Josef möchte seinen Vater nicht enttäuschen.</p>" },
          { art: "honig", titel: "Motivation", html: "<p>Was <b>jetzt</b> wirkt, wenn ein Motiv auf einen passenden Anreiz der Situation trifft: Sie setzt Verhalten in Gang und richtet es auf ein Ziel aus. Richtet sie sich aufs Lernen, spricht man von <b>Lernmotivation</b>.</p><p class=\"k-klein\"><b>Definition:</b> »Motivation ist die aktuelle Ausrichtung des momentanen Lebensvollzugs auf einen als positiv bewerteten Zielzustand.« In Auftrag 5 wird sie zum Werkzeug.</p>" }
        ] },
        { typ: "kasten", art: "info", titel: "Woran man Motivation von außen erkennt", html: "<ul><li><b>Zielrichtung:</b> wofür sich jemand entscheidet – Hausaufgaben oder Handy?</li><li><b>Ausdauer:</b> wie lange jemand dranbleibt</li><li><b>Intensität:</b> wie sehr sich jemand anstrengt</li><li><b>Verarbeitungstiefe:</b> wie gründlich jemand lernt</li></ul><p>Daneben gibt es Arten von Motivation – zwei davon, <b>intrinsisch</b> und <b>extrinsisch</b>, lernst du in Auftrag 4 genauer kennen – und Bedingungen, die schon vorher da sind.</p>" },
        { typ: "text", html: "<h3>Was dazugehört: lege die Karten ab</h3><p>Tippe eine Karte an, dann das Fach, in das sie gehört. Eine abgelegte Karte holst du durch Antippen zurück. Ab fünf Karten kannst du den Zwischenstand prüfen.</p>" },
        { typ: "sortieren", id: "begriffe", karten: KARTEN, faecher: FAECHER, fertigText: "Merke dir die Reihenfolge: Bedingungen beeinflussen, welche Motivationsform entsteht. Die Form zeigt sich im Verhalten." },
        { typ: "text", html: "<h3>Am Fall anwenden</h3>" },
        { typ: "wahl", items: W_BEGRIFFE }
      ] },
      { id: "a4", nr: "4", titel: "Von innen oder von außen?", sozial: "allein, dann Plenum", min: 10, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p>Die wichtigste Unterscheidung der Motivationspsychologie fragt: Wo liegt das, was ich erreichen will – in der Handlung selbst oder dahinter?</p>" },
        { typ: "karten", karten: [
          { art: "honig", titel: "Intrinsische Motivation", html: "<p>Ich tue etwas um seiner selbst willen: aus Interesse, Neugier oder Freude an der Sache. Das Ziel liegt <b>in</b> der Handlung. Am stärksten ist das im Flow: Man geht ganz in der Sache auf und vergisst die Zeit.</p>" },
          { art: "petrol", titel: "Extrinsische Motivation", html: "<p>Ich tue etwas als Mittel zum Zweck. Das Ziel liegt <b>außerhalb</b> der Handlung: eine Belohnung bekommen, eine Note erreichen, Ärger vermeiden.</p>" }
        ] },
        { typ: "text", html: "<p class=\"k-klein\">Nach Deci &amp; Ryan (1993), Die Selbstbestimmungstheorie der Motivation und ihre Bedeutung für die Pädagogik; Flow nach Csikszentmihalyi (1975).</p>" },
        { typ: "wahl", items: W_FORMEN },
        { typ: "kasten", art: "info", titel: "Offene Frage für die nächste Stunde", html: "<p>Ali lernt für ein Ziel, das außerhalb des Lernens liegt – und hat es sich doch selbst ausgesucht. Extrinsisch und trotzdem aus eigenem Antrieb: Geht das? Deci und Ryan sagen: ja. Wie, klären wir in Stunde 2.</p>" }
      ] },
      { id: "dr1", nr: "5", titel: "Motivation erklären: der Dreischritt", sozial: "Plenum am Board", min: 15, oeffnet: "ansage", zusatz: "Motivation erklären · 1 von 4", bloecke: [
        { typ: "kasten", art: "auftrag", titel: "Zum Einstieg · Plenum", html: "<p>»Tom ist einfach nicht motiviert.« – Stimmst du zu? Zeig es mit der Hand. Zwei Stimmen begründen kurz.</p>" },
        { typ: "text", html: "<p>Bisher kannst du sagen, <b>woran</b> man Motivation erkennt und <b>welche Form</b> sie hat. Jetzt wird daraus ein Werkzeug: Wer ein Verhalten erklärt, nennt zuerst den <b>Zielzustand</b> und geht dann drei Schritte.</p>" },
        { typ: "merk", titel: "Definition – auswendig können", html: "<p><b>Motivation ist die aktuelle Ausrichtung des momentanen Lebensvollzugs auf einen als positiv bewerteten Zielzustand.</b></p>" },
        { typ: "text", html: "<h3>Die Definition in drei Teilen</h3>" },
        { typ: "tabelle", kopf: ["Wortlaut", "Das heißt", "Deine Prüffrage"], zeilen: [
          ["»aktuelle … des momentanen Lebensvollzugs«", "Es geht um das, was jemand <b>jetzt gerade</b> denkt, fühlt und tut – nicht um eine dauerhafte Eigenschaft.", "In welcher Situation?"],
          ["»Ausrichtung«", "Das Verhalten hat eine Richtung: Die Person wählt etwas und lässt anderes liegen.", "Worauf richtet sich das Verhalten?"],
          ["»auf einen als positiv bewerteten Zielzustand«", "Ein Zustand, der noch nicht erreicht ist und den die Person <b>selbst</b> gut findet.", "Was soll am Ende der Fall sein – und warum ist das der Person wichtig?"]] },
        { typ: "kasten", art: "info", titel: "Der Zielzustand – drei Regeln", html: "<ul><li><b>Zustand, nicht Tätigkeit.</b> Ein Satz, der sagt, was am Ende der Fall ist: »Der Turm ist so groß wie ich.« Nicht: »Turm bauen.«</li><li><b>Von der Person bewertet.</b> Es zählt, was die Person selbst gut findet – nicht, was Eltern, Lehrkräfte oder du für gut hältst.</li><li><b>Vermutet, nicht gesehen.</b> Einen Zielzustand kann man nicht beobachten. Du erschließt ihn aus dem Verhalten und schreibst »vermutlich«.</li></ul><p><b>Testfrage:</b> Woran würde die Person merken, dass sie angekommen ist?</p>" },
        { typ: "text", html: "<h3>Der Dreischritt</h3>" },
        { typ: "tabelle", kopf: ["Schritt", "Leitfrage", "Fachbegriffe", "Bezug zum Zielzustand"], zeilen: [
          ["<b>1 Bedingung</b>", "Wodurch entsteht die Motivation?", "Ein <b>Motiv</b> (Person, eher dauerhaft) trifft auf einen <b>Anreiz</b> (Situation).", "Der Anreiz macht den Zielzustand in dieser Situation erreichbar und wichtig."],
          ["<b>2 Form</b>", "Wo liegt das Positive?", "<b>intrinsisch:</b> im Tun selbst · <b>extrinsisch:</b> in einer Folge des Tuns", "Der Zielzustand liegt in der Tätigkeit oder kommt nach ihr."],
          ["<b>3 Merkmal</b>", "Woran erkenne ich die Motivation am Verhalten?", "<b>Zielrichtung, Intensität, Ausdauer</b>", "Alle drei zeigen auf den Zielzustand hin."]] },
        { typ: "merk", titel: "Merksatz", html: "<p>Eine <b>Beschreibung</b> sagt, was jemand tut. Eine <b>Erklärung</b> sagt, wozu – sie nennt den Zielzustand.</p>" },
        { typ: "text", html: "<h3>Modellbeispiel: Aylin</h3>" },
        { typ: "karten", status: "ausgedachter Fall", karten: [{ art: "petrol", titel: "Aylin (17)", html: "<p>Aylin sitzt am Samstagnachmittag seit zwei Stunden an Mathe-Aufgaben. Ihr Handy liegt im Flur. Eine Aufgabe rechnet sie dreimal neu, bis das Ergebnis stimmt. In zwei Wochen schreibt sie die Klausur. Sie braucht 10 Punkte, damit ihr Schnitt für die Bewerbung um ein duales Studium reicht. Mathe macht ihr keinen Spaß.</p>" }] },
        { typ: "fest", id: "aylin", label: "Erst du: Was ist vermutlich Aylins Zielzustand? Schreibe einen Zustandssatz.", platzhalter: "»Ich habe …«", mind: 10, max: 200, zeilen: 2, kurz: "Aylins Zielzustand – mein Vorschlag" },
        { typ: "text", html: "<p>Jetzt denkt deine Lehrkraft am Board laut und füllt die Tabelle. Vergleiche mit deinem Satz.</p>" },
        { typ: "tabelle", kopf: ["Schritt", "Lösung", "Beleg im Fall"], zeilen: [
          ["Zielzustand", "»Ich habe 10 Punkte in der Klausur.« Aylin bewertet das vermutlich positiv, weil es ihre Bewerbung sichert.", "»braucht 10 Punkte«, Bewerbung"],
          ["1 Bedingung", "Motiv: beruflich etwas erreichen wollen (vermutet). Anreiz: Klausur in zwei Wochen, Bewerbung.", "»in zwei Wochen«, »duales Studium«"],
          ["2 Form", "Extrinsisch: Das Positive liegt in einer Folge des Lernens, nicht im Rechnen selbst.", "»Mathe macht ihr keinen Spaß«"],
          ["3 Merkmal", "Zielrichtung: Mathe statt Handy. Intensität: rechnet dreimal neu. Ausdauer: zwei Stunden an einem Samstag.", "Handy im Flur, dreimal neu, zwei Stunden"]] },
        { typ: "text", html: "<details class=\"k-hilfe\"><summary>Als Text: so klingt die Erklärung</summary><p>Aylin rechnet am Samstag zwei Stunden lang Mathe-Aufgaben. Dieses Verhalten lässt sich mit Motivation erklären: Sie richtet ihr Handeln in dieser Situation auf den Zielzustand aus, in der Klausur 10 Punkte zu haben. Diesen Zustand bewertet sie vermutlich positiv, weil er ihre Bewerbung sichert. Die Motivation entsteht, weil ihr Motiv, beruflich etwas zu erreichen, auf einen Anreiz trifft: die Klausur in zwei Wochen. Sie ist extrinsisch, denn das Positive liegt in einer Folge des Lernens; das Rechnen selbst macht ihr keinen Spaß. Erkennbar ist die Motivation an der Zielrichtung (Mathe statt Handy), an der Intensität (sie rechnet eine Aufgabe dreimal neu) und an der Ausdauer (zwei Stunden an einem Samstag).</p><p class=\"k-klein\">Jede Aussage hat einen Beleg aus dem Fall. Das Motiv steht nicht im Text – deshalb »vermutet«.</p></details>" },
        { typ: "text", html: GERUEST }
      ] },
      { id: "dr2", nr: "6", titel: "Zielzustand oder nicht?", sozial: "allein", min: 6, oeffnet: "nach", zusatz: "Motivation erklären · 2 von 4", bloecke: [
        { typ: "text", html: "<p>Prüfe die drei Regeln an Mara, die den Führerschein machen will, und an einem Kind in der Kita.</p>" },
        { typ: "wahl", items: W_ZIEL, druck: "kurz" },
        { typ: "text", html: "<h3>Welcher Schritt?</h3><p>Lege jede Aussage über Mara in den passenden Schritt. Die Erklärung nennt dir danach den genauen Fachbegriff.</p>" },
        { typ: "sortieren", id: "dreischritt", karten: K_DREI, faecher: F_DREI, satz: true, fertigText: "Bedingung: Motiv und Anreiz. Form: wo das Positive liegt. Merkmal: Zielrichtung, Intensität, Ausdauer." }
      ] },
      { id: "dr3", nr: "7", titel: "Jonas erklären", sozial: "zu zweit, dann allein", min: 10, oeffnet: "nach", zusatz: "Motivation erklären · 3 von 4", bloecke: [
        { typ: "karten", status: "ausgedachter Fall", karten: [{ art: "petrol", titel: "Jonas (5) im Freispiel", html: FALL_JONAS }] },
        { typ: "kasten", art: "auftrag", titel: "Auftrag", html: "<p>Füllt zu zweit die Tabelle im Kopf oder auf Papier: Zielzustand, Bedingung, Form, Merkmal – jeweils mit Beleg. Dann schreibt jede Person drei bis vier Sätze.</p>" },
        { typ: "tabelle", kopf: ["Schritt", "Satzanfang", "Beleg im Fall"], zeilen: [
          ["Zielzustand", "Jonas richtet sein Handeln darauf aus, dass … Das findet er vermutlich gut, weil …", "…"],
          ["1 Bedingung", "Das Motiv … trifft auf den Anreiz …", "…"],
          ["2 Form", "Die Motivation ist …, denn das Positive liegt …", "…"],
          ["3 Merkmal", "Zielrichtung: … statt … · Intensität: … · Ausdauer: …", "…"]] },
        { typ: "schreiben", id: "jonas", operator: "erklären", mind: 45,
          aufgabe: "Erkläre Jonas' Verhalten mithilfe der Definition und des Dreischritts Bedingung – Form – Merkmal.",
          hinweis: "Nenne zuerst den Zielzustand. Belege jeden Schritt mit einer Stelle aus dem Fall.",
          material: "", beispiel: "<p>»Jonas baut seit 40 Minuten an einem Turm und beginnt nach zwei Einstürzen neu. Er richtet sein Handeln auf den Zielzustand aus, dass …«</p><p class=\"k-klein\">Schreibe weiter: Warum ist ihm das wichtig? Dann Bedingung, Form, Merkmal.</p>",
          satzanfaenge: ["Jonas richtet sein Handeln auf den Zielzustand aus, dass …", "Das findet er vermutlich gut, weil …", "Die Motivation entsteht, weil das Motiv … auf den Anreiz … trifft.", "Sie ist intrinsisch / extrinsisch, denn das Positive liegt …", "Erkennbar ist sie an der Zielrichtung (… statt …), an der Intensität (…) und an der Ausdauer (…)."],
          wortspeicher: ["Zielzustand", "vermutlich", "Motiv", "Anreiz", "intrinsisch", "extrinsisch", "Zielrichtung", "Intensität", "Ausdauer"],
          kriterien: KRIT,
          muster: "<p>Jonas baut seit 40 Minuten an einem Turm und beginnt nach zwei Einstürzen neu. Er richtet sein Handeln auf den Zielzustand aus, dass der Turm so groß ist wie er. Das bewertet er vermutlich positiv, weil er es dann selbst geschafft hat. Die Motivation entsteht, weil sein Motiv, etwas selbst zu können, im Freispiel auf einen passenden Anreiz trifft: Klötze, Zeit und eine Aufgabe, die schwer, aber machbar ist. Sie ist intrinsisch, denn das Positive liegt im Bauen und Gelingen selbst; niemand hat eine Belohnung versprochen. Erkennbar ist sie an der Zielrichtung (bauen statt Fangen), der Intensität (er schaut nicht auf) und der Ausdauer (40 Minuten, zwei Neuanfänge).</p><p class=\"k-klein\">Der fertige Turm ist das Ergebnis der Tätigkeit, keine Folge außerhalb von ihr – deshalb intrinsisch. Würde Jonas bauen, um gelobt zu werden, wäre die Motivation extrinsisch.</p>" }
      ] },
      { id: "dr4", nr: "8", titel: "Kim und Noah", sozial: "allein", min: 10, oeffnet: "nach", zusatz: "Motivation erklären · 4 von 4", bloecke: [
        { typ: "karten", status: "ausgedachter Fall", karten: [{ art: "petrol", titel: "Kim und Noah (beide 17)", html: FALL_KIMNOAH }] },
        { typ: "schreiben", id: "kimnoah", operator: "erklären und vergleichen", mind: 70,
          aufgabe: "a) Erkläre Kims und Noahs Trainingsverhalten jeweils mit dem Dreischritt. b) Vergleiche: Worin unterscheiden sich Zielzustand und Form?",
          hinweis: "Das Satzgerüst aus Auftrag 5 darfst du nutzen. Belegt der Fall ein Merkmal nicht, schreib das hin – erfinde keinen Beleg.",
          material: "<details class=\"k-hilfe\"><summary>Satzgerüst noch einmal zeigen</summary>" + GERUEST_INNEN + "</details>",
          beispiel: "<p>»Kim und Noah trainieren seit sechs Wochen dreimal pro Woche. Kim richtet ihr Handeln vermutlich auf den Zielzustand aus, dass …«</p><p class=\"k-klein\">Schreibe weiter, dann dasselbe für Noah, dann der Vergleich.</p>",
          satzanfaenge: ["Kim richtet ihr Handeln vermutlich auf den Zielzustand aus, dass …", "Noahs Zielzustand ist dagegen …", "Bei Kim ist die Motivation …, denn …", "Beide zeigen dasselbe Verhalten. Der Unterschied liegt …"],
          wortspeicher: ["Zielzustand", "vermutlich", "Motiv", "Anreiz", "intrinsisch", "extrinsisch", "Zielrichtung", "Intensität", "Ausdauer", "im Fall nicht belegt"],
          kriterien: KRIT.concat([["Vergleich", "Ich zeige, dass das Verhalten gleich ist und der Unterschied im Zielzustand und damit in der Form liegt."]]),
          muster: MUSTER_KIMNOAH },
        { typ: "text", html: "<details class=\"k-hilfe\"><summary>Für Schnelle</summary><p>Eine Woche vor dem Termin wird der Stadtlauf abgesagt. Wer läuft vermutlich weiter? Begründe mit dem Zielzustand. Nenne auch, was gegen deine Vermutung spricht. Schreib auf Papier – wir besprechen es.</p></details>" },
        { typ: "kasten", art: "sichern", titel: "Selbstkontrolle in fünf Fragen", html: "<ol><li>Steht der Zielzustand als Zustand da – nicht als Tätigkeit?</li><li>Ist es die Bewertung der Person, nicht meine?</li><li>Nenne ich bei der Bedingung beide Seiten: Motiv und Anreiz?</li><li>Begründe ich die Form mit dem Ort des Positiven?</li><li>Hat jedes Merkmal einen Beleg aus dem Fall – oder sage ich, dass er fehlt?</li></ol>" }
      ] },
      { id: "a5", nr: "9", titel: "Der Kreis der 99", sozial: "zuhören, dann allein", min: 15, oeffnet: "ansage", bloecke: [
        { typ: "geschichte", titel: "Der Kreis der 99", hoerauftrag: "Achte auf eine Frage: <b>Was verändert sich beim Diener – und wodurch?</b>" },
        { typ: "fest", id: "diener", label: "In deinen eigenen Worten: Was hat sich beim Diener verändert, und wodurch?", platzhalter: "Am Anfang … Dann … Am Ende …", mind: 20, max: 400, zeilen: 4, kurz: "Der Kreis der 99 in meinen Worten" },
        { typ: "text", html: "<h3>Zwei Sprachen</h3><p>Bucay erzählt in Bildern. Die Psychologie benutzt Fachbegriffe. Oft meinen beide dasselbe. Übersetze drei Bilder der Geschichte.</p>" },
        { typ: "wahl", items: W_GESCHICHTE },
        { typ: "sprachen" },
        { typ: "text", html: "<p class=\"k-klein\">In Stunde 2 lesen wir den Kreis der 99 ein zweites Mal – dann mit der Frage, ob die Botschaft stimmt.</p>" }
      ] },
      { id: "a6", nr: "10", titel: "Verorten und vernetzen", sozial: "allein, dann am Board", min: 8, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p>Jede Stunde endet gleich: Du legst die neuen Begriffe in den <b>Motivationskreis</b>, knüpfst eine Verbindung und schreibst einen Satz in deine Lernspur. So wächst dein Überblick. Auf der Einheitsseite siehst du ihn ganz.</p>" },
        { typ: "verorten" },
        { typ: "text", html: "<h3>Eine Verbindung knüpfen</h3>" },
        { typ: "verbindung", einleitung: "Verbinde einen Begriff von heute mit einem aus dem Block Wahrnehmung. Zum Beispiel: Was hat Interesse mit selektiver Wahrnehmung zu tun?" },
        { typ: "text", html: "<h3>Deine Lernspur</h3>" },
        { typ: "lernspur", satzanfang: "Ob jemand motiviert ist, erkennt man daran, dass …" }
      ] },
      { id: "a7", nr: "11", titel: "Was treibt Josef an – und was bremst ihn?", sozial: "allein", min: 12, oeffnet: "nach", bloecke: [
        { typ: "schreiben", id: "josef", operator: "anwenden", mind: 40,
          aufgabe: "Erkläre in vier bis sechs Sätzen, was Josef antreibt und was ihn bremst.",
          hinweis: "Nutze mindestens drei Fachbegriffe und belege jede Aussage mit einer Stelle aus dem Fall.",
          material: E.fallHTML("Den Fall noch einmal lesen"),
          beispiel: "<p>»Josefs Motivation zeigt sich an seiner Zielrichtung: Er entscheidet sich immer seltener für die Hausaufgaben. Ein Motiv von ihm könnte sein, dass er seinen Vater nicht enttäuschen will. …«</p><p class=\"k-klein\">Schreibe weiter: Was treibt ihn an, was bremst ihn?</p>",
          satzanfaenge: ["Josefs Motivation zeigt sich daran, dass …", "Ein Motiv von Josef könnte sein, dass …", "Die Belohnung der Eltern ist ein … Anreiz, weil …", "Gebremst wird Josef dadurch, dass …"],
          wortspeicher: ["Motiv", "Motivation", "Zielrichtung", "Ausdauer", "Intensität", "intrinsisch", "extrinsisch", "Bedingung"],
          kriterien: [
            ["Grundlegend", "Ich nenne etwas, das Josef antreibt oder bremst, und nutze einen Fachbegriff richtig."],
            ["Sicher", "Ich nutze drei Fachbegriffe richtig und belege jede Aussage mit einer Stelle aus dem Fall."],
            ["Souverän", "Ich trenne außerdem Beschreibung und Bewertung und zeige, wo die Belohnung ansetzt und was sie offen lässt."]],
          muster: "<p>Josefs Motivation für Mathe zeigt sich kaum noch: Er entscheidet sich immer seltener für die Hausaufgaben (Zielrichtung). Antreiben könnte ihn das Motiv, seinen Vater nicht zu enttäuschen, und die versprochene Belohnung – ein extrinsischer Anreiz, denn das Ziel liegt außerhalb des Lernens. Gebremst wird er vor allem durch eine ungünstige Bedingung: Er glaubt nicht mehr, es zu schaffen (»Ich check es ohnehin nicht«). Günstig ist seine soziale Eingebundenheit: In der Gruppe freut er sich manchmal sogar auf die Schule. Ob die Belohnung hilft, bleibt offen – an seinem fehlenden Zutrauen ändert sie nichts.</p>" },
        { typ: "rueckblick", id: "jetzt", von: "vermutung", vorher: "Das hast du am Anfang über Josef vermutet:", label: "Was denkst du jetzt – und warum?" },
        { typ: "kann", items: ["Ich kann Motiv und Motivation erklären.", "Ich kann intrinsische und extrinsische Motivation an einem Fall unterscheiden.", "Ich kann ein Bild aus einer Geschichte in einen Fachbegriff übersetzen.", "Ich kann die Definition von Motivation nennen und ein Verhalten mit Zielzustand und Dreischritt erklären."] },
        { typ: "text", html: "<details class=\"k-hilfe\"><summary>Für Schnelle</summary><p>Lies deine Vermutung aus dem Selbsttest noch einmal. Welche deiner Bedingungen liegt eher in der Sache selbst, welche eher außerhalb? Notiere je ein Beispiel.</p></details>" }
      ] }
    ],
    merkseite: Object.assign({}, E.MERK.ds06, {
      extra1: "<div class=\"d-kasten\"><b>So hängt es zusammen:</b> Bedingungen beeinflussen, ob Motivation entsteht. Ein Motiv setzt sie in Gang. Intrinsisch und extrinsisch sind ihre Formen. Sie zeigt sich in Zielrichtung, Ausdauer und Intensität.</div>",
      extra2: "<div class=\"d-kasten\"><b>Offen für Stunde 2:</b> Ali lernt für ein Ziel außerhalb des Lernens – und hat es selbst gewählt. Extrinsisch und trotzdem aus eigenem Antrieb?</div>"
    })
  };
})();
