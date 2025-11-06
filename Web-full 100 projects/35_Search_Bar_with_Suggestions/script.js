const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');

const suggestions = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
    'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince',
    'Raspberry', 'Strawberry', 'Tangerine', 'Ugli fruit', 'Vanilla bean',
    'Watermelon', 'Xigua', 'Yellow passion fruit', 'Zucchini'
];

searchInput.addEventListener('input', () => {
    const input = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = '';

    if (input.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    const filteredSuggestions = suggestions.filter(item =>
        item.toLowerCase().includes(input)
    );

    filteredSuggestions.forEach(item => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = item;
        suggestionItem.addEventListener('click', () => {
            searchInput.value = item;
            suggestionsBox.style.display = 'none';
        });
        suggestionsBox.appendChild(suggestionItem);
    });

    suggestionsBox.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = 'none';
    }
});