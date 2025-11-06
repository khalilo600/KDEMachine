const progressBar = document.getElementById('myProgressBar');
const startButton = document.getElementById('startProgress');
let width = 0;
let interval;

function move() {
    if (width == 100) {
        clearInterval(interval);
        width = 0;
        progressBar.style.width = width + '%';
        progressBar.innerHTML = '';
        return;
    }
    width++;
    progressBar.style.width = width + '%';
    progressBar.innerHTML = width + '%';
}

startButton.addEventListener('click', () => {
    if (interval) {
        clearInterval(interval);
    }
    width = 0;
    progressBar.style.width = width + '%';
    progressBar.innerHTML = '';
    interval = setInterval(move, 50);
});