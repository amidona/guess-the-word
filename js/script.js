//unordered list where player's guessed letters will appear
const guessedList = document.querySelector("ul");

//button with the text "Guess"
const guessButton = document.querySelector(".guess");

//text input where player will guess a letter
const guessLetter = document.querySelector(".letter");

//paragraph where word in progress will appear
const currentWord = document.querySelector(".word-in-progress");

//paragraph showing remaining guesses
const remainingGuesses = document.querySelector(".remaining");

//span showing the number of remaining guesses
const numRemainingGuesses = document.querySelector("span");

//paragraph showing messages when the player guesses a letter
const message = document.querySelector(".message");

//button that shows at the end of the game prompting players to play again
const playAgainButton = document.querySelector(".play-again");

//test word
const word = "magnolia";
//array to hold a player's guessed letters
const guessedLetters = [];

//function to create the circles that stand-in for the word being guessed
const blankWord = function (word) {
    lettersArray = [];
    for (let letter of word) {
        lettersArray.push("●");
    };
    currentWord.innerText = lettersArray.join("");
};

blankWord(word);

//everything that happens when you click the "Guess" button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = guessLetter.value;
    console.log(guess);
    guessLetter.value = "";
    message.innerText = "";
    const validGuess = validate(guess);
    //console.log(validGuess);
    makeGuess(guess);
});

//function to check player's input and make sure it's a single alphabetical letter
const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please add a letter to the box.";
    } else if (input.length > 1) {
        message.innerText = "Please only guess one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please guess a letter A - Z.";
    } else {
        return input;
    }
};

//function to capture the input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter."
    } else {
        guessedLetters.push(guess);
        updateLetters();
        updateWord(guessedLetters);
    }
    console.log(guessedLetters);
};

//function to show the guessed letters on the screen
const updateLetters = function () {
    guessedList.innerHTML = "";
    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedList.append(li);
    };    
};

//function to replace the circles with the correct letter as they're guessed
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealLetter = [];
    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealLetter.push(letter.toUpperCase());
        } else {
            revealLetter.push("●");
        }
    }
    currentWord.innerText = revealLetter.join("");
    checkWin();
};

//function to check if the player has won
const checkWin = function () {
    if (currentWord.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
    }
}
