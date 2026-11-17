# Einheit Motivation (DS 6–11) · Fassung 2.1

Stand: 17. November 2026, zweiter Durchgang · Branch `motivation-einheit` · löst Fassung 1 (`docs/motivation-block.md`) ab

Leitfrage der Einheit: **Was treibt mich an – und was bremst mich?**

## Worum es geht

Sechs Doppelstunden auf einem gemeinsamen Kern, dazu eine Einheitsseite. Grundlage sind das erprobte Material M1–M9 der Lehrkraft (Termini, Fall Josef, Aufgaben) und drei Geschichten von Jorge Bucay, die über die Einheit hinweg vom Übersetzen zur eigenen Analyse führen.

| Datei | Stunde | Leitfrage | Material | Bucay |
| --- | --- | --- | --- | --- |
| `ds06-antrieb.html` | 1 | Was treibt mich an? | M1–M3 | Der Kreis der 99 – übersetzen |
| `ds07-wollen.html` | 2 | Wann wird ein Muss zum Wollen? | M4–M5 | Der Kreis der 99 – Botschaft prüfen |
| `ds08-anstrengung.html` | 3 | Wann lohnt sich Anstrengung? | M6, neu: Leistungsmotivation | Die Frösche – mit Erwartung mal Wert |
| `ds09-erklaeren.html` | 4 | Wie erkläre ich mir Erfolg? | M7, neu: erlernte Hilflosigkeit | Der Elefant – Attribution, Hilflosigkeit |
| `ds10-vergleich.html` | 5 | Wer bin ich im Vergleich? | M8, M9, »Das Selbstkonzept«, neu: Selbstwirksamkeit | Der Elefant – Selbstbild |
| `ds11-lesen.html` | 6 | Wie lese ich mich selbst? | neu: Rubikon (knapp), Wenn-dann-Pläne | Frösche, zweite Lektüre; eine Geschichte selbst analysieren |
| `motivation.html` | – | Einheitsseite »Dein Überblick wächst« | – | Übersetzungstabelle aller Geschichten |

## Entscheidungen

- **Ein Kern für alle Stunden** (`src/motivation/kern.js`, `kern.css`), Inhalte als Daten je Stunde (`ds06.js` … `ds11.js`) und für die Einheit (`einheit-daten.js`). Gebaut mit `node tools/bau_motivation.js` zu je einer Datei im Hauptordner. Fassung 1 (`src/ds06-antrieb.html`, `src/ds07-wollen.html`, `assets/motiv.js`, `assets/motiv.css`) ist entfernt; sie steht im Git-Verlauf.
- **Blatt-Standard aus dem GGK-Labor:** links das Register mit allen Aufträgen und ihrem Stand (offen · öffnet nach deiner Antwort · öffnet auf Ansage · erledigt · du bist hier), rechts ein Auftrag je Seite, Blattkopf »Psychologie · Motivation | Stunde · Arbeitsblatt | Datum«, unten im Register Datei, Löschen, Ansicht und »Für Lehrkräfte: alle Aufträge öffnen«.
- **Auf Ansage** öffnet ein Auftrag per Knopf mit Rückfrage auf der Seite (kein Codewort). So bleibt die Klasse beisammen, wenn vorne am Board gemeinsam geführt wird – die Lehre aus der Stunde vom 6.11.2026.
- **Erst festlegen, dann Rückmeldung:** Die Rückmeldung je Option entsteht erst nach dem Festlegen im Dokument. Alles, was nach einer offenen Wahl kommt (Befunde, Auflösungen), ist bis dahin verborgen – auch beim ersten Aufbau der Seite (geprüft, siehe unten).
- **Beim Urteilen schweigt das Gerät:** Wahlaufgaben zum Anwenden bekommen gestufte Rückmeldung (zentral · auch begründbar · passt kaum). Urteile (»Stimmt die Botschaft?«, »Lieber großer Fisch?«, die Analyse in Stunde 6) bekommen nur Kriterien nach dem eigenen Text und gehen ins Gespräch.
- **Feste Bausteine jeder Stunde:** Start mit Landkarte und Zielen · »Erst erinnern« ohne Heft (ab Stunde 2, verteilt über frühere Stunden) · am Ende »Verorten und vernetzen« (Begriffe in den Motivationskreis legen, eine begründete Verbindung, ein Satz zur Leitfrage in die Lernspur) · Schreiben wie in der Klassenarbeit mit drei Zugängen (mit Beispiel · mit Hilfekarte · ohne Hilfe), getippt oder von Hand · Kann-Liste · Zusammenfassung »Wissen · Können«.
- **Höchstens drei Interaktionsmuster je Stunde** neben den festen Bausteinen: Einfachwahl mit Erklärung je Option (auch als Vorhersage), Zuordnen, Regler mit sichtbarer Folge (nur Stunde 3, weil der Zusammenhang Wahrscheinlichkeit × Anreiz der Lerngegenstand ist).
- **Klassenbild statt QR-Vergleich:** Stimmkarte groß am Gerät, hochhalten, die Lehrkraft zählt am Gerät vorne (nur im Tafelmodus sichtbar). Kleine Zahlen sind kein Befund – das steht dabei.
- **Selbsttests und Persönliches** sind »nur für dich«, freiwillig, ohne Diagnose. Jeder Selbsttest hat »Bogen überspringen« und sperrt danach nichts; die Vermutung in Stunde 1 darf allgemein sein (»Ich bin – oder viele in meinem Alter sind – …«). Persönliche Texte (Vermutung über sich, »Ein Blick auf mich«, »Das Modell und mein Selbsttest«, »Meine Gedanken«) stehen weder in der Zusammenfassung noch in der Lernmappe. Wer beim Zielspiel nicht werfen mag, führt die Strichliste – das Protokoll gilt dann als erledigt. Stunde 4 enthält einen Hinweis auf Gesprächs- und Beratungsangebote.
- **Bucays Texte stehen nicht auf den Seiten** (öffentliches Repository). Die Lehrkraft liest vor; die Seiten beschreiben Bilder in eigenen Worten.
- **Termini nach M1–M9.** Korrigiert gegenüber dem Material: »Me« ist das betrachtete Objekt, »I« das betrachtende Subjekt (Korrekturliste Nr. 12); mittlere Schwierigkeit gehört zu Atkinson, nicht zu Eccles (Nr. 13); der Unterminierungseffekt gilt nur unter Bedingungen (Nr. 14). Das »Mal« in Erwartung × Wert ist als Vereinfachung gekennzeichnet.
- **Selbstwirksamkeit** steht in Stunde 5 (beim Selbstkonzept und der zweiten Lektüre des Elefanten), nicht mehr in Stunde 4 wie in Fassung 1 geplant: So bleibt Stunde 4 bei Attribution und Hilflosigkeit, und der Elefant bekommt eine Antwort auf die Frage, wie Zutrauen wächst.

