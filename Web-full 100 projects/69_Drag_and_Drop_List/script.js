document.addEventListener('DOMContentLoaded', function() {
    const draggableList = document.getElementById('draggable-list');
    let draggedItem = null;

    draggableList.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.classList.add('dragging');
        }, 0);
    });

    draggableList.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        draggedItem = null;
    });

    draggableList.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow drop
        const afterElement = getDragAfterElement(draggableList, e.clientY);
        const currentElement = document.querySelector('.dragging');
        if (afterElement == null) {
            draggableList.appendChild(currentElement);
        } else {
            draggableList.insertBefore(currentElement, afterElement);
        }
    });

    draggableList.addEventListener('drop', (e) => {
        e.preventDefault();
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: -Infinity }).element;
    }
});