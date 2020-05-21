import { el, text } from 'redom';
import classes from '../style';
import Game from './Game';
import Levels from './Levels';
import ShowManager from '../z-classes/show-manager';
import LevelComplete from './LevelComplete';
import state, { saveState } from '../state';

export default class App {
    constructor() {
        this.el = el("div", {
            class: classes.app,
        },
            [
                this.game = new Game(),
                this.levels = new Levels(),
                this.levelComplete = new LevelComplete(),
            ]
        );
        this.showManager = new ShowManager({
            game: this.game,
            levels: this.levels,
            levelComplete: this.levelComplete,
        });
        this.showLevels();
        this.bindEvents();
    }
    bindEvents() {
        this.levels.on('click-on-level', number => {
            this.startGame(number);
        });
        this.game.on("back", () => {
            this.showLevels();
        });
        this.game.on("complete", number => {
            state.completedLevels = Math.max(state.completedLevels, number);
            saveState();
            this.showManager.showOnly('levelComplete');
        });
        this.levelComplete.on("goto-levels", () => {
            this.showLevels();
        });
        this.levelComplete.on("next", () => {
            this.startGame(state.completedLevels + 1);
        });
    }
    startGame(number) {
        this.showManager.showOnly('game');
        this.game.start(number);
    }
    showLevels() {
        this.levels.update();
        this.showManager.showOnly('levels');
    }
}
