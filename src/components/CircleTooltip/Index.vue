<template>
  <div
    id="circle-tooltip"
    v-if="visible"
    class="circle-tooltip"
    :style="{ top: top + 'px', left: left + 'px' }"
    @mousedown="onCircleMousedown"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
    @touchend="onTouchend"
  >
    <!-- <el-tooltip placement="bottom" >
      <div slot="content" v-if="this.evt">
        <p>坐标：({{ circleData.curLayerUvX }},{{ circleData.curLayerUvY  }} {{ circleNeedData.threshold }})</p>
      </div>
      <el-button></el-button>
    </el-tooltip> -->
    <span style="display: none">{{ circleData.curLayerUvX }}</span>
    <div class="circle" v-if="this.evt"></div>
    <div class="content" v-if="isContentInfo">
      {{ circleData.curLayerUvX }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "CircleTooltip",
  props: ["visible", "evt", "circleNeedData"],
  data() {
    return {
      top: 60,
      left: 60,
      isMounseMove: false,
      isContentInfo: false,
      circleData: {
        curLayerUvX: (60 / 2000).toFixed(6),
        curLayerUvY: (60 / 2000).toFixed(6),
      },
      timeOutEvent: null,
      threshold: this.circleNeedData.threshold || 0.01, //阈值
    };
  },
  computed: {},
  mounted() {},
  updated() {
    if (!this.isMounseMove) {
      this.top = this.evt && this.evt.layerY - 33.6 / 2;
      this.left = this.evt && this.evt.layerX - 33.6 / 2;
      this.circleData.curLayerUvX = (
        this.evt.layerX / this.circleNeedData.stage.width
      ).toFixed(6);
      this.circleData.curLayerUvY = (
        this.evt.layerY / this.circleNeedData.stage.height
      ).toFixed(6);
    }
  },
  methods: {
    onCircleMousedown: function () {
      (document.onmousemove = (el) => {
        this.isMounseMove = true;
        console.log("layerX", this.evt.layerX);

        const newLayerY = this.evt.layerY + (el.clientY - this.evt.clientY);
        const newLayerX = this.evt.layerX + (el.clientX - this.evt.clientX);
        this.top = newLayerY - 33.6 / 2;
        this.left = newLayerX - 33.6 / 2;
        this.circleData.curLayerUvX = (
          newLayerX / this.circleNeedData.stage.width
        ).toFixed(6);
        this.circleData.curLayerUvY = (
          newLayerY / this.circleNeedData.stage.height
        ).toFixed(6);
      }),
        (document.onmouseup = () => {
          this.isMounseMove = false;
          document.onmousemove = null;
        });
    },

    onTouchstart: function (e) {
      console.log("onTouchstart", e, this.top, this.left);
    },
    onTouchmove: function (e) {
      this.isMounseMove = true;
      this.left = e.changedTouches[0].clientX;
      this.top = e.changedTouches[0].clientY;
    },
    onTouchend: function (e) {
      this.isMounseMove = false;
    },
  },
};
</script>

<style type="text/css" scoped>
.circle {
  width: 33.6px;
  height: 33.6px;
  background: #fff;
  cursor: pointer;
  border-radius: 50%;
  border: 5px solid #dcdfe6;
}
.circle:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.circle-tooltip {
  position: absolute;
}
/* .el-button {
  padding: 12px 12px;
  border-radius: 17px;
  border: 5px solid #DCDFE6;
} */
</style>
