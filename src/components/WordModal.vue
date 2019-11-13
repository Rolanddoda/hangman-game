<template>
  <div class="word-modal">
    <transition name="scaleInOut" appear>
      <div class="content">
        This is modal content
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },

  data: () => ({
    show: false
  })
};
</script>

<style lang="scss" scoped>
@import "~@/sass/variables";

.word-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);

  .content {
    width: 30%;
    height: 50%;
    border: 1px solid;
    border-radius: 5px;
    background: $hm_navy;
  }
}

.scaleInOut-enter {
  transform: scale(0);
}

.scaleInOut-enter-active,
.scaleInOut-leave-active {
  transition: transform 0.5s ease-in-out;
}
.scaleInOut-fade-enter,
.scaleInOut-fade-leave-to {
  transform: scale(1);
}
</style>
