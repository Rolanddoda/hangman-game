<template>
  <div class="guess-word">
    <div ref="guessWord" class="guessWord">
      {{ word }}
    </div>
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
