<template>
  <div
    class="video-player"
    id="video-player"
    @mousedown="onCircleMousedown"
    :style="{ top: top + 'px', left: left + 'px' }"
    v-if="isShow"
  >
    <div class="video-player-header">
      <span class="video-player-header-x" @click="onClickClosed">x</span>
    </div>
    <div class="video-player-content">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
import { videoPlayer } from "vue-video-player";
import "videojs-flash";
import Hammer from 'hammerjs';
export default {
  name: "VideoPlayer",
  props: ["isShow"],
  data() {
    return {
      top: 0,
      left: 0,
      isClosed: this.isShow || false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "rtmp/mp4", // 类型
          src: "rtmp://58.200.131.2:1935/livetv/hunantv" // url地址
        }],
        techOrder: ['flash'],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    }
  },
  components:{
    videoPlayer
  },
  methods: {
    onClickClosed: function(){
      const dom = document.getElementById("video-player");
      dom.style.display = "none"
    },
    onCircleMousedown: function () {
      const dom = document.getElementById("video-player");
      let width = 300 / 2;
      let height = 200 / 2;
      if (dom) {
        width = dom.offsetWidth / 2;
        height = dom.offsetHeight / 2;
      }
      (document.onmousemove = (el) => {
        this.left = el.clientX - width; // 保持中心位置拖拽
        this.top = el.clientY - height;
      }),
      (document.onmouseup = () => {
        document.onmousemove = null;
      });
    },
  },
  destroyed() {
  // 
  },
};
</script>
<style lang="scss" scoped>
$className: "video-player";
.#{$className} {
  width: 300px;
  border: 1px solid rgb(58, 58, 68);
  position: absolute;
  cursor: pointer;
  &-header {
    width: 300px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #8ec5fc;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
    &-x{
      float: right;
      margin: 0 16px;
    }
  }
}

</style>
