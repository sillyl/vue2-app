<template>
  <div>
    <!-- <VideoPlayer :isShow="isShow" /> -->
    <WFS :isShow="isShow" />
    <el-radio-group v-model="radioVal" @change="onChangeRadio">
      <el-radio :label="0">浮窗模式</el-radio>
      <el-radio :label="1">分屏模式</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer/Index.vue";
import WFS from "@/components/Wfs/Index.vue";
export default {
  data() {
    return {
      radioVal: 0,
      isShow: true,
    };
  },
  components: {
    // VideoPlayer,
    WFS,
  },
  methods: {
    onChangeRadio: function (e) {
      if (e === 0) {
        this.isShow = true;
        window.onload = function () {
          if (Wfs.isSupported()) {
            var video1 = document.getElementById("video-id");
            var wfs = new Wfs();
            wfs.attachMedia(
              video1,
              "",
              "H264Raw",
              "ws://localhost:8090/cpix/v1.0/websocket/device-video/402888ef891e589101891e5ecde00001-0"
            );
          }
        };
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>
