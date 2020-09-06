class Common {
    constructor() {
        let canvas = document.getElementById('canvas');
        canvas.height = 800;
        canvas.width = 800;
        this.ctx = canvas.getContext('2d');
    }
    static get instance() {
        return this._instance;
    }
    get canvas() {
        return Common._instance.ctx.canvas;
    }
    clr() {
        Common._instance.ctx?.clearRect(0, 0, Common._instance.canvas.width, Common._instance.canvas.height);
    }
    resize() {
        Common._instance.ctx.canvas.height = window.innerHeight / 2;
        Common._instance.ctx.canvas.width = window.innerWidth / 2;
    }
}
Common._instance = new Common();
export default Common;
