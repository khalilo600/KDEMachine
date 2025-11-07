/**
 * This script handles the interactive hover effect for the split-screen layout.
 * It detects when the mouse enters or leaves one of the panels and adds or removes
 * a corresponding class to the main container, allowing CSS to handle the visual changes.
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element Selection ---
    // Get the main container that holds the two split panels.
    const container = document.querySelector('.split-container');
    // Get the left panel.
    const leftPanel = document.querySelector('.split-left');
    // Get the right panel.
    const rightPanel = document.querySelector('.split-right');

    // --- Event Listeners for Left Panel ---
    /**
     * When the mouse pointer enters the left panel, add the 'hover-left' class to the main container.
     * This class will trigger the CSS transition to expand the left panel.
     */
    leftPanel.addEventListener('mouseenter', () => {
        container.classList.add('hover-left');
    });

    /**
     * When the mouse pointer leaves the left panel, remove the 'hover-left' class from the main container.
     * This will cause the panel to return to its original size.
     */
    leftPanel.addEventListener('mouseleave', () => {
        container.classList.remove('hover-left');
    });

    // --- Event Listeners for Right Panel ---
    /**
     * When the mouse pointer enters the right panel, add the 'hover-right' class to the main container.
     * This class will trigger the CSS transition to expand the right panel.
     */
    rightPanel.addEventListener('mouseenter', () => {
        container.classList.add('hover-right');
    });

    /**
     * When the mouse pointer leaves the right panel, remove the 'hover-right' class from the main container.
     * This will cause the panel to return to its original size.
     */
    rightPanel.addEventListener('mouseleave', () => {
        container.classList.remove('hover-right');
    });
});
