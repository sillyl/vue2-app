<template>
  <div style="background: #f6f6f6">
    <div
      id="pgmContainer"
      :style="{ height: tableHeight + 'px' }"
      :max-height="tableHeight"
      style="overflow-y: auto; overflow-x: auto"
    >
      <v-stage
        class="konva-stage"
        ref="konvaStage"
        :config="konvaConfig.stage"
        :scale="konvaConfig.scale"
        @contextmenu="onContextmenu"
        @click="onStageClick"
        @touchstart="onStageTouchstart"
      >
        <v-layer ref="konvaLayer">
          <v-group :config="konvaConfig.group">
            <v-image
              :config="{ image: konvaConfig.pgmImage }"
              @click="onMouseClick"
              @tap="onTouchTap"
              @mousedown="onMouseDownForArrow"
              @touchstart="onTouchStartForArrow"
              @mousemove="onMouseMoveForArrow"
              @touchmove="onTouchMoveForArrow"
              @mouseup="onMouseUpForArrow"
              @touchend="onTouchEndForArrow"
            />
          </v-group>
          <v-group :config="konvaConfig.group">
            <v-circle
              v-for="(item, index) in konvaConfig.curPoint"
              :key="index + 3000"
              :config="{
                x: item.x,
                y: item.y,
                radius: 8,
                fill: '#ffff00',
                stroke: 'black',
                strokeWidth: 3,
              }"
            >
            </v-circle>
            <v-arrow
              v-for="(item, index) in konvaConfig.curPoint"
              :key="index + 2000"
              :config="{
                x: item.x,
                y: item.y,
                points: [
                  0,
                  0,
                  50 * Math.cos((item.omega * Math.PI) / 180),
                  50 * Math.sin((item.omega * Math.PI) / 180),
                ],
                pointerLength: 30,
                pointerWidth: 10,
                fill: '#ffff00',
                stroke: 'black',
                strokeWidth: 3,
              }"
            >
            </v-arrow>
          </v-group>
          <v-group :config="konvaConfig.group">
            <v-line
              v-for="(item, index) in konvaConfig.polyline"
              :key="index + 1000"
              :config="{
                points: item,
                stroke: '#ff0000',
                strokeWidth: 6,
                lineCap: 'round',
                lineJoin: 'round',
              }"
            >
            </v-line>
          </v-group>
          <v-group
            :config="konvaConfig.group"
            @click="onMouseClick"
            @tap="onTouchTap"
            @dragstart="onDragStart"
            @dragmove="onDragMove"
            @dragend="onDragEnd"
          >
            <v-circle
              v-for="(item, index) in konvaConfig.points"
              :key="index"
              :config="{
                id: index,
                x: item.x,
                y: item.y,
                radius: 8,
                fill: '#ff0000',
              }"
              :draggable="true"
            >
            </v-circle>
          </v-group>
          <v-group
            :config="konvaConfig.group"
            @tap="onTouchTap"
            @mousedown="onMouseDownForArrow"
            @touchstart="onTouchStartForArrow"
            @mousemove="onMouseMoveForArrow"
            @touchmove="onTouchMoveForArrow"
            @mouseup="onMouseUpForArrow"
            @touchend="onTouchEndForArrow"
          >
            <v-arrow
              v-for="(item, index) in konvaConfig.points"
              :key="index + 99"
              :config="{
                id: index,
                x: item.x,
                y: item.y,
                points: [
                  0,
                  0,
                  50 * Math.cos((item.omega * Math.PI) / 180),
                  50 * Math.sin((item.omega * Math.PI) / 180),
                ],
                pointerLength: 30,
                pointerWidth: 10,
                fill: '#ffff00',
                stroke: 'black',
                strokeWidth: 3,
              }"
            >
            </v-arrow>
          </v-group>
        </v-layer>
      </v-stage>
      <CircleTooltip
        :visible="visibleCircleTooltip"
        :triggerPosition="triggerPosition"
        :circleNeedData="circleNeedData"
        ref="circleTooltipRef"
        @saveCircleTooltipData="saveCircleTooltipData"
        @deleteCircleTooltipData="deleteCircleTooltipData"
      />
      <div id="pgmLayer">
        <!-- <el-card class="box-card" style="width: 396px; height: 296px">
          <div slot="header" class="clearfix">
            <span>导航路径属性配置</span>
          </div>
          <div class="text item">
            <el-form ref="form" :model="selectPoint" label-width="80px">
              <el-form-item label="航向(角度)" prop="selectPoint">
                <el-input
                  v-model="selectPoint.location.omega"
                  placeholder="请输入航向角度"
                  @change="onOmegaChange()"
                  style="width: 120px"
                ></el-input>
              </el-form-item>
              <el-form-item label="过程属性" prop="process">
                <el-button @click="addProcessItem()"> + </el-button>
                <div v-for="(item, index) in selectPoint.process" :key="index">
                  <el-row>
                    <el-col :span="10">
                      <el-select
                        v-model="selectPoint.process[index].target"
                        placeholder="--请选择--"
                      >
                        <el-option
                          v-for="item in identifierList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="10">
                      <el-select
                        v-model="selectPoint.process[index].action"
                        placeholder="--请选择--"
                      >
                        <el-option
                          v-for="item in metaTaskList"
                          :key="item.method"
                          :label="item.name"
                          :value="item.method"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="4">
                      <el-button @click="deleteProcessItem(index)">
                        -
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
              <el-form-item label="节点属性" prop="process">
                <el-button @click="addStationItem()"> + </el-button>
                <div v-for="(item, index) in selectPoint.station" :key="index">
                  <el-row>
                    <el-col :span="10">
                      <el-select
                        v-model="selectPoint.station[index].target"
                        placeholder="--目标物--"
                      >
                        <el-option
                          v-for="item in identifierList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="10">
                      <el-select
                        v-model="selectPoint.station[index].action"
                        placeholder="--动作--"
                      >
                        <el-option
                          v-for="item in metaTaskList"
                          :key="item.method"
                          :label="item.name"
                          :value="item.method"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="4">
                      <el-button @click="deleteStationItem(index)">
                        -
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-card> -->
      </div>
    </div>

    <div style="height: 200px; background: #e8e8e8">
      <el-row>
        <el-col :span="10">
          <div>
            <a>任务名称 </a
            ><el-input
              v-model="task.name"
              maxlength="60"
              show-word-limit
              style="width: 300px"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6"
          ><a>场景选择 </a>
          <el-select
            v-model="scence.id"
            placeholder="请选择场景"
            @change="onScenceSelectChange()"
            style="width: 140px"
          >
            <el-option
              v-for="item in scenceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <div>
            <el-button ref="btn1" size="small" @click="onSelectPoint()"
              >选择导航点</el-button
            >
            <el-button
              size="small"
              @click="onGrubPoint()"
              :disabled="!pointSelect"
              >当前位置设为导航点</el-button
            >
          </div>
        </el-col>
        <el-col :span="2">
          <div><el-button size="small" @click="onOk()">确定</el-button></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <div>
            <a>任务描述 </a
            ><el-input
              v-model="task.describe"
              type="textarea"
              maxlength="250"
              show-word-limit
              :rows="6"
              style="width: 300px"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <el-row>
            <div>
              <a>添加设备 </a
              ><el-button
                icon="el-icon-plus"
                size="small"
                @click="dialogVisible = true"
                >添加机器人</el-button
              >
            </div>
          </el-row>
          <el-row>
            <a>循环次数 </a
            ><el-input
              v-model="task.params.circulate"
              style="width: 120px"
            ></el-input>
          </el-row>
        </el-col>
        <el-col :span="6">
          <a>地 图 切 换 </a>
          <el-select
            v-model="scence.mapId"
            placeholder="请选择地图包"
            @change="onSelectChange()"
            style="width: 140px"
          >
            <el-option
              v-for="item in mapList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <div>
            <el-button size="small" @click="onCancel()">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="添加机器人"
      width="60%"
      :visible="dialogVisible"
      :before-close="onSave"
    >
      <el-transfer
        v-model="task.deviceIds"
        :data="deviceList"
        @change="onTransferChange"
      ></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import CircleTooltip from "../CircleTooltip/Index.vue";
