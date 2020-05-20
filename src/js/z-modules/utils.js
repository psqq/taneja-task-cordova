
export function isPortrait(force = false) {
    if (force && window.innerWidth < window.innerHeight) {
        return true;
    }
    return screen.orientation.type === 'portrait' || screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary';
}

export function getPathToWww() {
    if (device.platform == "Android") {
        return "file:///android_asset/www/";
    } else if (device.platform == "browser") {
        return "/";
    } else {
        return "/";
    }
}

export async function waitPortrait(maxDelay = 1000) {
    const time = performance.now();
    return new Promise((res, rej) => {
        const go = () => {
            if (performance.now() - time > maxDelay) {
                return rej();
            }
            if (isPortrait(true)) {
                setTimeout(go, 300);
            } else {
                return res();
            }
        };
        setTimeout(go, 300);
    });
}

export function dist(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function* range(a = 0, b = null) {
    if (b == null) {
        b = a;
        a = 0;
    }
    for (var i = a; i < b; i++) {
        yield i;
    }
}

/**
 * @param {new (...arg: any) => T} Class
 * @param {(obj: T) => T} cb
 * @template T
 */
export function make(Class, cb) {
    let obj = new Class();
    return doWith(obj, cb);
}

/**
 * @param {T} obj
 * @param {(obj: T) => T} cb
 * @template T
 */
export function doWith(obj, cb) {
    if (cb) cb(obj);
    return obj;
}

export function positionInArea(pos, area) {
    return area.left <= pos.x && pos.x <= area.right
        && area.top <= pos.y && pos.y <= area.bottom;
}
