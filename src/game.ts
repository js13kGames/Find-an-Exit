import {
    canvas,
    clr,
    ctx,
    resize
} from './common.js';
import Player from './player.js';
import { keyPressed } from './controller.js';
import Keys from './keys.js';
import { GRAVITY, TILE_SIZE } from './constants.js';
import Render from './render.js';
import levelOne from './levels/level_one.js';

const playerStartingPoint: { x: number, y: number } = { x: levelOne.start[0] * TILE_SIZE, y: levelOne.start[1] * TILE_SIZE };
let player = new Player(playerStartingPoint);

let size = document.getElementById('size');

function update(timeStep: number = 1) {
    let lastPlayerState = player;

    // Add gravity to player
    player.dy += GRAVITY;
    levelOne.handleVerticalCollision(player);
    player.jump(timeStep);
    
    levelOne.handleHorizontalCollision(player);
    player.move(timeStep);

    player.adjustBoundingBox();
    return lastPlayerState;
}

function render(lastPlayerState: Player | undefined = undefined, interpolation: number = 1) {
    clr();
    // resize();
    Render.renderLevelOne();
    if (ctx !== null) {
        ctx.fillStyle = 'black';
        ctx.fillRect(lastPlayerState?.x || 0 + (player.x - (lastPlayerState?.x || 0)) * interpolation, lastPlayerState?.y || 0 + (player.y - (lastPlayerState?.y || 0)) * interpolation, player.height, player.height);

        ctx.strokeStyle = '#FFA500';
        ctx.strokeRect(player.boundingBox[0][0], player.boundingBox[0][1], player.height, player.height);
    }

    size!.innerHTML = `dx: ${player.dx.toFixed(1)} dy: ${player.dy.toFixed(1)}`;
}

const fps = 60;
const timeStep = 1000 / fps;
let currentTime = performance.now();
let timeAccumulator = 0.0;
let currentTimeState = 0;
let previousTimeState = 0;

function loop(timestamp: number) {
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

requestAnimationFrame(loop);