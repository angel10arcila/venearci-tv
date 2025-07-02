// Configuración de medios predefinidos
const mediaFiles = [

    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video3.mp4",
       type: "..."
    },
    {
        name: "Tvfamilia",
        url: "https://59d39900ebfb8.streamlock.net/tvfamilia_480p/tvfamilia_480p/playlist.m3u8",
        type: "Tv"
    },
    {
        name: "DirecTV",
        url: "https://cdn9.vivozytv.com/hotflix/dsports/index.m3u8?token=62b8a7f19e0e1cde5290587c07e834700de3955d-3df1c030bd827dc5fff9bfff1e5548d7-1751215835-1751205035&remote=154.12.246.225",
        type: "Tv"
    },
    
   {
        name: "Venevisión internacional",
        url: "https://vod2live.univtec.com/manifest/4c41c0d8-e2e4-43cc-bd43-79afe715e1b3.m3u8",
        type: "Tv"
    },
    {
        name: "Venevisión",
        url: "https://venevision.akamaized.net/hls/live/2098814/VENEVISION/master.m3u8",
        type: "Tv"
    },
    { 
       name: "Vplus",
       url: "https://univtec.g-mana.live/media/87cf9a41-5ac6-4377-8238-0217c6a19a97/mainManifest.m3u8?player.w=392.727&player.h=669.818&player.content_genre=Television&player.channel_name=VePlus",
       type: "Tv"
    },
    {
        name: "Vepaco Tv",
        url: "https://cloud.fastchannel.es/manifiest/hls/prog9/vepacotv.m3u8",
        type: "Tv"
        
    },
    {
        name: "Canal I",
        url: "ttps://vcp10.myplaytv.com/canali/canali/.m3u8",
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
        name: "Televisa Novelas",
        url: "https://televisa-televisa-1-it.samsung.wurl.tv/playlist.m3u8",
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



