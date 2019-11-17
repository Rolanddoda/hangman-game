<template>
  <div class="pc-guess-word">
    <WordModal v-if="showModal" @chars-selected="charsSelected" />
    <GetPcToFindTheWord
      v-else
      :chars="chars"
      @errors-count-changed="$emit('errors-count-changed', $event)"
      @start-new-game="startNewGame"
    />
    <PcFindWord @click="$emit('toggle-user-mode')">
      Let ME find a word
    </PcFindWord>
  </div>
</template>

<script>
import PcFindWord from "@/shared/components/PcFindWord";
import WordModal from "./child-components/WordModal";
import GetPcToFindTheWord from "./GetPcToFindTheWord";

export default {
  components: {
    WordModal,
    GetPcToFindTheWord,
    PcFindWord
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
      this.$emit("errors-count-changed", 0);
    }
  }
};
</script>
