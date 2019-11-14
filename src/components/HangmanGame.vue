<template>
  <div class="hangman-game">
    <HangmanSVG :errors-count="errorsCount" />
    <GuessWord
      v-if="userMode"
      @errors-count-changed="errorsCount = $event"
      @pc-mode="toggleUserMode"
    />

    <PcGuessWord
      v-else
      @errors-count-changed="errorsCount = $event"
      @toggle-user-mode="toggleUserMode"
    />
  </div>
</template>

<script>
import HangmanSVG from "./HangmanSVG";
import GuessWord from "./GuessWordAndVirtualKeyboard";
import PcGuessWord from "./PcGuessWord";

export default {
  components: {
    HangmanSVG,
    GuessWord,
    PcGuessWord
  },

  data: () => ({
    errorsCount: 0,
    userMode: true
  }),

  methods: {
    toggleUserMode() {
      this.errorsCount = 0; // reset errors when changing mode
      this.userMode = !this.userMode;
    }
  }
};
</script>

<style lang="scss" scoped>
.hangman-game {
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: start;
  grid-template-rows: 2fr 1fr;
  gap: 10px;
  padding-bottom: 90px;
}
</style>
