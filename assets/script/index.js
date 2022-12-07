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
const output = select('.hackercode')

window.onload = (event) => {
    gameGui.style.display = "none";
}

let audio = new Audio('./assets/media/gamemusic.mp3');


// Hides the welcome screen and begins game
onEvent('click', startButton, function() {
    hideWelcome();
    showGame();
    startCountdown();
    setTimeout(showWord, 4000);
    setTimeout(showNextWord, 4000);
    getWord(); // gets a random word from the array
    audio.volume = 0.15;
    audio.play();
})

// Countdown timer to game start

const MAX_COUNTDOWN_SECONDS = 4;
let currentCountdown = MAX_COUNTDOWN_SECONDS;
let countdownInterval;
function startCountdown() {
    clearInterval(countdownInterval);
    currentCountdown = MAX_COUNTDOWN_SECONDS;

    countdownInterval = setInterval(() => {
        
        currentCountdown--;
        timeOutput.innerHTML = currentCountdown;
        
        if (currentCountdown <= 0) {
            timeOutput.innerHTML = 'Go!';
            clearInterval(countdownInterval);
            gameTimer()
        }
    }, 1000)
}

// Game timer
const MAX_GAME_SECONDS = 3; // set the game's timer here
let currentTime = MAX_GAME_SECONDS;
let currentInterval;

function gameTimer() {    
    currentTime = MAX_GAME_SECONDS;

    currentInterval = setInterval(() => {
        
        currentTime--;
        timeOutput.innerHTML = currentTime;
        
        if (currentTime <= 0) {
            timeOutput.style.color = 'red';
            endGame();
            clearInterval(currentInterval);
        }
    }, 1000);
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
};

let scoreCount = 0;
function checkWord() {
    let inputWord = playerInput.value.trim();
    if (inputWord == currentWord && inputWord != '') {
        playerInput.value = '';
        scoreCount++
        getWord();
    }
}

function getDate() {
    let time = new Date();
    let hh = time.getHours();
    let mm = time.getMinutes();
    return `${hh}:${mm}`;
}


// print to scoreboard
let scoreArray = [];
let scoreBoardArray = [];
function getScore() {

    const score = new Score(getDate(), scoreCount, 100);
    scoreArray.push(score);

    let sortedScore = (scoreArray) => {
        return scoreArray.sort((a, b) => {
            return b.hits - a.hits;
        });
    }
    scoreBoardArray = sortedScore(scoreArray);
    // console.log(scoreBoardArray);

    // removes all HTML nodes from scoreboard
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((item) => {
        item.remove();
    })

    let displayScoreBoard = []
    displayScoreBoard = scoreBoardArray;
    

    // loops through array and prints to scoreboard
    for (let i = 0; i < displayScoreBoard.length; i++) {
        let element = document.createElement('p');
        element.classList.add('score-output', 'node');
        element.innerHTML = `Score: ${displayScoreBoard[i].hits} | 
                             Accuracy: ${displayScoreBoard[i].percentage} |
                             ${displayScoreBoard[i].date}`

        scoreBoard.append(element);
    }
    console.log(displayScoreBoard); 

    function saveDataToLocalStorage(data) {
        let array = [];
        array = JSON.parse(localStorage.getItem('playerscores')) || [];
        array.push(data);
        localStorage.setItem('playerscores', JSON.stringify(array));
    }
    saveDataToLocalStorage({
        date: score.date,
        hits: score.hits,
        percentage: score.percentage
    });
}
let jsonParse = JSON.parse(localStorage.getItem('playerscores'));
console.log(jsonParse);
for (const player of jsonParse) {
    console.log(`Score: ${player.hits} | Percentage: ${player.percentage} | ${player.date}`);
}


function endGame() {
    clearInterval(currentInterval);
    upcomingWord.style.display = 'none';
    playerInput.blur(); // removes focus from the input

    getScore();
    // displayScore();

    if (scoreCount < 20) {
        randomizedWord.innerHTML = 'Less than 20? The firewall annihilated you';
    } else if (scoreCount.hits < 40) {
        randomizedWord.innerHTML = 'Couldn\'t get over 40? Close, but no cigar';
    } else if (scoreCount.hits < 60) {
        randomizedWord.innerHTML = 'You hacked into the mainframe, but elite cyber security detected your presence';
    } else if (scoreCount.hits < 80) {
        randomizedWord.innerHTML = 'You managed to hack into the mainframe undetected!';
    } else if (scoreCount.hits >= 100) {
        randomizedWord.innerHTML = 'WOW! You\'re an ELITE hacker <br> why are you here? Go do something useful!';
    }
    audio.pause();
    audio.currentTime = 0;
    scoreCount = 0;
}


onEvent('click', restartGame, function() {
    clearInterval(currentInterval);
    output.innerHTML = '';
    // resets the html
    timeOutput.innerHTML = 'Ready?';
    timeOutput.style.color = 'var(--app-pink)';

    // calls the game functions again
    startCountdown();
    setTimeout(showWord, 4000);
    setTimeout(showNextWord, 4000);
    getWord();
    audio.play();
    scoreCount = 0;
});

export { startButton, welcome, gameGui, randomizedWord, upcomingWord };