## Fassung 2.1: Gestaltungsregeln (Kidu `DESIGN.md` 4.46, GGK M22 4.1, Tresor 16.–17.11.)

| Regel | Umsetzung | gemessen |
| --- | --- | --- |
| Two-Line | Überschrift trägt nur den Titel; »Arbeitsauftrag N« steht als kleine Zeile darüber (für Screenreader im Titel) | keine Überschrift über zwei Zeilen bei 1440, 1280, 1180, 820, 768 und 390 px |
| First-Action, Beamer | Deckblatt jeder Stunde: Titel, Leitfrage, Knopf »Los geht’s: Auftrag 1« (48 px), darunter oder daneben die Ziele – der Knopf steht im ersten Bildschirm | Knopf sichtbar bei 1280 × 720 und allen anderen Breiten |
| Gleiche Adresse, gleiche Seite | ohne Anker immer das Deckblatt; »Weiter, wo du warst« ist ein eigener Knopf. Das Deckblatt überschreibt den gemerkten Ort nicht | geprüft |
| Input-First | Seitenwechsel bewegt sich nur nach eigenem Tippen; beim Laden bewegt sich nichts | 0 laufende Animationen nach dem Laden, alle Seiten, alle Breiten |
| Screen-Width | Legeseiten (Kreis, Fächer, Raster) bekommen ab 981 px die Breite: Das Register wird zur Nummernleiste, Datei und Löschen stehen unten. Die Einheitsseite nutzt die Breite (»Auf einen Blick« neben dem Titel, Landkarte in einer Reihe ab 1700 px, sonst 4 × 2). Fließtext bleibt bei 72 Zeichen | – |
| Legefläche (GGK M22 4.1) | links, was zu legen ist (läuft beim Scrollen mit), rechts das Ziel; beim Raster und hochkant am Tablet bleibt der Stapel oben stehen. Nach dem letzten richtigen Legen: »Warum die Karten so liegen« mit allen Erklärungen. Das Ursachenraster bleibt bis 640 px Blattbreite ein Raster (auch am iPad hochkant), darunter trägt jedes Feld seine Spalte | Bot legt alle Karten bei allen Breiten; Fotos hochkant angesehen |
| One-Order | Kreis auf der Einheitsseite ohne sichtbare Stundenzahl an jedem Begriff (bleibt für Screenreader und im Tooltip) | – |
| SVG-Schrift | wirksame Größe = Schrift × gezeigte Breite ÷ viewBox-Breite. Kontinuum mit Beschriftung in zwei Reihen und Hinweislinien, Rubikon mit zweizeiligen Fragen, kleinste Schrift 18 Einheiten; unter einer Mindestbreite verschiebt man das Bild in seinem Rahmen statt es zu verkleinern | kleinste wirksame Schrift 18,1 px ab 1180, 16,8 px bei 820, 16,2 px bei 768, 16,1 px bei 390 (dort im Rahmen verschiebbar); vorher 14,7 px |
| Kontrast | je Ansicht gemessen (hell, dunkel, Beamer), Hilfen aufgeklappt | zwei Funde behoben (»wirkt zurück« in Hell 4,29 : 1, Kopf des Auftragskastens in Dunkel 1,57 : 1), danach keine |
| Hilfe am selben Ort | Hilfen nur auf Abruf: Zugang beim Schreiben wählen, Fachsprache in der Analyse zugeklappt, Erklärungen zu allen Karten erst nach dem Legen | – |

