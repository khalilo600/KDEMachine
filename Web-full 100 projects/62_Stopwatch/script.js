document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');

    let timer = null;
    let startTime = 0;
    let elapsedTime = 0;
    let isRunning = false;

    function formatTime(ms) {
        let totalSeconds = Math.floor(ms / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    function startStopwatch() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(updateTime, 1000);
            startStopBtn.textContent = 'Stop';
            isRunning = true;
        } else {
            clearInterval(timer);
            startStopBtn.textContent = 'Start';
            isRunning = false;
        }
    }

    function updateTime() {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }

    function resetStopwatch() {
        clearInterval(timer);
        startTime = 0;
        elapsedTime = 0;
        isRunning = false;
        display.textContent = '00:00:00';
        startStopBtn.textContent = 'Start';
    }

    startStopBtn.addEventListener('click', startStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
});