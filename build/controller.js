class Controller {
    constructor() {
        this.#keyPressed = [];
        this.#keyMap = new Map([
            ['KeyA', 2 /* Left */],
            ['ArrowLeft', 2 /* Left */],
            ['KeyD', 3 /* Right */],
            ['ArrowRight', 3 /* Right */],
            ['KeyW', 0 /* Jump */],
            ['ArrowUp', 0 /* Jump */],
            ['Space', 0 /* Jump */],
            ['KeyS', 1 /* Crouch */],
            ['ArrowDown', 1 /* Crouch */],
        ]);
        window.addEventListener('keydown', this.keyDownHandler);
        window.addEventListener('keyup', this.keyUpHandler);
    }
    #keyMap;
    #keyPressed;
    get keyPressed() {
        return Controller.instance.#keyPressed;
    }
    static init() {
        Controller.instance = new Controller();
    }
    keyDownHandler(event) {
        let { code } = event;
        let { instance } = Controller;
        if (instance.#keyMap.has(code)) {
            let action = instance.#keyMap.get(code);
            instance.#keyPressed[action] = true;
        }
    }
    keyUpHandler(event) {
        let { code } = event;
        let { instance } = Controller;
        if (instance.#keyMap.has(code)) {
            let action = instance.#keyMap.get(code);
            instance.#keyPressed[action] = false;
        }
    }
}
export default Controller;
