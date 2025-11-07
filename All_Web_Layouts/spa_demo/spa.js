document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('content');

    // Define the content for each page
    const routes = {
        '#home': {
            title: 'Home',
            content: '<h2>Welcome to the Home Page</h2><p>This is the home page content, loaded dynamically using JavaScript. Click the links above to navigate the site.</p>'
        },
        '#about': {
            title: 'About Us',
            content: '<h2>About Our Company</h2><p>We are a forward-thinking company that loves building single-page applications. Our team is dedicated to creating seamless user experiences.</p>'
        },
        '#contact': {
            title: 'Contact Us',
            content: '<h2>Get in Touch</h2><p>You can reach us by email at <a href="mailto:contact@spa-demo.com">contact@spa-demo.com</a>.</p>'
        }
    };

    // Function to handle routing
    function handleRouteChange() {
        const hash = window.location.hash || '#home';
        const route = routes[hash];

        if (route) {
            document.title = route.title + ' | SPA Demo';
            contentDiv.innerHTML = route.content;
        } else {
            // Handle 404 Not Found case
            document.title = 'Page Not Found | SPA Demo';
            contentDiv.innerHTML = '<h2>404 - Page Not Found</h2><p>The page you are looking for does not exist.</p>';
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);

    // Initial page load
    handleRouteChange();

    // Add click listeners to nav links to ensure hash change event fires
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            // The hashchange event will handle the content update
        });
    });
});
