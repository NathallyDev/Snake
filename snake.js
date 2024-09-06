const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamanho do grid e tamanho do quadrado (bloco)
const gridSize = 20;
const tileSize = canvas.width / gridSize;

// Inicializando a cobra (começa com um segmento)
let snake = [
  { x: 10, y: 10 }, // Posição inicial da cobra no meio do grid
];

// Direção inicial da cobra (ela não se move até o jogador pressionar uma tecla)
let direction = { x: 0, y: 0 };
let moving = false; // Variável para garantir que o jogo não comece até pressionar uma tecla

// Posição inicial da comida
let food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };

// Pontuação inicial
let score = 0;

// Variável de controle de velocidade
let speed = 300; // Tempo inicial de 300ms entre movimentos (mais lento)
let gameInterval; // Intervalo de atualização do jogo

// Função para desenhar o grid do jogo
function drawGrid() {
  // Preencher o canvas com uma cor clara
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
  // Se o jogo ainda não começou (nenhuma tecla pressionada), não move a cobra
  if (!moving) return;

  // Cria a nova cabeça da cobra (baseada na direção atual)
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Verifica se a cobra bateu nas bordas do canvas ou em si mesma
  if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize || snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    alert('Game Over! Sua pontuação foi: ' + score);
    clearInterval(gameInterval); // Para o jogo
    document.location.reload(); // Reinicia o jogo
    return;
  }

  snake.unshift(newHead); // Adiciona a nova cabeça à cobra

  // Verifica se a cobra comeu a comida
  if (newHead.x === food.x && newHead.y === food.y) {
    score++; // Aumenta a pontuação
    // Gera nova posição para a comida
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };

    // Aumenta a velocidade (reduz o intervalo entre os movimentos)
    speed = Math.max(50, speed - 20); // Diminui o intervalo (mínimo de 50ms)
    clearInterval(gameInterval); // Para o intervalo atual
    gameInterval = setInterval(update, speed); // Inicia um novo intervalo com a nova velocidade

  } else {
    snake.pop(); // Remove a última parte da cobra (se não comer a comida)
  }
}

// Função para atualizar o jogo a cada frame
function update() {
  drawGrid();  // Desenha o fundo
  drawSnake(); // Desenha a cobra
  drawFood();  // Desenha a comida
  moveSnake(); // Move a cobra
}

// Evento para controlar a direção da cobra
document.addEventListener('keydown', (event) => {
  // Inicia o movimento quando o usuário pressiona a primeira tecla
  if (!moving) moving = true;

  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) {
        direction = { x: 0, y: -1 };
      }
      break;
    case 'ArrowDown':
      if (direction.y === 0) {
        direction = { x: 0, y: 1 };
      }
      break;
    case 'ArrowLeft':
      if (direction.x === 0) {
        direction = { x: -1, y: 0 };
      }
      break;
    case 'ArrowRight':
      if (direction.x === 0) {
        direction = { x: 1, y: 0 };
      }
      break;
  }
});

// Função para iniciar o jogo com a velocidade inicial
function startGame() {
  gameInterval = setInterval(update, speed);
}

// Inicia o jogo
startGame();
