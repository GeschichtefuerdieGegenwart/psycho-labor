/* Stunde 6 · Wie lese ich mich selbst? – Vom Wollen zum Tun (Rubikon knapp), Wenn-dann-Pläne, Geschichten analysieren.
   Abschluss der Einheit und Probeaufgabe für die Klassenarbeit (Ampel-Raster). */
(function () {
  "use strict";
  var E = window.EINHEIT;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  /* Eine unbekannte Fabel für den Zugang »ohne Hilfe« – in eigenen Worten nach Äsop (gemeinfrei). Bewusst nicht in EINHEIT.BILDER,
     damit sie nicht in der Übersetzungstabelle der Einheit erscheint. */
  var FUCHS = [
    { id: "fu1", kurz: "springt nach den Trauben", bild: "Der Fuchs springt immer wieder nach den Trauben – sie hängen zu hoch.", fach: "hoher Wert, die Erfolgserwartung sinkt mit jedem Fehlsprung; Ausdauer und Intensität zeigen seine Motivation" },
    { id: "fu2", kurz: "gibt auf", bild: "Nach vielen Sprüngen gibt er auf und geht weg.", fach: "Erwartung gegen null: Er löst sich von einem Ziel, das er nicht erreicht" },
    { id: "fu3", kurz: "»zu sauer«", bild: "Im Weggehen sagt er, die Trauben seien ihm ohnehin zu sauer.", fach: "Er senkt nachträglich den Wert des Ziels – das schützt seinen Selbstwert" }
  ];
  function bildVon(id) { var r = null; E.BILDER.concat(FUCHS).forEach(function (b) { if (b.id === id) r = b; }); return r; }

  function rubikonBild() {
    /* Schrift ab 18 Einheiten, lange Fragen in zwei Zeilen: wirksam mindestens 16 px, auch am iPad hochkant */
    var bx = [20, 236, 410, 584], w = 156, y = 96, h = 88, namen = ["abwägen", "planen", "handeln", "bewerten"], fragen = [["Will ich das?"], ["Wann, wo, wie?"], ["dranbleiben"], ["Hat es sich", "gelohnt?"]];
    var s = '<svg class="k-svg" viewBox="0 0 760 236" role="img" aria-label="Rubikon-Modell: vier Phasen nacheinander. Abwägen, ob ich etwas will – dann der Fluss Rubikon, die Entscheidung – planen, handeln, bewerten. Abwägen und Bewerten sind Motivation, Planen und Handeln sind Volition.">';
    s += '<path class="f-wasser" d="M190 40 C202 70 176 100 190 130 S178 190 190 210 L222 210 C210 190 236 160 222 130 S234 70 222 40 Z"/>';
    s += '<text x="206" y="30" text-anchor="middle" class="t-18">Rubikon</text><text x="206" y="232" text-anchor="middle" class="t-leise t-18">Entscheidung</text>';
    s += '<path class="l-leise" d="M20 66 V56 H176 V66 M584 66 V56 H740 V66"/><path class="l-text" d="M236 66 V56 H566 V66"/>';
    s += '<text x="98" y="48" text-anchor="middle" class="t-18">Motivation</text><text x="401" y="48" text-anchor="middle" class="t-18">Volition</text><text x="662" y="48" text-anchor="middle" class="t-18">Motivation</text>';
    bx.forEach(function (x, i) {
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" class="' + (i === 1 || i === 2 ? "f-honig" : "f-flaeche") + '"/>';
      s += '<text x="' + (x + w / 2) + '" y="' + (y + 30) + '" text-anchor="middle" class="t-gross">' + namen[i] + "</text>";
      fragen[i].forEach(function (z, j) { s += '<text x="' + (x + w / 2) + '" y="' + (y + 56 + j * 22) + '" text-anchor="middle" class="t-18">' + z + "</text>"; });
      if (i > 0 && i < 3) s += '<path class="l-text" d="M' + (bx[i] + w + 2) + " " + (y + h / 2) + " H" + (bx[i + 1] - 6) + " M" + (bx[i + 1] - 12) + " " + (y + h / 2 - 6) + " L" + (bx[i + 1] - 5) + " " + (y + h / 2) + " L" + (bx[i + 1] - 12) + " " + (y + h / 2 + 6) + '"/>';
    });
    s += '<path class="l-text" d="M' + (bx[0] + w + 2) + " " + (y + h / 2) + " H" + (bx[1] - 6) + " M" + (bx[1] - 12) + " " + (y + h / 2 - 6) + " L" + (bx[1] - 5) + " " + (y + h / 2) + " L" + (bx[1] - 12) + " " + (y + h / 2 + 6) + '"/>';
    return s + "</svg>";
  }

  /* Analyse einer Geschichte: Bilder auf den Motivationskreis legen */
  var GESCH = {
    "99": { titel: "Der Kreis der 99", bilder: ["k6", "k1", "k2", "k4", "k3", "k5"] },
    elefant: { titel: "Der angekettete Elefant", bilder: ["el1", "el2", "el3", "el4", "el5"] },
    froesche: { titel: "Die Frösche in der Sahne", bilder: ["fr1", "fr2", "fr3", "fr4"] },
    fuchs: { titel: "Der Fuchs und die Trauben", knopf: "Neu: Der Fuchs und die Trauben", bilder: ["fu1", "fu2", "fu3"], ohneHilfe: true }
  };
  var analyse = {
    typ: "eigen",
    erledigt: function (S) { var A = S.analyse; return !!(A && A.g && Object.keys((A.lage || {})[A.g] || {}).length >= 3); },
    druck: function (c) {
      var A = c.S.analyse; if (!A || !A.g) return "";
      var L = (A.lage || {})[A.g] || {};
      return "<p><b>Meine Analyse: " + GESCH[A.g].titel + "</b></p><table><thead><tr><th>Bild</th><th>Station im Kreis</th><th>Fachsprache</th></tr></thead><tbody>" + GESCH[A.g].bilder.filter(function (id) { return L[id]; }).map(function (id) { var b = bildVon(id); return "<tr><td>" + esc(b.bild) + "</td><td>" + esc(c.stationName(L[id])) + "</td><td>" + esc(b.fach) + "</td></tr>"; }).join("") + "</tbody></table>";
    },
    bauen: function (c) {
      var S = c.S; if (!S.analyse) S.analyse = { g: null, lage: {} }; var A = S.analyse; A.lage = A.lage || {};
      var n = c.el('<div class="k-analyse"><p><b>Wähle eine Geschichte.</b> Eine der drei bekannten – mit Hilfe, wenn du sie brauchst – oder die unbekannte Fabel, ganz ohne Hilfe. In der Klassenarbeit kann eine unbekannte Geschichte kommen.</p><div class="k-schalter-zwei" role="group" aria-label="Geschichte wählen">' + Object.keys(GESCH).map(function (k) { return '<button type="button" data-geschichte="' + k + '">' + (GESCH[k].knopf || GESCH[k].titel) + "</button>"; }).join("") + '</div><div data-tab></div><div data-kreis></div></div>');
      function malen() {
        c.$$("[data-geschichte]", n).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-geschichte") === A.g)); });
        if (!A.g) { c.$("[data-tab]", n).innerHTML = ""; c.$("[data-kreis]", n).innerHTML = ""; return; }
        var L = A.lage[A.g] || (A.lage[A.g] = {});
        var G = GESCH[A.g];
        c.$("[data-tab]", n).innerHTML = (G.ohneHilfe
          ? '<div class="k-kasten k-kasten--info"><div class="k-kasten__kopf">Eine Geschichte, die du noch nicht kennst</div><p><span class="k-pille">nacherzählt nach Äsop</span></p><p>Ein hungriger Fuchs sieht reife Trauben hoch an einer Rebe hängen. Er springt immer wieder danach, erreicht sie aber nicht. Schließlich gibt er auf, geht weg und sagt: »Die sind mir ohnehin zu sauer.«</p></div><p>In welcher Station des Motivationskreises wirkt jedes Bild? Lege alle drei Bilder – ohne Hilfe, wie in der Klassenarbeit.</p>'
          : '<p>In welcher Station des Motivationskreises wirkt jedes Bild? Lege mindestens drei Bilder. Versuche es zuerst ohne Hilfe.</p>') + G.bilder.map(function (id) {
          var b = bildVon(id);
          return '<div class="k-analyse__zeile"><div><p>' + esc(b.bild) + "</p>" + (G.ohneHilfe ? "" : '<details class="k-hilfe k-hilfe--klein"><summary>Hilfe: Fachsprache zeigen</summary><p>' + esc(b.fach) + "</p></details>") + '</div><select data-bild="' + id + '" aria-label="Station für: ' + esc(b.kurz) + '"><option value="">Station wählen</option>' + E.STATIONEN.map(function (st) { return '<option value="' + st.id + '"' + (L[id] === st.id ? " selected" : "") + ">" + esc(st.name) + "</option>"; }).join("") + "</select></div>";
        }).join("");
        var chips = {};
        Object.keys(L).forEach(function (id) { var b = bildVon(id); (chips[L[id]] = chips[L[id]] || []).push('<span class="k-chip k-chip--bild">' + esc(b.kurz) + "</span>"); });
        c.$("[data-kreis]", n).innerHTML = '<h4 style="margin:var(--space-4) 0 var(--space-2)">' + esc(GESCH[A.g].titel) + " im Motivationskreis</h4>" + c.kreisHTML({ chips: chips, klein: true });
      }
      n.addEventListener("click", function (e) { var b = e.target.closest("[data-geschichte]"); if (b) { A.g = b.getAttribute("data-geschichte"); malen(); c.aktualisieren(); } });
      n.addEventListener("change", function (e) { var id = e.target.getAttribute("data-bild"); if (id) { var L = A.lage[A.g]; if (e.target.value) L[id] = e.target.value; else delete L[id]; malen(); c.aktualisieren(); var s = c.$('[data-bild="' + id + '"]', n); if (s) s.focus(); } });
      malen();
      return n;
    }
  };

  var MUSTER = {
    "99": "<p><b>Darstellen:</b> Ein Diener arbeitet fröhlich und singend für seinen König, ohne dass ihm jemand etwas verspricht. Als er einen Beutel mit 99 Goldmünzen findet, will er unbedingt die hundertste haben – er arbeitet mehr als je zuvor, kommt nicht mehr zur Ruhe und verliert seine Freude.</p><p><b>Theorien:</b> Deci und Ryan unterscheiden intrinsische Motivation (um der Sache willen) und extrinsische (für ein Ziel außerhalb der Tätigkeit). Intrinsische Motivation entsteht eher, wenn Kompetenz, Selbstbestimmung und soziale Eingebundenheit erfüllt sind. Extrinsische Motivation reicht auf einem Kontinuum von external bis integriert. Der Unterminierungseffekt beschreibt, dass erwartete Belohnungen für das Tun die Freude untergraben können.</p><p><b>Anwenden:</b> Am Anfang ist der Diener intrinsisch motiviert. Die fehlende Münze ist ein Ziel außerhalb der Arbeit; er wird zunehmend introjiziert reguliert – getrieben von innerem Druck, der nicht zu ihm gehört. Dabei geht vor allem seine Selbstbestimmung verloren. Der Unterminierungseffekt passt nur teilweise: Die Münzen waren ein Geschenk, kein Lohn für sein Tun.</p><p><b>Botschaft und Urteil:</b> Die Geschichte sagt: Wer immer mehr will, verliert seine Freude. Das stimmt für Ziele, die nicht zu einem gehören. Wer aber ein selbst gewähltes Ziel verfolgt – wie Ali sein Studium –, kann viel wollen und trotzdem selbstbestimmt bleiben. Die Botschaft trifft also einen wichtigen Kern, ist als Regel für alle aber zu pauschal.</p>",
    elefant: "<p><b>Darstellen:</b> Ein großer Zirkuselefant ist mit einer Kette an einen kleinen Pflock gebunden. Er könnte ihn mühelos herausreißen, versucht es aber nicht. Als kleiner Elefant hatte er tagelang vergeblich am Pflock gezerrt und schließlich aufgegeben. Seitdem glaubt er, dass er es nicht kann.</p><p><b>Theorien:</b> Erlernte Hilflosigkeit (Seligman): Wer erlebt, dass sein Handeln nichts bewirkt, erwartet das auch später und versucht es nicht mehr. Die Attributionstheorie fragt, wie Menschen sich Ergebnisse erklären: internal oder external, stabil oder instabil, kontrollierbar oder nicht.</p><p><b>Anwenden:</b> Der kleine Elefant lernt, dass sein Ziehen nichts bewirkt. Der große überträgt diese Erfahrung auf eine neue Lage – erlernte Hilflosigkeit. Er erklärt sein Scheitern internal, stabil und nicht kontrollierbar (»Ich bin zu schwach«). Weil er seine Kraft nie wieder prüft, fehlt ihm der temporale Vergleich: Sein Selbstkonzept ist veraltet. Nach Bandura würde ihm vor allem eine eigene Erfolgserfahrung helfen – die stärkste Quelle der Selbstwirksamkeit.</p><p><b>Botschaft und Urteil:</b> Die Geschichte sagt: Wir halten vieles für unmöglich, nur weil es einmal nicht ging – versuche es wieder. Das deckt sich mit der Forschung: Die Erfahrung, etwas bewirken zu können, schützt (Maier &amp; Seligman 2016). Zu kurz greift sie, wenn sie so klingt, als wäre jede Grenze nur eingebildet. Manche Ziele sind wirklich unerreichbar; dann geht Loslassen oft mit mehr Wohlbefinden einher (Wrosch u. a. 2003). Ich halte die Botschaft deshalb für überwiegend richtig, wenn man sie als Aufforderung versteht, alte Überzeugungen zu prüfen.</p>",
    froesche: "<p><b>Darstellen:</b> Zwei Frösche fallen in einen Topf mit Sahne und kommen nicht vom Fleck. Der erste fragt, welchen Sinn es hat, sich für eine aussichtslose Sache abzustrampeln, hört auf und geht unter. Der zweite hält die Lage ebenfalls für aussichtslos, strampelt aber weiter. Die Sahne wird zu Butter, und er springt heraus.</p><p><b>Theorien:</b> Nach dem Erwartungs-Wert-Modell von Eccles und Wigfield hängt Motivation von der Erfolgserwartung und dem Wert ab; vereinfacht gesagt: Ist einer der beiden Faktoren fast null, bleibt die Motivation klein. Das Rubikon-Modell unterscheidet das Abwägen (Motivation) vom Umsetzen und Dranbleiben (Volition).</p><p><b>Anwenden:</b> Beim ersten Frosch sinkt die Erfolgserwartung auf null. Herauszukommen wäre ihm viel wert – aber viel Wert mal null Erwartung ergibt null: Er gibt auf. Den zweiten kann man auf zwei Weisen lesen. Entweder liegt sein Wert im Kämpfen selbst, und er erwartet, weiterkämpfen zu können – dann erklärt ihn das Modell. Oder das Modell stößt hier an eine Grenze, weil es sich erst nachträglich anpasst. Sicher ist: Er hat den Rubikon überschritten und bleibt mit Willenskraft dabei (Volition). Sein Erfolg wirkt zurück und dürfte seine Erwartung beim nächsten Mal heben.</p><p><b>Botschaft und Urteil:</b> Die Geschichte sagt: Wer nur lange genug kämpft, schafft alles. Sie erzählt aber einen Einzelfall – wer genauso kämpfte und unterging, erzählt keine Geschichte. Die Forschung zeigt außerdem: Wer sich von wirklich unerreichbaren Zielen löst und neue sucht, berichtet oft über mehr Wohlbefinden (Wrosch u. a. 2003). Durchhalten lohnt sich, wenn ein Ziel erreichbar ist und das eigene Handeln etwas bewirken kann. Als allgemeine Regel halte ich die Botschaft für falsch, als Mutmacher in einer offenen Lage für hilfreich.</p>",
    fuchs: "<p><b>Darstellen:</b> Ein hungriger Fuchs sieht reife Trauben hoch an einer Rebe. Er springt immer wieder danach, erreicht sie aber nicht. Schließlich gibt er auf und sagt im Weggehen, die Trauben seien ihm ohnehin zu sauer.</p><p><b>Theorien:</b> Nach dem Erwartungs-Wert-Modell von Eccles und Wigfield hängt Motivation davon ab, ob jemand erwartet, ein Ziel zu erreichen, und welchen Wert es für ihn hat; vereinfacht gesagt: Ist einer der beiden Faktoren fast null, bleibt die Motivation klein. Die Attributionstheorie fragt, wie Menschen sich ein Ergebnis erklären. Viele erklären einen Misserfolg so, dass ihr Selbstwert geschützt bleibt.</p><p><b>Anwenden:</b> Am Anfang ist der Wert hoch – der Fuchs ist hungrig –, und er erwartet, die Trauben zu erreichen. Er springt immer wieder (Ausdauer, Intensität). Mit jedem Fehlsprung sinkt seine Erfolgserwartung, bis er aufgibt. Mit dem Satz »zu sauer« senkt er nachträglich auch den Wert des Ziels: Nicht er ist gescheitert, das Ziel war nichts wert. So schützt er seinen Selbstwert. Ob ein anderer Weg zum Ziel führt – eine Kiste, ein niedrigerer Ast –, prüft er nicht.</p><p><b>Botschaft und Urteil:</b> Die Fabel sagt: Was man nicht erreicht, redet man sich schlecht. Das ist gut beobachtet. Loslassen kann aber klug sein: Wer sich von wirklich unerreichbaren Zielen löst, berichtet oft über mehr Wohlbefinden (Wrosch u. a. 2003). Ungünstig wird es, wenn das Abwerten verhindert, einen anderen Weg zu suchen. Ich halte die Botschaft deshalb für treffend als Warnung vor Selbsttäuschung – nicht als Urteil über jedes Aufgeben.</p>"
  };

  window.STUNDE = {
    id: "ds11", minuten: 90, material: "Abschluss der Einheit",
    frage: "Wie komme ich vom Wollen zum Tun – und welche Geschichte erzähle ich mir dabei?",
    darum: "<p>Die letzte Stunde der Einheit. Zuerst geht es um die Lücke zwischen Wollen und Tun – und einen kleinen Plan, der sie schließt. Dann liest du die Frösche ein zweites Mal und prüfst ihre Botschaft. Am Ende analysierst du selbst eine Geschichte – so, wie es die Klassenarbeit verlangt.</p>",
    ziele: ["das Rubikon-Modell erklären und einen Wenn-dann-Plan formulieren,", "zwischen einem Einzelfall und einem Befund unterscheiden,", "eine Geschichte mit Motivationstheorien analysieren und zu ihrer Botschaft Stellung nehmen."],
    auftraege: [
      { id: "a1", nr: "1", titel: "Erst erinnern", sozial: "allein, ohne Heft", min: 5, oeffnet: "offen", bloecke: [
        { typ: "abruf", min: 4, fragen: ["Was besagt der Fischteicheffekt?", "Erwartung mal Wert: Warum hilft Josefs Belohnung wenig?", "Was ist der Unterschied zwischen intrinsischer und extrinsischer Motivation?"], antworten: [
          "Bei gleicher Leistung ist das Fähigkeitsselbstkonzept in einer leistungsstarken Gruppe niedriger als in einer schwächeren.",
          "Sie erhöht nur den Wert. Solange seine Erfolgserwartung klein ist, bleibt auch die Motivation klein.",
          "Intrinsisch: um der Sache willen, das Ziel liegt in der Handlung. Extrinsisch: Mittel zum Zweck, das Ziel liegt außerhalb."], danach: "Die Fragen stammen aus Stunde 5, 3 und 1. Was du über Wochen abrufen kannst, sitzt auch in der Klassenarbeit." }
      ] },
      { id: "a2", nr: "2", titel: "Vom Wollen zum Tun", sozial: "Plenum, dann allein", min: 12, oeffnet: "ansage", bloecke: [
        { typ: "text", html: "<p>Im Jahr 49 v. Chr. überschritt Julius Caesar mit seinen Truppen den <b>Rubikon</b>, einen kleinen Fluss in Norditalien. Damit begann ein Bürgerkrieg – es gab kein Zurück mehr.</p><p>Heinz Heckhausen und Peter Gollwitzer (1987) nutzen dieses Bild für jede Handlung: Erst wägt man ab, ob man etwas will. Ist die Entscheidung gefallen, ist der Fluss überschritten. Jetzt geht es nicht mehr um das Ob, sondern um das Wie.</p>" },
        { typ: "bild", svg: rubikonBild(), min: 680, name: "Schaubild Rubikon-Modell", unterschrift: "Modell: Rubikon-Modell der Handlungsphasen, nach Heckhausen &amp; Gollwitzer (1987), vereinfacht" },
        { typ: "karten", karten: [
          { art: "honig", titel: "Motivation", html: "<p>Abwägen, ob ich etwas will – und hinterher bewerten, ob es sich gelohnt hat. Hier wirken Erwartung und Wert.</p>" },
          { art: "petrol", titel: "Volition", html: "<p>Den Willen umsetzen: planen, anfangen, dranbleiben, auch wenn es zäh wird oder etwas ablenkt.</p>" }
        ] },
        { typ: "text", html: "<h3>Josef und die Nachhilfe</h3><p>Lege jeden Schritt in die passende Phase.</p>" },
        { typ: "sortieren", id: "rubikon", satz: true, faecher: [
          { id: "abwaegen", titel: "abwägen", text: "Will ich das?" }, { id: "planen", titel: "planen", text: "Wann, wo, wie?" },
          { id: "handeln", titel: "handeln", text: "dranbleiben" }, { id: "bewerten", titel: "bewerten", text: "Hat es sich gelohnt?" }],
          karten: [
            ["Josef überlegt, ob sich Nachhilfe lohnt.", "abwaegen", "Er wägt ab – noch vor der Entscheidung."],
            ["Er legt fest: dienstags um 16 Uhr, in der Bibliothek.", "planen", "Wann und wo – das ist Planen."],
            ["Er rechnet die Aufgaben, auch als es zäh wird.", "handeln", "Dranbleiben trotz Widerstand – Handeln."],
            ["Nach vier Wochen fragt er sich: Hat es etwas gebracht?", "bewerten", "Rückblick auf das Ergebnis – Bewerten."],
            ["Er fragt sich, ob er das überhaupt schafft.", "abwaegen", "Die Frage nach der Erwartung gehört zum Abwägen."],
            ["Er nimmt sich vor: Wenn ich nach Hause komme, packe ich zuerst das Matheheft aus.", "planen", "Ein Wenn-dann-Plan – geplant für später."],
            ["Er schaltet das Handy stumm, als eine Nachricht kommt.", "handeln", "Ablenkung abwehren – Willenskraft beim Handeln."],
            ["Er merkt, dass ihm die Nachhilfe hilft, und will weitermachen.", "bewerten", "Er bewertet das Ergebnis – und das wirkt auf das nächste Abwägen zurück."]
          ], fertigText: "Lies die Phasen von links nach rechts: Zwischen »abwägen« und »planen« liegt der Rubikon." },
        { typ: "wahl", items: [{ id: "rb1", text: "Wo liegt der Rubikon in Josefs Geschichte?", opt: [
          ["vor dem Abwägen", "kaum", "Vor dem Abwägen ist noch nichts entschieden – der Fluss liegt dahinter."],
          ["zwischen Abwägen und Planen – als er sich entscheidet", "zentral", "Mit der Entscheidung ist der Fluss überschritten. Jetzt geht es um das Wie."],
          ["zwischen Handeln und Bewerten", "kaum", "Dann wäre die Handlung schon vorbei. Der Rubikon trennt das Wollen vom Umsetzen."]] }] }
      ] },
      { id: "a3", nr: "3", titel: "Ein Plan für die Lücke", sozial: "allein", min: 8, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p>Viele Vorsätze scheitern nicht am Wollen, sondern am Anfangen: Der richtige Moment geht vorbei. Ein <b>Wenn-dann-Plan</b> (Vorsatz) verknüpft eine Situation mit einer Handlung: <i>Wenn</i> die Situation eintritt, <i>dann</i> tue ich das.</p>" },
        { typ: "befund", status: "belegte Quelle · vereinfacht", quelle: "Gollwitzer & Sheeran (2006), Advances in Experimental Social Psychology 38", html: "<p>Eine Auswertung von 94 Studien zeigt: Menschen mit Wenn-dann-Plänen erreichten ihre Ziele deutlich häufiger als Menschen, die sich ihr Ziel nur vornahmen – die Wirkung war mittel bis groß.</p>" },
        { typ: "karten", karten: [{ art: "honig", titel: "So baust du einen Wenn-dann-Plan", html: "<ul><li><b>Wenn</b> – eine genaue Situation: wann, wo, was passiert gerade?</li><li><b>dann</b> – eine kleine, konkrete Handlung, die du sofort tun kannst.</li></ul><p class=\"k-klein\">Beispiel: »Wenn ich nach dem Abendessen den Tisch abgeräumt habe, dann löse ich zwei Aufgaben aus dem Mathebuch.«</p>" }] },
        { typ: "fest", id: "vorsatz", label: "Dein Wenn-dann-Plan – für ein eigenes Ziel oder für Josef", platzhalter: "Wenn …, dann …", mind: 10, max: 300, zeilen: 2, kurz: "Mein Wenn-dann-Plan" }
      ] },
      { id: "a4", nr: "4", titel: "Die Frösche – zweite Lektüre", sozial: "allein, dann Plenum", min: 14, oeffnet: "ansage", bloecke: [
        { typ: "geschichte", titel: "Die Frösche in der Sahne – zweite Lektüre", wie: "Zuhören · kurz zusammengefasst", hoerauftrag: "Eine Lesart der Geschichte lautet: <b>»Wer nur lange genug kämpft, schafft alles.«</b> Stimmt das?" },
        { typ: "text", html: "<h3>Denkwerkzeug: Einzelfall oder Befund?</h3>" },
        { typ: "wahl", items: [{ id: "fr4", text: "Bild: " + bildVon("fr4").bild + " – Was erfahren wir aus der Geschichte nicht?", opt: [
          ["warum der erste Frosch aufgegeben hat", "kaum", "Das erzählt die Geschichte ja – er sieht keinen Sinn mehr."],
          ["wie es den Fröschen erging, die genauso gekämpft haben und trotzdem untergingen", "zentral", "Geschichten erzählen meist von denen, die es geschafft haben. Wer genauso kämpfte und scheiterte, erzählt keine Geschichte. Aus einem Einzelfall folgt keine Regel."],
          ["wie der Frosch nach Hause kam", "kaum", "Das ist für die Botschaft unwichtig."]] }] },
        { typ: "befund", status: "belegte Quelle · vereinfacht", quelle: "Wrosch u. a. (2003), Personality and Social Psychology Bulletin 29", html: "<p>Menschen, die sich von unerreichbaren Zielen lösen konnten und sich neue Ziele suchten, berichteten über mehr Wohlbefinden als Menschen, die festhielten. Die Studien zeigen einen Zusammenhang, keinen Beweis für eine Ursache – und für einen einzelnen Menschen sagen sie nichts voraus.</p>" },
        { typ: "fest", id: "urteil", label: "Dein Urteil: Wann ist Durchhalten klug – und wann Loslassen?", platzhalter: "Durchhalten ist klug, wenn … Loslassen ist klüger, wenn …", mind: 20, max: 500, zeilen: 4, kurz: "Wann Durchhalten klug ist – und wann Loslassen" },
        { typ: "klassenbild", id: "botschaft", frage: "»Wer nur lange genug kämpft, schafft alles« – stimmt das?", optionen: ["ja", "teilweise", "nein"] },
        { typ: "kasten", art: "info", titel: "Im Gespräch", html: "<p>Urteile werden nicht vom Gerät bewertet. Vergleicht vorne: Wer hat welche Bedingungen für das Durchhalten genannt? Welche Forschung stützt sie?</p>" },
        { typ: "sprachen" }
      ] },
      { id: "a5", nr: "5", titel: "Eine Geschichte analysieren", sozial: "allein", min: 25, oeffnet: "nach", zusatz: "Probeaufgabe", bloecke: [
        { typ: "kasten", art: "auftrag", titel: "Das Analyse-Werkzeug in fünf Schritten", html: "<ol><li><b>Bild finden:</b> Was passiert, was sagt eine Figur?</li><li><b>Station zuordnen:</b> Wo im Motivationskreis wirkt das Bild?</li><li><b>Fachbegriff:</b> Welche Theorie erklärt es?</li><li><b>Botschaft formulieren:</b> Was will die Geschichte sagen?</li><li><b>Prüfen:</b> Was sagt die Forschung – wo hat die Geschichte recht, wo greift sie zu kurz?</li></ol>" },
        analyse,
        { typ: "schreiben", id: "probe", operator: "analysieren und Stellung nehmen", mind: 100, ampel: true,
          aufgabe: "Analysiere die Geschichte, die du gewählt hast, mit mindestens zwei Motivationstheorien. Nimm dann Stellung zu ihrer Botschaft.",
          hinweis: "Gib die Geschichte zuerst knapp wieder. Erkläre die Theorien, bevor du sie anwendest. Deine Bilder im Kreis sind dein Plan.",
          beispiel: "<p>»In der Geschichte … geht es um … Um sie zu verstehen, nutze ich zwei Theorien. Nach … Wendet man das auf die Geschichte an, zeigt sich: … Die Botschaft der Geschichte lautet … Die Forschung zeigt aber …, deshalb halte ich die Botschaft für …«</p>",
          satzanfaenge: ["In der Geschichte … geht es um …", "Nach der Theorie von … hängt Motivation davon ab, …", "Wendet man das auf … an, zeigt sich, dass …", "Die Botschaft der Geschichte lautet: …", "Die Forschung bestätigt …, zeigt aber auch …", "Insgesamt halte ich die Botschaft für …, weil …"],
          wortspeicher: ["intrinsisch", "extrinsisch", "introjiziert", "Selbstbestimmung", "Erfolgserwartung", "Wert", "Attribution", "erlernte Hilflosigkeit", "Selbstkonzept", "Selbstwirksamkeit", "Volition", "Einzelfall"],
          kriterien: [
            ["Darstellen", "Ich gebe die Geschichte knapp und richtig wieder."],
            ["Theorien erklären", "Ich erkläre zwei Motivationstheorien richtig und in eigenen Worten."],
            ["Anwenden", "Ich deute mindestens drei Bilder der Geschichte mit Fachbegriffen und belege sie."],
            ["Botschaft prüfen", "Ich formuliere die Botschaft und prüfe sie mit Forschung: Wo hat die Geschichte recht, wo greift sie zu kurz?"],
            ["Urteilen", "Ich komme zu einem begründeten, abgewogenen Urteil."],
            ["Sprache", "Ich schreibe zusammenhängend und nutze die Fachsprache richtig."]],
          muster: function (S) { var g = S.analyse && S.analyse.g; return g ? MUSTER[g] : Object.keys(MUSTER).map(function (k) { return MUSTER[k]; }).join("<hr>"); },
          danach: "Bei Rot oder Gelb: Lies die Zeile in der möglichen Lösung nach und ergänze deinen Text in einer anderen Farbe – in GoodNotes oder auf Papier." }
      ] },
      { id: "tom", nr: "6", titel: "Probeaufgabe: Tom", sozial: "allein", min: 20, oeffnet: "ansage", zusatz: "Probeaufgabe · 15 Punkte", bloecke: [
        { typ: "text", html: "<p>Diese Aufgabe ist so gebaut wie in der Klassenarbeit: Definition nennen, ein Verhalten mit dem Dreischritt aus Stunde 1 erklären, eine Aussage beurteilen. Die Punkte stehen dabei.</p>" },
        { typ: "karten", status: "ausgedachter Fall", karten: [{ art: "petrol", titel: "Material: Tom (16)", html: "<p>Tom sitzt in der Doppelstunde Mathematik. Er meldet sich nicht und hat das Arbeitsblatt nicht angefangen. Unter dem Tisch zeichnet er seit einer Stunde am Logo für seine Band, die in vier Wochen ihren ersten Auftritt hat. Dreimal radiert er den Schriftzug aus und beginnt neu. Als seine Sitznachbarin ihn anspricht, reagiert er nicht. Die Lehrerin sagt später: »Tom ist einfach nicht motiviert.«</p>" }] },
        { typ: "schreiben", id: "tom", operator: "nennen · erklären · beurteilen", mind: 120, ampel: true, optional: true,
          aufgabe: "1. Nenne die Definition von Motivation. (2 Punkte) 2. Erkläre Toms Verhalten mithilfe der Definition und des Dreischritts Bedingung – Form – Merkmal. (9 Punkte) 3. Beurteile die Aussage der Lehrerin. (4 Punkte)",
          hinweis: "Nummeriere die drei Teile. Kennzeichne Vermutungen. Beim Beurteilen: erst Stellung, dann Begründung am Fall, dann eine Einschränkung.",
          beispiel: "<p>»1. Motivation ist … 2. Tom zeichnet seit einer Stunde am Logo für seine Band. Dieses Verhalten lässt sich mit Motivation erklären: Er richtet sein Handeln auf den Zielzustand aus, dass …«</p>",
          satzanfaenge: ["Motivation ist die aktuelle Ausrichtung …", "Tom richtet sein Handeln vermutlich auf den Zielzustand aus, dass …", "Die Motivation entsteht, weil das Motiv … auf den Anreiz … trifft.", "Sie ist …, denn das Positive liegt …", "Erkennbar ist sie an der Zielrichtung (…), an der Intensität (…) und an der Ausdauer (…).", "Die Aussage der Lehrerin ist so nicht haltbar, weil …", "Allerdings …"],
          wortspeicher: ["Zielzustand", "vermutlich", "Motiv", "Anreiz", "intrinsisch", "extrinsisch", "Zielrichtung", "Intensität", "Ausdauer", "Beobachtung", "Vermutung"],
          kriterien: [
            ["1 Definition (2)", "Ich nenne die Definition im Wortlaut: aktuell/momentan · Ausrichtung · positiv bewerteter Zielzustand."],
            ["2 Zielzustand (2)", "Ich nenne Toms Zielzustand als Zustand und begründe, warum er ihn vermutlich positiv bewertet."],
            ["2 Bedingung (2)", "Ich nenne ein Motiv als Vermutung und den Anreiz (Auftritt in vier Wochen)."],
            ["2 Form (2)", "Ich ordne die Form zu und begründe sie am Fall – intrinsisch und extrinsisch sind beide vertretbar."],
            ["2 Merkmal (3)", "Ich belege Zielrichtung, Intensität und Ausdauer je mit einer Stelle aus dem Fall."],
            ["3 Beurteilen (4)", "Ich nehme Stellung, zeige, dass Tom auf einen anderen Zielzustand ausgerichtet ist, formuliere es treffender und schränke ein."]],
          muster: "<p><b>1.</b> Motivation ist die aktuelle Ausrichtung des momentanen Lebensvollzugs auf einen als positiv bewerteten Zielzustand.</p><p><b>2.</b> Tom zeichnet in der Mathestunde seit einer Stunde am Logo für seine Band. Dieses Verhalten lässt sich mit Motivation erklären: Er richtet sein Handeln auf den Zielzustand aus, dass das Logo fertig ist und zum Auftritt passt. Diesen Zustand bewertet er vermutlich positiv, weil ihm die Band wichtig ist. Die Motivation entsteht, weil sein Motiv – vermutlich etwas Eigenes zu gestalten oder zur Band zu gehören – auf einen Anreiz trifft: den ersten Auftritt in vier Wochen. Sie ist eher intrinsisch, denn das Zeichnen und Tüfteln selbst scheint ihn zu fesseln; vertretbar ist auch extrinsisch, wenn man das Logo als Mittel für den Auftritt sieht. Erkennbar ist die Motivation an der Zielrichtung (Logo statt Arbeitsblatt), an der Intensität (er reagiert nicht auf die Sitznachbarin) und an der Ausdauer (eine Stunde, dreimal neu begonnen).</p><p><b>3.</b> Die Aussage der Lehrerin ist so nicht haltbar. Tom zeigt Zielrichtung, Intensität und Ausdauer – er ist motiviert, aber auf einen anderen Zielzustand. Treffender wäre: Im Mathematikunterricht erkennt Tom gerade keinen Zielzustand, den er positiv bewertet. Einschränkend gilt: Die Lehrerin beobachtet zu Recht, dass er nicht mitarbeitet; Motive sind nicht sichtbar, und auch diese Erklärung bleibt eine Vermutung.</p><p class=\"k-klein\">Erwartungshorizont: 2 + 9 + 4 = 15 Punkte (AFB I 2, AFB II 9, AFB III 4).</p>",
          danach: "Bei Rot oder Gelb: Lies die Zeile in der möglichen Lösung nach und ergänze deinen Text in einer anderen Farbe." }
      ] },
      { id: "a6", nr: "7", titel: "Und du?", sozial: "allein, freiwillig", min: 4, oeffnet: "nach", bloecke: [
        { typ: "kasten", art: "privat", titel: "Nur für dich", html: "<p>Welche Geschichte aus dieser Einheit passt zu einer Situation, die du kennst – oder zu einer Figur aus einem Film oder Buch? Was würde der Motivationskreis dazu sagen?</p><p class=\"k-klein\">Freiwillig. Dein Text bleibt auf deinem Gerät und kommt nicht in die Lernmappe. Es geht ums Nachdenken, nicht um eine Diagnose.</p>" },
        { typ: "fest", id: "eigen", optional: true, druck: false, label: "Meine Gedanken (freiwillig)", mind: 10, max: 600, zeilen: 4, kurz: "Meine Gedanken zu einer Geschichte (freiwillig)" }
      ] },
      { id: "a7", nr: "8", titel: "Rückblick auf die Einheit", sozial: "allein, dann am Board", min: 8, oeffnet: "nach", bloecke: [
        { typ: "verorten" },
        { typ: "text", html: "<h3>Eine Verbindung knüpfen</h3>" },
        { typ: "verbindung", einleitung: "Die letzte Verbindung: Verbinde einen Begriff von heute mit einem aus einer früheren Stunde. Zum Beispiel: Was hat der Wenn-dann-Plan mit der Selbstwirksamkeit zu tun?" },
        { typ: "text", html: "<h3>Deine Lernspur – der letzte Satz</h3>" },
        { typ: "lernspur", satzanfang: "Was mich antreibt und was mich bremst, verstehe ich jetzt so: …" },
        { typ: "kann", items: ["Ich kann das Rubikon-Modell erklären.", "Ich kann einen Wenn-dann-Plan formulieren.", "Ich kann den Unterschied zwischen Einzelfall und Befund erklären.", "Ich kann eine Geschichte mit zwei Motivationstheorien analysieren.", "Ich kann zur Botschaft einer Geschichte Stellung nehmen."] },
        { typ: "kasten", art: "sichern", titel: "Für die Klassenarbeit", html: "<p>Auf der <a href=\"motivation.html\">Einheitsseite</a> findest du: »Das muss ich können« mit den vier Aufgabentypen, alle Lernkarten zum Üben, deinen Motivationskreis und deine Übersetzungstabelle. Sichere deinen Stand als Datei, bevor du das Gerät wechselst.</p>" }
      ] }
    ],
    merkseite: Object.assign({}, E.MERK.ds11, {
      extra2: '<h2>Rubikon-Modell <span class="d-meta">(vereinfacht)</span></h2>' + rubikonBild()
    })
  };
})();
