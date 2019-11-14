export const randomNumber = (start, end) =>
  Math.floor(Math.random() * (end - start + 1) + start);

export const randomIndexesFromWord = (count, word) => {
  const indexes = new Set([]);
  while (indexes.size <= count) {
    indexes.add(randomNumber(0, word.length - 1));
  }
  return Array.from(indexes); // ensure to return Array bc Vue doesn't fully support Set
};

export const wordContainsArrayOfChars = (word, arrayOfChars) => {
  return arrayOfChars.every(char => word.includes(char));
};

export const getKeyboardChars = (commonlyOccur = false) => {
  const chars = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M"
  ];
  if (!commonlyOccur) return chars;
  const commonChars = ["E", "T", "A", "O", "I", "N", "S"];
  const unique = new Set([...commonChars, ...chars]);
  return Array.from(unique);
};

export const sleep = ms => new Promise(res => setTimeout(res, ms));
