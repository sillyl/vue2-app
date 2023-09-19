<template>
  <div>
    <el-button @click="handleChange">切换</el-button>
    <video
      id="video"
      autoplay
      width="900"
      height="900"
      @click="onClick"
    ></video>
  </div>
</template>

<script>
import WebRtcStreamer from "./webrtcstreamer.js";
export default {
  name: "Webetc",
  data() {
    return {
      webRtcServer: null,
    };
  },
  mounted() {
    //video：需要绑定的video控件ID
    //127.0.0.1:8000：启动webrtc-streamer的设备IP和端口，默认8000
    this.webRtcServer = new WebRtcStreamer(
      "video",
      location.protocol + "//127.0.0.1:8000"
    );
    // 需要查看的rtsp地址
    this.webRtcServer.connect(
      "rtsp://zephyr.rtsp.stream/pattern?streamKey=1477c31f6088af9822a2590683495dfe" // 视频可正常显示
    );
  },
  beforeDestroy() {
    this.webRtcServer.disconnect();
    this.webRtcServer = null;
  },
  methods: {
    handleChange() {
      this.webRtcServer.connect(
        "rtsp://zephyr.rtsp.stream/movie?streamKey=a8ffd6e5cc0012345a779f4a088f9169" // 视频可正常显示
      );
    },
    onClick: function (e) {
      console.log("e", e);
    },
  },
};
</script>

<style scoped></style>
