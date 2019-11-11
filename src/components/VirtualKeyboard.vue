<template>
  <div class="keyboard-content">
    <kbd v-for="(char, index) of chars" :key="index">
      {{ char }}
    </kbd>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chars: [
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/sass/variables";

.keyboard-content {
  display: grid;
  grid-template-columns: repeat(10, 41px);
  gap: 8px;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px 0, -1px -2px 8px 1px $hm_blue;

  > kbd {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 3px -1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;

    &:nth-child(20) {
      grid-column: 1;
    }
  }
}
</style>
