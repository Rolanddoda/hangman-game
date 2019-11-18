<template>
  <div class="pc-guess-word">
    <WordModal v-if="showModal" @chars-selected="charsSelected" />
    <GetPcToFindTheWord v-else :chars="chars" @start-new-game="startNewGame" />
  </div>
</template>

<script>
import WordModal from "./child-components/WordModal";
import GetPcToFindTheWord from "./child-components/GetPcToFindTheWord";

export default {
  components: {
    WordModal,
    GetPcToFindTheWord
  },

  data: () => ({
    showModal: true,
    chars: null
  }),

  methods: {
    charsSelected(chars) {
      this.showModal = false;
      this.chars = chars;
    },

    startNewGame() {
      this.showModal = true;
      this.chars = null;
    }
  }
};
</script>
