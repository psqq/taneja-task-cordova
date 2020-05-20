import { el, text } from 'redom';
import classes from '../style';
import { range } from '../z-modules/utils';
import EventEmitter from 'eventemitter3';


export default class Expression extends EventEmitter {
    constructor() {
        super();
        this.el = el("div");
        this.n = 9;
        this.nums = [];
        this.ops = [];
        for (let i of range(1, this.n + 1)) {
            const num = el("span", "" + i);
            this.nums.push(num);
            this.el.appendChild(num);
            if (i == this.n) {
                break;
            }
            const op = el("span", {
                class: classes.op,
            },
                [
                    text("+")
                ]
            );
            this.ops.push(op);
            this.el.appendChild(op);
        }
        this.ops.forEach(el => {
            el.addEventListener('dragenter', ev => {
                ev.preventDefault();
            });
            el.addEventListener('dragover', ev => {
                ev.preventDefault();
            });
            el.addEventListener('drop', ev => {
                const op = ev.dataTransfer.getData('op');
                if (op && el.innerText != op) {
                    el.innerText = op;
                    this.emit("changed");
                }
            });
        });
    }
    reset() {
        this.ops.forEach(el => {
            el.innerText = '+';
        });
        this.emit("changed");
    }
}
