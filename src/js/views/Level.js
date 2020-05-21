import { el, text } from 'redom';
import classes from '../style';
import EventEmitter from 'eventemitter3';


export default class Level extends EventEmitter {
    constructor(number = 1) {
        super();
        this._number = number;
        this._enabled = true;
        this.el = el("div", [
            this.number = text("" + number),
            this.star = el("span.fa.fa-star"),
        ]);
        this.el.addEventListener('click', () => {
            if (this._enabled) {
                this.emit('click', this._number);
            }
        });
    }
    complete() {
        this.star.classList.add('completed');
    }
    disable() {
        this.el.classList.add('disabled');
        this._enabled = false;
    }
    enable() {
        this.el.classList.remove('disabled');
        this._enabled = true;
    }
}
