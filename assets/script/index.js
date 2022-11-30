import { select, onEvent, hideWelcome, showWelcome, showGame, showWord, showNextWord } from "./utility-functions.js";
import { Score } from './score.js'
import { hackerText } from "./hackercode.js";
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
const randomizedWord = select('.word')
const playerInput = select('.user-input');
const upcomingWord = select('.next-word');
const restartGame = select('.restart');
const scoreBoard = select('.score-board');

window.onload = (event) => {
    gameGui.style.display = "none";
}

// Hides the welcome screen and begins game
onEvent('click', startButton, function() {
    hideWelcome();
    showGame();
    startCountdown();
    setTimeout(showWord, 4000);
    setTimeout(showNextWord, 4000);
    getWord(); // gets a random word from the array
})

// Countdown timer to game start
let timer;
let countDown = 4;

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

// Game timer
let timeOver = false;
let seconds = 30; // set the game's timer here
function gameTimer() {    
    if (seconds < 30) { // also change here for game timer
        timeOutput.innerHTML = seconds;
    }
    if (seconds > 0) {
        seconds--;
    } else {
        clearInterval(timer);
        timeOutput.style.color = 'red';
        timeOver = true;
    }

    if (timeOver) {
        endGame();
    }

    if (!timer) {
        timer = window.setInterval(function() {
            gameTimer();
        }, 1000); // 1000ms
    }
}

// Display word
let nextWord = '';
let currentWord = '';
function getWord() {

    if (randomizedWord.textContent === '') { // called once at the beginning
        getNextWord();
        const randomWordIndex = Math.floor(Math.random() * words.length);
        let outputWord = words[randomWordIndex];
        randomizedWord.innerHTML = outputWord;
        currentWord = outputWord;
    } else { // called for the rest of the game, sets the current word to the next word
        randomizedWord.innerHTML = nextWord;
        currentWord = nextWord;
        upcomingWord.innerHTML = getNextWord();
    }

    return currentWord;
}

function getNextWord() {
    const nextWordIndex = Math.floor(Math.random() * words.length);
    let followingWord = words[nextWordIndex];
    upcomingWord.innerHTML = followingWord;
    nextWord = followingWord;
    return nextWord;
}

playerInput.onkeyup = function() {
    checkWord()
    hackerText();
    console.log(scoreCount);
};

let scoreCount = 0;
function checkWord() {
    let inputWord = playerInput.value.trim();
    if (inputWord == currentWord && inputWord != '') {
        console.log(`Word is same`);
        playerInput.value = '';
        scoreCount++
        getWord();
    }
}

function getDate() {
    // let date = new Date().toLocaleDateString();
    // return date;

    let time = new Date();
    let hh = time.getHours();
    let mm = time.getMinutes();
    return `${hh}:${mm}`;
}

function endGame() {
    playerInput.blur(); // removes focus from the input

    const score = new Score(getDate(), scoreCount, 100);
    if (score.hits < 20) {
        randomizedWord.innerHTML = 'Less than 20? Please, try harder...';
    } else if (score.hits < 40) {
        randomizedWord.innerHTML = 'Couldn\'t get over 40? Close, but no cigar';
    } else if (score.hits < 60) {
        randomizedWord.innerHTML = 'You hacked into the mainframe, but elite cyber security detected';
    } else if (score.hits < 80) {
        randomizedWord.innerHTML = 'You managed to hack into the mainframe undetected!';
    } else if (score.hits >= 100) {
        randomizedWord.innerHTML = 'WOW! You\'re an ELITE hacker <br> why are you here? Go do something useful!';
    }

    let scorePost = document.createElement('p');
    scoreBoard.prepend(scorePost);
    scorePost.innerHTML = `Score: ${score.hits} | Accuracy: ${score.percentage}% | ${score.date}`;
    scorePost.classList.add('score-output');

}

onEvent('click', restartGame, function() {
    // resets game variables
    scoreCount = 0;
    seconds = 30;
    countDown = 4;
    // resets the html
    timeOutput.innerHTML = 'Ready?';
    randomizedWord.style.display = 'none';
    upcomingWord.style.display = 'none';

    // calls the game functions again
    startCountdown();
    setTimeout(showWord, 4000);
    setTimeout(showNextWord, 4000);
    getWord();
});

export { startButton, welcome, gameGui, randomizedWord, upcomingWord };