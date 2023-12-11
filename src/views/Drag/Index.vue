<template>
  <div class="test">
    <div class="theme">
      <!--  -->
    </div>
    <main>
      <draggable v-bind="dragOptions1" class="left" v-model="dataList">
        <div
          :data-width="item.width"
          :data-height="item.height"
          :class="[
            'item',
            'item_width_' + item.width,
            'item_height_' + item.height,
            'item_' + item.component,
          ]"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="cover">
            <span>{{ item.title }}{{ item.width }}×{{ item.height }}</span>
          </div>
        </div>
      </draggable>
      <div class="right">
        <draggable v-bind="dragOptions2" class="rightBox" :list="dataList2">
          <div
            :class="[
              'item',
              'item_width_' + item.width,
              'item_height_' + item.height,
            ]"
            v-for="(item, index) in dataList2"
            :key="index"
          >
            <div class="moveDialog">
              <el-button
                type="primary"
                size="small"
                class="edit"
                @click="edit(item)"
                >编 辑</el-button
              >
              <el-button
                type="primary"
                size="small"
                class="del"
                @click="del(item)"
                >删 除</el-button
              >
            </div>
            <components
              :ref="item.component"
              :is="item.component"
              style="pointer-events: none; cursor: default"
            ></components>
          </div>
        </draggable>
      </div>
    </main>
    <el-dialog
      :visible.sync="editModal"
      class="edit-modal"
      :transfer="false"
      :title="`编辑组件信息`"
      @on-ok="submitFormEdit"
      @on-cancel="handleCancelEdit"
      :mask-closable="false"
    >
      <Form
        ref="formValidateRef"
        :model="formValidate"
        :label-width="100"
        :rules="ruleValidate"
      >
        <p style="color: gray; font-size: 12px; margin: 0 0 5px 100px">
          *（推荐宽度比例：4、8、12、16。）
        </p>
        <FormItem label="宽度比例：" prop="width">
          <InputNumber
            v-model="formValidate.width"
            placeholder="请输入宽度比例"
          ></InputNumber>
        </FormItem>
        <p style="color: gray; font-size: 12px; margin: 0 0 5px 100px">
          *（建议高度比例：大于等于当前默认高度。）
        </p>
        <FormItem label="高度比例：" prop="height">
          <InputNumber
            v-model="formValidate.height"
            placeholder="请输入高度比例"
          ></InputNumber>
        </FormItem>
      </Form>
      <p style="color: red; font-size: 12px">
        *（提示：以上给出的是较为合适的宽高比例，可酌情调整，不建议暴力调整比例。）
      </p>
      <div slot="footer" align="right">
        <el-button @click="handleCancelEdit">取 消</el-button>
        <el-button type="primary" @click="submitFormEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import red from "./Index1.vue";
