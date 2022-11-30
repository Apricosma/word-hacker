import { select, onEvent, hideWelcome, showWelcome, showGame, selectAll } from "./utility-functions.js";
import { Score } from './score.js'
'use strict';

// Words

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];


// Selectors
const startButton = select('.start-game');
const welcome = select('.welcome');
const gameGui = select('.game');
const timeOutput = select('.timer');

window.onload = (event) => {
    gameGui.style.display = "none";
}
// Hides the welcome screen and begins game
onEvent('click', startButton, function() {
    hideWelcome();
    showGame();
    startCountdown();
})



let timer;
let countDown = 4;
let seconds = 99;

function startCountdown() {
    if (countDown < 4) {
        timeOutput.innerHTML = countDown;
    }
    if (countDown > 0) {
        countDown--;
    } else {
        timeOutput.innerHTML = 'Go!';
        gameTimer(); // calls the game timer
    }

    if (!timer) {
        timer = window.setInterval(function() {
            startCountdown();
        }, 1000); // 1000ms
    }
}

function gameTimer() {    
    if (seconds < 99) {
        timeOutput.innerHTML = seconds;
    }
    if (seconds > 0) {
        seconds--;
    } else {
        clearInterval(timer);
        timeOutput.style.color = 'red';
    }

    if (!timer) {
        timer = window.setInterval(function() {
            gameTimer();
        }, 1000); // 1000ms
    }
}

export { startButton, welcome, gameGui };