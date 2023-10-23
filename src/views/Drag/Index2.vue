<template>
  <div class="box">
    <div class="dragset-msg">请将左侧内容拖到右侧进行配置</div>
    <!-- 1 左边指标 -->
    <draggable
      tag="ul"
      class="lul"
      v-bind="dragOptionsL"
      :move="checkMove"
      :list="left"
      :group="{ name: 'dragobj', pull: 'clone', put: false }"
    >
      <li
        v-for="element in left"
        :key="element.name"
        :class="element.id ? 'dragindex' : 'dragtheme'"
        :ref="`li${element.indexid}`"
      >
        {{ element.name }}
      </li>
    </draggable>
    <!-- 2 右边展示区 -->
    <draggable
      tag="div"
      class="rconfig"
      group="dragobj"
      :list="right"
      v-bind="dragOptionsR"
      @change="dragChangeR"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group
        type="transition"
        :name="!drag ? 'flip-list' : null"
        tag="ul"
        class="rul"
      >
        <li
          class="showindex"
          v-for="(element, index) in right"
          :key="element.name"
        >
          {{ element.name }}
          <input
            type="button"
            class="btnindex"
            @click.stop="deleteItme(element, index)"
          />
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Vue from "vue";
export default {
  components: { draggable },
  data() {
    return {
      blnShowDlg: false,
      dlgType: "add", // 窗口类型
      titleName: "", // 窗口标题显示
      settingData: {}, //获取左右配置数据
      dataFormStore: {}, //保存数据
      left: [], //左边数据
      right: [], //右边数据
      drag: false,
    };
  },
  computed: {
    dragOptionsL() {
      return {
        disabled: false,
        ghostClass: "ghostL", //注意：在左侧上下移动时，使用这个类；移动到右侧时，使用ghostR类！！！
      };
    },
    dragOptionsR() {
      return {
        animation: 500,
        disabled: false,
        ghostClass: "ghostR", //注意：在右侧上下移动时，使用这个类；
      };
    },
  },
  methods: {
    /** 1、显示弹框 row不传为添加 传参为修改 */
    showDlg(row) {
      this.titleName = "页面配置";
      this.dlgType = "edit";
      this.blnShowDlg = true;
      this.dataFormStore = this.$common.deepCopy(row); //存储原始数据
      this.left = row.left;
      this.right = row.right;
      this.restoreForm();
    },
    // 2 左侧list移动，禁止在左侧上下移动
    checkMove(evt) {
      let classObj = evt.to.className;
      if (evt.draggedContext.element.id === "") {
        return false;
      } else if (classObj.indexOf("lul") > -1) {
        return false;
      }
    },
    // 2.1 拖拽事件，添加时隐藏左侧添加的数据
    dragChangeR(evt) {
      if (evt.added) {
        //这时候已经添加了
        this.$refs[`li${evt.added.element.indexid}`][0].style.display = "none";
      }
    },
    // 3 删除
    deleteItme(element, index) {
      this.right.splice(index, 1);
      this.$refs[`li${element.indexid}`][0].style.display = "block";
    },
    // 4 取消
    closeDialog() {
      this.blnShowDlg = false;
    },
    // 5 关闭
    hidDlg() {
      this.blnShowDlg = false;
    },
    /** 6 修改-还原 */
    restoreForm() {
      this.left = this.$common.deepCopy(this.dataFormStore.left);
      this.right = this.$common.deepCopy(this.dataFormStore.right);
      this.filterComs(this.left, this.right);
    },
    /** 7 添加/保存 */
    submitForm() {
      let newright = this.right;
      let rlens = this.right.length;
      if (rlens > 0) {
        let idArr = [];
        for (let i = 0; i < rlens; i++) {
          idArr.push(newright[i].indexid);
        }
        this.$emit("doSaveRow", idArr); // 把id数组传递过去
      } else {
        this.$HiAlert.showFail(this.$HiAlert.getMsgText("至少选择一个菜单"));
      }
    },
    // 8 过滤不显示的左侧item
    filterComs(left, right) {
      if (right.length > 0) {
        // 初始化，全置为blcok,后面根据right数据过滤显示
        for (let i = 0; i < left.length; i++) {
          this.$nextTick(() => {
            this.$refs[`li${left[i].indexid}`][0].style.display = "block";
          });
        }
        for (let i = 0; i < right.length; i++) {
          let filteritem = left.filter((element, index, self) => {
            return element.indexid == right[i].indexid;
          });
          // 右侧有数据时，dom生成之后再来渲染，否则会报错：cannot read property '0' of undefined
          this.$nextTick(() => {
            this.$refs[`li${filteritem[0].indexid}`][0].style.display = "none";
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
//应用样式文件
.ghostL {
  opacity: 0.5;
  width: 230px;
}
.ghostR {
  opacity: 0;
  width: 230px;
}
</style>
