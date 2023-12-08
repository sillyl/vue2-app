<template>
  <div>
    <iframe
      src="http://ip:port/play.html?channel=1&aspect=fullscreen"
      allowfullscreen
      allow="autoplay; fullscreen"
    ></iframe>
    <canvas id="cvs"></canvas>
    <el-button type="button" onclick="wsavc.playStream()"
      >Start Video</el-button
    >
    <el-button type="button" onclick="wsavc.stopStream()">Stop Video</el-button>
    <el-button type="button" onclick="wsavc.disconnect()">Disconnect</el-button>
  </div>
</template>
<script>
// import WSAvcPlayer from "h264-live-player/wsavc/index.js";
export default {
  mounted() {
    this.init();
  },
  methods: {
    init: function () {
      const cvs = document.querySelector(".cvs");
      // var wsavc = new WSAvcPlayer(cvs, "webgl", 1, 35);
      // wsavc.connect("ws://localhost:8090/cpix/v1.0/websocket/device-video/3-0");
    },
  },
};
</script>

<style lang="scss" scoped></style>
