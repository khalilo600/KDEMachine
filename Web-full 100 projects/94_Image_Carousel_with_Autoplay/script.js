document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');

    let counter = 0;
    const size = carouselImages[0].clientWidth;
    let autoSlideInterval;

    // Set initial position
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === counter) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function slideTo(index) {
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter = index;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        updateDots();
    }

    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) {
            slideTo(0); // Loop back to start
        } else {
            slideTo(counter + 1);
        }
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) {
            slideTo(carouselImages.length - 1); // Loop to end
        } else {
            slideTo(counter - 1);
        }
        resetAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.dataset.slide);
            slideTo(slideIndex);
            resetAutoSlide();
        });
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (counter >= carouselImages.length - 1) {
                slideTo(0);
            } else {
                slideTo(counter + 1);
            }
        }, 3000); // Change image every 3 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start autoplay on load
    startAutoSlide();

    // Optional: Pause autoplay on hover
    carouselSlide.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carouselSlide.addEventListener('mouseleave', startAutoSlide);
});