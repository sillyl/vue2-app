<template>
  <div>
    <div v-html="svgData"></div>
    <hr />
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="2"
          fill="red"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { base64ToSvg } from "@/utils/base64ToSvg";
export default {
  data() {
    return {
      svgData: "",
    };
  },

  mounted() {
    this.getSvgData();
  },

  methods: {
    getSvgData: function () {
      const str =
        "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSI+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIHN0cm9rZT0iYmxhY2siCiAgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJyZWQiIC8+Cjwvc3ZnPg==";
      this.svgData = base64ToSvg(str);
    },
  },
};
</script>
