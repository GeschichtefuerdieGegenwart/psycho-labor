# DESIGN

Stand: 25.10.2026 · ohne Impeccable-Plugin von Hand angelegt (website-design-workflow, Schritt 3). Umfang dieser Fassung: Bestand dokumentieren, nichts umbauen.

## Overview
Seitentyp „Lern-App mit Aufgaben“: Die Taste-Regeln gelten nur als Hinweise, die Didaktik entscheidet. Hell und dunkel sind beide vorgesehen; Druck und Schaubilder sind immer hell.

## Colors (CSS-Variablen in `assets/lab.css`)
| Rolle | hell | dunkel |
| --- | --- | --- |
| Grund `--bg` | #f5f1ea | #13161d |
| Fläche `--paper` | #fffdf9 | #1c202b |
| Text `--ink` / `--ink-soft` | #1d2230 / #545b6b | #eef0f4 / #aeb5c2 |
| Hauptfarbe `--accent` | #0e6b68 | #52b6b0 |
| Hervorhebung `--warm` | #d9643f | #f08d69 |
| Hilfe `--gold` | #b9871c | #e2b650 |

Diagramme: Petrol und Koralle. Der Farbprüfer aus dem dataviz-Skill meldet für Petrol eine zu geringe Sättigung; deshalb tragen Datenreihen immer zusätzlich Linienart, Punktform und eine direkte Beschriftung.

## Typography
Systemschriften: `--font` für Text, `--font-display` (gerundet) für Überschriften. Keine geladenen Schriften.

## Layout
Eine Spalte bis 1100 px, Raster `grid2` ab 720 px. Druck: A4, `.pg` = eine Seite.

## Elevation, Shapes
Karten mit Radius 18 px und leichtem Schatten. Kästen: Auftrag (Petrol-Rand), Information (gestrichelt), Hilfe (Gold).

## Components
Schritte (`.step`), Zeitkasten, Auftrag, Information, Hilfe, Schublade „Übersicht“, QR-Kasten, Lernmappe-Vorlagen (`tpl-ue`, `tpl-ab`, `tpl-loesung`).

## Do's and Don'ts
Keine Ranglisten, keine Punktzahlen an die Lehrkraft, keine Lösungen vor dem eigenen Versuch, keine Inhalte nur bei Hover, keine Chatbots.

## Bewegung
Vergebene Muster (fortlaufende Buchstaben):

| Buchstabe | Name | eingebaut |
| --- | --- | --- |
| A | Schrittwechsel: Einblenden mit kleiner Verschiebung (`.step`, 350 ms) | ja |
| B | Knopfdruck: kurzes Eindrücken (`.btn`, 80 ms) | ja |

## Bekannte Abweichungen (zur Entscheidung vorgelegt, nicht umgebaut)
Diese Punkte betreffen das gemeinsame `lab.css` und damit alle Stunden. Sie werden erst nach Freigabe geändert.

1. **Bewegung A** dauert 350 ms mit `ease` (Regel: 100–300 ms, `ease-out`) und hatte keine Fassung für „weniger Bewegung“. DS 6 schaltet sie bei „weniger Bewegung“ auf der eigenen Seite ab; Vorschlag: dasselbe in `lab.css` für alle Seiten, Dauer 200 ms, `cubic-bezier(.23,1,.32,1)`.
2. **Kleine Schrift:** `.small` (15 px), Zeitkasten- und Etikettenschrift (14 px) liegen unter 16 px.
3. **Etiketten in Versalien** („AUFTRAG“, Kicker über Überschriften) und **Pillen** (Zeitkasten) widersprechen den Taste-Hausregeln. Für Lernseiten sind sie als Orientierung gewollt; Entscheidung offen.
4. **Weiche Schatten** an ruhenden Karten (`--shadow`).
