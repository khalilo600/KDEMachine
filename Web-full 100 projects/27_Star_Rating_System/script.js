const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
let currentRating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.value);
        updateStars();
        ratingValue.textContent = currentRating;
    });

    star.addEventListener('mouseover', () => {
        highlightStars(parseInt(star.dataset.value));
    });

    star.addEventListener('mouseout', () => {
        highlightStars(currentRating);
    });
});

function updateStars() {
    stars.forEach(star => {
        if (parseInt(star.dataset.value) <= currentRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function highlightStars(rating) {
    stars.forEach(star => {
        if (parseInt(star.dataset.value) <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

updateStars();