## Fassung 2.1: unabhängige Prüfung (25 Punkte) eingearbeitet

- **Freiwilligkeit:** Selbsttests überspringbar, Strichliste als echte Alternative im Zielspiel, persönliche Texte nicht in der Lernmappe, »Niemand liest das« ersetzt durch »bleibt auf deinem Gerät und kommt nicht in die Lernmappe«. Rückblick in Stunde 3 ohne Selbstetikett: »… warum lässt sich aus drei Würfen nicht ablesen, welches Motiv jemand hat?«; im Spiel: »Wir deuten nur das Klassenbild, keine einzelnen Würfe.«
- **Fachlich:** Motiv = relativ überdauernde Vorliebe für bestimmte Ziele, Motivation = was jetzt wirkt, wenn ein Motiv auf einen passenden Anreiz trifft; Definition nach Rheinberg (zitiert bei Hasselhorn & Gold). Hundeversuch: schmerzhafte Stromstöße, Abschalten durch Drücken einer Platte mit der Schnauze, »versuchten kaum«. Klassische und neue Deutung der Hilflosigkeit stehen jetzt widerspruchsfrei nebeneinander. Helmke: Rückgang in den ersten Schuljahren und bei vielen noch einmal nach dem Wechsel (Wigfield). Das »Mal« heißt bei Eccles und Wigfield »vereinfacht«; Risikowahl: Die Mitte ist nur für Erfolgsuchende am günstigsten. Überzogenes abgeschwächt (Bandura »vor allem«, Wrosch »geht mit mehr Wohlbefinden einher«, »Gut belegt ist vor allem«).
- **Stufen der Rückmeldung:** Frösche Bild 2 – beide Lesarten zentral, mit Gesprächsauftrag (»Erklärt das Modell hier noch etwas – oder passt es sich nachträglich an?«); Josefs Vergleich sozial und temporal zentral; Elefant: kriterialer Vergleich begründbar; Ali »lernt mehr, weil er sich ärgert« passt kaum; Verorten: Regulationsformen, Internalisierung und Loslassen bei »Motivation und Handeln« begründbar; Rückmeldungen bei »passt kaum« erklären, wohin der Begriff gehört.
- **Nichts vorwegnehmen:** Klassenergebnis im Zielspiel wird nicht mehr vorausgesetzt (»ein Hinweis, kein Beweis – in beide Richtungen«), gezählt wird mit Fingern (Würfe, nicht Personen); die Rückmeldung zu Alis Pech verrät die Prognose in Auftrag 4 nicht mehr.
- **Begriffe vor dem Gebrauch:** Karte »Woran man Motivation von außen erkennt« vor dem Sortieren in Stunde 1; »Selbstbestimmungstheorie« wird in Stunde 2 eingeführt, bevor die Schreibaufgabe sie verlangt; »external« erst nach seiner Einführung.
- **Analyse ohne Hilfe:** In Stunde 6 steht die Fachsprache je Bild hinter »Hilfe: Fachsprache zeigen«. Neu als Zugang ohne Hilfe: die Fabel »Der Fuchs und die Trauben« (nacherzählt nach Äsop, gemeinfrei) mit eigener möglicher Lösung – sie erscheint bewusst nicht in der Übersetzungstabelle der Einheit.
- **Sortierkarten eindeutig:** »Konzentration (Tagesform)« statt »Konzentrationsvermögen«; Eccles-Karte »Ich sehe mich als jemand, der Mathe kann – darum ist mir eine gute Note wichtig.«

