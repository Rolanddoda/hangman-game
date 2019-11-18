<template>
  <div id="app">
    <HangmanSVG />
    <UserMode v-if="userMode" />
    <ComputerMode v-else />
    <ErrorsDisplay />
  </div>
</template>

<script>
// Components
import ErrorsDisplay from "@/shared/components/ErrorsDisplay";
import HangmanSVG from "./components/HangmanSVG";
import UserMode from "./components/user-mode/UserMode";
import ComputerMode from "./components/computer-mode/ComputerMode";

export default {
  name: "app",

  components: {
    HangmanSVG,
    UserMode,
    ComputerMode,
    ErrorsDisplay
  },

  data: () => ({
    userMode: true
  })
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

* {
  box-sizing: border-box;
}

#app {
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: start;
  grid-template-rows: 2fr 1fr;
  gap: 10px;
  padding-bottom: 90px;
}

kbd {
  border: 1px solid lighten($hm_navy, 90);
  border-radius: 4px;
  display: inline-block;
  padding: 5px 9px;
}
</style>
