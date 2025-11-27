const videos = ['videos/clip01.mp4', 'videos/clip02.mp4', 'videos/clip03.mp4'];
let currentIndex = 0;
let firstInteraction = true;

const videoElement = document.getElementById('bgVideo');

function setVideo(index) {
    currentIndex = index;
    videoElement.pause();
    videoElement.src = videos[currentIndex];
    videoElement.load();
    videoElement.play().catch(() => {});
}

function enterFullscreen() {
    const elem = document.documentElement;
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function handleTap() {
    if (firstInteraction) {
        firstInteraction = false;
        enterFullscreen();
    } else {
        currentIndex = (currentIndex + 1) % videos.length;
        setVideo(currentIndex);
    }
}

document.addEventListener('click', handleTap);
document.addEventListener('touchend', handleTap);

setVideo(0);

