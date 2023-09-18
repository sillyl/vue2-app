<!-- * @Description: rtsp视频播放-->
<template>
  <div class="webrtcSteamer s-fill s-flex">
    <video
      id="video"
      class="video-js"
      controls
      autoplay
      autobuffer
      muted
      preload="auto"
    ></video>
  </div>
</template>
<script>
import WebRtcStreamer from "./webrtcstreamer.js";
export default {
  props: {
    scale: { type: Number, required: true },
    videoUrl: { type: String, required: true },
  },
  data() {
    return {
      httpServer: "",
      rtspUrl: this.videoUrl,
      player: null,
      webRtcServer: null,
      videoSeting: {
        language: "zh-CN",
        autoplay: true, // true/false 播放器准备好之后，是否自动播放 【默认false】
        controls: true, // /false 是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
        loop: false, // /false 视频播放结束后，是否循环播放
        muted: true, // /false 是否静音
        poster: "", // 播放前显示的视频画面，播放开始之后自动移除。通常传入一个URL
        preload: "auto", // 预加载   ‘auto‘ 自动   ’metadata‘ 元数据信息 ，比如视频长度，尺寸等 ‘none‘ 不预加载任何数据，直到用户开始播放才开始下载
        bigPlayButton: true,
      },
    };
  },
  mounted() {
    var a = `${window.location.href}`;
    var b = a.split(":"); // webrtc-streamer 服务开启的地址
    this.httpServer = `${b[0]}:${b[1]}:8000/` || `http://192.168.5.123:8000`;
    console.log(
      " ///////////////////////////////////this.httpServer ",
      this.httpServer
    );
    // 初始化webrec服务
    this.webRtcServer = new WebRtcStreamer("video", this.httpServer);
    this.webRtcServer.connect(this.rtspUrl);
  },
  methods: {
    playVideo() {
      this.webRtcServer.connect(this.rtspUrl);
    },
  },
};
</script>
<style lang="scss" scoped>
.webrtcSteamer {
  height: 100%;
  width: 100%;
  &-num {
    color: #06fbfc;
    font-weight: 500;
    font-family: "PingFang SC";
  }
}
.video-js {
  width: 100%;
  height: 100%;
}
</style>
