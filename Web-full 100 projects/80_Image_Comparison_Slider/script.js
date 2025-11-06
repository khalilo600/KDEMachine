document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const imageAfter = document.querySelector('.image-after');
    const sliderLine = document.querySelector('.slider-line');
    const sliderButton = document.querySelector('.slider-button');

    function slideCompare() {
        const sliderValue = slider.value;
        imageAfter.style.width = sliderValue + '%';
        sliderLine.style.left = sliderValue + '%';
        sliderButton.style.left = sliderValue + '%';
    }

    slider.addEventListener('input', slideCompare);

    // Initial call to set the correct width and position
    slideCompare();
});