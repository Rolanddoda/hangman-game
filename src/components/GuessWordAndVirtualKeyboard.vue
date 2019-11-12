<template>
  <div class="guess-word-and-keyboard">
    <div
      class="word-wrapper"
      ref="wordWrapper"
      :class="{ success: isWordSolved, fail: maxErrorsExceeded }"
    >
      <div class="chars">
        <kbd v-for="(char, index) of chars" :key="index">
          {{
            char.hidden && !charsClicked.includes(char.value) ? "_" : char.value
          }}
        </kbd>
      </div>

      <button v-show="isWordSolved || maxErrorsExceeded" @click="startGame">
        New Game
      </button>
    </div>

    <VirtualKeyboard
      :game-ended="isWordSolved || maxErrorsExceeded"
      :disabled-chars="charsClicked"
      @char-pressed="charPressed"
    />

    <ErrorsDisplay :errors-count="errorsCount" :max-errors="maxErrors" />
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
    },

    maxErrorsExceeded() {
      return this.errorsCount > this.maxErrors;
    }
  },

  created() {
    this.startGame();
    this.maxErrors = 8; // here we set max errors to 8 and this property is not reactive
  },

  beforeDestroy() {
    this.$refs.input.removeEventListener("animationend", this.animationEnded);
  },

  methods: {
    startGame() {
      this.word = randomWord().toUpperCase();
      this.errorsCount = 0;
      this.charsClicked = [];
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
@include scaleFaceAnimation();

.guess-word-and-keyboard {
  display: grid;
  gap: 20px;

  .word-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    padding: 10px;
    box-shadow: 0 2px 10px black;

    &.success,
    &.fail {
      padding-left: 40px;

      &::before {
        content: "😀";
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 1.5rem;
        z-index: 1;
        animation: scaleFaceAnimation 0.7s ease-in-out;
      }
    }

    &.fail:before {
      content: "😥";
    }

    &.error {
      animation: 0.8s shakeAnimation ease-in-out forwards;
    }

    > .chars {
      display: grid;
      grid-auto-flow: column;
      justify-content: center;
      gap: 10px;
    }

    > button {
      padding: 8px 15px;
      background: transparent;
      border: none;
      box-shadow: 0 2px 10px black;
      color: inherit;
      outline: none;
      cursor: pointer;

      &:active {
        filter: drop-shadow(0 0 0 steelblue);
        transition: filter 0s;
      }
    }
  }
}
</style>
