<template>
  <div></div>
</template>
<script>
export default {};
</script>
<style lang="scss">
div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #0cf;
  animation: horizontal 2.6s infinite linear alternate,
    vertical 1.8s infinite linear alternate;
  animation-composition: accumulate;
}

@keyframes horizontal {
  from {
    left: 0;
  }
  to {
    left: calc(100% - 100px);
  }
}

@keyframes vertical {
  from {
    top: 0;
  }
  to {
    top: calc(100% - 100px);
  }
}
</style>
