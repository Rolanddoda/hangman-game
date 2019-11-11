export const randomNumber = (start, end) =>
  Math.floor(Math.random() * (end - start + 1) + start);

export const randomIndexesFromWord = (count, word) => {
  const indexes = new Set([]);
  while (indexes.size <= count) {
    indexes.add(randomNumber(0, word.length - 1));
  }
  return Array.from(indexes); // ensure to return Array bc Vue doesn't fully support Set
};
