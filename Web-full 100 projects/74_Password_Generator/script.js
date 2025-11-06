document.addEventListener('DOMContentLoaded', function() {
    const passwordDisplay = document.getElementById('password-display');
    const copyBtn = document.getElementById('copy-btn');
    const lengthInput = document.getElementById('length');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate-btn');

    const randomFunc = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol
    };

    generateBtn.addEventListener('click', () => {
        const length = +lengthInput.value;
        const hasLower = lowercaseCheckbox.checked;
        const hasUpper = uppercaseCheckbox.checked;
        const hasNumber = numbersCheckbox.checked;
        const hasSymbol = symbolsCheckbox.checked;

        passwordDisplay.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    });

    copyBtn.addEventListener('click', () => {
        const password = passwordDisplay.value;
        if (!password) { return; }

        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy password: ', err);
        });
    });

    function generatePassword(lower, upper, number, symbol, length) {
        let generatedPassword = '';
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

        if (typesCount === 0) {
            return '';
        }

        for (let i = 0; i < length; i += typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }

        const finalPassword = generatedPassword.slice(0, length);
        return finalPassword;
    }

    function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    function getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function getRandomSymbol() {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }
});