const canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 700;
const ctx = canvas.getContext("2d");
const carImg = new Image();
carImg.src = "./images/car.png";
const roadImg = new Image();
roadImg.src = "/images/road.png";
let id = null;
let score = 0;
class Car {
  constructor(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawCar() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
let miniCooper = new Car(carImg, 250, 600, 50, 100);
let bullets = [];
window.onkeydown = function (event) {
  switch (event.key) {
    case "ArrowLeft":
      if (miniCooper.x > miniCooper.w) miniCooper.x -= 10;
      break;
    case "ArrowRight":
      if (miniCooper.x < canvas.width - 2 * miniCooper.w) miniCooper.x += 10;
      break;
    case " ":
      bullets.push(new Bullet(miniCooper.x, miniCooper.y, 10, 10));
      break;
  }
};
class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  }
  drawObstacle = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y++, this.w, this.h);
  };
  checkCollision = () => {
    if (
      miniCooper.x < this.x + this.w &&
      miniCooper.x + miniCooper.w > this.x &&
      miniCooper.y < this.y + this.h &&
      miniCooper.y + miniCooper.h > this.y
    ) {
      window.cancelAnimationFrame(id);
      alert(score);
    }
    for (let bullet of bullets) {
      if (
        bullet.x < this.x + this.w &&
        bullet.x + bullet.w > this.x &&
        bullet.y < this.y + this.h &&
        bullet.y + bullet.h > this.y
      ) {
        obstacless.splice(obstacless.indexOf(this), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
      }
    }
  };
}
class Bullet {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawBullet() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.y--;
  }
}
let obstacless = [];
let random = () =>
  Math.random() * (canvas.width - miniCooper.w * 2 - 100) + miniCooper.w;
setInterval(function () {
  obstacless.push(new Obstacle(random(), 0, 100, 20));
}, 1000);
// collision detected!
function animate() {
  id = window.requestAnimationFrame(animate);
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  miniCooper.drawCar();
  for (obs of obstacless) {
    obs.drawObstacle();
    obs.checkCollision();
  }
  for (bullet of bullets) {
    bullet.drawBullet();
  }
  score++;
}
animate();

// document.getElementById("start-button").onclick = () => {
//   startGame();
// };

// let canvas = document.querySelector("#canvas");
// let ctx = canvas.getContext("2d");
// let carImage = new Image();
// carImage.src = "../images/car.png";
// carImage.onload = startGame;
// let roadImg = new Image();
// roadImg.src = "../images/road.png";

// let carObj = {
//   width: 50,
//   height: 100,
//   x: 170,
//   y: 530,
// };

// let i = 0;
// let id = null;
// let walls = [];
// let score = 0;

// function startGame() {
//   id = window.requestAnimationFrame(startGame);
//   ctx.clearRect(0, 0, 500, 700);
//   ctx.drawImage(roadImg, 0, 0, 400, 650);
//   drawCar();
//   createWall(i);
//   checkCollision();
//   i += 1;
//   if (frames % 100 === 0) {
//     score += 100;
//     document.querySelector("#scoreboard").innerText = score;
//   }
//   frames++;
// }

// document.addEventListener("keydown", function (e) {
//   switch (e.key) {
//     case "ArrowLeft":
//       carObj.x -= 10;
//       break;
//     case "ArrowRight":
//       carObj.x += 10;
//       break;
//     case "ArrowUp":
//       carObj.y -= 10;
//       break;
//     case "ArrowDown":
//       carObj.y += 10;
//       break;
//   }
// });

// function drawCar() {
//   ctx.drawImage(carImage, carObj.x, carObj.y, carObj.width, carObj.height);
// }

// function createWall(i) {
//   walls.forEach((wall) => {
//     ctx.fillStyle = wall.color;
//     wall.y = i;
//     ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
//   });
// }
// setInterval(() => {
//   let wall = {
//     color: "red",
//     width: 200 + Math.floor(Math.random() * 10),
//     height: 50,
//     x: Math.floor(Math.random() * (canvas.width - 100)),
//     y: canvas.height - 50,
//   };
//   walls.push(wall);
// }, 3000);

// function checkCollision() {
//   if (
//     walls.x < carObj.x + walls.width &&
//     carObj.x + carObj.width > walls.x &&
//     carObj.y < walls.y + walls.height &&
//     carObj.y + carObj.height > walls.y
//   ) {
//     console.log("collision");
//     window.cancelAnimationFrame(id);
//   }
// }
