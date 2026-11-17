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

  var personen = E.PERSONEN.map(function (p) { return { art: p.art, titel: p.name, html: "<p>" + p.text + "</p>" }; });

  window.STUNDE = {
    id: "ds06", minuten: 90, material: "nach M1–M3",
    frage: "Warum fange ich manches sofort an – und anderes schiebe ich wochenlang vor mir her?",
    darum: "<p>Mit dieser Stunde beginnt die Einheit Motivation. Du lernst, Motivation zu beschreiben und zu erklären: erst an dir, dann an einem Fall, dann an einer Geschichte von Jorge Bucay.</p><p>Drei Dinge wachsen über sechs Stunden mit: <b>dein Motivprofil</b> (nur für dich), <b>der Motivationskreis</b> mit allen Begriffen und <b>zwei Sprachen</b> – Bucays Bilder und die Fachbegriffe.</p>",
    ziele: ["Motiv und Motivation erklären,", "intrinsische und extrinsische Motivation an einem Fall unterscheiden,", "ein Bild aus einer Geschichte in einen Fachbegriff übersetzen."],
    auftraege: [
      { id: "a1", nr: "1", titel: "Wann bin ich motiviert?", sozial: "allein", min: 10, oeffnet: "offen", bloecke: [
        { typ: "kasten", art: "auftrag", titel: "Selbsttest · nur für dich", html: "<p>Tippe bei jedem Satz an, wie sehr er auf dich zutrifft. Denk dabei an das Lernen für die Schule. Es gibt keine richtigen Antworten.</p>" },
        { typ: "skala", id: "m1", stufen: "vier", stamm: "Ich bin motiviert, wenn …", items: E.M1.map(function (x) { return "… " + x[0] + "."; }) },
        { typ: "eigen", bauen: function (c) {
          var n = c.el('<div class="k-karte k-karte--honig"><h3>Das fällt auf</h3><div data-x></div><p class="k-klein">Der Bogen ist kein geprüfter Test. Er sagt nichts darüber, wie du »bist«. Er hilft dir nur, eine Vermutung aufzustellen.</p></div>');
          n.kNeu = function () {
            var a = c.S.skala.m1 || {};
            function liste(w) { var z = E.M1.filter(function (it, i) { return a[i] === w; }); return z.length ? "<ul>" + z.map(function (x) { return "<li>… " + esc(x[0]) + "</li>"; }).join("") + "</ul>" : '<p class="k-klein">Hier hast du nichts so deutlich angetippt.</p>'; }
            c.$("[data-x]", n).innerHTML = "<p><b>Dem stimmst du voll zu:</b></p>" + liste(3) + "<p><b>Dem stimmst du gar nicht zu:</b></p>" + liste(0);
          };
          n.kNeu();
          return n;
        } },
        { typ: "fest", id: "hypo", label: "Meine Vermutung: Ich bin vor allem dann motiviert, wenn …", platzhalter: "… ich selbst entscheiden kann, wie ich …", mind: 15, max: 300, kurz: "Meine Vermutung über mich: Ich bin vor allem dann motiviert, wenn …" }
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
        { typ: "text", html: "<p>Warum jemand etwas tut, sieht man von außen nicht. Man sieht nur, was er tut. Die Psychologie trennt deshalb zwei Dinge.</p>" },
        { typ: "karten", karten: [
          { art: "honig", titel: "Motiv", html: "<p>Ein Beweggrund, den man von außen nicht erkennt. Er aktiviert Verhalten.</p><p class=\"k-klein\">Beispiel: Josef möchte seinen Vater nicht enttäuschen.</p>" },
          { art: "honig", titel: "Motivation", html: "<p>Der Vorgang, in dem ein Motiv Verhalten in Gang setzt und auf ein Ziel ausrichtet – jetzt, in dieser Situation. Richtet sie sich aufs Lernen, spricht man von <b>Lernmotivation</b>.</p><p class=\"k-klein\">Hasselhorn: »aktuelle Ausrichtung des momentanen Lebensvollzugs auf einen als positiv bewerteten Zielzustand«.</p>" }
        ] },
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
      { id: "a5", nr: "5", titel: "Der Kreis der 99", sozial: "zuhören, dann allein", min: 15, oeffnet: "ansage", bloecke: [
        { typ: "geschichte", titel: "Der Kreis der 99", hoerauftrag: "Achte auf eine Frage: <b>Was verändert sich beim Diener – und wodurch?</b>" },
        { typ: "fest", id: "diener", label: "In deinen eigenen Worten: Was hat sich beim Diener verändert, und wodurch?", platzhalter: "Am Anfang … Dann … Am Ende …", mind: 20, max: 400, zeilen: 4, kurz: "Der Kreis der 99 in meinen Worten" },
        { typ: "text", html: "<h3>Zwei Sprachen</h3><p>Bucay erzählt in Bildern. Die Psychologie benutzt Fachbegriffe. Oft meinen beide dasselbe. Übersetze drei Bilder der Geschichte.</p>" },
        { typ: "wahl", items: W_GESCHICHTE },
        { typ: "sprachen" },
        { typ: "text", html: "<p class=\"k-klein\">In Stunde 2 lesen wir den Kreis der 99 ein zweites Mal – dann mit der Frage, ob die Botschaft stimmt.</p>" }
      ] },
      { id: "a6", nr: "6", titel: "Verorten und vernetzen", sozial: "allein, dann am Board", min: 8, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p>Jede Stunde endet gleich: Du legst die neuen Begriffe in den <b>Motivationskreis</b>, knüpfst eine Verbindung und schreibst einen Satz in deine Lernspur. So wächst dein Überblick. Auf der Einheitsseite siehst du ihn ganz.</p>" },
        { typ: "verorten" },
        { typ: "text", html: "<h3>Eine Verbindung knüpfen</h3>" },
        { typ: "verbindung", einleitung: "Verbinde einen Begriff von heute mit einem aus dem Block Wahrnehmung. Zum Beispiel: Was hat Interesse mit selektiver Wahrnehmung zu tun?" },
        { typ: "text", html: "<h3>Deine Lernspur</h3>" },
        { typ: "lernspur", satzanfang: "Ob jemand motiviert ist, erkennt man daran, dass …" }
      ] },
      { id: "a7", nr: "7", titel: "Was treibt Josef an – und was bremst ihn?", sozial: "allein", min: 12, oeffnet: "nach", bloecke: [
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
        { typ: "kann", items: ["Ich kann Motiv und Motivation erklären.", "Ich kann intrinsische und extrinsische Motivation an einem Fall unterscheiden.", "Ich kann ein Bild aus einer Geschichte in einen Fachbegriff übersetzen."] },
        { typ: "text", html: "<details class=\"k-hilfe\"><summary>Für Schnelle</summary><p>Lies deine Vermutung aus dem Selbsttest noch einmal. Welche deiner Bedingungen liegt eher in der Sache selbst, welche eher außerhalb? Notiere je ein Beispiel.</p></details>" }
      ] }
    ],
    merkseite: Object.assign({}, E.MERK.ds06, {
      extra1: "<div class=\"d-kasten\"><b>So hängt es zusammen:</b> Bedingungen beeinflussen, ob Motivation entsteht. Ein Motiv setzt sie in Gang. Intrinsisch und extrinsisch sind ihre Formen. Sie zeigt sich in Zielrichtung, Ausdauer und Intensität.</div>",
      extra2: "<div class=\"d-kasten\"><b>Offen für Stunde 2:</b> Ali lernt für ein Ziel außerhalb des Lernens – und hat es selbst gewählt. Extrinsisch und trotzdem aus eigenem Antrieb?</div>"
    })
  };
})();
