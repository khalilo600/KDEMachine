document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    searchButton.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
        }
    });

    // Optional: Close search bar if clicked outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && searchContainer.classList.contains('active')) {
            searchContainer.classList.remove('active');
            searchInput.value = '';
        }
    });
});