const STATION = 'mangoradio';
const SHOW_TIMETABLE = true
let stationLogo = '';
const dayMap = {
    mon: 'Montag',
    tue: 'Dienstag',
    wed: 'Mittwoch',
    thu: 'Donnerstag',
    fri: 'Freitag',
    sat: 'Samstag',
    sun: 'Sonntag'
};

async function fetchCover(artist, title) {
    if (!artist || artist.includes("Lade") || artist.includes("Werbepause")) return stationLogo;
    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist + ' ' + title)}&entity=musicTrack&limit=1`);
        const data = await res.json();
        return data.results?.[0]?.artworkUrl100.replace('100x100bb', '600x600bb') || stationLogo;
    } catch { return stationLogo; }
}

async function updateData() {
    var cover;
    try {
        const [stationRes, currentSongRes, historyRes, playlistRes] = await Promise.all([
            fetch(`https://api.laut.fm/station/${STATION}`),
            fetch(`https://api.laut.fm/station/${STATION}/current_song`),
            fetch(`https://api.laut.fm/station/${STATION}/last_songs`),
            fetch(`https://api.laut.fm/station/${STATION}/playlists`),
        ]);

        const station = await stationRes.json();
        const current = await currentSongRes.json();
        const history = await historyRes.json();
        let playlist = null;
        if (playlistRes.ok) {
            try {
                playlist = await playlistRes.json();
            } catch (e) {
                playlist = null;
            }
        }

        stationLogo = station.images.station_640x640 || station.images.station_120x120;
        color = station.color || '#169da8'
        document.documentElement.style.setProperty('--accent', color)

        const favicon = document.getElementById('dynamic-favicon');
        if (favicon) {
            favicon.href = stationLogo;
        }

        document.getElementById('header-name').textContent = station.display_name.toUpperCase();
        document.getElementById('header-slogan').textContent = station.format;
        document.getElementById('header-desc').textContent = station.description;
        document.getElementById('header-logo').src = stationLogo;
        document.getElementById('live-from').textContent = `LIVE FÜR EUCH AUS ${station.location.toUpperCase()}`;
        document.getElementById('powered-by').textContent = `${station.display_name.toUpperCase()} is powered by:`;
        document.title = `${station.display_name.toUpperCase()} - Live Stream`;

        document.getElementById('m3u-link').href = `${station.stream_url}.m3u`;
        document.getElementById('pls-link').href = `${station.stream_url}.pls`;
        document.getElementById('radiode-link').href = `https://www.radio.de/s/lautfm-${station.display_name}`;
        document.getElementById('phonostar-link').href = `https://www.phonostar.de/radio/lautfm/${station.display_name}`;

        if (document.getElementById('lfm-link')) {
            document.getElementById('lfm-link').href = `${station.page_url}`;
            document.getElementById('lfm-link').style.display = 'flex';
        }
        if (station.third_parties.website?.url) {
            document.getElementById('hp-link').href = station.third_parties.website.url;
            document.getElementById('hp-link').style.display = 'flex';
        }
        if (station.third_parties.facebook?.page) {
            document.getElementById('fb-link').href = station.third_parties.facebook.page;
            document.getElementById('fb-link').style.display = 'flex';
        }
        if (station.third_parties.instagram?.name) {
            document.getElementById('ig-link').href = `https://instagram.com/${station.third_parties.instagram.name}`;
            document.getElementById('ig-link').style.display = 'flex';
        }

        document.getElementById('track').textContent = current.title;
        document.getElementById('artist').textContent = current.artist.name;
        if (station.current_playlist) {
            document.getElementById('show-name-now').textContent = station.current_playlist.name;
            document.getElementById('show-description-now').textContent = station.current_playlist.description;
            document.getElementById('show-time-now').textContent = station.current_playlist.hour;
        }
        if (station.next_playlist) {
            document.getElementById('show-name-next').textContent = station.next_playlist.name;
            document.getElementById('show-description-next').textContent = station.next_playlist.description;
            document.getElementById('show-time-next').textContent = station.next_playlist.hour;
        }

        cover = await fetchCover(current.artist.name, current.title);
        document.getElementById('cover-art').src = cover;
        document.getElementById('background-blur').style.backgroundImage = `url("${cover}")`;

        const histWithCovers = await Promise.all(history.slice(1, 8).map(async s => ({
            ...s, cover: await fetchCover(s.artist.name, s.title)
        })));

        document.getElementById('history-container').innerHTML = histWithCovers.map(s => `
                <div class="history-item">
                    <img src="${s.cover}" alt="Cover">
                    <div class="overflow-hidden">
                        <div class="fw-bold text-truncate" style="font-size:.9rem">${s.title}</div>
                        <div class="text-truncate" style="font-size:0.75rem">
                            ${s.artist.laut_url ? `<a href="${s.artist.laut_url}" target="_blank" style="color: inherit; text-decoration: none;">${s.artist.name}</a>` : s.artist.name}
                        </div>
                    </div>
                </div>
            `).join('');

        function setPlaylistCover(element, playlist_id) {
            const extensions = ['webp', 'png', 'jpg', 'jpeg', 'svg'];
            let imageFound = false;

            extensions.forEach(ext => {
                if (!imageFound) {
                    const imgUrl = `assets/img/${playlist_id}.${ext}`;
                    const img = new Image();
                    img.src = imgUrl;
                    img.onload = () => {
                        element.style.backgroundImage = `url('${imgUrl}')`;
                        imageFound = true;
                    };
                    img.onerror = () => {
                    };
                }
            });

            if (!imageFound) {
                element.style.backgroundImage = `url(${stationLogo})`;
            }
        }

        function generateTimetable(playlists) {
            const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            let timetableHTML = '';

            days.forEach(day => {
                const dayName = dayMap[day];
                const shows = [];

                playlists.forEach(playlist => {
                    playlist.airtimes.forEach(airtime => {
                        if (airtime.day === day) {
                            shows.push({
                                name: playlist.name,
                                id: playlist.id,
                                start: airtime.hour,
                                end: airtime.end_time
                            });
                        }
                    });
                });

                shows.sort((a, b) => a.start - b.start);

                const showBlocks = shows.map(show =>
                    `<div class="show-block" data-playlist-id="${show.id}">
                <div class="playlist-cover"></div>
                <span class="show-time">${show.start}:00–${show.end}:00</span>
                <span class="show-name">${show.name}</span>
            </div>`
                ).join('');

                timetableHTML += `
            <div class="day-card">
                <div class="day-header">${dayName}</div>
                ${showBlocks}
            </div>
        `;
            });

            return timetableHTML;
        }

        if (SHOW_TIMETABLE && playlist){
            document.getElementById('timetable').innerHTML = generateTimetable(playlist);
        }

        document.querySelectorAll('.show-block').forEach(card => {
            const playlistId = card.getAttribute('data-playlist-id');
            const playlistCover = card.querySelector('.playlist-cover')
            setPlaylistCover(playlistCover, playlistId);
        });

    } catch (e) {
        console.error("Update Error", e);
    }
}

const audio = document.getElementById('stream');
const ctrl = document.getElementById('ctrl');
ctrl.addEventListener('click', () => {
    if (audio.paused) {
        audio.src = `https://stream.laut.fm/${STATION}`;
        audio.play();
        document.getElementById('play-icon').innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
        audio.pause();
        audio.src = '';
        document.getElementById('play-icon').innerHTML = '<i class="bi bi-play-fill"></i>';
    }
});

updateData();
setInterval(updateData, 10000);