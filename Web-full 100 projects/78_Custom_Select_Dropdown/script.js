document.addEventListener('DOMContentLoaded', function() {
    const customSelect = document.querySelector('.custom-select');
    const customSelectTrigger = document.querySelector('.custom-select-trigger');
    const customOptions = document.querySelector('.custom-options');
    const customOptionElements = document.querySelectorAll('.custom-option');
    const selectedValueSpan = document.getElementById('selected-value');

    customSelectTrigger.addEventListener('click', () => {
        customSelect.classList.toggle('open');
    });

    customOptionElements.forEach(option => {
        option.addEventListener('click', () => {
            // Update trigger text
            customSelectTrigger.textContent = option.textContent;

            // Update selected value display
            selectedValueSpan.textContent = option.dataset.value;

            // Remove 'selected' class from all options
            customOptionElements.forEach(opt => opt.classList.remove('selected'));
            // Add 'selected' class to the clicked option
            option.classList.add('selected');

            // Close the dropdown
            customSelect.classList.remove('open');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });

    // Initialize selected value
    const initialSelectedOption = document.querySelector('.custom-option.selected');
    if (initialSelectedOption) {
        customSelectTrigger.textContent = initialSelectedOption.textContent;
        selectedValueSpan.textContent = initialSelectedOption.dataset.value;
    }
});