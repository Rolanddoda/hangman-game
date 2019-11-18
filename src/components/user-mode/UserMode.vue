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

    <PcFindWord @click="letPcToFindWord" />
    <LetPcGuessWord @pc-guess-word="$emit('pc-mode')" />
  </div>
</template>

<script>
import randomWord from "random-words";
import { randomNumber, randomIndexesFromWord } from "@/shared/utils";
import { stopSound } from "@/shared/GameSounds";
import guessWordSharedCode from "@/shared/guess-word-shared-code";
// Components
import DisplayWordChars from "@/shared/components/DisplayWordChars";
import VirtualKeyboard from "@/shared/components/VirtualKeyboard";
import PcFindWord from "@/shared/components/PcFindWord";
import LetPcGuessWord from "./child-components/LetPcGuessWord";

export default {
  components: {
    VirtualKeyboard,
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
    }
  },

  created() {
    this.startGame();
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
