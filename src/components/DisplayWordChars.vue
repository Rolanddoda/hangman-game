<template>
  <div class="chars">
    <kbd v-for="(char, index) of chars" :key="index">
      {{ char.hidden && !charsClicked.includes(char.value) ? "_" : char.value }}
    </kbd>
  </div>
</template>

<script>
export default {
  props: {
    chars: Array,
    charsClicked: Array
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
