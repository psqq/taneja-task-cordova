import Victor from 'victor';
import merge from 'lodash/merge';


export default class Camera {
    constructor() {
        this.position = new Victor(0, 0);
        this.size = new Victor(0, 0);
        this.scale = new Victor(1, 1);
        /** @type {HTMLCanvasElement} */
        this.can = null;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = null;
        this.keepRatio = true;
        this.userTransform = {
            left: 0, right: 0,
            top: 0, down: 0,
            width: 0, height: 0,
            center: new Victor(),
        };
        this.clearUserTransform();
        this.changed = true;
        this.restored = false;
    }
    clearUserTransform() {
        for (let k in this.userTransform) {
            this.userTransform[k] = null;
        }
        this.changed = true;
    }
    applyUserTransform() {
        this.changed = true;
        if (this.userTransform.width != null) {
            this.setWidth(this.userTransform.width);
        }
        if (this.userTransform.height != null) {
            this.setHeight(this.userTransform.height);
        }
        if (this.userTransform.center != null) {
            this.position
                .copy(this.size)
                .multiplyScalar(-0.5)
                .add(this.userTransform.center);
        }
        if (this.userTransform.right != null) {
            this.position.x = this.userTransform.right - this.size.x;
        }
        if (this.userTransform.bottom != null) {
            this.position.y = this.userTransform.bottom - this.size.y;
        }
        if (this.userTransform.left != null) {
            this.position.x = this.userTransform.left;
        }
        if (this.userTransform.top != null) {
            this.position.y = this.userTransform.top;
        }
    }
    /**
     * @param {HTMLCanvasElement} can 
     * @param {CanvasRenderingContext2D} ctx 
     */
    setCanvasAndContext(can, ctx) {
        this.can = can;
        this.ctx = ctx;
        this.updateSize();
        return this;
    }
    /**
     * @param {{x: number, y: number}} canvasPos
     */
    getGlobalPosition(canvasPos) {
        const x = this.position.x + this.size.x * canvasPos.x / this.can.width;
        const y = this.position.y + this.size.y * canvasPos.y / this.can.height;
        return new Victor(x, y);
    }
    /**
     * @param {Number} x 
     */
    setWidth(x) {
        if (this.keepRatio) {
            this.userTransform.height = null;
        }
        this.userTransform.width = x;
        this.size.x = x;
        this.scale.x = this.can.width / this.size.x;
        if (this.keepRatio) {
            this.size.y = this.size.x * this.can.height / this.can.width;
            this.scale.y = this.can.height / this.size.y;
        }
        this.changed = true;
        return this;
    }
    /**
     * @param {Number} y 
     */
    setHeight(y) {
        if (this.keepRatio) {
            this.userTransform.width = null;
        }
        this.userTransform.height = y;
        this.size.y = y;
        this.scale.y = this.can.height / this.size.y;
        if (this.keepRatio) {
            this.size.x = this.size.y * this.can.width / this.can.height;
            this.scale.x = this.can.width / this.size.x;
        }
        this.changed = true;
        return this;
    }
    /**
     * @param {Victor} sz
     */
    setSize(sz) {
        this.size.x = sz.x;
        this.scale.x = this.can.width / this.size.x;
        this.size.y = sz.y;
        this.scale.y = this.can.height / this.size.y;
        return this;
    }
    /**
     * @param {number} dScale
     */
    changeScale(dScale) {
        this.scale.x += dScale;
        this.scale.y += dScale;
        this.updateSize();
        return this;
    }
    updateSize() {
        this.size.x = this.can.width / this.scale.x;
        this.size.y = this.can.height / this.scale.y;
        this.applyUserTransform();
        return this;
    }
    /**
     * @param {Victor} pos
     */
    setLeftTopPosition(pos) {
        merge(this.userTransform, {
            left: pos.x, right: null, top: pos.y, bottom: null,
            center: null,
        });
        this.applyUserTransform();
        return this;
    }
    /**
     * @param {Number} left 
     */
    setLeft(left) {
        merge(this.userTransform, {
            left, right: null,
            center: null,
        });
        this.applyUserTransform();
    }
    /**
     * @param {Number} right 
     */
    setRight(right) {
        merge(this.userTransform, {
            right, left: null,
            center: null,
        });
        this.applyUserTransform();
    }
    /**
     * @param {Number} top 
     */
    setTop(top) {
        merge(this.userTransform, {
            top, bottom: null,
            center: null,
        });
        this.applyUserTransform();
    }
    /**
     * @param {Number} bottom 
     */
    setBottom(bottom) {
        merge(this.userTransform, {
            bottom, top: null,
            center: null,
        });
        this.applyUserTransform();
    }
    /**
     * @param {Victor} center
     */
    centerAt(center) {
        merge(this.userTransform, {
            left: null, right: null, top: null, bottom: null,
            center
        });
        this.applyUserTransform();
        return this;
    }
    getCenter() {
        return this.size.clone().multiplyScalar(0.5).add(this.position);
    }
    begin() {
        this.ctx.save();
        this.ctx.translate(-this.position.x * this.scale.x, -this.position.y * this.scale.y);
        this.ctx.scale(this.scale.x, this.scale.y);
    }
    end() {
        this.ctx.restore();
    }
}
