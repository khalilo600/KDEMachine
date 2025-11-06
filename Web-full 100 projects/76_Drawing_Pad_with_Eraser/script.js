document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('color-picker');
    const brushSizeInput = document.getElementById('brush-size');
    const penToolBtn = document.getElementById('pen-tool');
    const eraserToolBtn = document.getElementById('eraser-tool');
    const clearCanvasBtn = document.getElementById('clear-canvas');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let currentColor = '#000000';
    let currentBrushSize = 5;
    let isErasing = false;

    // Set initial drawing properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function setDrawingProperties() {
        ctx.strokeStyle = isErasing ? '#f8f8f8' : currentColor; // Match canvas background for eraser
        ctx.lineWidth = currentBrushSize;
    }

    function draw(e) {
        if (!isDrawing) return;

        setDrawingProperties();

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    colorPicker.addEventListener('change', (e) => {
        currentColor = e.target.value;
        isErasing = false;
        penToolBtn.classList.add('active');
        eraserToolBtn.classList.remove('active');
        setDrawingProperties();
    });

    brushSizeInput.addEventListener('change', (e) => {
        currentBrushSize = e.target.value;
        setDrawingProperties();
    });

    penToolBtn.addEventListener('click', () => {
        isErasing = false;
        penToolBtn.classList.add('active');
        eraserToolBtn.classList.remove('active');
        setDrawingProperties();
    });

    eraserToolBtn.addEventListener('click', () => {
        isErasing = true;
        eraserToolBtn.classList.add('active');
        penToolBtn.classList.remove('active');
        setDrawingProperties();
    });

    clearCanvasBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Initial setup
    setDrawingProperties();
});