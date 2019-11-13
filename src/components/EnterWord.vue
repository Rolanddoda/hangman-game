<template>
  <div class="enter-word-wrapper">
    <div
      class="enter-word"
      :class="{ correct: correctWord === true, wrong: correctWord === false }"
    >
      <input
        ref="input"
        type="text"
        v-model.trim="userWord"
        placeholder="Type your word"
      />
    </div>

    <div
      class="go-btn"
      v-if="correctWord"
      @click="$emit('word-entered', userWord)"
    >
      GO!
    </div>
  </div>
</template>

<script>
import words from "an-array-of-english-words";

export default {
  data: () => ({
    userWord: "",
    correctWord: null
  }),

  watch: {
    userWord(val) {
      if (!val) this.correctWord = null;
      this.correctWord = !!words.includes(val);
    }
  },

  mounted() {
    this.$refs.input.focus();
  }
};
</script>

<style lang="scss" scoped>
.enter-word-wrapper {
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  .enter-word {
    padding: 5px 10px;
    box-shadow: 0 2px 10px black;

    > input {
      padding: 10px;
      background: transparent;
      color: inherit;
      outline: none;
      border: none;
      font-size: 1rem;
    }

    &.correct {
      &:after {
        content: "✓";
        color: white;
      }
    }

    &.wrong {
      &:after {
        content: "✖";
        color: red;
      }
    }
  }
  .go-btn {
    cursor: pointer;
    padding: 15px 20px;
    box-shadow: 0 2px 10px black;
  }
}
</style>
