import { welcome, startButton, gameGui, randomizedWord } from "./index.js";

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function hideWelcome() {
    welcome.style.display = 'none';
    startButton.style.display = 'none';
}

function showWelcome() {
    welcome.style.display = 'flex';
    startButton.style.display = 'flex';
}

function showGame() {
    gameGui.style.display = 'flex';
}

function showWord() {
    randomizedWord.style.display = 'flex';
}

export { select, selectAll, onEvent, hideWelcome, showWelcome, showGame, showWord };