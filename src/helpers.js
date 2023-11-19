// Compare currentGuess entered by user against wordle and return an array of each letter with it's status
export const compareToWordle = (currentGuess, wordle) => {
  const wordleLetters = [...wordle];
  return [...currentGuess].map((letter, i) => {
    // check if letter exists inside wordle if not give it a status of 'wrong'.
    if (wordleLetters.includes(letter)) {
      // Since it exists check if the letter in the same index on both and if so give it a status of 'correct'
      if (wordleLetters[i] === currentGuess[i]) {
        wordleLetters[i] = "_";
        return { letter, status: "correct" };
      } else {
        // Now since the letter exists, but not in the same index.
        // Check if there is the same letter from this index inside currentGuess,
        // if not then give it a status of 'exists'.
        if (_check(wordleLetters, [...currentGuess.slice(i)], letter)) {
          wordleLetters[wordleLetters.indexOf(letter)] = "_";
          return { letter, status: "exists" };
        } else {
          return { letter, status: "wrong" };
        }
      }
    } else {
      return { letter, status: "wrong" };
    }
  });
};

// to solve repeating letters for currentGuess and wordleLetter.
const _check = (wordleLetters, currentGuess, letter) => {
  const currentGuessCount = _occurrences(currentGuess, letter);
  const wordleLettersCount = _occurrences(wordleLetters, letter);
  return currentGuessCount <= wordleLettersCount;
};

const _occurrences = (letters, target) => {
  return letters.reduce((acc, curr) => {
    if (curr === target) return (acc += 1);
    return acc;
  }, 0);
};
