
export default class ShowManager {
    /**
     * @param {{[key: string]: Element} | {[key: string]: { el: Element }}} o 
     */
    constructor(o) {
        this.o = o;
    }
    showOnly(name) {
        for (let key in this.o) {
            let el = this.o[key];
            if (!(el instanceof Element)) {
                el = el.el;
            }
            if (name === key) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        }
    }
}
