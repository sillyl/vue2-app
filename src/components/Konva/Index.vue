<template>
  <div id="konva-content">
    <v-stage
      ref="konvaRef"
      :config="konvaConfig.stageSize"
      @click="onStageClick"
      @mousemove="onMousemove"
      @contextmenu="onContextmenu"
      @touchstart="onStageTouchstart"
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
      @circleTooltipData="circleTooltipData"
    />
  </div>
</template>

<script>
import { throttle } from "lodash";
import CircleTooltip from "@/components/CircleTooltip/Index.vue";
import { map } from "./in.js";
export default {
  props: ["configCircleCoordinate"],
  components: {
    CircleTooltip,
  },
  computed: {
    circleNeedData() {
      console.log("map", map);
      return {
        stage: this.konvaConfig.stageSize,
        points: map,
        threshold: 0.02,
        id: "konva-content",
        konvaConfigPoints: [],
        isTouchStart: this.isTouchStart,
        form: {
          omega: 0,
          // identifierList: this.identifierList, // 目标物
          // metaTaskList: this.metaTaskList, // 动作
          // selectPoint: this.selectPoint, // 选择点
          identifierList: [], // 目标物
          metaTaskList: [], // 动作
          selectPoint: {
            location: { omega: 0 },
            process: [],
            station: [],
          },
        },
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
    circleTooltipData: function (data) {
      this.konvaConfig.points = data.newkonvaConfigPoints;
      console.log("newkonvaConfigPoints", data);
    },
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
      // console.log('onStageClick', e);
      this.evt = e.evt;
      this.visibleCircleTooltip = true;
      this.$refs.circleTooltipRef.form = {
        omega: 0,
        identifierList: [{ code: "baibai", name: "sababa" }], // 目标物
        metaTaskList: [], // 动作
        selectPoint: {
          location: { omega: 0 },
          process: [],
          station: [],
        }, // 选择点
      };
      this.$refs.circleTooltipRef.directions = {
        cx: 60,
        cy: 60,
        omega: 0,
      };
    },
    onStageTouchstart: function (e) {
      // console.log('onStageTouchstart',e);
      this.evt = e.evt || e;
      this.isTouchStart = true;
      this.visibleCircleTooltip = true;
      this.$refs.circleTooltipRef.form = {
        selectPoint: {
          location: { omega: 0 },
          process: [],
          station: [],
        },
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
