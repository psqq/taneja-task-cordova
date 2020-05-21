import App from "./views/App";
import { mount } from 'redom';
import { polyfill } from "mobile-drag-drop";
import { loadState } from './state';

polyfill();

class Game {
    constructor() { }
    init() {
        loadState();
        this.appView = new App();
    }
    start() {
        mount(document.querySelector(".app"), this.appView);
    }
}

const game = new Game();

export default game;
