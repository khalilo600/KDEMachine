const loginToggle = document.getElementById('login-toggle');
const registerToggle = document.getElementById('register-toggle');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginToggle.addEventListener('click', () => {
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
});

registerToggle.addEventListener('click', () => {
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
});