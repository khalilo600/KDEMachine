document.addEventListener('DOMContentLoaded', () => {
    const transitionContainer = document.querySelector('.page-transition-container');
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = link.href;

            transitionContainer.classList.add('fade-out');

            transitionContainer.addEventListener('animationend', () => {
                window.location.href = destination;
            });
        });
    });
});