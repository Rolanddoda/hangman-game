<template>
  <div class="hangman-game">
    <HangmanSVG :errors-count="errorsCount" />
    <GuessWord
      v-if="userMode"
      @errors-count-changed="errorsCount = $event"
      @pc-mode="userMode = false"
    />

    <PcGuessWord v-else @errors-count-changed="errorsCount = $event" />
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
  })
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
