document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const imageCanvas = document.getElementById('image-canvas');
    const ctx = imageCanvas.getContext('2d');

    const brightnessInput = document.getElementById('brightness');
    const contrastInput = document.getElementById('contrast');
    const saturationInput = document.getElementById('saturation');
    const grayscaleInput = document.getElementById('grayscale');
    const sepiaInput = document.getElementById('sepia');
    const resetFiltersBtn = document.getElementById('reset-filters');

    let img = new Image();
    let originalImageData = null;

    // Default filter values
    let filters = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        grayscale: 0,
        sepia: 0
    };

    function applyFilters() {
        if (!originalImageData) return;

        // Reset canvas to original image data
        ctx.putImageData(originalImageData, 0, 0);

        // Apply filters using CSS filter property on the canvas context
        // Note: This is a simplified approach. For more complex image manipulation,
        // one would typically manipulate pixel data directly or use a library.
        const filterString = `
            brightness(${filters.brightness}%)
            contrast(${filters.contrast}%)
            saturate(${filters.saturation}%)
            grayscale(${filters.grayscale}%)
            sepia(${filters.sepia}%)`;

        ctx.filter = filterString;
        ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
        ctx.filter = 'none'; // Reset filter for next draw operations
    }

    function resetFilters() {
        filters = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            grayscale: 0,
            sepia: 0
        };
        brightnessInput.value = 100;
        contrastInput.value = 100;
        saturationInput.value = 100;
        grayscaleInput.value = 0;
        sepiaInput.value = 0;
        applyFilters();
    }

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                img.onload = () => {
                    imageCanvas.width = img.width;
                    imageCanvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    originalImageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
                    resetFilters(); // Apply initial filters (reset to default)
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    brightnessInput.addEventListener('input', (e) => {
        filters.brightness = e.target.value;
        applyFilters();
    });
    contrastInput.addEventListener('input', (e) => {
        filters.contrast = e.target.value;
        applyFilters();
    });
    saturationInput.addEventListener('input', (e) => {
        filters.saturation = e.target.value;
        applyFilters();
    });
    grayscaleInput.addEventListener('input', (e) => {
        filters.grayscale = e.target.value;
        applyFilters();
    });
    sepiaInput.addEventListener('input', (e) => {
        filters.sepia = e.target.value;
        applyFilters();
    });

    resetFiltersBtn.addEventListener('click', resetFilters);

    // Initial setup: draw a placeholder or clear canvas
    ctx.font = '20px Arial';
    ctx.fillText('Upload an image to start editing', 50, 50);
});