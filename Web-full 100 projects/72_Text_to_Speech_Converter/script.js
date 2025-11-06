document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voice-select');
    const rateInput = document.getElementById('rate-input');
    const pitchInput = document.getElementById('pitch-input');
    const speakBtn = document.getElementById('speak-btn');
    const stopBtn = document.getElementById('stop-btn');

    let synth = window.speechSynthesis;
    let voices = [];

    function populateVoiceList() {
        voices = synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase();
            const bname = b.name.toUpperCase();
            if (aname < bname) return -1;
            else if (aname == bname) return 0;
            else return +1;
        });
        const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
        voiceSelect.innerHTML = '';
        for (let i = 0; i < voices.length; i++) {
            const option = document.createElement('option');
            option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
            if (voices[i].default) {
                option.textContent += ' -- DEFAULT';
            }
            option.setAttribute('data-lang', voices[i].lang);
            option.setAttribute('data-name', voices[i].name);
            voiceSelect.appendChild(option);
        }
        voiceSelect.selectedIndex = selectedIndex;
    }

    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }

    function speak() {
        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }
        if (textInput.value !== '') {
            const utterThis = new SpeechSynthesisUtterance(textInput.value);
            utterThis.onend = function (event) {
                console.log('SpeechSynthesisUtterance.onend');
            };
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror', event);
            };
            const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                    utterThis.voice = voices[i];
                    break;
                }
            }
            utterThis.rate = parseFloat(rateInput.value);
            utterThis.pitch = parseFloat(pitchInput.value);
            synth.speak(utterThis);
        }
    }

    function stopSpeaking() {
        if (synth.speaking) {
            synth.cancel();
        }
    }

    speakBtn.addEventListener('click', speak);
    stopBtn.addEventListener('click', stopSpeaking);

    rateInput.addEventListener('change', () => {
        // No direct action needed here, `speak()` will pick up the new value
    });

    pitchInput.addEventListener('change', () => {
        // No direct action needed here, `speak()` will pick up the new value
    });

    voiceSelect.addEventListener('change', () => {
        // No direct action needed here, `speak()` will pick up the new value
    });
});