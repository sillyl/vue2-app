<template>
  <div class="circle-actions">
    <div
      id="circle-tooltip"
      v-if="visible && !isContent"
      class="circle-tooltip"
      :style="{ top: top + 'px', left: left + 'px' }"
      @mousedown="onCircleMousedown"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchend"
      @dblclick="ondbClick"
      @click="onClick"
    >
      <div class="circle-default" v-if="this.evt"></div>
    </div>
    <div
      id="circle-tooltip-content"
      class="circle-tooltip"
      v-if="isContent"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <div class="circle" v-if="this.evt">
        <div class="center"></div>
        <div
          class="center-i"
          :style="{ transform: 'rotate(' + directions.omega + 'deg)' }"
          @mousedown="onContentMousedown"
          @touchstart="onContentTouchstart"
          @touchmove="onContentTouchmove"
          @touchend="onContentTouchend"
        >
          <i class="el-icon-caret-right"></i>
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
      <div
        class="content"
        id="content"
        :style="{ top: content.top + 'px', left: content.left + 'px' }"
      >
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="航向角">
            <el-input disabled v-model="form.omega"></el-input>
          </el-form-item>
          <h5>节点属性</h5>
          <el-form-item label="目标物">
            <el-select v-model="form.nodeTarget" placeholder="请选择目标物">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="动 作">
            <el-select v-model="form.nodeActions" placeholder="请选择动作">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <h5>过程属性</h5>
          <el-form-item label="目标物">
            <el-select v-model="form.processTarget" placeholder="请选择目标物">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="动 作">
            <el-select v-model="form.processActions" placeholder="请选择动作">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isEqual } from "lodash";
