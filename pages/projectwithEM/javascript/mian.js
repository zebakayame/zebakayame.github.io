let canvas;
let ctx;

let WIDTH = 720;
let HEIGHT = 720;

window.onload = init;

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getctx('2d');

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp){
    grid();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function grid(){
    ctx.fillStyle = '#093D14';
    ctx.strokeStyle = '#071510';
    ctx.lineWidth = 1;
    ctx.fillRect(0, 0, config.sizeCell, config.sizeCell);
    ctx.strokeRect(0, 0, config.sizeCell - 1, config.sizeCell - 1);
}

function draw(){
    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
    ctx.fillStyle = randomColor;
    ctx.fillRect(100, 50, 200, 175);
}