## Der Motivationskreis

Eigene Vereinfachung (Modell) nach dem Grundmodell der Motivationspsychologie (Person und Situation → Motivation → Handeln), der Idee »Erwartung mal Wert« und der Attributionstheorie:

Ich (Was bringe ich mit?) · Umgebung (Was bietet die Situation?) → Erwartung (Schaffe ich das?) × Wert (Lohnt es sich – und wofür tue ich es?) → Motivation und Handeln → Ergebnis (Erfolg oder Misserfolg?) → Erklärung (Warum ist es so gekommen?) → wirkt zurück auf Ich und Erwartung.

Jede Stunde legt drei bis fünf Begriffe hinein (22 insgesamt). Rückmeldung gestuft, mit Begründung je Station. Auf der Einheitsseite liegt der Kreis mit allen Begriffen so, wie die Schülerin sie gelegt hat. Die Einheitsseite zeigt nur Bearbeitetes – sonst nähme sie Antworten späterer Stunden vorweg.

## Ablauf und Zeit

Zeitdiagnose am vollen Stand (alle Aufträge aufgedeckt, alle Rückmeldungen sichtbar): Wörter ÷ 150 pro Minute, dazu 0,75 Minuten je Wahlaufgabe, 1,5 je Festlegung, 0,2 je Karte und Schreiben mit 8 Wörtern pro Minute. Die Planzeit enthält Plenum, Vorlesen und Zielspiel; die Gerätezeit muss deutlich darunter liegen.

| Stunde | Aufträge (Planzeit) | Wörter am vollen Stand | Gerätezeit, langsam | Puffer für Plenum |
| --- | --- | --- | --- | --- |
| 1 | 7 Aufträge, 80 Min. + Start und Zusammenfassung | 3 170 | 47 Min. | 33 Min. |
| 2 | 9 Aufträge, 84 Min. | 3 900 | 51 Min. | 33 Min. |
| 3 | 7 Aufträge, 80 Min. | 3 320 | 44 Min. | 36 Min. (Zielspiel 15 Min.) |
| 4 | 7 Aufträge, 74 Min. | 2 940 | 40 Min. | 34 Min. |
| 5 | 8 Aufträge, 78 Min. | 3 230 | 45 Min. | 33 Min. |
| 6 | 7 Aufträge, 76 Min. | 2 630 | 35 Min. | 41 Min. |

Gemessen nach dem zweiten Durchgang (Fassung 2.1); die Erklärkarte in Stunde 1, die Strichliste und die genaueren Rückmeldungen kosten zusammen gut zwei Minuten. Wer in Stunde 6 die unbekannte Fabel wählt, liest rund 60 Wörter mehr. Stunde 2 ist die dichteste. Kürzungen zur Auswahl, falls es eng wird: **K1** Spur 3 im Plenum statt am Gerät (−4 Min.) · **K2** den Selbsttest »Warum lerne ich?« nach Hause geben (−4 Min.) · **K3** »Ein Blick auf dich« nur für Schnelle (−3 Min.).

## Speicher, Datei, Datenschutz

- Ein Schlüssel für die ganze Einheit: `psycholabor:motivation:v2`. Eingaben aus Fassung 1 (`…:v1`) werden beim ersten Öffnen einer neuen Seite übernommen – egal, welche Seite zuerst geöffnet wird. Stunden mit übernommenen Eingaben sind schon gelaufen: Alle Aufträge bleiben offen, neue Schritte wie »Verorten« erscheinen als »offen«.
- »Stand als Datei sichern / laden« (`mein-motivprofil.json`) auf jeder Seite; die Datei aus Fassung 1 lässt sich ebenfalls laden.
- »Eingaben löschen …« mit Rückfrage auf der Seite: nur diese Stunde oder die ganze Einheit.
- Tafelmodus (»Für Lehrkräfte: alle Aufträge öffnen«) gilt nur für das Gerät und die Sitzung (`sessionStorage`).
- Nichts wird gesendet; keine Schriften, Skripte oder Bilder von fremden Servern.

## Druck und Lernmappe

Jede Stunde: Lernmappe als PDF, vier Seiten – Merkseite (zwei Seiten: Kernsatz, sechs Begriffe, Denkwerkzeug, Kreis mit eigenen Begriffen, Bucays Bilder der Stunde, Abruffragen für die nächste Stunde, Quellen) und »Können« (die tatsächlich eingegebenen Ergebnisse). Einheitsseite: Lernübersicht der Einheit, vier Seiten (Kernsätze, Denkwerkzeuge, eigener Kreis, Verbindungen, Lernspur, Übersetzungstabelle, »Das muss ich können«).

