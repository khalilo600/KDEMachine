/**
 * This script handles interactive features for the product page:
 * 1. **Image Gallery:** Allows users to switch the main product image by clicking on thumbnails.
 * 2. **"Add to Cart" Confirmation:** Displays a temporary confirmation message when the add-to-cart button is clicked.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- Image Gallery Logic ---
    // Get the main product image element.
    const mainImage = document.querySelector('.main-image');
    // Get all the thumbnail image elements.
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');

    /**
     * Adds a click event listener to each thumbnail image.
     * When a thumbnail is clicked, it updates the main product image and highlights the active thumbnail.
     */
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Set the 'src' attribute of the main image to the 'src' of the clicked thumbnail.
            // The .replace() method is used here assuming a simple URL pattern where
            // '100x100' in the thumbnail URL can be replaced with '500x500' for the main image.
            mainImage.src = this.src.replace('100x100', '500x500');

            // --- Optional: Active State for Thumbnails ---
            // Remove the 'active' class from all thumbnails.
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add the 'active' class to the currently clicked thumbnail to highlight it.
            this.classList.add('active');
        });
    });

    // --- "Add to Cart" Confirmation Logic ---
    // Get the "Add to Cart" button.
    const addToCartBtn = document.querySelector('.add-to-cart');
    // Get the confirmation message element.
    const confirmationMsg = document.getElementById('confirmation-msg');

    // Check if both the button and the message element exist before adding event listeners.
    if (addToCartBtn && confirmationMsg) {
        /**
         * Adds a click event listener to the "Add to Cart" button.
         * When clicked, it displays a confirmation message with details about the added item.
         */
        addToCartBtn.addEventListener('click', function() {
            // Get the selected quantity and color from the form elements.
            const quantity = document.getElementById('quantity').value;
            const color = document.getElementById('color').value;

            // Update the text content of the confirmation message.
            confirmationMsg.textContent = `${quantity} ${color} headphone(s) added to cart!`;
            // Add the 'show' class to make the confirmation message visible (CSS handles the animation).
            confirmationMsg.classList.add('show');

            // --- Auto-hide Confirmation Message ---
            // Set a timeout to automatically hide the message after 3 seconds.
            setTimeout(() => {
                confirmationMsg.classList.remove('show');
            }, 3000);
        });
    }
});
