<template>
  <div class="liveView">
    <video-player
      class="vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      @ready="onPlayerReadied"
      @timeupdate="onTimeupdate"
    >
    </video-player>
    <div class="inputWrapper">
      <div class="form-group row">
        <label for="" class="col-sm-4 col-form-label">HLS: </label>
        <div class="col-sm-8">
          <input
            class="form-control"
            type="text"
            placeholder="HLS url here"
            v-model="streams.hls"
          />
        </div>
      </div>
    </div>
    <div class="buttonWrapper">
      <el-button class="btn btn-primary" type="button" @click="enterStream">
        Apply
      </el-button>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls";
import "videojs-flash";
export default {
  name: "live",
  components: { videoPlayer },
  data() {
    return {
      initialized: false,
      currentTech: "",
      streams: { rtmp: "", hls: "" },
      playerOptions: {
        overNative: true,
        autoplay: false,
        controls: true,
        techOrder: ["flash", "html5"], // 兼容顺序
        sourceOrder: true,
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        sources: [
          {
            withCredentials: false,
            type: "video/rtmp",
            src: "rtmp://ns8.indexforce.com/home/mystream",
          },
          // {
          //   withCredentials: false,
          //   type: "application/x-mpegURL",
          //   src: "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8",
          // },
        ],
        controlBar: {
          timeDivider: false,
          // 时间分割线
          durationDisplay: false,
          // 总时间
          progressControl: true, // 进度条
          customControlSpacer: true, // 未知
          fullscreenToggle: true, // 全屏//
        },
      },
    };
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    onPlayerReadied() {
      if (!this.initialized) {
        this.initialized = true;
        this.currentTech = this.player.techName_;
      }
    },
    // record currenttime
    onTimeupdate(e) {
      console.log("currentTime", e.cache_.currentTime);
    },
    enterStream() {
      this.playerOptions.sources[0].src =
        this.streams.hlsthis.playerOptions.autoplay = true;
    },
    changeTech() {
      if (this.currentTech === "Html5") {
        this.playerOptions.techOrder = ["html5"];
      } else if (this.currentTech === "Flash") {
        this.playerOptions.techOrder = ["flash"];
      }
      this.playerOptions.autoplay = true;
    },
  },
};
</script>
<style scoped>
.liveView {
  position: relative;
}
.selectWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 30px;
  margin: 20px;
  vertical-align: baseline;
}
.inputWrapper {
  width: 500px;
  margin: 0 auto;
}
.buttonWrapper {
  text-align: center;
}
</style>
