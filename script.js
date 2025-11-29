let currentIndex = 0;
let firstInteraction = true;
let videosReady = 0;

const videoElements = [
    document.getElementById('video0'),
    document.getElementById('video1'),
    document.getElementById('video2')
];

const loadingScreen = document.getElementById('loadingScreen');

function checkAllVideosLoaded() {
    videosReady++;
    if (videosReady >= videoElements.length) {
        // All videos are loaded, start playing the first one
        const firstVideo = videoElements[0];
        firstVideo.play().then(() => {
            // Video started successfully, hide loading screen
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 200);
        }).catch(() => {
            // If autoplay fails, just hide the loading screen
            // User will need to tap to start
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        });
    }
}

videoElements.forEach((video, index) => {
    video.removeAttribute('controls');
    video.controls = false;
    video.controlsList = 'nodownload nofullscreen noremoteplayback';
    video.setAttribute('disablePictureInPicture', '');
    video.disablePictureInPicture = true;
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');
    video.preload = 'auto';
    
    video.addEventListener('canplaythrough', checkAllVideosLoaded, { once: true });
    
    video.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    video.addEventListener('webkitbeginfullscreen', (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, true);
    
    video.addEventListener('webkitendfullscreen', (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, true);
    
    video.addEventListener('fullscreenchange', (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, true);
    
    video.addEventListener('webkitfullscreenchange', (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, true);
    
    video.load();
    
    if (index === 0) {
        video.classList.add('active');
        // Don't play yet - wait for all videos to load
    }
});

function switchVideo(index) {
    videoElements.forEach((video, i) => {
        if (i === index) {
            video.classList.add('active');
            video.play().catch(() => {});
        } else {
            video.classList.remove('active');
        }
    });
}

function enterFullscreen() {
    const elem = document.documentElement;
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.webkitEnterFullscreen) {
        elem.webkitEnterFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
    
    if (window.scrollTo) {
        setTimeout(() => {
            window.scrollTo(0, 1);
            setTimeout(() => window.scrollTo(0, 0), 50);
        }, 100);
    }
}

function handleTap(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (firstInteraction) {
        firstInteraction = false;
        enterFullscreen();
        
        // Make sure ALL videos are playing (including the first one)
        videoElements.forEach((video) => {
            video.play().catch(() => {});
        });
    } else {
        currentIndex = (currentIndex + 1) % videoElements.length;
        switchVideo(currentIndex);
    }
}

const tapOverlay = document.getElementById('tapOverlay');

tapOverlay.addEventListener('click', handleTap);
tapOverlay.addEventListener('touchend', handleTap, { passive: false });
tapOverlay.addEventListener('touchstart', (e) => {
    e.preventDefault();
}, { passive: false });

