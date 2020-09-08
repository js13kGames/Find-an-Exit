onkeydown = (event) => {
    let { code } = event;
    if (keyMap.has(code)) {
        let action = keyMap.get(code);
        keyPressed[action] = true;
    }
};
onkeyup = (event) => {
    let { code } = event;
    if (keyMap.has(code)) {
        let action = keyMap.get(code);
        keyPressed[action] = false;
    }
};
export const keyMap = new Map([
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
export const keyPressed = [];