import {
  getMapAllList,
  viewMap,
  getAllDeviceList,
  getDeviceInfo,
  addScence,
  getScenceList,
  addTask,
  getScenceMetaTaskList,
  getTaskInfo,
  updateTask,
  getIdentifierList,
} from "@/api/index.js";
import { MapImage } from "@/utils/maping.js";
import { getCurrentTime } from "@/utils/index.js";
import { getMinPoint } from "@/utils/CoordinatePickupFun.js";
import { isEmpty } from "lodash";

export default {
  name: "investigate",
  components: {
    CircleTooltip,
  },
  data() {
    return {
      visibleCircleTooltip: false,
      triggerPosition: null,
      threshold: 0.01,
      isTouchStart: false,
      tableHeight: 0,
      dialogVisible: false,
      deviceId: this.$route.query.deviceId,
      taskId: this.$route.query.taskId,
      showModel: "tileMap", // tileMap pgmMap
      pointSelect: false,
      metaTaskList: [],
      identifierList: [],
      mapList: [],
      scenceList: [],
      deviceList: [],
      task: {
        id: "",
        name: "导航任务",
        describe: "",
        method: "TASK_NAVIGATION",
        params: {
          circulate: 1,
          point: [],
        },
        deviceIds: [],
        location: "",
        scenceId: "",
      },
      scence: {
        id: "",
        name: "",
        deviceIds: [],
        mapId: "",
      },
      points: new Map(),
      selectPoint: { location: { omega: 0 }, process: [], station: [] },
      selectPointId: 0,
      selectArrowId: -1,
      selectArrowX: 0,
      selectArrowY: 0,
      selectPoint2Id: -1,
      selectPoint2X: 0,
      selectPoint2Y: 0,
      konvaConfig: {
        stage: {
          width: 2000,
          height: 2000,
        },
        group: {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        },
        pgmImage: null,
        points: [],
        polyline: [],
        curPoint: [{ x: 100, y: 100, omega: 45 }],
        scaleDistance: 0,
      },
      selectMoveEntity: null, // 需要移动的导航点
      curLocationEntity: null, // 当前设备的位置
      curLocationPosition: null,
      polylineEntity: null,
      travelUrl: "url",
      konvaScrollStartX: -1,
      konvaScrollStartY: -1,
      navigationPoint: null,
      curClickPointCartesian: null,
    };
  },
  computed: {
    circleNeedData() {
      return {
        stage: this.konvaConfig.stage,
        points: this.points,
        threshold: this.threshold,
        id: "pgmContainer",
        isTouchStart: this.isTouchStart,
        form: {
          omega: 0,
          identifierList: this.identifierList, // 目标物
          metaTaskList: this.metaTaskList, // 动作
          selectPoint: this.selectPoint, // 选择点
        },
      };
    },
  },
  methods: {
    deleteCircleTooltipData: function (data) {
      const { directions, triggerPoint, visible } = data;
      const {
        location: { x, y },
      } = triggerPoint;
      const { cx, cy } = directions;
      this.visibleCircleTooltip = visible;
      const obj = getMinPoint(this.points, { x, y }, this.threshold);
      const stageThreshold = this.threshold * this.konvaConfig.stage.width;
      const obj1 = getMinPoint(
        this.konvaConfig.points,
        { x: cx, y: cy },
        stageThreshold,
        true
      );
      if (!isEmpty(obj1) || !isEmpty(obj1)) {
        this.points.delete(obj.key);
        let newPolyline = [];
        this.konvaConfig.points = this.konvaConfig.points.map((i) => {
          if (i.x === obj1.x) {
            return;
          } else {
            return { ...i };
          }
        });
        // 更新 polyline
        newPolyline = this.konvaConfig.polyline.map((arrItem) => {
          const result = [];
          for (var i = 0; i < arrItem.length; i = i + 2) {
            if (obj1.x == arrItem[i] && obj1.y == arrItem[i + 1]) {
              continue;
            } else {
              result.push(arrItem[i]);
              result.push(arrItem[i + 1]);
            }
          }
          return result;
        });
        this.konvaConfig.points = [
          ...new Set(this.konvaConfig.points.filter(Boolean)),
        ];
        this.konvaConfig.polyline = newPolyline;
      }
    },
    saveCircleTooltipData: function (data) {
      const { directions, triggerPoint, visible } = data;
      const {
        location: { x, y, omega },
      } = triggerPoint;
      const { cx, cy } = directions;
      this.visibleCircleTooltip = visible;
      const curLen = this.points.size;
      const obj = getMinPoint(this.points, { x, y }, this.threshold);
      const stageThreshold = this.threshold * this.konvaConfig.stage.width;
      const obj1 = getMinPoint(
        this.konvaConfig.points,
        { x: cx, y: cy },
        stageThreshold
      );
      let map = new Map();
      if (!isEmpty(obj)) {
        map = this.points.set(obj.key, triggerPoint);
      } else {
        map = this.points.set(curLen, triggerPoint);
      }
      if (!isEmpty(obj1)) {
        this.konvaConfig.points = this.konvaConfig.points.map((i) => {
          if (i.x === obj1.x) {
            return { ...i, omega };
          } else {
            return { ...i };
          }
        });
      } else {
        this.konvaConfig.points.push({ x: cx, y: cy, omega });
      }

      this.points = map;
      let pointArr = [];
      const curPoints = [...new Set(this.konvaConfig.points.filter(Boolean))];
      for (let i = 0; i < curPoints.length; i++) {
        pointArr.splice(pointArr.length, 0, curPoints[i].x, curPoints[i].y);
      }
      if (pointArr.length >= 4) {
        this.konvaConfig.polyline.push(pointArr);
      }
      this.konvaConfig.points = curPoints;
    },
    onStageClick: function (e) {
      const { layerX, layerY, clientX, clientY } = e.evt;
      this.triggerPosition = {
        layerX,
        layerY,
        clientX,
        clientY,
      };
      this.initData();
    },
    onStageTouchstart: function (e) {
      const { pageX, pageY } = e.evt.touches[0];
      this.triggerPosition = {
        pageX,
        pageY,
      };
      this.isTouchStart = true;
      this.initData();
    },
    initData: function () {
      this.visibleCircleTooltip = true;
      this.$refs.circleTooltipRef.form = {
        omega: 0,
        identifierList: this.identifierList, // 目标物
        metaTaskList: this.metaTaskList, // 动作
        selectPoint: this.selectPoint || this.navigationPoint, // 选择点
      };
      this.$refs.circleTooltipRef.directions = {
        cx: 60,
        cy: 60,
        omega: 0,
      };
    },
    async handleMetaTaskQuery() {
      let response = await getScenceMetaTaskList(2);
      if (response != null) {
        if (response.code === 0) {
          this.metaTaskList = response.response;
        } else {
          this.$message({
            message: response.message,
            type: "error",
          });
        }
      }
    },
    async handleIdentifierQuery() {
      let response = await getIdentifierList();
      if (response != null) {
        if (response.code === 0) {
          this.identifierList = response.response;
        } else {
          this.$message({
            message: response.message,
            type: "error",
          });
        }
      }
    },
    async handleMapQuery() {
      let response = await getMapAllList();
      if (response != null) {
        if (response.code === 0) {
          this.mapList = response.response;
        } else {
          this.$message({
            message: response.message,
            type: "error",
          });
        }
      }
    },
    async handleDeviceQuery() {
      let response = await getAllDeviceList(this.scence.id);
      if (response != null) {
        if (response.code === 0) {
          this.deviceList = response.response;
        } else {
          this.$message({
            message: response.message,
            type: "error",
          });
        }
      }
    },
    async handleScenceQuery() {
      let response = await getScenceList("Open");
      if (response != null) {
        if (response.code === 0) {
          this.scenceList = response.response;
          let emptyObj = { id: "", name: "无" };
          this.scenceList.push(emptyObj); // 这个操作不是很理解？？？？
        } else {
          this.$message({
            message: response.message,
            type: "error",
          });
        }
      }
    },
    onSave: function () {
      this.dialogVisible = false;
    },
    async onTransferChange(a, b, c) {
      if (this.scence.id == null || this.scence.id == "") {
        this.scence.deviceIds = a;

        if (this.scence.deviceIds.length > 0) {
          let response1 = await getDeviceInfo(this.scence.deviceIds[0]);
          if (response1.code === 0) {
            this.scence.mapId = response1.response.curMapId;
            this.onSelectChange();
          }

          this.openWebsocket();
        }
      }
    },
    // 地图切换函数
    async onSelectChange() {
      this.konvaConfig.pgmImage = null;
      this.konvaConfig.points = [];
      this.konvaConfig.polyline = [];

      if (window.viewer != null) {
        window.viewer.destroy();
        window.viewer = null;
      }

      var mapInfo = null;
      for (let i = 0; i < this.mapList.length; i++) {
        if (this.mapList[i].id == this.scence.mapId) {
          mapInfo = this.mapList[i];
          break;
        }
      }
      if (mapInfo != null) {
        this.showModel === "pgmMap";
        this.showContainer();
        let pgmImageData = await viewMap(this.scence.mapId);
        let img = new MapImage(pgmImageData);
        let canvasImg = img.getInitMap("canvas");
        this.konvaConfig.stage.width = canvasImg.width;
        this.konvaConfig.stage.height = canvasImg.height;
        this.konvaConfig.pgmImage = new Image();
        this.konvaConfig.pgmImage.src = canvasImg.toDataURL();
      }
    },
    // 选择场景
    onScenceSelectChange: function () {
      this.task.deviceIds = [];
      this.handleDeviceQuery();

      if (this.scence.id != null && this.scence.id != "") {
        for (let i = 0; i < this.scenceList.length; i++) {
          if (this.scenceList[i].id == this.scence.id) {
            if (
              this.scence.mapId == null ||
              this.scence.mapId == "" ||
              this.scence.mapId != this.scenceList[i].mapId
            ) {
              this.scence.mapId = this.scenceList[i].mapId;
              this.onSelectChange();
            }

            break;
          }
        }
      }
    },
    onMouseLeftClick: function (click) {
      console.log("onMouseLeftClick", click);
      this.visibleCircleTooltip = true;
      const { x, y } = click.position;
      this.triggerPosition = {
        layerX: x,
        layerY: y,
        clientX: 0,
        clientY: 0,
      };
      this.initData();
    },
    onContextmenu: function (click) {
      click.evt.preventDefault();
    },
    onMouseClick: function (click) {
      if (click.evt.button == 0) {
        if (!this.pointSelect) {
          this.hidePgmLayer();
        }
      } else if (click.evt.button === 2) {
        if (!this.pointSelect) {
          if (this.showModel === "pgmMap") {
            let id = click.target.attrs.id;
            if (typeof id == "undefined") {
              this.hidePgmLayer();
            } else {
              this.selectPoint = {
                location: { omega: 0 },
                process: [],
                station: [],
              };
              this.selectPoint = this.points.get(id);

              this.selectPointId = id;

              let x = click.evt.clientX;
              let y = click.evt.clientY;
              this.showPgmLayer({ x, y });
            }
          }
        }
      }
    },
    onTouchTap: function (click) {
      if (!this.pointSelect) {
        let id = click.target.attrs.id;
        if (typeof id != "undefined") {
          this.selectPoint = {
            location: { omega: 0 },
            process: [],
            station: [],
          };
          this.selectPoint = this.points.get(id);
          this.selectPointId = id;

          let x = click.evt.changedTouches[0].clientX;
          let y = click.evt.changedTouches[0].clientY;
          this.showPgmLayer({ x, y });
        } else {
          this.hidePgmLayer();
        }
      }
    },
    onMouseDown: function (click) {
      if (this.showModel == "tileMap") {
        if (!this.pointSelect) {
          let pick = window.viewer.scene.pick(click.position);
          if (pick && pick.id.name == "navigationPoint") {
            this.selectMoveEntity = pick.id;
          }
        }
      }
    },
    onDragStart: function (click) {
      if (this.showModel === "pgmMap") {
        if (typeof click.target.attrs.id != "undefined") {
          this.selectPoint2Id = click.target.attrs.id;
          if (click.evt.type == "touchmove") {
            this.selectPoint2X = click.evt.touches[0].clientX;
            this.selectPoint2Y = click.evt.touches[0].clientY;
          }
        }
      }
    },
    onDragMove: function (click) {
      if (this.selectPoint2Id != -1) {
        let id = this.selectPoint2Id;
        let layerX = 0;
        let layerY = 0;

        if (click.evt.type == "mousemove") {
          layerX = click.evt.layerX;
          layerY = click.evt.layerY;
        } else {
          let distanceX = click.evt.touches[0].clientX - this.selectPoint2X;
          let distanceY = click.evt.touches[0].clientY - this.selectPoint2Y;
          this.selectPoint2X = click.evt.touches[0].clientX;
          this.selectPoint2Y = click.evt.touches[0].clientY;
          layerX =
            Math.round(
              this.konvaConfig.points[Number(id)].x *
                this.konvaConfig.group.scaleX
            ) + distanceX;
          layerY =
            Math.round(
              this.konvaConfig.points[Number(id)].y *
                this.konvaConfig.group.scaleX
            ) + distanceY;
        }

        this.konvaConfig.points[Number(id)].x = Math.round(
          layerX / (this.konvaConfig.group.scaleX * 1.0)
        );
        this.konvaConfig.points[Number(id)].y = Math.round(
          layerY / (this.konvaConfig.group.scaleY * 1.0)
        );

        let uvX = layerX / (this.konvaConfig.stage.width * 1.0);
        let uvY = layerY / (this.konvaConfig.stage.height * 1.0);

        let curPoint = this.points.get(id);
        curPoint.location.x = uvX.toFixed(6);
        curPoint.location.y = uvY.toFixed(6);
      }
    },
    onDragEnd: function (click) {
      if (this.showModel === "pgmMap") {
        if (this.selectPoint2Id != -1) {
          this.konvaConfig.polyline = [];
          var pointArr = [];
          for (let i = 0; i < this.konvaConfig.points.length; i++) {
            pointArr.push(this.konvaConfig.points[i].x);
            pointArr.push(this.konvaConfig.points[i].y);
          }
          this.konvaConfig.polyline.push(pointArr);

          this.selectPoint2Id = -1;
        }
      }
    },
    onMouseDownForArrow: function (click) {
      if (this.showModel === "pgmMap") {
        if (click.evt.button == 0) {
          if (typeof click.target.attrs.id != "undefined") {
            this.selectArrowId = click.target.attrs.id;
          } else {
            if (this.pointSelect) {
              let uvX = click.evt.layerX / (this.konvaConfig.stage.width * 1.0);
              let uvY =
                click.evt.layerY / (this.konvaConfig.stage.height * 1.0);

              var point = {
                location: { x: uvX.toFixed(6), y: uvY.toFixed(6), omega: 0 },
                process: [],
                station: [],
              };
              this.points.set(this.konvaConfig.points.length, point);
              this.selectArrowId = this.konvaConfig.points.length;

              let item = { x: click.evt.layerX, y: click.evt.layerY, omega: 0 };
              this.konvaConfig.points.push(item);
            }
          }
        }
      }
    },
    onTouchStartForArrow: function (click) {
      if (this.showModel === "pgmMap") {
        if (typeof click.target.attrs.id != "undefined") {
          this.selectArrowId = click.target.attrs.id;
          this.selectArrowX = click.evt.touches[0].clientX;
          this.selectArrowY = click.evt.touches[0].clientY;
        } else {
          if (this.pointSelect) {
            let layerX =
              click.evt.touches[0].clientX +
              click.evt.layerX -
              this.konvaConfig.group.x;
            let layerY =
              click.evt.touches[0].clientY +
              click.evt.layerY -
              this.konvaConfig.group.y;

            let uvX = layerX / (this.konvaConfig.stage.width * 1.0);
            let uvY = layerY / (this.konvaConfig.stage.height * 1.0);

            layerX = Math.round(layerX / (this.konvaConfig.group.scaleX * 1.0));
            layerY = Math.round(layerY / (this.konvaConfig.group.scaleY * 1.0));

            var point = {
              location: { x: uvX.toFixed(6), y: uvY.toFixed(6), omega: 0 },
              process: [],
              station: [],
            };
            this.points.set(this.konvaConfig.points.length, point);
            this.selectArrowId = this.konvaConfig.points.length;

            let item = { x: layerX, y: layerY, omega: 0 };
            this.konvaConfig.points.push(item);

            console.log("onTouchStartForArrow");
          }

          if (click.evt.touches.length >= 2) {
            let p1x = click.evt.touches[0].clientX;
            let p1y = click.evt.touches[0].clientY;
            let p2x = click.evt.touches[1].clientX;
            let p2y = click.evt.touches[1].clientY;

            this.konvaConfig.scaleDistance = Math.sqrt(
              Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2)
            );

            this.konvaScrollStartX = -1;
            this.konvaScrollStartY = -1;
          } else if (click.evt.touches.length == 1) {
            this.konvaScrollStartX = click.evt.touches[0].clientX;
            this.konvaScrollStartY = click.evt.touches[0].clientY;
          }
        }
      }
      click.evt.preventDefault();
    },
    onMouseMoveForArrow: function (click) {
      if (this.showModel === "pgmMap") {
        if (click.evt.button == 0) {
          if (this.selectArrowId != -1) {
            var tleft =
              click.evt.layerX -
              this.konvaConfig.points[Number(this.selectArrowId)].x;
            var ttop =
              click.evt.layerY -
              this.konvaConfig.points[Number(this.selectArrowId)].y;

            var angle = Math.atan2(ttop - 0, tleft - 0);
            this.konvaConfig.points[Number(this.selectArrowId)].omega =
              angle / (3.14159 / 180);
          }
        }
      }
    },
    onTouchMoveForArrow: function (click) {
      if (this.showModel === "pgmMap") {
        if (this.selectArrowId != -1) {
          let tleft = click.evt.touches[0].clientX - this.selectArrowX;
          let ttop = click.evt.touches[0].clientY - this.selectArrowY;
          var angle = Math.atan2(ttop - 0, tleft - 0);
          this.konvaConfig.points[Number(this.selectArrowId)].omega =
            angle / (3.14159 / 180);

          let curPoint = this.points.get(this.selectArrowId);
          curPoint.location.omega = angle / (3.14159 / 180);

          console.log("onTouchMoveForArrow");
        } else {
          if (click.evt.touches.length >= 2) {
            const stage = this.$refs.konvaStage.getStage();
            const scaleBy = 1.2;
            const pointer = stage.getPointerPosition();

            const layerNode = this.$refs.konvaLayer.getNode();
            let bgx = layerNode.getAttr("x");
            let bgy = layerNode.getAttr("y");

            const mousePointTo = {
              x: (pointer.x - bgx) / this.konvaConfig.group.scaleX,
              y: (pointer.y - bgy) / this.konvaConfig.group.scaleY,
            };

            let p1x = click.evt.touches[0].clientX;
            let p1y = click.evt.touches[0].clientY;
            let p2x = click.evt.touches[1].clientX;
            let p2y = click.evt.touches[1].clientY;

            let scaleDistance = Math.sqrt(
              Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2)
            );

            if (scaleDistance > this.konvaConfig.scaleDistance) {
              if (
                this.konvaConfig.group.scaleX < 4 &&
                this.konvaConfig.group.scaleY < 4
              ) {
                this.konvaConfig.group.scaleX =
                  this.konvaConfig.group.scaleX * scaleBy;
                this.konvaConfig.group.scaleY =
                  this.konvaConfig.group.scaleY * scaleBy;

                this.konvaConfig.stage.width = Math.round(
                  this.konvaConfig.stage.width * scaleBy
                );
                this.konvaConfig.stage.height = Math.round(
                  this.konvaConfig.stage.height * scaleBy
                );
              }
            } else {
              if (
                this.konvaConfig.group.scaleX > 1 &&
                this.konvaConfig.group.scaleY > 1
              ) {
                this.konvaConfig.group.scaleX =
                  this.konvaConfig.group.scaleX / scaleBy;
                this.konvaConfig.group.scaleY =
                  this.konvaConfig.group.scaleY / scaleBy;

                this.konvaConfig.stage.width = Math.round(
                  this.konvaConfig.stage.width / scaleBy
                );
                this.konvaConfig.stage.height = Math.round(
                  this.konvaConfig.stage.height / scaleBy
                );
              }
            }

            this.konvaConfig.group.x = Math.round(
              pointer.x - mousePointTo.x * this.konvaConfig.group.scaleX
            );
            this.konvaConfig.group.y = Math.round(
              pointer.y - mousePointTo.y * this.konvaConfig.group.scaleY
            );

            this.konvaConfig.scaleDistance = scaleDistance;
          } else if (click.evt.touches.length == 1) {
            if (this.konvaScrollStartX != -1 && this.konvaScrollStartY != -1) {
              let konvaScrollDistanceX =
                this.konvaScrollStartX - click.evt.touches[0].clientX;
              let konvaScrollDistanceY =
                this.konvaScrollStartY - click.evt.touches[0].clientY;
              this.konvaScrollStartX = click.evt.touches[0].clientX;
              this.konvaScrollStartY = click.evt.touches[0].clientY;

              const stage = this.$refs.konvaStage.getStage();
              let scrollRatioX =
                konvaScrollDistanceX /
                (stage.attrs.container.offsetWidth * 1.0);
              let scrollRatioY =
                konvaScrollDistanceY /
                (stage.attrs.container.offsetHeight * 1.0);

              let scrollSegX = Math.round(
                stage.attrs.container.parentElement.scrollLeftMax * scrollRatioX
              );
              let scrollSegY = Math.round(
                stage.attrs.container.parentElement.scrollTopMax * scrollRatioY
              );
              stage.attrs.container.parentElement.scrollLeft += scrollSegX;
              stage.attrs.container.parentElement.scrollTop += scrollSegY;
            }
          }
        }
      }
      click.evt.preventDefault();
    },
    onMouseUpForArrow: function (click) {
      if (this.showModel === "pgmMap") {
        if (click.evt.button == 0) {
          if (this.selectArrowId != -1) {
            var tleft =
              click.evt.layerX -
              this.konvaConfig.points[Number(this.selectArrowId)].x;
            var ttop =
              click.evt.layerY -
              this.konvaConfig.points[Number(this.selectArrowId)].y;

            var angle = Math.atan2(ttop - 0, tleft - 0);
            this.konvaConfig.points[Number(this.selectArrowId)].omega =
              angle / (3.14159 / 180);

            let curPoint = this.points.get(this.selectArrowId);
            curPoint.location.omega = angle / (3.14159 / 180);

            this.selectArrowId = -1;
          }
        }
      }
    },
    onTouchEndForArrow: function (click) {
      if (this.showModel === "pgmMap") {
        if (this.selectArrowId != -1) {
          this.selectArrowId = -1;
          console.log("onTouchEndForArrow");
        }

        this.konvaScrollStartX = -1;
        this.konvaScrollStartY = -1;
      }
      click.evt.preventDefault();
    },
    onSelectPoint: function () {
      this.pointSelect = !this.pointSelect;
      if (this.pointSelect) {
        this.points.clear();
        (this.task.params.point = []),
          (this.$refs.btn1.$el.innerText = "保存导航点");

        if (this.showModel == "tileMap") {
          this.selectMoveEntity = null;
          this.polylineEntity = null;
          window.viewer.entities.removeAll();
        } else if (this.showModel === "pgmMap") {
          this.konvaConfig.points = [];
          this.konvaConfig.polyline = [];
        }
      } else {
        this.$refs.btn1.$el.innerText = "选择导航点";

        if (this.showModel === "pgmMap") {
          var pointArr = [];
          for (let i = 0; i < this.konvaConfig.points.length; i++) {
            let item = this.points.get(i);
            this.task.params.point.push(item);

            pointArr.push(this.konvaConfig.points[i].x);
            pointArr.push(this.konvaConfig.points[i].y);
          }

          if (pointArr.length >= 4) {
            this.konvaConfig.polyline.push(pointArr);
          }
        }
      }
    },
    onGrubPoint: function () {
      if (this.curLocationPosition != null) {
        if (this.showModel === "pgmMap") {
          if (this.pointSelect) {
            var point = {
              location: {
                x: this.curLocationPosition.x,
                y: this.curLocationPosition.y,
                omega: this.curLocationPosition.omega,
              },
              process: [],
              station: [],
            };
            this.points.set(this.konvaConfig.points.length, point);

            let layerX = Math.round(
              this.konvaConfig.stage.width * this.curLocationPosition.x
            );
            let layerY = Math.round(
              this.konvaConfig.stage.height * this.curLocationPosition.y
            );
            let item = {
              x: layerX,
              y: layerY,
              omega: this.curLocationPosition.omega,
            };
            this.konvaConfig.points.push(item);
          }
        }
      } else {
        this.$message({
          message: "当前导航点为空",
          type: "error",
        });
      }
    },
    async onOk() {
      console.log("this.task", this.task);
    },
    onCancel: function () {
      console.log("onCancel");
    },

    showPgmLayer(position) {
      var pgmLayer = document.getElementById("pgmLayer");
      pgmLayer.style.left = position.x + "px";
      pgmLayer.style.top = position.y + "px";
      pgmLayer.style.display = "block";
    },
    hidePgmLayer() {
      var pgmLayer = document.getElementById("pgmLayer");
      pgmLayer.style.display = "none";
    },
    onOmegaChange: function () {
      this.konvaConfig.points[this.selectPointId].omega =
        this.selectPoint.location.omega;
    },
    addProcessItem: function () {
      this.selectPoint.process.push({ target: "", action: "" });
    },
    deleteProcessItem: function (index) {
      this.selectPoint.process.splice(index, 1);
    },
    addStationItem: function () {
      this.selectPoint.station.push({ target: "", action: "" });
    },
    deleteStationItem: function (index) {
      this.selectPoint.station.splice(index, 1);
    },
    showContainer() {
      if (this.showModel === "pgmMap") {
        var pgmContainer = document.getElementById("pgmContainer");
        pgmContainer.style.display = "block";
      }
    },
    openWebsocket() {
      for (let i = 0; i < this.deviceList.length; i++) {
        let item = this.deviceList[i];

        if (-1 != this.scence.deviceIds.indexOf(item.key)) {
          let socketUrl = this.travelUrl + item.key;

          console.log("正在连接websocket: " + socketUrl + "，请稍后~");

          item.websocketClient = new WebSocket(socketUrl);
          item.websocketClient.onopen = this.websocketOnOpen;
          item.websocketClient.onmessage = this.websocketOnMessage;
          item.websocketClient.onerror = this.websocketOnError;
          item.websocketClient.onclose = this.websocketOnClose;
        }
      }
    },
    websocketOnOpen() {
      console.log("WebSocket连接成功");
    },
    websocketOnMessage(msg) {
      let jsonObj = JSON.parse(msg.data);
      let deviceId = jsonObj.deviceId;
      let travelObj = jsonObj.travel;
      if (travelObj != null && travelObj != undefined) {
        let locations = travelObj["location"];
        for (var i = 0; i < locations.length; i++) {
          let location = locations[i];

          //console.log(location);

          if (this.showModel === "pgmMap") {
            location.x = Math.abs(location.x);
            location.y = Math.abs(location.y);
            this.curLocationPosition = location;

            this.konvaConfig.curPoint = [];

            let curX = Math.round(this.konvaConfig.stage.width * location.x);
            let curY = Math.round(this.konvaConfig.stage.height * location.y);

            curX = Math.round(curX / (this.konvaConfig.group.scaleX * 1.0));
            curY = Math.round(curY / (this.konvaConfig.group.scaleY * 1.0));

            let item = { x: curX, y: curY, omega: location.omega };
            this.konvaConfig.curPoint.push(item);
          }
        }
      }
    },
    websocketOnError(e) {
      console.log("WebSocket连接发生错误: " + e.code);
    },
    websocketOnClose(e) {
      console.log("WebSocket closed(" + e.code + ")");
    },
    closeWebsocket() {
      for (let i = 0; i < this.deviceList.length; i++) {
        let item = this.deviceList[i];
        if (
          typeof item.websocketClient != "undefined" &&
          item.websocketClient != null
        ) {
          item.websocketClient.close();
        }
      }
    },
    async handleInitDevice() {
      if (typeof this.deviceId != "undefined") {
        this.task.deviceIds.push(this.deviceId);
        this.scence.deviceIds.push(this.deviceId);

        if (this.scence.deviceIds.length > 0) {
          let response1 = await getDeviceInfo(this.scence.deviceIds[0]); // 拿当前路由上的Id 应该一样吧。。。
          if (response1.code === 0) {
            this.scence.mapId = response1.response.curMapId;
            this.scence.id = response1.response.curScenceId;

            // 如果当前设备未启用地图，则使用场景中的地图
            if (this.scence.mapId == null || this.scence.mapId == "") {
              if (this.scence.id != null && this.scence.id != "") {
                for (let i = 0; i < this.scenceList.length; i++) {
                  if (this.scenceList[i].id == this.scence.id) {
                    this.scence.mapId = this.scenceList[i].mapId;
                    break;
                  }
                }
              }
            }

            this.onSelectChange();
          }
        }

        return true;
      } else {
        return false;
      }
    },
    //创建任务
    async handleInitTask() {
      if (typeof this.taskId != "undefined") {
        let response = await getTaskInfo(this.taskId);
        this.task = response.response;

        for (let i = 0; i < this.scenceList.length; i++) {
          if (this.scenceList[i].id == this.task.scenceId) {
            this.scence = this.scenceList[i];
            await this.handleDeviceQuery();

            // 如果当前任务中只有一个设备，则使用设备的当前地图显示
            if (this.deviceList.length == 1) {
              let response1 = await getDeviceInfo(this.deviceList[0].key);
              if (response1.code === 0) {
                this.scence.mapId = response1.response.curMapId;
              }
            }

            await this.onSelectChange();

            if (this.showModel === "pgmMap") {
              var pointArr = [];
              for (let item of this.task.params.point.values()) {
                this.points.set(this.konvaConfig.points.length, item);

                let layerX = Math.round(
                  this.konvaConfig.stage.width * item.location.x
                );
                let layerY = Math.round(
                  this.konvaConfig.stage.height * item.location.y
                );

                let item1 = {
                  x: layerX,
                  y: layerY,
                  omega: item.location.omega,
                };
                this.konvaConfig.points.push(item1);

                pointArr.push(layerX);
                pointArr.push(layerY);
              }

              this.konvaConfig.polyline.push(pointArr);
            }

            break;
          }
        }

        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.showContainer();

    this.handleMetaTaskQuery();
    this.handleIdentifierQuery();

    this.handleMapQuery().then(() => {
      this.handleScenceQuery().then(() => {
        if (
          (typeof this.deviceId == "undefined" || this.deviceId == "") &&
          (typeof this.taskId == "undefined" || this.taskId == "")
        ) {
          this.handleDeviceQuery();
        }

        this.handleInitDevice().then((flag) => {
          if (flag) {
            this.handleDeviceQuery().then(() => {
              this.openWebsocket();
            });
          }
        });

        this.handleInitTask().then((flag) => {
          if (flag) {
            this.openWebsocket();
          }
        });
      });
    });
  },
  created() {
    this.tableHeight = document.documentElement.clientHeight - 250;
  },
  beforeDestroy() {
    this.closeWebsocket();
  },
};
</script>

<style lang="scss" scoped>
@import "./Index.scss";
</style>
