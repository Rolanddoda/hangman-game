<template>
  <div class="hide-chars-wrapper">
    <div class="chars">
      <kbd
        v-for="(char, index) of chars"
        :key="index"
        @click="toggleChar(index)"
      >
        {{ char.hidden ? "_" : char.value }}
      </kbd>
    </div>

    <button
      :disabled="isBtnDisabled"
      :class="{ disabled: isBtnDisabled }"
      class="go-btn"
      @click="charsSelected"
    >
      Finish!
    </button>
  </div>
</template>

<script>
export default {
  props: {
    word: String,
    charsCountToHide: Number
  },

  data: () => ({
    chars: []
  }),

  computed: {
    hiddenChars() {
      return this.chars.filter(char => char.hidden).map(char => char.value);
    },

    isBtnDisabled() {
      return this.charsCountToHide !== this.hiddenChars.length;
    }
  },

  created() {
    this.chars = this.word
      .split("")
      .map(char => ({ value: char, hidden: false }));
  },

  methods: {
    toggleChar(index) {
      this.chars[index].hidden = !this.chars[index].hidden;
    },

    charsSelected() {
      this.$emit("chars-selected", this.chars);
    }
  }
};
</script>

<style lang="scss" scoped>
.hide-chars-wrapper {
  display: grid;
  grid-auto-flow: column;
  gap: 10px;

  .chars {
    display: grid;
    grid-auto-flow: column;
    gap: 5px;
    padding: 10px 20px;
    box-shadow: 0 2px 10px black;
  }

  .go-btn {
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
    color: inherit;
    padding: 15px 20px;
    box-shadow: 0 2px 10px black;

    &.disabled {
      opacity: 0.3;
    }
  }

  kbd {
    cursor: pointer;
  }
}
</style>
