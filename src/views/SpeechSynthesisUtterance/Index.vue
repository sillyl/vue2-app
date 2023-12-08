<template>
  <div>
    <div>
      <textarea autofocus type="text" id="text" value="" rows="5"></textarea>
    </div>
    <el-button type="primary" @click="read">朗读</el-button>
    <el-button type="primary" @click="stop">清空</el-button>
    <el-button type="primary" @click="pause">暂停</el-button>
    <el-button type="primary" @click="resume">继续</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reader: null,
    };
  },
  methods: {
    read: function () {
      const txt = document.querySelector("#text").value;
      this.reader = new SpeechSynthesisUtterance(txt);

      this.reader.lang = "zh-CN";
      this.reader.volume = 1; // 声音的音量，区间范围是0到1，默认是1。
      window.speechSynthesis.speak(this.reader);
    },
    stop: function () {
      // 删除队列中所有的语音.如果正在播放,则直接停止, 停止后点击继续不会生效，因为队列中语音被清空
      window.speechSynthesis.cancel(this.reader);
    },

    pause: function () {
      // 暂停语音
      window.speechSynthesis.pause(this.reader);
    },

    resume: function () {
      // 恢复暂停的语音
      window.speechSynthesis.resume(this.reader);
    },
  },
};
</script>
