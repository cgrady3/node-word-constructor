var inquirer = require('inquirer');
var words = require('./rand_words');
var guessed = false;

var prompt = {
    type: 'input',
    name: 'guess',
    message: "Enter a letter to guess"
};


function start() {
    inquirer
        .prompt(prompt)
        .then(answers => {
            guess = (answers.guess).toLowerCase();
            
        })
}

  // prompt user to guess a letter DONE
  // take in that letter and save it to a variable DONE
  // to lowercase the guess DONE
  // validate user guess is in the alphabet array
  // change the guessed value of that letter to true
  // call one of the random words to be used for this round
  // split the secret word into an array of letters
  // loop through the letters and compare the user guess
  // for any match found reveal that letter
  // if match is not found lose a life
  start();