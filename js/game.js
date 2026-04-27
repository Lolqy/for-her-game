const board = document.getElementById('board');
const status = document.getElementById('status');
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handlePlayerMove(i, cell));
        board.appendChild(cell);
    }
}

function handlePlayerMove(i, cell) {
    if (!gameActive || gameState[i]) return;
    
    gameState[i] = 'X';
    cell.innerText = 'X';
    
    if (checkWinner('X')) {
        status.innerText = "You Win!";
        gameActive = false;
        return;
    }
    
    if (!gameState.includes(null)) {
        status.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    status.innerText = "Computer is thinking...";
    gameActive = false;
    setTimeout(computerMove, 600);
}

function computerMove() {
    let move = getBestMove();
    gameState[move] = 'O';
    document.querySelectorAll('.cell')[move].innerText = 'O';

    if (checkWinner('O')) {
        status.innerText = "Computer Wins!";
        gameActive = false;
    } else if (!gameState.includes(null)) {
        status.innerText = "It's a draw!";
        gameActive = false;
    } else {
        status.innerText = "Your turn (X)";
        gameActive = true;
    }
}

function getBestMove() {
    for (let i = 0; i < 9; i++) {
        if (!gameState[i]) {
            gameState[i] = 'O';
            if (checkWinner('O')) { gameState[i] = null; return i; }
            gameState[i] = null;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (!gameState[i]) {
            gameState[i] = 'X';
            if (checkWinner('X')) { gameState[i] = null; return i; }
            gameState[i] = null;
        }
    }
    if (!gameState[4]) return 4;
    let available = gameState.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    return available[Math.floor(Math.random() * available.length)];
}

function checkWinner(player) {
    return winningConditions.some(condition => 
        condition.every(index => gameState[index] === player)
    );
}

function resetGame() {
    gameState.fill(null);
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    gameActive = true;
    status.innerText = "Your turn (X)";
}

createBoard();