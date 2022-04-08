//unordered list where player's guessed letters will appear
const guessedLetters = document.querySelector("ul");

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

const blankWord = function (word) {
    lettersArray = [];
    for (let letter of word) {
        lettersArray.push("●");
    };
    currentWord.innerText = lettersArray.join("");
};

blankWord(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = guessLetter.value;
    console.log(guess);
    guessLetter.value = "";
});



