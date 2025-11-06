document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const contextMenu = document.getElementById('context-menu');

    container.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Prevent default context menu

        contextMenu.style.display = 'block';
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';
    });

    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });

    contextMenu.addEventListener('click', (e) => {
        // Handle clicks on menu items
        if (e.target.tagName === 'LI') {
            alert(`You clicked: ${e.target.textContent}`);
            contextMenu.style.display = 'none';
        }
    });
});