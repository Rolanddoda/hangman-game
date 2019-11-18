import Vue from "vue";
export const errors = Vue.observable({
  count: 0,
  maxErrors: 8
});
