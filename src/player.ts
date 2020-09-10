import { MAX_JUMP_VELOCITY, TILE_SIZE } from './constants.js';
import Keys from './keys.js';
import { keyPressed } from './controller.js';
import BoundingBoxCorners from './bounding_box_corners.js';

class Player {
    #x: number;
    #y: number;
    dx: number = 0;
    dy: number = 0;
    #storedVelocity: number = 0;
    #height: number = TILE_SIZE;
    #isJumped: boolean = false;
    isOnGround: boolean = true;
    #health: number = 3;
    #jumpAcceleration = -2;
    #moveAcceleration = 0.3;
    #boundingBox = [
        [0, 0], // up
        [0, 0], // right
        [0, 0], // down
        [0, 0], // left
    ]

    constructor(startingPoint: { x: number, y: number }) {
        let { x, y } = startingPoint;
        this.#x = x;
        this.#y = y;
        this.adjustBoundingBox();
    }

    get height() {
        return this.#height;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set y(y) {
        this.#y = y;
    }

    set x(x) {
        this.#x = x;
    }

    get isJumped() {
        return this.#isJumped;
    }

    get boundingBox() {
        return this.#boundingBox;
    }

    move(timeStep: number): void {
        if (keyPressed[Keys.Right] && this.dx < 10) {
            this.dx += this.#moveAcceleration;
        } else if (keyPressed[Keys.Left] && this.dx > -10) {
            this.dx += -this.#moveAcceleration;
        } else {
            this.dx *= 0.6;
        }
        this.x += this.dx * timeStep;
    }

    jump(timeStep: number): void {
        if (this.isOnGround) {
            if (keyPressed[Keys.Jump]) {
                this.#storedVelocity += this.#jumpAcceleration;
                this.#storedVelocity = Math.max(this.#storedVelocity, -MAX_JUMP_VELOCITY);
            }
            
            if (!keyPressed[Keys.Jump] || this.#storedVelocity === -MAX_JUMP_VELOCITY) {
                this.dy = this.#storedVelocity;
                this.isOnGround = false;
                this.#storedVelocity = 0;
            }
        }
        this.y += this.dy * timeStep;
    }

    adjustBoundingBox() {
        this.#boundingBox[BoundingBoxCorners.upLeft] = [this.#x, this.#y];
        this.#boundingBox[BoundingBoxCorners.upRight] = [this.#x + this.#height,this.#y];
        this.#boundingBox[BoundingBoxCorners.downRight] = [this.#x + this.#height, this.#y + this.#height]
        this.#boundingBox[BoundingBoxCorners.downLeft] = [this.#x, this.#y + this.#height];
    }

    duck() {
        //TODO: change sprite;
    }
}

export default Player;