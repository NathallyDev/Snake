const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definindo o tamanho do grid
const gridSize = 20;
const tileSize = canvas.width / gridSize;

let snake = [
  { x: 10, y: 10 },
];

let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let gameOver = false;

// Função para desenhar o grid
function drawGrid() {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Função para desenhar a cobra
function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}

// Função para desenhar a comida
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// Função para mover a cobra
function moveSnake() {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Verifica se a cobra colidiu com a parede ou com o próprio corpo
  if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize || snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    gameOver = true;
    alert('Game Over! Sua pontuação foi: ' + score);
    document.location.reload();
    return;
  }

  snake.unshift(newHead);

  // Verifica se a cobra comeu a comida
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    // Gera uma nova posição para a comida
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } else {
    snake.pop(); // Remove a última parte da cobra
  }
}

// Função para atualizar o jogo
function update() {
  if (gameOver) return;

  drawGrid();
  drawSnake();
  drawFood();
  moveSnake();
}

// Função para mudar a direção da cobra
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) {
        direction = { x: 0, y: -1 };
     
