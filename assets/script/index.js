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
    // hides the game on welcome screen
    gameGui.style.display = "none";

    // checks local storage for playerscores
    let localStorageArray;
    if (localStorage.getItem('playerscores') === null) {
        console.log(`No scores found`);
    } else {
        // get localStorage objects
        localStorageArray = JSON.parse(localStorage.getItem('playerscores'))
        scoreArray.push(...localStorageArray);
        scoreArray.splice(9)
        printToScoreboard(scoreArray);
}
    
}

let audio = new Audio('./assets/media/gamemusic.mp3');

function printToScoreboard(array) {
    for (let i = 0; i < array.length; i++) {
        let element = document.createElement('p');
        element.classList.add('score-output', 'node');
        element.innerHTML = `Score: ${array[i].hits} | 
                             Accuracy: ${array[i].percentage}% |
                             ${array[i].date}`

        scoreBoard.append(element);
    }
}

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
const MAX_GAME_SECONDS = 99; // set the game's timer here
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

// calls the word check function every keyup
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
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hh = date.getHours();
    const mm = date.getMinutes();

    return `${[year, month, day].join('-')} ${hh}:${mm}`;
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

    // removes all HTML nodes from scoreboard
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((item) => {
        item.remove();
    })

    let displayScoreBoard = []
    displayScoreBoard = scoreBoardArray;
    printToScoreboard(displayScoreBoard);

    function saveDataToLocalStorage(data) {
        let array = [];
        array = JSON.parse(localStorage.getItem('playerscores')) || [];
        array.push(data);

        let sortedArray;
        let sortedScore = (array) => {
            return array.sort((a, b) => {
                return b.hits - a.hits;
            });
        }
        // add the array to the global score array
        sortedArray = sortedScore(array);
        
        // cut off array at 9th index
        let newArray = array.slice(0, 9)
        localStorage.setItem('playerscores', JSON.stringify(newArray));
    }
    saveDataToLocalStorage({
        date: score.date,
        hits: score.hits,
        percentage: score.percentage
    });
}

function endGame() {
    clearInterval(currentInterval);
    upcomingWord.style.display = 'none';
    playerInput.blur(); // removes focus from the input

    getScore();

    if (scoreCount >= 100) {
        randomizedWord.innerHTML = `Score: ${scoreCount} | WOW! You're an ELITE hacker <br> why are you here? Go do something useful!`;
    }
    if (scoreCount <= 80) {
        randomizedWord.innerHTML = `Score: ${scoreCount} | You managed to hack into the mainframe undetected!`;
    }
    if (scoreCount <= 60) {
        randomizedWord.innerHTML = `Score: ${scoreCount} | You hacked into the mainframe <br> but elite cyber security detected your presence`;
    } 
    if (scoreCount <= 40) {
        randomizedWord.innerHTML = `Score: ${scoreCount} | Couldn't get over 40? <br> Close, but no cigar`;
    } 
    if (scoreCount <= 20) {
        randomizedWord.innerHTML = `Score: ${scoreCount} | Less than 20? <br> The firewall annihilated you`;
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