## Vorbereitung auf die Klassenarbeit

Vier Aufgabentypen werden über die Einheit geübt: Anwenden (Stunde 1, 3, 4), Stellung nehmen (Stunde 2, 5), Auswerten (Zielspiel und Denkwerkzeuge in Stunde 3), Analysieren und Stellung nehmen als Probeaufgabe mit Ampel-Raster (Stunde 6). Die Einheitsseite bündelt »Das muss ich können« mit Selbsteinschätzung und Lernkarten (je Stunde sechs, aus den Merkseiten).

**Hinweis zur Klassenarbeit 2 (2025):** Ihre Aufgabe 5 (Frösche mit Eccles) wird in Stunde 3 geübt, Aufgabe 4 (Attributionen für neue Fälle) in Stunde 4 am Fall Josef. Für die neue Arbeit eine andere Geschichte oder andere Fälle wählen.

## Vor dem Kopieren prüfen

Angaben aus dem Gedächtnis, nicht online geprüft:

- Hoppe (1930), Psychologische Forschung 14 · Atkinson (1957), Psychological Review 64 · Atkinson & Litwin (1960), Journal of Abnormal and Social Psychology 60 (Ringwurf; der Unterschied bei Misserfolgsmeidenden ist in späteren Studien oft schwächer)
- Nagengast u. a. (2011), Psychological Science 22 (Zusammenspiel von Erwartung und Wert)
- Deci (1971), Journal of Personality and Social Psychology 18 · Deci, Koestner & Ryan (1999), Psychological Bulletin 125, 128 Experimente
- Weiner (1985), Psychological Review 92 · Seligman & Maier (1967), Journal of Experimental Psychology 74 (»Failure to escape traumatic shock«; Abschalten durch Drücken einer Platte, nach der Zusammenfassung in Maier & Seligman 2016) · Maier & Seligman (2016), Psychological Review 123
- **Definition Motivation:** Rheinberg, »aktivierende Ausrichtung des momentanen Lebensvollzuges auf einen positiv bewerteten Zielzustand« (Rheinberg, Motivation, Kohlhammer). Ihr Material M2 schreibt »aktuelle Ausrichtung …« und nennt Hasselhorn – bitte an Hasselhorn & Gold prüfen, ob dort Rheinberg zitiert wird.
- **Helmke (1998) und Wigfield:** ob der stärkste Rückgang des Fähigkeitsselbstkonzepts in den ersten Schuljahren oder nach dem Wechsel liegt, an M9 prüfen; die Seite nennt jetzt beides vorsichtig.
- Marsh (1987) nach M8 · Helmke (1998) nach M9 · Bandura (1977), Psychological Review 84
- Heckhausen & Gollwitzer (1987), Motivation and Emotion 11 · Gollwitzer & Sheeran (2006), Advances in Experimental Social Psychology 38, 94 Studien, mittlere bis große Wirkung · Wrosch u. a. (2003), Personality and Social Psychology Bulletin 29
- **Äsop, »Der Fuchs und die Trauben«** (Stunde 6) ist in eigenen Worten nacherzählt; die Fabel ist gemeinfrei.
- **Bucays Bilder** zum Elefanten (Stunde 4 und 5) und der Satz am Ende der Geschichte (»noch einmal mit ganzem Herzen versuchen«, Stunde 5) sind aus der Erinnerung formuliert – vor dem Einsatz am Buch prüfen. Die Bilder zu den Fröschen folgen der Abschrift in Klassenarbeit 2 (2025).

## Nur die Lehrkraft kann

- Safari auf einem echten iPad, hoch und quer; VoiceOver; Zoom 200 %
- Zielspiel vorbereiten: Papierkorb, Klebeband-Linien bei 1–5 m, Papierkugeln
- Bucays Geschichten vorlesen; die Bilder zum Elefanten am Buch prüfen
- Tafelmodus am Gerät vorne ausprobieren (Klassenbild zählen)
- Freigabe zum Zusammenführen; GitHub Pages veröffentlicht dann automatisch

## Nach der Stunde

Je Stunde zwei Fragen (Vorlage »Nach der Stunde« im Tresor): Was hat getragen? Wo hing es? Für Stunde 3 besonders: Wie lange hat das Zielspiel gedauert, wie viele haben die Strichliste geführt, und passte das Klassenbild zu Hoppe – oder nicht? Für Stunde 6: Wer hat die unbekannte Fabel gewählt, und wie weit kamen sie ohne Hilfe?
