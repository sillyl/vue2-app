<template>
  <canvas :width="canvasW" :height="canvasH" id="ctx"></canvas>
</template>
<script>
export default {
  props: [
    "num",
    "canvasWidth",
    "canvasHeight",
    "isCore",
    "centerR",
    "clickFun",
  ],
  data() {
    return {
      nums: this.num || 4,
      canvasW: this.canvasWidth || 200,
      canvasH: this.canvasHeight || 200,
      roundRadius: this.centerR || 50, // 中心圆半径
      arrs: ["上", "下", "左", "右"],
      clickCurX: 0,
      clickCurY: 0,
      childData: null, // 统一暴露子组件数据 给父组件点击计算使用
    };
  },
  mounted() {
    this.onDraw();
  },
  methods: {
    onDraw: function () {
      const arr = this.arrs;
      const canvas = document.querySelector("#ctx");
      const ctx = canvas.getContext("2d");
      const num = this.nums; //圆弧的份数
      //一个圆弧对应的弧度
      const rad = (Math.PI * 2) / num;
      const radθ = rad * (180 / Math.PI);
      const coreX = this.canvasW / 2; // 圆心坐标
      const coreY = this.canvasH / 2;
      const radiusM = this.canvasW / 2.1; // 扇形（大圆）半径
      const roundRadius = coreX / 2.5; // 小圆半径
      const θ = 360 / this.nums / 2; // 需要旋转多少角度
      const radDiff = (Math.PI / 180) * θ;
      //随机颜色
      let start = radDiff;
      let end = rad + radDiff;
      ctx.translate(coreX, coreY); // 将中心调整到圆心
      paintP();
      if (!this.isCore) {
        // 不传默认展示
        paintCircle();
      }

      function paintP() {
        console.log("arr", arr);
        for (let i = 0; i < num; i++) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, radiusM, start, end);
          ctx.closePath();
          ctx.fillStyle = "#ccc";
          ctx.font = "12px scans-serif";
          // ctx.fillText(arr[i], 120, 120);
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          start = end;
          end = end + rad;
        }
      }
      function paintCircle() {
        ctx.beginPath();
        ctx.arc(0, 0, roundRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = "#ccc";
        // ctx.fillText("中心", 140, 140);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }

      function redrawPaintP(index) {
        for (let i = 0; i < num; i++) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, radiusM, start, end);
          ctx.closePath();
          if (index === i) {
            ctx.fillStyle = "#ff9000";
          } else {
            ctx.fillStyle = "ccc";
          }
          ctx.font = "12px scans-serif";
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          start = end;
          end = end + rad;
        }
        paintCircle(); // 保证中心圆是是最后一个绘制（重要必须！！！）
      }

      function redrawPaintCircle() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, roundRadius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fillStyle = "#ff9000";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }

      const that = this;
      canvas.onclick = async function (e) {
        const event = e || event;
        const x = e.clientX - canvas.offsetLeft; //获取点击后x的坐标
        const y = e.clientY - canvas.offsetTop; //获取点击后y的坐标
        that.clickCurX = x;
        that.clickCurY = y;
        // const isTure = ctx.isPointInPath(x, y); // canvas事件中 该方法只会判断最后一层
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
        that.childData = {
          x,
          y,
          coreX,
          coreY,
          radθ, // 等分角
          θ, //旋转角，即开始画图的开始角
          redrawPaintP,
        };
        const curClickPointR =
          Math.pow(x - coreX, 2) + Math.pow(y - coreY, 2) <
          Math.pow(radiusM, 2); // 确保点击在大圆内触发事件
        if (that.clickFun && curClickPointR) {
          that.clickFun();
        }
      };
    },
    getRandomColor: function () {
      const r = parseInt(Math.random() * 256);
      const g = parseInt(Math.random() * 256);
      const b = parseInt(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
  },
};
</script>
<style lang="scss"></style>
