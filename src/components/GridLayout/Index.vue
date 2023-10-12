<template>
  <div class="vue-grid-layout-video">
    <!-- :row-height="100" -->
    <grid-layout
      :layout.sync="layout"
      :col-num="4"
      :col-row="4"
      :is-draggable="true"
      :is-resizable="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :auto-size="true"
      :max-rows="4"
      :vertical-compact="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import { GridLayout, GridItem } from "vue-grid-layout";

export default {
  data() {
    return {
      //  { x: 单元格起始列, y: 单元格起始行, w: 单元格占几列, h: 单元格占几行, i: 单元格的id,字符串类型 }
      layout: [
        { x: 0, y: 0, w: 2, h: 2, i: "0" },
        { x: 2, y: 0, w: 2, h: 2, i: "1" },
        { x: 0, y: 1, w: 2, h: 2, i: "2" },
        { x: 2, y: 1, w: 2, h: 2, i: "3" },
      ],
    };
  },
  components: {
    GridLayout,
    GridItem,
  },
};
</script>
<style lang="scss" scoped>
.vue-grid-layout-video {
  height: 100%;
  width: 100%;
  .vue-grid-layout {
    height: 100% !important;
    width: 100%;
    font-size: 16px;
    .vue-grid-item {
      background: aliceblue;
      // height: 50% !important;
    }
  }
}
</style>
