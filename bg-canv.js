const canvas = document.getElementById("bg-canv");
const ctx = canvas.getContext("2d");
let width = canvas.getBoundingClientRect().width;
let height = canvas.getBoundingClientRect().height;
canvas.width = width;
canvas.height = height;

const Ball = class {
  constructor(x, y, ctx, width) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.ballRadius = width * .75;
    this.dy = 0;
    this.dx = 0;
  };

  draw = () => {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.125)";
    this.ctx.fill();
    this.ctx.closePath();
  };

  move = (mouseX, mouseY, width) => {
    if ( mouseX < this.x ) {
      this.dx = (mouseX - this.x) / 800;
    } else if ( mouseX > this.x && this.x < width / 5 ) {
      this.dx = (mouseX - this.x) / 800;
    } else {
      this.dx = 0;
    }

    if (mouseY != this.y) {
      this.dy = (mouseY - this.y) / 800;
    } else {
      this.dy = 0;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
  
  play = (mouseX, mouseY, width) => {
    this.ballRadius = width * .75;
    this.move(mouseX, mouseY, width);
    this.draw();
  };
}

const ball = new Ball( 204, width / 5, ctx, width);

let mouseX = 204;
let mouseY = 4;

const setMousePosition = (evt) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = evt.clientX - rect.left
  mouseY = evt.clientY - rect.top
};

const handleWindowResize = (evt) => {
  width = canvas.getBoundingClientRect().width;
  height = canvas.getBoundingClientRect().height;
  canvas.width = width;
  canvas.height = height;
}

const play = () => {
  ctx.clearRect(0, 0, width, height);
  ball.play(mouseX, mouseY, width);
};

canvas.addEventListener("mousemove", setMousePosition, false);
window.addEventListener("resize", handleWindowResize)
setInterval(play, 10);
