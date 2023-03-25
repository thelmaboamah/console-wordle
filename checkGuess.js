/**
 * create result array originating with 5 Ws
 * create object mapping letters in answer word to number of times they appear
 * loop through guess word
 * if current letter of guess word is a key in the answer counter object,
 * and the value of the key is > 0,
 *      if the letter at the current index of the guess word loop are the same
 *      for the guess word and the answer word, then change the value at that index
 *      to green in result array,
 *      else change the value at that index to yellow
 *      decrement the value at that key inside of the counter object
 * return join of result array
 *
 * before loop, check if the two words are already equal and
 * return all Gs right away
 *
 * some validations/error check -
 * if length of guess is not 5, throw error
 * if guess not a string, throw error
 * if guess includes characters that are not lower case letters (use a regex to check), throw errors
 *  */

export const checkGuess = (guessWord, answerWord) => {
  if (typeof guessWord != "string") {
    throw new Error("Please provide a string");
  }
  if (guessWord.length != 5) {
    throw new Error("Your guess must be 5 letters long");
  }
  if (/^[a-z]+$/.test(guessWord) == false) {
    throw new Error("You must enter a valid, lower case string");
  }

  const result = ["W", "W", "W", "W", "W"];
  const counter = createLetterCounter(answerWord);

  if (answerWord == guessWord) {
    return "GGGGG";
  }

  for (let i = 0; i < guessWord.length; i++) {
    let letter = guessWord[i];
    if (Object.hasOwn(counter, letter) && counter[letter] > 0) {
      if (letter == answerWord[i]) {
        result[i] = "G";
      } else {
        result[i] = "Y";
      }
      counter[letter]--;
    }
  }
  return result.join("");
};

const createLetterCounter = (word) => {
  // considered validating this input but since answer not a
  // user provided input, it's perhaps OK to skip that
  const letterCounter = {};
  for (let letter of word) {
    if (Object.hasOwn(letterCounter, letter)) {
      letterCounter[letter]++;
    } else {
      letterCounter[letter] = 1;
    }
  }
  return letterCounter;
};
