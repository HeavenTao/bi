<template>
  <div :style="positionStyle">
    <div style="user-select: none" :style="style" v-on="eventList">
      <div v-if="isDesign" :style="designStyle"></div>
      <component v-for="child in childs" :is="child.type" :key="child.uid" :id="child.uid" v-bind="child"></component>
    </div>
  </div>
</template>

<script>
import LayoutComponentBase from "../layoutComponentBase";
import TextCmp from "../basicCmp/TextCmp.vue";
import GridLayoutCmp from "./GridLayoutCmp.vue"
export default {
  name: "AbsoluteLayoutCmp",
  extends: LayoutComponentBase,
  components: { TextCmp, GridLayoutCmp },
};
</script>

<style></style>
