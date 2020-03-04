// requires
var inquirer = require('inquirer');
var chalk = require('chalk');
// by default if event has more than the 10 emitters leak is assumed
// this program is not producing a memory leak so supress this warning
const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = Infinity;

// variables
var words = ['fanatical', 'uncovered', 'cumbersome', 'quarrelsome', 'uttermost'];
var lives = 10;
var guesses = [];
var displayArr = [];
var correct = [];

console.log(chalk.blue.bold(
    '\n-------------------------------\n' +
    ' W o r d   G u e s s   G a m e \n' +
    '-------------------------------\n'
));

// get a random word from the words array
var word = randWord();

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
    keepPlaying(correct, words, word, lives);
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
    var matches = [];
    for (var i in letters) {
        // check if user guess matches letters in the secret word
        if (guess === letters[i]) {
            // push correct guesses to its spot in the secret word held in the matches array
            matches.push(guess)
            // signal that the user guessed a correct word
            match = true;
            // push guess to global array 'correct' to keep track of how many letters of the secret word have been guessed
            correct.push(guess);
        }
        else {
            // unmatched indexes get a placeholder
            matches.push('_')
        }
    } 
    display(matches)
    // signal that the user made a correct guess
    return match;
}

function display(placeHolder) {
    // pass correctly guessed letters to the placeholder display in their correct spot
    for (var i in placeHolder) {
        // if the passed in array has a correctly guessed letter add it to the display array 
        if (placeHolder[i] !== '_') {
            displayArr[i] = placeHolder[i];
        }
    }
    // display the updated placeholder with revealed letters
    for (var i in displayArr) {
        process.stdout.write(displayArr[i] + ' ');
    }
}

function keepPlaying(correct, words, word, lives) {
    if (lives < 1) {
        console.log(chalk.cyan('You lost, Bummer!'));
        process.exit(0);
    }
    // check if all letters in the secret word are revealed
    else if (correct.length === word.length) {
        // if there are no more secret words, end the game
        if (words.length === 0) {
            console.log(chalk.cyan('              CONGRATULATIONS!'));
            console.log(chalk.cyan('You\'ve revealed the all of the secret words!'));
            process.exit(0);
        }
        // if there are more secret words to guess reset arrays and start game with new word
        else {
            console.log(chalk.cyan('On to the next word!'));
            guesses.splice(0, guesses.length);
            displayArr.splice(0, displayArr.length);
            correct.splice(0, correct.length);
            word = randWord();
            start(word);
        }
    }
    // if not out of words to guess or wrong guesses to make, continue game
    else {
        start(word);
    }
}

function randWord() {
    // get random array index
    let index = Math.floor(Math.random() * (words.length));
    // get a random word from the words array
    word = words[index];
    //display secret word initial placeholder for this round
    for (var i in word) {
        process.stdout.write('_ ')
    }
    console.log('\n\n');
    // remove this rounds secret word from the words array
    words.splice(index, 1);
    // make the word an array of secret word's letters
    wordLetters = word.split('')
    // for every letter in the chosen word push placeholder to the displayArr
    for (var i in wordLetters) {
        displayArr.push('_')
    }
    return wordLetters;
}

// initial call to start the game
start(word);

