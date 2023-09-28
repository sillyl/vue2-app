<template>
  <video id="player" :controls="false" :muted="false" :autoplay="true"></video>
</template>
<script>
import JMuxer from "jmuxer";
let jmuxer = null;
export default {
  data() {
    return {
      ws: null,
      list: [],
      isDisable: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      jmuxer = new JMuxer({
        node: "player",
        // 可用值是:video、audio
        mode: "video",
        // 最大延迟时间(毫秒), 默认为值是500毫秒
        maxDelay: 100,
        // 缓冲区刷新时间,默认为值是500毫秒
        flushingTime: 0,
        // 是否会自动清除播放的媒体缓冲区。默认为true
        clearBuffer: true,
        // 可选值。视频的帧率，如果它是已知的或固定值。如果所提供的媒体数据中没有块持续时间，它将用于查找帧持续时间。
        fps: 35,
        // 将从MP4轨道数据读取FPS，而不是使用(以上)FPS值。默认为false。
        readFpsFromTrack: false,
        // 将在浏览器控制台打印调试日志。默认为false
        debug: false,
        // 遇到任何丢失的视频帧将会被触发
        onMissingVideoFrames: function (data) {
          // console.log("丢失的视频帧", data);
        },
        onError: function (data) {
          if (
            /Safari/.test(navigator.userAgent) &&
            /Apple Computer/.test(navigator.vendor)
          ) {
            jmuxer.reset();
          }
        },
      });
      this.ws = new WebSocket(
        "ws://localhost:8090/cpix/v1.0/websocket/device-video/3-0"
      );
      this.ws.binaryType = "arraybuffer";
      this.ws.onmessage = function (event) {
        jmuxer.feed({ video: new Uint8Array(event.data) });
      };
      this.ws.onopen = function () {
        console.log("已连接");
        this.ws.send("{ t: 'close', c: '3-0', v: 'NA' }");
      };
      this.ws.onerror = function (err) {
        console.log("出错--Socket Error", err);
      };
      this.ws.onclose = function () {
        console.log("断开");
      };
    },

    // 实现拍照功能
    toScan: () => {
      const videoEl = document.getElementById("player");
      const canvas = document.createElement("canvas");
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight);
      console.log(canvas.toDataURL("image/png"));
    },
  },
};
</script>
