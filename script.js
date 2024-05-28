const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const width = canvas.width / tileSize;
const height = canvas.height / tileSize;

const pacman = {
  x: 10,
  y: 10,
  dx: 1,
  dy: 0,
  size: tileSize,
  speed: 2,
};

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
  pacman.x += pacman.dx * pacman.speed;
  pacman.y += pacman.dy * pacman.speed;

  if (pacman.x < 0) pacman.x = 0;
  if (pacman.x >= width) pacman.x = width - 1;
  if (pacman.y < 0) pacman.y = 0;
  if (pacman.y >= height) pacman.y = height - 1;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
  clearCanvas();
  updatePacman();
  drawPacman();
  requestAnimationFrame(gameLoop);
}

gameLoop();
