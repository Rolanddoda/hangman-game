<template>
  <div class="guess-word-and-keyboard">
    <div
      class="word-wrapper"
      ref="wordWrapper"
      :class="{ success: isWordSolved, fail: maxErrorsExceeded }"
    >
      <DisplayWordChars
        ref="charsDisplay"
        :chars="chars"
        :chars-clicked="charsClicked"
      />

      <button v-show="isWordSolved || maxErrorsExceeded" @click="startNewGame">
        New Game
      </button>
    </div>

    <VirtualKeyboard computer-mode :disabled-chars="charsClicked" />

    <ErrorsDisplay :errors-count="errorsCount" :max-errors="maxErrors" />
  </div>
</template>

<script>
import { getKeyboardChars, wordContainsArrayOfChars, sleep } from "@/utils";
import words from "an-array-of-english-words";
import { stopSound, playSound } from "@/shared/GameSounds";
// Components
import DisplayWordChars from "@/shared/DisplayWordChars";
import VirtualKeyboard from "@/shared/VirtualKeyboard";
import ErrorsDisplay from "@/shared/ErrorsDisplay";

export default {
  components: {
    DisplayWordChars,
    VirtualKeyboard,
    ErrorsDisplay
  },

  props: {
    chars: Array
  },

  data: () => ({
    charsClicked: [],
    errorsCount: 0,
    triesCount: 0,
    timeOut: null
  }),

  computed: {
    hiddenChars() {
      return this.chars.filter(char => char.hidden).map(char => char.value);
    },

    maxErrorsExceeded() {
      return this.errorsCount > this.maxErrors;
    },

    isWordSolved() {
      return wordContainsArrayOfChars(
        this.charsClicked.join(),
        this.hiddenChars
      );
    },

    guesses() {
      return Array.from({ length: 26 }, () => () => this.guessChar());
    },

    getComputerToPlay() {
      return () => {
        requestAnimationFrame(() => {
          this.guesses[this.triesCount]();
        });
      };
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
    this.guessChar();
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
    async guessChar() {
      await sleep(2000);
      if (!this.$refs.charsDisplay) return; // component is destroyed but code gets executed
      const guessedChar = this.getNextChar();
      this.charPressed(guessedChar);
      this.triesCount++;
      if (!this.maxErrorsExceeded && !this.isWordSolved) {
        this.getComputerToPlay();
      }
    },

    getNextChar() {
      const keyboardChars = this.getProbableChars();
      const notClickedChars = keyboardChars.filter(
        char => !this.charsClicked.includes(char)
      );
      return notClickedChars[0];
    },

    getProbableChars() {
      const charsNotFoundCount = this.getCharsNotFoundCount();
      if (charsNotFoundCount > 2) return getKeyboardChars(true);
      return this.bestMatches();
    },

    bestMatches() {
      const allChars = this.$refs.charsDisplay.getChars();
      const charAndIndex = allChars.reduce((acc, char, index) => {
        if (char !== "_") acc.push({ index, char });
        return acc;
      }, []);
      const wordsWithSameLength = words.filter(
        word => word.length === allChars.length
      );
      const possibleWords = wordsWithSameLength.filter(word => {
        return charAndIndex.every(
          char => word[char.index] === char.char.toLowerCase()
        );
      });
      const hiddenIndexes = allChars.reduce((acc, char, index) => {
        if (char === "_") acc.push(index);
        return acc;
      }, []);
      const probableChars = possibleWords.reduce((acc, word) => {
        const chars = word
          .split("")
          .filter((char, index) => !!hiddenIndexes.includes(index));
        acc.add(...chars.map(char => char.toUpperCase()));
        return acc;
      }, new Set([]));

      return Array.from(probableChars);
    },

    getCharsNotFoundCount() {
      const charsNotFound = this.hiddenChars.filter(
        char => !this.charsClicked.includes(char)
      );
      return charsNotFound.length;
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

    startNewGame() {
      stopSound("lost");
      stopSound("won");
      this.$emit("start-new-game");
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
  justify-items: center;
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
        left: 5px;
        top: 8px;
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
