document.addEventListener('DOMContentLoaded', function() {
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const targetDateInput = document.getElementById('target-date-input');
    const setTimerBtn = document.getElementById('setTimerBtn');
    const resetTimerBtn = document.getElementById('resetTimerBtn');

    let countdownInterval = null;
    let targetDate = null;

    // Load target date from local storage if available
    const savedTargetDate = localStorage.getItem('countdownTargetDate');
    if (savedTargetDate) {
        targetDate = new Date(savedTargetDate);
        targetDateInput.value = savedTargetDate.substring(0, 16); // Format for datetime-local input
        startCountdown();
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysSpan.textContent = '00';
            hoursSpan.textContent = '00';
            minutesSpan.textContent = '00';
            secondsSpan.textContent = '00';
            alert('Countdown finished!');
            localStorage.removeItem('countdownTargetDate');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysSpan.textContent = String(days).padStart(2, '0');
        hoursSpan.textContent = String(hours).padStart(2, '0');
        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');
    }

    function startCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        if (targetDate) {
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
            localStorage.setItem('countdownTargetDate', targetDate.toISOString());
        }
    }

    setTimerBtn.addEventListener('click', () => {
        const inputDate = targetDateInput.value;
        if (inputDate) {
            targetDate = new Date(inputDate);
            if (isNaN(targetDate.getTime())) {
                alert('Please enter a valid date and time.');
                return;
            }
            startCountdown();
        } else {
            alert('Please select a target date and time.');
        }
    });

    resetTimerBtn.addEventListener('click', () => {
        clearInterval(countdownInterval);
        targetDate = null;
        daysSpan.textContent = '00';
        hoursSpan.textContent = '00';
        minutesSpan.textContent = '00';
        secondsSpan.textContent = '00';
        targetDateInput.value = '';
        localStorage.removeItem('countdownTargetDate');
    });
});