import orange from "./Index1.vue";
import yellow from "./Index1.vue";
import green from "./Index1.vue";
import bfa from "./Index1.vue";
import blue from "./Index1.vue";
import purple from "./Index1.vue";
import pink from "./Index1.vue";
import fff from "./Index1.vue";
import black from "./Index1.vue";
export default {
  components: {
    red,
    orange,
    yellow,
    green,
    bfa,
    blue,
    purple,
    pink,
    fff,
    black,
    draggable,
  },
  data() {
    const widthRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入宽度比例！"));
      } else if (!/^[1-9]([0-9])*$/g.test(value)) {
        callback(new Error("只能输入正整数！"));
      } else if (value < 4) {
        callback(new Error("宽度比例不能小于4！"));
      } else if (value > 16) {
        callback(new Error("宽度比例不能大于16！"));
      } else {
        callback();
      }
    };
    const heightRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入高度比例！"));
      } else if (!/^[1-9]([0-9])*$/g.test(value)) {
        callback(new Error("只能输入正整数！"));
      } else {
        callback();
      }
    };
    return {
      // 拖拽总数据
      dataList: [
        {
          chartId: "1",
          title: "红色",
          name: "red",
          width: 4,
          height: 2,
          component: "red",
        },
        {
          chartId: "2",
          title: "橙色",
          name: "orange",
          width: 12,
          height: 2,
          component: "orange",
        },
        {
          chartId: "3",
          title: "黄色",
          name: "yellow",
          width: 16,
          height: 1,
          component: "yellow",
        },
        {
          chartId: "4",
          title: "绿色",
          name: "green",
          width: 4,
          height: 6,
          component: "green",
        },
        {
          chartId: "5",
          title: "青色",
          name: "bfa",
          width: 4,
          height: 6,
          component: "bfa",
        },
        {
          chartId: "6",
          title: "蓝色",
          name: "blue",
          width: 4,
          height: 3,
          component: "blue",
        },
        {
          chartId: "7",
          title: "紫色",
          name: "purple",
          width: 8,
          height: 3,
          component: "purple",
        },
        {
          chartId: "8",
          title: "粉色",
          name: "pink",
          width: 4,
          height: 3,
          component: "pink",
        },
        {
          chartId: "9",
          title: "白色",
          name: "fff",
          width: 12,
          height: 3,
          component: "fff",
        },
        {
          chartId: "10",
          title: "黑色",
          name: "black",
          width: 4,
          height: 3,
          component: "black",
        },
      ],
      // 生成页面数据
      dataList2: [],
      droplist: [],
      // 编辑弹窗
      editModal: false,
      // 编辑表单
      formValidate: {
        width: 4,
        height: 1,
      },
      // 编辑表单限制
      ruleValidate: {
        width: [{ required: true, validator: widthRule }],
        height: [{ required: true, validator: heightRule }],
      },
    };
  },
  computed: {
    dragOptions1() {
      return {
        animation: 300,
        group: {
          name: "group", //名称相同的分组可以相互拖拽
          pull: true, //是否允许拖出当前组
          put: true, //是否允许拖入当前组
        },
        chosenClass: "sortable-btn",
        forceFallback: true,
        handle: ".item", // 只有按住拖动手柄才能使列表单元进行拖动
      };
    },
    dragOptions2() {
      return {
        animation: 300,
        group: {
          name: "group",
          pull: false,
          put: true,
        },
        ghostClass: "ghost",
        forceFallback: true,
        handle: ".moveDialog",
      };
    },
  },
  mounted() {},
  methods: {
    watchDrag() {},
    // 编辑按钮
    edit(row) {
      this.editModal = true;
      this.formValidate = JSON.parse(JSON.stringify(row));
      console.log("this.formValidate", this.formValidate);
    },
    // 删除按钮
    del(data) {
      let dataList2 = JSON.parse(JSON.stringify(this.dataList2));
      this.dataList2 = dataList2.filter(
        (item) => item.chartId !== data.chartId
      );
      this.dataList.push(data);
    },
    // 编辑弹窗确定按钮
    submitFormEdit: function () {
      this.$refs["formValidateRef"]?.validate((valid) => {
        if (valid) {
          this.dataList2.map((item) => {
            if (item.chartId === this.formValidate.chartId) {
              item.width = this.formValidate.width;
              item.height = this.formValidate.height;
            }
            return item;
          });
          this.handleCancelEdit();
          this.$Message.success("编辑成功！");
        } else {
          console.log("检验不通过！");
        }
      });
    },
    // 编辑弹窗取消按钮
    handleCancelEdit() {
      this.editModal = false;
      this.$refs.formValidate.resetFields();
      this.formValidate = {
        width: 4,
        height: 1,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.test {
  // height: calc(100vh - 60px);
  height: 100%;
  position: relative;
  main {
    height: 100%;
    position: relative;
    padding-left: 300px;
    .left {
      position: absolute;
      left: 0;
      float: left;
      width: 280px;
      height: 100%;
      background-color: rgb(238, 238, 240);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 10px;
      .item {
        position: relative;
        height: 180px;
        margin-bottom: 10px;
        white-space: nowrap;
        cursor: pointer;
        background: rgb(239, 243, 247);
        border: 1px solid #dcdfe6;
        border-color: #dcdfe6;
        color: #606266;
        outline: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        .cover {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          transition: all 0.2s;
          width: 100%;
          text-align: center;
          background-color: #0006;
          opacity: 0;
          span {
            line-height: 180px;
            color: #fff;
            font-size: 16px;
          }
        }
        &:hover {
          .cover {
            opacity: 1;
          }
        }
      }
      .sortable-btn {
        box-shadow: 0 0 4px 4px #9992;
      }
      .item_red {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      .item_orange {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .item_yellow {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .item_green {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .item_bfa {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .item_blue {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .item_purple {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .item_pink {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .item_fff {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .item_black {
        background: url(../../assets/img/dog.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .right {
      position: relative;
      height: 100%;
      overflow: auto;
      background-color: rgb(239, 243, 247);
      .rightBox {
        height: 100%;
        position: relative;
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        grid-auto-rows: 100px;
        grid-auto-flow: row dense;
        gap: 15px;
        padding: 10px;
        // min-height: 650px;
        padding-bottom: 20px;
        .ghost {
          opacity: 0.7;
          span {
            display: none;
          }
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            padding: 8px;
            cursor: pointer;
            // background-color: red;
          }
          &::after {
            content: "(^_^)~";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .item {
          position: relative;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 0 2px 2px #9991;
          .edit {
            display: none;
            position: absolute;
            top: 10px;
            right: 75px;
            line-height: 20px;
            cursor: pointer;
          }
          .del {
            display: none;
            position: absolute;
            top: 10px;
            right: 10px;
            line-height: 20px;
            cursor: pointer;
          }
          .moveDialog {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: gray;
            z-index: 999;
          }
          .contentBox {
            pointer-events: none;
            cursor: default;
          }
        }
        .item:hover {
          .edit {
            display: block;
            opacity: 1;
          }
          .del {
            display: block;
            opacity: 1;
          }
          .moveDialog {
            opacity: 0.9;
          }
        }
        .item_width_1 {
          grid-column-start: span 1;
          width: 100%;
        }
        .item_width_2 {
          grid-column-start: span 2;
          width: 100%;
        }
        .item_width_3 {
          grid-column-start: span 3;
          width: 100%;
        }
        .item_width_4 {
          grid-column-start: span 4;
          width: 100%;
        }
        .item_width_5 {
          grid-column-start: span 5;
          width: 100%;
        }
        .item_width_6 {
          grid-column-start: span 6;
          width: 100%;
        }
        .item_width_7 {
          grid-column-start: span 7;
          width: 100%;
        }
        .item_width_8 {
          grid-column-start: span 8;
          width: 100%;
        }
        .item_width_9 {
          grid-column-start: span 9;
          width: 100%;
        }
        .item_width_10 {
          grid-column-start: span 10;
          width: 100%;
        }
        .item_width_11 {
          grid-column-start: span 11;
          width: 100%;
        }
        .item_width_12 {
          grid-column-start: span 12;
          width: 100%;
        }
        .item_width_13 {
          grid-column-start: span 13;
          width: 100%;
        }
        .item_width_14 {
          grid-column-start: span 14;
          width: 100%;
        }
        .item_width_15 {
          grid-column-start: span 15;
          width: 100%;
        }
        .item_width_16 {
          grid-column-start: span 16;
          width: 100%;
        }
        .item_height_1 {
          grid-row-start: span 1;
          // line-height: 100px;
        }
        .item_height_2 {
          grid-row-start: span 2;
          // line-height: 200px;
        }
        .item_height_3 {
          grid-row-start: span 3;
          // line-height: 300px;
        }
        .item_height_4 {
          grid-row-start: span 4;
          // line-height: 400px;
        }
        .item_height_5 {
          grid-row-start: span 5;
          // line-height: 400px;
        }
        .item_height_6 {
          grid-row-start: span 6;
          // line-height: 400px;
        }
        .item_height_7 {
          grid-row-start: span 7;
          // line-height: 400px;
        }
        .item_height_8 {
          grid-row-start: span 8;
          // line-height: 400px;
        }
        .item_height_9 {
          grid-row-start: span 9;
          // line-height: 400px;
        }
        .item_height_10 {
          grid-row-start: span 10;
          // line-height: 400px;
        }
        .item_height_11 {
          grid-row-start: span 11;
          // line-height: 400px;
        }
        .item_height_12 {
          grid-row-start: span 12;
          // line-height: 400px;
        }
        .item_height_13 {
          grid-row-start: span 13;
          // line-height: 400px;
        }
        .item_height_14 {
          grid-row-start: span 14;
          // line-height: 400px;
        }
        .item_height_15 {
          grid-row-start: span 15;
          // line-height: 400px;
        }
        .item_height_16 {
          grid-row-start: span 16;
          // line-height: 400px;
        }
      }
    }
  }
}
</style>
