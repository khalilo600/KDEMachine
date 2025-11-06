const form = document.getElementById('multiStepForm');
const steps = document.querySelectorAll('.step');
let currentStep = 0;

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.style.display = (index === stepIndex) ? 'block' : 'none';
    });
}

function validateStep(stepIndex) {
    let isValid = true;
    const inputs = steps[stepIndex].querySelectorAll('input[required]');
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    return isValid;
}

form.addEventListener('click', (e) => {
    if (e.target.classList.contains('next-step')) {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    } else if (e.target.classList.contains('prev-step')) {
        currentStep--;
        showStep(currentStep);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
        alert('Form submitted successfully!');
        // Here you would typically send the form data to a server
        form.reset();
        currentStep = 0;
        showStep(currentStep);
    }
});

showStep(currentStep);