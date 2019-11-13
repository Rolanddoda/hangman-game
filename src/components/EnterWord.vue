<template>
  <div class="enter-word">
    <input type="text" v-model="userWord" placeholder="Type your word" />
  </div>
</template>

<script>
export default {
  data: () => ({
    userWord: ""
  })
};
</script>

<style lang="scss" scoped>
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
}
</style>
