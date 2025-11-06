const canvas = document.getElementById('pong-game');
const ctx = canvas.getContext('2d');
const player1ScoreSpan = document.getElementById('player1-score');
const player2ScoreSpan = document.getElementById('player2-score');
const startGameBtn = document.getElementById('start-game-btn');

let player1Score = 0;
let player2Score = 0;
let gameRunning = false;

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function draw() {
    // Clear canvas
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    // Draw paddles
    drawRect(0, player1Y, paddleWidth, paddleHeight, 'white');
    drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, 'white');

    // Draw ball
    drawCircle(ballX, ballY, ballSize / 2, 'white');

    // Draw net
    for (let i = 0; i < canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, 'white');
    }
}

function update() {
    if (!gameRunning) return;

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom walls
    if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballSize / 2 < paddleWidth) { // Player 1 side
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (player1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            // Player 2 scores
            player2Score++;
            player2ScoreSpan.textContent = player2Score;
            resetBall();
        }
    }

    if (ballX + ballSize / 2 > canvas.width - paddleWidth) { // Player 2 side
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (player2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            // Player 1 scores
            player1Score++;
            player1ScoreSpan.textContent = player1Score;
            resetBall();
        }
    }

    // Simple AI for Player 2 (moves paddle towards ball)
    if (player2Y + paddleHeight / 2 < ballY - 35) {
        player2Y += 4;
    } else if (player2Y + paddleHeight / 2 > ballY + 35) {
        player2Y -= 4;
    }

    // Keep paddles within bounds
    player1Y = Math.max(0, Math.min(canvas.height - paddleHeight, player1Y));
    player2Y = Math.max(0, Math.min(canvas.height - paddleHeight, player2Y));
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Serve to the other player
    ballSpeedY = 5; // Reset vertical speed
}

canvas.addEventListener('mousemove', function(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    player1Y = mouseY - paddleHeight / 2;
});

startGameBtn.addEventListener('click', function() {
    if (!gameRunning) {
        gameRunning = true;
        player1Score = 0;
        player2Score = 0;
        player1ScoreSpan.textContent = player1Score;
        player2ScoreSpan.textContent = player2Score;
        resetBall();
        gameLoop();
    }
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Initial draw
draw();
