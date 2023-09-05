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
  components: {
    // Konva,
    PgmKonva,
    // CesiumViewer,
  },
};
</script>
