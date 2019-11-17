<template>
  <div class="keyboard-content">
    <kbd
      v-for="(char, index) of chars"
      :key="index"
      :class="{ disabled: disabledChars.includes(char) || gameEnded }"
      @click="charPressed(char)"
    >
      <em>{{ char }}</em>
    </kbd>
  </div>
</template>

<script>
import { getKeyboardChars } from "@/shared/utils";

export default {
  props: {
    disabledChars: Array,
    gameEnded: Boolean,
    computerMode: Boolean
  },

  data() {
    return {
      chars: getKeyboardChars()
    };
  },

  methods: {
    charPressed(char) {
      const charIsDisabled = () => this.disabledChars.includes(char);
      if (!this.gameEnded && !charIsDisabled() && !this.computerMode)
        this.$emit("char-pressed", char);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/sass/variables";

.keyboard-content {
  display: grid;
  grid-template-columns: repeat(10, 2.3rem);
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
    user-select: none;

    &:nth-child(20) {
      grid-column: 1;
    }

    &.disabled {
      background: black;
      opacity: 0.3;
    }
  }
}
</style>
