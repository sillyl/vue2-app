<template>
  <div class="cloud-box">
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
export default {
  data() {
    return {
      loading: false,
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      light: null,
      cloud: null,
      stats: null,
      controls: null,
      gui: null,
      cloudList: [
        [8.937623, 8.04677e-1, 8.718993],
        [3.870542, 2.344582, 5.528058],
        [4.973743, 6.251506, 4.769484],
        [3.574076, 5.613001, 8.145231],
        [4.81772e-1, 8.920369, 6.994899],
        [3.915466, 8.523287, 5.093424],
        [9.598087, 6.21912e-1, 7.165774],
        [7.949342, 1.969374, 8.824837],
        [8.131774, 1.97701e-1, 2.58492],
        [4.576293, 3.846148, 1.37349],
        [3.216e-3, 8.763286, 2.507579],
        [9.481077, 2.650002, 5.001554],
        [6.595684, 1.050923, 8.120172],
        [5.142327, 5.336006, 8.620918],
        [5.375882, 6.651497, 9.54264],
        [5.68215e-1, 8.14486e-1, 8.846073],
        [2.403259, 6.13785, 7.686553],
        [7.5255e-1, 8.769059, 5.274292],
        [9.997763, 1.19204, 5.470743],
        [8.675432, 4.583e-1, 9.948437],
        [8.758368, 3.455375, 6.32148],
        [2.695132, 1.225212, 5.009805],
        [8.208597, 2.368711, 7.013064],
        [8.094555, 1.898424, 4.206342],
        [7.530836, 2.277964, 3.610314],
        [5.015699, 5.373408, 4.440926],
        [8.095015, 9.589836, 1.021775],
        [7.829163, 5.221661, 4.828796],
        [4.642702, 7.77893, 1.704286],
        [4.976676, 2.103161, 3.14669e-1],
        [6.353577, 7.029209, 9.573775],
        [1.446574, 6.711126, 5.101162],
        [4.914391, 5.94749e-1, 3.02791],
        [7.14777e-1, 8.060196, 1.61756],
        [2.866511, 9.45543e-1, 4.51786],
        [7.181262, 1.819698, 9.094122],
        [3.371798, 2.408947, 9.967757],
        [3.223171, 9.709138, 6.304293],
        [2.841408, 8.599998, 9.94823],
        [9.09204, 5.424149, 8.019422],
        [4.632349, 8.31508e-1, 2.12552e-1],
        [2.612282, 2.44645e-1, 6.177096],
        [6.292571, 7.230723, 1.621264],
        [1.72338, 2.313165, 4.111129],
        [1.394039, 2.279076, 2.823773],
        [5.612747, 8.566734, 9.748038],
        [4.865773, 7.30195e-1, 4.40902e-1],
        [6.588122, 8.662491, 6.239435],
        [3.962326, 4.554531, 2.178757],
        [5.615592, 5.354481, 3.132585],
        [8.878875, 5.315342, 7.39484],
        [3.728078, 5.254661, 6.660611],
        [4.003135, 8.523586, 5.961165],
        [8.89695e-1, 1.65493, 9.24204e-1],
        [5.208152, 9.540407, 9.850191],
        [9.837534, 4.579998, 6.662892],
        [6.218625, 3.070169, 5.249364],
        [3.816914, 9.044073, 1.50831e-1],
        [8.174381, 7.564415, 9.80486e-1],
        [4.3478, 8.157415, 3.957854],
        [8.125823, 9.671902, 3.093795],
        [7.454931, 4.254792, 6.061724],
        [1.086816, 8.997506, 5.457259],
        [8.84443e-1, 9.860342, 9.01702e-1],
        [7.428308, 8.98271e-1, 5.618361],
        [8.665882, 6.18597e-1, 8.583546],
        [9.159264, 5.417113, 3.027484],
        [5.518218, 4.49775, 4.990699],
        [4.026341, 4.42597, 7.347162],
        [9.201311, 6.246129, 5.90872],
        [2.96237e-1, 8.154703, 4.836615],
        [1.218188, 4.988106, 9.068979],
        [6.656234, 9.70533, 8.927538],
        [4.01967, 5.447955, 9.841839],
        [5.863128, 7.451625, 9.58722e-1],
        [4.890589, 1.42208e-1, 3.292652],
        [9.18226, 6.47626, 2.39257],
        [5.43174, 7.841649, 1.839691],
        [8.870447, 1.784597, 2.376711],
        [2.545852, 9.057905, 3.145445],
        [6.488495, 3.785716, 9.147642],
        [7.045518, 9.376729, 6.932512],
        [6.344158, 2.709681, 5.874283],
        [1.689481, 1.349439, 5.436871],
        [3.26708e-1, 3.421456, 6.941896],
        [4.177236, 8.30786, 7.182713],
        [5.203497, 9.630248, 1.800388],
        [8.309053, 5.535076, 4.872594],
        [5.549603, 1.188293, 1.904373],
        [6.854564, 4.693081, 2.509125],
        [1.653228, 8.161664, 6.1319],
        [3.304351, 8.722766, 8.832926],
        [4.677735, 7.787949, 6.558549],
        [6.867583, 5.399194, 3.750432],
        [3.444577, 3.626681, 7.499466],
        [7.022722, 4.672923, 9.961766],
        [4.721056, 1.72116, 1.216993],
        [3.246858, 3.774722, 7.201654],
        [8.51002e-1, 6.797768, 4.018755],
        [2.35069, 5.714195, 5.814256],
        [7.418179, 3.498039, 3.68861],
        [8.621971, 8.6032, 6.470653],
        [3.924556, 4.92814e-1, 1.611921],
        [9.82529e-1, 6.504678, 5.127274],
        [4.153364, 4.40876e-1, 8.270636],
        [4.029416, 2.956976, 3.34951e-1],
        [3.111522, 2.370963, 9.0009e-1],
        [6.399424, 2.366151, 1.4932e-2],
        [1.727438, 3.64366e-1, 8.289504],
        [6.64305, 1.605077, 2.755887],
        [6.389639, 1.808871, 3.062718],
        [2.285887, 4.571658, 6.692474],
        [9.771278, 3.311e-1, 8.182852],
        [8.282721, 7.94605, 9.98661],
        [3.947341, 6.172961, 9.362555],
        [1.24706e-1, 8.77929e-1, 4.495341],
        [6.269551, 4.693211, 9.004411],
        [6.876749, 8.530733, 1.492005],
        [5.996056, 3.933842, 9.571101],
        [6.456032, 7.08035, 5.537285],
        [6.830991, 2.146173, 9.973992],
        [7.144802, 6.242664, 4.185474],
        [6.399177, 6.761693, 4.287102],
        [1.292227, 6.373855, 3.78551e-1],
        [4.319137, 5.535165, 9.198694],
        [8.636819, 2.09537e-1, 1.987159],
        [5.857169, 7.353779, 2.825994],
        [1.801758, 7.406671, 6.728353],
        [6.832801, 7.091379, 2.540438],
        [9.524925, 8.338713, 9.801981],
        [1.883549, 9.689872, 4.08888],
        [5.0062e-2, 7.896587, 8.909047],
        [7.182117, 1.802944, 1.309554],
        [9.925125, 9.007093, 6.706758],
        [9.11559, 2.418274, 7.529635],
        [7.854713, 7.564001, 5.279525],
        [9.546485, 6.42123e-1, 7.52032],
        [4.489797, 8.051413, 2.705233],
        [9.852256, 1.37957, 4.67534],
        [7.792819, 1.991904, 8.561015],
        [9.126688, 9.229635, 8.496719],
        [2.487246, 2.571825, 2.313804],
        [9.446998, 1.339484, 6.857087],
        [3.173509, 2.628849, 2.790054],
        [1.58504, 7.08672, 5.461052],
        [3.809817, 4.625017, 6.422359],
        [6.595098, 6.650641, 7.222098],
        [5.176677, 4.46193e-1, 7.936982],
        [3.80625, 2.613328, 8.81664],
        [4.340979, 9.52302e-1, 5.28667],
        [7.666535, 3.738099, 9.605948],
        [7.546273, 7.870585, 2.607706],
        [1.153303, 1.968227, 7.100474],
        [5.556105, 4.920864, 4.378215],
        [2.391296, 4.865525, 1.741502],
        [3.199675, 6.018706, 4.072664],
        [4.604673, 6.938012, 6.368285],
        [4.193062, 2.724011, 2.177583],
        [4.22474, 2.935634, 3.35444e-1],
        [3.381392, 7.690265, 5.369294],
        [1.319789, 9.171996, 2.056487],
        [3.044005, 2.056162, 6.12822e-1],
        [6.261903, 5.11534, 3.526011],
        [3.942342, 7.337828, 1.2747e-2],
        [1.786721, 8.121078, 1.627598],
        [5.148219, 9.486275, 2.39674e-1],
        [2.27377, 2.870868, 2.112671],
        [2.94862, 6.610496, 3.883792],
        [6.916928, 5.809792, 2.111218],
        [7.93186e-1, 3.95654, 6.774942],
        [6.75329e-1, 2.148949, 6.639554],
        [2.684885, 8.61851, 3.662181],
        [1.25898, 8.078197, 5.856601],
        [1.70584e-1, 1.152324, 3.005264],
        [7.160219, 5.27417e-1, 6.794117],
        [4.630248, 4.81273e-1, 9.100556],
        [1.461287, 5.292343, 8.444374],
        [7.398901, 2.085707, 3.977072],
        [9.592857, 9.203092, 4.781422],
        [8.978315, 4.529462, 8.623894],
        [7.510032, 6.5055, 3.6538],
        [2.820106, 9.234193, 3.791453],
        [6.592009, 3.689518, 3.811201],
        [6.406298, 6.70303, 8.592986],
        [9.33792e-1, 4.217886, 3.316665],
        [1.048613, 2.468652, 4.69477e-1],
        [5.02016e-1, 5.688938, 2.44568e-1],
        [1.151549, 4.056827, 6.72567],
        [2.71704, 8.275323, 4.434253],
        [9.699745, 4.753104, 8.69699e-1],
        [4.680016, 9.444547, 7.254464],
        [3.947246, 5.15256e-1, 6.759826],
        [2.88004, 5.973776, 4.11879],
        [1.58431e-1, 3.453137, 9.321323],
        [1.436281, 1.921669, 1.871018],
        [9.890113, 8.313421, 6.758314],
        [2.751703, 5.225926, 9.482317],
        [4.185057, 8.990138, 4.863126],
        [1.786568, 2.07602e-1, 8.863377],
        [4.91285, 6.987334, 9.156465],
        [2.332094, 9.58463, 7.37982e-1],
        [9.27108, 3.110026, 4.188026],
        [9.338156, 7.521602, 8.111019],
        [3.458613, 6.172175, 1.880046],
        [4.171192, 6.96806, 5.642492],
        [4.283277, 7.747693, 6.863443],
        [4.269952, 2.76166, 8.578028],
        [9.116128, 5.548578, 3.893623],
        [1.606736, 4.148018, 4.341892],
        [3.528116, 8.961832, 9.022808],
        [9.90493e-1, 4.500161, 6.905156],
        [8.558426, 9.882167, 8.349841],
        [5.26953, 5.944525, 9.144475],
        [4.290124, 1.37329e-1, 1.453176],
        [1.588639, 7.803918, 4.494874],
        [5.970688, 2.966499, 4.6824e-2],
        [1.230749, 1.783181, 8.360216],
        [6.422578, 8.754053, 7.000626],
        [3.672247, 2.432689, 8.455162],
        [8.335504, 7.560245, 5.746767],
        [1.864351, 3.603537, 2.303008],
        [2.455523, 9.88557, 6.4523e-2],
        [6.977832, 5.206121, 3.790033],
        [9.62183e-1, 3.64433e-1, 2.095048],
        [1.285781, 8.78902e-1, 8.334286],
        [6.678773, 7.067999, 7.651129],
        [4.782913, 7.209907, 9.920318],
        [6.8724e-2, 2.758561, 2.215069],
        [6.238725, 1.172612, 7.63745],
        [1.135713, 6.035576, 5.841146],
        [7.710982, 2.497553, 7.874342],
        [2.523879, 4.139691, 9.409998],
        [5.593621, 3.48498, 3.220026],
        [3.918696, 7.259124, 8.376758],
        [4.639178, 5.821189, 2.532935],
        [9.987194, 4.446093, 8.227385],
        [4.728134, 8.851552, 1.039187],
        [6.428396, 6.417362, 4.342655],
        [5.918782, 5.265705, 9.722771],
        [3.266229, 4.327696, 8.068838],
        [1.841601, 3.288857, 1.000745],
        [7.91085, 9.407298, 3.088427],
        [6.457492, 2.676926, 2.158018],
        [7.228991, 5.648259, 3.274099],
        [2.784607, 8.772675, 6.330128],
        [4.514339, 1.563876, 8.92657],
        [9.745102, 3.586219, 4.978379],
        [7.458375, 9.686521, 2.089874],
        [6.821333, 2.84587e-1, 8.308698],
        [3.529215, 9.815544, 1.282639],
        [7.831127, 4.792766, 3.787969],
        [9.928971, 7.285398, 5.96096e-1],
        [7.971483, 1.705026, 5.407695],
        [6.554788, 9.401537, 5.532065],
        [5.783408, 5.710634, 6.889784],
        [7.912413, 7.576357, 5.687205],
        [8.178494, 9.833452, 6.049759],
        [7.763163, 2.283525, 2.425953],
        [4.395595, 3.740233, 3.670106],
        [1.645465, 5.454685, 9.460601],
        [1.299217, 8.27265e-1, 3.098952],
        [9.389157, 5.154321, 7.366634],
        [7.272356, 9.437896, 4.603324],
        [4.305743, 8.07972e-1, 8.399395],
        [1.04606, 6.320302, 1.367178],
        [2.741534, 4.048675, 6.26879e-1],
        [5.326128, 9.619972, 9.845418],
        [7.273368, 9.090446, 1.915118],
        [6.708002, 1.248164, 7.182165],
        [6.845215, 9.293703, 2.042452],
        [8.774479, 4.543841, 3.745983],
        [5.792873, 7.360192, 9.411006],
        [6.078663, 2.655399, 1.090863],
        [8.704803, 7.711533, 5.464788],
        [9.327181, 7.627738, 2.861713],
        [1.206642, 1.440617, 4.564753],
        [6.721271, 8.149313, 4.006449],
        [9.779108, 4.542412, 1.375111],
        [3.01206, 7.764482, 9.791345],
        [8.849057, 6.7064e-2, 2.245042],
        [4.641676, 1.191287, 5.212297],
        [8.215744, 5.037779, 1.893523],
        [4.014227, 3.474169, 2.256413],
        [7.423327, 5.429181, 1.018503],
        [3.27099, 6.220683, 4.793709],
        [4.33952, 9.444682, 4.752635],
        [8.4101e-2, 1.568799, 8.709587],
        [9.903556, 9.207443, 7.25336],
        [8.932547, 9.692587, 5.51821e-1],
        [7.572236, 5.613715, 5.215671],
        [7.39125e-1, 6.827555, 9.957585],
        [1.91267, 2.67907, 4.65593e-1],
        [4.59462e-1, 2.514142, 7.732078],
        [4.282642, 5.006284, 5.422165],
        [8.56703e-1, 4.225491, 9.60379e-1],
        [7.209654, 4.973755, 6.072495],
        [9.355765, 7.281113, 8.972812],
        [5.13564, 8.824425, 3.72536e-1],
        [2.99682, 3.31173, 4.982395],
        [4.344549, 3.458179, 4.036735],
        [1.956203, 2.802838, 4.356983],
        [2.75679, 3.913305, 7.012813],
        [2.957039, 3.759557, 5.146119],
        [6.634439, 6.186801, 3.643969],
        [6.96897, 4.33138e-1, 7.027446],
        [1.024605, 1.991704, 6.625653],
        [6.426265, 2.42919, 4.435979],
        [3.04774e-1, 9.139531, 4.097801],
        [5.336377, 5.817646, 1.183992],
        [4.557438, 9.065154, 6.227092],
        [2.144116, 2.183258, 4.097053],
        [4.999913, 9.99674, 6.994273],
        [9.738746, 8.380182, 1.780022],
        [8.650741, 1.032535, 5.389427],
        [4.824927, 5.61651, 8.130526],
        [3.622374, 3.349066, 5.960326],
        [8.406801, 2.380557, 5.608124],
        [3.631897, 5.442482, 1.403876],
        [1.148819, 4.057004, 3.66466],
        [7.653468, 7.5894, 6.724528],
        [7.724449, 4.527112, 8.309925],
        [6.365736, 1.845895, 7.039303],
        [1.05577e-1, 8.639706, 4.456155],
        [3.067257, 3.847242, 3.331334],
        [3.22122, 5.654328, 3.603909],
        [9.962524, 1.103346, 4.487771],
        [1.694477, 6.514275, 7.963538],
        [8.446293, 5.282326, 8.919725],
      ],
    };
  },
  props: {
    showScore: {
      type: Boolean,
      default: true,
    },
    cloudListItem: {
      type: Array,
    },
  },
  mounted() {
    if (this.cloudListItem && this.cloudListItem.length > 0) {
      this.cloudList = this.cloudListItem;
    }
    this.draw();
  },
  methods: {
    //设置背景颜色
    initRender() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      console.log(this.renderer.domElement, "this.renderer.domElement");
      // this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0)); //设置背景颜色
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // this.renderer.setSize(window.clientWidth, window.clientHeight);
      // this.renderer.setSize('1100','600');
      let con = document.getElementById("container");
      con.appendChild(this.renderer.domElement);
    },
    // 创建相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(0, 0, 200);
    },
    // scene
    initScene() {
      this.scene = new THREE.Scene();
    },
    // light
    initLight() {
      this.scene.add(new THREE.AmbientLight(0x404040));
      this.light = new THREE.DirectionalLight(0xffffff);
      this.light.position.set(1, 1, 1);
      this.scene.add(this.light);
    },
    initModel() {
      //轴辅助 （每一个轴的长度）
      // var object = new THREE.AxesHelper(500);
      // this.scene.add(object);
      //创建THREE.PointCloud粒子的容器
      var geometry = new THREE.BoxGeometry();
      //创建THREE.PointCloud纹理
      var material = new THREE.PointCloudMaterial({
        size: 0.001,
        vertexColors: true,
        color: 0xffffff,
      });
      //循环将粒子的颜色和位置添加到网格当中
      for (var x = -5; x <= 5; x++) {
        for (var y = -5; y <= 5; y++) {
          var particle = new THREE.Vector3(x * 10, y * 10, 0);
          geometry.vertices.push(particle);
          geometry.colors.push(new THREE.Color(+this.randomColor()));
        }
      }
      this.cloud = new THREE.PointCloud(geometry, material);
      this.scene.add(this.cloud);
    },
    //随机生成颜色
    /*
    此处背景色为黑色 所以点的颜色选择是比较明显的白色，
    底下代码打开的话 有惊喜效果
    */
    randomColor() {
      // var arrHex = [
      //     "0",
      //     "1",
      //     "2",
      //     "3",
      //     "4",
      //     "5",
      //     "6",
      //     "7",
      //     "8",
      //     "9",
      //     "a",
      //     "b",
      //     "c",
      //     "d",
      //     "e",
      //     "f",
      //   ],
      //   strHex = "0x",
      //   index;
      // for (var i = 0; i < 6; i++) {
      //   index = Math.round(Math.random() * 15);
      //   strHex += arrHex[index];
      // }
      // console.log(strHex,'strHex');
      let strHex = 0x000;
      return strHex;
    },
    //初始化性能插件
    initStats() {
      this.stats = new Stats();
      let con = document.getElementById("container");
      con.appendChild(this.stats.dom);
    },
    //用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
    initControls() {
      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      // 如果使用animate方法时，将此函数删除
      //controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      this.controls.dampingFactor = 0.5;
      //是否可以缩放
      this.controls.enableZoom = true;
      //是否自动旋转
      this.controls.autoRotate = false;
      //设置相机距离原点的最远距离 20
      this.controls.minDistance = 10;
      //设置相机距离原点的最远距离 80
      this.controls.maxDistance = 50;
      //是否开启右键拖拽
      this.controls.enablePan = true;
    },
    //生成gui设置配置项
    initGui() {
      let that = this;
      //声明一个保存需求修改的相关数据的对象 0xffffff
      let gui = {
        size: 0.2,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        color: 0xffffff,
        sizeAttenuation: true,
        rotateSystem: true,
        redraw() {
          if (that.cloud) {
            that.scene.remove(that.cloud);
          }
          that.createParticles(
            gui.size,
            gui.transparent,
            gui.opacity,
            gui.vertexColors,
            gui.sizeAttenuation,
            gui.color
          );
          //设置是否自动旋转
          // that.controls.autoRotate = gui.rotateSystem;
        },
      };
      var datGui = new GUI();
      //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）gui.add(controls, 'size', 0, 10).onChange(controls.redraw);
      datGui.add(gui, "transparent").onChange(gui.redraw);
      datGui.add(gui, "opacity", 0, 1).onChange(gui.redraw);
      datGui.add(gui, "vertexColors").onChange(gui.redraw);
      datGui.addColor(gui, "color").onChange(gui.redraw);
      datGui.add(gui, "sizeAttenuation").onChange(gui.redraw);
      datGui.add(gui, "rotateSystem").onChange(gui.redraw);
      gui.redraw();
    },
    // 生成粒子的方法
    createParticles: function (
      size,
      transparent,
      opacity,
      vertexColors,
      sizeAttenuation,
      color
    ) {
      //存放粒子数据的网格
      var geom = new THREE.BoxGeometry();
      //样式化粒子的THREE.PointCloudMaterial材质
      var material = new THREE.PointCloudMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        vertexColors: vertexColors,
        sizeAttenuation: sizeAttenuation,
        color: color,
      });
      console.log(this.cloudList.length, "this.cloudList.length");
      for (let i = 0; i < this.cloudList.length; i++) {
        var particle = new THREE.Vector3(
          this.cloudList[i][0],
          this.cloudList[i][1],
          this.cloudList[i][2]
        );
        geom.vertices.push(particle);
        // eslint-disable-next-line no-redeclare
        var color = new THREE.Color(+this.randomColor());
        //.setHSL ( h, s, l ) h — 色调值在0.0和1.0之间 s — 饱和值在0.0和1.0之间 l — 亮度值在0.0和1.0之间。 使用HSL设置颜色。
        //随机当前每个粒子的亮度
        color.setHSL(color.getHSL().h, color.getHSL().s, 1.0);
        geom.colors.push(color);
      }
      //生成模型，添加到场景当中
      this.cloud = new THREE.PointCloud(geom, material);
      this.scene.add(this.cloud);
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    //窗口变动触发的函数
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.render();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      //更新控制器
      this.controls.update();
      this.render();
      //更新性能插件
      this.stats.update();
      requestAnimationFrame(this.animate);
    },
    // 调用
    draw() {
      this.initRender();
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initModel();
      this.initControls();
      this.initStats();
      this.initGui();
      this.animate();
      window.onresize = this.onWindowResize;
    },
  },
};
</script>

<style lang="scss" scoped>
.cloud-box {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  .cloud-main {
    #container {
      text-align: center;
      // border:green 1px solid;
    }
    .cloud-title {
      position: relative;
      text-align: center;
      font-size: 18px;
      .cloud-score {
        color: rgb(72, 223, 72);
        position: absolute;
        margin-top: 2%;
        left: 3%;
      }
    }
  }
}
</style>
