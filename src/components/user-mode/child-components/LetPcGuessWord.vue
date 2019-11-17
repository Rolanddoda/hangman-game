<template functional>
  <em class="pc-guess-word" @click="listeners['pc-guess-word']">
    Challenge PC to guess a word
  </em>
</template>

<style lang="scss" scoped>
.pc-guess-word {
  position: fixed;
  left: calc(50% - 120px);
  bottom: 20px;
  padding: 15px 30px;
  box-shadow: 0 2px 10px black;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .pc-guess-word {
    right: 10px;
    left: unset;
  }
}
</style>
