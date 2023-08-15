<template>
  <div id="cesiumContainer"></div>
</template>
<script>
export default {
  name: "cesiumContainer",
  mounted: function () {
    // 创建 viewer 实例
    this.viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, // 是否显示动画控件
      shouldAnimate: false, // 是否初始时刻运动
      homeButton: true, // 是否显示 Home 按钮
      fullscreenButton: true, // 是否显示全屏按钮
      baseLayerPicker: false, // 是否显示图层选择控件 去掉自带的图层选择器
      geocoder: false, // 是否显示地名查找控件，设置为 true，则无法查询
      timeline: false, // 是否显示时间线控件
      sceneModePicker: false, // 是否显示投影方式控件 三维 / 二维
      navigationHelpButton: false, // 是否显示帮助信息控件
      infoBox: false, // 是否显示点击要素之后显示的信息 信息框小部件
      requestRenderMode: false, //true 启用请求渲染模式：更新实体需拖动地图 视图才更新 [true 加载完 entity 后 requestRender 一下]
      scene3DOnly: false, // 每个几何实例将只能以 3D 渲染以节省 GPU 内存 如果设置为 true，则所有几何图形以 3D 模式绘制以节约 GPU 资源
      sceneMode: 3, // 初始场景模式 1 2D 模式 2 2D 循环模式 3 3D 模式  Cesium.SceneMode
      fullscreenElement: document.body, // 全屏时渲染的 HTML 元素
      selectionIndicator: false, // 是否显示选取指示器组件
    });
    this.viewer._cesiumWidget._creditContainer.style.display = "none";
  },
  data() {
    return {
      viewer: {},
    };
  },
};
</script>

<style scoped></style>
