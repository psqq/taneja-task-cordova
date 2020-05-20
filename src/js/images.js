import { getPathToWww } from './z-modules/utils';


export function loadImage(url) {
    return new Promise((res, rej) => {
        let img = new Image();
        img.onerror = err => rej(err);
        img.onload = () => res(img);
        img.src = url;
    });
}

export function loadAllImages() {
    const promises = [];
    for (let imageName in images) {
        const image = images[imageName];
        promises.push(loadImage(getPathToWww() + image.url).then((img) => {
            image.img = img;
        }));
    }
    return Promise.all(promises);
}

/**
 * @param {string} name 
 * @param {string} url 
 */
function addImage(name, url) {
    return {
        [name]: makeImage(name, url),
    };
}

/**
 * @param {string} url 
 */
function makeImage(url) {
    return {
        name: '',
        url: url || `assets/img/${name}.png`,
        /** @type {HTMLImageElement} */
        img: null,
    };
}

function updateNames() {
    for (let name in images) {
        images[name].name = name;
    }
}

const images = {
};

updateNames();

export default images;
