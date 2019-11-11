<template>
  <div id="app">
    <HangmanGame />
  </div>
</template>

<script>
import HangmanGame from "./components/HangmanGame";

export default {
  name: "app",

  components: {
    HangmanGame
  }
};
</script>

<style lang="scss">
@import "~@/sass/variables";

html,
body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  background: $hm_navy;
  color: $hm_yellow;
}
</style>
