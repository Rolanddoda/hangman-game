<template>
  <div class="guess-word-and-keyboard">
    <div
      class="word-wrapper"
      ref="wordWrapper"
      :class="{ success: isWordSolved, fail: maxErrorsExceeded }"
    >
      <DisplayWordChars :chars="chars" :chars-clicked="charsClicked" />

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
    <PcFindWord @click="letPcToFindWord" />
    <LetPcGuessWord @pc-guess-word="$emit('pc-mode')" />
  </div>
</template>

<script>
import randomWord from "random-words";
import {
  randomNumber,
  randomIndexesFromWord,
  wordContainsArrayOfChars
} from "../utils";
import { playSound, stopSound } from "./GameSounds";
// Components
import VirtualKeyboard from "./VirtualKeyboard";
import ErrorsDisplay from "./ErrorsDisplay";
import PcFindWord from "./PcFindWord";
import LetPcGuessWord from "./LetPcGuessWord";
import DisplayWordChars from "./DisplayWordChars";

export default {
  components: {
    VirtualKeyboard,
    ErrorsDisplay,
    PcFindWord,
    LetPcGuessWord,
    DisplayWordChars
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

  watch: {
    errorsCount(val) {
      this.$emit("errors-count-changed", val);
    },

    isWordSolved(val) {
      val && playSound("won");
    },

    maxErrorsExceeded(val) {
      val && playSound("lost");
    }
  },

  created() {
    this.startGame();
    this.maxErrors = 8; // here we set max errors to 8 and this property is not reactive
  },

  beforeDestroy() {
    this.$refs.wordWrapper.removeEventListener(
      "animationend",
      this.animationEnded
    );
    stopSound("lost");
    stopSound("won");
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
        playSound("wrong");
      } else playSound("correct");
      this.charsClicked.push(char);
    },

    triggerError() {
      const el = this.$refs.wordWrapper;
      el.classList.add("error");
      el.addEventListener("animationend", this.animationEnded);
    },

    animationEnded() {
      this.$refs.wordWrapper.classList.remove("error");
    },

    letPcToFindWord() {
      this.hiddenChars.forEach(char => this.charsClicked.push(char));
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
