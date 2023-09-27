<template>
  <div class="container">
    <div class="control_1">
      <a>input http server:</a
      ><input type="text" v-model="httpServer" placeholder="请输入服务端地址" />
    </div>
    <div class="control_2">
      <a>input rtsp url:</a
      ><input type="text" v-model="rtspUrl" placeholder="请输入rtsp流地址" />
    </div>
    <button style="margin-top: 15px" @click="playVideo">
      准备好了点击播放视频
    </button>
    <div class="videoPlay">
      <video
        id="video"
        class="video-js"
        style="object-fit: fill; width: 500px; height: 500px"
        controls
        autoplay
        autobuffer
        muted
        preload="auto"
      ></video>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import videojs from "video.js";
import WebRtcStreamer from "./webrtcstreamer.js";
import "./adapter.min.js";
import "./jquery-3.5.1.min.js";
export default {
  name: "TailwindCSSDaisyUIHomeView",

  data() {
    return {
      httpServer: "",
      rtspUrl: "rtsp://admin:@192.168.1.127:554/channel=1&stream=0",
      player: null,
      webRtcServer: null,
      videoSeting: {
        language: "zh-CN",
        autoplay: true, // true/false 播放器准备好之后，是否自动播放 【默认false】
        controls: true, // /false 是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
        /* height: 100, // 视频容器的高度，字符串或数字 单位像素 比如： height:300 or height:‘300px‘
         width: 100, // 视频容器的宽度, 字符串或数字 单位像素*/
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
    var b = a.split(":");
    this.httpServer = `${b[0]}:${b[1]}:8000`;
    console.log("httpServer", this.httpServer);
    // 初始化webrec服务
    this.webRtcServer = new WebRtcStreamer("video", this.httpServer);
  },

  methods: {
    playVideo() {
      this.webRtcServer.connect(this.rtspUrl);
      // 初始化播放器
      this.getVideo();
    },
    getVideo() {
      //this.videoSeting
      let that = this;
      this.player = videojs(
        "video",
        this.videoSeting,
        function onPlayerReady() {
          videojs.log("Your player is ready!");
          this.on("loadstart", function () {
            console.log("开始请求数据 ");
          });
          this.on("progress", function () {
            console.log("正在请求数据 ");
          });
          this.on("loadedmetadata", function () {
            console.log("获取资源长度完成 ");
          });
          this.on("canplaythrough", function () {
            console.log("视频源数据加载完成");
          });
          this.on("waiting", function () {
            console.log("等待数据");
          });
          this.on("play", function () {
            console.log("视频开始播放");
          });
          this.on("playing", function () {
            console.log("视频播放中");
          });
          this.on("pause", function () {
            console.log("视频暂停播放");
            that.webRtcServer.disconnect();
          });
          this.on("ended", function () {
            console.log("视频播放结束");
          });
          this.on("error", function () {
            console.log("加载错误");
          });
          this.on("seeking", function () {
            console.log("视频跳转中");
          });
          this.on("seeked", function () {
            console.log("视频跳转结束");
          });
          this.on("ratechange", function () {
            console.log("播放速率改变");
          });
          this.on("timeupdate", function () {
            console.log("播放时长改变");
          });
          this.on("volumechange", function () {
            console.log("音量改变");
          });
          this.on("stalled", function () {
            console.log("网速异常");
          });
        }
      );
    },
  },
};
</script>

<style>
.control_1 {
  display: block;
  /* margin-top: 20px; */
}
.control_2 {
  display: block;
  margin-top: 15px;
}
.videoPlay {
  width: 500px;
  height: 500px;
  margin: 15px auto;
}
.video-js {
  width: 100%;
  height: 100%;
}

.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -1em;
}
.vjs-loading-spinner:before,
.vjs-loading-spinner:after {
  content: "";
  position: absolute;
  margin: -6px;
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  opacity: 1;
  border: inherit;
  border-color: transparent;
  border-top-color: white;
  display: none;
}
</style>
