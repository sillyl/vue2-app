<template>
  <div class="box">
    <section
      id="video"
      class="video-js vjs-default-skin"
      ref="viodeRef"
    ></section>
  </div>
</template>
<script>
import Video from "video.js";
import "video.js/dist/video-js.css";
export default {
  name: "video-play-box",
  mounted() {
    this.player = Video(
      "video",
      {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player api。
        controls: true,
        //自动播放属性,muted:静音播放
        muted: false,
        autoplay: true,
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "500px",
        // poster: 'https://1eqimg.oss-cn-shenzhen.aliyuncs.com/upload/20230428/kxxqn0rx1tl.png', // 封面图片
        sources: [
          {
            src: "rtmp://58.200.131.2:1935/livetv/cctv3",
            type: "video/rtmp",
          },
        ],

        playbackRates: [0.5, 1, 1.5, 2], //倍速播放
      },
      function onPlayerReady() {
        Video.log("Your player is ready!"); // 比如： 播放量+1请求
        this.on("ended", function () {
          Video.log("Awww...over so soon?!");
        });
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .video {
    margin: 0 auto;
  }
}
</style>
