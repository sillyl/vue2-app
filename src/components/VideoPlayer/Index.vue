<template>
  <div
    class="video-player"
    id="video-player"
    :style="{ top: top + 'px', left: left + 'px' }"
    v-if="isShow"
  >
    <div class="video-player-header" @mousedown="onCircleMousedown">
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
import SWF_URL from "videojs-swf/dist/video-js.swf";
import Hammer from "hammerjs";
export default {
  name: "VideoPlayer",
  props: ["isShow"],
  data() {
    return {
      top: 0,
      left: 0,
      isClosed: this.isShow || false,
      playerOptions: {
        // playbackRates: [1.0, 1.5, 2.0],
        // 如果为true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 是否视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        // sources: [{
        //   type: "video/mp4", // 类型
        //   src: "https://video.pearvideo.com/mp4/short/20200209/cont-1650197-14888002-hd.mp4" // url地址
        // }],
        // sources: [{
        //   type: 'rtmp/mp4',
        //   src: 'rtmp://58.200.131.2:1935/livetv/hunantv' // 亲测可用
        // }],
        sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
          type: 'rtmp/mp4',
          src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
        }, {
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
        }],
        techOrder: ['html5', 'flash'], // 兼容顺序
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        sourceOrder: true,
        // flash: {
        //   swf: SWF_URL
        // },
        // 封面地址
        poster: "",
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
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
