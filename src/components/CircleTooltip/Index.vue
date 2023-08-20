<template>
  <div class="circle-actions">
    <div
      id="circle-tooltip"
      v-if="visible && !isContent"
      class="circle-tooltip"
      :style="{ top: top + 'px', left: left + 'px', 'z-index': 1 }"
      @mousedown="onCircleMousedown"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchend"
      @dblclick="ondbClick"
      @click="onClick"
    >
      <div class="circle-default" v-if="triggerPosition"></div>
    </div>
    <div
      id="circle-tooltip-content"
      class="circle-tooltip"
      v-if="isContent"
      :style="{
        top: contentTop + 'px',
        left: contentLeft + 'px',
        'z-index': 1,
      }"
    >
      <div
        class="content"
        id="content"
        :style="{ top: content.top + 'px', left: content.left + 'px' }"
      >
        <el-form
          ref="formRef"
          :model="form.selectPoint"
          label-width="80px"
          size="small"
        >
          <el-form-item label="航向角">
            <el-input v-model="form.omega"></el-input>
          </el-form-item>
          <el-form-item label="过程属性" prop="process">
            <span class="action-add">
              <i
                class="el-icon-circle-plus-outline"
                @click="addProcessItem()"
              />添加
            </span>
            <div
              class="form-items-label"
              v-if="form.selectPoint.process.length > 0"
            >
              <span>目标物</span>
              <span>动作</span>
            </div>
            <div
              class="form-items"
              v-for="(item, index) in form.selectPoint.process"
              :key="index"
            >
              <el-row>
                <el-col :span="9">
                  <el-select
                    v-model="form.selectPoint.process[index].target"
                    placeholder="--请选择--"
                  >
                    <el-option
                      v-for="item in form.identifierList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="9">
                  <el-select
                    v-model="form.selectPoint.process[index].action"
                    placeholder="--请选择--"
                  >
                    <el-option
                      v-for="item in form.metaTaskList"
                      :key="item.method"
                      :label="item.name"
                      :value="item.method"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2">
                  <i class="el-icon-delete" @click="deleteProcessItem(index)" />
                </el-col>
              </el-row>
              <hr />
            </div>
          </el-form-item>
          <el-form-item label="节点属性" prop="station">
            <span class="action-add">
              <i
                class="el-icon-circle-plus-outline"
                @click="addStationItem()"
              />添加
            </span>
            <div
              class="form-items-label"
              v-if="form.selectPoint.station.length > 0"
            >
              <span>目标物</span>
              <span>动作</span>
            </div>
            <div
              class="form-items"
              v-for="(item, index) in form.selectPoint.station"
              :key="index"
            >
              <el-row>
                <el-col :span="9">
                  <el-select
                    v-model="form.selectPoint.station[index].target"
                    placeholder="--请选择--"
                  >
                    <el-option
                      v-for="item in form.identifierList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="9">
                  <el-select
                    v-model="form.selectPoint.station[index].action"
                    placeholder="--请选择--"
                  >
                    <el-option
                      v-for="item in form.metaTaskList"
                      :key="item.method"
                      :label="item.name"
                      :value="item.method"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2">
                  <i class="el-icon-delete" @click="deleteStationItem(index)" />
                </el-col>
              </el-row>
              <hr />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="onDelete">删除</el-button>
            <el-button type="primary" @click="onSave">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="circle" v-if="triggerPosition">
        <div class="center"></div>
        <div
          class="center-i"
          :style="{ transform: 'rotate(' + directions.omega + 'deg)' }"
          @mousedown="onContentMousedown"
          @touchstart="onContentTouchstart"
          @touchmove.stop="onContentTouchmove"
          @touchend="onContentTouchend"
        >
          <i class="el-icon-caret-right"></i>
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isEqual, isEmpty } from "lodash";
import { getFθ, getMinPoint } from "@/utils/CoordinatePickupFun.js";
let clickNum = 0;
export default {
  name: "CoordinatePickup",
  props: ["visible", "triggerPosition", "circleNeedData"],
  data() {
    return {
      top: 60,
      left: 60,
      contentTop: 60,
      contentLeft: 60,
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
        identifierList: [], // 目标物
        metaTaskList: [], // 动作
        selectPoint: { location: { omega: 0 }, process: [], station: [] }, // 选择点
      },
      // content 动态位置
      content: {
        top: 50,
        left: 40,
      },
    };
  },
  watch: {
    triggerPosition: function (newVal, oldVal) {
      const res = isEqual(newVal, oldVal);
      if (!this.circleNeedData.isTouchmoveing) {
        this.isContent = res;
      }
      return !res;
    },
  },
  mounted() {
    // 确保父元素样式
    const dom = document.getElementById(this.parentId);
    dom.style.position = "relative";
    dom.style.overflow = "auto";
  },
  updated() {
    const dom = document.getElementById(this.parentId);
    const dom1 = document.getElementById("content");
    if (!this.circleNeedData.isTouchStart) {
      if (!this.isMounseMove) {
        if (!this.isContent) {
          const layerY = (this.curLayerY = this.triggerPosition.layerY);
          const layerX = (this.curLayerX = this.triggerPosition.layerX);
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
          this.contentTop = this.curLayerY - Len2;
          this.contentLeft = this.curLayerX - Len2;
        }
      }
    } else {
      if (!this.isMounseMove) {
        const { pageX, pageY } = this.triggerPosition;
        // touch 事件拿到的位置都是相遇于视口的，对于top 和 left 需要处理偏移量和滚动距离
        if (!this.isContent) {
          if (pageX) {
            this.directions.cx = pageX - dom.offsetLeft + dom.scrollLeft;
            this.directions.cy = pageY - dom.offsetTop + dom.scrollTop;
            this.top = this.directions.cy - 33.6 / 2;
            this.left = this.directions.cx - 33.6 / 2;
            this.contentTop = this.top;
            this.contentLeft = this.left;
            this.circleData.curLayerUvX = (
              this.directions.cx / this.circleNeedData.stage.width
            ).toFixed(6);
            this.circleData.curLayerUvY = (
              this.directions.cy / this.circleNeedData.stage.height
            ).toFixed(6);
          }
        } else {
          const Len2 = 80 / 2;
          this.contentTop = this.directions.cy - Len2;
          this.contentLeft = this.directions.cx - Len2;
        }
      }
    }
    if (this.isContent) {
      //更新content 方位
      const domW = dom.clientWidth / 2;
      const domH = dom.clientHeight / 2;
      const newLeft = this.left - dom.scrollLeft;
      const newTop = this.top - dom.scrollTop;
      if (newLeft <= domW && newTop <= domH) {
        this.content.left = 40;
        this.content.top = 50;
      } else if (newLeft >= domW && newTop <= domH) {
        this.content.left = -(dom1.clientWidth - 80 / 2);
        this.content.top = 50;
      } else if (newLeft <= domW && newTop >= domH) {
        this.content.left = 40;
        this.content.top = -dom1.clientHeight + 30;
      } else if (newLeft >= domW && newTop >= domH) {
        this.content.left = -(dom1.clientWidth - 80 / 2);
        this.content.top = -dom1.clientHeight + 30;
      }
    }
  },
  methods: {
    onCircleMousedown: function () {
      // 点击已存在坐标显示已存在坐标相关数据
      const res = getMinPoint(
        this.circleNeedData.points,
        { x: this.circleData.curLayerUvX, y: this.circleData.curLayerUvY },
        this.threshold
      );
      this.updateFormData(res);
      (document.onmousemove = (el) => {
        this.isMounseMove = true;
        const { layerX, layerY, clientX, clientY } = this.triggerPosition;
        const newLayerY = (this.curLayerY =
          layerY + (el.clientY - (clientY || 0)));
        const newLayerX = (this.curLayerX =
          layerX + (el.clientX - (clientX || 0)));
        const stageWidth = this.circleNeedData.stage.width;
        const stageHeight = this.circleNeedData.stage.height;
        const Len1 = 33.6 / 2;
        this.top = newLayerY - Len1;
        this.left = newLayerX - Len1;
        this.contentTop = this.top;
        this.contentLeft = this.left;
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
    onTouchstart: function () {
      // 点击已存在坐标显示已存在坐标相关数据
      const res = getMinPoint(this.circleNeedData.points, {
        x: this.circleData.curLayerUvX,
        y: this.circleData.curLayerUvY,
      });
      this.updateFormData(res);
    },
    onTouchmove: function (e) {
      this.isMounseMove = true;
      e.preventDefault();
      const dom = document.getElementById(this.parentId);
      this.directions.cx = e.touches[0].pageX - dom.offsetLeft + dom.scrollLeft;
      this.directions.cy = e.touches[0].pageY - dom.offsetTop + dom.scrollTop;
      this.top = this.directions.cy - 33.6 / 2;
      this.left = this.directions.cx - 33.6 / 2;
      this.contentTop = this.top;
      this.contentLeft = this.left;
      this.circleData.curLayerUvX = (
        this.directions.cx / this.circleNeedData.stage.width
      ).toFixed(6);
      this.circleData.curLayerUvY = (
        this.directions.cy / this.circleNeedData.stage.height
      ).toFixed(6);
    },
    onTouchend: function () {
      this.isMounseMove = false;
    },
    ondbClick: function () {
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
        }
      }
    },
    onContentMousedown: function () {
      document.onmousemove = (el) => {
        this.isContentMounseMove = true;
        const endX = el.clientX;
        const endY = el.clientY;
        this.form.omega = this.directions.omega = getFθ(
          { x: this.directions.cx, y: this.directions.cy },
          { x: endX, y: endY }
        );
      };
      document.onmouseup = () => {
        this.isContentMounseMove = false;
        document.onmousemove = null;
      };
    },
    onContentTouchstart: function () {},

    onContentTouchmove: function (e) {
      e.preventDefault();
      const endX = e.touches[0].pageX;
      const endY = e.touches[0].pageY;
      this.form.omega = this.directions.omega = getFθ(
        { x: this.directions.cx, y: this.directions.cy },
        { x: endX, y: endY }
      );
    },
    onContentTouchend: function () {},
    onDelete() {
      // 重置form内容
      this.isContent = false;
      this.form.selectPoint = {
        location: { omega: 0 },
        process: [],
        station: [],
      };
      const obj = this.processScaleData();
      this.$emit("deleteCircleTooltipData", obj);
    },
    onSave() {
      // 传递父组件需要数据
      const obj = this.processScaleData();
      this.$emit("saveCircleTooltipData", obj);
      this.isContent = false;
    },

    processScaleData: function () {
      let point = {
        location: {
          omega: this.form.omega,
          x: this.circleData.curLayerUvX,
          y: this.circleData.curLayerUvY,
        },
        process: this.form.selectPoint.process,
        station: this.form.selectPoint.station,
      };
      // 缩放比存在时 重新更新坐标位置
      if (
        this.circleNeedData.stageScale &&
        this.circleNeedData.stagePointerPosition
      ) {
        // touch scale不等于1 时，重新你计算组件UV
        const cx =
          (this.directions.cx - this.circleNeedData.stagePointerPosition.x) /
          this.circleNeedData.stageScale;
        const cy =
          (this.directions.cy - this.circleNeedData.stagePointerPosition.y) /
          this.circleNeedData.stageScale;
        const curLayerUvX = (this.circleData.curLayerUvX = (
          cx /
          (this.circleNeedData.stage.width * this.circleNeedData.stageScale)
        ).toFixed(6));
        const curLayerUvY = (this.circleData.curLayerUvY = (
          cy /
          (this.circleNeedData.stage.height * this.circleNeedData.stageScale)
        ).toFixed(6));
        point = {
          location: {
            omega: this.form.omega,
            x: curLayerUvX,
            y: curLayerUvY,
          },
          process: this.form.selectPoint.process,
          station: this.form.selectPoint.station,
        };
        this.directions = { cx, cy };
      }

      return {
        triggerPoint: point,
        directions: this.directions,
        visible: false,
      };
    },

    // 操作form 函数
    addProcessItem: function () {
      this.form.selectPoint.process.push({ target: "", action: "" });
    },
    deleteProcessItem: function (index) {
      this.form.selectPoint.process.splice(index, 1);
    },
    addStationItem: function () {
      this.form.selectPoint.station.push({ target: "", action: "" });
    },
    deleteStationItem: function (index) {
      this.form.selectPoint.station.splice(index, 1);
    },
    updateFormData: function (res) {
      // 点击和触屏时更新导航点数据
      if (!isEmpty(res)) {
        if (!this.isContentMounseMove) {
          const location = res.value && res.value.location;
          const process = res.value && res.value.process;
          const station = res.value && res.value.station;
          if (!isEmpty(location)) {
            this.directions.omega = location.omega;
            this.form = {
              ...this.circleNeedData.form,
              omega: location.omega,
              selectPoint: {
                location: { omega: location.omega },
                process,
                station,
              },
            };
          }
        }
      } else {
        this.directions.omega = 0;
        this.form = {
          ...this.circleNeedData.form,
          selectPoint: { location: { omega: 0 }, process: [], station: [] },
        };
      }
    },
  },
  destroyed() {
    this.isMounseMove = false;
    this.isContentMounseMove = false;
    this.isContent = false;
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/style/index.scss";

.el-form {
  width: 250px;

  .el-form-item {
    margin-bottom: 10px;

    .el-input {
      width: 89%;
    }
  }

  .form-items {
    margin-left: -80px;

    .el-row:nth-child(1) {
      margin-top: 4px;
    }

    .el-col {
      margin-right: 8px;
    }

    .el-col:nth-child(1) {
      margin-right: 13px;
    }

    hr {
      height: 0.1px;
      border: none;
      background-color: #d5e0f1;
    }
  }

  .action-add,
  .el-icon-delete {
    color: blue;
  }

  .form-items-label {
    margin-left: -80px;
    background: #fdf5e6;
    color: #606266;

    span {
      display: inline-block;
      width: 37.5%;
      margin-left: 8px;
    }
  }
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
  max-height: 420px;
  overflow: auto;
}
</style>
