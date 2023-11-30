<template>
  <div>
    <video
      crossOrigin="anonymous"
      src="https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4"
      width="550"
      autoplay
      controls
      @loadedmetadata="onloadedmetadata"
    ></video>
    <div class="controls">
      <el-button type="primary" @click="handleScreenshot">截图</el-button>
      <el-button
        type="primary"
        @click="handleRecording"
        :icon="recording ? 'el-icon-loading' : ''"
        >{{ recording ? "录制中" : "录制" }}</el-button
      >
      <el-button type="primary" @click="reset">重置</el-button>
    </div>

    <div class="preview">
      <div class="preview-box">
        <img v-if="imgUrl" width="550" :src="imgUrl" alt="" />
        <span v-else>截图预览</span>
      </div>
      <div class="preview-box">
        <video
          v-if="videoUrl"
          :src="videoUrl"
          width="550"
          autoplay
          controls
        ></video>
        <span v-else>录制预览</span>
      </div>
    </div>
  </div>
</template>

<script>
var mediaRecorder; // MediaRecorder对象
export default {
  data() {
    return {
      imgUrl: "", // 截图地址
      recording: false, // 是否录制中
      videoData: [], // 视频流数据
      videoUrl: "", // 录制的视频地址
    };
  },
  methods: {
    // 重置
    reset() {
      this.imgUrl = this.videoUrl = "";
      this.recording = false;
    },
    // 截图
    handleScreenshot() {
      let video = document.getElementsByTagName("video")[0]; // 获取video节点
      let canvas = document.createElement("canvas"); // 创建canvas节点
      let w = window.innerWidth;
      let h = (window.innerWidth / 16) * 9;
      canvas.width = w;
      canvas.height = h; // 设置宽高
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, w, h); // video写入到canvas
      this.imgUrl = canvas.toDataURL("image/png"); // 生成截图地址
    },
    // 录制
    handleRecording() {
      this.recording = !this.recording;
      if (this.recording) {
        this.$message.success("开始录制");
        mediaRecorder.start();
      } else {
        this.$message.success("结束录制");
        mediaRecorder.stop();
        this.showCapture();
      }
    },
    // video元数据加载后触发
    onloadedmetadata() {
      let video = document.getElementsByTagName("video")[0];
      const stream = video?.mozCaptureStream
        ? video?.mozCaptureStream()
        : video?.captureStream();
      console.log("video stream", stream);
      mediaRecorder = new MediaRecorder(stream); // 生成速率25的MediaRecorder对象
      const _this = this;
      mediaRecorder.ondataavailable = function (e) {
        console.log("this.videoData", _this.videoData);
        _this.videoData?.push(e.data); // 添加视频流
      };
    },
    // 返回视频地址
    showCapture() {
      const _this = this;
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("222_this.videoData", _this.videoData);
          let blob = new Blob(_this.videoData, {
            type: "video/mp4",
          });
          this.videoUrl = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.download = "newName";
          a.href = this.videoUrl;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          a.remove();
          resolve();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.controls {
  margin: 20px 0;
}
.preview {
  height: 310px;
  display: flex;
  justify-content: center;
  .preview-box {
    height: 100%;
    width: 550px;
    border: 1px solid #000;
    margin-right: 5px;
  }
}
</style>
