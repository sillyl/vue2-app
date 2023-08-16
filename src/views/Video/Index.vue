<template>
  <div>
    <VideoPlayer :isShow="isShow" />
    <el-radio-group v-model="radioVal" @change="onChangeRadio">
      <el-radio :label="0">浮窗模式</el-radio>
      <el-radio :label="1">分屏模式</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer/Index.vue";
export default {
  data() {
    return {
      radioVal: 0,
      isShow: true,
    };
  },
  components: {
    VideoPlayer,
  },
  methods: {
    onChangeRadio: function (e) {
      if (e === 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>
