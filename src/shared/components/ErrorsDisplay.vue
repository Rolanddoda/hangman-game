<template>
  <div ref="errorsDisplay" class="errors-display">
    <strong>Errors</strong>
    <kbd>{{ errorsCount }}</kbd>
    <em>of</em>
    <kbd>{{ maxErrors }}</kbd>
  </div>
</template>

<script>
import { errors } from "@/shared/errors-observable";

export default {
  computed: {
    errorsCount: {
      get() {
        return errors.count;
      },
      set(val) {
        errors.count = val;
      }
    },

    maxErrors() {
      return errors.maxErrors;
    }
  },

  watch: {
    errorsCount: "triggerError"
  },

  methods: {
    triggerError(errorCount) {
      if (!errorCount) return;
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
  bottom: 20px;
  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 10px black;
  cursor: pointer;

  &.error {
    animation: 0.8s shakeAnimation ease-in-out forwards;
  }
}

@media only screen and (max-width: 600px) {
  .errors-display {
    top: 20px;
    bottom: unset;
    left: 10px;
    padding: 10px;
    right: unset;
  }
}
</style>
