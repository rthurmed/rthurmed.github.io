const bgcanvas = document.getElementById("bgcanvas");
const ctx = bgcanvas.getContext('2d');

const image = new Image();
image.src = 'images/banana.png';
image.onload = function (event) {
    init();
}

// dynamic resize
function updateCanvasSize() {
    const rect = document.body.getBoundingClientRect();
    bgcanvas.height = rect.height;
    bgcanvas.width = rect.width;
}
window.addEventListener("resize", updateCanvasSize);
updateCanvasSize();

const game = {
    lastTime: 0,
    deltaTime: 0
}

const banana = {
    image,
    x: 0,
    y: 20,
    scaleX: 10,
    scaleY: 10,
}

function init() {
    game.lastTime = Date.now();
    loop();
}

function loop() {
    // time
    const now = Date.now();
    game.deltaTime = game.lastTime - now;
    game.lastTime = now;

    // keyboard

    // update
    banana.x -= game.deltaTime / 2;
    if (banana.x > bgcanvas.width) {
        banana.x = banana.image.width * banana.scaleX * -1;
    }

    // draw
    ctx.clearRect(0, 0, bgcanvas.height, bgcanvas.width);
    ctx.drawImage(
        banana.image,
        banana.x,
        banana.y,
        banana.image.width * banana.scaleX,
        banana.image.height * banana.scaleY
    );

    window.requestAnimationFrame(loop);
}