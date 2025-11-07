/**
 * This script provides interactive features for the documentation layout:
 * 1. **Active Link Highlighting:** Highlights the current section in the sidebar navigation as the user scrolls.
 * 2. **Collapsible Sections:** Allows users to collapse and expand sub-menus in the sidebar navigation.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- Active Link Highlighting on Scroll ---
    // Select all the main content sections.
    const sections = document.querySelectorAll('.content section');
    // Select all the navigation links in the sidebar.
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');

    // Define options for the Intersection Observer.
    const observerOptions = {
        root: null, // The viewport is used as the root.
        rootMargin: '0px',
        threshold: 0.5 // A section is considered 'intersecting' when 50% of it is visible.
    };

    /**
     * Creates an Intersection Observer to detect when content sections enter or leave the viewport.
     * When a section becomes visible, its corresponding link in the sidebar is highlighted.
     */
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the section is currently intersecting (i.e., visible in the viewport).
            if (entry.isIntersecting) {
                // Get the ID of the visible section.
                const id = entry.target.getAttribute('id');
                // Remove the 'active' class from all navigation links.
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // If the link's href matches the ID of the visible section, add the 'active' class.
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe each content section.
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Collapsible Sections in Sidebar ---
    // Select all list items in the sidebar navigation that contain nested unordered lists (sub-menus).
    const sidebarLinksWithChildren = document.querySelectorAll('.sidebar nav ul li:has(ul)');

    /**
     * Adds a click event listener to each sidebar link that has children.
     * When clicked, it toggles the 'collapsed' class on the parent list item,
     * which in turn hides or shows the nested sub-menu via CSS.
     */
    sidebarLinksWithChildren.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', function(event) {
            // Prevent default link behavior if the link's href is just '#' (used for toggling).
            if (this.getAttribute('href') === '#') {
                event.preventDefault();
            }
            // Toggle the 'collapsed' class on the parent list item.
            item.classList.toggle('collapsed');
        });

        // --- Initial State ---
        // Initially add the 'collapsed' class to all items with sub-menus.
        // This makes them collapsed by default when the page loads.
        item.classList.add('collapsed');
    });
});
