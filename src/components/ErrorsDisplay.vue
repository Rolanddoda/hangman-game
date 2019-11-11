<template>
  <div class="errors-display">
    Errors: <kbd>{{ errorsCount }}</kbd> / <kbd>{{ maxErrors }}</kbd>
  </div>
</template>

<script>
export default {
  props: {
    errorsCount: Number,
    maxErrors: {
      type: String,
      default: "8"
    }
  }
};
</script>
