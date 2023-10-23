<template>
  <div id="cesiumContainer" @dragover="allowDrop" @drop="drop">
    <nav>
      <button @click="draw('point')">点绘制</button>
      <button @click="draw('polyline')">线绘制</button>
      <button @click="draw('polygon')">圆绘制</button>
      <button @click="clearDrawEntities">清空</button>
    </nav>
  </div>
</template>
<script>
export default {
  name: "cesiumView",
  data() {
    return {
      cesiumContainer: null,
      mapViewer: null,
      tempEntities: [],
      activeNames: [],
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    handleChange() {},

    initMap() {
      // 此应用程序正在使用 Cesium 的默认 ion 访问令牌，请在使用 Ceisum API 调用之前先注册一个你自己的 Cesium ion 访问令牌
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNDVhMjQ0Yi05MDg4LTRlNDYtYTIxMi00YmI4ZWYxOWMyNTgiLCJpZCI6MTQ5MzYwLCJpYXQiOjE2ODc3ODQ0OTh9.KlhT_LCnsEtYyawpEmJ_wx44_qTUbgze-SxGMRavbAM";
      const viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false, // 是否显示动画控件
        shouldAnimate: false, // 是否初始时刻运动
        homeButton: true, // 是否显示 Home 按钮
        fullscreenButton: true, // 是否显示全屏按钮
        baseLayerPicker: true, // 是否显示图层选择控件 去掉自带的图层选择器
        geocoder: false, // 是否显示地名查找控件，设置为 true，则无法查询
        timeline: false, // 是否显示时间线控件
        sceneModePicker: false, // 是否显示投影方式控件 三维 / 二维
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: false, // 是否显示点击要素之后显示的信息 信息框小部件
        requestRenderMode: false, //true 启用请求渲染模式：更新实体需拖动地图 视图才更新 [true 加载完 entity 后 requestRender 一下]
        scene3DOnly: false, // 每个几何实例将只能以 3D 渲染以节省 GPU 内存 如果设置为 true，则所有几何图形以 3D 模式绘制以节约 GPU 资源
        sceneMode: 3, // 初始场景模式 1 2D 模式 2 2D 循环模式 3 3D 模式  Cesium.SceneMode
        fullscreenElement: document.body, // 全屏时渲染的 HTML 元素
        selectionIndicator: false, // 是否显示选取指示器组件
      });
      //设置初始位置
      // viewer.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(113.764043, 34.005325, 3000),
      // });

      // entities 默认点位
      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(116.39, 39.91, 400),
        point: {
          pixelSize: 10,
          color: new Cesium.Color(0, 1, 0, 1),
        },
      });
      //将摄像头设置到远点处
      // viewer.trackedEntity = entity;

      //阿里云地理信息工具 数据获取
      viewer.dataSources.add(
        Cesium.GeoJsonDataSource.load(
          "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"
        )
      );

      // Viewer.scene.globe.show = false;
      // 隐藏logo
      viewer.cesiumWidget.creditContainer.style.display = "none";

      this.mapViewer = viewer;

      window.viewer = viewer;

      console.log(viewer, "viewer");
    },
    // deleteRectangle() {},

    //获取经纬度
    getPosition(viewer) {
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (event) {
        let cartesian = viewer.scene.pickPosition(event.position);
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        let lng = Cesium.Math.toDegrees(cartographic.longitude); // 经度
        let lat = Cesium.Math.toDegrees(cartographic.latitude); // 纬度
        let alt = cartographic.height; // 高度
        let coordinate = {
          longitude: Number(lng.toFixed(6)),
          latitude: Number(lat.toFixed(6)),
          altitude: Number(alt.toFixed(2)),
        };
        console.log(coordinate, "coordinate");
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    /**
     * Role map drop
     * Desc 元素拖入地图放置事件
     */
    drop(e) {
      e.preventDefault();

      this.getPosition(window.viewer);
      // console.log(e, "eeeeeeeeee");
      // const pos = transform(this.map.getEventCoordinate(e), "EPSG:3857", "EPSG:4326");
      // console.log(pos, "pos");

      // const pos = ol.proj.transform(pos, 'EPSG:3857', 'EPSG:4326');
      // const data = e.dataTransfer.getData("Text");
      // console.log(data,'data')
    },
    //图标拖动效果
    drag(event, item) {
      console.log(event, item, "---------------");
    },
    /**
     * Role dragover
     * Desc 在可拖动的元素或者被选择的文本被拖进一个有效的放置目标时（每几百毫秒）触发,
     *      允许元素拖入地图
     */
    allowDrop(e) {
      e.preventDefault();
      // event.preventDefault
    },
    draw(type) {
      //点绘制
      let _this = this;
      let viewer = this.mapViewer;
      let tempEntities = this.tempEntities;
      let position = [];
      let tempPoints = [];

      /**
       * Role  depthTestAgainstTerrain 开启地形深度检测
       * desc  开启地形检测后，会计算其他地理要素和地形之间的遮挡关系。未开启时，将会出现场景变化时，地物位置显示不正确。
       */
      viewer.scene.globe.depthTestAgainstTerrain = true;

      /**
       * Role ScreenSpaceEventHandler
       * type => canvas
       * default => Document
       * desc 处理用户输入事件。可以添加自定义功能以在以下位置执行当用户输入输入时。
       */
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

      switch (type) {
        case "point":
          //监听 鼠标左键
          handler.setInputAction(function (movement) {
            // 从相机位置通过windowPosition 世界坐标中的像素创建一条射线。返回Cartesian3射线的位置和方向。
            let ray = viewer.camera.getPickRay(movement.position);
            // 查找射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。返回Cartesian3对象
            position = viewer.scene.globe.pick(ray, viewer.scene);
            let point = _this.drawPoint(position);
            tempEntities.push(point);

            /**
             * Role ScreenSpaceEventType
             * Desc 此枚举类型用于对鼠标事件进行分类:向下，向上，单击，双击，按住按钮时移动。
             */
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
          // 左键双击停止绘制
          handler.setInputAction(function () {
            handler.destroy(); //关闭事件句柄
            handler = null;
          }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
          // 右击单击停止绘制
          handler.setInputAction(function () {
            handler.destroy(); //关闭事件句柄
            handler = null;
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
          break;
        case "polyline":
          //鼠标移动事件
          handler.setInputAction(function (movement) {},
          Cesium.ScreenSpaceEventType.MIDDLE_CLICK);
          //左键点击操作
          handler.setInputAction(function (click) {
            //调用获取位置信息的接口
            let ray = viewer.camera.getPickRay(click.position);
            position = viewer.scene.globe.pick(ray, viewer.scene);
            tempPoints.push(position);
            let tempLength = tempPoints.length;
            //调用绘制点的接口
            let point = _this.drawPoint(tempPoints[tempPoints.length - 1]);
            tempEntities.push(point);
            if (tempLength > 1) {
              let pointline = _this.drawPolyline([
                tempPoints[tempPoints.length - 2],
                tempPoints[tempPoints.length - 1],
              ]);
              tempEntities.push(pointline);
            } else {
              // tooltip.innerHTML = "请绘制下一个点，右键结束";
            }
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
          //右键点击操作
          handler.setInputAction(function (click) {
            tempPoints = [];
            handler.destroy(); //关闭事件句柄
            handler = null;
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
          break;
        case "polygon":
          //鼠标移动事件
          handler.setInputAction(function (movement) {},
          Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          //左键点击操作
          handler.setInputAction(function (click) {
            //调用获取位置信息的接口
            let ray = viewer.camera.getPickRay(click.position);
            position = viewer.scene.globe.pick(ray, viewer.scene);
            tempPoints.push(position);
            let tempLength = tempPoints.length;
            //调用绘制点的接口
            let point = _this.drawPoint(position);
            tempEntities.push(point);
            if (tempLength > 1) {
              let pointline = _this.drawPolyline([
                tempPoints[tempPoints.length - 2],
                tempPoints[tempPoints.length - 1],
              ]);
              tempEntities.push(pointline);
            } else {
              // tooltip.innerHTML = "请绘制下一个点，右键结束";
            }
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
          //右键点击操作
          handler.setInputAction(function (click) {
            let cartesian = viewer.camera.pickEllipsoid(
              click.position,
              viewer.scene.globe.ellipsoid
            );

            if (cartesian) {
              let tempLength = tempPoints.length;
              if (tempLength < 3) {
                alert("请选择3个以上的点再执行闭合操作命令");
              } else {
                //闭合最后一条线
                let pointline = _this.drawPolyline([
                  tempPoints[tempPoints.length - 1],
                  tempPoints[0],
                ]);
                tempEntities.push(pointline);
                _this.drawPolygon(tempPoints);
                tempEntities.push(tempPoints);
                handler.destroy(); //关闭事件句柄
                handler = null;
              }
            }
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
          break;
      }
    },
    drawPoint(position, config) {
      let viewer = this.mapViewer;
      let config_ = config ? config : {};
      return viewer.entities.add({
        name: "点几何对象",
        position: position,
        point: {
          color: Cesium.Color.SKYBLUE,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    },
    drawPolyline(positions, config_) {
      let viewer = this.mapViewer;
      if (positions.length < 1) return;
      let config = config_ ? config_ : {};
      return viewer.entities.add({
        name: "线几何对象",
        polyline: {
          positions: positions,
          width: config.width ? config.width : 5.0,
          material: new Cesium.PolylineGlowMaterialProperty({
            color: config.color
              ? new Cesium.Color.fromCssColorString(config.color)
              : Cesium.Color.GOLD,
          }),
          depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
            color: config.color
              ? new Cesium.Color.fromCssColorString(config.color)
              : Cesium.Color.GOLD,
          }),
          clampToGround: true,
        },
      });
    },
    drawPolygon(positions, config_) {
      let viewer = this.mapViewer;
      if (positions.length < 2) return;
      let config = config_ ? config_ : {};
      return viewer.entities.add({
        name: "面几何对象",
        polygon: {
          hierarchy: positions,
          material: config.color
            ? new Cesium.Color.fromCssColorString(config.color).withAlpha(0.2)
            : new Cesium.Color.fromCssColorString("#FFD700").withAlpha(0.2),
        },
      });
    },
    //清除实体
    clearDrawEntities() {
      let viewer = this.mapViewer;
      this.tempEntities = [];
      // 清除之前的实体
      const entitys = viewer.entities._entities._array;
      let length = entitys.length;
      // 倒叙遍历防止实体减少之后entitys[f]不存在
      for (let f = length - 1; f >= 0; f--) {
        if (
          entitys[f]._name &&
          (entitys[f]._name === "点几何对象" ||
            entitys[f]._name === "线几何对象" ||
            entitys[f]._name === "面几何对象")
        ) {
          viewer.entities.remove(entitys[f]);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  position: relative;
  header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
  }
  .leftBar {
    width: 250px;
    height: 50%;
    position: absolute;
    top: 30%;
    z-index: 999;
    .el-collapse-item__content {
      display: flex;
      justify-content: space-between;
    }
    .collapseItems {
      width: 100%;
      height: auto;
      .ivu-icon {
        display: block;
      }
      b {
        display: block;
        text-align: center;
      }
    }
  }
  nav {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 150px;
    height: 180px;
    // background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button {
      width: 100%;
      height: 30px;
      cursor: pointer;
    }
  }
}
</style>
