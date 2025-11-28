// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// reference to ball count paragraph
const ballCountDisplay = document.getElementById("ball-count");

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}

// ---------- Shape base class ----------
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// ---------- Ball class ----------
class Ball extends Shape {
  constructor(x, y, velX, velY, size, color) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true; // track if ball is still in the game
  }

  draw() {
    if (!this.exists) return;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (!this.exists) return;

    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// ---------- EvilCircle class ----------
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
    this.setControls();
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = width - this.size;
    }
    if (this.x - this.size <= 0) {
      this.x = this.size;
    }
    if (this.y + this.size >= height) {
      this.y = height - this.size;
    }
    if (this.y - this.size <= 0) {
      this.y = this.size;
    }
  }

  setControls() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!ball.exists) continue;

      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
        ball.exists = false; // ball gets eaten
        ballCount--;
        ballCountDisplay.textContent = ballCount;
      }
    }
  }
}

// ---------- Create balls ----------
const balls = [];
let ballCount = 0;

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    size,
    randomRGB()
  );

  balls.push(ball);
  ballCount++;
}

ballCountDisplay.textContent = ballCount;

// ---------- Create evil circle ----------
const evilCircle = new EvilCircle(width / 2, height / 2);

// ---------- Animation loop ----------
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
