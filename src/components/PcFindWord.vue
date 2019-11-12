<template functional>
  <em class="pc-find-word" @click="listeners['pc-find-word']">
    PC find the word
  </em>
</template>

<style lang="scss" scoped>
.pc-find-word {
  position: fixed;
  left: 20px;
  bottom: 20px;
  padding: 15px 30px;
  box-shadow: 0 2px 10px black;
  cursor: pointer;
}
</style>
