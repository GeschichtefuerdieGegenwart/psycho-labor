# PRODUCT

Stand: 25.10.2026 · ohne Impeccable-Plugin von Hand angelegt (website-design-workflow, Schritt 1)

## Platform
Einzelne HTML-Seiten auf GitHub Pages. Jede Seite ist nach dem Bauen eine einzige Datei und läuft auch per `file://` ohne Netz.

## Stack
Plain HTML, CSS und JavaScript ohne Framework. Gemeinsame Dateien: `assets/lab.css`, `assets/lab.js`, `assets/bausteine.js`, `assets/qrcode.js`. Build: `node tools/inline.js src/<datei>.html`.

## Users
Sieben Schülerinnen im Wahlfach Psychologie (J2, berufliches Gymnasium) auf eigenen iPads mit Stift und GoodNotes. Die Lehrkraft nutzt `auswertung.html` auf ihrem iPad am Beamer.

## Purpose
Ein kurzer Selbstversuch zu Beginn einer Doppelstunde: Vermutung festhalten, Versuch durchführen, eigene Daten sehen, anonym zum Kursvergleich beitragen und eine Lernmappe (PDF, 4 Seiten) für GoodNotes erzeugen. Erklären, Anwenden und Sichern geschehen danach analog.

## Positioning
Das Labor ersetzt keinen Unterricht. Es wird nur dort eingesetzt, wo das Tablet etwas leistet, das Papier nicht oder nur mühsam kann (verdeckte Zuteilung von Bedingungen, genaue Zeiten, sofortige anonyme Kursdaten, Lernmappe mit eigenen Daten).

## Operating Context
Später Nachmittag, freiwilliger Kurs, Arbeitsphasen von wenigen Minuten, danach „Ende des Labors“. Beamer 1280 × 720.

## Constraints
Keine Namen, keine Konten, kein Tracking, keine externen Skripte oder Schriften. Speichern nur im Browser (`localStorage`), löschbar über „Alle Eingaben löschen“. Persönliches ist freiwillig, Ergebnisse sind keine Diagnose.

## Brand Commitments
Ruhig, klar, warm: Petrol als Hauptfarbe, Koralle als Hervorhebung, Gold für Hilfen. Schaubilder sind als Modelle gekennzeichnet, Fälle als ausgedacht, Studien mit Autor und Jahr.

## Evidence on Hand
Unterrichtsmaterial der Lehrkraft (Motivation, Wahrnehmung, Gedächtnis), Orientierungsmodell vom 8.10.2026, Studien mit Quellenangabe in den Verlaufsplänen.

## Principles
Erst vermuten, dann erleben, dann aufdecken. Auftrag, Information und Hilfe sind sichtbar getrennt. Lernübersicht erst nach dem Versuch. Lernmappe immer genau 4 Seiten.

## Accessibility
Ziel WCAG 2.2 AA: Zielflächen mindestens 44 px, Schrift im Fließtext ab 16 px, Farbe nie allein, Tastaturbedienung, dunkle Ansicht als Option. Bekannte Abweichungen stehen in `DESIGN.md`.
