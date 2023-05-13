const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const canvasWidth = 800;
const canvasHeight = 400;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const playerWidth = 10;
const playerHeight = 80;

const headSize = 10;

const playerSpeed = 5;
const ballSpeed = 2;
const ballAcceleration = 1.05;

const middleLineColor = "white";
const square = 10;
const canvasGrid = 15;
const wallColor = "white";

const activeRoleColor = "black";
const offRoleColor = "darkgrey";

var player1 = {
    x: 10,
    y: canvasHeight/2 - playerHeight/2,
    with: playerWidth,
    height: playerHeight,
    color: "white",
    dy: 0
};

var player2 = {
    x: canvasWidth - playerWidth - 10,
    y: canvasHeight/2 - playerHeight/2,
    with: playerWidth,
    height: playerHeight,
    color: "white",
    dy: 0
};

var ball = {
    x: canvasWidth / 2 - headSize/2,
    y: canvasHeight / 2 - headSize/2,
    with: headSize,
    height: headSize,
    color: "white",
    vx: -1,
    vy: 1
};

function draw() {
    // draw player 1
    context.fillStyle = player1.color;
    context.fillRect(player1.x, player1.y, player1.with, player1.height);

    // draw player 2
    context.fillStyle = player2.color;
    context.fillRect(player2.x, player2.y, player2.with, player2.height);

    // draw ball
    context.fillStyle = ball.color;
    context.fillRect(ball.x,ball.y,ball.with,ball.height);

    // draw middle line
    for (var i = 0; i < canvas.height; i += canvasGrid) {
        context.fillStyle = middleLineColor;
        context.fillRect(canvas.width / 2 - square / 2, i, square, square);
    }

    // draw the walls
    context.strokeStyle = wallColor;
    context.lineWidth = 10;
    context.strokeRect(0, 0, canvas.width, canvas.height);
}

function updatePlayerPos() {
    player1.y += player1.dy;
    player2.y += player2.dy;
}

function resetBall() {
    ball.dx = 3;
    ball.dy = 3;
    ball.x = canvasWidth / 2 - ball.with/2;
    ball.y = canvasHeight / 2 - ball.height/2;

    ball.vx = 1;
    ball.vy = 1;
}

function updateBall() {
    if(ball.y + ball.height >= canvasHeight){
        ball.vy *= -1;
    }
    if(ball.y <= 0){
        ball.vy *= -1;
    }
    // player 1 collision
    if(ball.x <= player1.x + player1.with && ball.y >= player1.y && ball.y + ball.height <= player1.y + player1.height){
        ball.vx *= -1;
        ball.vx *= 1.5;
    }
    // player 2 collsion
    if(ball.x + ball.with >= player2.x && ball.y >= player2.y && ball.y+ball.height <=player2.y + player2.height){
        ball.vx *= -1;
        ball.vx *= ballAcceleration;
    }
    
    if(ball.x <= 0){
        resetBall();
    }
    if(ball.x >= canvasWidth){
        resetBall();
    }
    ball.x += ballSpeed * ball.vx;
    ball.y += ballSpeed * ball.vy;
}

function roleSwitch() {

    if(ball.x + ball.with/2 <=canvasWidth/2){
        context.fillStyle = activeRoleColor;
        context.fillRect(0, 0, canvasWidth / 2, canvasHeight);
        context.fillStyle = offRoleColor;
        context.fillRect(canvasWidth/2, 0, canvasWidth, canvasHeight);
    }
    if(ball.x + ball.with/2 >= canvasWidth/2){
        context.fillStyle = offRoleColor;
        context.fillRect(0, 0, canvasWidth / 2, canvasHeight);
        context.fillStyle = activeRoleColor;
        context.fillRect(canvasWidth/2, 0, canvasWidth, canvasHeight);
    }
    

}


function update() {
    roleSwitch();

    draw();
    updatePlayerPos();
    updateBall();

    requestAnimationFrame(update);
}

// Key listener
document.addEventListener("keypress", function(event) {
    if(event.key === "w"){
       player1.dy = -playerSpeed;
    }
    else if(event.key === "s"){
        player1.dy = playerSpeed;
    }
    if(event.key === "o"){
        player2.dy = -playerSpeed;
    }
    else if(event.key === "l"){
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

// Lancer l'animation
update();