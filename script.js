const prime = document.getElementById('prime');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');

let gravity = 2;
let velocity = 0;
let score = 0;

let pipes = [];

function jump() {
  velocity = -20;
}

document.addEventListener('keydown', jump);
document.addEventListener('click', jump);

function createPipe() {
  let gap = 200;
  let topHeight = Math.floor(Math.random() * 300) + 100;
  let bottomHeight = window.innerHeight - topHeight - gap;

  const topPipe = document.createElement('div');
  topPipe.classList.add('pipe', 'pipe-top');
  topPipe.style.height = `${topHeight}px`;
  topPipe.style.left = '100%';

  const bottomPipe = document.createElement('div');
  bottomPipe.classList.add('pipe');
  bottomPipe.style.height = `${bottomHeight}px`;
  bottomPipe.style.left = '100%';

  gameContainer.appendChild(topPipe);
  gameContainer.appendChild(bottomPipe);

  pipes.push({ top: topPipe, bottom: bottomPipe, passed: false });
}

function movePipes() {
  pipes.forEach((pipe, index) => {
    const currentLeft = parseInt(pipe.top.style.left);
    pipe.top.style.left = `${currentLeft - 5}px`;
    pipe.bottom.style.left = `${currentLeft - 5}px`;

    // Check if passed
    if (!pipe.passed && currentLeft < 100) {
      score++;
      scoreDisplay.innerText = score;
      pipe.passed = true;
    }

    // Collision
    if (
      currentLeft < 160 && currentLeft > 40 &&
      (parseInt(prime.style.top) < pipe.top.offsetHeight ||
       parseInt(prime.style.top) + prime.offsetHeight > window.innerHeight - pipe.bottom.offsetHeight)
    ) {
      gameOver();
    }

    // Remove off-screen
    if (currentLeft < -80) {
      pipe.top.remove();
      pipe.bottom.remove();
      pipes.splice(index, 1);
    }
  });
}

function update() {
  velocity += gravity;
  let top = parseInt(prime.style.top || 200);
  top += velocity;
  if (top < 0) top = 0;
  if (top > window.innerHeight - prime.offsetHeight) {
    gameOver();
    return;
  }
  prime.style.top = `${top}px`;

  movePipes();
}

function gameOver() {
  alert("Game Over! Score: " + score);
  window.location.reload();
}

setInterval(update, 30);
setInterval(createPipe, 2000);
