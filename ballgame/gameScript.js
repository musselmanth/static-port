var butt = document.getElementById("dickbutt");
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-150;
var speed = Math.sqrt(32);
var dx = 4;
var dy = -4;
var ballRadius = 5;
var fillColors = ["#FF0000", "#FF9C00", "#F0FF00", "#00FF00", "#0000FF", "#8A00FF"]
var fillColor = fillColors[0];
var paddleHeight = 5;
var paddleWidth = 150;
var paddleX = (canvas.width-paddleWidth)/2;
var play = false;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var paddleSpeed = 11;
var gameText = "HEY JERK PRESS SPACE.";
var obsloc1 = [];
var obsExists1 = [];
var obsloc2 = [];
var obsExists2 = [];
var obsloc3 = [];
var obsExists3 = [];
var thisIs3 = [];
var winCount = 0;
var won = false;
var comboCount = 0;
var score = 1;
var comboColors = false;
var timer = 1000000000;
for (i = 0; i < 10; i++) {
	obsExists1[i] = true;
	obsloc1[i] = (canvas.width /10) * ( i + 1) -80;
	obsExists2[i] = true;
	obsloc2[i] = (canvas.width / 10) * (i + 1) -50;
	obsExists3[i] = true;
	obsloc3[i] = (canvas.width / 10) * (i + 1) -80;
}

function keyDownHandler(e) {
	if ( e.keyCode == 39 ) {
		rightPressed = true;
	}
	else if ( e.keyCode == 37 ) {
		leftPressed = true;
	}
	else if ( e.keyCode == 38) {
		upPressed = true;
	}
	else if ( e.keyCode == 40) {
		downPressed = true;
	}
}

function keyUpHandler(e) {
	if ( e.keyCode == 39 ) {
		rightPressed = false;
	}
	else if ( e.keyCode == 37 ) {
		leftPressed = false;
	}
	else if ( e.keyCode == 32 && play == false ) {
		restartGame();
	}
	else if ( e.keyCode == 38 ) {
		upPressed = false;
		paddleWidth+=10;
	}
	else if ( e.keyCode == 40 ) {
		downPressed = false;
		paddleWidth-=10;
	}
}

function restartGame() {
	play = true;
	x = canvas.width/2;
	y = canvas.height-150;
	gameText="DON'T F%$# UP";
	dx = 4;
	dy = -4;
	for (i = 0; i < 10; i++) {
		obsExists1[i] = true;
		obsExists2[i] = true;
		obsExists3[i] = true;
	}
	won = false;
	winCount = 0;
	comboCount = 0;
	score = 1;
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = fillColor;
	ctx.fill();
	ctx.closePath();
}

function gameOver() {
	if (won == true) {
		gameText = "CONGRATULATIONS LOSER. WHAT AN ACCOMPLISHMENT."
	}
	else {
		gameText = "YOU'RE HOPELESS. PRESS SPACE.";
	}
	play = false;
}

function drawBall() {
	ctx.beginPath();
        ctx.arc(x,y,ballRadius,0,Math.PI*2);
        ctx.fillStyle = fillColor;
        ctx.fill();
	ctx.closePath();
}

function drawObs() {
	for (i = 0; i < 10; i++) {
		if (obsExists1[i] == true) {
			ctx.beginPath();
			ctx.rect(obsloc1[i], 150, 55, 55);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.closePath();
		}
		if (obsExists2[i] == true) {
			ctx.beginPath();
			ctx.rect(obsloc2[i], 300, 55, 55);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.closePath();
		}
		if (obsExists3[i] == true) {
			ctx.beginPath();
			ctx.rect(obsloc3[i], 450, 55, 55);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.closePath();
		}
	}
}

function changeColor() {
	var min = 0;
	var max = 5;
	min = Math.ceil(min);
	max = Math.floor(max);
	var random = Math.floor(Math.random() * (max - min + 1)) + min;
	var prevColor = fillColor;
	fillColor = fillColors[random];
	if ( fillColor == prevColor ) {
		changeColor();
	}
}

