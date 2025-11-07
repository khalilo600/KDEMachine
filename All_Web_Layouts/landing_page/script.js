/**
 * This script handles the smooth scrolling functionality for the landing page.
 * It listens for clicks on the navigation links and smoothly scrolls the page
 * to the corresponding section.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element Selection ---
    // Get all the navigation links.
    const navLinks = document.querySelectorAll('nav a');

    // --- Event Listeners ---
    /**
     * Adds a click event listener to each navigation link.
     * When a link is clicked, it prevents the default link behavior and smoothly scrolls
     * to the target section.
     */
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Check if the link is an anchor link (i.e., it has a hash in the href).
            if (this.hash !== "") {
                // Prevent the default behavior of the link (which is to jump to the section).
                event.preventDefault();

                // Get the target element using the hash from the link's href.
                const targetElement = document.querySelector(this.hash);

                // Check if the target element exists.
                if (targetElement) {
                    // Get the height of the header to offset the scroll position.
                    // This ensures that the section title is not hidden behind the header.
                    const headerHeight = document.querySelector('header').offsetHeight;

                    // Calculate the position to scroll to by subtracting the header height from the target element's top offset.
                    const scrollToPosition = targetElement.offsetTop - headerHeight;

                    // Use the window.scrollTo method to smoothly scroll to the calculated position.
                    window.scrollTo({
                        top: scrollToPosition,
                        behavior: 'smooth' // This is the key property for the smooth scrolling effect.
                    });
                }
            }
        });
    });
});
