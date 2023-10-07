<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let container, stats;

let camera, scene, renderer;
let dae;

let kinematics;
let kinematicsTween;
const tweenParameters = {};

export default {
  data() {
    return {};
  },
  mounted() {
    this.daeFun();
  },
  methods: {
    daeFun: function () {
      const loader = new ColladaLoader();
      loader.load("/models/collada/abb_irb52_7_120.dae", function (collada) {
        console.log(",,,,,,,,,,,collada", collada);
        dae = collada.scene;

        dae.traverse(function (child) {
          if (child.isMesh) {
            // model does not have normals
            child.material.flatShading = true;
          }
        });

        dae.scale.x = dae.scale.y = dae.scale.z = 7.0;
        dae.updateMatrix();

        kinematics = collada.kinematics;
        init();
        animate();
      });
      function animate() {
        requestAnimationFrame(animate);

        const timer = Date.now() * 0.0001;
        camera.position.x = Math.cos(timer) * 20;
        camera.position.y = 10;
        camera.position.z = Math.sin(timer) * 20;
        camera.lookAt(0, 5, 0);
        renderer.render(scene, camera);
        // stats.update();
        TWEEN.update();
      }

      function init() {
        container = document.getElementById("container");
        camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        );

        scene = new THREE.Scene();

        // Grid 网格
        // const grid = new THREE.GridHelper(20, 20, 0xc1c1c1, 0x8d8d8d);
        // scene.add(grid);

        // Add the COLLADA
        scene.add(dae);

        // Lights
        const light = new THREE.HemisphereLight(0x000000, 0xb0e0e6, 3);
        scene.add(light);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // stats = new Stats();
        // console.log("ppp", stats);
        // container.appendChild(stats.dom);

        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(container.clientWidth, container.clientHeight);
        }

        function setupTween() {
          const duration = THREE.MathUtils.randInt(1000, 5000);
          const target = {};
          for (const prop in kinematics.joints) {
            if (kinematics.joints.hasOwnProperty(prop)) {
              if (!kinematics.joints[prop].static) {
                const joint = kinematics.joints[prop];
                const old = tweenParameters[prop];
                const position = old ? old : joint.zeroPosition;
                tweenParameters[prop] = position;
                target[prop] = THREE.MathUtils.randInt(
                  joint.limits.min,
                  joint.limits.max
                );
              }
            }
          }
          kinematicsTween = new TWEEN.Tween(tweenParameters)
            .to(target, duration)
            .easing(TWEEN.Easing.Quadratic.Out);
          kinematicsTween.onUpdate(function (object) {
            for (const prop in kinematics.joints) {
              if (kinematics.joints.hasOwnProperty(prop)) {
                if (!kinematics.joints[prop].static) {
                  kinematics.setJointValue(prop, object[prop]);
                }
              }
            }
          });
          kinematicsTween.start();
          setTimeout(setupTween, duration);
        }
        setupTween();

        animate();
        window.addEventListener("resize", onWindowResize);
      }
    },
    init: function () {},
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100vh;
}
</style>
