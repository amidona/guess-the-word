//unordered list where player's guessed letters will appear
const guessedList = document.querySelector("ul");
//button with the text "Guess"
const guessButton = document.querySelector(".guess");
//text input where player will guess a letter
const guessLetter = document.querySelector(".letter");
//paragraph where word in progress will appear
const currentWord = document.querySelector(".word-in-progress");
//paragraph showing remaining guesses
const remainingGuessesPara = document.querySelector(".remaining");
//span showing the number of remaining guesses
const numRemainingGuesses = document.querySelector("span");
//paragraph showing messages when the player guesses a letter
const message = document.querySelector(".message");
//button that shows at the end of the game prompting players to play again
const playAgainButton = document.querySelector(".play-again");

//test word
let word = "magnolia";
//array to hold a player's guessed letters
const guessedLetters = [];
//global variable for number of guesses
let remainingGuesses = 8;

const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await request.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    blankWord(word);
};

getWord();

//function to create the circles that stand-in for the word being guessed
const blankWord = function (word) {
    const lettersArray = [];
    for (const letter of word) {
        lettersArray.push("●");
    };
    currentWord.innerText = lettersArray.join("");
};

//everything that happens when you click the "Guess" button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = guessLetter.value;
    console.log(guess);
    guessLetter.value = "";
    const validGuess = validate(guess);
    if (validGuess) {
        makeGuess(guess);
    };
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
        countGuesses(guess);
        updateWord(guessedLetters);
    }
    console.log(guessedLetters);
};

//function to show the guessed letters on the screen
const updateLetters = function () {
    guessedList.innerHTML = "";
    for (const letter of guessedLetters) {
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
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealLetter.push(letter.toUpperCase());
        } else {
            revealLetter.push("●");
        }
    }
    currentWord.innerText = revealLetter.join("");
    checkWin();
};

const countGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = "Congrats! That's one of the letters.";
    } else {
        message.innerText = "Sorry, that letter's not in this word.";
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        remainingGuessesPara.innerText = `Game over. Better luck next time! The word was ${word.toUpperCase()}`;
        guessButton.classList.add("hide");
    } else if (remainingGuesses === 1) {
        numRemainingGuesses.innerText = `1 guess`;
    } else {
        numRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    }
}

//function to check if the player has won
const checkWin = function () {
    if (currentWord.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        guessButton.classList.add("hide");
    }
}