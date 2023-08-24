<template>
  <canvas :width="canvasW" :height="canvasH" id="ctx"></canvas>
</template>
<script>
// 该组件默认支持上下左右 中心方向，其余按此结构计算传值, 尤其是arr
import { isEmpty } from "lodash";
export default {
  props: [
    "num",
    "canvasWidth",
    "canvasHeight",
    "isCore",
    "centerR",
    "clickFun",
    "arr",
    "bgColor",
    "clickBgColor",
    "fontColor",
  ],
  data() {
    return {
      nums: this.num || 4,
      canvasW: this.canvasWidth || 150,
      canvasH: this.canvasHeight || 150,
      roundRadius: this.centerR || 50, // 中心圆半径
      arrs: this.arr,
      clickCurX: 0,
      clickCurY: 0,
      childData: null, // 统一暴露子组件数据 给父组件点击计算使用
      bgCor: this.bgColor || "#D3D3D3",
      clickBgCor: this.clickBgColor || "#87CEFA",
      fontCor: this.fontColor || "#000000",
    };
  },
  mounted() {
    this.onDraw();
  },
  methods: {
    onDraw: function () {
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
      const txtPostion = (coreX + roundRadius) / 2;
      const that = this;
      if (isEmpty(this.arrs)) {
        this.arrs = [
          { key: "下", x: 0, y: txtPostion },
          { key: "左", x: -txtPostion, y: 0 },
          { key: "上", x: 0, y: -txtPostion },
          { key: "右", x: txtPostion, y: 0 },
          "中心",
        ];
      }
      paintP();
      if (!this.isCore) {
        // 不传默认展示
        paintCircle();
      }

      function paintP() {
        for (let i = 0; i < num; i++) {
          const text = that.arrs[i].key;
          const x = that.arrs[i].x;
          const y = that.arrs[i].y;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, radiusM, start, end);
          ctx.fillStyle = that.bgCor; // 填充整体背景颜色
          ctx.stroke();
          ctx.fill();
          ctx.closePath();
          ctx.beginPath();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "16px scans-serif";
          ctx.fillStyle = that.fontCor; // 字体颜色
          ctx.fillText(text, x, y);
          ctx.restore();
          start = end;
          end = end + rad;
        }
      }
      function paintCircle() {
        ctx.beginPath();
        ctx.arc(0, 0, roundRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = that.bgCor;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.font = "16px scans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = that.fontCor; // 字体颜色
        ctx.fillText(that.arrs[that.arrs.length - 1], 0, 0);
        ctx.restore();
      }

      function redrawPaintP(index) {
        for (let i = 0; i < num; i++) {
          const text = that.arrs[i].key;
          const x = that.arrs[i].x;
          const y = that.arrs[i].y;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, radiusM, start, end);
          if (index === i) {
            ctx.fillStyle = that.clickBgCor;
          } else {
            ctx.fillStyle = that.bgCor;
          }
          ctx.stroke();
          ctx.fill();
          ctx.closePath(); // 上一个形成闭合，否则影响下一个开始
          ctx.beginPath();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "16px scans-serif";
          ctx.fillStyle = that.fontCor; // 字体颜色
          ctx.fillText(text, x, y);
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
        ctx.fillStyle = that.clickBgCor;
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.font = "16px scans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = that.fontCor; // 字体颜色
        ctx.fillText(that.arrs[that.arrs.length - 1], 0, 0);
        ctx.restore();
      }

      canvas.onclick = async function (e) {
        const event = e || event;
        const x = e.clientX - canvas.offsetLeft; //获取点击后x的坐标
        const y = e.clientY - canvas.offsetTop; //获取点击后y的坐标
        that.clickCurX = x;
        that.clickCurY = y;
        // const isTure = ctx.isPointInPath(x, y); // canvas事件中 该方法只会判断最后一层
        that.childData = {
          x,
          y,
          coreX,
          coreY,
          radθ, // 等分角
          θ, //旋转角，即开始画图的开始角
          redrawPaintP,
          radiusM,
          roundRadius,
          paintP,
          redrawPaintCircle,
        };
        if (that.clickFun) {
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
