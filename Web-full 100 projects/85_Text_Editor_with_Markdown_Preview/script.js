document.addEventListener('DOMContentLoaded', function() {
    const markdownInput = document.getElementById('markdown-input');
    const previewOutput = document.getElementById('preview-output');

    function updatePreview() {
        const markdownText = markdownInput.value;
        previewOutput.innerHTML = marked.parse(markdownText);
    }

    markdownInput.addEventListener('input', updatePreview);

    // Initial preview update
    updatePreview();
});