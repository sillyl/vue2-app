<template>
  <el-empty description="The route is not exist(404)" :image="img">
    <slot></slot>
  </el-empty>
</template>
<script>
export default {
  props: ["desc", "image"],
  data() {
    return {
      img: this.image || "", // 父组件需要使用require传递image,譬如:image="require('@/assets/img/logo.png')"
      description: this.desc || "The route is not exist(404)",
    };
  },
};
</script>
<style lang="scss" scoped>
.el-empty {
  width: 100%;
  height: 100%;
}
</style>
