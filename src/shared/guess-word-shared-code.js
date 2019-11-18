import { wordContainsArrayOfChars } from "@/shared/utils";
import { stopSound, playSound } from "./GameSounds";
import { errors } from "./errors-observable";

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

    hiddenChars() {
      return this.chars.filter(char => char.hidden).map(char => char.value);
    },

    isWordSolved() {
      return wordContainsArrayOfChars(
        this.charsClicked.join(),
        this.hiddenChars
      );
    },

    maxErrorsExceeded() {
      return errors.count > errors.maxErrors;
    }
  },

  watch: {
    isWordSolved(val) {
      val && !this.maxErrorsExceeded && playSound("won");
    },

    maxErrorsExceeded(val) {
      val && playSound("lost");
    }
  },

  beforeDestroy() {
    this.$refs.wordWrapper.removeEventListener(
      "animationend",
      this.animationEnded
    );
    stopSound("lost");
    stopSound("won");
  },

  methods: {
    charPressed(char) {
      if (!this.hiddenChars.includes(char)) {
        this.errorsCount++;
        this.triggerError();
        playSound("wrong");
      } else playSound("correct");
      this.charsClicked.push(char);
    },

    triggerError() {
      const el = this.$refs.wordWrapper;
      el.classList.add("error");
      el.addEventListener("animationend", this.animationEnded);
    },

    animationEnded() {
      this.$refs.wordWrapper.classList.remove("error");
    }
  }
};
