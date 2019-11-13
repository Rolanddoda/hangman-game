<template>
  <div class="guess-word-and-keyboard">
    <div class="word-wrapper" ref="wordWrapper">
      <DisplayWordChars :chars="chars" :chars-clicked="charsClicked" />
    </div>

    <VirtualKeyboard computer-mode :disabled-chars="charsClicked" />
  </div>
</template>

<script>
import { wordContainsArrayOfChars } from "../utils";
// Components
import DisplayWordChars from "./DisplayWordChars";
import VirtualKeyboard from "./VirtualKeyboard";

export default {
  components: {
    DisplayWordChars,
    VirtualKeyboard
  },

  props: {
    chars: Array
  },

  data: () => ({
    charsClicked: [],
    errorsCount: 0,
    triesCount: 0
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
      return [() => this.guessChar()];
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
    }
  },

  created() {
    setTimeout(() => this.getComputerToPlay(), 1000);
    this.maxErrors = 8; // here we set max errors to 8 and this property is not reactive
  },

  beforeDestroy() {
    this.$refs.wordWrapper.removeEventListener(
      "animationend",
      this.animationEnded
    );
  },

  methods: {
    guessChar() {
      this.charPressed("I");
      // this.triesCount++;
      // this.triesCount < this.maxErrors && this.getComputerToPlay();
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
