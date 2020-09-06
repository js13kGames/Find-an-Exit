import Common from './common.js';
let { instance: { canvas, } } = Common;
class Player {
    constructor(startingPoint) {
        this.dx = 0;
        this.dy = 0;
        this.#height = 20;
        this.#isJumped = false;
        this.isOnGround = true;
        this.#health = 3;
        this.#jumpAcceleration = -3;
        this.#moveAcceleration = 0.3;
        let { x, y } = startingPoint;
        this.#x = x;
        this.#y = y - this.#height;
    }
    #x;
    #y;
    #height;
    #isJumped;
    #health;
    #jumpAcceleration;
    #moveAcceleration;
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
                this.dx *= 0.6;
            }
        }
    }
    startJump() {
        this.dy += this.#jumpAcceleration;
        this.dy = Math.max(this.dy, -12);
    }
    jump() {
        this.isOnGround = false;
    }
    duck() {
        //TODO: change sprite;
    }
}
export default Player;
