<template>
  <div class="circle">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawEllipseCylinder(); // 绘制椭圆形的圆柱体
  },
  methods: {
    drawEllipseCylinder() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // 设置椭圆的参数
      const ellipseWidth = 100; // 椭圆的宽度
      const ellipseHeight = 50; // 椭圆的高度（与圆柱体的厚度相等）
      const ellipseX = canvas.width / 2 - ellipseWidth / 2; // 椭圆的x坐标（将椭圆的中心点放置在画布的中心）
      const ellipseY = canvas.height / 2 - ellipseHeight / 2; // 椭圆的y坐标（将椭圆的中心点放置在画布的中心）
      const startAngle = 0; // 绘制椭圆的起始角度（以弧度为单位）
      const endAngle = Math.PI * 2; // 绘制椭圆的结束角度（以弧度为单位）

      // 绘制椭圆形的圆柱体（侧面）
      ctx.beginPath();
      ctx.arc(
        ellipseX,
        ellipseY,
        ellipseWidth / 2,
        startAngle,
        endAngle,
        false
      ); // 绘制椭圆的上半部分（不包括底部）
      ctx.arc(
        ellipseX,
        ellipseY + ellipseHeight,
        ellipseWidth / 2,
        endAngle,
        startAngle,
        true
      ); // 绘制椭圆的下半部分（包括底部）
      ctx.closePath(); // 闭合路径，形成椭圆形的圆柱体侧面矩形区域
      ctx.strokeStyle = "#ddd"; // 设置线条颜色为灰色
      ctx.stroke(); // 绘制线条（仅绘制椭圆形的圆柱体侧面）
      ctx.fillStyle = "#fff"; // 设置填充颜色为白色
      ctx.fill(); // 填充图形（仅填充椭圆形的圆柱体侧面矩形区域）
    },
  },
};
</script>
<style lang="scss">
.circle {
  height: 100%;
  width: 100%;
  canvas {
    height: 800px;
    width: 800px;
  }
}
</style>
