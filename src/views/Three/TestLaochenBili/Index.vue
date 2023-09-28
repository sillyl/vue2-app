<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";

// 导入轨道控制器 让立体 可拖动
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  data() {
    return {};
  },

  mounted() {
    this.init();
  },

  methods: {
    init: function () {
      let container = document.getElementById("container");

      // 创建Three.js场景
      const scene = new THREE.Scene();
      // 创建Three.js摄像机
      const camera = new THREE.PerspectiveCamera(
        75, // 视角
        container.clientWidth / container.clientHeight, // 宽高比
        0.1, // 近平面
        1000 // 远平面
      );

      // 创建Three.js渲染器
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // 创建几何体
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // 创建材质
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // 创建网络
      const cube = new THREE.Mesh(geometry, material);

      // 创建有层级的cube
      const parentMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      let parentCube = new THREE.Mesh(geometry, parentMaterial);
      parentCube.add(cube);

      // 设置父元素的位置
      parentCube.position.set(-3, 0, 0);

      cube.position.set(3, 0, 0); // cube 子元素相对于 父元素parentCube的坐标位置
      // parentCube.scale.set(2, 2, 2);
      // // 设置立方体缩放 相对于父元素
      // cube.scale.set(2, 2, 2); // 子元素cube 其实被放大了4倍数

      // 将网络添加到场景中
      // scene.add(cube);
      scene.add(parentCube);

      // 设置相机的位置
      camera.position.z = 5;
      camera.position.y = 2;
      camera.position.x = 2;
      camera.lookAt(0, 0, 0); // 物品默认看向原点（可不写）

      // 添加事件坐标辅助器
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // 添加轨道控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      // 设置带阻尼的惯性
      controls.enableDamping = true;
      // 设置阻尼的系数
      controls.dampingFactor = 0.05;
      // 设置旋转速度-自动旋转 控制整个render.domElement 即canvas
      controls.autoRotate = true;
      // controls.update();

      function animate() {
        controls.update();
        requestAnimationFrame(animate);
        // 集合体旋转
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;

        // 渲染(要渲染界面才可展示)
        renderer.render(scene, camera);
      }

      animate();
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100vh;
}
</style>
