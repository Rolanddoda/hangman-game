<template>
  <div class="pc-guess-word">
    <WordModal v-if="showModal" @chars-selected="charsSelected" />
    <GetPcToFindTheWord v-else :chars="chars" />
  </div>
</template>

<script>
import WordModal from "./WordModal";
import GetPcToFindTheWord from "./GetPcToFindTheWord";

export default {
  components: {
    WordModal,
    GetPcToFindTheWord
  },

  data: () => ({
    showModal: false,
    chars: null
  }),

  mounted() {
    this.$nextTick(() => this.startGame());
  },

  methods: {
    startGame() {
      this.showModal = true;
    },

    charsSelected(chars) {
      this.showModal = false;
      this.chars = chars;
    }
  }
};
</script>
