<template>
  <div class="custom_tree_table">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span
          class="tree_label"
          v-for="(val, key, index) in data.labels"
          :key="key"
          :style="cuWidth(key, data, node, node.isLeaf, index)"
        >
          <span
            v-if="key !== 'action'"
            :class="[
              'node-label',
              key === 'name' ? 'node-label-' + node.level : '',
            ]"
            :style="{
              'padding-left': pdLeft,
            }"
          >
            {{ val || "-" }}
          </span>
          <span v-else>
            <slot
              name="actionNode"
              :config="{ action: val, rowData: data }"
            ></slot>
          </span>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      pdLeft: "0px",
    };
  },
  methods: {
    cuWidth: function (key, data, node, isLeaf, index) {
      const labels = data.labels;
      const level = node.level;
      const len = Object.keys(labels).length;
      let wth = 100 / len + "%";
      let basicW = 100 / len + "%";
      let mgl = "0px";
      this.pdLeft = "0px";
      const c = 18 / len;
      const cc = 36 / len;
      if (!isLeaf && level > 1) {
        wth = `calc(${basicW} + ${c}px)`;
        if (index === 0) {
          mgl = "-18px";
          if (level === 2) {
            this.pdLeft = "18px";
          }
        } else {
          this.pdLeft = "0px";
        }
      } else if (isLeaf && level >= 3) {
        wth = `calc(${basicW} + ${cc}px)`;
        if (index === 0) {
          mgl = "-36px";
          if (level === 3) {
            this.pdLeft = "36px";
          }
        }
      } else if (isLeaf && level === 2) {
        wth = `calc(${basicW} + ${c}px)`;
        if (index === 0) {
          mgl = "-18px";
          if (level === 2) {
            this.pdLeft = "18px";
          }
        }
      }
      return { width: wth, "margin-left": mgl };
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.custom_tree_table {
  height: 100%;
}

.el-tree {
  height: 100%;
  overflow: auto;
}

::v-deep {
  .el-tree-node__content {
    display: inherit;
    height: auto;
  }
}

.custom-tree-node {
  width: 100%;
  display: inline-block;
  font-size: 14px;
  padding-right: 8px;
  margin: 6px;

  .tree_label {
    display: inline-block;
    margin: 2px;
  }

  .node-label {
    word-break: break-all;
    display: inline-block;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>
