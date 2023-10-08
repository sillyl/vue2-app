<template>
  <div id="robotArm"></div>
</template>

<script>
import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

let container, controls, object, camera, scene, renderer;

let joints = {};

// const clock = new THREE.Clock();
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
        container = document.getElementById("robotArm");
        camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        );
        camera.position.z = 100;

        scene = new THREE.Scene();
        scene.background = new THREE.Color("#fff");

        // 加载模型
        const loader = new OBJLoader();
        loader.load(
          "/models/collada/Rmk3.obj",
          (obj) => {
            object = obj;
            // console.log(object, "------Rmk3.obj");
            object.scale.multiplyScalar(0.05);
            object.position.y = -20;
            object.traverse(function (child) {
              if (child.isMesh) {
                //	定义材质是否使用平面着色进行渲染。默认值为false
                child.material.flatShading = true;
              }
            });
            // object.children.length - 5
            // object.children[6].rotation.x = 20;
            // object.children[6].rotation.y = 20;
            // object.children[6].rotation.z = 20;
            console.log("objectobjectobject", object?.children[6]);
            scene.add(object);
          },
          (xhr) => {
            // console.log("加载进度：" + (xhr.loaded / xhr.total) * 100 + "%");
          },
          (error) => {
            console.log("An error happened");
          }
        );

        // Lights
        const light = new THREE.HemisphereLight(0xa9a9a9, 0x696969, 0.5);
        scene.add(light);

        //renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // 添加移动轨道
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 50;
        controls.maxDistance = 500;

        // 添加事件坐标辅助器
        const axesHelper = new THREE.AxesHelper(25);
        scene.add(axesHelper);

        function animate() {
          requestAnimationFrame(animate);
          const time = Date.now() * 0.0005;

          // const delta = clock.getDelta();

          if (object) {
            // console.log("object...........", object);
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

        // 关节角度数据示例
        const jointAngles = [45, 30, 60, 90, 120, 180]; // 以度为单位
        function setupTween() {
          const duration = THREE.MathUtils.randInt(1000, 5000);
          const target = {};
          // 处理关节 区分底座和关节整体
          // joints["base_link-base"]=
          // 更新关节角度
          for (let i = 0; i < object?.children.length; i++) {
            // 将关节角度从度转换为弧度
            const angleRad = THREE.MathUtils.degToRad(45);

            // 获取关节对象并设置旋转
            const joint = object?.children[i];
            if (joint) {
              // 假设关节绕Z轴旋转，根据实际情况调整
              joint.rotation.z = angleRad;
            }
          }
          setTimeout(setupTween, duration);
        }
        setupTween();
      }
    },
  },
};
</script>

<style scoped>
#robotArm {
  width: 100%;
  height: 100vh;
}
</style>
