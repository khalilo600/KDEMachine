document.addEventListener('DOMContentLoaded', function() {
    const textDisplay = document.getElementById('text-display');
    const textInput = document.getElementById('text-input');
    const wpmSpan = document.getElementById('wpm');
    const accuracySpan = document.getElementById('accuracy');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');

    const texts = [
        "The quick brown fox jumps over the lazy dog.",
        "Never underestimate the power of a good book.",
        "Practice makes perfect, especially in coding.",
        "The early bird catches the worm, but the second mouse gets the cheese.",
        "Innovation distinguishes between a leader and a follower."
    ];

    let currentText = "";
    let startTime;
    let timerInterval;
    let errors;

    function getRandomText() {
        return texts[Math.floor(Math.random() * texts.length)];
    }

    function startGame() {
        currentText = getRandomText();
        textDisplay.textContent = currentText;
        textInput.value = '';
        textInput.disabled = false;
        textInput.focus();
        wpmSpan.textContent = '0';
        accuracySpan.textContent = '100';
        errors = 0;
        startTime = new Date().getTime();
        clearInterval(timerInterval);
        timerInterval = setInterval(updateMetrics, 1000);
    }

    function resetGame() {
        clearInterval(timerInterval);
        textInput.value = '';
        textInput.disabled = true;
        textDisplay.textContent = "Click 'Start Test' to begin.";
        wpmSpan.textContent = '0';
        accuracySpan.textContent = '100';
        errors = 0;
    }

    function updateMetrics() {
        const typedText = textInput.value;
        const currentTime = new Date().getTime();
        const elapsedTimeInMinutes = (currentTime - startTime) / 60000;

        // Calculate WPM
        const wordsTyped = typedText.split(' ').filter(word => word !== '').length;
        const wpm = elapsedTimeInMinutes > 0 ? Math.round(wordsTyped / elapsedTimeInMinutes) : 0;
        wpmSpan.textContent = wpm;

        // Calculate Accuracy
        errors = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] !== currentText[i]) {
                errors++;
            }
        }
        const accuracy = typedText.length > 0 ? Math.round(((typedText.length - errors) / typedText.length) * 100) : 100;
        accuracySpan.textContent = accuracy;

        // Highlight text
        let highlightedText = '';
        for (let i = 0; i < currentText.length; i++) {
            if (i < typedText.length) {
                if (typedText[i] === currentText[i]) {
                    highlightedText += `<span class="correct">${currentText[i]}</span>`;
                } else {
                    highlightedText += `<span class="incorrect">${currentText[i]}</span>`;
                }
            } else {
                highlightedText += currentText[i];
            }
        }
        textDisplay.innerHTML = highlightedText;

        // Check if test is finished
        if (typedText.length === currentText.length) {
            clearInterval(timerInterval);
            textInput.disabled = true;
            alert(`Test Finished! Your WPM: ${wpm}, Accuracy: ${accuracy}%`);
        }
    }

    textInput.addEventListener('input', updateMetrics);
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    resetGame(); // Initial setup
});