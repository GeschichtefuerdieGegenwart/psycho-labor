# Block Motivation (DS 6–11) und DS 6, Fassung 2

Stand: 11. November 2026 · Branch `motivation-ds06`

## Entscheidungen

- **Sechs Doppelstunden**, Begriffsfolge nach dem erprobten Material M1–M9 (Lehrkraft, 11.11.2026). Ergänzt aus dem Grundfahrplan: Leistungsmotivation (DS 8, bei Erwartung mal Wert), Selbstwirksamkeit (DS 9, bei Attribution). Das Rubikon-Modell kommt nur knapp in DS 11 (»vom Wollen zum Tun«), weil es als einziges den Schritt zur Handlung beschreibt und zur Selbstanalyse passt; eine eigene Theorie-Stunde bekommt es nicht.
- **Variante B (durchgängig), gemeinsam am Board geführt** – Lehre aus der Stunde vom 6.11.2026.
- **Eigenes Erscheinungsbild:** Der Block nutzt das Designsystem »Gegenwart« vollständig (Tokens, Schriften, Platten). Block 1 (Wahrnehmung) bleibt, wie er ist. Auf der Startseite ist Wahrnehmung Petrol und ein Kachelraster, Motivation Honig und ein Lernweg mit sechs Stationen; dazwischen steht die Klassenarbeit 1.
- **Kein Kursvergleich per QR** mehr (hat am 6.11. nicht funktioniert). Ergebnisse werden an einem Gerät vorne besprochen.
- **Bucay-Texte stehen nicht auf der Seite** (öffentliches Repository). Die Lehrkraft liest vor; die Seite beschreibt drei Bilder in eigenen Worten.
- **Selbstorganisiertes Lernen in Maßen:** Lernweg vorab, Kann-Liste, gestufte Hilfen, Selbstkontrolle am Raster. Kein Gruppenpuzzle, keine freie Wahl der Bausteine.

## Drei Systeme, die über den Block wachsen

| System | Was es tut | Speicher |
| --- | --- | --- |
| Mein Motivprofil | sammelt die Selbsttests, nur auf dem eigenen Gerät; als Datei speicher- und ladbar | `daten.profil` |
| Begriffsnetz | Begriffe mit Verbindungen, die die Lernenden selbst wählen; jede Stunde ergänzt Knoten | je Stunde `netz` |
| Zwei Sprachen | Bucays Bild neben dem Fachbegriff; Aufgaben steigen von wiedererkennen über erklären bis Botschaft prüfen | je Stunde `wahl` |

Speicherschlüssel für den ganzen Block: `psycholabor:motivation:v1`. Löschen: nur diese Stunde oder der ganze Block, mit Rückfrage auf der Seite.

## Plan

| DS | Leitfrage | Material | Bucay |
| --- | --- | --- | --- |
| 6 | Was treibt mich an? | M1–M3 | Der Kreis der 99, erste Lektüre |
| 7 | Wann wird ein Muss zum Wollen? | M4–M5, Regulationsformen-Seite und Quiz | Der Kreis der 99, zweite Lektüre: Stimmt die Botschaft? |
| 8 | Wann lohnt sich Anstrengung? | M6, neu: Leistungsmotivation | Die Frösche in der Sahne |
| 9 | Wie erkläre ich mir Erfolg? | M7, neu: Selbstwirksamkeit | Der angekettete Elefant |
| 10 | Wer bin ich im Vergleich? | M8–M9 | – |
| 11 | Wie lese ich mich selbst? | Vernetzung, neu: vom Wollen zum Tun | eine Geschichte mit allen Theorien; eigene Analyse (freiwillig) |

## DS 6 – Ablauf (`ds06-antrieb.html`)

| Schritt | ID | Inhalt | Muster |
| --- | --- | --- | --- |
| Start | `#s-start` | Leitfrage, Lernweg, Ziele | – |
| Selbsttest | `#s-test` | 21 Sätze aus M1, danach eigene Vermutung | Selbsteinschätzung mit Wort |
| Fall Josef | `#s-fall` | vier Personenkarten, Vermutung, beschreiben oder bewerten | Vorhersage, Wahl mit Begründung |
| Begriffe | `#s-begriffe` | Motiv, Motivation; zehn Karten in drei Fächer (aus M2), Zwischenstand ab fünf Karten, falsche zurücklegen; zwei Zuordnungen | Zuordnen |
| Zwei Formen | `#s-formen` | intrinsisch, extrinsisch (aus M3); drei Zuordnungen; offene Frage zu Ali | Wahl mit Begründung |
| Geschichte | `#s-geschichte` | vorlesen, eigene Worte, drei Bilder übersetzen, Übersetzungstabelle | Wahl mit Begründung |
| Begriffsnetz | `#s-netz` | vier Verbindungen wählen, prüfen, Bild | Zuordnen |
| Sichern | `#s-sichern` | Erklärung ab 40 Wörtern → Raster, Rückkehr zur Vermutung, Kann-Liste, Lernmappe (4 Seiten), Profil als Datei | Satzanfänge → Kriterienvergleich |

Zeit: etwa 85 Minuten (Angaben je Schritt auf der Seite). Bildschirmtext ohne Rückmeldungen rund 1 100 Wörter.

## Inhalte und Status

| Element | Status |
| --- | --- |
| Definitionen Motiv, Motivation, Verhaltensmerkmale, Bedingungen | aus dem Unterrichtsmaterial M2 (Hasselhorn) |
| intrinsisch, extrinsisch, Flow | aus M3: Deci & Ryan 1993; Csikszentmihalyi 1975 |
| Fall Josef, Slobodan, Ali, Melissa | ausgedachter Fall aus dem Unterrichtsmaterial, sprachlich geglättet |
| Selbsttest | aus M1, sprachlich geglättet; kein geprüftes Instrument, auf der Seite so gekennzeichnet |
| Drei Bilder aus »Der Kreis der 99« | eigene Zusammenfassung aus dem Gedächtnis – **vor dem Einsatz mit dem Buch abgleichen** |
| Begriffsnetz | Modell |
| Zuordnung »Ali lernt für das Studium« = extrinsisch | nach der Definition in M3; als Brücke zu DS 7 gewollt |

Nicht übernommen aus Fassung 1: der Versuch zum Anspruchsniveau mit Kursvergleich (steht im Git-Verlauf).

## Prüfung

Gelaufen: Durchlauf im Browser ohne Fehler; Wahl ohne Begründung bleibt gesperrt; Netz mit Fehlern sperrt den nächsten Schritt; Stand bleibt nach Neuladen; Löschen entfernt die Eingaben; Lernmappe 4 Seiten A4; 375, 768, 1280 px in Hell, Dunkel und Beamer ohne waagerechtes Scrollen; kein Bildschirmtext unter 16 px.

Nicht gelaufen: echtes iPad (Safari, hoch und quer), Promethean-Board, VoiceOver, Zoom 200 %, Export nach GoodNotes, Datei speichern und laden auf dem iPad, Prüfung durch eine zweite Person, axe.
