# Psycho-Labor

Interaktive Selbstversuche und Modelle für das Wahlfach Psychologie (J2) – „Warum ich so ticke“.

**Für Schülerinnen:** https://geschichtefuerdiegegenwart.github.io/psycho-labor/

**Kursauswertung (Lehrkraft):** https://geschichtefuerdiegegenwart.github.io/psycho-labor/auswertung.html

## Datenschutz

- Die Seiten senden keine Daten. Ergebnisse werden nur im Browser des jeweiligen iPads gespeichert (localStorage).
- Für den Kursvergleich zeigt jede Schülerin einen QR-Code. Die Lehrkraft scannt ihn mit der Kamera-App; die Daten stehen im Anker der Adresse (`#d=…`), werden nicht an den Server übertragen und landen nur auf dem Gerät der Lehrkraft.
- Keine Namen, keine Konten, keine externen Skripte oder Schriftarten.
- Block Motivation: kein Kursvergleich. Selbsttests und Texte bleiben im Browser (`psycholabor:motivation:v1`) und lassen sich als Datei sichern.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `index.html` | Übersicht der Reihe: Block 1 Wahrnehmung, Klassenarbeit 1, Block 2 Motivation |
| `ds02-veraenderungsblindheit.html` | DS 2: Flacker-Test zur Veränderungsblindheit |
| `ds03-gestalten.html` | DS 3: Gestalt-Labor |
| `ds04-erwartungen.html` | DS 4: Spielkarten und Wortliste (Erwartungen) |
| `ds05-andere.html` | DS 5: Lernweg zur Konformität – Herr Fotiou, Punkte, Linien im Gruppenchat, vier Stationen, Zusammenfassung (Fassung 2, siehe `docs/ds05-fassung2.md`) |
| `ds06-antrieb.html` | DS 6: Was treibt mich an? – erster Lernweg im Block Motivation (Fassung 2, siehe `docs/motivation-block.md`) |
| `wiederholung-wahrnehmung.html` | Wiederholung vor Klassenarbeit 1: Fragen mit Rückmeldung, Fall, Diskussion; Zusammenfassung, Probeklausur, Lernkarten, Erwartungshorizont als PDF (siehe `docs/wiederholung-wahrnehmung.md`) |
| `src/` | Quelldateien; `node tools/inline.js src/<datei>.html` erzeugt die Einzeldatei im Hauptordner |
| `PRODUCT.md`, `DESIGN.md` | Zweck, Rahmen und Gestaltungsregeln des Labors |
| `auswertung.html` | Kursauswertung für die Lehrkraft |
| `assets/lab.css`, `assets/lab.js` | gemeinsames Design und Werkzeuge |
| `assets/bausteine.js` | Verzeichnis der Bausteine (für Startseite und Auswertung) |
| `assets/szenen-ds02.js` | selbst gezeichnete Bildpaare für DS 2 |
| `assets/gegenwart/` | Bausteine aus dem Designsystem Gegenwart (Wahl, Balken, Bewegung), in Psycho-Labor-Farben |
| `assets/gegenwart/tokens.css`, `assets/motiv.css`, `assets/motiv.js` | Block Motivation: Tokens des Designsystems Gegenwart, Gestaltung und gemeinsame Werkzeuge (Speicher, Schritte, Wahl, Datei) |
| `assets/fonts/` | Schriften des Designsystems (lokal, Lizenzen in `LIZENZ.md`) |
| `assets/qrcode.js` | QR-Code-Erzeugung (Kazuhiko Arase, MIT-Lizenz) |

Alle Bilder sind selbst gezeichnet (SVG), auch Herr Fotiou (zwei Zeichnungen ab DS 5, Fassung 2). Fotos aus dem Unterrichtsmaterial stehen nur in älteren Folien, nicht im Labor.

DS 5 bindet ein YouTube-Video ein, das erst nach Antippen lädt (`youtube-nocookie.com`); dann überträgt YouTube Daten. Gedacht ist die Vorführung am Beamer. Eine andere Video-ID lässt sich über `ds05-andere.html?video=…` einstellen.

## Arbeitsweise

Änderungen kommen über einen Branch und einen Pull Request. Zusammengeführt wird erst nach Freigabe durch die Lehrkraft.

## Urheber und Lizenz

- Konzept, Didaktik, Aufgaben und Texte: Mario Walter (2026).
- Umgesetzt mit KI-Unterstützung (Claude); Auswahl, Prüfung und Überarbeitung durch den Urheber.
- Programmcode: MIT-Lizenz, siehe `LICENSE`.
- Texte, Aufgaben, Daten und selbst gezeichnete Grafiken: CC BY-NC-SA 4.0, siehe `LICENSE-INHALTE.md`.
- Fremdmaterial (Bilder, Karten, Datensätze, Zitate Dritter) behält seine eigene Lizenz; Nachweise stehen am Ort der Verwendung. Siehe die Liste in `LICENSE-INHALTE.md`.
- Zitiervorschlag: Walter, Mario (2026): Psycho-Labor · Warum ich so ticke. https://github.com/GeschichtefuerdieGegenwart/psycho-labor – maschinenlesbar in `CITATION.cff`.
- Stand vor dem Fortbildungsauftrag der Schule (3. November 2026): Commit `4d715e19d939`, siehe `docs/stand-2026-11-03.md`.

Für eine kommerzielle Nutzung ist eine eigene Vereinbarung mit dem Urheber nötig.
