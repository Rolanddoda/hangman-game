<template>
  <div class="hangman-game">
    <HangmanSVG />
    <GuessWord />
  </div>
</template>

<script>
import HangmanSVG from "./HangmanSVG";
import GuessWord from "./GuessWordAndVirtualKeyboard";

export default {
  components: {
    HangmanSVG,
    GuessWord
  }
};
</script>

<style lang="scss" scoped>
.hangman-game {
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: start;
  gap: 10px;
}
</style>
