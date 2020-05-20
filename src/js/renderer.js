import { el, mount, list, text } from 'redom';
import classes from './style';
import { range } from './z-modules/utils';
import EventEmitter from 'eventemitter3';

class Expression extends EventEmitter {
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
    update(data) { }
}

class App {
    constructor() {
        this.el = el("div", {
            class: classes.app,
        },
            [
                this.expr = new Expression(),
                el("div", {
                    class: classes.answer,
                }, [
                    this.answer = text("6")
                ]),
                el("div", {
                    class: classes.operations,
                }, this.operations = [
                    el("span", {
                        draggable: true,
                    },
                        [
                            text("+")
                        ]),
                    el("span", {
                        draggable: true,
                    },
                        [
                            text("-")
                        ]),
                    el("span", {
                        draggable: true,
                    },
                        [
                            text("*")
                        ]),
                    el("span", {
                        draggable: true,
                    },
                        [
                            text("/")
                        ]),
                ]),
            ],
        );
        this.operations.forEach(el => {
            el.addEventListener('dragstart', ev => {
                ev.dataTransfer.setData(
                    'op',
                    el.innerText.trim(),
                );
            });
        });
        this.expr.on("changed", () => {
            this.updateAnswer();
        });
        this.updateAnswer();
    }
    updateAnswer() {
        this.answer.data = eval(this.expr.el.innerText);
    }
}

class Renderer {
    constructor() {
    }
    init() {
        this.appEl = document.querySelector('.app');
    }
    mountApp() {
        mount(this.appEl, new App());
    }
}

const renderer = new Renderer();

export default renderer;
