<template>
  <div class='page_navigator'>
    <div class='page_navigator_breadcrumb'>
      <el-page-header @back="goBack" title='' />
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for='(item, index) in itemProps' :key='index' :to="item.path && {path: item.path}">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='page_navigator_content'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageNavigator',
  props: ['itemProps'],
  methods: {
    goBack () {
      this.$router.go(-1) // 或者   this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './Index.scss'
</style>
