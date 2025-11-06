document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volumeBar = document.getElementById('volume-bar');
    const playlist = document.getElementById('playlist');
    const playlistItems = playlist.querySelectorAll('li');
    const chaptersList = document.getElementById('chapters-list');

    let currentAudioIndex = 0;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function loadAudio(index) {
        const selectedAudio = playlistItems[index];
        audioPlayer.src = selectedAudio.dataset.src;
        audioPlayer.load();
        audioPlayer.play();
        playPauseBtn.textContent = '\u23F8'; // Pause icon

        playlistItems.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        loadChapters(selectedAudio.dataset.chapters);
    }

    function loadChapters(chaptersJson) {
        chaptersList.innerHTML = '';
        const chapters = JSON.parse(chaptersJson);
        chapters.forEach(chapter => {
            const li = document.createElement('li');
            li.textContent = `${chapter.title} (${formatTime(chapter.time)})`;
            li.dataset.time = chapter.time;
            chaptersList.appendChild(li);
        });
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

        // Highlight active chapter
        const currentChapters = chaptersList.querySelectorAll('li');
        currentChapters.forEach(item => {
            const chapterTime = parseFloat(item.dataset.time);
            const nextChapterTime = parseFloat(item.nextElementSibling?.dataset.time || Infinity);

            if (audioPlayer.currentTime >= chapterTime && audioPlayer.currentTime < nextChapterTime) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
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

    // Playlist item click
    playlist.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const index = Array.from(playlistItems).indexOf(e.target);
            if (index !== -1) {
                currentAudioIndex = index;
                loadAudio(currentAudioIndex);
            }
        }
    });

    // Chapter navigation
    chaptersList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const chapterTime = parseFloat(e.target.dataset.time);
            audioPlayer.currentTime = chapterTime;
            audioPlayer.play();
            playPauseBtn.textContent = '\u23F8'; // Pause icon
        }
    });

    // Autoplay next audio in playlist
    audioPlayer.addEventListener('ended', () => {
        currentAudioIndex = (currentAudioIndex + 1) % playlistItems.length;
        loadAudio(currentAudioIndex);
    });

    // Initial load
    loadAudio(currentAudioIndex);
});