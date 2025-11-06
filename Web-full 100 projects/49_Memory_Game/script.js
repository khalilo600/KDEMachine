const gameBoard = document.getElementById('game-board');
const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedCards = [];
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = value;

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return; // Prevent double clicking the same card

    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        lockBoard = true;
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
    matchedCards.push(flippedCards[0], flippedCards[1]);
    resetBoard();

    if (matchedCards.length === cardsArray.length) {
        alert('You won!');
    }
}

function unflipCards() {
    setTimeout(() => {
        flippedCards[0].classList.remove('flip');
        flippedCards[1].classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [flippedCards, lockBoard] = [[], false];
}

createBoard();