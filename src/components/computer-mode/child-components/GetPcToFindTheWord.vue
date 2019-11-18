<template>
  <div class="computer-mode">
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
  </div>
</template>

<script>
import { getKeyboardChars, getCharAndIndex, sleep } from "@/shared/utils";
import engWords from "an-array-of-english-words";
import { stopSound } from "@/shared/GameSounds";
import guessWordSharedCode from "@/shared/guess-word-shared-code";
// Components
import DisplayWordChars from "@/shared/components/DisplayWordChars";
import VirtualKeyboard from "@/shared/components/VirtualKeyboard";

export default {
  components: {
    DisplayWordChars,
    VirtualKeyboard
  },

  mixins: [guessWordSharedCode],

  props: {
    chars: Array
  },

  data: () => ({
    charsClicked: [],
    triesCount: 0
  }),

  computed: {
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

  created() {
    this.guessChar();
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
      const possibleWords = this.getPossibleWords();
      const hiddenIndexes = this.getHiddenIndexes();
      return this.getBestProbableChars(possibleWords, hiddenIndexes);
    },

    getPossibleWords() {
      const allChars = this.$refs.charsDisplay.getChars();
      const charAndIndex = getCharAndIndex(allChars);
      const words = engWords.filter(w => w.length === allChars.length);
      return words.filter(word => {
        return charAndIndex.every(
          char => word[char.index] === char.char.toLowerCase()
        );
      });
    },

    getHiddenIndexes() {
      const allChars = this.$refs.charsDisplay.getChars();
      return allChars.reduce((acc, char, index) => {
        if (char === "_") acc.push(index);
        return acc;
      }, []);
    },

    getBestProbableChars(possibleWords, hiddenIndexes) {
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

@import "~@/sass/mixins";

@include gameSharedStyle();
</style>
