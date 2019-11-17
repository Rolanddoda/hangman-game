<template>
  <div ref="chars" class="chars">
    <kbd v-for="(char, index) of charsToDisplay" :key="index">
      {{ char }}
    </kbd>
  </div>
</template>

<script>
export default {
  props: {
    chars: Array,
    charsClicked: Array
  },

  computed: {
    charsToDisplay() {
      return this.chars.map(char => {
        if (char.hidden && !this.charsClicked.includes(char.value)) return "_";
        return char.value;
      });
    }
  },

  methods: {
    getChars() {
      // access from parent
      return this.charsToDisplay;
    }
  }
};
</script>

<style lang="scss" scoped>
.chars {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 10px;
}
</style>
