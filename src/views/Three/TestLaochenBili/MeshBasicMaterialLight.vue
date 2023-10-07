<template>
  <div class="threejs_demo">
    <el-button class="btn_screen" type="primary">
      {{ !isFullscreen ? "点击全屏" : "退出全屏" }}
    </el-button>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";

// 基础网格材质
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

// 导入RGBELoader HDR 加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default {
  data() {
    return {
      isFullscreen: false,
    };
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
        // 渲染(要渲染界面才可展示)
        renderer.render(scene, camera);
      }

      animate();

      // 监听窗口变化 窗口调整视口大小 canvas 自动调整
      addEventListener("resize", () => {
        // 重新渲染渲染器宽高比
        renderer.setSize(container.clientWidth, container.clientHeight);
        // 重置相机宽高比
        camera.aspect = container.clientWidth / container.clientHeight;
        // 更新相机投影矩阵
        camera.updateProjectionMatrix();
      });

      // 全屏
      const btn = document.querySelector(".btn_screen");
      const that = this;
      btn.onclick = function () {
        that.onClick();
      };

      // 定义事件对象
      let eventObj = {
        Fullscreen: function () {
          document.body.requestFullscreen();
        },
        ExitFullscreen: function () {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        },
      };

      // 创建纹理加载器
      let textureLoader = new THREE.TextureLoader();
      // 加载图片作为纹理
      let texture = textureLoader.load(require("@/assets/img/dog.png"));
      // 加载ao贴图
      let aoMap = textureLoader.load(require("@/assets/img/three1.png"));

      // rgbeLoader 加载hdr贴图
      let rgbeLoader = new RGBELoader();
      rgbeLoader.load("", (envMap) => {
        // 设置球星映射
        envMap.mapping = THREE.EquirectangularReflectionMapping;
        //设置环境贴图
        scene.add(envMap);
      });

      // 创建几何体-平面
      const planeGeometry = new THREE.PlaneGeometry(1, 1);
      // 基础网格材质
      let planeMatetial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        aoMap: aoMap,
        aoMapIntensity: 0.5,
      });
      let plane = new THREE.Mesh(planeGeometry, planeMatetial);
      scene.add(plane);

      const gui = new GUI();
      gui.add(eventObj, "Fullscreen").name("全屏");
      gui.add(eventObj, "ExitFullscreen").name("退出全屏");
      gui.add(planeMatetial, "aoMapIntensity").min(0).max(1).name("ao贴图强度");
    },

    onClick: function () {
      if (!this.isFullscreen) {
        // 全屏函数
        // renderer.domElement.requestFullscreen(); // 画布全屏
        document.body.requestFullscreen(); // 整个body 内容都会在全屏里
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
      this.isFullscreen = !this.isFullscreen;
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100vh;
}
.btn_screen {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 999;
}
</style>
