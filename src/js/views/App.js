import { el, text } from 'redom';
import classes from '../style';
import { create, all } from 'mathjs'
import Expression from './Expression';

const mathjs = create(all, {
    number: 'Fraction'
});

export default class App {
    constructor() {
        this.el = el("div", {
            class: classes.app,
        },
            [
                this.resetBtn = el("button", {
                }, [
                    text("Reset")
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
    }
}
