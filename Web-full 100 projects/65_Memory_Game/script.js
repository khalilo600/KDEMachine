document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('game-board');
    const movesSpan = document.getElementById('moves');
    const resetButton = document.getElementById('reset-button');

    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cards = [];
    let flippedCards = [];
    let matchedCards = 0;
    let moves = 0;
    let lockBoard = false;

    function initializeGame() {
        cards = [...cardValues, ...cardValues]; // Duplicate for pairs
        shuffleCards(cards);
        gameBoard.innerHTML = '';
        flippedCards = [];
        matchedCards = 0;
        moves = 0;
        movesSpan.textContent = moves;
        lockBoard = false;
        createCards();
    }

    function shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCards() {
        cards.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-face', 'card-front');
            cardFront.textContent = value;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-face', 'card-back');

            card.appendChild(cardFront);
            card.appendChild(cardBack);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === flippedCards[0]) return; // Prevent double clicking the same card

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesSpan.textContent = moves;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.value === card2.dataset.value;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        flippedCards[0].removeEventListener('click', flipCard);
        flippedCards[1].removeEventListener('click', flipCard);
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        matchedCards += 2;
        resetFlippedCards();

        if (matchedCards === cards.length) {
            setTimeout(() => alert(`Congratulations! You won in ${moves} moves!`), 500);
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            resetFlippedCards();
        }, 1000);
    }

    function resetFlippedCards() {
        [flippedCards, lockBoard] = [[], false];
    }

    resetButton.addEventListener('click', initializeGame);

    initializeGame();
});