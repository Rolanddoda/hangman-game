<template>
  <div class="hangman-game">
    <HangmanSVG />
    <GuessWord />
    <VirtualKeyboard />
  </div>
</template>

<script>
import HangmanSVG from "./HangmanSVG";
import GuessWord from "./GuessWord";
import VirtualKeyboard from "./VirtualKeyboard";

export default {
  components: {
    HangmanSVG,
    GuessWord,
    VirtualKeyboard
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
