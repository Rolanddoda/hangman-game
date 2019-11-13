<template>
  <div class="pc-guess-word">
    <WordModal v-if="showModal" @chars-selected="charsSelected" />
    <GetPcToFindTheWord
      v-else
      :chars="chars"
      @errors-count-changed="$emit('errors-count-changed', $event)"
    />
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
    showModal: true,
    chars: null
  }),

  methods: {
    charsSelected(chars) {
      this.showModal = false;
      this.chars = chars;
    }
  }
};
</script>
