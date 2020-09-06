class Common {
    ctx: CanvasRenderingContext2D | null | undefined;
    static _instance: Common = new Common();

    private constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.height = 800;
        canvas.width = 800;
        this.ctx = canvas.getContext('2d');
    }

    static get instance() {
        return this._instance;
    }

    get canvas() {
        return Common._instance.ctx!.canvas;
    }

    clr() {
        Common._instance.ctx?.clearRect(0, 0, Common._instance.canvas!.width, Common._instance.canvas!.height);
    }

    resize() {
        Common._instance.ctx!.canvas.height = window.innerHeight / 2;
        Common._instance.ctx!.canvas.width = window.innerWidth / 2;
    }
}

export default Common;