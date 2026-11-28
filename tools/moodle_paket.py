#!/usr/bin/env python3
"""Baut die Moodle-Datei des Psycho-Labors: dist/Psycho-Labor_Moodle.zip

Inhalt: alle Seiten im Hauptordner (Startseite index.html), der Ordner assets/ mit Schriften und Skripten,
die Lizenzen und eine Anleitung. Nicht im Paket: Quelltext (src/), Werkzeuge (tools/), Dokumentation (docs/).

Prüfungen (bricht ab, wenn etwas fehlt):
- jeder relative Verweis einer Seite (src, href, url) liegt im Paket
- keine Skripte, Stile oder Schriften von fremden Servern
- gezählt werden Dateien, nicht Einträge (Ordner zählen in der ZIP-Liste mit)

Aufruf: python3 tools/moodle_paket.py
"""
import re
import sys
import zipfile
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
ZIEL = WURZEL / "dist" / "Psycho-Labor_Moodle.zip"
EINZELN = ["LICENSE", "LICENSE-INHALTE.md"]
ORDNER = ["assets"]
NICHT = {"README.md"}  # Entwicklerhinweise in assets/gegenwart

ANLEITUNG = """Psycho-Labor · Moodle-Datei
===========================

So kommt das Labor in den Moodle-Kurs:
1. Im Kurs eine »Datei« als Material anlegen und diese ZIP-Datei hochladen.
2. Die ZIP-Datei im Dateifenster entpacken.
3. index.html als Hauptdatei festlegen. Die ZIP-Datei danach aus dem Dateifenster löschen.
4. Als Darstellung »In neuem Fenster« oder »Öffnen« wählen.
Bitte einmal selbst in Moodle prüfen: Größenlimit, Startseite, Wechsel zwischen den Seiten.

Startseite: index.html mit den Blöcken Wahrnehmung und Motivation.
Alle Seiten laufen ohne Internet. Eingaben bleiben im Browser des Geräts;
»Stand als Datei sichern« hilft beim Gerätewechsel.
Auf dem iPad in Safari öffnen – aus der Dateien-App läuft eine HTML-Datei nur als Vorschau.
Ausnahme vom Offline-Betrieb: Das Video in DS 5 lädt erst nach Antippen von YouTube und braucht dann Internet.

Neu in dieser Fassung (2.2): zu jedem Inhalt eine Geschichte von Jorge Bucay.
  Stunde 2: Linsen – Kontinuum der Regulation
  Stunde 4: Die taube Ehefrau – internal oder external
  Stunde 5: Der wahre Wert des Rings – Vergleiche und Bezugsrahmen
Die Geschichten liest die Lehrkraft aus dem Buch vor. Die Seiten zeigen nur Bilder in eigenen Worten.
"""

VERWEIS = re.compile(r'(?:src|href)="([^"]*)"|url\(\s*"?([^")]*)"?\s*\)')


def paketdateien():
    dateien = sorted(WURZEL.glob("*.html")) + [WURZEL / e for e in EINZELN]
    for ordner in ORDNER:
        dateien += sorted(p for p in (WURZEL / ordner).rglob("*") if p.is_file() and p.name not in NICHT)
    return dateien


def pruefen(seiten, namen):
    fehlt, fremd = [], []
    for seite in seiten:
        html = seite.read_text(encoding="utf8")
        for m in VERWEIS.finditer(html):
            v = (m.group(1) or m.group(2) or "").strip()
            if not v or v.startswith(("#", "data:", "mailto:", "javascript:")) or "'" in v or "+" in v or "${" in v:
                continue
            if v.startswith(("http:", "https:", "//")):
                # Links zum Anklicken sind erlaubt, nachgeladene Dateien nicht
                if m.group(2) is not None or re.search(r'<(script|link|img|iframe|source)[^>]*\b(?:src|href)="' + re.escape(v), html):
                    fremd.append((seite.name, v))
                continue
            pfad = v.split("?")[0].split("#")[0]
            if pfad not in namen:
                fehlt.append((seite.name, pfad))
    return fehlt, fremd


def main():
    dateien = paketdateien()
    namen = {p.relative_to(WURZEL).as_posix() for p in dateien}
    seiten = [p for p in dateien if p.suffix == ".html" and p.parent == WURZEL]
    fehlt, fremd = pruefen(seiten, namen)
    if fehlt or fremd:
        for s, v in fehlt:
            print("fehlt im Paket:", s, "→", v)
        for s, v in fremd:
            print("lädt von fremdem Server:", s, "→", v)
        sys.exit(1)
    ZIEL.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(ZIEL, "w", zipfile.ZIP_DEFLATED) as z:
        for p in dateien:
            z.write(p, p.relative_to(WURZEL).as_posix())
        z.writestr("ANLEITUNG-MOODLE.txt", ANLEITUNG)
    with zipfile.ZipFile(ZIEL) as z:
        anzahl = sum(1 for i in z.infolist() if not i.is_dir())
    print(f"geschrieben: {ZIEL.relative_to(WURZEL)} · {anzahl} Dateien · {len(seiten)} Seiten · {ZIEL.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
