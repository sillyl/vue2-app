<template>
  <canvas :width="canvasW" :height="canvasH" id="ctx"></canvas>
</template>
<script>
export default {
  data() {
    return {
      canvasW: 200,
      canvasH: 200,
      isCoreMenu: true, // 是否展示中心按钮
      roundRadius: 50, // 中心圆半径
      radiusDistance: 3, //半径的长度比 （中心圆半径 = 大圆半径 * radiusDistance）
      arrs: ["上", "下", "左", "右"],
    };
  },
  mounted() {
    this.onDraw();
  },
  methods: {
    onDraw: function () {
      const arr = this.arrs;
      const canvas = document.querySelector("#ctx");
      // canvas.style.border = "1px solid blue";
      const ctx = canvas.getContext("2d");
      //圆弧的份数
      const num = 4;
      //一个圆弧对应的弧度
      const angle = (Math.PI * 2) / num;
      const coreX = this.canvasW / 2; // 圆心坐标
      const coreY = this.canvasH / 2;
      const radiusM = this.canvasW / 2.1;
      const roundRadius = coreX / 2.5;
      //随机颜色
      let star = 0;
      let end = angle;
      paintP();
      paintCircle();

      function paintP() {
        console.log("arr", arr);
        for (let i = 0; i < num; i++) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(coreX, coreY);
          ctx.arc(coreX, coreY, radiusM, star, end);
          ctx.closePath();
          ctx.fillStyle = "#ccc";
          ctx.font = "12px scans-serif";
          // ctx.fillText(arr[i], 120, 120);
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          star = end;
          end = end + angle;
        }
      }
      function paintCircle() {
        ctx.beginPath();
        ctx.arc(coreX, coreY, roundRadius, 0, Math.PI * 2, true);
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
          ctx.moveTo(coreX, coreY);
          ctx.arc(coreX, coreY, radiusM, star, end);
          ctx.closePath();
          if (index === i) {
            console.log("i", i);
            ctx.fillStyle = "#ff9000";
          } else {
            ctx.fillStyle = "ccc";
          }
          ctx.font = "12px scans-serif";
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          star = end;
          end = end + angle;
        }
        paintCircle(); // 保证中心圆是是最后一个绘制（重要必须！！！）
      }

      function redrawPaintCircle() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(coreX, coreY, roundRadius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fillStyle = "#ff9000";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }

      canvas.onclick = function (e) {
        const event = e || event;
        const x = e.clientX - canvas.offsetLeft; //获取点击后x的坐标
        const y = e.clientY - canvas.offsetTop; //获取点击后y的坐标
        // const isTure = ctx.isPointInPath(x, y); // canvas事件中 该方法只会判断最后一层
        const curClickPointR =
          Math.pow(x - coreX, 2) + Math.pow(y - coreY, 2) <
          Math.pow(radiusM, 2);
        const curR =
          Math.pow(x - coreX, 2) + Math.pow(y - coreY, 2) <
          Math.pow(roundRadius, 2);
        if (curR) {
          paintP();
          redrawPaintCircle();
          console.log("在中心圆中");
          return;
        }
        if (
          curClickPointR &&
          y > coreY &&
          y - coreY < Math.tan(angle * 1) * (x - coreX)
        ) {
          console.log("在扇形0内");
          redrawPaintP(0);
          return;
        }
        if (
          curClickPointR &&
          y - coreY > Math.tan(angle * 1) * (x - coreX) &&
          y - coreY > Math.tan(angle * 2) * (x - coreX)
        ) {
          console.log("在扇形1内");
          redrawPaintP(1);
          return;
        }
        if (
          curClickPointR &&
          y < coreY &&
          y - coreY < Math.tan(angle * 2) * (x - coreX) &&
          y - coreY > Math.tan(angle * 3) * (x - coreX)
        ) {
          console.log("在扇形2内");
          redrawPaintP(2);
          return;
        }
        if (
          curClickPointR &&
          y < coreY &&
          y - coreY < Math.tan(angle * 4) * (x - coreX)
        ) {
          console.log(
            "在扇形3内",
            y - coreY < Math.tan(angle * 4) * (x - coreX)
          );
          redrawPaintP(3);
          return;
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
