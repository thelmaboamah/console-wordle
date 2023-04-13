/**
 * create result array originating with 5 Ws
 * create object mapping letters in answer word to array of indexes where they appear
 * loop through guess word
 * if current letter of guess word is a key in the answer counter object,
 * and the length of the index array at the key is > 0,
 *      loop through index array
 *          pop an index off the array
 *          if the answer word and guess word have the same letter at that index,
 *              make that index G in the result array
 *          else
 *              make result array at the current index of the guess word Y because it's in the answer but at the wrong location
 * return join of result array
 *
 * before loop, check if the two words are already equal and
 * return all Gs right away
 *
 * some validations/error check -
 * if length of guess is not 5, throw error
 * if guess includes characters that are not lower case letters (use a regex to check), throw errors
 *  */

export const checkGuess = (guessWord, answerWord) => {
  if (guessWord.length != 5) {
    throw new Error("⛔️ Your guess must be 5 letters long");
  }
  if (/^[a-z]+$/.test(guessWord) == false) {
    throw new Error("⛔️ You must enter a valid string");
  }

  const result = ["W", "W", "W", "W", "W"];
  const map = mapOfWordToLetterIndices(answerWord);

  if (answerWord == guessWord) {
    return "GGGGG";
  }

  for (let i = 0; i < guessWord.length; i++) {
    let guessLetter = guessWord[i];

    if (Object.hasOwn(map, guessLetter) && map[guessLetter].length > 0) {
      let answerLetterIndices = map[guessLetter];

      for (let j = 0; j < answerLetterIndices.length; j++) {
        let gIndex = answerLetterIndices.pop();

        if (guessWord[gIndex] == answerWord[gIndex]) {
          result[gIndex] = "G";
        } else {
          result[i] = "Y";
        }
      }
    }
  }
  return result.join("");
};

const mapOfWordToLetterIndices = (word) => {
  const obj = {};

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (Object.hasOwn(obj, letter)) {
      obj[letter].push(i);
    } else {
      obj[letter] = [i];
    }
  }
  return obj;
};
