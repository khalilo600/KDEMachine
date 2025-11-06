document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main-image');
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;

    function updateMainImage(index) {
        mainImage.src = thumbnails[index].dataset.full;
        // Update active class for thumbnails
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateMainImage(currentIndex);
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(currentIndex);
    });

    // Initialize with the first image
    updateMainImage(currentIndex);
});