<template>
  <div class="stop_btn" @click="onClick">
    <div class="stop_btn_inner">急停按钮</div>
  </div>
</template>

<script lang="ts">
import { emergencyStop } from "@/api/cmd.js";

export default {
  name: "StopButton",
  props: ["clickFun", "data"],
  data() {
    return {
      operatorCmd: {
        deviceId: this.data.id,
        method: "EmergencyStop",
        params: {
          action: this.data.deviceStatus === 0 ? 1 : 0,
        },
        cache: "0",
        response: "0",
        expired: 100,
        streamType: 0,
      },
    };
  },
  methods: {
    onClick: async function () {
      if (this.clickFun) {
        this.clickFun();
        return;
      }
      await emergencyStop(this.operatorCmd);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.stop_btn {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%;
  border: 5px solid #dcdfe6;
  animation: stopBtnBorderFlash 2s infinite;

  @keyframes stopBtnBorderFlash {
    0% {
      border-color: #ffffff;
      box-shadow: 0 0 5px #ffffff;
    }
    50% {
      border-color: #ff0000;
      box-shadow: 0 0 10px #ff0000;
    }
    100% {
      border-color: #ffffff;
      box-shadow: 0 0 5px #ffffff;
    }
  }

  &_inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
}
</style>
