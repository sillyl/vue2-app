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
// https://blog.csdn.net/qq_20937557/article/details/129879697#comments_28845108
import WebRtcStreamer from "./webrtcstreamer.js";
import "./adapter.min.js";
import "./jquery-3.5.1.min.js";
export default {
  name: "Webrtc",
  data() {
    return {
      webRtcServer: null,
    };
  },
  mounted() {
    //video：需要绑定的video控件ID
    //127.0.0.1:8000：启动webrtc-streamer的设备IP和端口，默认8000
    // ws://localhost:8090/cpix/v1.0/websocket/device-video/3-0
    this.webRtcServer = new WebRtcStreamer(
      "video",
      location.protocol + "//127.0.0.1:8000"
    );
    // 需要查看的rtsp地址
    this.webRtcServer.connect(
      "rtsp://admin:@192.168.1.127:554/channel=1&stream=0" // 视频可正常显示
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
