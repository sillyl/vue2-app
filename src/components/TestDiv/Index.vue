<template>
  <div id="circle0">
    <div id="left">
      <div class="circle-left" id="circle2" @click="onClick('circle2')">2</div>
      <div class="circle-left" id="circle3" @click="onClick('circle3')">3</div>
      <div class="circle-left" id="circle4" @click="onClick('circle4')">4</div>
      <div class="circle-left" id="circle5" @click="onClick('circle5')">5</div>
    </div>
    <div id="right">
      <div class="circle-right" id="circle9" @click="onClick('circle9')">9</div>
      <div class="circle-right" id="circle8" @click="onClick('circle8')">8</div>
      <div class="circle-right" id="circle7" @click="onClick('circle7')">7</div>
      <div class="circle-right" id="circle6" @click="onClick('circle6')">6</div>
    </div>

    <div class="occlusion"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClick: function (id) {
      console.log("11111111111", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.circle-left {
  width: 100px;
  height: 200px;
  border-radius: 0px 100px 100px 0px;
  position: absolute;
  right: 0;
  transform-origin: 0 50%;
  border-left: 1px solid red;
}
.circle-right {
  width: 100px;
  height: 200px;
  border-radius: 100px 0px 0px 100px;
  position: absolute;
  right: 0;
  transform-origin: 100% 50%;
  border-right: 1px solid red;
}
#circle0 {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: yellowgreen;
  position: relative;
  top: 10px;
  left: 10px;
  border: 1px solid red;
}
#circle2 {
}
#circle3 {
  transform: rotate(45deg);
}
#circle4 {
  transform: rotate(90deg);
}
#circle5 {
  transform: rotate(135deg);
}
#circle6 {
  transform: rotate(225deg);
}
#circle7 {
  transform: rotate(270deg);
}
#circle8 {
  transform: rotate(315deg);
}
#circle9 {
}
#left {
  clip: rect(0px 100px 200px 0px);
  position: absolute;
  right: 0px;
  width: 100px;
  height: 200px;
  overflow: hidden;
}
#right {
  clip: rect(0px 100px 200px 0px);
  position: absolute;
  left: 0px;
  width: 100px;
  height: 200px;
  overflow: hidden;
}

.occlusion {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40px, -40px);
  background-color: skyblue;
  border: 1px solid red;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
