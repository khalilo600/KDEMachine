const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
});

function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    if (subjectInput.value.trim() === '') {
        subjectError.textContent = 'Subject is required';
        isValid = false;
    } else {
        subjectError.textContent = '';
    }

    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        isValid = false;
    } else {
        messageError.textContent = '';
    }

    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()[\\]\\.,;:\s@\"]+(\.[^<>()[\\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-1-9]+\\.)+[a-zA-1-9]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
