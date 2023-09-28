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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // 创建材质
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // 创建网络
      const cube = new THREE.Mesh(geometry, material);

      // 创建有层级的cube
      const parentMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      let parentCube = new THREE.Mesh(geometry, parentMaterial);
      // 设置父元素材质为线框模式
      // parentMaterial.wireframe = true;

      parentCube.add(cube);

      // 设置父元素的位置
      parentCube.position.set(-3, 0, 0);
      parentCube.rotation.x = Math.PI / 4;

      cube.position.set(3, 0, 0); // cube 子元素相对于 父元素parentCube的坐标位置
      // parentCube.scale.set(2, 2, 2);
      // // 设置立方体缩放 相对于父元素
      // cube.scale.set(2, 2, 2); // 子元素cube 其实被放大了4倍数

      // 绕x 轴旋转 局部旋转和父元素相关
      cube.rotation.x = Math.PI / 4; // 此时子元素cube 旋转 （Math.PI / 4 ）*2

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
      // const btn = document.createElement("button");
      // btn.innerHTML = "点击全屏";
      // btn.style.position = "absolute";
      // btn.style.top = "10px";
      // btn.style.left = "10px";
      // btn.style.zIndex = "999";
      const that = this;
      btn.onclick = function () {
        that.onClick();
      };
      // document.body.appendChild(btn);

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
      // 控制立方体位置
      // // 方式1
      // gui.add(cube.position, "x", -5, 5).name("立方体x轴位置-方式1");
      // 方式2
      // 创建一个folder
      const folder = gui.addFolder("立方体位置");
      folder
        .add(cube.position, "x")
        .min(-10)
        .max(10)
        .step(1)
        .name("立方体x轴位置-方式2")
        .onChange((val) => {
          console.log("立方体x轴位置-", val);
        })
        .onFinishChange((val) => {
          console.log("拖拽结束后才会触发", val);
        }); // 其余可查看GUI API文档 https://lil-gui.georgealways.com/#API
      folder
        .add(cube.position, "y")
        .min(-10)
        .max(10)
        .step(1)
        .name("立方体y轴位置-方式2");
      folder
        .add(cube.position, "z")
        .min(-10)
        .max(10)
        .step(1)
        .name("立方体z轴位置-方式2");

      gui.add(parentMaterial, "wireframe").name("父元素线框模式"); // Boolean值 会展示checkbox

      // 利用GUI 控制cube 颜色，这里需要注意threejs接受的颜色格式
      let colorParams = {
        cssColor: "#00ff00",
        // 格式必须是字符串"rgb(r%, g%, b%)"，并且r, g, b 三者还都是是整数
        // rgbColor: { r: 0, g: 255, b: 0 },
        rgbColor: "rgb(0, 255, 0)",
        customRange: [0, 255, 0],
      };

      const folderColor = gui.addFolder("cube子元素样式控制");

      folderColor.addColor(colorParams, "cssColor").onChange((val) => {
        cube.material.color.set(val);
      });
      folderColor.addColor(colorParams, "rgbColor").onChange((val) => {
        const { r, g, b } = val;
        // const str = `rgb(${(r * 100).toFixed(0)}%, ${(g * 100).toFixed(0)}%, ${(
        //   b * 100
        // ).toFixed(0)}%)`;
        // cube.material.color.set(str);
        cube.material.color.set(val);
      });
      folderColor.addColor(colorParams, "customRange", 255).onChange((val) => {
        const str = `rgb(${val[0]}, ${val[1]}, ${val[2]})`;
        cube.material.color.set(str);
      });
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
