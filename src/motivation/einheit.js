/* Einheitsseite Motivation · »Dein Überblick wächst«
   Liest den Stand aller sechs Stunden aus dem gemeinsamen Speicher (psycholabor:motivation:v2).
   Zeigt nur, was schon bearbeitet ist – sonst würde die Übersicht Antworten künftiger Aufgaben vorwegnehmen. */
(function () {
  "use strict";
  var K = window.Kern, E = window.EINHEIT, $ = K.$, $$ = K.$$, esc = K.esc;
  var D = K.daten();
  if (!D.einheit) D.einheit = {};
  var EH = D.einheit; if (!EH.karten) EH.karten = {}; if (!EH.koennen) EH.koennen = {};
  var STUNDEN = K.stundenListe();

  function st(id) { return D.st[id] || {}; }
  function begonnen(id) {
    var s = st(id);
    return Object.keys(s).some(function (k) { if (k === "ort" || k === "uebernommen") return false; var v = s[k]; return v && typeof v === "object" ? Object.keys(v).length > 0 : !!v; });
  }
  function stand(id) { var s = st(id); if (s.lernspur) return { s: "fertig", t: "✓ Kreis und Lernspur" }; if (begonnen(id)) return { s: "begonnen", t: "begonnen" }; return { s: "offen", t: "noch nicht begonnen" }; }
  function naechste() { for (var i = 0; i < STUNDEN.length; i++) if (stand(STUNDEN[i].id).s !== "fertig") return STUNDEN[i]; return null; }
  var BEGONNEN = STUNDEN.filter(function (s) { return begonnen(s.id); }).map(function (s) { return s.id; });
  function istBegonnen(id) { return BEGONNEN.indexOf(id) >= 0; }

  /* ---------- Bausteine der Seite ---------- */
  function landkarte() {
    return '<ol class="k-landkarte h-lk" aria-label="Landkarte der Einheit">' + E.STUNDEN.map(function (s) {
      if (s.ka) return '<li class="k-lk-ka"><span class="k-lk"><b>' + esc(s.titel) + "</b><small>" + esc(s.kurz) + "</small></span></li>";
      var x = stand(s.id);
      return '<li data-s="' + x.s + '"><a href="' + s.datei + '"><small>Stunde ' + s.nr + "</small><b>" + esc(s.titel) + "</b><small>" + esc(s.kurz) + '</small><small class="h-status">' + x.t + "</small></a></li>";
    }).join("") + "</ol>";
  }
  function kreis() {
    var chips = {}, n = 0;
    STUNDEN.forEach(function (s) {
      K.begriffeVon(s.id).forEach(function (bid) {
        var l = K.lageVon(bid, false); if (!l) return; n++;
        (chips[l] = chips[l] || []).push('<span class="k-chip h-chip" title="Stunde ' + s.nr + '">' + esc(E.BEGRIFFE[bid].name) + '<span class="k-sr"> (Stunde ' + s.nr + ")</span></span>");
      });
    });
    return { html: K.kreisHTML({ chips: chips }), n: n };
  }
  function verbindungen() {
    var l = STUNDEN.map(function (s) { var V = st(s.id).verbindung; return V && V.fest ? "<li><b>Stunde " + s.nr + ":</b> »" + esc(K.nameBegriff(V.neu)) + "« " + esc(V.art) + " »" + esc(K.nameBegriff(V.alt)) + "« – " + esc(V.satz) + "</li>" : ""; }).join("");
    return l ? "<ul>" + l + "</ul>" : '<p class="k-klein">Noch keine Verbindungen. Am Ende jeder Stunde knüpfst du eine.</p>';
  }
  function lernspur() {
    return '<ol class="h-spur">' + STUNDEN.map(function (s) {
      var t = st(s.id).lernspur;
      return '<li data-leer="' + !t + '"><span class="h-spur__nr">' + s.nr + '</span><div><small>' + esc(s.titel) + "</small><p>" + (t ? esc(t) : "noch kein Satz") + "</p></div></li>";
    }).join("") + "</ol>";
  }
  function sprachen(druck) {
    var z = K.sprachenZeilen().filter(function (r) { return istBegonnen(r.b.ds); }), letzte = null;
    if (!z.length) return '<p class="k-klein">Die Tabelle füllt sich, sobald du die erste Geschichte übersetzt hast.</p>';
    /* Im Druck ohne »Deine Begründung«: Die Begründungen stehen in der Lernmappe jeder Stunde und hier am Bildschirm.
       So bleibt die Lernübersicht bei vier Seiten, auch mit sechs Geschichten (Fassung 2.2). */
    var sp = druck ? 2 : 3;
    return "<table" + (druck ? "" : ' class="k-tabelle"') + '><thead><tr><th scope="col">Bucays Bild</th><th scope="col">Fachsprache</th>' + (druck ? "" : '<th scope="col">Deine Begründung</th>') + "</tr></thead><tbody>" + z.map(function (r) {
      var inh = E.inhaltVon ? E.inhaltVon(r.b.geschichte, r.b.ds) : "";
      var kopf = r.b.geschichte + r.st.nr !== letzte ? '<tr><td colspan="' + sp + '"><b>' + esc(r.b.geschichte) + "</b> · Stunde " + r.st.nr + (inh ? " · zu: " + esc(inh) : "") + "</td></tr>" : "";
      letzte = r.b.geschichte + r.st.nr;
      return kopf + "<tr><td><i>" + esc(r.b.bild) + "</i></td><td>" + esc(r.b.fach) + "</td>" + (druck ? "" : '<td class="k-dein">' + esc(r.eigen) + "</td>") + "</tr>";
    }).join("") + "</tbody></table>";
  }

  /* Eine Geschichte je Inhalt – nur Zeilen begonnener Stunden, damit nichts eine spätere Aufgabe vorwegnimmt (Fassung 2.2) */
  function jeInhalt() {
    var z = (E.JE_INHALT || []).filter(function (r) { return istBegonnen(r.ds); });
    if (!z.length) return "";
    return '<h3>Eine Geschichte je Inhalt</h3><table class="k-tabelle"><thead><tr><th scope="col">Inhalt</th><th scope="col">Geschichte</th><th scope="col">Stunde</th></tr></thead><tbody>' + z.map(function (r) {
      var nr = ""; STUNDEN.forEach(function (s) { if (s.id === r.ds) nr = s.nr; });
      return "<tr><td>" + esc(r.inhalt) + "</td><td><i>" + esc(r.geschichte) + "</i></td><td>" + nr + "</td></tr>";
    }).join("") + '</tbody></table><h3 style="margin-top:var(--space-5)">Deine Übersetzungstabelle</h3>';
  }

  /* ---------- Lernkarten: Begriff → selbst erklären → umdrehen → einschätzen ---------- */
  var filter = "alle", aktuell = null, gedreht = false;
  function kartenListe() {
    var l = [];
    STUNDEN.forEach(function (s) { if (!istBegonnen(s.id)) return; E.MERK[s.id].begriffe.forEach(function (b, i) { l.push({ key: s.id + ":" + i, st: s, b: b }); }); });
    return l.filter(function (k) { return filter === "alle" || k.st.id === filter; });
  }
  function rang(key) { var v = EH.karten[key]; return v === 0 ? 0 : v === 1 ? 1 : v === undefined ? 2 : 3; }
  function kartenMalen(fokus) {
    var box = $("#h-karten"), l = kartenListe();
    var auswahl = '<label class="h-filter">Stunde <select data-h="filter"><option value="alle">alle bearbeiteten</option>' + STUNDEN.filter(function (s) { return istBegonnen(s.id); }).map(function (s) { return '<option value="' + s.id + '"' + (filter === s.id ? " selected" : "") + ">Stunde " + s.nr + ": " + esc(s.titel) + "</option>"; }).join("") + "</select></label>";
    if (!l.length) { box.innerHTML = '<p class="k-klein">Sobald du eine Stunde bearbeitet hast, erscheinen hier ihre Lernkarten – je Stunde sechs.</p>'; return; }
    var z = [0, 0, 0, 0]; l.forEach(function (k) { z[rang(k.key)]++; });
    var r = l.slice().sort(function (a, b) { return rang(a.key) - rang(b.key); });
    if (!aktuell || !l.some(function (k) { return k.key === aktuell; })) aktuell = r[0].key;
    var k = l.filter(function (x) { return x.key === aktuell; })[0];
    box.innerHTML = '<div class="k-zeile" style="justify-content:space-between">' + auswahl + '<p class="h-zaehler" aria-live="polite"><span data-r="0">noch nicht: ' + z[0] + '</span><span data-r="1">halb: ' + z[1] + '</span><span data-r="2">neu: ' + z[2] + '</span><span data-r="3">gewusst: ' + z[3] + "</span></p></div>" +
      '<div class="h-karte"><p class="h-karte__stunde">Stunde ' + k.st.nr + " · " + esc(k.st.titel) + '</p><p class="h-karte__begriff">' + esc(k.b[0]) + "</p>" +
      (gedreht
        ? '<div class="h-karte__rueck"><p><b>Bedeutung:</b> ' + k.b[1] + "</p><p><b>Beispiel:</b> " + k.b[2] + '</p><p class="k-klein">Wie gut wusstest du es?</p><div class="k-zeile" role="group" aria-label="Wie gut wusstest du es?"><button type="button" class="g-knopf g-knopf--sekundaer" data-wert="0">noch nicht</button><button type="button" class="g-knopf g-knopf--sekundaer" data-wert="1">halb</button><button type="button" class="g-knopf g-knopf--primaer" data-wert="2">gewusst</button></div></div>'
        : '<p class="k-klein">Erkläre den Begriff in eigenen Worten und nenne ein Beispiel – laut, im Kopf oder auf Papier. Erst dann umdrehen.</p><button type="button" class="g-knopf g-knopf--primaer" data-h="drehen">Umdrehen</button>') + "</div>";
    if (fokus) { var f = $(gedreht ? "#h-karten [data-wert]" : '#h-karten [data-h="drehen"]'); if (f) f.focus(); }
  }

  /* ---------- Das muss ich können ---------- */
  function koennen() {
    return '<div class="h-ka">' + E.KOENNEN.map(function (t, ti) {
      return '<section class="k-karte' + (ti % 2 ? " k-karte--petrol" : " k-karte--honig") + '"><h3>' + esc(t.typ) + "</h3><p>" + esc(t.text) + '</p><ul class="h-check">' + t.ziele.map(function (z, zi) {
        var key = ti + ":" + zi, v = EH.koennen[key];
        return '<li><span>' + esc(z) + '</span><span class="k-stufen" role="radiogroup" aria-label="' + esc(z) + '">' + ["sicher", "geht so", "noch nicht"].map(function (s, j) { return '<label><input type="radio" name="ka-' + key + '" value="' + j + '" data-ka="' + key + '"' + (v === j ? " checked" : "") + "><span>" + s + "</span></label>"; }).join("") + "</span></li>";
      }).join("") + "</ul></section>";
    }).join("") + "</div>";
  }
  function denkwerkzeuge() {
    var l = STUNDEN.filter(function (s) { return istBegonnen(s.id); });
    if (!l.length) return "";
    return '<h3>Deine Denkwerkzeuge</h3><table class="k-tabelle"><thead><tr><th scope="col">Stunde</th><th scope="col">Denkwerkzeug</th><th scope="col">Worum es geht</th></tr></thead><tbody>' + l.map(function (s) { var d = E.MERK[s.id].denkwerkzeug; return "<tr><td>" + s.nr + "</td><td><b>" + esc(d[0]) + "</b></td><td>" + d[1] + "</td></tr>"; }).join("") + "</tbody></table>";
  }

  /* ---------- Mein Motivprofil (nur für dich, zugeklappt) ---------- */
  function mittel(a, gruppe, liste) {
    var v = liste.map(function (x, i) { return x[1] === gruppe ? a[i] : null; }).filter(function (v) { return v !== null && v !== undefined; });
    return v.length ? v.reduce(function (s, z) { return s + z; }, 0) / v.length : null;
  }
  function profil() {
    var teile = [];
    var t = (st("ds06").skala || {}).m1 || {};
    if (Object.keys(t).length) {
      var G = { a: "Selbstbestimmung (selbst einteilen, aussuchen)", k: "das Gefühl, es zu schaffen", s: "zusammen mit anderen", v: "Vorgaben (Zeit, Ort, Inhalt)" };
      teile.push("<h3>Stunde 1: Wann bin ich motiviert?</h3><ul>" + ["a", "k", "s", "v"].map(function (g) { var m = mittel(t, g, E.M1); return m === null ? "" : "<li><b>" + G[g] + ":</b> Diesen Sätzen " + K.wortStufe(m) + ".</li>"; }).join("") + "</ul>" + ((st("ds06").fest || {}).hypo ? '<p>Deine Vermutung: »… vor allem dann motiviert, wenn ' + esc(st("ds06").fest.hypo) + "«</p>" : ""));
    }
    var r = (st("ds07").skala || {}).regulation || {};
    if (Object.keys(r).length) {
      var RG = [["ex", "external"], ["in", "introjiziert"], ["id", "identifiziert"], ["it", "intrinsisch"]], IR = ["ex", "in", "id", "it", "ex", "in", "id", "it"].map(function (g) { return ["", g]; });
      teile.push("<h3>Stunde 2: Warum lerne ich für ein Fach?</h3><ul>" + RG.map(function (x) { var m = mittel(r, x[0], IR); return m === null ? "" : "<li><b>" + x[1] + ":</b> Diesen Gründen " + K.wortStufe(m) + ".</li>"; }).join("") + "</ul>");
    }
    var w = st("ds08").wurf || [];
    if (st("ds08").strich) teile.push("<h3>Stunde 3: Zielspiel</h3><p>Du hast vorne die Strichliste geführt.</p>");
    else if (w.length && w[0] && w[0].l) teile.push("<h3>Stunde 3: Zielspiel</h3><p>Erster Wurf von der " + w[0].l + "-Meter-Linie. " + w.map(function (x, i) { return "Wurf " + (i + 1) + ": " + (x.l || "–") + " m, " + (x.t == null ? "–" : x.t ? "Treffer" : "daneben"); }).join(" · ") + "</p>");
    var frei = [["ds07", "selbst", "Welches Bedürfnis mir wichtig ist"], ["ds08", "unddu", "Das Modell und mein Selbsttest"], ["ds11", "eigen", "Meine Gedanken zu einer Geschichte"]].map(function (x) { var v = (st(x[0]).fest || {})[x[1]]; return v ? "<li><b>" + x[2] + ":</b> " + esc(v) + "</li>" : ""; }).join("");
    if (frei) teile.push("<h3>Deine freiwilligen Notizen</h3><ul>" + frei + "</ul>");
    return teile.length ? teile.join("") + '<p class="k-klein">Hinweise aus kurzen Bögen und Spielen – kein Urteil über dich und keine Diagnose. Du entscheidest, was davon stimmt.</p>' : '<p class="k-klein">Noch keine Selbsttests auf diesem Gerät.</p>';
  }

  /* Auf einen Blick: nur Zahlen zum eigenen Stand – nichts, was eine Antwort vorwegnimmt */
  function blick(n, k) {
    var fertig = STUNDEN.filter(function (s) { return stand(s.id).s === "fertig"; }).length;
    var alleBegriffe = STUNDEN.reduce(function (a, s) { return a + K.begriffeVon(s.id).length; }, 0);
    var karten = 0, gewusst = 0, nochNicht = 0;
    STUNDEN.forEach(function (s) { if (!istBegonnen(s.id)) return; E.MERK[s.id].begriffe.forEach(function (b, i) { karten++; var v = EH.karten[s.id + ":" + i]; if (v === 2) gewusst++; else if (v === 0) nochNicht++; }); });
    var ziele = 0, eingeschaetzt = 0; E.KOENNEN.forEach(function (t, ti) { t.ziele.forEach(function (z, zi) { ziele++; if (EH.koennen[ti + ":" + zi] !== undefined) eingeschaetzt++; }); });
    function zeile(zahl, von, text) { return '<div><dt><b>' + zahl + '</b>' + (von ? '<span> von ' + von + "</span>" : "") + "</dt><dd>" + text + "</dd></div>"; }
    return '<aside class="h-blick" aria-labelledby="t-blick"><h2 id="t-blick">Auf einen Blick</h2><dl>' +
      zeile(fertig, STUNDEN.length, "Stunden mit Kreis und Lernspur abgeschlossen") +
      zeile(k.n, alleBegriffe, "Begriffe in deinem Motivationskreis") +
      zeile(karten ? gewusst : "–", karten || "", karten ? "Lernkarten gewusst" + (nochNicht ? " · " + nochNicht + " noch nicht" : "") : "Lernkarten: erscheinen, sobald du eine Stunde bearbeitest") +
      zeile(eingeschaetzt, ziele, "Punkte aus »Das muss ich können« eingeschätzt") +
      '</dl><p class="k-klein">Alles liegt nur auf diesem Gerät. <a href="#sichern">Stand als Datei sichern</a>, bevor du das Gerät wechselst.</p></aside>';
  }

  /* ---------- Druck: Lernübersicht der Einheit (höchstens vier Seiten) ---------- */
  function druckBauen() {
    var kr = E.STATIONEN.map(function (s) {
      var bs = []; STUNDEN.forEach(function (x) { K.begriffeVon(x.id).forEach(function (bid) { if (K.lageVon(bid, false) === s.id) bs.push(E.BEGRIFFE[bid].name); }); });
      return '<div class="' + (["handeln", "ergebnis", "erklaerung"].indexOf(s.id) >= 0 ? "d-breit" : "") + '"><b>' + esc(s.name) + " – " + esc(s.frage) + "</b>" + (bs.length ? esc(bs.join(" · ")) : "–") + "</div>";
    }).join("");
    $("#druck").innerHTML =
      '<section class="d-seite"><p class="d-meta">Psycho-Labor · Einheit Motivation · Lernübersicht</p><h1>Motivation – das Wichtigste</h1><p class="d-meta">Leitfrage: ' + esc(E.LEITFRAGE) + "</p><h2>Kernsätze</h2><ol>" + STUNDEN.map(function (s) { return "<li><b>" + esc(s.titel) + "</b> " + E.MERK[s.id].kernsatz + "</li>"; }).join("") + "</ol><h2>Denkwerkzeuge</h2><table><tr><th>Stunde</th><th>Denkwerkzeug</th><th>Worum es geht</th></tr>" + STUNDEN.map(function (s) { var d = E.MERK[s.id].denkwerkzeug; return "<tr><td>" + s.nr + "</td><td>" + esc(d[0]) + "</td><td>" + d[1] + "</td></tr>"; }).join("") + "</table></section>" +
      '<section class="d-seite"><p class="d-meta">Mein Überblick</p><h2>Mein Motivationskreis <span class="d-meta">(Modell, eigene Vereinfachung)</span></h2><p class="d-meta">Ich und Umgebung → Erwartung × Wert → Motivation und Handeln → Ergebnis → Erklärung → wirkt zurück auf Ich und Erwartung.</p><div class="d-kreis">' + kr + "</div><h2>Meine Verbindungen</h2>" + verbindungen() + "<h2>Meine Lernspur</h2><ol>" + STUNDEN.map(function (s) { return "<li>" + esc(st(s.id).lernspur || "–") + "</li>"; }).join("") + "</ol></section>" +
      '<section class="d-seite" style="break-after:auto;page-break-after:auto"><p class="d-meta">Zwei Sprachen</p><h2>Bucays Bilder in Fachsprache</h2>' + sprachen(true) + "</section>" +
      '<section class="d-seite"><p class="d-meta">Vorbereitung auf die Klassenarbeit</p><h2>Das muss ich können</h2>' + E.KOENNEN.map(function (t) { return "<h3>" + esc(t.typ) + " – " + esc(t.text) + "</h3><ul>" + t.ziele.map(function (z) { return "<li>" + esc(z) + "</li>"; }).join("") + "</ul>"; }).join("") + "</section>";
  }

  /* ---------- Aufbau ---------- */
  var n = naechste(), k = kreis();
  var abschnitte = [["landkarte", "Landkarte"], ["kreis", "Motivationskreis"], ["spur", "Lernspur"], ["sprachen", "Zwei Sprachen"], ["lernkarten", "Lernkarten"], ["klassenarbeit", "Klassenarbeit"], ["profil", "Motivprofil"], ["fall", "Der Fall"], ["sichern", "Sichern"]];
  $("#app").innerHTML =
    '<header class="k-kopf"><span class="k-zeichen" aria-hidden="true">M</span><div class="k-kopf__titel"><b>Einheit Motivation</b><small>Dein Überblick wächst · sechs Doppelstunden</small></div><nav aria-label="Zurück"><a class="k-kopflink k-kopflink--haupt" href="index.html"><span aria-hidden="true">←</span> Psycho-Labor</a></nav></header>' +
    '<main class="h-seite" id="inhalt">' +
    '<section class="h-hero"><div class="h-hero__text"><p class="k-leise" style="margin:0;font-weight:700">Psychologie · Block 2 · nach Klassenarbeit&nbsp;1</p><h1>Motivation</h1><p class="k-frage">' + esc(E.LEITFRAGE) + '</p><p class="k-intro">Sechs Doppelstunden, ein Weg: erst ein Fall, dann drei Geschichten von Jorge Bucay, am Ende du selbst. Hier wächst dein Überblick – mit jeder Stunde, die du auf diesem Gerät bearbeitest.</p>' +
    (n ? '<p><a class="g-knopf g-knopf--primaer" href="' + n.datei + '">Weiter mit Stunde ' + n.nr + ": " + esc(n.titel) + ' <span aria-hidden="true">→</span></a></p>' : '<p><a class="g-knopf g-knopf--primaer" href="#lernkarten">Alle Stunden bearbeitet – jetzt üben <span aria-hidden="true">→</span></a></p>') + "</div>" + blick(n, k) + "</section>" +
    '<nav class="h-nav" aria-label="Abschnitte">' + abschnitte.map(function (a) { return '<a href="#' + a[0] + '">' + a[1] + "</a>"; }).join("") + "</nav>" +
    '<section class="h-abschnitt" id="landkarte" aria-labelledby="t-lk"><h2 id="t-lk">Landkarte</h2>' + landkarte() + "</section>" +
    '<section class="h-abschnitt" id="kreis" aria-labelledby="t-kr"><h2 id="t-kr">Dein Motivationskreis</h2><p>Hier liegen alle Begriffe, die du am Ende einer Stunde verortet hast – an der Stelle, an die du sie gelegt hast. ' + (k.n ? "" : "<b>Noch leer:</b> Am Ende jeder Stunde legst du die neuen Begriffe hinein.") + "</p>" + k.html + '<p class="k-klein">Modell: eigene Vereinfachung nach dem Grundmodell der Motivationspsychologie (Person und Situation → Motivation → Handeln), der Idee »Erwartung mal Wert« und der Attributionstheorie. Was lässt es weg? Zum Beispiel Gefühle, Gewohnheiten und Zufall.</p><h3>Deine Verbindungen</h3>' + verbindungen() + "</section>" +
    '<section class="h-abschnitt" id="spur" aria-labelledby="t-sp"><h2 id="t-sp">Deine Lernspur</h2><p class="k-frage" style="font-size:1.4rem">' + esc(E.LEITFRAGE) + "</p>" + lernspur() + "</section>" +
    '<section class="h-abschnitt" id="sprachen" aria-labelledby="t-zs"><h2 id="t-zs">Zwei Sprachen</h2><p>Bucay erzählt in Bildern, die Psychologie in Fachbegriffen. Zu jedem Inhalt gehört eine Geschichte. Darunter steht deine Übersetzungstabelle aus allen Geschichten – mit deinen Begründungen.</p>' + jeInhalt() + sprachen(false) + "</section>" +
    '<section class="h-abschnitt" id="lernkarten" aria-labelledby="t-lk2"><h2 id="t-lk2">Lernkarten</h2><p>Erst erinnern, dann umdrehen: Was du dir selbst erklären kannst, sitzt. Karten, die du noch nicht wusstest, kommen zuerst wieder.</p><div id="h-karten"></div></section>' +
    '<section class="h-abschnitt" id="klassenarbeit" aria-labelledby="t-ka"><h2 id="t-ka">Das muss ich können</h2><p>Die Klassenarbeit stellt vier Arten von Aufgaben. Schätze ehrlich ein, wo du stehst – nur für dich.</p>' + koennen() + denkwerkzeuge() + "</section>" +
    '<section class="h-abschnitt" id="profil" aria-labelledby="t-pr"><h2 id="t-pr">Mein Motivprofil</h2><details class="k-hilfe h-privat"><summary>Nur für dich – aufklappen</summary>' + profil() + "</details></section>" +
    '<section class="h-abschnitt" id="fall" aria-labelledby="t-fa"><h2 id="t-fa">Der Fall: Vier aus einer Klasse</h2>' + E.fallHTML("Den ganzen Fall lesen") + "</section>" +
    '<section class="h-abschnitt" id="sichern" aria-labelledby="t-si"><h2 id="t-si">Sichern</h2><div class="k-kasten k-kasten--sichern"><p>Alles liegt nur auf diesem Gerät. Sichere deinen Stand als Datei, bevor du das Gerät wechselst. Die Lernübersicht der Einheit (vier Seiten) passt in GoodNotes.</p><div class="k-zeile"><button type="button" class="g-knopf g-knopf--primaer" data-h="drucken">Lernübersicht als PDF sichern</button><button type="button" class="g-knopf g-knopf--sekundaer" data-h="datei">Stand als Datei sichern</button><label class="g-knopf g-knopf--sekundaer">Stand aus Datei laden<input type="file" accept="application/json,.json" class="k-sr" data-h="laden"></label></div><p class="k-klein" data-h="rueck" aria-live="polite"></p></div>' +
    '<div class="k-zeile" style="margin-top:var(--space-5)"><label class="h-filter">Ansicht <select data-h="ansicht"><option value="hell">Hell</option><option value="dunkel">Dunkel</option><option value="beamer">Beamer</option></select></label><span class="g"><label class="g-schalter" data-g="bewegung"><input type="checkbox"> Weniger Bewegung</label></span><button type="button" class="g-knopf g-knopf--still" data-h="loeschen-auf">Alle Eingaben der Einheit löschen …</button></div>' +
    '<div class="k-loeschen" data-h="loeschen" hidden style="margin-top:var(--space-3)"><b>Wirklich alle Eingaben aller sechs Stunden löschen?</b><div class="k-zeile"><button type="button" class="g-knopf g-knopf--sekundaer" data-h="loeschen-ja">Ja, alles löschen</button><button type="button" class="g-knopf g-knopf--still" data-h="loeschen-nein">Nichts löschen</button></div><p class="k-klein">Gelöschtes lässt sich nicht zurückholen. Ansicht und Bewegung bleiben.</p></div>' +
    '<p class="k-klein" style="margin-top:var(--space-5)">Datenschutz: Diese Seite sendet nichts. Deine Eingaben liegen nur im Speicher dieses Browsers. Selbsttests sind Denkanstöße, keine Diagnose.</p><p class="k-urheber">© 2026 Mario Walter · Inhalte CC BY-NC-SA 4.0 · Code MIT · mit KI-Unterstützung entwickelt · Jorge Bucays Geschichten werden aus dem Buch vorgelesen und stehen nicht auf diesen Seiten.</p></section>' +
    '</main><div class="k-druck" id="druck"></div>';

  kartenMalen(false);
  if (window.Gegenwart) window.Gegenwart.init($("#app"));
  var ans = $('[data-h="ansicht"]'); ans.value = K.ansichtLaden();
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-h],[data-wert]"); if (!b) return;
    var was = b.getAttribute("data-h");
    if (b.hasAttribute("data-wert")) { var key = aktuell; EH.karten[key] = +b.getAttribute("data-wert"); K.sichern(); gedreht = false; var r = kartenListe().sort(function (a, c) { return rang(a.key) - rang(c.key); }).filter(function (x) { return x.key !== key; }); if (r.length) aktuell = r[0].key; kartenMalen(true); return; }
    if (was === "drehen") { gedreht = true; kartenMalen(true); }
    else if (was === "drucken") { druckBauen(); window.print(); }
    else if (was === "datei") K.alsDatei();
    else if (was === "loeschen-auf") { var l = $('[data-h="loeschen"]'); l.hidden = !l.hidden; if (!l.hidden) $('[data-h="loeschen-nein"]').focus(); }
    else if (was === "loeschen-nein") $('[data-h="loeschen"]').hidden = true;
    else if (was === "loeschen-ja") { K.allesLoeschen(); location.hash = ""; location.reload(); }
  });
  document.addEventListener("change", function (e) {
    var t = e.target, was = t.getAttribute("data-h");
    if (was === "filter") { filter = t.value; aktuell = null; gedreht = false; kartenMalen(false); }
    else if (was === "ansicht") { K.ansichtSetzen(t.value); try { localStorage.setItem("g-ansicht", t.value); } catch (x) {} }
    else if (was === "laden" && t.files[0]) K.ausDatei(t.files[0], function (ok) { if (ok) location.reload(); else $('[data-h="rueck"]').textContent = "Diese Datei passt nicht. Wähle »mein-motivprofil.json«."; });
    else if (t.hasAttribute("data-ka")) { EH.koennen[t.getAttribute("data-ka")] = +t.value; K.sichern(); }
  });
  window.addEventListener("beforeprint", druckBauen);
  if (/[?&]druck=/.test(location.search)) druckBauen();
})();
