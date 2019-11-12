<template>
  <div ref="errorsDisplay" class="errors-display">
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
      type: Number,
      default: 8
    }
  },

  watch: {
    errorsCount: "triggerError"
  },

  methods: {
    triggerError() {
      const el = this.$refs.errorsDisplay;
      el.classList.add("error");
      el.addEventListener("animationend", this.animationEnded);
    },

    animationEnded() {
      this.$refs.errorsDisplay.classList.remove("error");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/sass/mixins";

@include shakeAnimation();

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

  &.error {
    animation: 0.8s shakeAnimation ease-in-out forwards;
  }
}
</style>
