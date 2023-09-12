<template>
  <div class="home">
    <!-- <Konva /> -->
    <PgmKonva />
  </div>
</template>

<script>
import Konva from "@/components/Konva/Index.vue";
import PgmKonva from "./PgmKonva/Index.vue";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  components: {
    // Konva,
    PgmKonva,
    // CesiumViewer,
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
