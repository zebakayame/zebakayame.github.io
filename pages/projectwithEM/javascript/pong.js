const canvasWidth = 800;
const canvasHeight = 400;

const playerWidth = 10;
const playerHeight = 80;

const headSize = 10;

const playerSpeed = 5;

const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var player1 = {
    x: 0,
    y: canvasHeight/2 - playerHeight/2,
    with: playerWidth,
    height: canvasHeight,
    color: #fff,
    dy: 0
};

var player2 = {
    x: canvasWidth - playerWidth,
    y: canvasHeight/2 - playerHeight/2,
    with: playerWidth,
    height: canvasHeight,
    color: #fff,
    dy: 0
};

var ball = {
    x: canvasWidth / 2 - headSize/2,
    y: canvasHeight / 2 - headSize/2,
    with: headSize,
    height: headSize,
    color: #f3f3f3,
    vx: 3,
    vy: 3
};

function draw() {
    ctx.clearRect(0,0, canvasWidth, canvasHeight);

    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x,player1.y,player1.with,player1.height);

    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x,player2.y,player.width,player.height);

    ctx.fillStyle = ball.color;
    ctx.fillStyle(ball.x, ball.y, ball.with, ball.height);
}

function update(){

    checkKeyPress();
    updatePlayers();
    updateBall();

    draw();
    requestAnimationFrame(update);
}

function updateBall() {
    if(ball.y + ball.height >= canvasHeight){
        ball.vy *= -1;
    }
    if(ball.y <= 0){
        ball.vy *= -1;
    }
    // player 1 collision
    if(ball.x <= player1.x + player1.with && 
        ball.y + ball.height >= player1.height && 
        ball.y <= player1.y + player1.height){
        ball.vx *= -1;
    }
    if(ball.x + ball.with <= player2.x && 
        ball.y + ball.height >= player2.height && 
        ball.y <= player2.y + player2.height){
        ball.vx *= -1;
    }

    if(ball.x <= 0){
        resetBall();
    }
    if(ball.x >= canvasWidth){
        resetBall();
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

function resetBall() {
    ball.dx = 3;
    ball.dy = 3;
    ball.x = canvasWidth / 2 - ball.with/2;
    ball.y = canvasHeight / 2 - ball.height/2;
}

// Key listener
document.addEventListener("keydown", function(event) {
    if(event.key === "w"){
        player1.dy = -playerSpeed;
    }
    if(event.key === "s"){
        player1.dy = playerSpeed;
    }
    if(event.key === "o"){
        player2.dy = playerSpeed;
    }
    if(event.key === "l"){
        player2.dy = playerSpeed;
    }
});
document.addEventListener("keyup", function(event){
    if(event.key === "w" || event.key === "s"){
        player1.dy = 0;
    }
    if(event.key === "o" || event.key === "l"){
        player2.dy = 0;
    }
});

update();