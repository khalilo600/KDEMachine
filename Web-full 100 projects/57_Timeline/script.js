document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.bottom >= 0 &&
            rect.right >= 0
        );
    };

    const animateOnScroll = () => {
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('visible');
                item.classList.remove('hidden');
            } else {
                // Optional: if you want items to hide again when scrolled out of view
                // item.classList.remove('visible');
                // item.classList.add('hidden');
            }
        });
    };

    // Initially add 'hidden' class to all items
    timelineItems.forEach(item => {
        item.classList.add('hidden');
    });

    // Run on scroll and on load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load
});