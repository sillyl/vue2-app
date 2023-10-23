<template>
  <div class="test">
    <draggable class="container" v-model="dataList">
      <div
        :data-width="item.width"
        :data-height="item.height"
        v-for="(item, index) in dataList"
        :class="['item', 'item_' + index]"
        :key="index"
      >
        <Red v-if="index === 0" />
        {{ item }}
      </div>
    </draggable>
    <div class="bottom"></div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Red from "./Index1.vue";
export default {
  components: {
    draggable,
    Red,
  },
  data() {
    return {
      dataList: [
        {
          chartId: "1",
          title: "红色",
          name: "red",
          width: 4,
          height: 2,
        },
        {
          chartId: "2",
          title: "橙色",
          name: "orange",
          width: 12,
          height: 2,
        },
        {
          chartId: "3",
          title: "黄色",
          name: "yellow",
          width: 16,
          height: 1,
        },
        {
          chartId: "4",
          title: "绿色",
          name: "green",
          width: 4,
          height: 6,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.test {
  height: 100%;
  .container {
    height: 60%;
    background-color: aqua;
    display: flex;
  }
  .bottom {
    height: 40%;
    background-color: beige;
  }

  .item_0 {
    width: 80%;
    height: 100%;
  }

  .item_1,
  .item_2,
  .item_3 {
    position: absolute;
    right: 0;
    top: 0;
  }

  .item_2 {
    top: 100px;
  }

  .item_3 {
    top: 200px;
  }
}
</style>
