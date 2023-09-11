<template>
  <div class="pgm_konva" id="pgmContainer">
    <v-stage
      class="konva-stage"
      ref="konvaStage"
      :config="konvaConfig.stage"
      @click="onStageClick"
      @wheel="wheelForScale($event)"
      @touchstart="onStageTouchstart"
      @touchmove="onStageTouchmove($event)"
      @touchend="onStageTouchend"
      @dragstart="onDragstart"
      @dragmove="onDragmove"
      @dragend="onDragend"
    >
      <v-layer ref="konvaLayer">
        <v-group :config="konvaConfig.group">
          <v-image
            :config="{
              image: konvaConfig.pgmImage,
            }"
          />
        </v-group>
        <v-group :config="konvaConfig.group">
          <v-line
            v-for="(item, index) in konvaConfig.polyline"
            :key="index + 1000"
            :config="{
              points: item,
              stroke: '#ff0000',
              strokeWidth: 6,
              lineCap: 'round',
              lineJoin: 'round',
            }"
          >
          </v-line>
        </v-group>
        <v-group :config="konvaConfig.group">
          <v-circle
            v-for="(item, index) in konvaConfig.points"
            :key="index"
            :config="{
              id: index,
              x: item.x,
              y: item.y,
              radius: 8,
              fill: '#ff0000',
            }"
          >
          </v-circle>
        </v-group>
        <v-group :config="konvaConfig.group">
          <v-arrow
            v-for="(item, index) in konvaConfig.points"
            :key="index + 99"
            :config="{
              id: index,
              x: item.x,
              y: item.y,
              points: [
                0,
                0,
                50 * Math.cos((item.omega * Math.PI) / 180),
                50 * Math.sin((item.omega * Math.PI) / 180),
              ],
              pointerLength: 30,
              pointerWidth: 10,
              fill: '#ffff00',
              stroke: 'black',
              strokeWidth: 3,
            }"
          >
          </v-arrow>
        </v-group>
      </v-layer>
    </v-stage>
    <CircleTooltip
      :visible="visibleCircleTooltip"
      :triggerPosition="triggerPosition"
      :circleNeedData="circleNeedData"
      ref="circleTooltipRef"
      @saveCircleTooltipData="saveCircleTooltipData"
      @deleteCircleTooltipData="deleteCircleTooltipData"
    />
  </div>
