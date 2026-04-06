<p align="center">
  <img src="assets/img/logo.svg" alt="openFM Logo" width="200">
</p>

# openFM

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![iTunes API](https://img.shields.io/badge/iTunes_API-blue?style=for-the-badge&logo=apple&logoColor=white)

**openFM** ist eine moderne Webanwendung, die es Benutzern ermöglicht, Radiosender über die [laut.fm API](https://laut.fm/) zu streamen. Die Anwendung zeigt aktuelle Titelinformationen, Senderdetails und eine Historie der zuletzt gespielten Titel an. Das Design ist responsiv und nutzt moderne Webtechnologien für eine optimale Benutzererfahrung.

---

## Funktionen

- **Live-Streaming** von Radiosendern über die laut.fm API
- **Anzeige aktueller Titelinformationen** (Künstler, Titel, Albumcover)
- **Senderdetails** (Name, Slogan, Beschreibung, Standort, Social-Media-Links)
- **Sendeplan** (aktuelle und nächste Sendung)
- **Historie der zuletzt gespielten Titel**
- **Responsives Design** für alle Geräte
- **Dynamische Hintergrundbilder** basierend auf dem aktuellen Albumcover

---

## Technologien

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **APIs**: [laut.fm API](https://laut.fm/), [iTunes API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)
- **Design**: Modernes, anpassbares UI mit dynamischen Farben

---

## Installation

### Voraussetzungen

- Ein moderner Webbrowser (Chrome, Firefox, Edge, Safari)
- Internetverbindung (für API-Abfragen und Streaming)

### Schritte

1. **Repository klonen**:
  ```bash
   git clone https://github.com/IhrBenutzername/openFM.git
  ```
2. **Projektverzeichnis öffnen**:
  ```bash
   cd openFM
  ```
3. **Lokale Entwicklungsumgebung starten**:
- Öffnen Sie die Datei `index.html` in Ihrem bevorzugten Webbrowser.

---

## Konfiguration

### Senderauswahl

- Ändern Sie die Variable `STATION` im `<script>`-Tag der `index.html`, um einen anderen Sender zu streamen:
  ```javascript
  const STATION = 'mangoradio'; // Ersetzen Sie 'mangoradio' mit dem gewünschten Sendernamen
  ```

### Benutzerdefinierte Anpassungen

- **Favicon**: Ersetzen Sie `assets/img/favicon.png` mit Ihrem eigenen Favicon.
- **Logo**: Ersetzen Sie `assets/img/logo.svg` mit Ihrem eigenen Logo.
- **Stile**: Passen Sie die Datei `assets/css/styles.css` an, um das Design nach Ihren Wünschen zu ändern.

---

## Nutzung

1. Öffnen Sie die Anwendung in Ihrem Webbrowser.
2. Klicken Sie auf den **Play-Button**, um den Stream zu starten.
3. Die Anwendung zeigt automatisch die aktuellen Titelinformationen, das Albumcover und die Senderdetails an.
4. Nutzen Sie die Links unter dem Senderlogo, um den Sender auf anderen Plattformen zu besuchen.

---

## API-Referenz

### laut.fm API

- **Senderinformationen**: `https://api.laut.fm/station/{STATION}`
- **Aktueller Titel**: `https://api.laut.fm/station/{STATION}/current_song`
- **Historie**: `https://api.laut.fm/station/{STATION}/last_songs`

### iTunes API

- **Albumcover**: `https://itunes.apple.com/search?term={ARTIST}+{TITLE}&entity=musicTrack&limit=1`

---

## Lizenz

Dieses Projekt steht unter der **MIT-Lizenz**.
