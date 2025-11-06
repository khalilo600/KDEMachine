document.addEventListener('DOMContentLoaded', function() {
    const startRecordBtn = document.getElementById('start-record-btn');
    const stopRecordBtn = document.getElementById('stop-record-btn');
    const statusParagraph = document.getElementById('status');
    const transcriptTextarea = document.getElementById('transcript');

    let recognition;

    // Check for browser compatibility
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        statusParagraph.textContent = "Speech Recognition not supported in this browser. Please use Chrome or Edge.";
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = true;
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = true; // Keep listening
    recognition.interimResults = true; // Show interim results
    recognition.lang = 'en-US';

    let finalTranscript = '';

    recognition.onstart = function() {
        statusParagraph.textContent = "Listening...";
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = false;
    };

    recognition.onresult = function(event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        transcriptTextarea.value = finalTranscript + interimTranscript;
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event);
        statusParagraph.textContent = `Error: ${event.error}`;
        startRecordBtn.disabled = false;
        stopRecordBtn.disabled = true;
    };

    recognition.onend = function() {
        statusParagraph.textContent = "Stopped listening.";
        startRecordBtn.disabled = false;
        stopRecordBtn.disabled = true;
    };

    startRecordBtn.addEventListener('click', () => {
        finalTranscript = ''; // Clear previous transcript
        transcriptTextarea.value = '';
        recognition.start();
    });

    stopRecordBtn.addEventListener('click', () => {
        recognition.stop();
    });
});