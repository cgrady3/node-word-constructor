// requires
var inquirer = require('inquirer');
var chalk = require('chalk');
// by default if event has more than the 10 emitters leak is assumed
// this program is not producing a memory leak so supress this warning
const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = Infinity;

// variables
var words = ['fanatical', 'uncovered', 'cumbersome', 'quarrelsome', 'uttermost'];
var guessed = false;
var guesses = [];
var displayArr = [];
var lives = 5;
var done = false;
var correct = 0;

console.log(chalk.blue.bold(
    '\n-------------------------------\n' +
    ' W o r d   G u e s s   G a m e \n' +
    '-------------------------------\n'
));

// get a random word from the words array
var word = randWord();

//display secret word initial placeholder
for (var i in word) {
    process.stdout.write('_ ')
}
console.log('\n\n');

function start(word) {
    // get user guess
    inquirer
        .prompt({
            name: 'guess',
            message: "Enter a letter to guess",
            // validate that the user has entered a letter or hyphen
            validate: function (input) {
                return /^[a-zA-Z-]$/.test(input);
            }
        })
        .then(answers => {
            // store the user guess as a lowercase letter
            guess = (answers.guess).toLowerCase();
            // pass the user guess and secret word to the mainPlay function
            mainPlay(word, guess);
        })
}

function mainPlay(word, guess) {

    // secret word display
    //check if user has guessed the letter already
    if (isRepeat(guess)) {
        console.log(chalk.yellow('\n\nYou had already guessed that letter\n'));
    }
    // compare user guess to the secret word
    else if (isMatch(word, guess)) {
        console.log(chalk.green('\n\nGOOD GUESS!\n'));
    }
    else {
        lives--;
        console.log(chalk.red('\n\nINCORRECT GUESS!\n'));
        console.log(chalk.red(`${lives} incorrect guesses remaining\n`));
    }
    // passing in correct from the global variable updated by isMatch function
    keepPlaying(correct, word, lives);
}

function isRepeat(guess) {
    let count = 0;
    for (var i in guesses) {
        if (guess === guesses[i]) {
            // if the letter was already guessed remove it from the array so it won't be there more than once
            guesses.splice(i, 1);
            count++
        }
    }
    //add the guess to the guesses array
    guesses.push(guess);
    // return true if letter was already guessed else return false
    if (count > 0) {
        return true;
    }
    else {
        return false;
    }
}

function isMatch(letters, guess) {
    let count = 0;
    let match = false;
    let matches = [];
    for (var i in letters) {
        if (letters[i] === guess) {
            matches.push(guess)
            match = true;
            correct++
        }
        else {
            matches.push('_')
        }
    }
    display(matches)
    return match;
}

function display(placeHolder) {
    for (var i in placeHolder) {
        if (placeHolder[i] !== '_') {
            displayArr[i] = placeHolder[i];
        }
    }

    for (var i in displayArr){
    process.stdout.write(displayArr[i] + ' ');
    }
}

function keepPlaying(correct, word, lives) {
    if (lives < 1) {
        console.log(chalk.cyan('You lost, Bummer!'));
        process.exit(0);
    }
    else if (correct === word.length){
        console.log(chalk.cyan('You\'ve revealed the secret word!'));
        process.exit(0);
    }
    else {
        start(word);
    }
}

function randWord() {
    // get a random word from the words array
    word = words[Math.floor(Math.random() * (words.length))];
    // make the word an array of its letters
    wordLetters = word.split('')
    // for every letter in the chosen word push placeholder to the displayArr
    for (var i in wordLetters) {
        displayArr.push('_')
    }
    return wordLetters;
}

start(word);

