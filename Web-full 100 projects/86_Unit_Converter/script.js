document.addEventListener('DOMContentLoaded', function() {
    const valueInput = document.getElementById('value-input');
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    const convertBtn = document.getElementById('convert-btn');
    const resultDisplay = document.getElementById('result-display');

    const conversionRates = {
        meters: {
            kilometers: 0.001,
            miles: 0.000621371,
            feet: 3.28084,
            meters: 1
        },
        kilometers: {
            meters: 1000,
            miles: 0.621371,
            feet: 3280.84,
            kilometers: 1
        },
        miles: {
            meters: 1609.34,
            kilometers: 1.60934,
            feet: 5280,
            miles: 1
        },
        feet: {
            meters: 0.3048,
            kilometers: 0.0003048,
            miles: 0.000189394,
            feet: 1
        }
    };

    convertBtn.addEventListener('click', convertUnit);

    function convertUnit() {
        const value = parseFloat(valueInput.value);
        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;

        if (isNaN(value)) {
            resultDisplay.textContent = 'Please enter a valid number.';
            return;
        }

        if (fromUnit === toUnit) {
            resultDisplay.textContent = `${value} ${toUnit}`;
            return;
        }

        const convertedValue = value * conversionRates[fromUnit][toUnit];
        resultDisplay.textContent = `${convertedValue.toFixed(4)} ${toUnit}`;
    }

    // Initial conversion on load
    convertUnit();
});