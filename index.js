// requires
var inquirer = require('inquirer');
var chalk = require('chalk');
// variables
var words = ['fanatical', 'uncovered', 'cumbersome', 'quarrelsome', 'uttermost'];
var guessed = false;
var guesses = [];
var lives = 5;
var done = false;

console.log(chalk.blue(
    '\n-------------------------------\n' +
    ' W o r d   G u e s s   G a m e \n' +
    '-------------------------------\n'
));

// get a random word from the words array
var word = randWord();

//display secret word placeholder
for (var i in word) {
    process.stdout.write('_ ')
}
console.log('\n\n');

function start(word) {

    // get user first guess
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
            mainPlay(guess, word);
        })
}

function randWord() {
    word = words[Math.floor(Math.random() * 5)];
    wordLetters = word.split('')
    return wordLetters;
}

function mainPlay(guess, word) {

    //check if user has guessed the letter already
    checkGuess(guess);
    // compare user guess to the secret word
    if (isMatch(wordLetters, guess)) {
        console.log(chalk.green('\n\nGOOD GUESS!'));
    } else {
        lives--;
        console.log(chalk.red('\n\nINCORRECT GUESS!'));
        console.log(chalk.red(`${lives} incorrect guesses remaining`));
    }

   keepPlaying(lives);
}

function checkGuess(guess) {
    let count = 0;
    for (var i in guesses) {
        if (guess === guesses[i]) {
            // if the letter was already guessed remove it from the array so it won't be there more than once
            guesses.splice(i, 1);
            count++
        }
    }
    if (count > 0) {
        console.log(chalk.yellow('\nYou had already guessed that letter'));
    }
    //add the guess to the guesses array
    guesses.push(guess);
}

function isMatch(letters, guess) {
    let count = 0;
    let match = false;
    for (var i in letters) {
        if (letters[i] === guess) {
            process.stdout.write(guess + ' ');
            match = true;
        }
        else {
            process.stdout.write('_ ');
        }
    }
    return match;
}

function keepPlaying(lives){
    
        if (lives = 0) {
            process.exit();
        }
        else {
            start(word);
        }
}





// prompt user to guess a letter DONE
// take in that letter and save it to a variable DONE
// to lowercase the guess DONE
// validate user guess is a letter DONE
// check the letter hasn't been guessed already SORTOF
// call one of the random words to be used for this round DONE
// split the secret word into an array of letters DONE
// loop through the letters and compare the user guess DONE
// for any match found reveal that letter DONE
// if match is not found lose a life DONE
// keep playing until out of lives or word is guessed
start(word);

