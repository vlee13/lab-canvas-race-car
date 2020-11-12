const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const racetrack = new Image();
racetrack.src = "../images/road.png";
const carImage = new Image();
carImage.src = "../images/car.png";

let walls = [];
let bullets = [];
let id = null;
let score = 0;

let fiat = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  w: 60,
  h: 100,
};

function animate() {
  id = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(racetrack, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(carImage, fiat.x, fiat.y, fiat.w, fiat.h);
  createWalls();
  for (let bullet of bullets) {
    bullet.drawBullet();
  }
  checkCollision();
}
animate();

window.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowRight":
      if (fiat.x < canvas.width - fiat.w) {
        fiat.x += 10;
      }
      break;
    case "ArrowLeft":
      if (fiat.x > 0) {
        fiat.x -= 10;
      }
      break;
    case "ArrowUp":
      if (fiat.y > 0) {
        fiat.y -= 10;
      }
      break;
    case "ArrowDown":
      if (fiat.y < canvas.height - fiat.h) {
        fiat.y += 10;
      }
      break;
    case " ":
      bullets.push(new Bullet(fiat.x, fiat.y, 20, 20));
  }
};

function createWalls() {
  walls.forEach((wall) => {
    ctx.fillStyle = wall.color;
    ctx.fillRect(wall.x, wall.y++, wall.w, wall.h);
  });
}

setInterval(() => {
  let wall = {
    x: Math.floor(Math.random() * canvas.width - 100),
    y: 0,
    w: 120,
    h: 40,
    color: "lime",
  };
  walls.push(wall);
}, 2000);

class Bullet {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawBullet() {
    ctx.fillStyle = "pink";
    ctx.fillRect(this.x, this.y--, this.w, this.h);
  }
}

function checkCollision() {
  for (let wall of walls) {
    if (
      fiat.x < wall.x + wall.w &&
      fiat.x + fiat.w > wall.x &&
      fiat.y < wall.y + wall.h &&
      fiat.y + fiat.h > wall.y
    ) {
      window.cancelAnimationFrame(id);
      alert(score);
    }

    for (let bullet of bullets) {
      if (
        bullet.x < wall.x + wall.w &&
        bullet.x + bullet.w > wall.x &&
        bullet.y < wall.y + wall.h &&
        bullet.y + bullet.h > wall.y
      ) {
        walls.splice(walls.indexOf(wall), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        score += 10;
      }
    }
  }
}
