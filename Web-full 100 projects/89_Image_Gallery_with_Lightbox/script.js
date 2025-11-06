document.addEventListener('DOMContentLoaded', function() {
    const imageGrid = document.getElementById('image-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    const galleryImages = Array.from(imageGrid.querySelectorAll('img'));
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = galleryImages[currentIndex].dataset.full;
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentIndex].dataset.full;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentIndex].dataset.full;
    }

    imageGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const index = galleryImages.indexOf(e.target);
            if (index !== -1) {
                openLightbox(index);
            }
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});