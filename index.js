import { createInterface } from "readline";
import { getRandomWord } from "./words.js";
import { checkGuess } from "./checkGuess.js";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (msg) => {
  return new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      resolve(userRes);
    });
  });
};

/**
 * Set triesRemaining to 6
 * Initialize guess to undefined
 * Call checkGuess and log results to console
 * while the answer is not GGGGG and tries is > than 0,
 *      Ask user to enter a word and show tries remaining
 *      do try catch, call checkGuess with user input and set answer to the result
 *      decrement tries
 *      log errors to console in catch block
 *
 *
 */

async function playWordle() {
  const TRIES = 6;
  const CORRECT_GUESS = "GGGGG";

  let answerWord;
  let triesRemaining = 6;
  let result;

  try {
    answerWord = getRandomWord();
  } catch (error) {
    console.log(error.message);
    console.log("Great job finishing them all. Goodbye! 👋");
    process.exit(0);
  }

  while (result != CORRECT_GUESS && triesRemaining > 0) {
    let input = await readLineAsync(
      `Enter a guess. You have ${triesRemaining} tries left.\n`
    );
    try {
      result = checkGuess(input, answerWord);
      console.log(result);
      triesRemaining--;
    } catch (error) {
      console.log(error.message);
    }
  }

  if (triesRemaining) {
    console.log(
      `Congrats! 🎉 You guessed the word ${answerWord.toUpperCase()} in ${
        TRIES - triesRemaining
      } tries.\n`
    );
    // check if player wants to play again and call playWordle or exit otherwise
    const playAgain = await readLineAsync(
      "Want to guess another word? Enter y or n."
    );
    // Could do better validation here but going to assume user entered either y or n
    if (playAgain == "y") {
      playWordle();
    } else {
      console.log("Okay, see ya!");
      process.exit(0);
    }
  } else {
    console.log("Sorry, you're out of tries. Run npm start to play again!");
    process.exit(0);
  }
}

playWordle();
