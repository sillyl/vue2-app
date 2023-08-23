<template>
  <div class="cc">
    <div class="ccD div1">1</div>
    <div class="ccD div2">2</div>
    <div class="ccD div3">3</div>
    <div class="ccD div4">4</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.ccD {
  width: 100px;
  height: 100px;
  border: 1px solid skyblue;
}
// div {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background: #0cf;
//   animation: horizontal 2.6s infinite linear alternate,
//     vertical 1.8s infinite linear alternate;
//   animation-composition: accumulate;
// }

// @keyframes horizontal {
//   from {
//     left: 0;
//   }
//   to {
//     left: calc(100% - 100px);
//   }
// }

// @keyframes vertical {
//   from {
//     top: 0;
//   }
//   to {
//     top: calc(100% - 100px);
//   }
// }
</style>
