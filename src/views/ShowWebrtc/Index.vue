<template>
  <div class="home">
    <webrtcSteamer :scale="1" />
  </div>
</template>

<script>
import webrtcSteamer from "@/components/Webetc/Index.vue";

export default {
  name: "WebrtcSteamer",
  data() {
    return {
      videoUrl:
        "rtsp://zephyr.rtsp.stream/pattern?streamKey=1477c31f6088af9822a2590683495dfe",
    };
  },
  components: {
    webrtcSteamer,
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
