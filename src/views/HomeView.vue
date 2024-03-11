<template>
  <div class="home">
    <!-- <Konva /> -->
    <!-- <PgmKonva /> -->
    <el-input v-model="ansiString" placeholder="请输入内容"></el-input>
    <div v-html="ansi_up.ansi_to_html(this.ansiString)"></div>
    <!-- <VideoPlayer :src="videoUrl" :isShow="true" /> -->
    <Test />
  </div>
</template>

<script>
import Konva from "@/components/Konva/Index.vue";
import PgmKonva from "./PgmKonva/Index.vue";
import VideoPlayer from "@/components/VideoPlayer/Index.vue";
import Test from "./Test.vue";
import { AnsiUp } from "ansi_up";
// import VideoPlayer from "@/components/Wfs/Index.vue";

export default {
  name: "HomeView",
  data() {
    return {
      videoUrl:
        "rtsp://zephyr.rtsp.stream/pattern?streamKey=1477c31f6088af9822a2590683495dfe",
      ansiString: "",
      ansi_up: new AnsiUp(),
    };
  },
  components: {
    // Konva,
    // PgmKonva,
    // CesiumViewer,
    // VideoPlayer,
    Test,
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.map-container {
  position: absolute;
  left: 0;
  top: 0px; //添加100px间距，把上面的导航栏让出来
  width: 100%;
  height: 100%;
  .leaflet-control {
    bottom: 0px;
    position: absolute;
  }
}
</style>
