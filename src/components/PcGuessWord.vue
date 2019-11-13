<template>
  <div class="pc-guess-word">
    <WordModal v-model="showModal" />
  </div>
</template>

<script>
import WordModal from "./WordModal";

export default {
  components: {
    WordModal
  },

  data: () => ({
    showModal: false
  }),

  mounted() {
    this.$nextTick(() => this.startGame());
  },

  methods: {
    startGame() {
      this.showModal = true;
    }
  }
};
</script>
