document.addEventListener('DOMContentLoaded', function() {
    const rangeInput = document.getElementById('my-range');
    const rangeValueDisplay = document.getElementById('range-value');
    const currentValueSpan = document.getElementById('current-value');

    function updateSliderValue() {
        const value = rangeInput.value;
        rangeValueDisplay.textContent = value;
        currentValueSpan.textContent = value;

        // Position the value display above the thumb
        const min = rangeInput.min ? rangeInput.min : 0;
        const max = rangeInput.max ? rangeInput.max : 100;
        const percent = ((value - min) / (max - min)) * 100;
        rangeValueDisplay.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`;
    }

    rangeInput.addEventListener('input', updateSliderValue);

    // Initial update
    updateSliderValue();
});