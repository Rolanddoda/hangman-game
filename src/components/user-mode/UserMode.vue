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

    <BaseBtn class="reveal-word-btn" @click="revealTheWord">
      Reveal the word
    </BaseBtn>
  </div>
</template>

<script>
import randomWord from "random-words";
import { randomNumber, randomIndexesFromWord } from "@/shared/utils";
import { stopSound } from "@/shared/game-sounds";
import guessWordSharedCode from "@/shared/guess-word-shared-code";
// Components
import DisplayWordChars from "@/shared/components/DisplayWordChars";
import VirtualKeyboard from "@/shared/components/VirtualKeyboard";
import BaseBtn from "@/shared/components/BaseBtn";

export default {
  components: {
    VirtualKeyboard,
    DisplayWordChars,
    BaseBtn
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

    revealTheWord() {
      this.hiddenChars.forEach(char => this.charsClicked.push(char));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/sass/mixins";

@include gameSharedStyle();

::v-deep .reveal-word-btn {
  position: fixed;
  left: 20px;
  bottom: 20px;
}
</style>
