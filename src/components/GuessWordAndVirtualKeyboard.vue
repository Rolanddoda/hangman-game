<template>
  <div class="guess-word-and-keyboard">
    <div class="word-wrapper" ref="wordWrapper">
      <kbd v-for="(char, index) of chars" :key="index">
        {{
          char.hidden && !charsClicked.includes(char.value) ? "_" : char.value
        }}
      </kbd>
    </div>

    <VirtualKeyboard
      :game-ended="isWordSolved"
      :disabled-chars="charsClicked"
      @char-pressed="charPressed"
    />

    <ErrorsDisplay :errors-count="errorsCount" />
  </div>
</template>

<script>
import randomWord from "random-words";
import {
  randomNumber,
  randomIndexesFromWord,
  wordContainsArrayOfChars
} from "../utils";
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
    },

    isWordSolved() {
      return wordContainsArrayOfChars(
        this.charsClicked.join(),
        this.hiddenChars
      );
    }
  },

  created() {
    this.startGame();
  },

  beforeDestroy() {
    this.$refs.input.removeEventListener("animationend", this.animationEnded);
  },

  methods: {
    startGame() {
      this.word = randomWord().toUpperCase();
    },

    charPressed(char) {
      if (!this.hiddenChars.includes(char)) {
        this.errorsCount++;
        this.triggerError();
      }
      this.charsClicked.push(char);
    },

    triggerError() {
      const el = this.$refs.wordWrapper;
      el.classList.add("error");
      el.addEventListener("animationend", this.animationEnded);
    },

    animationEnded() {
      this.$refs.wordWrapper.classList.remove("error");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/sass/mixins";

@include shakeAnimation();

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

    &.error {
      animation: 0.8s shakeAnimation ease-in-out forwards;
    }
  }
}
</style>
