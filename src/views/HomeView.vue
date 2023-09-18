<template>
  <div class="home">
    <!-- <Konva /> -->
    <!-- <PgmKonva /> -->\
    <webrtcSteamer :scale="1" />
  </div>
</template>

<script>
import Konva from "@/components/Konva/Index.vue";
import PgmKonva from "./PgmKonva/Index.vue";
import webrtcSteamer from "./Webetc/Index.vue";

export default {
  name: "HomeView",
  data() {
    return {
      videoUrl:
        "rtsp://zephyr.rtsp.stream/pattern?streamKey=1477c31f6088af9822a2590683495dfe",
    };
  },
  components: {
    // Konva,
    // PgmKonva,
    // CesiumViewer,
    webrtcSteamer,
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
