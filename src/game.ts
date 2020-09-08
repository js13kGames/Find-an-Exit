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
    player.jump();
    player.y += player.dy * timeStep;

    if (keyPressed[Keys.Right] && player.dx < 10) {
        player.move('right');
    } else if (keyPressed[Keys.Left] && player.dx > -10) {
        player.move('left');
    }
    else {
        player.move('');
    }
    player.x += player.dx * timeStep;

    let collision = levelOne.isCollision(player)
    if (collision.type === 2 && player.dy > 0) {
        player.y = collision.y - player.height;
        player.dy = 0;
        player.isOnGround = true;
    }

    if (player.x <= 0 || player.x >= canvas.width - player.height) {
        if (player.x <= 0) {
            player.x = 0
        }
        if (player.x >= canvas.width - player.height) {
            player.x = canvas.width - player.height;
        }
        player.dx = -player.dx;
    }

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

    size!.innerHTML = `collision: ${levelOne.isCollision(player)} height: ${canvas.height} dx: ${player.dx.toFixed(1)} dy: ${player.dy.toFixed(1)}`;
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