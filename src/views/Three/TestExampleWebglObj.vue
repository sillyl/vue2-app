<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

let container, controls, object, light1;

let camera, scene, renderer;

const clock = new THREE.Clock();
export default {
  data() {
    return {};
  },
  mounted() {
    this.daeFun();
  },
  methods: {
    daeFun: function () {
      init();

      function init() {
        container = document.getElementById("container");
        camera = new THREE.PerspectiveCamera(
          50,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        );
        camera.position.z = 100;

        scene = new THREE.Scene();
        scene.background = new THREE.Color("#ccc");

        // 加载模型
        const loader = new OBJLoader();
        loader.load(
          "/models/collada/Rmk3.obj",
          (obj) => {
            object = obj;
            console.log(object, "------Rmk3.obj");
            object.scale.multiplyScalar(0.05);
            object.position.y = -20;
            scene.add(object);
          },
          (xhr) => {
            console.log("加载进度：" + (xhr.loaded / xhr.total) * 100 + "%");
          },
          (error) => {
            console.log("An error happened");
          }
        );

        const sphere = new THREE.SphereGeometry(0.5, 16, 8);

        //lights
        light1 = new THREE.PointLight(0xff0040, 400);
        light1.add(
          new THREE.Mesh(
            sphere,
            new THREE.MeshBasicMaterial({ color: 0xff0040 })
          )
        );
        scene.add(light1);

        //renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // 添加事件坐标辅助器
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        function animate() {
          requestAnimationFrame(animate);
          const time = Date.now() * 0.0005;

          const delta = clock.getDelta();

          if (object) {
            // object.rotation.y -= 0.5 * delta;
          }
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
      }
    },
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100vh;
}
</style>
