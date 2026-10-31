# Haushalt-App – Anleitung

Sieben Bereiche (Tab-Leiste unten, auf dem Handy wischbar), jeder mit eigener Figur:

- **💶 Bilanz** (Börsi, das Portemonnaie) – Gehalt und andere Einnahmen eintragen. Die laufenden Kosten kommen automatisch aus „Rechnungen“, dazu die monatliche Sparrate. Zeigt, was frei bleibt: pro Monat, Woche und Tag.
- **🎂 Geburtstage** (Kuchi, der Kuchen) – mit Countdown, Alter, Geschenkideen und Kalender-Erinnerung (Vortag + Tag selbst). Roter Punkt am Tab = Geburtstag in den nächsten 7 Tagen.

- **⚡ Strom** (Volti, die Glühbirne) – Zählerstand per Drehrädchen eintragen, Verbrauch, Durchschnitt, Warnung bei extrem hohem Verbrauch.
- **🧾 Rechnungen** (Zetti, der Kassenzettel) – Miete, Abos, Verträge, Versicherungen … eintragen. Die App rechnet hoch, was das pro Monat und pro Jahr kostet.
- **⏰ Erinnerungen** (Ticki, der Wecker) – Zahlungserinnerungen, z. B. Rundfunkbeitrag (Vorlage: 55,08 € am 15. Feb/Mai/Aug/Nov). Zeigt, was als Nächstes fällig ist, was überfällig ist und was in den nächsten 12 Monaten ansteht. Mit „Bezahlt“ abhaken. Ticki klingelt, wenn etwas in 3 Tagen fällig ist.
- **🛒 Einkauf** (Tüti, die Papiertüte) – Einkaufsliste. Mehrere Sachen auf einmal mit Komma trennen („Milch, Eier“). Abhaken, „Leeren“ entfernt Erledigtes.
- **🫙 Sparen** (Glasi, das Sparglas) – Regler hochziehen, das Glas füllt sich mit Scheinen. Stufen 10 / 50 / 100 € = Schrittweite. Betrag antippen für eine genaue Summe (z. B. Kontostand), Stift oben für Ziel und Name.

Eine Rechnung kann gleichzeitig Erinnerung sein: Schalter „Erinnern“ beim Bearbeiten.

## Windows (Haushalt.exe)

`windows\Haushalt.exe` doppelklicken. Die App öffnet sich als eigenes Fenster (läuft über Microsoft Edge, ohne Browserleiste).

Alles wird **automatisch** gespeichert, ohne Knopf: in `Dokumente\Haushalt\haushalt-daten.json`.
Daneben liegt `haushalt-daten.bak.json` mit dem Stand vor der letzten Änderung.
Den Ordner `Dokumente\Haushalt` kannst du z. B. per OneDrive sichern lassen.

**Fenster:** Klein wie ein Handy (Tabs unten) oder groß/maximiert (Seitenleiste links, zwei Spalten). Die Ansicht passt sich automatisch an.
Größe, Position und „maximiert“ werden gemerkt. Echtes Vollbild: Knopf „Vollbild“ unten in der Seitenleiste oder F11.
Neu bauen nach Änderungen: `powershell -ExecutionPolicy Bypass -File windows\build.ps1`

## iPhone

1. Ordner kostenlos online stellen, z. B. GitHub Pages: Repository anlegen, alle Dateien hochladen (außer `windows\`), Settings → Pages → Branch `main` → Save.
2. Die Adresse in **Safari** öffnen → Teilen → **„Zum Home-Bildschirm“**.

PC und iPhone haben getrennte Daten. Übertragen: im Strom-Tab „Backup sichern“ auf dem einen Gerät, „Laden“ auf dem anderen. Das Backup enthält alle Bereiche.

## Benachrichtigungen

Die App kann sich nicht selbst melden, wenn sie geschlossen ist. Dafür gibt es Kalender-Termine:

- Strom: im Strom-Tab „🔔 Erinnerung“ → am 1. jedes Monats um 9:00.
- Zahlungen: im Termine-Tab „📅 Alle in den Kalender“ oder pro Zahlung beim Bearbeiten. Du wirst am Vortag und am Fälligkeitstag erinnert.

Wenn du später etwas änderst, den Termin im Kalender löschen und neu hinzufügen.

## Wie gerechnet wird

- Strom: Verbrauch = Differenz zweier Zählerstände pro Tag. Durchschnitt ab 3 Zeiträumen, Warnung bei mehr als 30 % über dem Schnitt.
- Kosten pro Monat = Betrag × Anzahl Zahlungen im Jahr ÷ 12. Einmalige Zahlungen zählen nicht zu den laufenden Kosten.

## Wichtig: Daten sichern

Die Daten liegen nur auf dem Gerät. Ab und zu „Backup sichern“ und die Datei z. B. in iCloud Drive oder OneDrive ablegen.