function moveBall() {
	// check if ball is hitting sides
	if ( x > canvas.width - ballRadius || x < ballRadius ) {
		dx = -dx;
	}

	//check if ball if hitting top
	if ( y < ballRadius ) {
		dy = -dy;
	}

	//if ball goes near bottom, end the combo
	if ( y > 470 ) {
		comboCount = 0;
	}

	//if ball collides with top of paddle, run function to send it upward
	if ( y + ballRadius >= canvas.height - paddleHeight && ( (x + ballRadius > paddleX) && ( x - ballRadius < paddleX + paddleWidth))) {
		changeDirection();
		comboCount = 0;
	}

	//if ball hits the bottom, player loses.
	if ( y > canvas.height) {
		gameOver();
	}

	if (winCount == 30){
		won = true;
		dy = 5;
		gameOver();
	}

	for (i=0;i<10;i++) {
		if ((x >= obsloc1[i] && x <= obsloc1[i]+55) && (y <= 205+ballRadius && y >= 150-ballRadius )&&( obsExists1[i] == true)) {
			dy = -dy;
			obsExists1[i] = false;
			winCount++;
			changeColor();
			comboCount++;
			if (comboCount >= 3) {
				score = score * 3 * comboCount;
			}
			else {
				score = score * 2;
			}
		}
		if ((x >= (obsloc1[i] + ballRadius) && x <= obsloc1[i] + 55 + ballRadius) &&(y <= 205 && y >= 150 )&&( obsExists1[i] == true)) {
			dx = -dx;
			obsExists1[i] = false;
			winCount++;
			changeColor();
			comboCount++;
			if (comboCount >= 3) {
				score = score * 3 * comboCount;
			}
			else {
				score = score * 2;
			}
		}
	}
	for (i=0;i<10;i++) {
		if (
						( x >= obsloc2[i] && x <= obsloc2[i]+55 ) &&
						( y <= 355+ballRadius && y >= 300-ballRadius ) &&
						( obsExists2[i] == true )
				) {
			dy = -dy;
			obsExists2[i] = false;
			winCount++;
			changeColor();
			comboCount++;
			if (comboCount >= 3) {
				score = score * 2 * comboCount;
			}
			else {
				score = score * 2;
			}
		}
		if ((x >= (obsloc2[i] + ballRadius) && x <= obsloc2[i] + 55 + ballRadius) &&(y <= 355 && y >= 300 )&&( obsExists2[i] == true)) {
			dx = -dx;
			obsExists2[i] = false;
			winCount++;
			changeColor();
			comboCount++;
			if (comboCount >= 3) {
				score = score * 3 * comboCount;
			}
			else {
				score = score * 2;
			}
		}
	}
	for (i=0;i<10;i++) {
		if ((x >= obsloc3[i] && x <= obsloc3[i] + 55) && ( y <= 505+ballRadius && y >= 450-ballRadius) && ( obsExists3[i] == true)) {
			dy = -dy;
			obsExists3[i] = false;
			winCount++;
			changeColor();
			comboCount++;
			if (comboCount >= 3) {
				score = score * comboCount;
			}
			else {
				score = score *2;
			}
		}
		if ((x >= (obsloc3[i] + ballRadius) && x <= obsloc3[i] + 55 + ballRadius) &&(y <= 505 && y >= 450 )&&( obsExists3[i] == true)) {
			dx = -dx;
			obsExists3[i] = false;
			winCount++;
			changeColor();
			comboCount++;
			if (comboCount >= 3) {
				score = score * 3 * comboCount;
			}
			else {
				score = score * 2;
			}
		}
	}
	x += dx;
	y += dy;
}

function changeDirection() {
	var locOnPaddle = 1 - (( x - paddleX ) / paddleWidth);
	if (locOnPaddle < .05) {
		locOnpaddle = .05;
	}
	if (locOnPaddle > .95) {
		locOnPaddle = .95;
	}
	var angle = locOnPaddle * Math.PI;
	dx = speed * Math.cos(angle);
	dy = -1 * ( speed * Math.sin(angle) );
}

function movePaddle() {
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += paddleSpeed;
	}
	else if (leftPressed && paddleX > 0) {
		paddleX -= paddleSpeed;
	}
}

function drawText() {
	ctx.font = "bold 25px Helvetica";
	ctx.fillStyle = fillColor;
	ctx.fillText(gameText, (canvas.width / 2) - (ctx.measureText(gameText).width / 2), 50);
	if (upPressed == true) {
		var a = "LOSER";
		ctx.fillText(a, (canvas.width / 2) - (ctx.measureText(a).width / 2) , canvas.height / 2);
	}
	if (downPressed == true) {
		var b = "BEAUTIFUL";
		ctx.fillText(b, (canvas.width / 2) - (ctx.measureText(b).width / 2) , canvas.height / 2);

	}
	if (dy <= 1 && dy >= -1 && y <= 0.95 * canvas.height) {
		var c = "WELL SHIT THIS IS GOING TO TAKE FOREVER...";
		ctx.fillText(c, (canvas.width /2) - (ctx.measureText(c).width / 2) , canvas.height / 2);
	}
	if (comboCount >= 3) {
		var d = "WELL AREN'T YOU SPECIAL: COMBO " + comboCount;
		ctx.fillText(d, (canvas.width /2) - (ctx.measureText(d).width / 2) , canvas.height / 2);
		comboColors = true;
	}
	else {
		comboColors = false;
	}

	ctx.fillStyle = "#333333";
	ctx.font = "bold 30px Helvetica";
	if (play ==true) {
		if (paddleWidth >= 250) {
			ctx.fillText("Score: YOU'RE A DIRTY CHEATER", 40, canvas.height -50);
			score = 0;
		}
		else {
			ctx.fillText("Score: " + score, 40, canvas.height -50);

		}
	}
	ctx.font = "bold 16px Helvetica";
	ctx.fillStyle = "#222222";
	var gh = "TIMER: " + timer;
	ctx.fillText(gh,canvas.width - 250 , canvas.height -25);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawText();
	drawPaddle();
	movePaddle();
	if (play) {
		moveBall();
		drawBall();
		drawObs();
		timer -= 1;
	}
	if (won == true) {
		ctx.drawImage(butt,canvas.width/2 -125,canvas.height/2 -125 ,250,250);
	}
	if (comboColors==true) {
		changeColor();
	}

}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 30);
