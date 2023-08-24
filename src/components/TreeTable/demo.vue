<template>
  <TreeTable :data="data">
    <template v-slot:actionNode="configProps">
      <span v-if="actionTypeArray">
        <span v-for="i in configProps.config.action" :key="i.val">
          <span class="action-i" @click="onAction(configProps, i)">
            {{ i.val }}
          </span>
        </span>
      </span>
      <span v-else class="action-i" @click="onAction(configProps)">
        {{ actionTxt(configProps) }}</span
      >
      <!-- <span v-html=" htmlString"></span> -->
    </template>
  </TreeTable>
</template>
<script>
import TreeTable from "@/components/TreeTable/Index.vue";
import { judgmentType } from "@/utils/CoordinatePickupFun.js";
export default {
  components: {
    TreeTable,
  },
  // String
  // action: "重启"
  // 对象：
  // action: {
  //     id: 1,
  //     val: '重启'
  // },
  data() {
    return {
      configProps: {},
      // htmlString: "",
      actionTypeArray: false,
      data: [
        {
          id: 1,
          labels: {
            name: "名称",
            status: "状态",
            other: "test",
            action: [
              {
                val: "操作",
              },
            ],
          },
          children: [
            {
              id: 4,
              labels: {
                name: "机械臂",
                status: "异常",
                other: "test",
                action: [
                  {
                    id: 1,
                    val: "重启",
                  },
                ],
              },
              children: [
                {
                  id: 9,
                  labels: {
                    name: "rrr",
                    status: "异常",
                    other: "test",
                    action: [
                      {
                        id: 1,
                        val: "重启",
                      },
                    ],
                  },
                },
                {
                  id: 10,
                  labels: {
                    name: "Grasp_Coordinate1-1-2",
                    status: "异常",
                    other: "test",
                    action: [
                      {
                        id: 0,
                        val: "重建",
                      },
                      {
                        id: 1,
                        val: "重启",
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: 5,
              labels: {
                name: "机械臂",
                status: "异常",
                other: "test",
                action: [
                  {
                    id: 1,
                    val: "重启",
                  },
                ],
              },
              children: [
                {
                  id: 19,
                  labels: {
                    name: "rrr",
                    status: "异常",
                    other: "test",
                    action: [
                      {
                        id: 1,
                        val: "重启",
                      },
                    ],
                  },
                },
                {
                  id: 110,
                  labels: {
                    name: "Grasp_Coordinate1-1-2  Grasp_Coordinate1-1-2",
                    status: "异常",
                    other: "test",
                    action: [
                      {
                        id: 1,
                        val: "重启",
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    actionTxt: function (configProps) {
      const { action } = configProps.config;
      const type = judgmentType(action);
      switch (type) {
        case "String":
          return action;
        case "Array":
          // this.htmlString = `${action.map((i)=>{
          //     return `<span class="action-i" @click="onAction(configProps)">${i.val}<span>`
          // })}`;
          this.actionTypeArray = true;
          return;
        case "Object":
          return action.val;
        default:
          return "-";
      }
    },
    onAction: function (configProps, item) {
      // item只有数组类型才会有
      const { action, rowData } = configProps.config;
      console.log("item", item, action, rowData);
      //请求接口处理逻辑
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/common.scss";

.action-i {
  margin-left: 10px;
}

::v-deep {
  .el-tree-node__children {
    .el-tree-node {
      .custom-tree-node {
        .tree_label {
          .action-i {
            color: $primary-color;
          }
        }
      }
    }
  }
}
</style>
