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
body,
#app {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  background: $hm_navy;
  color: $hm_yellow;
}

kbd {
  border: 1px solid #aaa; // TODO dynamic color
  border-radius: 4px;
  display: inline-block;
  padding: 5px 9px;
}
</style>
