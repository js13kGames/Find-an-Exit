import { GRAVITY } from './constants.js';
import Common from './common.js';

let {
    instance: {
        canvas,
    }
} = Common;

class Player {
    #x: number;
    #y: number;
    dx: number = 0;
    dy: number = 0;
    #height: number = 20;
    #isJumped: boolean = false;
    isOnGround: boolean = true;
    #health: number = 3;
    #jumpAcceleration = -3;
    #moveAcceleration = 0.3;

    constructor(startingPoint: { x: number, y: number }) {
        let { x, y } = startingPoint;
        this.#x = x;
        this.#y = y - this.#height;
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

    move(action: string) : void {
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
                this.dx *= 0.6;
            }
        }
    }

    startJump() : void {
        this.dy += this.#jumpAcceleration;
        this.dy = Math.max(this.dy, -12);
    }
    
    jump() : void {
        this.isOnGround = false;
    }

    duck() {
        //TODO: change sprite;
    }
}

export default Player;