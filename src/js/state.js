import config from "./config";

const initialState = {
    completedLevels: 0,
};

let state = {
    ...initialState,
};

export function saveState() {
    const key = `${config.appName}-${config.version}-state`;
    localStorage.setItem(key, JSON.stringify(state));
}

export function loadState() {
    const key = `${config.appName}-${config.version}-state`;
    const stateStr = localStorage.getItem(key);
    state = JSON.parse(stateStr);
}

export default state;
