<template functional>
  <em class="base-btn" @click="listeners['click']">
    <slot></slot>
  </em>
</template>

<style lang="scss" scoped>
.base-btn {
  padding: 15px 30px;
  box-shadow: 0 2px 10px black;
  cursor: pointer;
}
</style>
