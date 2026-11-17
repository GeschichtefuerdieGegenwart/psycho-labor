# Einheit Motivation (DS 6–11) · Fassung 2

Stand: 17. November 2026 · Branch `motivation-einheit` · löst Fassung 1 (`docs/motivation-block.md`) ab

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
- **Selbsttests und Persönliches** sind »nur für dich«, freiwillig, ohne Diagnose; persönliche Schreibfragen sind freiwillig und haben eine Alternative (»oder für Josef«, »oder eine Figur aus einem Film«). Stunde 4 enthält einen Hinweis auf Gesprächs- und Beratungsangebote.
- **Bucays Texte stehen nicht auf den Seiten** (öffentliches Repository). Die Lehrkraft liest vor; die Seiten beschreiben Bilder in eigenen Worten.
- **Termini nach M1–M9.** Korrigiert gegenüber dem Material: »Me« ist das betrachtete Objekt, »I« das betrachtende Subjekt (Korrekturliste Nr. 12); mittlere Schwierigkeit gehört zu Atkinson, nicht zu Eccles (Nr. 13); der Unterminierungseffekt gilt nur unter Bedingungen (Nr. 14). Das »Mal« in Erwartung × Wert ist als Vereinfachung gekennzeichnet.
- **Selbstwirksamkeit** steht in Stunde 5 (beim Selbstkonzept und der zweiten Lektüre des Elefanten), nicht mehr in Stunde 4 wie in Fassung 1 geplant: So bleibt Stunde 4 bei Attribution und Hilflosigkeit, und der Elefant bekommt eine Antwort auf die Frage, wie Zutrauen wächst.

## Der Motivationskreis

Eigene Vereinfachung (Modell) nach dem Grundmodell der Motivationspsychologie (Person und Situation → Motivation → Handeln), der Idee »Erwartung mal Wert« und der Attributionstheorie:

Ich (Was bringe ich mit?) · Umgebung (Was bietet die Situation?) → Erwartung (Schaffe ich das?) × Wert (Lohnt es sich – und wofür tue ich es?) → Motivation und Handeln → Ergebnis (Erfolg oder Misserfolg?) → Erklärung (Warum ist es so gekommen?) → wirkt zurück auf Ich und Erwartung.

Jede Stunde legt drei bis fünf Begriffe hinein (22 insgesamt). Rückmeldung gestuft, mit Begründung je Station. Auf der Einheitsseite liegt der Kreis mit allen Begriffen so, wie die Schülerin sie gelegt hat. Die Einheitsseite zeigt nur Bearbeitetes – sonst nähme sie Antworten späterer Stunden vorweg.

## Ablauf und Zeit

Zeitdiagnose am vollen Stand (alle Aufträge aufgedeckt, alle Rückmeldungen sichtbar): Wörter ÷ 150 pro Minute, dazu 0,75 Minuten je Wahlaufgabe, 1,5 je Festlegung, 0,2 je Karte und Schreiben mit 8 Wörtern pro Minute. Die Planzeit enthält Plenum, Vorlesen und Zielspiel; die Gerätezeit muss deutlich darunter liegen.

| Stunde | Aufträge (Planzeit) | Wörter am vollen Stand | Gerätezeit, langsam | Puffer für Plenum |
| --- | --- | --- | --- | --- |
| 1 | 7 Aufträge, 80 Min. + Start und Zusammenfassung | 3 020 | 46 Min. | 34 Min. |
| 2 | 9 Aufträge, 84 Min. | 3 770 | 50 Min. | 34 Min. |
| 3 | 7 Aufträge, 80 Min. | 3 120 | 43 Min. | 37 Min. (Zielspiel 15 Min.) |
| 4 | 7 Aufträge, 74 Min. | 2 850 | 40 Min. | 34 Min. |
| 5 | 8 Aufträge, 78 Min. | 3 140 | 44 Min. | 34 Min. |
| 6 | 7 Aufträge, 76 Min. | 2 600 | 35 Min. | 41 Min. |

Stunde 2 ist die dichteste. Kürzungen zur Auswahl, falls es eng wird: **K1** Spur 3 im Plenum statt am Gerät (−4 Min.) · **K2** den Selbsttest »Warum lerne ich?« nach Hause geben (−4 Min.) · **K3** »Ein Blick auf dich« nur für Schnelle (−3 Min.).

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
- Weiner (1985), Psychological Review 92 · Seligman & Maier (1967), Journal of Experimental Psychology 74 · Maier & Seligman (2016), Psychological Review 123
- Marsh (1987) nach M8 · Helmke (1998) nach M9 · Bandura (1977), Psychological Review 84
- Heckhausen & Gollwitzer (1987), Motivation and Emotion 11 · Gollwitzer & Sheeran (2006), Advances in Experimental Social Psychology 38, 94 Studien, mittlere bis große Wirkung · Wrosch u. a. (2003), Personality and Social Psychology Bulletin 29
- **Bucays Bilder** zum Elefanten (Stunde 4 und 5) und der Satz am Ende der Geschichte (»noch einmal mit ganzem Herzen versuchen«, Stunde 5) sind aus der Erinnerung formuliert – vor dem Einsatz am Buch prüfen. Die Bilder zu den Fröschen folgen der Abschrift in Klassenarbeit 2 (2025).

## Nur die Lehrkraft kann

- Safari auf einem echten iPad, hoch und quer; VoiceOver; Zoom 200 %
- Zielspiel vorbereiten: Papierkorb, Klebeband-Linien bei 1–5 m, Papierkugeln
- Bucays Geschichten vorlesen; die Bilder zum Elefanten am Buch prüfen
- Tafelmodus am Gerät vorne ausprobieren (Klassenbild zählen)
- Freigabe zum Zusammenführen; GitHub Pages veröffentlicht dann automatisch

## Nach der Stunde

Je Stunde zwei Fragen (Vorlage »Nach der Stunde« im Tresor): Was hat getragen? Wo hing es? Für Stunde 3 besonders: Wie lange hat das Zielspiel gedauert, und haben sich nach Treffern wirklich viele weiter weg gestellt?