import { getFθ } from "@/utils/omega.js";
let clickNum = 0;
export default {
  name: "CircleTooltip",
  props: ["visible", "evt", "circleNeedData"],
  data() {
    return {
      top: 60,
      left: 60,
      isMounseMove: false,
      isContentMounseMove: false,
      isContent: false, // 判断展示方向和内容区
      circleData: {
        curLayerUvX: (60 / 2000).toFixed(6),
        curLayerUvY: (60 / 2000).toFixed(6),
      },
      curLayerX: null,
      curLayerY: null,
      threshold: this.circleNeedData.threshold || 0.01, //阈值
      parentId: this.circleNeedData.id, //必须
      //方向盘参数
      directions: {
        cx: 60,
        cy: 60,
        omega: 0,
      },
      form: this.circleNeedData.form || {
        omega: 0,
        nodeTarget: [],
        nodeActions: [],
        processTarget: [],
        processActions: [],
      },
      // content 动态位置
      content: {
        top: 80,
        left: 40,
      },
    };
  },
  watch: {
    evt: function (newVal, oldVal) {
      const res = isEqual(newVal, oldVal);
      this.isContent = res;
    },
  },
  updated() {
    if (!this.circleNeedData.isTouchStart) {
      if (!this.isMounseMove) {
        if (!this.isContent) {
          const layerY = (this.curLayerY = this.evt && this.evt.layerY);
          const layerX = (this.curLayerX = this.evt && this.evt.layerX);
          const Len1 = 33.6 / 2;
          this.top = layerY - Len1;
          this.left = layerX - Len1;
          this.directions.cx = layerX;
          this.directions.cy = layerY;
          this.circleData.curLayerUvX = (
            layerX / this.circleNeedData.stage.width
          ).toFixed(6);
          this.circleData.curLayerUvY = (
            layerY / this.circleNeedData.stage.height
          ).toFixed(6);
        } else {
          //确保move 圆之后 content 展示位置不偏移
          const Len2 = 80 / 2;
          this.top = this.curLayerY - Len2;
          this.left = this.curLayerX - Len2;
        }
      }
    } else {
      if (!this.isMounseMove) {
        const touchedNode = this.evt && this.evt.touches && this.evt.touches[0];

        this.directions.cx = this.evt.touches[0].pageX;
        this.directions.cy = this.evt.touches[0].pageY;

        // console.log("touchedNode", this.evt);
        this.top =
          ((touchedNode && touchedNode.pageY) || this.evt.pageY) - 33.6 / 2;
        this.left =
          ((touchedNode && touchedNode.pageX) || this.evt.pageX) - 33.6 / 2;
      }
    }
    if (this.isContent) {
      //更新content 方位
      const dom = document.getElementById(this.parentId);
      const dom1 = document.getElementById("content");
      // const xLen = Math.abs(dom.clientWidth - (this.left - dom.scrollLeft));
      // const yLen = Math.abs(dom.clientHeight - (this.top - dom.scrollTop));
      console.log("dom.scrollLeft", dom.scrollLeft, dom.scrollTop);

      const domW = dom.clientWidth / 2;
      const domH = dom.clientHeight / 2;
      const newLeft = this.left - dom.scrollLeft;
      const newTop = this.top - dom.scrollTop;
      if (newLeft <= domW && newTop <= domH) {
        console.log("1");

        this.content.left = 40;
        this.content.top = 80;
      } else if (newLeft >= domW && newTop <= domH) {
        console.log("2");
        this.content.left = -(dom1.clientWidth - 80 / 2);
        this.content.top = 80;
      } else if (newLeft <= domW && newTop >= domH) {
        console.log("3");
        this.content.left = 40;
        this.content.top = -dom1.clientHeight;
      } else if (newLeft >= domW && newTop >= domH) {
        console.log("4");
        this.content.left = -(dom1.clientWidth - 80 / 2);
        this.content.top = -dom1.clientHeight;
      } else {
        console.log("5");
      }
    }
  },
  methods: {
    onCircleMousedown: function () {
      (document.onmousemove = (el) => {
        this.isMounseMove = true;
        const newLayerY = (this.curLayerY =
          this.evt.layerY + (el.clientY - this.evt.clientY));
        const newLayerX = (this.curLayerX =
          this.evt.layerX + (el.clientX - this.evt.clientX));
        const stageWidth = this.circleNeedData.stage.width;
        const stageHeight = this.circleNeedData.stage.height;
        const Len1 = 33.6 / 2;
        this.top = newLayerY - Len1;
        this.left = newLayerX - Len1;
        this.directions.cx = newLayerX;
        this.directions.cy = newLayerY;
        this.circleData.curLayerUvX = (newLayerX / stageWidth).toFixed(6);
        this.circleData.curLayerUvY = (newLayerY / stageHeight).toFixed(6);
      }),
        (document.onmouseup = () => {
          this.isMounseMove = false;
          document.onmousemove = null;
        });
    },
    onTouchstart: function (e) {},
    onTouchmove: function (e) {
      this.isMounseMove = true;
      this.left = e.touches[0].pageX;
      this.top = e.touches[0].pageY;
      this.directions.cx = e.touches[0].pageX;
      this.directions.cy = e.touches[0].pageY;
    },
    onTouchend: function () {
      this.isMounseMove = false;
    },
    ondbClick: function () {
      console.log("kkk");
      this.isContent = true;
    },
    onClick: function () {
      if (this.circleNeedData.isTouchStart) {
        clickNum++;
        setTimeout(function () {
          clickNum = 0;
        }, 300);
        if (clickNum > 1) {
          clickNum = 0;
          this.isContent = true;
          console.log("双击");
        }
      }
    },
    onContentMousedown: function () {
      document.onmousemove = (el) => {
        this.isContentMounseMove = true;
        const endX = el.clientX;
        const endY = el.clientY;
        this.form.omega = this.directions.omega = getFθ(
          { x: endX, y: endY },
          { x: this.directions.cx, y: this.directions.cy }
        );
      };
      document.onmouseup = () => {
        this.isContentMounseMove = false;
        document.onmousemove = null;
      };
    },
    onContentTouchstart: function () {
      console.log("onContentTouchstart");
    },

    onContentTouchmove: function (e) {
      console.log("onContentTouchmove", e);
      const endX = e.touches[0].pageX;
      const endY = e.touches[0].pageY;
      this.form.omega = this.directions.omega = getFθ(
        { x: endX, y: endY },
        { x: this.directions.cx, y: this.directions.cy }
      );
    },
    onContentTouchend: function () {
      console.log("onContentTouchend");
    },
  },
};
</script>
<style type="text/css" scoped>
.el-form {
  width: 250px;
}

.circle-default {
  width: 33.6px;
  height: 33.6px;
  background: #fff;
  cursor: pointer;
  border-radius: 50%;
  border: 5px solid #dcdfe6;
  position: relative;
}

.circle-default:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.circle {
  width: 80px;
  height: 80px;
  background: #ccc;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #dcdfe6;
  position: relative;
}

.center {
  width: 20px;
  height: 20px;
  background: #fff;
  position: absolute;
  top: 30px;
  left: 30px;
  border-radius: 50%;
  border: 1px solid #dcdfe6;
}

.center-i {
  width: 40px;
  height: 20px;
  position: absolute;
  top: 30px;
  right: 0px;
  transform-origin: 0% 50%;
}

i {
  width: 16px;
  height: 16px;
  line-height: 16px;
}

i:nth-child(1) {
  margin-left: 8px;
}

.circle:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.circle-tooltip {
  position: absolute;
}

.content {
  border: 1px solid #ccc;
  padding: 10px;
  background: aliceblue;
  position: absolute;
}
</style>
