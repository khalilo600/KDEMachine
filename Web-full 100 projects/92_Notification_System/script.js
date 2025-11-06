document.addEventListener('DOMContentLoaded', function() {
    const showSuccessBtn = document.getElementById('show-success-btn');
    const showInfoBtn = document.getElementById('show-info-btn');
    const showWarningBtn = document.getElementById('show-warning-btn');
    const showErrorBtn = document.getElementById('show-error-btn');
    const notificationsContainer = document.getElementById('notifications-container');

    function createNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.innerHTML = `
            <span>${message}</span>
            <button class="close-btn">&times;</button>
        `;

        notificationsContainer.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s forwards';
            notification.addEventListener('animationend', () => {
                notification.remove();
            });
        }, 3000);

        // Remove on close button click
        notification.querySelector('.close-btn').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.5s forwards';
            notification.addEventListener('animationend', () => {
                notification.remove();
            });
        });
    }

    showSuccessBtn.addEventListener('click', () => {
        createNotification('Success! Your operation was completed.', 'success');
    });

    showInfoBtn.addEventListener('click', () => {
        createNotification('Info: This is an informational message.', 'info');
    });

    showWarningBtn.addEventListener('click', () => {
        createNotification('Warning: Something might be wrong.', 'warning');
    });

    showErrorBtn.addEventListener('click', () => {
        createNotification('Error: An error occurred.', 'error');
    });
});