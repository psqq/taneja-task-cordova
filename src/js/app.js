import game from './game';
import { loadAllImages } from './images';


const app = {
    cordova: true,
    main() {
        if (this.cordova) {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        } else {
            this.onDeviceReady();
        }
    },
    async onDeviceReady() {
        await this.preload();
        await this.init();
        await this.run();
    },
    async preload() {
        await loadAllImages();
    },
    async init() {
        game.init();
    },
    async run() {
        game.start();
    },
};


export default app;
