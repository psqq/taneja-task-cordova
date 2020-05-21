import { el, text } from 'redom';
import classes from '../style';
import EventEmitter from 'eventemitter3';
import state from '../state';
import { range } from '../z-modules/utils';
import Level from './Level';


export default class Levels extends EventEmitter {
    constructor() {
        super();
        this.el = el("div", {
            class: classes.levels,
        });
        this.update();
    }
    update() {
        this.el.innerHTML = '';
        for (let i of range(1, state.completedLevels + 3)) {
            const lvl = new Level(i);
            if (i <= state.completedLevels) {
                lvl.complete();
            }
            if (i > state.completedLevels + 1) {
                lvl.disable();
            }
            lvl.on('click', () => {
                this.emit('click-on-level', i);
            });
            this.el.appendChild(lvl.el);
        }
    }
}
