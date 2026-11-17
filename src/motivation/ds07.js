/* Stunde 2 · Wann wird ein Muss zum Wollen? – nach M4 und M5. Aufgaben-IDs und Antwortreihenfolge wie in Fassung 1. */
(function () {
  "use strict";
  var E = window.EINHEIT;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bild(id) { var r = ""; E.BILDER.forEach(function (b) { if (b.id === id) r = b.bild; }); return r; }

  var ITEMS_A = ["Ich bin besonders oft intrinsisch motiviert in Bereichen, die ich gut beherrsche.", "Ich vermeide Tätigkeiten, die ich nicht beherrsche.", "Wenn ich eine positive Rückmeldung für meine Leistung erhalte, fühle ich mich besser.", "Fächer, in denen ich keine guten Noten habe, erlebe ich weniger positiv.", "Wenn ich in einer Stunde nicht mitkomme, sehe ich ständig auf die Uhr.", "Ich lese einen Text eher freiwillig, wenn ich mich in dem Thema gut auskenne.", "Wenn ich die Möglichkeit habe, wähle ich die Fächer ab, in denen ich nicht gut bin."];
  var W_A = [{ id: "a1", text: "Wann fühlen wir uns nach Harter am ehesten kompetent?", opt: [
    ["wenn die Aufgabe leicht ist", "kaum", "Eine zu leichte Aufgabe zeigt nicht, was man kann. Man ist unterfordert und langweilt sich eher."],
    ["wenn wir eine gute Note bekommen", "begruendbar", "Rückmeldung kann das Kompetenzerleben stärken. Entscheidend ist aber, ob die Aufgabe zum eigenen Können passt."],
    ["wenn die Aufgabe weder zu leicht noch zu schwer ist", "zentral", "Dann erlebt man, dass das eigene Können den Unterschied macht."]] }];
  var W_B1 = [{ id: "b1", stimmkarte: true, text: "Deine Vorhersage: Was passiert am dritten Termin in der freien Zeit?", opt: [
    ["Die Gruppe mit Geld puzzelt mehr – sie ist ja geübt und motiviert.", "kaum", "Klingt logisch, ist aber nicht eingetreten. Genau das macht den Befund so überraschend.", "mehr"],
    ["Es gibt keinen Unterschied – Geld hat mit Spaß nichts zu tun.", "begruendbar", "Eine vorsichtige Vermutung. Der Befund zeigt aber einen Unterschied.", "kein Unterschied"],
    ["Die Gruppe mit Geld puzzelt weniger als vorher.", "zentral", "So kam es. Wer bezahlt wurde, hörte eher auf, als das Geld wegfiel.", "weniger"]] }];
  var W_B2 = [{ id: "b2", text: "Josefs Lehrerin lobt ihn ehrlich für einen guten Lösungsweg. Untergräbt das seine Motivation?", opt: [
    ["Ja – jede Belohnung untergräbt die Freude.", "kaum", "Das geht zu weit. Der Effekt betrifft vor allem erwartete, greifbare Belohnungen für das Tun."],
    ["Nein – ehrliches Lob stärkt eher sein Kompetenzerleben.", "zentral", "Lob, das informiert (»dein Lösungsweg ist klar«), wirkt in Studien eher positiv."],
    ["Es kommt darauf an, ob das Lob kontrollierend wirkt.", "begruendbar", "Gut beobachtet: Lob wie »Siehst du, so musst du es machen« kann Druck erzeugen. Ehrliches Lob für einen Lösungsweg tut das meist nicht."]] }];
  var W_C = [{ id: "c1", text: "»Beliebte Kinder haben höhere Motivationswerte.« – Was folgt daraus?", opt: [
    ["Beliebtheit macht Kinder motiviert.", "kaum", "Das sagt der Befund nicht. Er zeigt nur, dass beides zusammen auftritt."],
    ["Beides tritt zusammen auf. Ob das eine das andere verursacht, bleibt offen.", "zentral", "Genau: Es könnte auch umgekehrt sein (motivierte Kinder werden beliebter), oder ein Drittes beeinflusst beides."],
    ["Nichts – solche Studien sind wertlos.", "kaum", "Ein Zusammenhang ist ein wichtiger Hinweis. Er beweist nur keine Ursache."]] }];
  var BED = ["Kompetenz", "Selbstbestimmung", "soziale Eingebundenheit"];
  var W_JOSEF = [
    { id: "j1", text: "Wo würdest du bei Josef zuerst ansetzen?", opt: [
      ["bei der sozialen Eingebundenheit", "kaum", "Hier steht Josef vergleichsweise gut da: Er hat eine Gruppe und freut sich manchmal auf die Schule."],
      ["bei der Kompetenz", "zentral", "»Ich check es ohnehin nicht«: Josef erlebt sich als unfähig. Aufgaben, die weder zu leicht noch zu schwer sind, und ehrliche Rückmeldung setzen genau hier an."],
      ["bei der Selbstbestimmung", "begruendbar", "Auch begründbar: Belohnung und Enttäuschung der Eltern verlagern den Grund nach außen. Solange er nicht glaubt, es zu schaffen, hilft mehr Wahlfreiheit aber wenig."]] },
    { id: "j2", text: "Was bewirkt die versprochene Belohnung der Eltern nach Deci und Ryan am ehesten?", opt: [
      ["Sie untergräbt Josefs Freude an Mathe.", "begruendbar", "Der Gedanke passt zum Unterminierungseffekt. Der setzt aber voraus, dass Josef vorher Freude an Mathe hatte – die ist gerade weg."],
      ["Sie macht Josef intrinsisch motiviert.", "kaum", "Eine Belohnung von außen ist extrinsisch. Sie kann Verhalten anstoßen, aber nicht Freude an der Sache erzeugen."],
      ["Sie setzt außen an (external) und stärkt sein Kompetenzerleben nicht.", "zentral", "Wer nicht glaubt, es zu schaffen, dem hilft ein Anreiz wenig. Das Bedürfnis, das am wenigsten erfüllt ist, bleibt unberührt."]] }
  ];
  var STELLEN = [
    { id: "am", titel: "Amotivation", text: "keine Motivation" },
    { id: "ex", titel: "external", text: "Belohnung, Strafe" },
    { id: "in", titel: "introjiziert", text: "innerer Druck, Gewissen" },
    { id: "id", titel: "identifiziert", text: "selbst für wichtig gehalten" },
    { id: "ig", titel: "integriert", text: "gehört zu mir, passt zu allem" },
    { id: "it", titel: "intrinsisch", text: "um der Sache willen" }
  ];
  var KARTEN = [
    ["»Ich lerne Vokabeln, weil meine Eltern mir sonst das Handy wegnehmen.«", "ex", "Der Anstoß kommt von außen: einer Strafe entgehen."],
    ["»Ich mache die Hausaufgaben, weil ich sonst ein schlechtes Gewissen hätte.«", "in", "Niemand zwingt dich von außen. Der Druck kommt von innen, gehört aber nicht zu dir."],
    ["»Ich bereite mich aufs Abitur vor, weil ich ein Studium anstrebe, das ich mir selbst ausgesucht habe.«", "id", "Du hältst das Ziel selbst für wichtig. Das Lernen bleibt Mittel zum Zweck."],
    ["»Ich trainiere, weil Gesundheit zu dem gehört, wer ich sein will – und es passt zu allem, was mir wichtig ist.«", "ig", "Das Ziel ist Teil des Selbst und steht mit keinem anderen Ziel im Konflikt."],
    ["»Ich lese über Psychologie, weil mich das Thema einfach packt.«", "it", "Die Freude liegt in der Tätigkeit selbst."],
    ["»Ich poste jeden Tag eine Story, weil ich mich sonst wie ein Außenseiter fühle.«", "in", "Es geht um deinen Selbstwert. Das ist innerer Druck, kein eigenes Ziel."],
    ["»Ich gehe zur Nachhilfe, weil es dafür 20 € Taschengeld extra gibt.«", "ex", "Eine Belohnung von außen steuert das Verhalten."],
    ["»Ich sehe nicht, wozu das gut sein soll. Ich mache einfach nichts.«", "am", "Hier gibt es keinen Grund und kein Ziel – weder von außen noch von innen."]
  ];
  var W_ALI = [{ id: "ali", text: "Ali möchte unbedingt Psychologie studieren und lernt dafür. Wo steht er auf dem Kontinuum?", opt: [
    ["intrinsisch", "kaum", "Das Lernen dient dem Studienplatz. Es ist Mittel zum Zweck, nicht Selbstzweck."],
    ["identifiziert", "zentral", "Ali hält das Ziel selbst für wichtig. Deci und Ryan nennen fast genau dieses Beispiel: Abitur fürs selbst gewählte Studium. Extrinsisch – und doch selbstbestimmt."],
    ["integriert", "begruendbar", "Möglich, wenn das Studium zu allem passt, was Ali wichtig ist. Der Fall verrät dazu aber nichts."]] }];
  var ITEMS_R = [
    ["… weil ich sonst Ärger bekomme.", "ex"], ["… weil ich mich sonst schlecht fühlen würde.", "in"], ["… weil ich es für mich wichtig finde.", "id"], ["… weil es mir Spaß macht.", "it"],
    ["… weil es von mir verlangt wird.", "ex"], ["… weil ich will, dass andere mich für gut halten.", "in"], ["… weil es mir hilft, meine Ziele zu erreichen.", "id"], ["… weil ich die Inhalte spannend finde.", "it"]
  ];
  var REG_NAME = { ex: "external", in: "introjiziert", id: "identifiziert", it: "intrinsisch" };
  var W_GESCHICHTE = [
    { id: "k4", text: "Bild 1: " + bild("k4") + " Niemand verlangt das von ihm. – Wo steht er jetzt auf dem Kontinuum?", opt: [
      ["identifiziert", "kaum", "Er hält das Arbeiten nicht für wertvoll. Es ist nur noch Weg zur Münze."],
      ["introjiziert", "zentral", "Der Druck kommt von innen, gehört aber nicht zu ihm: Er kann nicht anders, obwohl es ihn unglücklich macht."],
      ["external", "begruendbar", "Die Münze ist ein Anreiz außerhalb des Tuns. Aber niemand von außen belohnt oder bestraft ihn – er treibt sich selbst."]] },
    { id: "k5", text: "Bild 2: " + bild("k5") + " – Passt der Unterminierungseffekt?", opt: [
      ["Ja, genau: Die Belohnung untergräbt seine Freude.", "begruendbar", "Das Ergebnis ist ähnlich. Aber im Experiment gab es das Geld für das Tun. Hier nicht."],
      ["Teilweise: Das Ergebnis ist ähnlich, eine Bedingung fehlt.", "zentral", "Die Freude verschwindet, weil sich der Grund nach außen verschiebt – wie im Experiment. Die Münzen waren aber keine erwartete Belohnung für die Arbeit."],
      ["Nein, das hat damit nichts zu tun.", "kaum", "Zu schnell abgetan: Der Wechsel von Freude am Tun zur Arbeit für ein Ziel ist der Kern beider Fälle."]] },
    { id: "k6", text: "Bild 3: " + bild("k6") + " – Welches Bedürfnis geht ihm mit der Jagd nach der Münze vor allem verloren?", opt: [
      ["Selbstbestimmung", "zentral", "Er tut nicht mehr, was er will, sondern was die Münze verlangt. Er ist nicht mehr frei."],
      ["Kompetenz", "kaum", "Er kann seine Arbeit weiterhin gut. Er arbeitet sogar mehr."],
      ["soziale Eingebundenheit", "begruendbar", "Möglich, wenn er sich von anderen zurückzieht. Den Kern trifft es nicht."]] }
  ];

  function kontBild() {
    var x = [70, 190, 310, 430, 550, 690], lab = ["Amotivation", "external", "introjiziert", "identifiziert", "integriert", "intrinsisch"];
    var s = '<svg class="k-svg" viewBox="0 0 780 160" role="img" aria-label="Kontinuum der Regulation von links nach rechts: Amotivation, external, introjiziert, identifiziert, integriert, intrinsisch. Von nicht selbstbestimmt zu selbstbestimmt. Extrinsisch sind die vier mittleren Formen.">';
    s += '<path class="l-text" d="M132 34 V24 H608 V34"/><text x="370" y="16" text-anchor="middle" class="t-klein">extrinsische Motivation</text>';
    s += '<polygon class="f-petrol-hi" points="20,132 760,96 760,132"/><path class="l-leise" d="M20 132 L760 96"/>';
    lab.forEach(function (l, i) { s += '<circle cx="' + x[i] + '" cy="' + (128 - (x[i] - 20) / 740 * 36 + 4) + '" r="6" class="f-text"/><text x="' + x[i] + '" y="62" text-anchor="middle">' + l + "</text>"; });
    s += '<text x="20" y="154" class="t-leise t-klein">nicht selbstbestimmt</text><text x="760" y="154" text-anchor="end" class="t-leise t-klein">selbstbestimmt</text></svg>';
    return s;
  }
  var GRUPPEN6 = { a: "Selbstbestimmung (selbst einteilen, aussuchen)", k: "Kompetenz (das Gefühl, es zu schaffen)", s: "soziale Eingebundenheit (Team, zusammen)", v: "Vorgaben (Zeit, Ort, Inhalt vorgegeben)" };
  function mittel(a, gruppe, liste) {
    var v = liste.map(function (x, i) { return x[1] === gruppe ? a[i] : null; }).filter(function (v) { return v !== null && v !== undefined; });
    return v.length ? v.reduce(function (s, z) { return s + z; }, 0) / v.length : null;
  }

  window.STUNDE = {
    id: "ds07", minuten: 90, material: "nach M4 und M5",
    frage: "Was braucht ein Mensch, damit er etwas von sich aus tut?",
    darum: "<p>In Stunde 1 blieb eine Frage offen: Kann man für ein Ziel außerhalb der Sache lernen – und es trotzdem selbst wollen? Heute folgst du drei Spuren zu drei Grundbedürfnissen, ordnest Gründe auf einem Kontinuum und liest den Kreis der 99 ein zweites Mal.</p>",
    ziele: ["die drei Grundbedürfnisse nach Deci und Ryan erklären,", "Gründe für eine Handlung auf dem Kontinuum der Regulation einordnen,", "die Botschaft einer Geschichte mit der Theorie prüfen."],
    auftraege: [
      { id: "a1", nr: "1", titel: "Erst erinnern", sozial: "allein, ohne Heft", min: 4, oeffnet: "offen", bloecke: [
        { typ: "abruf", min: 3, fragen: E.MERK.ds06.abruf, antworten: [
          "Ein Motiv ist ein Beweggrund, den man von außen nicht sieht. Motivation ist der Vorgang, in dem er jetzt Verhalten in Gang setzt und auf ein Ziel ausrichtet.",
          "Zielrichtung, Ausdauer, Intensität.",
          "Er ist stark motiviert, aber anders: von intrinsisch (Freude am Tun) zu extrinsisch (Arbeit für die Münze)."] },
        { typ: "eigen", bauen: function (c) {
          var t = (c.D.st.ds06 && c.D.st.ds06.skala && c.D.st.ds06.skala.m1) || {};
          return '<p class="k-klein">' + (Object.keys(t).length ? "Dein Selbsttest aus Stunde 1 ist auf diesem Gerät. Du brauchst ihn am Ende der Stunde." : "Dein Selbsttest aus Stunde 1 ist nicht auf diesem Gerät. Hast du ihn als Datei gesichert, lade ihn im Register unten. Sonst geht es auch ohne.") + "</p>";
        } }
      ] },
      { id: "a2", nr: "2", titel: "Spur 1: Wann bleibe ich gern dran?", sozial: "allein", min: 8, oeffnet: "nach", zusatz: "Spur 1 von 3", bloecke: [
        { typ: "text", html: "<p>Deci und Ryan nehmen an: Jeder Mensch hat drei angeborene <b>Grundbedürfnisse</b>. Sind sie erfüllt, tritt intrinsische Motivation eher auf. Welche drei? Folge den Spuren und stelle bei jeder eine Vermutung auf.</p>" },
        { typ: "skala", id: "kompetenz", stufen: "fuenf", items: ITEMS_A, einleitung: "Ein kurzer Selbsttest: Wie sehr trifft jeder Satz auf dich zu?" },
        { typ: "fest", id: "hypA", luecke: true, label: "Ich bin besonders häufig intrinsisch motiviert, wenn ich mich dabei … fühle.", platzhalter: "ein Wort", mind: 3, max: 60, zeilen: 1, kurz: "Meine Vermutung zu Spur 1 (ein Wort)" },
        { typ: "karten", karten: [{ art: "honig", titel: "Grundbedürfnis nach Kompetenz", html: "<p>Menschen wollen sich beim Handeln als fähig erleben. Wird das erfüllt, steigt die Wahrscheinlichkeit für intrinsische Motivation. Kompetent fühlen wir uns, wenn eine Aufgabe <b>weder zu leicht noch zu schwer</b> ist (Harter 1978). Positive Rückmeldung kann das Kompetenzerleben stärken.</p><p class=\"k-klein\">Aber: Man kann sich beim Vokabellernen kompetent fühlen, ohne intrinsisch motiviert zu sein. Kompetenz allein reicht nicht.</p>" }] },
        { typ: "wahl", items: W_A }
      ] },
      { id: "a3", nr: "3", titel: "Spur 2: Puzzeln für Geld", sozial: "allein", min: 9, oeffnet: "nach", zusatz: "Spur 2 von 3", bloecke: [
        { typ: "befund", status: "belegte Quelle · vereinfacht", quelle: "Deci (1971), Journal of Personality and Social Psychology 18", html: "<p><b>Ein Experiment:</b> Studierende lösen an drei Terminen knifflige Legepuzzles. Am zweiten Termin bekommt eine Gruppe für jedes gelöste Puzzle Geld, die andere nicht. Am dritten Termin gibt es für niemanden Geld. Zwischendurch verlässt der Versuchsleiter jeweils für einige Minuten den Raum. Die Personen dürfen tun, was sie wollen: weiterpuzzeln, Zeitschriften lesen, nichts tun.</p>" },
        { typ: "wahl", items: W_B1 },
        { typ: "befund", status: "belegte Quelle · vereinfacht", html: "<p><b>Befund:</b> Die Gruppe, die Geld bekommen hatte, beschäftigte sich am dritten Termin in der freien Zeit <b>weniger</b> mit den Puzzles als vorher. Die andere Gruppe nicht. Das nennt man <b>Unterminierungseffekt</b>: Eine Belohnung von außen kann die Freude an einer Tätigkeit untergraben.</p>" },
        { typ: "fest", id: "hypB", luecke: true, label: "Die Belohnung hat den Personen das Gefühl genommen, … zu sein.", platzhalter: "ein Wort", mind: 3, max: 60, zeilen: 1, kurz: "Meine Vermutung zu Spur 2 (ein Wort)" },
        { typ: "karten", karten: [{ art: "honig", titel: "Grundbedürfnis nach Selbstbestimmung (Autonomie)", html: "<p>Menschen wollen erleben, dass sie selbst entscheiden, was sie tun. Kommt eine Belohnung dazu, verschiebt sich der Grund nach außen: »Ich tue es fürs Geld«. Je mehr wir eine Handlung als frei gewählt erleben, desto wahrscheinlicher ist intrinsische Motivation.</p>" }] },
        { typ: "kasten", art: "info", titel: "Wann der Effekt auftritt", html: "<p>Eine Auswertung von 128 Experimenten zeigt: Untergraben wird die Freude vor allem durch <b>erwartete, greifbare</b> Belohnungen (Geld, Preise), die man <b>für das Tun</b> bekommt. Ehrliches Lob stärkt die Motivation eher. Eine Überraschung danach schadet kaum (Deci, Koestner &amp; Ryan 1999). Wie stark der Effekt ist, wird bis heute diskutiert.</p>" },
        { typ: "wahl", items: W_B2 }
      ] },
      { id: "a4", nr: "4", titel: "Spur 3: Was andere mit mir zu tun haben", sozial: "allein", min: 8, oeffnet: "nach", zusatz: "Spur 3 von 3", bloecke: [
        { typ: "befund", status: "belegte Quelle · zusammengefasst", quelle: "nach Wigfield u. a. (2006) und Jerusalem & Schwarzer (1991), aus dem Unterrichtsmaterial M4", html: "<ul><li>Kinder, die in ihrer Gruppe beliebt sind, haben höhere Motivationswerte als wenig beliebte Kinder.</li><li>Kooperatives Lernen hat meist positive Wirkungen auf die Lern- und Leistungsmotivation.</li><li>Jugendliche halten Aktivitäten mit Gleichaltrigen für besonders wichtig.</li><li>In Klassen mit schlechtem Klima zeigten Lernende mehr Hilflosigkeit und Angst und weniger Selbstwertgefühl als in Klassen mit gutem Klima.</li></ul>" },
        { typ: "fest", id: "hypC", luecke: true, label: "Ich bin besonders häufig intrinsisch motiviert, wenn ich mich … fühle.", platzhalter: "ein bis zwei Wörter", mind: 3, max: 60, zeilen: 1, kurz: "Meine Vermutung zu Spur 3" },
        { typ: "karten", karten: [{ art: "honig", titel: "Grundbedürfnis nach sozialer Eingebundenheit", html: "<p>Menschen wollen sich mit anderen verbunden fühlen und vertrauensvolle Beziehungen aufbauen. Das erklärt, warum Anerkennung so stark wirkt. Und es beeinflusst Interessen: Man übernimmt zum Beispiel das Hobby einer Freundin.</p>" }] },
        { typ: "text", html: "<h3>Denkwerkzeug: Zusammenhang oder Ursache?</h3>" },
        { typ: "wahl", items: W_C }
      ] },
      { id: "a5", nr: "5", titel: "Was braucht Josef?", sozial: "zu zweit", min: 8, oeffnet: "ansage", bloecke: [
        { typ: "karten", status: "ausgedachter Fall", karten: [{ art: "honig", titel: "Zur Erinnerung", html: "<p>Josef war an der Realschule gut, besonders in Mathe. Jetzt ist keine Arbeit besser als 3–4. »Ich check es ohnehin nicht.« Er ist in einer kleinen Gruppe mit Ali, Melissa und Slobodan und freut sich manchmal sogar auf die Schule. Sein Vater ist enttäuscht. Die Eltern versprechen eine Belohnung, wenn aus jeder 3–4 eine 3 wird.</p>" }] },
        { typ: "text", html: "<p>Wie gut ist jedes Bedürfnis bei Josef gerade erfüllt? Tippe an und nenne einen Beleg aus dem Fall.</p>" },
        { typ: "eigen",
          erledigt: function (S) { var j = S.josef || {}; return BED.every(function (b, i) { return j.wert && j.wert[i] && ((j.beleg || {})[i] || "").trim().length >= 5; }); },
          druck: function (c) { var j = c.S.josef || {}; return "<p><b>Josef in drei Bedürfnissen</b></p><table><thead><tr><th>Bedürfnis</th><th>meine Einschätzung (1–5)</th><th>mein Beleg</th></tr></thead><tbody>" + BED.map(function (b, i) { return "<tr><td>" + b + "</td><td>" + ((j.wert || {})[i] || "") + "</td><td>" + esc((j.beleg || {})[i] || "") + "</td></tr>"; }).join("") + "</tbody></table>"; },
          bauen: function (c) {
            var S = c.S; if (!S.josef) S.josef = { wert: {}, beleg: {} }; var J = S.josef; J.wert = J.wert || {}; J.beleg = J.beleg || {};
            var n = c.el('<div class="k-test">' + BED.map(function (b, i) {
              return '<fieldset class="k-item" style="grid-template-columns:1fr"><legend><b>' + b + '</b></legend><div class="k-stufen">' + [1, 2, 3, 4, 5].map(function (v) {
                return '<label><input type="radio" name="jo' + i + '" value="' + v + '"' + (J.wert[i] === v ? " checked" : "") + '><span aria-hidden="true">' + v + '</span><span class="k-sr">' + (v === 1 ? "kaum erfüllt" : v === 5 ? "voll erfüllt" : "Stufe " + v) + "</span></label>";
              }).join("") + '<span class="k-klein" style="align-self:center">1 kaum · 5 voll erfüllt</span></div><label class="k-feld" style="margin:0">Beleg aus dem Fall<textarea rows="1" maxlength="160" data-beleg="' + i + '"></textarea></label></fieldset>';
            }).join("") + "</div>");
            c.$$("[data-beleg]", n).forEach(function (t) { t.value = J.beleg[t.getAttribute("data-beleg")] || ""; });
            n.addEventListener("change", function (e) { if (e.target.type === "radio") { J.wert[e.target.name.slice(2)] = +e.target.value; c.aktualisieren(); } });
            n.addEventListener("input", function (e) { var b = e.target.getAttribute("data-beleg"); if (b !== null) { J.beleg[b] = e.target.value; c.aktualisieren(); } });
            return n;
          } },
        { typ: "wahl", items: W_JOSEF }
      ] },
      { id: "a6", nr: "6", titel: "Vom Muss zum Wollen", sozial: "allein, dann Plenum", min: 17, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p>Zurück zur offenen Frage: Ali lernt fürs Studium – extrinsisch und trotzdem aus eigenem Antrieb? Deci und Ryan sagen: Extrinsische Motivation gibt es in vier Formen. Sie liegen auf einem <b>Kontinuum</b> zwischen fremdbestimmt und selbstbestimmt.</p>" },
        { typ: "bild", svg: kontBild(), unterschrift: "Modell: Kontinuum der Regulation, in Anlehnung an Deci &amp; Ryan (2002)" },
        { typ: "karten", karten: [
          { art: "petrol", titel: "external", html: "<p>Ich tue es, um eine Belohnung zu bekommen oder einer Strafe zu entgehen. Der Anstoß kommt von außen.</p>" },
          { art: "petrol", titel: "introjiziert", html: "<p>Ich tue es, »weil es sich gehört« oder weil ich sonst ein schlechtes Gewissen hätte. Der Druck kommt von innen, gehört aber nicht zu mir: Antreiber und Angetriebener sind verschieden, obwohl beide in mir wohnen.</p>" },
          { art: "petrol", titel: "identifiziert", html: "<p>Ich tue es, weil ich es selbst für wichtig halte. Es kann aber noch mit anderen Zielen von mir in Konflikt stehen.</p>" },
          { art: "petrol", titel: "integriert", html: "<p>Ich tue es, weil das Ziel zu mir gehört und zu meinen anderen Zielen passt. Es bleibt Mittel zum Zweck – das unterscheidet es von intrinsisch.</p>" }
        ] },
        { typ: "text", html: "<p class=\"k-klein\">Den Weg von links nach rechts nennen Deci und Ryan <b>Internalisierung</b>: Werte und Regeln von außen werden zu eigenen. Theorie der organismischen Integration nach Deci &amp; Ryan (1993).</p><h3>Lege die Karten auf das Kontinuum</h3><p>Tippe eine Karte an, dann die Stelle, an die sie gehört. Ab fünf Karten kannst du den Zwischenstand prüfen.</p>" },
        { typ: "sortieren", id: "kontinuum", karten: KARTEN, faecher: STELLEN, satz: true, fertigText: "Lies die Karten von links nach rechts: Je weiter rechts, desto mehr gehört der Grund zu dir selbst." },
        { typ: "text", html: "<h3>Und Ali?</h3>" },
        { typ: "wahl", items: W_ALI },
        { typ: "text", html: "<h3>Warum lerne ich?</h3><p>Denk an ein Fach, für das du gerade lernst. Du musst es nicht nennen.</p>" },
        { typ: "skala", id: "regulation", stufen: "vier", stamm: "Ich lerne für dieses Fach, …", items: ITEMS_R.map(function (x) { return x[0]; }) },
        { typ: "eigen", bauen: function (c) {
          var n = c.el('<div class="k-karte k-karte--honig"><h3>Deine Gründe für dieses Fach</h3><div class="k-balken" data-x></div><p class="k-klein">Mehrere Gründe zugleich sind normal. Der Bogen ist angelehnt an Fragebögen von Ryan und Connell (1989), aber nicht geprüft und keine Diagnose. Integriert fehlt, weil es sich mit so kurzen Sätzen kaum von identifiziert trennen lässt.</p></div>');
          n.kNeu = function () {
            var a = c.S.skala.regulation || {};
            c.$("[data-x]", n).innerHTML = ["ex", "in", "id", "it"].map(function (k) {
              var m = mittel(a, k, ITEMS_R) || 0;
              return "<div><b>" + REG_NAME[k] + '</b><span role="img" aria-label="' + REG_NAME[k] + ": " + c.wort(m) + '"><i style="width:' + Math.round(m / 3 * 100) + '%"></i></span><small>Diesen Gründen ' + c.wort(m) + ".</small></div>";
            }).join("");
          };
          n.kNeu();
          return n;
        } }
      ] },
      { id: "a7", nr: "7", titel: "Der Kreis der 99 – zweite Lektüre", sozial: "allein, dann Plenum", min: 12, oeffnet: "ansage", bloecke: [
        { typ: "geschichte", titel: "Der Kreis der 99 – zweite Lektüre", wie: "Zuhören · kurz zusammengefasst", hoerauftrag: "In Stunde 1 hast du die Geschichte übersetzt. Jetzt prüfst du sie mit dem, was du heute gelernt hast." },
        { typ: "wahl", items: W_GESCHICHTE },
        { typ: "sprachen" }
      ] },
      { id: "a8", nr: "8", titel: "Verorten und vernetzen", sozial: "allein, dann am Board", min: 6, oeffnet: "nach", bloecke: [
        { typ: "verorten" },
        { typ: "text", html: "<h3>Eine Verbindung knüpfen</h3>" },
        { typ: "verbindung", einleitung: "Verbinde einen Begriff von heute mit einem aus Stunde 1. Zum Beispiel: Was hat eine erwartete Belohnung mit extrinsischer Motivation zu tun?" },
        { typ: "text", html: "<h3>Deine Lernspur</h3>" },
        { typ: "lernspur", satzanfang: "Ein Muss wird eher zum Wollen, wenn …" }
      ] },
      { id: "a9", nr: "9", titel: "Stimmt die Botschaft?", sozial: "allein", min: 12, oeffnet: "nach", bloecke: [
        { typ: "schreiben", id: "botschaft", operator: "Stellung nehmen", mind: 50,
          aufgabe: "Eine Lesart der Geschichte lautet: <em>»Wer immer mehr will, verliert seine Freude.«</em> Beurteile diese Botschaft mit der Selbstbestimmungstheorie: Wo hat die Geschichte recht, wo greift sie zu kurz?",
          hinweis: "Schreibe fünf bis acht Sätze und nutze mindestens zwei Begriffe von heute.",
          beispiel: "<p>»Die Geschichte hat recht, wenn sie zeigt, wie der Diener seine Freude verliert: Am Anfang arbeitet er intrinsisch motiviert, denn … Nach Deci und Ryan kommt es aber nicht darauf an, ob man mehr will, sondern …«</p>",
          satzanfaenge: ["Die Geschichte hat recht, wenn …, denn beim Diener …", "Nach Deci und Ryan kommt es aber nicht darauf an, ob man mehr will, sondern …", "Ein Gegenbeispiel ist …, der/die sein Ziel selbst gewählt hat und …", "Insgesamt halte ich die Botschaft für …, weil …"],
          wortspeicher: ["Selbstbestimmung", "Kompetenz", "soziale Eingebundenheit", "external", "introjiziert", "identifiziert", "integriert", "Internalisierung", "Unterminierungseffekt"],
          kriterien: [
            ["Grundlegend", "Ich ordne den Diener vorher und nachher mit Fachbegriffen ein."],
            ["Sicher", "Ich erkläre mit der Theorie, warum die Freude verschwindet, und nenne, wo die Geschichte recht hat."],
            ["Souverän", "Ich zeige außerdem mit einem Gegenbeispiel, wo die Botschaft zu weit geht (selbst gewählte Ziele), und komme zu einem begründeten Urteil."]],
          muster: "<p>Die Geschichte hat recht, was den Diener betrifft: Am Anfang arbeitet er intrinsisch motiviert – er singt bei der Arbeit, obwohl ihm niemand etwas verspricht. Mit der Jagd nach der hundertsten Münze verschiebt sich sein Grund nach außen; er fühlt sich getrieben, obwohl niemand etwas von ihm verlangt (introjiziert). Nach Deci und Ryan geht ihm dabei vor allem die Selbstbestimmung verloren – darum verschwindet die Freude. Die Botschaft greift aber zu kurz: Nicht das Mehr-Wollen selbst raubt die Freude, sondern ein Ziel, das nicht zu einem gehört. Ali will viel – er will unbedingt Psychologie studieren – und lernt dafür identifiziert, also selbstbestimmt. Ich halte die Botschaft deshalb nur teilweise für richtig: Wer mehr will, verliert seine Freude vor allem dann, wenn das Ziel von außen oder durch inneren Druck gesetzt ist.</p>" },
        { typ: "text", html: "<h3>Ein Blick auf dich</h3><p><span class=\"k-pille k-pille--privat\">Nur für dich · freiwillig</span></p>" },
        { typ: "eigen", bauen: function (c) {
          var d6 = c.D.st.ds06 || {}, t = (d6.skala && d6.skala.m1) || {}, h = (d6.fest && d6.fest.hypo) || "", html = "";
          if (Object.keys(t).length) {
            html += "<p>In Stunde 1 hast du angetippt, wann du motiviert bist. Viele Sätze gehörten heimlich zu den drei Bedürfnissen:</p><ul>";
            ["a", "k", "s", "v"].forEach(function (k) { var m = mittel(t, k, E.M1); if (m !== null) html += "<li><b>" + GRUPPEN6[k] + ":</b> Diesen Sätzen " + c.wort(m) + ".</li>"; });
            html += "</ul>";
            if (h) html += '<p>Deine Vermutung aus Stunde 1:</p><blockquote class="k-dein-text">Ich bin vor allem dann motiviert, wenn ' + esc(h) + "</blockquote>";
          } else html += '<p class="k-klein">Dein Selbsttest aus Stunde 1 ist nicht auf diesem Gerät. Du kannst die Frage trotzdem beantworten.</p>';
          var ta = c.S.skala.kompetenz || {}, n = Object.keys(ta).length;
          if (n) { var a = Object.keys(ta).reduce(function (s, i) { return s + ta[i]; }, 0) / n; html += "<p>Im Kompetenz-Bogen von heute lag dein Durchschnitt eher " + (a >= 3.5 ? "im oberen" : a >= 2.5 ? "im mittleren" : "im unteren") + " Bereich.</p>"; }
          return "<div>" + html + '<p class="k-klein">Das sind Hinweise aus kurzen Bögen, kein Urteil über dich. Du entscheidest, was davon stimmt.</p></div>';
        } },
        { typ: "fest", id: "selbst", optional: true, label: "Welches der drei Bedürfnisse ist dir beim Lernen besonders wichtig? Begründe mit einem Beispiel. (freiwillig)", platzhalter: "Mir ist … besonders wichtig. Das merke ich zum Beispiel, wenn …", mind: 15, max: 500, kurz: "Ein Blick auf mich (freiwillig)" },
        { typ: "kann", items: ["Ich kann die drei Grundbedürfnisse erklären und mit einem Befund belegen.", "Ich kann Gründe für eine Handlung auf dem Kontinuum einordnen.", "Ich kann die Botschaft einer Geschichte mit der Theorie prüfen."] },
        { typ: "text", html: "<details class=\"k-hilfe\"><summary>Für Schnelle</summary><p>Wähle ein Spiel oder eine App, die du gern nutzt. Zeige an je einem Beispiel, wie sie Kompetenz, Selbstbestimmung und soziale Eingebundenheit anspricht. Wo nutzt sie extrinsische Anreize?</p></details>" }
      ] }
    ],
    merkseite: Object.assign({}, E.MERK.ds07, {
      extra2: "<h2>Kontinuum der Regulation</h2>" + kontBild()
    })
  };
})();
