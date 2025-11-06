const dateInput = document.getElementById('date-input');
const calendarContainer = document.querySelector('.calendar-container');
const monthYearDisplay = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const calendarDays = document.querySelector('.calendar-days');

let currentDate = new Date();

function renderCalendar() {
    calendarDays.innerHTML = '';
    monthYearDisplay.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    // Fill in leading empty days
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('disabled');
        calendarDays.appendChild(emptyDiv);
    }

    // Fill in days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.addEventListener('click', () => {
            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            dateInput.value = selectedDate.toLocaleDateString();
            calendarContainer.style.display = 'none';
        });
        calendarDays.appendChild(dayDiv);
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

dateInput.addEventListener('focus', () => {
    calendarContainer.style.display = 'block';
    renderCalendar();
});

document.addEventListener('click', (e) => {
    if (!calendarContainer.contains(e.target) && e.target !== dateInput) {
        calendarContainer.style.display = 'none';
    }
});

renderCalendar();