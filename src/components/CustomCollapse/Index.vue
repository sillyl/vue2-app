<template>
  <div class="custom_collapse" :style="{ height: isCollapse ? '33%' : '22px' }">
    <div
      class="custom_collapse_btn"
      @click="onClick"
      :title="isCollapse ? '收起' : '展开'"
    >
      <i
        class="el-icon-d-arrow-left"
        :style="{
          transform: isCollapse ? 'rotate(-90deg)' : 'rotate(90deg)',
          transition: '0.3s',
        }"
      ></i>
    </div>
    <div class="custom_collapse_content" v-if="isCollapse">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="js">

export default {
data(){
  return{
    isCollapse: true
  }
},
methods:{
  onClick: function(){
    this.isCollapse=!this.isCollapse;
  }
}
}
</script>

<style lang="scss" scoped>
@import "./Index.scss";
</style>
