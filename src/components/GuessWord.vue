<template>
  <div class="guess-word">
    <kbd v-for="(char, index) of chars" :key="index">{{
      char.hidden ? "_" : char.value
    }}</kbd>
  </div>
</template>

<script>
import randomWord from "random-words";
import { randomNumber, randomIndexesFromWord } from "../utils";

export default {
  data: () => ({
    word: ""
  }),

  computed: {
    chars() {
      const hiddenCharsCount = randomNumber(1, this.word.length - 2);
      const hiddenIndexes = randomIndexesFromWord(hiddenCharsCount, this.word);
      return this.word.split("").map((char, index) => ({
        hidden: hiddenIndexes.includes(index),
        value: char
      }));
    }
  },

  created() {
    this.startGame();
  },

  methods: {
    startGame() {
      this.word = randomWord().toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.guess-word {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 10px;
  padding: 10px 30px;
  transition: all 0.5s ease-in-out;
  box-shadow: 0 2px 10px black;
}
</style>
