//unordered list where player's guessed letters will appear
const guessedLetters = document.querySelector("ul");

//button with the text "Guess"
const guessButton = document.querySelector(".guess");

//text input where player will guess a letter
const guessBox = document.querySelector(".guess-form");

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

const circle = function () {
    //creates an array of the individual letters of the word
    const letters = word.split("");
};

circle(word);



