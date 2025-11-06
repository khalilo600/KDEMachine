document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('video-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volumeBar = document.getElementById('volume-bar');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const subtitleBtn = document.getElementById('subtitle-btn');
    const subtitleDisplay = document.getElementById('subtitle-display');

    let subtitleTrack = null;

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

        // Update subtitles
        if (subtitleTrack && subtitleTrack.mode === 'showing') {
            let currentCue = null;
            for (let i = 0; i < subtitleTrack.cues.length; i++) {
                const cue = subtitleTrack.cues[i];
                if (videoPlayer.currentTime >= cue.startTime && videoPlayer.currentTime <= cue.endTime) {
                    currentCue = cue;
                    break;
                }
            }
            if (currentCue) {
                subtitleDisplay.textContent = currentCue.text;
                subtitleDisplay.style.display = 'block';
            } else {
                subtitleDisplay.textContent = '';
                subtitleDisplay.style.display = 'none';
            }
        }
    });

    // Set duration when video metadata is loaded
    videoPlayer.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(videoPlayer.duration);

        // Get subtitle track
        const tracks = videoPlayer.textTracks;
        if (tracks.length > 0) {
            subtitleTrack = tracks[0];
            subtitleTrack.mode = 'hidden'; // Hide default browser subtitles
        }
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

    // Subtitle toggle
    subtitleBtn.addEventListener('click', () => {
        if (subtitleTrack) {
            if (subtitleTrack.mode === 'showing') {
                subtitleTrack.mode = 'hidden';
                subtitleDisplay.style.display = 'none';
            } else {
                subtitleTrack.mode = 'showing';
                subtitleDisplay.style.display = 'block';
            }
        }
    });
});