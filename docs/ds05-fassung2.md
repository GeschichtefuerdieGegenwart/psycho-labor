# DS 5 · Fassung 2 – Lernweg statt Einstieg

Stand: 6. November 2026 · Branch `ds05-fassung2`

## Entscheidung: Variante B (durchgängig)

Fassung 1 war ein Labor als Einstieg (Variante A); Theorie und Aufgaben liefen auf Papier. Fassung 2 trägt die ganze Doppelstunde, nach dem Vorbild von M23 im GGK-Labor. Der Einstieg mit den Tests bleibt unverändert im Kern.

Mehrwert gegenüber Papier in einem Satz: verdeckte Bedingungen für zwei Kurshälften, Kursdaten ohne Namen und eine eigene Rückmeldung zu jeder Antwortoption – gebündelt in einer Zusammenfassung aus den eigenen Eingaben.

## Ablauf (Sprungmarken)

| Schritt | ID | Inhalt |
| --- | --- | --- |
| Start | `#s-1` | Lernweg, Ziele, Ankündigung der Täuschung, Schalter »Weniger Bewegung« |
| Erleben 1–6 | `#s-fot` … `#s-6` | Herr Fotiou einschätzen (vor jeder Täuschung) → Vermutung → Punkte → Linien im Gruppenchat → QR → Auflösung |
| Station 1 | `#s-asch` | Schaubild Asch-Tisch, Video mit zwei Beobachtungsfragen, Vorhersage → Befund, Konformität |
| Station 2 | `#s-bed` | vier Bedingungen vorhersagen (drei senken die Anpassung, eine nicht) → Balken und Erklärung je Bedingung; zwei Gründe (Schaubild); drei Zuordnungen |
| Station 3 | `#s-halo` | beide Zeichnungen, Vorhersage → Kursergebnis am Beamer; Halo, Vorurteil; zwei Zuordnungen |
| Station 4 | `#s-pruef` | Demo oder Studie, Ethik; zwei Zuordnungen |
| Sichern | `#s-prod`, `#s-ende` | Tipp ab 40 Wörtern → Kriterienraster, Selbsteinschätzung, Vermutung jetzt; Zusammenfassung (4 Seiten), Eingaben löschen |

## Interaktionsmuster (höchstens drei)

1. **Vorhersage → Auflösung** – weil der Abgleich mit der eigenen Erwartung der Lerngegenstand ist (»Ich passe mich nie an«).
2. **Zuordnen mit Begründung, gestuft** (Gegenwart `wahl`) – weil informativ/normativ und Halo/Vorurteil Deutungsfragen sind; Rückmeldung »zentral · auch begründbar · passt kaum« je Option, zentrale Antwort an wechselnder Stelle.
3. **Satzanfänge → Kriterienraster** – für das Produkt; das Raster erscheint erst nach dem eigenen Text.

Der Abrufstart bleibt analog (Folie 2).

## Herr Fotiou

Zwei selbst gezeichnete SVG-Fassungen (`FIGUREN_DS05.fotiou("laecheln" | "ernst")`), gleich bis auf Augenbrauen, Augen und Mund. Code 1 = lächelnd und erfundene Gruppenantworten, Code 2 = ernst und keine Gruppenantworten. Die Einschätzung kommt als erster Schritt, deshalb beeinflusst der Gruppenteil sie nicht. Das Foto mit Wasserzeichen entfällt.

## Code für den Kursvergleich

`ds05.id.G|O.schätzung÷wahr×100.gefolgt.richtig.sicherheit×10.fotiouAnzahl.fotiouPositiv×10` (9 Teile). Die Auswertung liest auch Codes aus Fassung 1 (8 Teile). Neues Diagramm »Station 3 · Herr Fotiou«: Durchschnitt aus intelligent, geduldig, humorvoll, hilfsbereit je Zeichnung; »streng« und »kann ich nicht sagen« zählen nicht.

## Speicher

Neuer Schlüssel `psycholabor:ds05b` (Schritte geändert). »Alle Eingaben löschen« entfernt ihn und den alten Schlüssel `ds05` – mit Rückfrage auf der Seite.

## Inhalte und Status

