import Keys from './keys';

onkeydown = (event: KeyboardEvent) => {
        let { code } = event;
        if (keyMap.has(code)) {
            let action = keyMap.get(code);
            keyPressed[action!] = true;
        }
    }

onkeyup = (event: KeyboardEvent) => {
    let { code } = event;
    if (keyMap.has(code)) {
        let action = keyMap.get(code);
        keyPressed[action!] = false;
    }
}

export const keyMap = new Map([
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

export const keyPressed: Array<boolean> = [];