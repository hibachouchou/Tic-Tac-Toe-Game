document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const resultElement = document.getElementById('result');
    // Initialize the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    let currentPlayer = "X";
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWinner()) {
                resultElement.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== '')) {
                resultElement.textContent = "It's a draw!";
                gameActive = false;
            } else {
                currentPlayer = (currentPlayer === "X") ? "O" : "X";
            }
        }
    }

    function checkWinner() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (checkCells(i * 3, i * 3 + 1, i * 3 + 2)) {
                return true;
            }
        }
    
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (checkCells(i, i + 3, i + 6)) {
                return true;
            }
        }
    
        // Check diagonals
        if (checkCells(0, 4, 8) || checkCells(2, 4, 6)) {
            return true;
        }
    
        return false;
    }
    
    function checkCells(a, b, c) {
        return (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]);
    }
    
});
