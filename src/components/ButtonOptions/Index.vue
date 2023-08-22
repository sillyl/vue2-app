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
    };
  },
  mounted() {
    this.onDraw();
  },
  methods: {
    onDraw: function () {
      const canvas = document.querySelector("#ctx");
      // canvas.style.border = "1px solid blue";
      const ctx = canvas.getContext("2d");
      let drawArr = [];
      //圆弧的份数
      const num = 4;
      //一个圆弧对应的弧度
      const angle = (Math.PI * 2) / num;
      console.log("angle", angle, angle * (180 / Math.PI));
      const coreX = this.canvasW / 2; // 圆心坐标
      const coreY = this.canvasH / 2;
      this.roundRadius = coreX / 2.5;
      //随机颜色
      let star = coreX;
      let end = angle;
      for (let i = 0; i < num; i++) {
        drawArr.push({ paintP: this.paintP, star, end });
        star = end;
        end = end + angle;
      }
      drawArr.push({ paintCircle: this.paintCircle });
      drawArr.forEach((item) => {
        if (item["paintCircle"]) {
          item["paintCircle"](ctx, coreX, coreY, star, end);
        } else {
          item["paintP"](
            ctx,
            coreX,
            coreY,
            this.canvasW / 2.1,
            item.star,
            item.end
          );
        }
      });
      console.log("drawArr0", drawArr);
      canvas.onclick = function (e) {
        const event = e || event;
        const x = e.clientX - canvas.offsetLeft; //获取点击后x的坐标
        const y = e.clientY - canvas.offsetTop; //获取点击后y的坐标
        drawArr.forEach((item) => {
          // item();
          if (item["paintCircle"]) {
            item["paintCircle"](ctx, coreX, coreY, star, end);
            const isTure = ctx.isPointInPath(x, y);
            console.log("isTure0000", isTure);
            if (isTure) {
              return;
            }
          } else {
            item["paintP"](
              ctx,
              coreX,
              coreY,
              this.canvasW / 2.1,
              item.star,
              item.end
            );
            const isTure = ctx.isPointInPath(x, y);
            console.log("isTure111", isTure);
            if (isTure) {
              return;
            }
          }
        });
      };
    },
    paintCircle: function (ctx, coreX, coreY, startAngle, endAngle) {
      ctx.beginPath();
      ctx.arc(coreX, coreY, this.roundRadius, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fillStyle = this.getRandomColor();
      ctx.fill();
      ctx.closePath();
    },
    paintP: function (ctx, x, y, r, startAngle, endAngle) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, r, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = "#ccc";
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    },
    getRandomColor: function () {
      const r = parseInt(Math.random() * 256);
      const g = parseInt(Math.random() * 256);
      const b = parseInt(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + g + ")";
    },
  },
};
</script>
<style lang="scss"></style>
