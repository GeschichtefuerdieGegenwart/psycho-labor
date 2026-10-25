# Psycho-Labor

Interaktive Selbstversuche und Modelle für das Wahlfach Psychologie (J2) – „Warum ich so ticke“.

**Für Schülerinnen:** https://geschichtefuerdiegegenwart.github.io/psycho-labor/

**Kursauswertung (Lehrkraft):** https://geschichtefuerdiegegenwart.github.io/psycho-labor/auswertung.html

## Datenschutz

- Die Seiten senden keine Daten. Ergebnisse werden nur im Browser des jeweiligen iPads gespeichert (localStorage).
- Für den Kursvergleich zeigt jede Schülerin einen QR-Code. Die Lehrkraft scannt ihn mit der Kamera-App; die Daten stehen im Anker der Adresse (`#d=…`), werden nicht an den Server übertragen und landen nur auf dem Gerät der Lehrkraft.
- Keine Namen, keine Konten, keine externen Skripte oder Schriftarten.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `index.html` | Übersicht aller Bausteine |
| `ds02-veraenderungsblindheit.html` | DS 2: Flacker-Test zur Veränderungsblindheit |
| `ds03-gestalten.html` | DS 3: Gestalt-Labor |
| `ds04-erwartungen.html` | DS 4: Spielkarten und Wortliste (Erwartungen) |
| `ds05-andere.html` | DS 5: Punkte schätzen und Linien (Konformität), Herr Fotiou |
| `ds06-antrieb.html` | DS 6: Ziele setzen (Anspruchsniveau) |
| `src/` | Quelldateien; `node tools/inline.js src/<datei>.html` erzeugt die Einzeldatei im Hauptordner |
| `PRODUCT.md`, `DESIGN.md` | Zweck, Rahmen und Gestaltungsregeln des Labors |
| `auswertung.html` | Kursauswertung für die Lehrkraft |
| `assets/lab.css`, `assets/lab.js` | gemeinsames Design und Werkzeuge |
| `assets/bausteine.js` | Verzeichnis der Bausteine (für Startseite und Auswertung) |
| `assets/szenen-ds02.js` | selbst gezeichnete Bildpaare für DS 2 |
| `assets/qrcode.js` | QR-Code-Erzeugung (Kazuhiko Arase, MIT-Lizenz) |

Alle Bilder sind selbst gezeichnet (SVG). Fotos aus dem Unterrichtsmaterial (z. B. Herr Fotiou, Guinness-Rekorde) stehen nur in den Folien, nicht im Labor.

## Arbeitsweise

Änderungen kommen über einen Branch und einen Pull Request. Zusammengeführt wird erst nach Freigabe durch die Lehrkraft.
