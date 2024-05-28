const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const width = canvas.width / tileSize;
const height = canvas.height / tileSize;

const pacman = {
  x: 1,
  y: 1,
  dx: 1,
  dy: 0,
  size: tileSize,
  speed: 1,
};

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function drawPacman() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(
    pacman.x * tileSize + tileSize / 2,
    pacman.y * tileSize + tileSize / 2,
    pacman.size / 2,
    0.2 * Math.PI,
    1.8 * Math.PI
  );
  ctx.lineTo(
    pacman.x * tileSize + tileSize / 2,
    pacman.y * tileSize + tileSize / 2
  );
  ctx.fill();
}

function updatePacman() {
  // Removi esta função porque a movimentação está sendo tratada em checkCollisions
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      } else if (maze[row][col] === 2) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(
          col * tileSize + tileSize / 2,
          row * tileSize + tileSize / 2,
          tileSize / 4,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }
}

function checkCollisions() {
  const nextX = pacman.x + pacman.dx;
  const nextY = pacman.y + pacman.dy;

  if (maze[Math.floor(nextY)][Math.floor(nextX)] === 1) {
    pacman.dx = 0;
    pacman.dy = 0;
  } else {
    pacman.x = nextX;
    pacman.y = nextY;
  }
}

function checkFood() {
  if (maze[Math.floor(pacman.y)][Math.floor(pacman.x)] === 2) {
    maze[Math.floor(pacman.y)][Math.floor(pacman.x)] = 0;
    // Aumentar a pontuação, adicionar som, etc.
  }
}

function gameLoop() {
  clearCanvas();
  drawMaze();
  drawPacman();
  checkFood();
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      pacman.dx = 0;
      pacman.dy = -1;
      break;
    case "ArrowDown":
      pacman.dx = 0;
      pacman.dy = 1;
      break;
    case "ArrowLeft":
      pacman.dx = -1;
      pacman.dy = 0;
      break;
    case "ArrowRight":
      pacman.dx = 1;
      pacman.dy = 0;
      break;
  }
});
