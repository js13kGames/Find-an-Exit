import { MAX_JUMP_VELOCITY, TILE_SIZE } from './constants.js';
import { keyPressed } from './controller.js';
import BoundingBoxCorners from './bounding_box_corners.js';
class Player {
    constructor(startingPoint) {
        this.dx = 0;
        this.dy = 0;
        this.#storedVelocity = 0;
        this.#height = TILE_SIZE;
        this.#isJumped = false;
        this.isOnGround = true;
        this.#health = 3;
        this.#jumpAcceleration = -1;
        this.#moveAcceleration = 0.3;
        this.#boundingBox = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        let { x, y } = startingPoint;
        this.#x = x;
        this.#y = y;
        this.adjustBoundingBox();
    }
    #x;
    #y;
    #storedVelocity;
    #height;
    #isJumped;
    #health;
    #jumpAcceleration;
    #moveAcceleration;
    #boundingBox;
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
    move(action) {
        switch (action) {
            case "right": {
                this.dx += this.#moveAcceleration;
                break;
            }
            case "left": {
                this.dx += -this.#moveAcceleration;
                break;
            }
            default: {
                this.dx *= 0.4;
            }
        }
    }
    jump() {
        if (this.isOnGround) {
            if (keyPressed[0 /* Jump */]) {
                this.#storedVelocity += this.#jumpAcceleration;
                this.#storedVelocity = Math.max(this.#storedVelocity, -MAX_JUMP_VELOCITY);
            }
            else {
                this.dy = this.#storedVelocity;
                this.isOnGround = false;
                this.#storedVelocity = 0;
            }
        }
    }
    adjustBoundingBox() {
        this.#boundingBox[BoundingBoxCorners.upLeft] = [this.#x, this.#y];
        this.#boundingBox[BoundingBoxCorners.upRight] = [this.#x + this.#height, this.#y];
        this.#boundingBox[BoundingBoxCorners.downRight] = [this.#x + this.#height, this.#y + this.#height];
        this.#boundingBox[BoundingBoxCorners.downLeft] = [this.#x, this.#y + this.#height];
    }
    duck() {
        //TODO: change sprite;
    }
}
export default Player;
