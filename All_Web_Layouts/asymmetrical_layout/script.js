/**
 * This script handles the "Load More" functionality for the asymmetrical layout.
 * It listens for clicks on the "Load More" button and dynamically adds new cards
 * to the side content section.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element Selection ---
    // Get the section where the new cards will be added.
    const sideContent = document.querySelector('.side-content');
    // Get the "Load More" button.
    const loadMoreBtn = document.getElementById('load-more-btn');
    // Initialize a counter for the new cards.
    let cardCounter = 4;

    // --- Event Listener ---
    // Check if the "Load More" button exists to prevent errors.
    if (loadMoreBtn) {
        /**
         * Adds a click event listener to the "Load More" button.
         * When the button is clicked, it creates a new card element and appends it to the side content section.
         */
        loadMoreBtn.addEventListener('click', function() {
            // --- Create New Card Element ---
            // Create a new div element that will serve as the card.
            const newCard = document.createElement('div');
            // Add the 'card' class to the new div to apply the existing card styles.
            newCard.classList.add('card');

            // --- Create Card Content ---
            // Create a new h3 element for the card title.
            const cardTitle = document.createElement('h3');
            // Set the text content of the title, using the cardCounter to create a unique title.
            cardTitle.textContent = `Feature ${cardCounter}`;

            // Create a new p element for the card paragraph.
            const cardParagraph = document.createElement('p');
            // Set the text content of the paragraph.
            cardParagraph.textContent = 'This is a dynamically loaded card. More content can be added here.';

            // --- Append Content to Card ---
            // Append the title and paragraph to the new card.
            newCard.appendChild(cardTitle);
            newCard.appendChild(cardParagraph);

            // --- Append Card to DOM ---
            // Append the new card to the side content section.
            sideContent.appendChild(newCard);

            // Increment the card counter for the next card.
            cardCounter++;

            // --- Disable Button (Optional) ---
            // This part of the code disables the button after a certain number of cards have been loaded.
            if (cardCounter > 6) {
                loadMoreBtn.textContent = 'All Cards Loaded';
                loadMoreBtn.disabled = true;
            }
        });
    }
});
