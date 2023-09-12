import * as THREE from "three";

import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience.js";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  // public 下的draco 文件是从\node_modules\three\examples\js\libs\draco copy 过来的
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/"); // 设置解码器路径, Draco解码
    // 压缩后不能再使用GLTFLoader加载模型，必须使用Draco解码，再使用DRACOLoader配合GLTFLoader加载器 加载压缩后的模型
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader); // 在设计glt文件导出时可以压缩导出
  }
  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "videoTexture") {
        this.video = {};
        this.videoTexture = {};

        // video 属性
        this.video[asset.name] = document.createElement("video");
        this.video[asset.name].src = asset.path;
        this.video[asset.name].muted = true;
        this.video[asset.name].playsInline = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].play();

        this.videoTexture[asset.name] = new THREE.VideoTexture(
          this.video[asset.name]
        );
        // this.videoTexture[asset.name].flipY = false;

        // THREE.NearestFilter NearestFilter返回与指定纹理坐标（在曼哈顿距离之内）最接近的纹理元素的值。
        this.videoTexture[asset.name].minFilter = THREE.NearestFilter; // minFilter -- 当一个纹素覆盖小于一个像素时，贴图将如何采样。 其默认值为THREE.LinearFilter
        this.videoTexture[asset.name].magFilter = THREE.NearestFilter; // magFilter -- 当一个纹素覆盖大于一个像素时，贴图将如何采样。 其默认值为THREE.LinearFilter
        this.videoTexture[asset.name].generateMipmaps = false; // 是否为纹理生成mipmap（如果可用）。默认为true。 如果你手动生成mipmap，请将其设为false。
        this.videoTexture[asset.name].encoding = THREE.sRGBEncoding; // 编码方式

        this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    console.log("startLoading", file);
    if (this.loaded === this.queue) {
      console.log("Loading End", file);
      this.emit("ready");
    }
  }
}
