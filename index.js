import { createInterface } from "readline";
import { getRandomWord } from "./words.js";
import { checkGuess } from "./checkGuess2.js";

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

async function playWordle() {
  const TRIES = 6;
  const CORRECT_GUESS = "GGGGG";

  let answerWord;
  let triesRemaining = TRIES;
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
      `Enter a guess. You have ${triesRemaining} ${
        triesRemaining > 1 ? "tries" : "try"
      } left.\n`
    );
    input = input.toLowerCase();
    try {
      result = checkGuess(input, answerWord);
      console.log(result);
      triesRemaining--;
    } catch (error) {
      console.log(error.message);
    }
  }

  if (result == CORRECT_GUESS) {
    const totalTries = TRIES - triesRemaining;
    console.log(
      `Congrats! 🎉 You guessed the word ${answerWord.toUpperCase()} in ${totalTries} ${
        totalTries > 1 ? "tries" : "try"
      }.\n`
    );
    // check if player wants to play again and call playWordle or exit otherwise
    const playAgain = await readLineAsync(
      "Want to guess another word? Enter y or n: "
    );
    // Could do better validation here but going to assume user entered either y or n
    if (playAgain == "y") {
      playWordle();
    } else {
      console.log("Okay, thanks for playing! 👋");
      process.exit(0);
    }
  } else {
    console.log(
      `Sorry, you're out of tries. The word was ${answerWord.toUpperCase()}.\nRun npm start to play again!`
    );
    process.exit(0);
  }
}

console.log("Welcome to my console wordle game! 👋 LET'S START!");
playWordle();
