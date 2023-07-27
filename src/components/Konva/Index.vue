<template>
  <div id="konva-content">
    hhhh
    <i class="el-icon-edit"></i>
    <v-stage
      ref="konvaRef"
      :config="konvaConfig.stageSize"
      @click="onStageClick"
      @mousemove="onMousemove"
      @contextmenu="onContextmenu"
    >
      <v-layer ref="konvaLayerRef">
        <v-group
          v-if="configCircle"
          :draggable="true"
          :dragBoundFunc="dragBoundFunc"
        >
          <v-circle :config="konvaConfig.configCircle"> </v-circle>
        </v-group>
      </v-layer>
    </v-stage>
    <CircleTooltip
      :visible="visibleCircleTooltip"
      :evt="evt"
      :circleNeedData="circleNeedData"
      ref="circleTooltipRef"
    />
  </div>
</template>

<script>
import { throttle } from "lodash";
import CircleTooltip from "@/components/CircleTooltip/Index.vue";
export default {
  props: ["configCircleCoordinate"],
  components: {
    CircleTooltip,
  },
  computed: {
    circleNeedData() {
      return {
        stage: this.konvaConfig.stageSize,
        points: this.points,
        threshold: 0.02,
        id: "konva-content",
        isTouchStart: this.isTouchStart,
      };
    },
  },
  data() {
    return {
      configCircle: false, // 展示圆
      draggableCircle: false, // 标识是否进行过拖拽行为
      visibleCircleTooltip: false,
      isTouchStart: false,
      evt: null,
      konvaConfig: {
        stageSize: {
          width: 2000,
          height: 2000,
        },
        configCircle: {
          x:
            (this.configCircleCoordinate &&
              this.configCircleCoordinate.configCircle) ||
            60,
          y:
            (this.configCircleCoordinate &&
              this.configCircleCoordinate.configCircle) ||
            60,
          radius: 10,
          fill: "#C0C0C0",
          stroke: "#DCDCDC",
          strokeWidth: 5,
        },
        draggable: true,
      },
    };
  },
  mounted() {
    // 自适应内容区
    const width = document.getElementById("konva-content").clientWidth;
    const height = document.getElementById("konva-content").clientHeight;
    this.konvaConfig.stageSize.width = width;
    this.konvaConfig.stageSize.height = height;
  },
  methods: {
    onContextmenu: function (e) {
      e.evt.preventDefault();
    },
    dragBoundFunc: function (pos) {
      const xLen =
        document.getElementById("konva-content").clientWidth -
        this.konvaConfig.configCircle.x;
      const yLen =
        document.getElementById("konva-content").clientHeight -
        this.konvaConfig.configCircle.y;
      // 控制拖拽的⚪在stage空间内
      const newX =
        pos.x <= -this.konvaConfig.configCircle.x
          ? -this.konvaConfig.configCircle.x
          : pos.x >= xLen
          ? xLen
          : pos.x;
      const newY =
        pos.y <= -this.konvaConfig.configCircle.y
          ? -this.konvaConfig.configCircle.y
          : pos.y >= yLen
          ? yLen
          : pos.y;
      this.draggableCircle = true;
      console.log("pos", pos, "newX", newX, "newY", newY);

      return {
        x: newX,
        y: newY,
      };
    },
    onStageClick: function (e) {
      console.log("onStageClick", e);
      this.evt = e.evt;
      this.visibleCircleTooltip = true;
      this.$refs.circleTooltipRef.form = {
        omega: 0,
        nodeTarget: [],
        nodeActions: [],
        processTarget: [],
        processActions: [],
      };
      this.$refs.circleTooltipRef.directions = {
        cx: 60,
        cy: 60,
        omega: 0,
      };
    },
    onStageTouchstart: function (e) {
      console.log("onStageTouchstart", e);
      this.evt = e.evt;
      this.isTouchStart = true;
      this.visibleCircleTooltip = true;
      this.$refs.circleTooltipRef.form = {
        omega: 0,
        nodeTarget: [],
        nodeActions: [],
        processTarget: [],
        processActions: [],
      };
      this.$refs.circleTooltipRef.directions = {
        cx: 60,
        cy: 60,
        omega: 0,
      };
    },
    onMousemove: throttle(function (e) {
      // const layerX = e.evt.layerX
      // const layerY = e.evt.layerY
      // // this.konvaConfig.configCircle.x = layerX
      // // this.konvaConfig.configCircle.y = layerY
      // console.log('e', e, 'layerX', layerX, 'layerY', layerY)
    }, 500),
  },
};
</script>

<style lang="scss" scoped>
@import "./Index.scss";
</style>
