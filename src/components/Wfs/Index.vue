<template>
  <div
    class="video-player"
    id="video-player"
    :style="{ top: top + 'px', left: left + 'px' }"
    v-if="isShow"
  >
    <div
      class="video-player-header"
      id="video-player-header"
      @mousedown="onCircleMousedown"
    >
      <span class="video-player-header-x" @click="onClickClosed">x</span>
    </div>
    <div class="video-player-content" @click="onClickVideo">
      <video
        :id="id"
        ref="video"
        muted
        autoplay
        controls="controls"
        disablePictureInPicture
        controlsList="nodownload noremoteplayback noplaybackrate"
        src="http://localhost:9000/cc"
        style="width: 100%; height: 100%"
      >
        <!-- src="https://video.pearvideo.com/mp4/short/20200209/cont-1650197-14888002-hd.mp4" -->
        <track srclang="zh-cn" kind="subtitles" default src="./fractions.vtt" />
        你的浏览器不支持 video 标签
      </video>
    </div>
  </div>
</template>
<script>
/* 
  nodownload 隐藏下载
  nofullscreen 隐藏全屏
  noplaybackrate 隐藏播放速度
  noremoteplayback 隐藏远程回放
  disablePictureInPicture 禁用画中画
*/
export default {
  props: ["videoId", "isShow"],
  data() {
    return {
      id: this.videoId || "video-id",
      top: 0,
      left: 0,
      isFull: false,
      isClosed: this.isShow || false,
    };
  },
  methods: {
    onClickClosed: function () {
      const dom = document.getElementById("video-player");
      dom.style.display = "none";
    },
    onCircleMousedown: function () {
      const dom = document.getElementById("video-player-header");
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
    onClickVideo: function () {
      console.log("this.$ref", this.$refs.video.style);
      if (this.$refs.video) {
        const wid = this.$refs.video.videoWidth;
      }
    },
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
    &-x {
      float: right;
      margin: 0 16px;
    }
  }
  &-content {
    position: relative;
  }
}
video::-webkit-media-controls-mute-button,
video::-webkit-media-controls-time-remaining-display,
video::-webkit-media-controls-current-time-display,
video::-webkit-media-controls-play-button,
video::-webkit-media-controls-timeline,
video::-webkit-media-controls-volume-control-hover-background,
video::-webkit-media-controls-volume-slider {
  display: none;
}
</style>
