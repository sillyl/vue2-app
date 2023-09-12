import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };

    this.setSunlight();
    // this.setGUI();
  }

  setGUI() {
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
      console.log(this.obj.colorObj);
    });
    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity;
      this.sunLight.ambientLight = this.obj.intensity;
    });
  }

  // 平行光
  setSunlight() {
    // 从上方照射的白色 平行光，强度为 3
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true; // 此属性设置为 true 灯光将投射阴影。注意：这样做的代价比较高，需要通过调整让阴影看起来正确
    // .camera 在光的世界里。这用于生成场景的深度图;从光的角度来看，其他物体背后的物体将处于阴影中。
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048); // 一个Vector2定义阴影贴图的宽度和高度。
    this.sunLight.shadow.normalBias = 0.05; // 定义用于查询阴影贴图的位置沿对象法线的偏移量。默认值为0。增加该值可用于减少阴影粉刺，尤其是在光线以浅角度照射到几何体上的大型场景中。代价是阴影可能会失真。
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);

    this.sunLight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunLight);

    /* 
      AmbientLight( color : Color, intensity : Float )
      环境光会均匀的照亮场景中的所有物体。环境光不能用来投射阴影，因为它没有方向。
      color -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 Color 对象。
      intensity -（可选）光照的强度。默认值为 1。
    */
    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    // console.log(this.sunLight);
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 3,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }

  resize() {}

  update() {}
}
