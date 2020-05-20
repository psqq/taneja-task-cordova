import App from "./views/App";
import { mount } from 'redom';

class Game {
    constructor() { }
    init() {
        this.appView = new App();
    }
    start() {
        mount(document.querySelector(".app"), this.appView);
    }
}

const game = new Game();

export default game;
