/**
 * This script handles the category filtering functionality for the blog layout.
 * It allows users to filter blog posts based on their assigned categories
 * and includes a "Show All" option.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element Selection ---
    // Get all the category links from the second widget in the sidebar.
    const categoryLinks = document.querySelectorAll('.sidebar .widget:nth-child(2) ul li a');
    // Get all the blog post articles.
    const blogPosts = document.querySelectorAll('.blog-post');

    // --- Event Listeners for Category Links ---
    /**
     * Adds a click event listener to each category link.
     * When a link is clicked, it prevents the default link behavior and calls
     * the filterPosts function with the selected category.
     */
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the browser from navigating to the href of the link.
            event.preventDefault();
            // Get the text content of the clicked link, trim whitespace, and convert to lowercase.
            const selectedCategory = this.textContent.trim().toLowerCase();

            // Call the filtering function.
            filterPosts(selectedCategory);
        });
    });

    // --- Filtering Function ---
    /**
     * Filters the blog posts based on the provided category.
     * Posts matching the category (or if category is 'all') are shown, others are hidden.
     * @param {string} category - The category to filter by (e.g., 'web development', 'design', or 'all').
     */
    function filterPosts(category) {
        blogPosts.forEach(post => {
            // Get the 'data-category' attribute value from each blog post.
            const postCategory = post.getAttribute('data-category');

            // If the selected category is 'all' or matches the post's category,
            // set its display style to 'block' to make it visible.
            if (category === 'all' || postCategory === category) {
                post.style.display = 'block';
            } else {
                // Otherwise, hide the post.
                post.style.display = 'none';
            }
        });
    }

    // --- Add "Show All" Link ---
    // Get the unordered list within the categories widget.
    const categoriesList = document.querySelector('.sidebar .widget:nth-child(2) ul');
    if (categoriesList) {
        // Create a new list item for the "Show All" link.
        const showAllLink = document.createElement('li');
        showAllLink.innerHTML = '<a href="#">Show All</a>';
        // Insert the "Show All" link at the beginning of the categories list.
        categoriesList.insertAdjacentElement('afterbegin', showAllLink);

        /**
         * Adds a click event listener to the dynamically created "Show All" link.
         * When clicked, it calls filterPosts with 'all' to display all blog posts.
         */
        showAllLink.addEventListener('click', function(event) {
            event.preventDefault();
            filterPosts('all');
        });
    }
});
