<template>
  <i class="el-icon-document-copy" @click="onClickIcon"></i>
</template>

<script>
import { Message } from "element-ui";
export default {
  props: ["copyData"],
  methods: {
    onClickIcon: function () {
      const copyInput = document.createElement("input"); // 创建input元素
      document.body.appendChild(copyInput); // 向页面底部追加输入框
      copyInput.setAttribute("value", this.copyData); // 添加属性，将url赋值给input元素的value属性
      copyInput.select(); // 选择元素
      document.execCommand("Copy"); // 执行复制命令
      Message.success(`复制 ${this.copyData} 成功`);
      copyInput.remove(); //复制后删除该元素
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.el-icon-document-copy {
  color: $title-color;
}
</style>
