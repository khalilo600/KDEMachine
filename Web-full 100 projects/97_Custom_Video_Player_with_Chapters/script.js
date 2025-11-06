document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('video-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volumeBar = document.getElementById('volume-bar');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const chaptersList = document.getElementById('chapters-list');
    const chapterItems = chaptersList.querySelectorAll('li');

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.textContent = '\u23F8'; // Pause icon
        } else {
            videoPlayer.pause();
            playPauseBtn.textContent = '\u25B6'; // Play icon
        }
    });

    // Update progress bar and time display
    videoPlayer.addEventListener('timeupdate', () => {
        progressBar.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        currentTimeSpan.textContent = formatTime(videoPlayer.currentTime);

        // Highlight active chapter
        chapterItems.forEach(item => {
            const chapterTime = parseFloat(item.dataset.time);
            const nextChapterTime = parseFloat(item.nextElementSibling?.dataset.time || Infinity);

            if (videoPlayer.currentTime >= chapterTime && videoPlayer.currentTime < nextChapterTime) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // Set duration when video metadata is loaded
    videoPlayer.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(videoPlayer.duration);
    });

    // Seek functionality
    progressBar.addEventListener('input', () => {
        videoPlayer.currentTime = (progressBar.value / 100) * videoPlayer.duration;
    });

    // Volume control
    volumeBar.addEventListener('input', () => {
        videoPlayer.volume = volumeBar.value;
    });

    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', () => {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.mozRequestFullScreen) { /* Firefox */
            videoPlayer.mozRequestFullScreen();
        } else if (videoPlayer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) { /* IE/Edge */
            videoPlayer.msRequestFullscreen();
        }
    });

    // Chapter navigation
    chaptersList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const chapterTime = parseFloat(e.target.dataset.time);
            videoPlayer.currentTime = chapterTime;
            videoPlayer.play();
            playPauseBtn.textContent = '\u23F8'; // Pause icon
        }
    });

    // Reset play/pause button when video ends
    videoPlayer.addEventListener('ended', () => {
        playPauseBtn.textContent = '\u25B6'; // Play icon
    });
});