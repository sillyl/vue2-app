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
      camera.position.z = 15;
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

      // 创建几何
      const sphere1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x00ff00,
        })
      );
      sphere1.position.x = -2;
      scene.add(sphere1);

      const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x0000ff,
        })
      );
      scene.add(sphere2);

      const sphere3 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0xff00ff,
        })
      );
      sphere3.position.x = 2;
      scene.add(sphere3);

      // 创建射线
      const raycaster = new THREE.Raycaster();
      // 创建鼠标向量
      const mouse = new THREE.Vector2();

      //  创建点击事件
      window.addEventListener("click", (e) => {
        // console.log(e, "e");
        const clientX = e.clientX;
        const clientY = e.clientY;
        // 设置鼠标向量的x,y值
        mouse.x = (clientX / container.clientWidth) * 2 - 1;
        mouse.y = -((clientY / container.clientHeight) * 2 - 1);
        // console.log("mouse", mouse);

        // 通过摄像机和鼠标位置更新射线
        raycaster.setFromCamera(mouse, camera);

        // 计算射线和物体的焦点
        const shpereArr = scene.children.slice(1, scene.children.length); //获取场景中的三个球
        // 或者直接使用 [sphere1, sphere2, sphere3]
        const intersects = raycaster.intersectObjects(shpereArr); // 击中几何物体 会得到一个数组对象，当多个几个五i重合时点击，会是一个数组对象形式
        // console.log(intersects);
        //
        if (intersects.length > 0) {
          // 射线击中 物体（一个或多个） 最上层的是数组的第一个
          if (intersects[0].object._isSelected) {
            intersects[0].object.material.color.set(
              intersects[0].object._isOriginColor
            );
            intersects[0].object._isSelected = false;
            return;
          }
          intersects[0].object._isOriginColor =
            intersects[0].object.material.color.getHex(); // 增加自定义变量 保存原本什么颜色；必须在修改颜色逻辑之前

          // intersects[0].object.material.color 获取得到的是个对象 { b: 0, g: 0, isColor: true, r: 1}
          intersects[0].object._isSelected = true; // 增加自定义属性 标识该物体已被点击，再次点击取消
          intersects[0].object.material.color.set(0xff0000);
        }
      });

      const gui = new GUI();
      gui.add(eventObj, "Fullscreen").name("全屏");
      gui.add(eventObj, "ExitFullscreen").name("退出全屏");
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
