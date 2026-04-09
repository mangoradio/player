<p align="center">
  <img src="assets/img/logo.svg" alt="openFM Logo" width="200">
</p>

# openFM

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![iTunes API](https://img.shields.io/badge/iTunes_API-blue?style=for-the-badge&logo=apple&logoColor=white)

**openFM** is a modern web application that allows users to stream radio stations via the [laut.fm API](https://laut.fm/). The application displays current track information, station details, and a history of recently played tracks. The design is responsive and utilizes modern web technologies for an optimal user experience.

---

## Features

- **Live streaming** of radio stations via the laut.fm API
- **Display of current track information** (artist, title, album cover)
- **Station details** (name, slogan, description, location, social media links)
- **Broadcast schedule** (current and next show)
- **History of recently played tracks**
- **Responsive design** for all devices
- **Dynamic background images** based on the current album cover

---

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **APIs**: [laut.fm API](https://laut.fm/), [iTunes API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)
- **Design**: Modern, customizable UI with dynamic colors

---

## Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for API requests and streaming)

### Steps
**Clone the repository**:
  ```bash
    git clone https://github.com/ykilian/openFM.git
    cd openFM
  ```
Then open the index.html file in your preferred web browser.

---

## Configuration
### Station selection
Change the `STATION` variable in assets/js/main.js to stream a different station:
```
const STATION = 'mangoradio'; // Replace 'mangoradio' with the desired station name
```

### Broadcast schedule
The broadcast schedule will show your station logo by default. If you want to have custom images,
find out the id of your playlist under https://api.laut.fm/station/YOUR_STATION_NAME/playlists (replace YOUR_STATION_NAME with your station name) and place your image in 
the folder openFM/assets/img, named as the id you just found out.

E.g. The playlist has the id 12345, you name your file 12345.webp

You can use these file formats: `webp`, `png`, `jpg`, `jpeg`, `svg`

The days are getting displayed in german. If you want to change that to any other language, change the `dayMap` variable in assets/js/main.js
```
const dayMap = {
    mon: 'Montag',
    tue: 'Dienstag',
    wed: 'Mittwoch',
    thu: 'Donnerstag',
    fri: 'Freitag',
    sat: 'Samstag',
    sun: 'Sonntag'
};
```

### Hide broadcast schedule

By default, your page will show your broadcast schedule. If you want to disable that feature, just change the `SHOW_TIMETABLE` variable in assets/js/main.js
```
const SHOW_TIMETABLE = true; // Replace true with false
```

---

## Usage

1. Open the application in your web browser.
2. Click the Play button to start the stream.
3. The application will automatically display the current track information, album cover, and station details.
4. Use the links below the station logo to visit the station on other platforms.

---

## API Reference

### laut.fm API

* **Station Information**: https://api.laut.fm/station/{STATION}
* **Current Track**: https://api.laut.fm/station/{STATION}/current_song
* **History**: https://api.laut.fm/station/{STATION}/last_songs
* **Playlist**: https://api.laut.fm/station/{STATION}/playlists

### iTunes API
* **Album Cover**: https://itunes.apple.com/search?term={ARTIST}+{TITLE}&entity=musicTrack&limit=1

---

## LICENSE

This project is licensed under the MIT License.
