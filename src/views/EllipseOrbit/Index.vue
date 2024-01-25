<template>
  <div class="ellipse_orbit">
    <div class="ellipse_orbit_content">
      <img :src="img" class="xiaoche" />
    </div>
  </div>
</template>

<script>
import img from "@/assets/img/machine.png";
export default {
  data() {
    return {
      img,
    };
  },
};
</script>

<style lang="scss" scoped>
.ellipse_orbit {
  height: 100%;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  &_content {
    position: relative;
    background-color: azure;
    width: 600px;
    height: 300px;
    // border-radius: 50% / 50%;
    border: double;
    border-radius: 50%;
    border-width: 31px;
    transform: scale(0.5);

    .xiaoche {
      width: 60px;
      position: absolute;
      animation: animX 40s cubic-bezier(0.36, 0, 0.64, 1) -20s infinite alternate,
        animY 40s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
    }
    @keyframes animX {
      0% {
        left: -40px;
      }
      100% {
        left: 580px;
      }
    }
    @keyframes animY {
      0% {
        top: -42px;
      }
      100% {
        top: 280px;
      }
    }
  }
}
</style>
