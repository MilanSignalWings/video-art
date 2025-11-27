const videos = ['videos/clip01.mp4', 'videos/clip02.mp4', 'videos/clip03.mp4'];
let currentIndex = 0;
let firstInteraction = true;

const videoElement = document.getElementById('bgVideo');

videoElement.removeAttribute('controls');
videoElement.controls = false;
videoElement.setAttribute('disablePictureInPicture', '');
videoElement.disablePictureInPicture = true;

function setVideo(index) {
    currentIndex = index;
    videoElement.pause();
    videoElement.src = videos[currentIndex];
    videoElement.load();
    videoElement.play().catch(() => {});
}

function enterFullscreen() {
    const elem = document.documentElement;
    
    if (videoElement.webkitEnterFullscreen) {
        try {
            videoElement.webkitEnterFullscreen();
        } catch (e) {}
    } else if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen().catch(() => {});
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
    
    if (firstInteraction) {
        firstInteraction = false;
        enterFullscreen();
    } else {
        currentIndex = (currentIndex + 1) % videos.length;
        setVideo(currentIndex);
    }
}

document.addEventListener('click', handleTap);
document.addEventListener('touchend', handleTap, { passive: false });

setVideo(0);

