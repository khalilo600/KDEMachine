const grid = document.querySelector('.masonry-grid');
const items = document.querySelectorAll('.grid-item');

function resizeGridItem(item) {
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('img').clientHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + rowSpan;
}

function resizeAllGridItems() {
    items.forEach(resizeGridItem);
}

window.addEventListener('load', resizeAllGridItems);
window.addEventListener('resize', resizeAllGridItems);