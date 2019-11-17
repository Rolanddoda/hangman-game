<template>
  <div class="user-mode">
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
import { randomNumber, randomIndexesFromWord } from "@/shared/utils";
import { stopSound } from "@/shared/GameSounds";
import guessWordSharedCode from "@/shared/guess-word-shared-code";
import { errors } from "@/shared/errorsObservable";
// Components
import DisplayWordChars from "@/shared/components/DisplayWordChars";
import VirtualKeyboard from "@/shared/components/VirtualKeyboard";
import ErrorsDisplay from "@/shared/components/ErrorsDisplay";
import PcFindWord from "@/shared/components/PcFindWord";
import LetPcGuessWord from "./child-components/LetPcGuessWord";

export default {
  components: {
    VirtualKeyboard,
    ErrorsDisplay,
    PcFindWord,
    LetPcGuessWord,
    DisplayWordChars
  },

  mixins: [guessWordSharedCode],

  data: () => ({
    word: "",
    charsClicked: []
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

    errorsCount: {
      get() {
        return errors.count;
      },
      set(val) {
        errors.count = val;
      }
    }
  },

  created() {
    this.startGame();
    this.maxErrors = 8; // here we set max errors to 8 and this property is not reactive
  },

  methods: {
    startGame() {
      stopSound("lost");
      stopSound("won");
      this.word = randomWord().toUpperCase();
      this.errorsCount = 0;
      this.charsClicked = [];
    },

    letPcToFindWord() {
      this.hiddenChars.forEach(char => this.charsClicked.push(char));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/sass/mixins";

@include gameSharedStyle();
</style>
