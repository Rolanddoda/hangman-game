<template>
  <div class="hangman-game">
    <HangmanSVG :errors-count="errorsCount" />
    <GuessWord @errors-count-changed="errorsCount = $event" />
  </div>
</template>

<script>
import HangmanSVG from "./HangmanSVG";
import GuessWord from "./GuessWordAndVirtualKeyboard";

export default {
  components: {
    HangmanSVG,
    GuessWord
  },

  data: () => ({
    errorsCount: 0
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
