const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6],
];

// Inicializa o jogo
function initializeGame() {
  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.addEventListener("click", () => handleCellClick(index));
  });
  currentPlayer = "X";
  gameActive = true;
  gameState.fill("");
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

// Trata o clique em uma célula
function handleCellClick(index) {
  if (!gameActive || gameState[index] !== "") return;

  updateCell(index);
  if (checkWin()) {
    gameActive = false;
    statusText.textContent = `${currentPlayer} venceu!`;
    return;
  }
  if (checkDraw()) {
    gameActive = false;
    statusText.textContent = "Empate!";
    return;
  }
  changePlayer();
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

// Atualiza a célula com a jogada atual
function updateCell(index) {
  gameState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
}

// Alterna o jogador atual
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Verifica se alguém venceu
function checkWin() {
  return winningCombinations.some(combination =>
    combination.every(index => gameState[index] === currentPlayer)
  );
}

// Verifica se houve empate
function checkDraw() {
  return gameState.every(cell => cell !== "");
}

// Reinicia o jogo ao clicar no botão
restartBtn.addEventListener("click", initializeGame);

// Inicializa o jogo ao carregar
initializeGame();
