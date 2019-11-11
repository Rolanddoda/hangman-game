<template>
  <div class="guess-word-and-keyboard">
    <div class="word-wrapper">
      <kbd v-for="(char, index) of chars" :key="index">
        {{
          char.hidden && !charsClicked.includes(char.value) ? "_" : char.value
        }}
      </kbd>
    </div>

    <VirtualKeyboard
      @char-pressed="charPressed"
      :disabled-chars="charsClicked"
    />

    <ErrorsDisplay :errors-count="errorsCount" />
  </div>
</template>

<script>
import randomWord from "random-words";
import { randomNumber, randomIndexesFromWord } from "../utils";
// Components
import VirtualKeyboard from "./VirtualKeyboard";
import ErrorsDisplay from "./ErrorsDisplay";

export default {
  components: {
    VirtualKeyboard,
    ErrorsDisplay
  },

  data: () => ({
    word: "",
    charsClicked: [],
    errorsCount: 0
  }),

  computed: {
    chars() {
      const hiddenCharsCount = randomNumber(1, this.word.length - 2);
      const hiddenIndexes = randomIndexesFromWord(hiddenCharsCount, this.word);
      return this.word.split("").map((char, index) => ({
        hidden: hiddenIndexes.includes(index),
        value: char
      }));
    },

    hiddenChars() {
      return this.chars.filter(char => char.hidden).map(char => char.value);
    }
  },

  created() {
    this.startGame();
  },

  methods: {
    startGame() {
      this.word = randomWord().toUpperCase();
    },

    charPressed(char) {
      if (!this.hiddenChars.includes(char)) this.errorsCount++;
      this.charsClicked.push(char);
    }
  }
};
</script>

<style lang="scss" scoped>
.guess-word-and-keyboard {
  display: grid;
  gap: 20px;

  .word-wrapper {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    gap: 10px;
    padding: 10px 30px;
    transition: all 0.5s ease-in-out;
    box-shadow: 0 2px 10px black;
  }
}
</style>
