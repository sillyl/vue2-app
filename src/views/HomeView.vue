<template>
  <div class="home">
    <!-- <Konva /> -->
    <!-- <PgmKonva /> -->
    <div class="map-container" id="map"></div>
  </div>
</template>

<script>
import Konva from "@/components/Konva/Index.vue";
import PgmKonva from "./PgmKonva/Index.vue";
// import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
// import "leaflet-contextmenu/dist/leaflet.contextmenu";
import L, { featureGroup } from "leaflet";
import "leaflet/dist/leaflet.css";

/* 解决 默认 marker 图片展示不出来问题 */

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const iconUrl = require("@/assets/img/marker.png");
import { lineMap } from "./data/lineMap";
import { point } from "./data/point";
import { polygon } from "./data/polygon";
export default {
  name: "HomeView",
  data() {
    return {
      map: null,
      // OSMUrl:
      // "https://api.mapbox.com/styles/v1/hoibing/ckx76wu156s4k14nqplvf3io5/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaG9pYmluZyIsImEiOiJja3B5d2Q5eWowZXFtMnFudWp4NmJhczBsIn0.t_xj1YNC51eVV0HcvFcvEw&title=copy&zoomwheel=true&fresh=true",
      // OSMUrl:
      //   "'webrd0{s}.is.autonavi.com/appmaptile?&size=1&scale=1&style=8&x={x}&y={y}&z={z}'",
      OSUrl:
        "http://localhost:8080/dev-api/cpix/v1.0/configure/map/consumer/view/ff80818187785f020187786e1fd70001/{z}/{x}/{y}.png",
    };
  },
  components: {
    // Konva,
    // PgmKonva,
    // CesiumViewer,
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let map = L.map("map", {
        minZoom: 3,
        maxZoom: 14,
        // center: [39.550339, 116.114129],
        center: [31.02, 120.2], // ["纬度","经度"]
        zoom: 5,
        zoomControl: true, // 缩放控件
        attributionControl: false, // 版权控件
        crs: L.CRS.EPSG3857,
      });
      this.map = map; //data上需要挂载
      window.map = map;

      // osm
      const osm = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\\/a> contributors',
      }).addTo(map);

      // water color map
      const watercolor = L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: "abcd",
          minZoom: 1,
          maxZoom: 16,
          ext: "jpg",
        }
      ).addTo(map);

      const cn = L.tileLayer(
        // "https://img2.baidu.com/it/u=428561421,1547551643&fm=253&fmt=auto&app=138&f=PNG?w=388&h=500"
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
      ).addTo(map);

      // Marker
      const myIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [20, 20],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
        // shadowUrl: "favicon.ico",
        // shadowSize: [10, 10],
        // shadowAnchor: [22, 94],
      });

      const firstMarker = L.marker([31.02, 120.2], {
        icon: myIcon,
        draggable: true,
      }).addTo(map);
      firstMarker
        .bindPopup("这里是太湖南" + firstMarker.getLatLng())
        .openPopup();
      // console.log("marker.toGeoJSON();", firstMarker.toGeoJSON());

      // 问题： 两个marker 后者会覆盖前者
      // const secendMarker = L.marker([31.02, 120.2], {
      //   icon: myIcon,
      //   draggable: true,
      // }).addTo(map);
      // secendMarker.bindPopup("谁知道" + secendMarker.getLatLng()).openPopup();

      // 图层控件 layer Controller
      const baseMaps = {
        OpenStreetMap: osm,
        "OpenStreetMap.HOT": cn,
        watercolor: watercolor,
      };

      const overlayMaps = {
        "First Marker": firstMarker,
        // "Second Marker": secendMarker,
      };

      // map.removeLayer(osm); // 感觉没啥效果
      L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

      /* GeoJson */
      L.geoJSON(point).addTo(map);
      L.geoJSON(lineMap).addTo(map);
      L.geoJSON(polygon, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`<b>Name: </b>` + feature.properties.name);
        },
        style: {
          fillColor: "red",
          fillOpacity: 0.3,
          stroke: false,
        },
      }).addTo(map);
    },
  },
};
</script>
<style lang="scss" scoped>
.map-container {
  position: absolute;
  left: 0;
  top: 0px; //添加100px间距，把上面的导航栏让出来
  width: 100%;
  height: 100%;
}
</style>
