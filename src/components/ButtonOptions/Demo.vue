<template>
  <div>
    <ButtonOptions
      ref="canvasRef"
      :clickFun="onClick"
      :canvasWidth="150"
      :canvasHeight="150"
    />
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
        const {
          x,
          y,
          coreX,
          coreY,
          radθ,
          θ,
          redrawPaintP,
          radiusM,
          roundRadius,
          paintP,
          redrawPaintCircle,
        } = this.$refs.canvasRef.childData;
        const angleA = getFθ({ x: coreX, y: coreY }, { x, y });
        let angle = θ + radθ * 1;
        const curR =
          Math.pow(x - coreX, 2) + Math.pow(y - coreY, 2) <
          Math.pow(roundRadius, 2);
        if (curR) {
          paintP();
          if (!this.isCore) {
            // 不传默认展示
            redrawPaintCircle();
          }
          console.log("在中心圆中");
          return;
        }
        const curClickPointR =
          Math.pow(x - coreX, 2) + Math.pow(y - coreY, 2) <
          Math.pow(radiusM, 2); // 确保点击在大圆内触发事件
        if (curClickPointR) {
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
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
