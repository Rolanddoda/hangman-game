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
