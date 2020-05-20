import EventEmmiter from 'eventemitter3';


class Controller extends EventEmmiter {
    constructor() {
        super();
    }
    init() {
    }
}

const controller = new Controller();

export default controller;
