import { el, text } from 'redom';
import classes from '../style';
import EventEmitter from 'eventemitter3';


export default class LevelComplete extends EventEmitter {
    constructor(number = 1) {
        super();
        this._number = number;
        this.el = el("div", [
            el("p", "Level completed!"),
            this.gotoLevelsBtn = el("button", {
            }, [
                text("Go to levels")
            ]),
            this.nextBtn = el("button", {
            }, [
                text("Next")
            ]),
        ]);
        this.nextBtn.addEventListener('click', () => {
            this.emit('next');
        });
        this.gotoLevelsBtn.addEventListener('click', () => {
            this.emit('goto-levels');
        });
    }
}
