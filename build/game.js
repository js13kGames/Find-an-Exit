import Common from './common.js';
import Player from './player.js';
import Controller from './controller.js';
import { GRAVITY } from './constants.js';
import Render from './render.js';
let { canvas, ctx, clr, resize, } = Common.instance;
const playerStartingPoint = { x: 16 * 30, y: 2 * 30 };
let player = new Player(playerStartingPoint);
let size = document.getElementById('size');
function update(timeStep = 1) {
    let lastPlayerState = player;
    // Add gravity to player
    player.dy += GRAVITY;
    if (player.isOnGround && controller.keyPressed[0 /* Jump */]) {
        player.startJump();
    }
    else {
        player.jump();
        player.y += player.dy * timeStep;
    }
    if (controller.keyPressed[3 /* Right */] && player.dx < 10) {
        player.move('right');
    }
    else if (controller.keyPressed[2 /* Left */] && player.dx > -10) {
        player.move('left');
    }
    else {
        player.move('');
    }
    player.x += player.dx * timeStep;
    // Collision with ground detect
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.isOnGround = true;
    }
    if (player.x <= 0 || player.x >= canvas.width - player.height) {
        if (player.x <= 0) {
            player.x = 0;
        }
        if (player.x >= canvas.width - player.height) {
            player.x = canvas.width - player.height;
        }
        player.dx = -player.dx;
    }
    return lastPlayerState;
}
function render(lastPlayerState = undefined, interpolation = 1) {
    clr();
    // resize();
    let { start } = Render.levelOne();
    ctx.fillRect(lastPlayerState?.x || 0 + (player.x - (lastPlayerState?.x || 0)) * interpolation, lastPlayerState?.y || 0 + (player.y - (lastPlayerState?.y || 0)) * interpolation, player.height, player.height);
    size.innerHTML = `width: ${canvas.width} height: ${canvas.height} dx: ${player.dx.toFixed(1)} dy: ${player.dy.toFixed(1)}`;
}
const fps = 120;
const timeStep = 1000 / fps;
let currentTime = performance.now();
let timeAccumulator = 0.0;
let currentTimeState = 0;
let previousTimeState = 0;
function loop(timestamp) {
    if (timestamp < currentTimeState + timeStep) {
        requestAnimationFrame(loop);
        return;
    }
    let newTime = timestamp;
    let frameTime = newTime - currentTime;
    // if (frameTime > 0.25) frameTime = 0.25;
    currentTime = newTime;
    timeAccumulator += frameTime;
    let lastPlayerState;
    while (timeAccumulator >= timeStep) {
        previousTimeState = currentTimeState;
        lastPlayerState = update();
        timeAccumulator -= timeStep;
    }
    const alpha = timeAccumulator / timeStep;
    currentTimeState = currentTimeState * alpha + previousTimeState * (1.0 - alpha);
    render();
    requestAnimationFrame(loop);
}
Controller.init();
let { instance: controller } = Controller;
requestAnimationFrame(loop);
