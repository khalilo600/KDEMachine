/**
 * This script handles the interactive expandable card functionality.
 * It listens for clicks on the flex items and toggles an 'expanded' class
 * to show or hide additional content within the card.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element Selection ---
    // Get all the elements with the class 'flex-item'. These are the cards.
    const flexItems = document.querySelectorAll('.flex-item');

    // --- Event Listeners ---
    /**
     * Adds a click event listener to each flex item (card).
     * When a card is clicked, it toggles the 'expanded' class on that card.
     * It also includes an optional feature to close other expanded cards,
     * creating an accordion-like effect.
     */
    flexItems.forEach(item => {
        item.addEventListener('click', function() {
            // 'this' refers to the specific card that was clicked.
            // 'classList.toggle' adds the 'expanded' class if it doesn't exist,
            // or removes it if it does.
            this.classList.toggle('expanded');

            // --- Accordion Effect (Optional) ---
            // This part of the code ensures that only one card is expanded at a time.
            // It loops through all the cards again.
            flexItems.forEach(otherItem => {
                // Check if the current card in the loop ('otherItem') is NOT the one that was just clicked ('this').
                if (otherItem !== this) {
                    // If it's a different card, remove the 'expanded' class from it.
                    // This will cause any other open card to close.
                    otherItem.classList.remove('expanded');
                }
            });
        });
    });
});
