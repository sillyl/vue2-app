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

// 导入轨道控制器 让立体 可拖动
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 导入lil.gui
// 单独安装npm包的引入方式
// import GUI from "lil-gui";
// const gui = new GUI();
// 不单独引入npm threejs 下会存在，如果单独npm安装threejs下则没有
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

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

      // 创建几何体
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      // 创建材质
      const cubeMaterial1 = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      });

      const cubeMaterial2 = new THREE.MeshBasicMaterial({
        color: 0xff0000,
      });
      const cubeMaterial3 = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
      });
      const cubeMaterial4 = new THREE.MeshBasicMaterial({
        color: 0xffff00,
      });
      const cubeMaterial5 = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
      });
      const cubeMaterial6 = new THREE.MeshBasicMaterial({
        color: 0xffffbf,
      });

      const cube = new THREE.Mesh(cubeGeometry, [
        cubeMaterial1,
        cubeMaterial2,
        cubeMaterial3,
        cubeMaterial4,
        cubeMaterial5,
        cubeMaterial6,
      ]);

      scene.add(cube);

      // 创建 缓冲区 几何体
      const geometryPlane = new THREE.BufferGeometry();
      console.log("geometryPlane", geometryPlane);
      // 设置顶点数据
      // const vertices = new Float32Array([
      //   // 三个点后成一个三角面
      //   -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,
      //   // 六个顶点形成一个四边形
      //   1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
      // ]);
      // 创建顶点属性, 经典是有序的，每三个点为一个顶点，逆时针为正面
      // 这种方式绘制四边形会有六个顶点count：6，有两个顶点可以共用
      // geometryPlane.setAttribute(
      //   "position",
      //   new THREE.BufferAttribute(vertices, 3)
      // );

      // 使用索引绘制
      // 索引值方式，共用两个顶点， count：4
      const vertices = new Float32Array([
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      ]);

      // 创建顶点属性
      geometryPlane.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3)
      );
      // 创建索引
      const indexes = new Uint16Array([0, 1, 2, 2, 3, 0]);
      // 在几何题中设置索引, 设置之后才会展示四边形，不然就是三角形
      geometryPlane.setIndex(new THREE.BufferAttribute(indexes, 1));

      // 设置两个顶点组， 形成两个三角 两个材质
      geometryPlane.addGroup(0, 3, 0); // 添加一个组，从索引值0开始添加三个点，用的是0 第一个材质
      geometryPlane.addGroup(3, 3, 1); // 添加一个组，从索引值3开始添加三个点，用的是1 第二个材质

      // 材质0
      // 创建材质
      const material = new THREE.MeshBasicMaterial({
        color: 0x00f0f0,
        side: THREE.DoubleSide, // 两面都可以看到，默认有正反面，只能在正面看到，转动到反面就看不到了
        // wireframe: true,
      });
      // 材质1
      // 创建材质
      const material1 = new THREE.MeshBasicMaterial({
        color: 0x00ff000,
        side: THREE.DoubleSide, // 两面都可以看到，默认有正反面，只能在正面看到，转动到反面就看不到了
        // wireframe: true,
      });
      // 创建网络
      // const plane = new THREE.Mesh(geometryPlane, material);
      const plane = new THREE.Mesh(geometryPlane, [material, material1]);
      scene.add(plane);

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
