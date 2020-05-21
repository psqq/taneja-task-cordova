import { el, text } from 'redom';
import classes from '../style';
import { create, all } from 'mathjs'
import Expression from './Expression';
import EventEmitter from 'eventemitter3';

const mathjs = create(all, {
    number: 'Fraction'
});

export default class Game extends EventEmitter {
    constructor() {
        super();
        this._number = 1;
        this._answer = 45;
        this.el = el("div", {
            class: classes.app,
        },
            [
                this.resetBtn = el("button", {
                }, [
                    text("Reset")
                ]),
                this.backBtn = el("button", {
                }, [
                    text("Back")
                ]),
                el("p", {
                }, [
                    this.youNeedGet = text("You need get " + this._number)
                ]),
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
        this.bindEvents();
        this.updateAnswer();
    }
    bindEvents() {
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
        this.resetBtn.addEventListener('click', () => {
            this.expr.reset();
        });
        this.backBtn.addEventListener('click', () => {
            this.emit("back");
        });
    }
    start(number) {
        this._number = number;
        this.youNeedGet.data = "You need get " + this._number;
        this.expr.reset();
        this.updateAnswer();
    }
    updateAnswer() {
        let val = mathjs.evaluate(this.expr.el.innerText);
        let s = val;
        if (val.d != 1) {
            s = `${val.n} / ${val.d}`;
            s += ' = ' + val;
        }
        this.answer.data = s;
        this._answer = val.s * (val.n / val.d);
        if (this._number === this._answer) {
            this.emit("complete", this._number);
        }
    }
}
