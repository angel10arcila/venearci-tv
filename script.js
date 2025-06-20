// Configuración de medios predefinidos
const mediaFiles = [
    
    {
        name: "Tvfamilia",
        url: "https://59d39900ebfb8.streamlock.net/tvfamilia_480p/tvfamilia_480p/playlist.m3u8",
        type: "Tv"
    },
    {
        name: "DirecTV",
        url: "https://cdn12.vivozytv.com/hotflix/dsports/index.m3u8?token=437fdf907430cb287e0e7e38650e14f6630203f3-3e876717059c1d645e7c8c75b4e84f7a-1750448078-1750437278&remote=200.93.97.245",
        type: "Tv"
    },
    {
        name: "Televen",
        url: "https://mediablocks-ve.global.ssl.fastly.net/10255/live/hls/televen/index.m3u8?hdnts=data%3Dip%3D200.93.97.245%2Cid%3DTLV-GUEST%2Cpid%3D255%2Cdid%3DN%2FA%2Csid%3DWBS~acl%3D%2F10255%2Flive%2Fhls%2Fteleven%2F%2A~exp%3D1750448898~hmac%3Da55ccc14a94a2262d33dd58e396686d4d545ac7c08e7c24c39f03cb4a3638b90",
        type: "Tv"
    },
    {
        name: "Canal I",
        url: "https://vcp10.myplaytv.com/canali/canali/.m3u8",
        type: "Tv"
    },   
    {
        name: "Vepaco Tv",
        url: "https://cloud.fastchannel.es/manifiest/hls/prog9/vepacotv.m3u8",
        type: "Tv"
        
    },
    {
        name: "Anzoátegui Tv",
        url: "https://vcp2.myplaytv.com/anzoateguitv/anzoateguitv/playlist.m3u8",
        type: "Tv"
    },
    {
        name: "Telemundo Pr",
        url: "https://nbculocallive.akamaized.net/hls/live/2037499/puertorico/stream1/master.m3u8",
        type: "Tv"
    },
    {
        name: "Red Bull Tv",
        url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        type: "Tv"
    },
    {
        name: "Tve",
        url: "https://rtvelivestream-rtveplayplus.rtve.es/rtvesec/int/tvei_ame_main_dvr_576.m3u8",
        type: "Tv"
    },
    {
        name: "Star Tve",
        url: "https://rtvelivestream-rtveplayplus.rtve.es/rtvesec/int/star_main_dvr_720.m3u8",
        type: "Tv"
    },  
    {
        name: "Kanal D",
        url: "https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg01602-themahqfrance-vivekanald-samsungspain/playlist.m3u8",
        type: "Tv"
    },
    {
        name: "Spacecityhn",
        url: "https://tvpass.org/live/space-city-home-network/hd",
        type: "Tv"
    },
    {
        name: "Mlb Network",
        url: "https://tvpass.org/live/MLBNetwork/hd",
        type: "Tv"
    },
    {
        name: "Dw Español",
        url: "https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8",
        type: "Tv"
    },
    {
        name: "Amc",
        url: "https://d38fxgxhpllpfu.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-4w47pf3x50sko/playlist.m3u8",
        type: "Tv"
    },
    {
        name: "Televisa Novelas",
        url: "https://televisa-televisa-1-it.samsung.wurl.tv/playlist.m3u8",
        type: "Tv"
    },
    {
        name: "Punta Cana Tv",
        url: "https://rdn.essastream.com:3544/live/puntacanatvlive.m3u8",
        type: "Tv"
    },
    {
        name: "Free Tv",
        url: "https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg01024-olympusat-topcinelatam-ono/playlist.m3u8",
        type: "Tv"
    },
    {
        name: "Runtime Family",
        url: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=3528",
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