| Element | Status | Beleg |
| --- | --- | --- |
| Asch-Befunde (unter 1 %, ≈ 1/3, 3 von 4, jede vierte nie) | belegt, Sekundärquellen | Simply Psychology »Asch Conformity Experiment«; themantic education »Key Study: Conformity – Asch (1955)« |
| Bedingungen (≈ 3 %, ≈ 13 %, ≈ 32 %, größere Gruppen kaum mehr, Verbündeter auf etwa ein Viertel des Werts – 8 % daraus gerechnet, geheim ≈ 12,5 %) | belegt, gerundet, Sekundärquellen | wie oben |
| Interviewgründe | korrigiert: drei Arten ohne Rangfolge | wie oben; Korrekturliste der Vorprüfung, Punkt 5 |
| Deutsch & Gerard 1955, Sherif 1935, Thorndike 1920, Bond & Smith 1996 | belegt | Lehrbuchwissen, in Fassung 1 geprüft |
| Video YouTube `TYIh4MkcfJA` | **prüfbedürftig** | laut Simply Psychology nachgestellte TV-Szene, nicht Original; nicht selbst angesehen |
| Herr Fotiou, Mia, Tom, Lina, Leon, Jana, Gruppenchat | ausgedachter Fall | – |
| Schaubilder Asch-Tisch, zwei Gründe | Modell | – |

Korrigiert gegenüber Fassung 1: »Im Interview sagten viele, sie hätten gewusst, dass die Gruppe falsch lag« → drei Gründe ohne Rangfolge; »auf etwa 5 %« (Verbündeter) → »auf etwa ein Viertel«.

## Lernübersicht

Die Übersicht (Schublade oben rechts) wird erst beim Tipp freigeschaltet, weil sie die Befunde der Stationen enthält und sonst die Vorhersagen verrät.

## Ethik

In der Forschung: harmlos, für den Versuch nötig, danach vollständig aufgeklärt. Die vorherige Ankündigung ist eine zusätzliche Schulregel.

## Gegenwart

Übernommen: Bundle (`wahl`, Balken-Markup, `bewegen`/`staffel`), Schalter »Weniger Bewegung« (`data-bewegung="weniger"`), kein Text unter 16 px auf dem Bildschirm, Etiketten ohne Versalien, Bewegung nur als Rückmeldung (transform/opacity). Bewusst nicht übernommen: Farben, Schriften und die Regel »keine Illustrationen« – das Psycho-Labor arbeitet mit selbst gezeichneten SVGs.

## Zeitdiagnose

Bildschirmtext ca. 2 080 Wörter + ca. 420 Wörter Rückmeldungen → ca. 17 Minuten Lesezeit bei 150 Wörtern pro Minute. Dazu ca. 20 Eingaben (ca. 20 Minuten), Versuche (ca. 8 Minuten), Video (ca. 3 Minuten), Plenum (ca. 12 Minuten) → ca. 60–65 Minuten für 75 Minuten Laborzeit.

## Prüfung

Gelaufen:

- Playwright-Durchlauf beider Codes ohne Konsolenfehler; Zuordnung ohne Begründung bleibt gesperrt; Stand nach Neuladen; Löschen mit Rückfrage.
- Zusammenfassung: 4 Seiten A4 (eigene Eingaben, leer, Beispiel, Belastungstest mit vollen Feldern); Lösungskarte 1 Seite.
- Breiten 375, 768, 1024, 1280, 1366 px hell und dunkel ohne waagerechtes Scrollen; kein Bildschirmtext unter 16 px.
- Auswertungsseite mit Codes aus Fassung 1 und 2.
- Unabhängige Prüfung aus Sicht einer Schülerin ohne Vorkenntnisse (Subagent). Behoben: Rückmeldungen waren vor dem Festlegen sichtbar (CSS-Vorrang im Bundle); Übersicht verriet Befunde; »widersprechen« doppeldeutig; Verbündeter-Wert uneinheitlich; Station 2 ohne Erklärung und ohne Gegenbeispiel; z6 setzte ein Kursergebnis voraus, »Zufall, also wertlos« zu milde bewertet; Ethik-Bedingungen der Forschung ungenau; Kriterienraster bei 375 px zu breit; Video-Fragen ohne Ausweichweg; Zeitangaben; feste weibliche Formen; QR-Text; »nicht verlässlich sehen«.

Nicht gelaufen: echtes iPad (Safari, hoch/quer), VoiceOver, Zoom 200 %, Export nach GoodNotes, Video selbst angesehen, axe.
