<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";
export default {
  name: "ThreeTest",
  data() {
    return {
      group: null,
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
    };
  },
  methods: {
    init() {
      let container = document.getElementById("container");

      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      // camera
      this.camera = new THREE.PerspectiveCamera(
        40,
        container.clientWidth / container.clientHeight,
        1,
        1000
      );
      this.camera.position.set(15, 20, 30);
      this.scene.add(this.camera);

      // controls
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.minDistance = 20;
      controls.maxDistance = 50;
      controls.maxPolarAngle = Math.PI / 2;

      // ambient light

      this.scene.add(new THREE.AmbientLight(0x222222));

      // point light

      const light = new THREE.PointLight(0xffffff, 1);
      this.camera.add(light);

      // helper

      this.scene.add(new THREE.AxesHelper(20));

      // textures

      const loader = new THREE.TextureLoader();
      const texture = loader.load("textures/sprites/disc.png");

      this.group = new THREE.Group();
      this.scene.add(this.group);

      // points

      let dodecahedronGeometry = new THREE.DodecahedronGeometry(10);

      const vertices = [];
      const positionAttribute = dodecahedronGeometry.getAttribute("position");

      for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(positionAttribute, i);
        vertices.push(vertex);
      }

      const pointsMaterial = new THREE.PointsMaterial({
        color: 0x0080ff,
        map: texture,
        size: 1,
        alphaTest: 0.5,
      });

      const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);

      const points = new THREE.Points(pointsGeometry, pointsMaterial);
      this.group.add(points);

      // convex hull

      const meshMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        opacity: 0.5,
        transparent: true,
      });

      const meshGeometry = new ConvexGeometry(vertices);

      const mesh1 = new THREE.Mesh(meshGeometry, meshMaterial);
      mesh1.material.side = THREE.BackSide; // back faces
      mesh1.renderOrder = 0;
      this.group.add(mesh1);

      const mesh2 = new THREE.Mesh(meshGeometry, meshMaterial.clone());
      mesh2.material.side = THREE.FrontSide; // front faces
      mesh2.renderOrder = 1;
      this.group.add(mesh2);

      //

      //   window.addEventListener('resize', this.onWindowResize)
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(container.clientWidth, container.clientHeight);
    },

    animate() {
      requestAnimationFrame(this.animate);

      this.group.rotation.y += 0.005;

      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>
<style scoped>
#container {
  height: 500px;
}
</style>
