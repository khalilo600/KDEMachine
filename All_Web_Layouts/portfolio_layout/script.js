/**
 * This script handles two main interactive features for the portfolio/gallery layout:
 * 1. **Filtering:** Allows users to filter portfolio items by tags.
 * 2. **Lightbox:** Displays a larger version of an image when a portfolio item's image is clicked.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- Filtering Logic ---
    // Select all the filter links in the filter menu.
    const filterLinks = document.querySelectorAll('.filter-menu a');
    // Select all the individual portfolio items.
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    /**
     * Adds a click event listener to each filter link.
     * When a link is clicked, it filters the portfolio items based on the selected tag.
     */
    filterLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default behavior of the link (which is to navigate).
            event.preventDefault();
            // Get the 'data-tag' attribute from the clicked link to determine the filter category.
            const selectedTag = this.getAttribute('data-tag');

            // --- Active Class Management ---
            // Remove the 'active' class from all filter links.
            filterLinks.forEach(l => l.classList.remove('active'));
            // Add the 'active' class to the currently clicked link to highlight it.
            this.classList.add('active');

            // --- Portfolio Item Filtering ---
            // Iterate over each portfolio item.
            portfolioItems.forEach(item => {
                // Get the 'data-tags' attribute from the item and split it into an array of tags.
                const itemTags = item.getAttribute('data-tags').split(' ');
                // Check if the selected tag is 'all' (meaning show all items) or if the item's tags include the selected tag.
                if (selectedTag === 'all' || itemTags.includes(selectedTag)) {
                    // If it matches, display the item.
                    item.style.display = 'block';
                } else {
                    // Otherwise, hide the item.
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Lightbox Logic ---
    // Select the lightbox container element.
    const lightbox = document.getElementById('lightbox');
    // Select the image element inside the lightbox.
    const lightboxImg = document.getElementById('lightbox-img');
    // Select the close button for the lightbox.
    const closeBtn = document.querySelector('.lightbox .close');

    /**
     * Adds a click event listener to the image within each portfolio item.
     * When an image is clicked, it opens the lightbox and displays the clicked image.
     */
    portfolioItems.forEach(item => {
        const itemImg = item.querySelector('img');
        itemImg.addEventListener('click', function() {
            // Make the lightbox visible.
            lightbox.style.display = 'flex';
            // Set the source of the lightbox image to the source of the clicked image.
            lightboxImg.src = this.src;
        });
    });

    /**
     * Adds a click event listener to the lightbox close button.
     * When clicked, it hides the lightbox.
     */
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }

    /**
     * Adds a click event listener to the lightbox container itself.
     * If the click occurs directly on the overlay (not the image), it closes the lightbox.
     */
    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            // Check if the clicked element is the lightbox background itself, not the image.
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
