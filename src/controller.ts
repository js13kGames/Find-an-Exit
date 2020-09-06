import Keys from './keys';

class Controller {
    static instance: Controller;
    #keyMap: Map<string, number>
    #keyPressed: Array<boolean> = [];

    private constructor() {
        this.#keyMap = new Map([
            ['KeyA', Keys.Left],
            ['ArrowLeft', Keys.Left],

            ['KeyD', Keys.Right],
            ['ArrowRight', Keys.Right],

            ['KeyW', Keys.Jump],
            ['ArrowUp', Keys.Jump],
            ['Space', Keys.Jump],

            ['KeyS', Keys.Crouch],
            ['ArrowDown', Keys.Crouch],
        ]);
        window.addEventListener('keydown', this.keyDownHandler);
        window.addEventListener('keyup', this.keyUpHandler);
    }

    get keyPressed() {
        return Controller.instance.#keyPressed;
    }

    static init() {
        Controller.instance = new Controller();
    }

    private keyDownHandler(event: KeyboardEvent) {
        let { code } = event;
        let { instance } = Controller;
        if (instance.#keyMap.has(code)) {
            let action = instance.#keyMap.get(code);
            instance.#keyPressed[action!] = true;
        }
    }
    
    private keyUpHandler(event: KeyboardEvent) {
        let { code } = event;
        let { instance } = Controller;
        if (instance.#keyMap.has(code)) {
            let action = instance.#keyMap.get(code);
            instance.#keyPressed[action!] = false;
        }
    }
}

export default Controller;