import EventEmmiter from 'eventemitter3';


export default class Canvas extends EventEmmiter {
    constructor() {
        super();
        this.el = document.createElement("canvas");
    }
    makeFullscreen() {
        const can = this.el;
        can.width = window.innerWidth;
        can.height = window.innerHeight;
        this.emit("resize");
    }
    makeAlwaysFullscreen() {
        this.makeFullscreen();
        window.addEventListener('resize', () => {
            this.makeFullscreen();
        });
    }
}
