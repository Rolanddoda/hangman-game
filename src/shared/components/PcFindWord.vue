<template functional>
  <em class="pc-find-word" @click="listeners['click']">
    <slot>PC find the word</slot>
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
