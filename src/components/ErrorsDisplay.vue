<template>
  <div class="errors-display">
    <strong>Errors</strong>
    <kbd>{{ errorsCount }}</kbd>
    <em>of</em>
    <kbd>{{ maxErrors }}</kbd>
  </div>
</template>

<script>
export default {
  props: {
    errorsCount: Number,
    maxErrors: {
      type: String,
      default: "8"
    }
  }
};
</script>

<style lang="scss" scoped>
.errors-display {
  position: fixed;
  right: 20px;
  top: 20px;
  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 10px black;
}
</style>
