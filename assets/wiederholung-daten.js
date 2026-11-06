/* Inhalte der Wiederholung Wahrnehmung (vor Klassenarbeit 1).
   Status: Begriffe und Befunde wie in den Lernübersichten DS 2–5 und im Kursmaterial; Fälle und Personen sind ausgedacht.
   Jede Option: [Text, "ok" | "teil" | "nein", Erklärung]. */
(function () {
  "use strict";
  var Q3 = window.FIGUREN_DS03 && window.FIGUREN_DS03.quiz;
  function bild(name, label) { return function () { return '<svg viewBox="0 0 400 300" role="img" aria-label="' + label + '">' + Q3[name]() + "</svg>"; }; }

  var W = {};
  W.runden = [
    { id: "grund", titel: "1 · Was ist Wahrnehmung?", ds: "Grundlagen und DS 2", fragen: [
      { id: "g1", thema: "Definition von Wahrnehmung", text: "Welche Definition von Wahrnehmung ist vollständig?", opt: [
        ["Wahrnehmung ist das Aufnehmen von Reizen aus der Umwelt über die Sinnesorgane, vor allem über Augen und Ohren.", "nein", "Es fehlen die Körperreize, die Verarbeitung im Gehirn und das Ergebnis."],
        ["Wahrnehmung ist der Prozess und das Ergebnis der Informationsgewinnung und -verarbeitung von Reizen aus der Umwelt und dem Körperinneren.", "ok", "Genau: Prozess und Ergebnis, Umwelt- und Körperreize – so lautet die Definition aus dem Unterricht (nach Hobmair)."],
        ["Wahrnehmung ist ein genaues Abbild der Wirklichkeit, das die Sinnesorgane an das Gehirn weiterleiten, wo es unverändert gespeichert wird.", "nein", "Wahrnehmung ist selektiv und subjektiv – also gerade kein genaues Abbild."]] },
      { id: "g2", thema: "Umweltreiz und Körperreiz", text: "Lina spürt vor ihrem Referat Bauchschmerzen. Was für ein Reiz ist das?", opt: [
        ["ein Umweltreiz", "nein", "Umweltreize kommen von außen, etwa eine Ampel oder Musik."],
        ["gar kein Reiz – nur ein Gefühl", "nein", "Auch Schmerzen und andere Signale aus dem Körperinneren werden wahrgenommen – als Körperreize."],
        ["ein Körperreiz", "ok", "Richtig: Der Reiz kommt aus dem Körperinneren."]] },
      { id: "g3", thema: "Ablauf des Wahrnehmungsprozesses", text: "In welcher Reihenfolge läuft der Wahrnehmungsprozess ab?", opt: [
        ["Reiz → Sinnesorgan → Weiterleitung über Nerven → Verarbeitung im Gehirn → Wahrnehmung", "ok", "Richtig. Im Gehirn wird ausgewählt, geordnet, ergänzt und gedeutet."],
        ["Sinnesorgan → Reiz → Verarbeitung im Gehirn → Weiterleitung über Nerven → Wahrnehmung", "nein", "Am Anfang steht der Reiz; das Sinnesorgan nimmt ihn auf."],
        ["Reiz → Verarbeitung im Gehirn → Sinnesorgan → Weiterleitung über Nerven → Wahrnehmung", "nein", "Der Reiz muss erst über ein Sinnesorgan aufgenommen werden, bevor das Gehirn ihn verarbeitet."]] },
      { id: "g4", thema: "Selektivität (Flacker-Test)", text: "Im Flacker-Test (DS 2) wurden Änderungen an Nebensachen oft erst spät entdeckt. Welches Merkmal der Wahrnehmung zeigt das vor allem?", opt: [
        ["Subjektivität", "teil", "Was einem wichtig erscheint, ist auch persönlich. Der Kern ist aber: Vieles kommt gar nicht bewusst an – das ist Auswahl."],
        ["Selektivität", "ok", "Genau: Bewusst sehen wir vor allem, worauf sich unsere Aufmerksamkeit richtet (Rensink u. a. 1997)."],
        ["das Gesetz der Nähe", "nein", "Gestaltgesetze erklären, wie wir Reize ordnen – nicht, warum wir Änderungen übersehen."]] },
      { id: "g5", thema: "Subjektivität", text: "Zwei Freundinnen kommen aus demselben Film. Die eine fand ihn spannend, die andere langweilig. Welches Merkmal zeigt das vor allem?", opt: [
        ["eine optische Täuschung, weil der Film bei beiden anders auf das Auge wirkt", "nein", "Beide haben dasselbe gesehen; sie bewerten und deuten es nur unterschiedlich."],
        ["Selektivität", "teil", "Vielleicht haben beide auf Verschiedenes geachtet. Der Kern ist aber die unterschiedliche Deutung derselben Reize."],
        ["Subjektivität", "ok", "Richtig: Dieselben Reize werden je nach Person unterschiedlich gedeutet."]] },
      { id: "g6", thema: "Arten von Einflussfaktoren", text: "Welcher Einflussfaktor ist ein sozialer Faktor?", opt: [
        ["Hunger, weil man vor allem Essen bemerkt", "nein", "Hunger ist ein Bedürfnis – also ein individueller Faktor."],
        ["Lärm und Hitze in einem vollen Raum", "nein", "Das sind Bedingungen der Umwelt – sonstige Faktoren."],
        ["Werte und Normen der Gesellschaft", "ok", "Richtig: Soziale Faktoren kommen von anderen Menschen, Gruppen und der Kultur."]] },
      { id: "g7", thema: "Beobachtung oder Deutung", text: "Denkwerkzeug aus DS 2: Welcher Satz ist eine Beobachtung?", opt: [
        ["Wir sehen offenbar nur, was uns gerade interessiert.", "nein", "Das ist eine Deutung – sie erklärt und verallgemeinert."],
        ["Im Durchschnitt brauchte unser Kurs 14 Sekunden pro Bild.", "ok", "Richtig: Das wurde gemessen. Eine Beobachtung beschreibt nur, was passiert ist."],
        ["Die anderen im Kurs waren einfach unaufmerksamer als ich.", "nein", "Das ist eine Deutung: ein vermuteter Grund, kein Messwert."]] }
    ] },
    { id: "ordnen", titel: "2 · Wie ordnet das Gehirn?", ds: "DS 3", fragen: [
      { id: "o1", thema: "Gesetz der Nähe", text: "Warum siehst du hier drei Paare von Spalten?", fig: Q3 && bild("naehe", "Punkte in drei Doppelspalten"), opt: [
        ["Gesetz der Ähnlichkeit", "nein", "Alle Punkte sehen gleich aus – Ähnlichkeit kann die Gruppen nicht erklären."],
        ["Gesetz der Nähe", "ok", "Richtig: Was nah beieinander liegt, sehen wir als zusammengehörig."],
        ["Gesetz der Geschlossenheit", "nein", "Hier wird keine Lücke zu einer Form ergänzt."]] },
      { id: "o2", thema: "Gesetz der Geschlossenheit", text: "Warum siehst du hier einen Kreis, obwohl nur einzelne Punkte da sind?", fig: Q3 && bild("geschlossenheit", "Punkte, die einen Kreis bilden"), opt: [
        ["Figur und Grund", "nein", "Es geht nicht darum, was Figur und was Hintergrund ist."],
        ["Gesetz der Nähe", "teil", "Die Punkte liegen in gleichem Abstand. Dass du eine geschlossene Form siehst, erklärt aber die Geschlossenheit."],
        ["Gesetz der Geschlossenheit", "ok", "Genau: Das Gehirn ergänzt Lücken zu einer geschlossenen Form."]] },
      { id: "o3", thema: "Gesetz der Ähnlichkeit", text: "Im Supermarkt wirken alle Packungen mit derselben orangefarbenen Verpackung wie eine Gruppe, obwohl sie in verschiedenen Regalen stehen. Welches Gesetz?", opt: [
        ["Gesetz der Ähnlichkeit", "ok", "Richtig: Was gleich aussieht (Farbe, Form), gehört für uns zusammen."],
        ["Gesetz der Nähe", "nein", "Die Packungen stehen gerade nicht beieinander – zusammen gehören sie wegen der gleichen Farbe."],
        ["Gesetz des gemeinsamen Schicksals", "nein", "Dafür müssten sich die Packungen gemeinsam in eine Richtung bewegen."]] },
      { id: "o4", thema: "Gemeinsames Schicksal", text: "Aus einem Schwarm fliegen einige Vögel gemeinsam nach links – sofort wirken sie wie eine eigene Gruppe. Welches Gesetz?", opt: [
        ["Gesetz der Prägnanz", "nein", "Prägnanz heißt: Wir sehen die einfachste Form. Hier geht es um Bewegung."],
        ["Gesetz des gemeinsamen Schicksals", "ok", "Richtig: Was sich gemeinsam in dieselbe Richtung bewegt, gehört für uns zusammen."],
        ["Gesetz der Ähnlichkeit", "teil", "Die Vögel sehen sich ähnlich – zur eigenen Gruppe werden sie aber erst durch die gemeinsame Bewegung."]] },
      { id: "o5", thema: "Gute Fortsetzung", text: "Eine Straße verschwindet hinter einem Hügel und taucht dahinter wieder auf. Du siehst eine durchgehende Straße. Welches Gesetz?", opt: [
        ["Gesetz der guten Fortsetzung", "ok", "Richtig: Linien sehen wir so, dass sie möglichst glatt weiterlaufen."],
        ["Gesetz der Geschlossenheit", "teil", "Auch hier wird eine Lücke ergänzt. Typisch für die Fortsetzung ist aber der glatte Verlauf einer Linie."],
        ["Figur und Grund", "nein", "Die Straße wird nicht vom Hintergrund getrennt, sondern weitergeführt."]] },
      { id: "o6", thema: "Figur und Grund", text: "Beim Bild mit Vase und zwei Gesichtern kippt die Wahrnehmung hin und her. Was zeigt das?", opt: [
        ["Das Gehirn trennt Figur und Hintergrund – und kann beides wechseln.", "ok", "Richtig: Wir sehen immer eine Figur vor einem Grund, aber nie beides gleichzeitig als Figur."],
        ["Das Auge ist kurz unscharf, deshalb springt das Bild hin und her.", "nein", "Das Bild ändert sich nicht – nur die Deutung im Gehirn kippt."],
        ["Das Gesetz der Nähe: Vase und Gesichter liegen nah beieinander.", "nein", "Es geht nicht um Abstände, sondern darum, was Figur und was Hintergrund ist."]] },
      { id: "o7", thema: "Ergänzen mit Vorwissen (top-down)", text: "Zwischen Buchstaben siehst du ein „B“, zwischen Zahlen eine „13“ – obwohl das Zeichen gleich ist. Was zeigt das?", opt: [
        ["Das Gehirn verarbeitet nur, was im Reiz steckt (bottom-up).", "nein", "Dann müssten alle dasselbe sehen. Die Umgebung verändert aber die Deutung."],
        ["Gesetz der Ähnlichkeit", "nein", "Es geht nicht um Gruppen, sondern um die Deutung eines einzelnen Zeichens."],
        ["Vorwissen und Umgebung ergänzen den Reiz (top-down).", "ok", "Richtig: Die Erwartung aus der Umgebung entscheidet mit, was wir sehen (Bruner & Minturn 1955)."]] }
    ] },
    { id: "erwart", titel: "3 · Was erwarte ich?", ds: "DS 4", fragen: [
      { id: "e1", thema: "Hypothesentheorie: Beginn der Wahrnehmung", text: "Womit beginnt nach Bruner und Postman jede Wahrnehmung?", opt: [
        ["mit einer Erwartungshypothese", "ok", "Richtig: mit einer oder mehreren Erwartungshypothesen. Sie entstehen vorher, oft unbemerkt – ausgelöst von individuellen und sozialen Faktoren."],
        ["mit einem Reiz, der ohne Erwartung ankommt", "nein", "Genau das bestreitet die Hypothesentheorie: Der Reiz wird mit einer Erwartung verglichen."],
        ["mit einem Gestaltgesetz", "nein", "Gestaltgesetze erklären das Ordnen, nicht die Erwartung vorher."]] },
      { id: "e2", thema: "Hypothesenstärke", text: "Je stärker eine Erwartungshypothese ist, …", opt: [
        ["… desto mehr Informationen braucht sie zur Bestätigung und desto weniger Gegeninformationen, um sie zu widerlegen.", "nein", "Umgekehrt: Eine starke Erwartung braucht wenige Hinweise zur Bestätigung."],
        ["… desto seltener wird sie aktiviert, weil das Gehirn lieber neue Erwartungen ausprobiert.", "nein", "Umgekehrt: Je stärker, desto eher wird sie aktiviert."],
        ["… desto weniger Informationen braucht sie zur Bestätigung und desto mehr Gegeninformationen, um sie zu widerlegen.", "ok", "Richtig – und: Je stärker, desto wahrscheinlicher wird sie überhaupt aktiviert. Das sind die drei Aussagen zur Hypothesenstärke."]] },
      { id: "e3", thema: "Umgang mit widersprechenden Reizen", text: "Was passiert im Extremfall mit Reizen, die einer starken Erwartung widersprechen?", opt: [
        ["Sie werden besonders deutlich und mit großer Aufmerksamkeit wahrgenommen.", "nein", "Bei einer starken Erwartung passiert eher das Gegenteil."],
        ["Sie werden übersehen, umgedeutet oder als unwichtig abgetan.", "ok", "Richtig – wie beim schwarzen Herz, das viele als „Pik“ meldeten (Spielkarten, DS 4)."],
        ["Sie ändern sofort und vollständig die Erwartung.", "teil", "So ist es bei einer schwachen Erwartung. Eine starke Erwartung hält dagegen."]] },
      { id: "e4", thema: "Wodurch eine Erwartung stark wird", text: "Wodurch wird eine Erwartung stark?", opt: [
        ["wenn sie ganz neu ist und man sie noch nie überprüft hat", "nein", "Neue Erwartungen sind meist schwach."],
        ["wenn sie schon oft bestätigt wurde, andere sie teilen und man kaum andere Erklärungen kennt", "ok", "Richtig – das sind wichtige Bedingungen (es gibt weitere, z. B. wie wichtig einem die Erwartung ist)."],
        ["wenn man besonders intelligent ist und sehr viel über Psychologie und das Gehirn weiß", "nein", "Die Stärke hängt an Erfahrungen und sozialen Einflüssen, nicht an Intelligenz."]] },
      { id: "e5", thema: "Primacy-Effekt", text: "Tim erfährt über die neue Mitschülerin zuerst „hilfsbereit, witzig“, später „unpünktlich“. Er findet sie sympathisch. Welcher Effekt passt am besten?", opt: [
        ["Halo-Effekt", "teil", "Auch der Halo-Effekt färbt Urteile. Hier entscheidet aber die Reihenfolge der Informationen."],
        ["Primacy-Effekt", "ok", "Richtig: Die ersten Informationen bilden den Rahmen, spätere werden passend gedeutet (Asch 1946)."],
        ["selbsterfüllende Prophezeiung", "nein", "Dafür müsste Tims Erwartung ihr Verhalten verändern."]] },
      { id: "e6", thema: "Rosenthal-Effekt (selbsterfüllende Prophezeiung)", text: "Was zeigte die Studie von Rosenthal und Jacobson (1968)?", opt: [
        ["Lehrkräfte erkennen schon nach kurzer Zeit zuverlässig, welche Kinder begabt sind, und fördern sie deshalb gezielt.", "nein", "Die „Aufblüher“ waren ausgelost – gerade nicht erkannt."],
        ["Ausgeloste „Aufblüher“ legten im Test stärker zu als die anderen Kinder – vor allem in Klasse 1 und 2.", "ok", "Richtig: Die Erwartung veränderte das Verhalten der Lehrkräfte – und damit das Ergebnis. Spätere Studien zeigen: Der Effekt ist meist klein (Jussim & Harber 2005)."],
        ["Kinder mit hohem IQ wurden von ihren Lehrkräften in allen Fächern besser bewertet als die anderen.", "nein", "Es ging um zufällig ausgewählte Kinder, nicht um Kinder mit hohem IQ."]] },
      { id: "e8", thema: "Wie die selbsterfüllende Prophezeiung wirkt", text: "Wie lässt sich erklären, dass die „Aufblüher“ stärker zulegten?", opt: [
        ["Sie erfuhren von ihrem guten Testergebnis und strengten sich deshalb mehr an.", "nein", "Nur die Lehrkräfte bekamen die Namen – nicht die Kinder."],
        ["Die Lehrkräfte förderten sie vermutlich stärker, lobten Fortschritte deutlicher und reagierten geduldiger.", "ok", "Richtig – meist unbewusst. So wird die Erwartung zur selbsterfüllenden Prophezeiung (auch Rosenthal- oder Pygmalion-Effekt)."],
        ["Sie waren schon vorher begabter als die anderen Kinder in ihrer Klasse.", "nein", "Die „Aufblüher“ wurden per Los bestimmt – sie waren nicht begabter."]] },
      { id: "e7", thema: "Einzelfall oder Befund", text: "Denkwerkzeug aus DS 4: Bei uns bemerkten einige den Trick bei den Spielkarten nicht. Was darfst du daraus schließen?", opt: [
        ["Menschen übersehen allgemein, was nicht zu ihrer Erwartung passt – das haben wir jetzt bewiesen.", "nein", "Aus wenigen Personen folgt keine Regel für alle."],
        ["Bei so wenigen Personen ist das Ergebnis wertlos und sagt gar nichts aus.", "nein", "Es beschreibt, was bei uns passiert ist, und lässt sich mit der Forschung vergleichen."],
        ["Bei uns ist das passiert – es passt zur Forschung, ist aber selbst kein Befund.", "ok", "Richtig: Ein Befund beruht auf vielen Personen und wurde wiederholt bestätigt."]] }
    ] },
    { id: "andere", titel: "4 · Was machen die anderen mit mir?", ds: "DS 5", fragen: [
      { id: "a1", thema: "Aufbau des Asch-Experiments", text: "Wie war das Asch-Experiment aufgebaut?", opt: [
        ["Die Linien waren so ähnlich lang, dass man sie auch allein kaum unterscheiden konnte.", "nein", "Die Aufgabe war eindeutig: Allein machten fast alle alles richtig (unter 1 % Fehler)."],
        ["Eine echte Versuchsperson saß mit Eingeweihten, die oft laut eine falsche Linie nannten.", "ok", "Richtig – in 12 von 18 Durchgängen; die echte Person antwortete fast zuletzt."],
        ["Mehrere echte Versuchspersonen schrieben ihre Antwort geheim auf einen Zettel.", "nein", "Die Antworten waren laut. Geheime Antworten senkten in späteren Versuchen die Anpassung."]] },
      { id: "a2", thema: "Ergebnis des Asch-Experiments (beide Seiten)", text: "Welche Beschreibung des Ergebnisses ist richtig und vollständig?", opt: [
        ["Die meisten Versuchspersonen passten sich in fast allen Durchgängen der falschen Mehrheit an.", "nein", "Ein häufiger Fehler – auch in Schulbüchern. Zwei Drittel der Antworten blieben richtig."],
        ["Fast niemand passte sich an, weil die richtige Linie für alle Versuchspersonen eindeutig zu erkennen war.", "nein", "Etwa jede dritte Antwort folgte der falschen Mehrheit."],
        ["Etwa jede dritte Antwort folgte der Mehrheit; drei von vier gingen mindestens einmal mit, jede vierte nie.", "ok", "Richtig – nenne in der Klassenarbeit immer beide Seiten."]] },
      { id: "a3", thema: "Gründe der Versuchspersonen bei Asch", text: "Was sagten die Versuchspersonen im Interview, warum sie mitgingen?", opt: [
        ["Wenige sahen es wirklich anders; viele zweifelten an sich; andere wollten nicht auffallen.", "ok", "Richtig: Meist änderte sich die Antwort, nicht das, was man sah."],
        ["Fast alle sagten, sie hätten die Linien durch die Gruppe wirklich anders gesehen als vorher allein am Tisch.", "nein", "Das waren nur wenige."],
        ["Sie waren müde und unkonzentriert, weil der Versuch sehr lange dauerte.", "nein", "Allein machten sie fast keine Fehler – der Grund war die Gruppe."]] },
      { id: "a4", thema: "Informativer Einfluss", text: "Jonas kennt sich mit Aktien nicht aus. Er kauft, was im Forum alle kaufen. Was wirkt hier vor allem?", opt: [
        ["normativer Einfluss", "teil", "Dazugehören kann mitspielen. Im Fall steht aber: Er kennt sich nicht aus – er nutzt die anderen als Information."],
        ["Halo-Effekt", "nein", "Hier färbt kein Merkmal einer Person ab."],
        ["informativer Einfluss", "ok", "Richtig: Unsicherheit – die anderen wissen es vielleicht besser."]] },
      { id: "a5", thema: "Was die Anpassung senkt", text: "Was senkte bei Asch die Anpassung deutlich?", opt: [
        ["ein einziger Verbündeter, der die richtige Linie nannte", "ok", "Richtig: Die Anpassung sank auf etwa ein Viertel des Werts. Auch geheime Antworten senkten sie."],
        ["eine noch größere Gruppe mit 15 Eingeweihten statt sechs bis acht", "nein", "Ab drei Personen stieg die Anpassung kaum noch weiter."],
        ["die Antwort laut und vor allen anderen sagen müssen", "nein", "Das war ja der normale Versuch – laut ist der Druck am größten."]] },
      { id: "a6", thema: "Halo-Effekt", text: "Eine Lehrerin liest zwei Aufsätze mit gleichem Inhalt. Den in schöner, sauberer Schrift bewertet sie besser. Welcher Effekt?", opt: [
        ["Vorurteil", "nein", "Es geht um einzelne Arbeiten, nicht um ein Urteil über eine ganze Gruppe."],
        ["Halo-Effekt", "ok", "Richtig: Ein auffälliges Merkmal (die Schrift) färbt auf ganz andere Eigenschaften (den Inhalt) ab (Thorndike 1920)."],
        ["Primacy-Effekt", "teil", "Die Schrift fällt zuerst auf. Der Kern ist aber, dass ein Merkmal auf ein anderes abfärbt – nicht die Reihenfolge."]] },
      { id: "a7", thema: "Vorurteil", text: "Was ist ein Vorurteil?", opt: [
        ["ein starres Urteil über Menschen, nur weil sie zu einer Gruppe gehören; Gegenbeispiele werden umgedeutet", "ok", "Richtig: eine besonders starke Erwartung, die andere teilen (Brücke zur Hypothesentheorie)."],
        ["ein Urteil über eine einzelne Person, das man nach dem ersten Treffen hat und später leicht wieder ändert", "nein", "Das wäre eher ein erster Eindruck. Ein Vorurteil betrifft eine ganze Gruppe."],
        ["eine Meinung über eine Gruppe, die man nach genauer Prüfung vieler Beispiele gebildet hat", "nein", "Ein Vorurteil entsteht gerade ohne genaue Prüfung."]] },
      { id: "a8", thema: "Demo oder Studie", text: "Denkwerkzeug aus DS 5: Warum ist unser Labor-Ergebnis zu den Linien kein Beweis?", opt: [
        ["weil Versuche im Labor grundsätzlich nichts über das echte Leben außerhalb des Labors aussagen können", "nein", "Laborversuche können belastbar sein – mit vielen Personen und sauberer Durchführung."],
        ["weil Asch sich geirrt hat und spätere Wiederholungen das Gegenteil gezeigt haben", "nein", "Asch wurde über 130-mal wiederholt (Bond & Smith 1996)."],
        ["weil nur wenige mitmachten und die Gruppe erfunden war – anschaulich, aber kein Beleg für alle", "ok", "Richtig: eine anschauliche Demo, keine belastbare Studie."]] }
    ] }
  ];

  W.fall = [
    { id: "f1", text: "Emir fallen vor allem die Imbissstände auf. Welcher Einflussfaktor wirkt hier vor allem?", opt: [
      ["ein sozialer Faktor", "kaum", "Niemand hat Emir etwas gesagt – der Grund liegt in ihm selbst."],
      ["ein individueller Faktor (Bedürfnis: Hunger)", "zentral", "Sein Bedürfnis lenkt die Aufmerksamkeit: Er wählt aus, was dazu passt – Selektivität."],
      ["ein sonstiger Faktor (Umwelt)", "kaum", "Die Stände sind für alle da – auffallen tun sie aber Emir wegen seines Hungers."]] },
    { id: "f2", text: "Clara versteht den knappen Gruß der Chefin als Ärger. Welcher Einflussfaktor wirkt hier vor allem?", opt: [
      ["ein sozialer Faktor (was die Freundinnen erzählt haben)", "zentral", "Die anderen haben eine Erwartung erzeugt; damit deutet sie den Gruß – Subjektivität."],
      ["ein individueller Faktor (ihre Erfahrung im letzten Job)", "begruendbar", "Ihre Unsicherheit verstärkt die Erwartung. Ausgelöst hat sie aber vor allem, was die Freundinnen gesagt haben."],
      ["ein sonstiger Faktor (der Lärm im Park)", "kaum", "Der Lärm erklärt nicht, warum sie gerade Ärger heraushört."]] },
    { id: "f3", text: "Noah bemerkt jedes Detail an der neuen Achterbahn, die anderen sehen nur „eine Bahn“. Welcher Einflussfaktor wirkt hier vor allem?", opt: [
      ["ein sonstiger Faktor (die Bahn ist groß)", "kaum", "Die Bahn ist für alle gleich groß – nur Noah sieht die Details."],
      ["ein sozialer Faktor", "kaum", "Kein anderer Mensch lenkt hier Noahs Blick."],
      ["ein individueller Faktor (Interesse und Wissen)", "zentral", "Was ihn interessiert und was er weiß, entscheidet, was er wahrnimmt."]] },
    { id: "f4", text: "Alle drei überhören die Durchsagen und sind schnell gereizt. Welcher Einflussfaktor wirkt hier vor allem?", opt: [
      ["ein sonstiger Faktor (Hitze und Lärm)", "zentral", "Die Umwelt erschwert das Hören und drückt die Stimmung – bei allen dreien."],
      ["ein individueller Faktor (Stimmung)", "begruendbar", "Gereiztheit ist eine Stimmung. Ausgelöst wird sie hier aber von Hitze und Lärm."],
      ["ein sozialer Faktor", "kaum", "Es geht nicht um andere Menschen oder Gruppen."]] },
    { id: "f5", text: "Welche Aussage über Clara beschreibt Selektivität und Subjektivität richtig?", opt: [
      ["Clara nimmt die Chefin objektiv wahr, weil sie sie zum ersten Mal sieht und noch nichts über sie weiß.", "kaum", "Gerade beim ersten Treffen wirkt die Erwartung besonders stark."],
      ["„Selektiv“ heißt, dass Clara sich ihre Meinung über die Chefin bewusst und mit Absicht aussucht.", "kaum", "Selektiv heißt: Aus vielen Reizen kommen nur manche an – meist unbemerkt."],
      ["Clara achtet vor allem auf Zeichen von Strenge (selektiv) und deutet den knappen Gruß als Ärger (subjektiv).", "zentral", "Genau: Die Faktoren steuern erst die Auswahl, dann die Deutung."]] }
  ];

  W.rasterFall = [
    ["Grundlegend", "Du erklärst Selektivität und Subjektivität richtig."],
    ["Sicher", "Du nennst die Einflussfaktoren der Person und ordnest sie ein (individuell, sozial, sonstig)."],
    ["Souverän", "Du zeigst an Details des Falls die Kette: Faktor → Erwartung → Auswahl → Deutung."]
  ];
  W.musterFall = "Clara hat von Freundinnen gehört, die Chefin sei sehr streng – ein sozialer Einflussfaktor. Dazu kommt ihre Erfahrung aus dem letzten Job, in dem sie oft unsicher war – ein individueller Faktor. Beides erzeugt eine Erwartung. Deshalb ist ihre Wahrnehmung selektiv: Sie achtet vor allem auf Zeichen von Strenge, freundliche Gesten übersieht sie eher. Und sie ist subjektiv: Den knappen Gruß deutet sie als Ärger, obwohl er auch Eile bedeuten kann. Eine andere Person könnte denselben Gruß ganz anders wahrnehmen.";

  W.diskThese = "Wer in der Gruppe mitmacht, hat keine eigene Meinung.";
  W.rasterDisk = [
    ["Grundlegend", "Du stellst das Asch-Experiment richtig dar: Aufbau und Ergebnis."],
    ["Sicher", "Du nennst Argumente für und gegen die Aussage – mit Fachbegriffen (Konformität, informativer und normativer Einfluss)."],
    ["Souverän", "Du nutzt beide Seiten des Ergebnisses, unterscheidest „etwas sagen“ von „etwas denken“ und kommst zu einem begründeten Urteil."]
  ];
  W.musterDisk = "Die Aussage behauptet: Wer sich einer Gruppe anschließt, denkt nicht selbst – Mitmachen heißt, keine eigene Meinung zu haben. Solomon Asch (1951, 1956) ließ eine echte Versuchsperson mit sechs bis acht Eingeweihten Linien vergleichen; in 12 von 18 Durchgängen nannten die Eingeweihten laut eine falsche Linie. Allein machten fast alle alles richtig. Mit der falschen Mehrheit folgte aber etwa jede dritte Antwort der Gruppe; drei von vier Personen gingen mindestens einmal mit. Für die Aussage spricht: Viele gaben eine Antwort, die nicht dem entsprach, was sie selbst sahen (Konformität). Wer so mitmacht, zeigt seine eigene Meinung nicht. Gegen die Aussage spricht: Im Interview wussten viele genau, was sie selbst sahen – sie hatten also eine eigene Meinung, sagten sie aber nicht, um nicht aufzufallen (normativer Einfluss). Andere zweifelten an ihrem Urteil und nutzten die Gruppe als Information (informativer Einfluss) – bei Unsicherheit ist das sogar vernünftig. Außerdem blieben zwei Drittel der Antworten richtig, jede vierte Person ging nie mit, und schon ein Verbündeter senkte die Anpassung stark. Insgesamt stimmt die Aussage nicht: Mitmachen zeigt oft nicht, dass jemand keine Meinung hat, sondern wie schwer es ist, sie allein gegen eine Mehrheit zu sagen.";

  W.beispiel = {
    kopf: "Wahrnehmung ist Prozess und Ergebnis. Selektiv, subjektiv. Gestaltgesetze: Nähe, Ähnlichkeit. Hypothesentheorie. Asch: Linien, Gruppe. Halo-Effekt.",
    q: { g1: 1, g2: 2, g3: 0, g4: 0, g5: 2, g6: 2, g7: 1, o1: 1, o2: 2, o3: 0, o4: 1, o5: 1, o6: 0, o7: 2, e1: 0, e2: 0, e3: 1, e4: 1, e5: 1, e6: 1, e7: 2, a1: 1, a2: 2, a3: 0, a4: 0, a5: 0, a6: 1, a7: 0, a8: 2 },
    zu: { f1: { o: 1, g: "Er hat Hunger." }, f2: { o: 1, g: "Wegen ihrer Erfahrung im alten Job." }, f3: { o: 2, g: "Er interessiert sich für Achterbahnen." }, f4: { o: 0, g: "Es ist heiß und laut." }, f5: { o: 2, g: "Erst Auswahl, dann Deutung." } },
    fall: "Bei Clara wirkt ein sozialer Faktor: Freundinnen haben gesagt, die Chefin sei streng. Dazu kommt ihre Unsicherheit aus dem letzten Job. Deshalb erwartet sie Strenge. Sie achtet vor allem darauf (selektiv) und deutet den knappen Gruß als Ärger (subjektiv), obwohl die Chefin vielleicht nur in Eile war.",
    disk: "Die Aussage behauptet, dass Menschen, die mitmachen, nicht selbst denken. Asch ließ Versuchspersonen Linien vergleichen, die Eingeweihten sagten absichtlich eine falsche Linie. Etwa jede dritte Antwort folgte der Gruppe. Dafür spricht, dass viele etwas sagten, was sie nicht sahen; das nennt man Konformität. Dagegen spricht, dass viele im Interview wussten, was richtig war, und nur nicht auffallen wollten – das ist normativer Einfluss. Zwei Drittel der Antworten blieben richtig. Insgesamt stimmt die Aussage nicht, weil man eine Meinung haben kann, ohne sie zu sagen.",
    sel: { fall: [0, 0, 1], disk: [0, 1, 1] }
  };
  window.WDH = W;
})();
