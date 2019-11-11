<template>
  <div class="guess-word">
    <kbd v-for="(char, index) of word.split('')" :key="index">
      {{ char }}
    </kbd>
  </div>
</template>

<script>
import randomWord from "random-words";

export default {
  data: () => ({
    word: ""
  }),

  created() {
    this.startGame();
  },

  methods: {
    startGame() {
      this.word = randomWord().toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.guess-word {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 10px;
  padding: 10px 30px;
  transition: all 0.5s ease-in-out;
  box-shadow: 0 2px 10px black;
}
</style>
