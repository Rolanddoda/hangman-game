<template>
  <div class="hide-chars-wrapper">
    <div class="chars">
      <kbd v-for="(char, index) of chars" :key="index">
        {{ char.hidden ? "_" : char.value }}
      </kbd>
    </div>

    <div class="go-btn">
      Finish!
    </div>
  </div>
</template>

<script>
export default {
  props: {
    word: String
  },

  data: () => ({
    chars: []
  }),

  created() {
    this.chars = this.word
      .split("")
      .map(char => ({ value: char, hidden: false }));
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
    padding: 15px 20px;
    box-shadow: 0 2px 10px black;
  }

  kbd {
    cursor: pointer;
  }
}
</style>
