let currentIndex = 0;
let firstInteraction = true;

const videoElements = [
    document.getElementById('video0'),
    document.getElementById('video1'),
    document.getElementById('video2')
];

videoElements.forEach((video, index) => {
    video.removeAttribute('controls');
    video.controls = false;
    video.controlsList = 'nodownload nofullscreen noremoteplayback';
    video.setAttribute('disablePictureInPicture', '');
    video.disablePictureInPicture = true;
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');
    
    video.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    video.addEventListener('webkitbeginfullscreen', (e) => {
        e.preventDefault();
    });
    
    video.addEventListener('webkitendfullscreen', (e) => {
        e.preventDefault();
    });
    
    video.load();
    
    if (index === 0) {
        video.classList.add('active');
        video.play().catch(() => {});
    } else {
        video.preload = 'auto';
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
    const activeVideo = videoElements[currentIndex];
    
    if (activeVideo.webkitEnterFullscreen) {
        try {
            activeVideo.webkitEnterFullscreen();
        } catch (e) {}
    } else if (activeVideo.requestFullscreen) {
        activeVideo.requestFullscreen().catch(() => {});
    } else if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    
    if (window.scrollTo) {
        window.scrollTo(0, 1);
        setTimeout(() => window.scrollTo(0, 0), 100);
    }
}

function handleTap(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (firstInteraction) {
        firstInteraction = false;
        enterFullscreen();
        
        videoElements.forEach((video, i) => {
            if (i !== 0) {
                video.play().catch(() => {});
            }
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