</template>
<script>
let timeId;
let lastDist;
let lastCenter;
import CircleTooltip from "@/components/CircleTooltip/Index.vue";
import {
  getMinPoint,
  getKonvaConfigByObj,
  getCenter,
  getDistance,
} from "@/utils/CoordinatePickupFun.js";
import { isEqual, isEmpty } from "lodash";
import { MapImage } from "@/utils/maping.js";
export default {
  data() {
    return {
      konvaConfig: {
        stage: {
          width: 1000,
          height: 1000,
          draggable: true,
        },

        group: {
          x: 0,
          y: 0,
        },
        pgmImage: null,
        points: [],
        polyline: [],
      },
      visibleCircleTooltip: false,
      triggerPosition: {
        layerX: 0,
        layerY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
      },
      threshold: 0.01,
      isTouchStart: false,
      isTouchmoveing: false,
      metaTaskList: [],
      identifierList: [],
      selectPoint: { location: { omega: 0 }, process: [], station: [] },
      stagePointerPosition: {
        x: 0,
        y: 0,
      },
      stageScale: 1,
      // 插入节点的最大数量（包括已删除的），这是个递增值
      historyMaxnodeNum: 0,
      points: new Map(),
      isDraging: false,
      startDragData: null,
      diffLayerX: 0,
      diffLayerY: 0,
      diffClientX: 0,
      diffClientY: 0,
      diffPageX: 0,
      diffPageY: 0,
    };
  },
  computed: {
    circleNeedData() {
      return {
        stage: this.konvaConfig.stage,
        points: this.points,
        threshold: this.threshold,
        id: "pgmContainer",
        isTouchStart: this.isTouchStart,
        isTouchmoveing: this.isTouchmoveing,
        form: {
          omega: 0,
          identifierList: this.identifierList, // 目标物
          metaTaskList: this.metaTaskList, // 动作
          selectPoint: this.selectPoint, // 选择点
        },
        stagePointerPosition: this.stagePointerPosition,
        stageScale: this.stageScale,
        isDraging: this.isDraging,
        diffLayerX: this.diffLayerX,
        diffLayerY: this.diffLayerY,
        diffClientX: this.diffClientX,
        diffClientY: this.diffClientY,
        diffPageX: this.diffPageX,
        diffPageY: this.diffPageY,
      };
    },
  },
  components: {
    CircleTooltip,
  },
  mounted() {
    this.getCircleData();
  },
  watch: {
    $route: function (newVal, oldVal) {
      if (!isEqual(newVal, oldVal)) {
        this.getCircleData();
      }
    },
  },
  methods: {
    onDragstart: function (el) {
      this.isDraging = true;
      const { layerX, layerY, clientX, clientY, pageX, pageY } = el.evt;
      this.startDragData = {
        xL: layerX,
        yL: layerY,
        xC: clientX,
        yC: clientY,
        xP: pageX,
        yP: pageY,
      };
    },
    onDragmove: function () {
      this.visibleCircleTooltip = false;
    },
    onDragend: function (e) {
      const { xL, yL, xC, yC, xP, yP } = this.startDragData;
      const { layerX, layerY, clientX, clientY, pageX, pageY } = e.evt;
      console.log("onDragstart", xL, yL, xC, yC, xP, yP);
      console.log("onDragend", layerX, layerY, clientX, clientY, pageX, pageY);

      this.diffLayerX = layerX - xL;
      this.diffLayerY = layerY - yL;
      this.diffClientX = clientX - xC;
      this.diffClientY = clientY - yC;
      this.diffPageX = pageX - xP;
      this.diffPageY = pageY - yP;
    },
    getCircleData: async function () {
      try {
        // GlobalLoading.loadingShow();
        await this.viewMap();
        await this.getCircleNeedDataList();
      } catch (error) {
        // GlobalLoading.loadingClose();
      } finally {
        // GlobalLoading.loadingClose();
      }
    },
    getCircleNeedDataList: async function () {
      this.identifierList = await [
        {
          id: "1",
          name: "test",
          code: "111",
          createTime: 1673848764431,
        },
        {
          id: "2",
          name: "test2",
          code: "222",
          createTime: 1673848764431,
        },
      ];
      this.metaTaskList = await [
        {
          id: "ff80818186c0393a0186c03944d00007",
          name: "抓取",
          describe: "",
          method: "TASK_GRAB",
          params: null,
          type: 2,
          createTime: 1678262224080,
        },
      ];
    },
    viewMap: async function () {
      this.resetData();
      const pgmImageData = `
      P5
# CREATOR: TwelveMonkeys NetPBM Portable Any Map (PNM) image writer
696 1344
255
þþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþ
      `;
      let img = new MapImage(pgmImageData);
      let canvasImg = img.getInitMap("canvas");
      const dom = document.querySelector(".konva-stage");
      this.konvaConfig.stage.width = dom.clientWidth;
      this.konvaConfig.stage.height = dom.clientHeight;
      this.konvaConfig.pgmImage = new Image();
      this.konvaConfig.pgmImage.src = canvasImg.toDataURL();
    },
    wheelForScale: function (e) {
      e.evt.preventDefault();
      const scaleBy = 1.01;
      const stage = this.$refs.konvaStage.getStage();
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };
      const newScale =
        e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      this.$nextTick(() => {
        stage.x(
          (-mousePointTo.x + stage.getPointerPosition().x / newScale) * newScale
        );
        stage.y(
          (-mousePointTo.y + stage.getPointerPosition().y / newScale) * newScale
        );
        stage.batchDraw();
        const scale = e.evt.deltaY > 0 ? scaleBy : 1 / scaleBy;
        this.stageScale = newScale;
        this.stagePointerPosition = {
          x: stage.x(),
          y: stage.y(),
        };
        this.triggerPosition = {
          ...this.triggerPosition,
          layerX:
            stage.getPointerPosition().x +
            (-stage.getPointerPosition().x + this.triggerPosition.layerX) *
              scale,
          layerY:
            stage.getPointerPosition().y +
            (-stage.getPointerPosition().y + this.triggerPosition.layerY) *
              scale,
        };
      });
    },
    onStageTouchstart: function (e) {
      const len = e.evt.touches.length;
      const { pageX, pageY } = e.evt.touches[0];
      if (len >= 2) {
        clearTimeout(timeId);
      } else {
        timeId = setTimeout(() => {
          this.triggerPosition = {
            pageX,
            pageY,
          };
          this.isTouchStart = true;
          this.visibleCircleTooltip = true;
          this.initData();
        }, 50);
      }
    },
    onStageTouchmove: function (e) {
      e.evt.preventDefault();
      const stage = this.$refs.konvaStage.getStage();
      const touch1 = e.evt.touches[0];
      const touch2 = e.evt.touches[1];
      if (touch1 && touch2) {
        this.konvaConfig.stage.draggable = false; // 缩放时，禁掉拖拽，两者冲突会导致缩放失效
        const p1 = {
          x: touch1.pageX,
          y: touch1.pageY,
        };
        const p2 = {
          x: touch2.pageX,
          y: touch2.pageY,
        };

        if (!lastCenter) {
          lastCenter = getCenter(p1, p2);
          return;
        }

        if (!lastDist) {
          lastDist = getDistance(p1, p2);
        }
        const newCenter = getCenter(p1, p2); // 缩放中心
        const newDist = getDistance(p1, p2); // 两指距离
        const pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX(),
        };
        const scale = stage.scaleX() * (newDist / lastDist);
        // 用于子组件的位置更新
        stage.scale({ x: scale, y: scale });
        const dx = newCenter.x - lastCenter.x;
        const dy = newCenter.y - lastCenter.y;
        const newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };
        stage.position(newPos);
        // stage.batchDraw();
        lastDist = newDist;
        lastCenter = newCenter;
      }
    },
    onStageTouchend: function () {
      lastDist = 0;
      lastCenter = null;
      this.konvaConfig.stage.draggable = true;
    },
    resetData: function () {
      this.initData();
      this.konvaConfig = {
        stage: {
          width: 1000,
          height: 1000,
          draggable: true,
        },
        group: {
          x: 0,
          y: 0,
        },
        pgmImage: null,
        points: [],
        polyline: [],
      };
      // 切换路由 重绘konva
      lastDist = 0;
      lastCenter = null;
      const stage = this.$refs.konvaStage.getStage();
      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });
      stage.batchDraw();
    },

    onStageClick: function (e) {
      const { layerX, layerY, clientX, clientY } = e.evt;
      console.log("click", layerX, layerY, clientX, clientY);
      console.log(
        "ooo",
        this.diffLayerX,
        this.diffLayerY,
        this.diffClientX,
        this.diffClientY,
        this.diffPageX,
        this.diffPageY
      );
      this.triggerPosition = {
        layerX: layerX,
        layerY: layerY,
        clientX: clientX,
        clientY: clientY,
      };
      this.visibleCircleTooltip = true;
      this.initData();
    },

    initData: function () {
      this.$refs.circleTooltipRef.form = {
        omega: 0,
        identifierList: this.identifierList, // 目标物
        metaTaskList: this.metaTaskList, // 动作
        selectPoint: this.selectPoint || {
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

    deleteCircleTooltipData: function (data) {
      const { directions, triggerPoint, visible } = data;
      const {
        location: { x, y },
      } = triggerPoint;
      const { cx, cy } = directions;
      this.visibleCircleTooltip = visible;
      const obj = getMinPoint(
        this.points,
        { x, y },
        this.threshold / this.stageScale
      );
      const obj1 = getKonvaConfigByObj(this.konvaConfig.points, obj);

      if (!isEmpty(obj)) {
        this.points.delete(obj.key);
        let newPolyline = [];
        this.konvaConfig.points = this.konvaConfig.points.map((i) => {
          if (i.key === obj1.key) {
            return;
          } else {
            return { ...i };
          }
        });
        // 更新 polyline
        newPolyline = this.konvaConfig.polyline.map((arrItem) => {
          const result = [];
          for (var i = 0; i < arrItem.length; i = i + 2) {
            if (obj1.x == arrItem[i] && obj1.y == arrItem[i + 1]) {
              continue;
            } else {
              result.push(arrItem[i]);
              result.push(arrItem[i + 1]);
            }
          }
          return result;
        });
        this.konvaConfig.points = [
          ...new Set(this.konvaConfig.points.filter(Boolean)),
        ];
        this.konvaConfig.polyline = newPolyline;
      }
    },
    saveCircleTooltipData: function (data) {
      const { directions, triggerPoint, visible } = data;
      const {
        location: { x, y, omega },
      } = triggerPoint;
      const { cx, cy } = directions;
      this.visibleCircleTooltip = visible;
      const obj = getMinPoint(
        this.points,
        { x, y },
        this.threshold / this.stageScale
      );
      const obj1 = getKonvaConfigByObj(this.konvaConfig.points, obj);
      let map = new Map();
      if (!isEmpty(obj)) {
        map = this.points.set(this.historyMaxnodeNum, triggerPoint);
        this.konvaConfig.points = this.konvaConfig.points.map((i) => {
          if (i.key === obj1.key) {
            return { ...i, omega };
          } else {
            return { ...i };
          }
        });
      } else {
        map = this.points.set(this.historyMaxnodeNum, triggerPoint);
        this.konvaConfig.points.push({
          x: cx,
          y: cy,
          omega,
          key: this.historyMaxnodeNum,
        });
        this.historyMaxnodeNum += 1;
      }

      this.points = map;
      let pointArr = [];
      const curPoints = [...new Set(this.konvaConfig.points.filter(Boolean))];
      for (let i = 0; i < curPoints.length; i++) {
        pointArr.splice(pointArr.length, 0, curPoints[i].x, curPoints[i].y);
      }
      if (pointArr.length >= 4) {
        this.konvaConfig.polyline.push(pointArr);
      }
      this.konvaConfig.points = curPoints;
    },
  },
};
</script>
