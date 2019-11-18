<template>
  <div class="word-modal">
    <transition name="scaleInOut" appear>
      <div class="content">
        <div v-if="charsCountToHide" class="info">
          Select {{ charsCountToHide }} chars to hide
        </div>
        <EnterWord v-if="!word" @word-entered="word = $event" />
        <HideChars
          v-else
          :word="word.toUpperCase()"
          :chars-count-to-hide="charsCountToHide"
          @chars-selected="$emit('chars-selected', $event)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { randomNumber } from "@/shared/utils";
// Components
import EnterWord from "./EnterWord";
import HideChars from "./HideChars";

export default {
  components: {
    EnterWord,
    HideChars
  },

  data: () => ({
    word: null,
    charsCountToHide: null
  }),

  watch: {
    word(val) {
      this.charsCountToHide = randomNumber(1, val.length - 1);
    }
  }
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
  text-align: center;

  .content {
    position: relative;
    width: 30%;
    height: 50%;
    border: 1px solid;
    border-radius: 5px;
    background: $hm_navy;
    display: grid;
    justify-content: center;
    align-items: center;

    .info {
      position: absolute;
      font-size: 2rem;
      left: 10px;
      top: 10px;
    }
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

@media only screen and (max-width: 600px) {
  .word-modal .content {
    width: 80%;
  }
}
</style>
