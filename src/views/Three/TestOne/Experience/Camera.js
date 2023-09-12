import * as THREE from "three";
import Experience from "./Experience.js";
// 轨道控制器 可以使得相机围绕目标进行轨道运动。
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GridHelper } from "three";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  // 透视摄像机
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 29;
    this.perspectiveCamera.position.y = 14;
    this.perspectiveCamera.position.z = 12;
  }

  // 正交摄像机
  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    // 6.5
    this.orthographicCamera.position.y = 5.65;
    this.orthographicCamera.position.z = 10;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    /* 
      GridHelper(size: number, divisions: Number, colorCenterLine: Color, colorGrid: Color) 参数
      size -- 坐标格尺寸. 默认为 10.
      divisions -- 坐标格细分次数. 默认为 10.
      colorCenterLine -- 中线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x444444
      colorGrid -- 坐标格网格线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x888888

      创建一个尺寸为 'size' 和 每个维度细分 'divisions' 次的坐标格. 颜色可选.
    */
    const size = 20;
    const divisions = 20;
    // 坐标格辅助对象. 坐标格实际上是2维线数组.
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    /* AxesHelper( size : Number )
      size -- (可选的) 表示代表轴的线段长度. 默认为 1.
      用于简单模拟3个坐标轴的对象.
      红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
    */
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true; // 当.enableDamping设置为true的时候，阻尼惯性有多大。 Default is 0.05. 请注意，要使得这一值生效，你必须在你的动画循环里调用.update()。
    this.controls.enableZoom = false; //禁用,  启用或禁用摄像机的缩放。
  }

  resize() {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    // console.log(this.perspectiveCamera.position);
    // 更新控制器。必须在摄像机的变换发生任何手动改变后调用， 或如果.autoRotate或.enableDamping被设置时，在update循环里调用
    this.controls.update();

    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
