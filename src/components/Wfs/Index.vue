<template>
  <div class="video_player_wfs" :id="videoId" :style="{ top, left }">
    <div class="video_player_wfs_header" @mousedown="onCircleMousedown(id)">
      <span>{{ videoCheckBox[id] }}</span>
      <span
        v-if="!isFullScreen"
        class="video_player_wfs_header-x"
        @click="onClickClosed($event, id)"
        >x</span
      >
    </div>
    <div
      class="video_player_wfs_content"
      :id="'video_player_wfs_content_' + id"
    >
      <video :id="id" muted autoplay crossorigin>
        你的浏览器不支持 video 标签
      </video>
      <i
        :class="[isFullScreen ? 'icon-shrink' : 'icon-enlarge']"
        @click="onIsFullScereen(id)"
      />
    </div>
  </div>
</template>

<script>
import { videoCheckBox } from "@/constants";
export default {
  props: ["id", "curTop", "curLeft"],
  data() {
    return {
      videoId: `video_player_wfs_${this.id}` || "video_player_wfs",
      top: this.curTop || "0px",
      left: this.curLeft || "30%",
      videoCheckBox,
      isFullScreen: false,
    };
  },
  mounted() {
    this.startWfs();
  },
  methods: {
    onClickClosed: function (e, id) {
      e.stopPropagation();
      const dom = document.getElementById(`video_player_wfs_${id}`);
      dom.style.display = "none";
      this.$emit("closedVideoId", id);
    },
    onCircleMousedown: function (id) {
      const dom = document.getElementById(`video_player_wfs_${id}`);
      let width = 300 / 2;
      let height = 200 / 2;
      if (dom) {
        width = dom.offsetWidth / 2;
        height = dom.offsetHeight / 2;
      }
      (document.onmousemove = (el) => {
        this.left = el.clientX - width + "px"; // 保持中心位置拖拽
        this.top = el.clientY - height + "px";
      }),
        (document.onmouseup = () => {
          document.onmousemove = null;
        });
    },

    onIsFullScereen: function (id) {
      if (!this.isFullScreen) {
        const dom = document.querySelector(`#${this.videoId}`);
        dom.requestFullscreen();
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
      this.isFullScreen = !this.isFullScreen;
    },
    startWfs: function () {
      if (Wfs.isSupported()) {
        const videoFps = 35;
        const videoDom = document.querySelector(`#${this.id}`);
        const wfs = new Wfs();
        wfs.attachMedia(
          videoDom,
          "3-0",
          "H264Raw",
          "ws://localhost:8090/cpix/v1.0/websocket/device-video/3-0",
          videoFps
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$prefixCls: "video_player_wfs";
.#{$prefixCls} {
  width: 300px;
  border: 1px solid rgb(58, 58, 68);
  position: absolute;
  cursor: pointer;
  &_header {
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #8ec5fc;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
    &-x {
      float: right;
      margin: 0 16px;
      font-size: 20px;
    }
  }

  &_content {
    background: rgb(54, 54, 54);
    height: calc(100% - 32px);
    video {
      width: 100%;
      height: 100%;
    }
    i {
      bottom: 10px;
      position: absolute;
      right: 8px;
      color: #ccc;
      font-size: 20px;
    }
  }
}
</style>
