<template>
  <div class="hangman-game">
    <HangmanSVG />
  </div>
</template>

<script>
import HangmanSVG from "./HangmanSVG";

export default {
  components: {
    HangmanSVG
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
