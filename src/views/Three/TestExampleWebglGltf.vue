<template>
  <div id="robotArm"></div>
</template>

<script>
import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// 导入draco解码器
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// const clock = new THREE.Clock();

export default {
  data() {
    return {};
  },
  mounted() {
    this.container;
    this.controls;
    this.object;
    this.camera;
    this.scene;
    this.renderer;
    this.daeFun();
  },
  methods: {
    daeFun: function () {
      const that = this;
      init();
      function init() {
        that.container = document.getElementById("robotArm");
        that.camera = new THREE.PerspectiveCamera(
          75,
          that.container.clientWidth / that.container.clientHeight,
          0.1,
          1000
        );
        that.camera.position.z = 100;

        that.scene = new THREE.Scene();
        // scene.background = new THREE.Color("#fff");

        // 加载模型
        const loader = new GLTFLoader();
        loader.load(
          "/models/collada/Rmk3.glb",
          (obj) => {
            that.object = obj.scene;
            that.object.scale.multiplyScalar(0.08);
            that.object.position.x = 5;
            that.object.position.y = -20;
            that.object.traverse(function (child) {
              if (child.isMesh) {
                //	定义材质是否使用平面着色进行渲染。默认值为false
                child.material.flatShading = true;
              }
            });
            console.log("objobj", obj);
            that.scene.add(that.object);
          },
          (xhr) => {
            // console.log("加载进度：" + (xhr.loaded / xhr.total) * 100 + "%");
          },
          (error) => {
            console.log("An error happened");
          }
        );

        // // 实例化加载器DRACOLoader
        // const dracoLoader = new DRACOLoader();
        // dracoLoader.setDecoderPath("./draco/");
        // loader.setDRACOLoader(dracoLoader);

        // Lights
        const light = new THREE.HemisphereLight(0x005, 0x696969, 0.5);
        that.scene.add(light);

        //renderer
        that.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        that.renderer.setClearColor(0x000, 0);
        that.renderer.setPixelRatio(window.devicePixelRatio);
        that.renderer.setSize(
          that.container.clientWidth,
          that.container.clientHeight
        );
        that.container.appendChild(that.renderer.domElement);

        // 添加移动轨道
        const controls = new OrbitControls(
          that.camera,
          that.renderer.domElement
        );
        controls.minDistance = 50;
        controls.maxDistance = 500;

        // 添加事件坐标辅助器
        const axesHelper = new THREE.AxesHelper(25);
        that.scene.add(axesHelper);

        function animate() {
          requestAnimationFrame(animate);
          const time = Date.now() * 0.0005;

          // const delta = clock.getDelta();

          if (that.object) {
            // object.rotation.y -= 0.5 * delta;
          }
          if (that.renderer) {
            that.renderer.render(that.scene, that.camera);
          }
        }

        animate();

        // 监听窗口变化 窗口调整视口大小 canvas 自动调整
        addEventListener("resize", () => {
          // 重新渲染渲染器宽高比
          if (that.renderer) {
            that.renderer.setSize(
              that.container.clientWidth,
              that.container.clientHeight
            );
          }

          // 重置相机宽高比
          that.camera.aspect =
            that.container.clientWidth / that.container.clientHeight;
          // 更新相机投影矩阵
          that.camera.updateProjectionMatrix();
        });
      }
    },
  },
  beforeDestroy() {
    this.container = null;
    this.controls = null;
    this.object = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
  },
};
</script>

<style scoped>
#robotArm {
  width: 100%;
  height: 100vh;
}
</style>
