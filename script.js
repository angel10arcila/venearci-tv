// Configuración de medios predefinidos
const mediaFiles = [
    
    {
        name: "Tvfamilia",
        url: "https://59d39900ebfb8.streamlock.net/tvfamilia_480p/tvfamilia_480p/playlist.m3u8?p",
        type: "Tv"
    },
    {
        name: "Anzoátegui Tv",
        url: "https://vcp2.myplaytv.com/anzoateguitv/anzoateguitv/playlist.m3u8?p",
        type: "Tv"
    },
   {
        name: "Telemundo Pr",
        url: "https://nbculocallive.akamaized.net/hls/live/2037499/puertorico/stream1/master.m3u8?p",
        type: "Tv"
    },
   {
        name: "Red Bull Tv",
        url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        type: "Tv"
    },
    {
        name: "Tve",
        url: "https://rtvelivestream-rtveplayplus.rtve.es/rtvesec/int/tvei_ame_main_dvr_576.m3u8?p",
        type: "Tv"
    },
    {
        name: "Star Tve",
        url: "https://rtvelivestream.akamaized.net/rtvesec/int/star_main_dvr.m3u8?p",
        type: "Tv"
    },
    {
        name: "Azteca Internacional",
        url: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=539",
        type: "Tv"
    },
    {
        name: "Dw Español",
        url: "https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8?p",
        type: "Tv"
    },
    {
        name: "Amc",
        url: "https://d38fxgxhpllpfu.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-4w47pf3x50sko/playlist.m3u8?p",
        type: "Tv"
    },
    {
        name: "Televisa Novelas",
        url: "https://televisa-televisa-1-it.samsung.wurl.tv/playlist.m3u8?p",
        type: "Tv"
    },
    {
        name: "Punta Cana Tv",
        url: "https://rdn.essastream.com:3544/live/puntacanatvlive.m3u8",
        type: "Tv"
    },
    {
        name: "Show Ven",
        url: "https://vcp.myplaytv.com/coll/coll/playlist.m3u8?p",
        type: "Tv"
    },
    {
        name: "Runtime Family",
        url: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=3528",
        type: "Tv"
    },
   {
        name: "Teleonce",
        url: "https://customer-gllhkkbamkskdl1p.cloudflarestream.com/eyJhbGciOiJSUzI1NiIsImtpZCI6ImI3YmIwODNmMDhkNmQ5NWExZjIzZWE3ZWRhOWY4NTZhIn0.eyJzdWIiOiJhOTJjNGQzMmE4ZTgxMzQ1ZmVmNWY0YWZhYzM0OTViMiIsImtpZCI6ImI3YmIwODNmMDhkNmQ5NWExZjIzZWE3ZWRhOWY4NTZhIiwiZXhwIjoxNzQ1ODA3OTY4LCJhY2Nlc3NSdWxlcyI6W3sidHlwZSI6ImlwLmdlb2lwLmNvdW50cnkiLCJhY3Rpb24iOiJibG9jayIsImNvdW50cnkiOlsiUlUiLCJCWSJdfV19.USEvbzbDkGMiwKAd3dI3VNGnugcs6NRciKz9V9yOjdY0EIHelefeQO5xuNQEYe6hb9gjjyu3DcT0J1UNZi6w8-rgNFIMk8n_bx3oelzbf0IpfdUKr_moDj0DsHHPS1iifnHNVcy7DUXIwokFM1Bbt1U_eJJEXulYP7uH6VlLuswt6ZcVMjFRvvfxQjVVj9YWmKAZCP4wZQXrjevcRUKcebeHOb_S_PpdutK6xm3-bRDViP8xLBx38pEb4nwXINkVJ_yxND5BYHAIaiZvzjY4gniUv_Ht8A7sm9shUOi5jiGwJO1pgUZVJgPqftDUupXcnDE85-Yj5Xb0CepOUOnZoQ/manifest/video.m3u8?CMCD=cid%3D%221745764770051%22%2Cmtp%3D500%2Cot%3Dm%2Csf%3Dh%2Csid%3D%2287ff912c-ba5d-498a-a37f-64a8d117c813%22%2Csu",
        type: "Tv"
    },
    
   {
        name: "Venevisión",
        url: "https://venevision.akamaized.net/hls/live/2098814/VENEVISION/master.m3u8?p",
        type: "Tv"
    },
    
];

let currentTrack = 0;
const mediaPlayer = document.getElementById('mediaPlayer');
const playlist = document.getElementById('playlist');

// Inicializar reproductor
function initPlayer() {
    // Generar playlist
    mediaFiles.forEach((media, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            ${media.name}
            <span class="format-badge">${media.type.toUpperCase()}</span>
        `;
        item.onclick = () => loadMedia(index);
        playlist.appendChild(item);
    });

    // Cargar primer medio
    loadMedia(0);
}

function loadMedia(index) {
    currentTrack = index;
    const media = mediaFiles[index];
    
    // Actualizar clase activa en playlist
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Cargar medio según tipo
    if (media.type === 'm3u') {
        loadM3U(media.url);
    } else {
        mediaPlayer.src = media.url;
        mediaPlayer.play();
    }
}

async function loadM3U(url) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        // Procesar M3U y extraer URLs
        const urls = content.match(/^(?!#).+$/gm);
        if (urls && urls.length > 0) {
            mediaPlayer.src = urls[0];
            mediaPlayer.play();
        }
    } catch (error) {
        console.error('Error loading M3U:', error);
    }
}

function playPause() {
    if (mediaPlayer.paused) {
        mediaPlayer.play();
    } else {
        mediaPlayer.pause();
    }
}

function nextTrack() {
    const next = (currentTrack + 1) % mediaFiles.length;
    loadMedia(next);
}

function previousTrack() {
    const prev = (currentTrack - 1 + mediaFiles.length) % mediaFiles.length;
    loadMedia(prev);
}

function toggleMute() {
    mediaPlayer.muted = !mediaPlayer.muted;
}

// Eventos del reproductor
mediaPlayer.addEventListener('ended', () => {
    nextTrack();
});

mediaPlayer.addEventListener('error', (e) => {
    console.error('Error en la reproducción:', e);
    nextTrack();
});

// Inicializar
initPlayer();



