/**
 * This script handles the dynamic content loading for the single-page application.
 * It listens for clicks on the navigation links and updates the main content area
 * without reloading the entire page.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element Selection ---
    // Get the main content area where the dynamic content will be displayed.
    const mainContent = document.querySelector('main');
    // Get all the navigation links.
    const navLinks = document.querySelectorAll('nav a');

    // --- Page Content Data ---
    // An object to store the content for each page. This acts as a simple in-memory database.
    const pageContent = {
        'Home': {
            title: 'Home Page',
            content: '<h2>Welcome to the Home Page</h2><p>This is the home page content, dynamically loaded with JavaScript. You can switch between pages without reloading.</p>'
        },
        'About': {
            title: 'About Us',
            content: '<h2>About Our Company</h2><p>We are a fictional company that enjoys demonstrating JavaScript concepts. Our mission is to make learning web development fun and interactive.</p>'
        },
        'Contact': {
            title: 'Contact Us',
            content: '<h2>Get in Touch</h2><p>You can reach us at our imaginary email address: <a href="mailto:contact@example.com">contact@example.com</a>.</p>'
        }
    };

    // --- Content Update Function ---
    /**
     * Updates the main content area and the page title based on the selected page name.
     * @param {string} pageName - The name of the page to display (e.g., 'Home', 'About', 'Contact').
     */
    function updateContent(pageName) {
        // Get the page data from the pageContent object.
        const page = pageContent[pageName];

        // Check if the page exists.
        if (page) {
            // If the page exists, update the main content and the document title.
            mainContent.innerHTML = page.content;
            document.title = page.title;
        } else {
            // If the page does not exist, display a "Page Not Found" message.
            mainContent.innerHTML = '<h2>Page Not Found</h2><p>The content for this page could not be found.</p>';
            document.title = 'Page Not Found';
        }
    }

    // --- Event Listeners ---
    /**
     * Adds a click event listener to each navigation link.
     * When a link is clicked, it prevents the default link behavior and calls the updateContent function.
     */
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default behavior of the link (which is to navigate to a new page).
            event.preventDefault();
            // Get the text content of the clicked link (e.g., 'Home', 'About', 'Contact').
            const pageName = this.textContent;
            // Call the updateContent function to display the corresponding page content.
            updateContent(pageName);
        });
    });

    // --- Initial Page Load ---
    // Set the initial content to the Home page when the page first loads.
    updateContent('Home');
});
