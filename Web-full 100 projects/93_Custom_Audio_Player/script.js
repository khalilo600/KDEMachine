document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volumeBar = document.getElementById('volume-bar');

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = '\u23F8'; // Pause icon
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '\u25B6'; // Play icon
        }
    });

    // Update progress bar and time display
    audioPlayer.addEventListener('timeupdate', () => {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    });

    // Set duration when audio metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audioPlayer.duration);
    });

    // Seek functionality
    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    });

    // Volume control
    volumeBar.addEventListener('input', () => {
        audioPlayer.volume = volumeBar.value;
    });

    // Reset play/pause button when audio ends
    audioPlayer.addEventListener('ended', () => {
        playPauseBtn.textContent = '\u25B6'; // Play icon
    });
});