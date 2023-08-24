<template>
  <div>
    <ButtonOptions ref="canvasRef" :clickFun="onClick" />
  </div>
</template>
<script>
import ButtonOptions from "./Index.vue";
import { getFθ } from "@/utils/CoordinatePickupFun";
export default {
  components: {
    ButtonOptions,
  },

  methods: {
    onClick: function () {
      if (this.$refs.canvasRef) {
        const { x, y, coreX, coreY, radθ, θ, redrawPaintP } =
          this.$refs.canvasRef.childData;
        const angleA = getFθ({ x: coreX, y: coreY }, { x, y });
        let angle = θ + radθ * 1;
        if (θ < angleA && angleA < angle) {
          console.log("在扇形0内");
          redrawPaintP(0);
          return;
        }
        if (
          (angle < angleA && angleA <= 180) ||
          (-180 < angleA && angleA < -angle)
        ) {
          console.log("在扇形1内");
          redrawPaintP(1);
          return;
        }
        if (-angle < angleA <= 180 && angleA < -θ) {
          console.log("在扇形2内");
          redrawPaintP(2);
          return;
        }
        if (-θ < angleA && angleA < θ) {
          console.log("在扇形3内");
          redrawPaintP(3);
          return;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
