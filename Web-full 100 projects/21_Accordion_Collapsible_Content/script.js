const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        const accordionContent = header.nextElementSibling;
        if (accordionContent.style.maxHeight) {
            accordionContent.style.maxHeight = null;
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        }
    });
});