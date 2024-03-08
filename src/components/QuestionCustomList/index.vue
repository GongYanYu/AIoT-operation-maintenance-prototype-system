<template>
  <div class="qc-main"
       v-loading="isLoading===2"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="right-nav-view">
      <m-horizontal-tab :tab-value="questionTabValue" @changeTab="changeTab" :is-have-subtitle="true"/>
    </div>
    <div class="seamless-warp" ref="question-parent">
      <div ref="question-child1">
        <div
          v-for="(item,index) in tableData"
          :key="index" :data-index="index"
          class="quesChildDiv"
          :style="{height:cellHeight+'px'}"
          :class="{quesChildDivHover:index===indexFocused}"
        >
          <img
            class="ques-child-left-img" :data-index="index" alt="loading"
            :src="getImg(item)"
          />

          <div class="ques-child-right" :data-index="index">

            <div style="flex: 3; display: flex;height: 100% " :data-index="index">
              <div :data-index="index" class="word-ellipsis">{{ item.info.name }}</div>
              <div style="flex: 3;justify-content: center;" :data-index="index">
                <div class="w-level" :style="{backgroundColor:warningColorList[1]}"
                > {{item.grade}}
                </div>
              </div>
              <div class="ques-child-status" :style="{'color':colorList[item.process]}"
                   :data-index="index"
              >
                <div :data-index="index" class="ques-child-status-child">
                  {{ item.process | format_warning_process_state }}
                </div>
              </div>
            </div>
            <div class="div-content-over" :data-index="index">
            <span :data-index="index">
              <span style="opacity: 0.8;" :data-index="index">异常描述：</span>
              <omit-tooltip :data-index="index" :text="item.info.content"/>
            </span>
            </div>
            <div class="div-content-over" :data-index="index">
            <span>
              <span style="opacity: 0.8;" :data-index="index">发现时间：</span>
              <span class="number-font" :data-index="index">{{ item.createTime|formatTime }}</span>
            </span>
            </div>
          </div>
        </div>
      </div>
      <!--复制一份-->
      <!--      <div v-html="copyData" ></div>-->
    </div>
  </div>
</template>

<script>
import OmitTooltip from '@/components/OmitTooltip'
import styles from '@/styles/global.scss'
import MHorizontalTab from '@/components/MHorizontalTab'
import { getAbcColor } from '@/styles'
import AbnormalService from '@/moke/service/AbnormalService'
import AbnormalTypeEnum from '@/moke/entity/AbnormalTypeEnum'
import { format_warning_process_state } from '@/filters'
import AbnormalInfo from '@/moke/data/AbnormalInfo'

export default {
  name: 'QuestionCustomList',
  components: { MHorizontalTab, OmitTooltip },
  data() {
    return {
      tableData: [],
      colorList: [],
      chooseEntity: {},
      isShowOverviewDetailDialog: false,
      pauseTime: 60 * 3,
      isPause: 60 * 3,
      scrollMut: null,
      indexFocused: -1,
      questionTabValue: [
        { title: '全部', subtitle: '113个', value: null },
        { title: '处理中', subtitle: '65个', value: 0 },
        { title: '审核中', subtitle: '32个', value: 2 },
        { title: '已完成', subtitle: '70个', value: 1 }
      ],
      searchObjT: {},
      // c:0 b:1 a:2
      warningColorList: getAbcColor(),
      //上一个点的 id
      prePointId: null,
      copyData: null,
      //懒加载 0关闭 1已加载所有数据,后面不在进行懒加载 2尝试加载ing
      isLoading: 0,
      page: {
        pageStart: 0,
        pageSize: 100
      }
    }
  },
  computed: {
    oneHeight() {
      return this.cellHeight + 8
    }
  },
  created() {
    this.colorList = [styles.colorWarning, styles.colorSuccess, styles.colorStress, styles.colorDanger]
  },
  props: {
    searchObj: {
      type: Object,
      default: () => {
        return {
          type: 'all'
        }
      }
    },
    //px
    cellHeight: {
      type: Number,
      default: 84
    }
  },
  watch: {
    searchObj: {
      deep: true,
      immediate: true,
      handler(newValue, _) {
        this.initData(newValue.type)
      }
    }
  },
  methods: {
    getImg(item) {
      return require(`./Icon/${Math.ceil(item.createTime % 10)}.png`)
    },
    changeTab(item) {
    },
    initData(range) {
      this.tableData = AbnormalService.getWarningList(range).map(item => {
        item.info = AbnormalTypeEnum[item.type]
        return item
      })
      const data = AbnormalInfo.abnormalStatistics[range]
      const get=(x)=>data[x]+'个'

      this.questionTabValue = [
        { title: '全部', subtitle: get('all'), value: null },
        { title: '处理中', subtitle: get('processing'), value: 0 },
        { title: '审核中', subtitle: get('unprocessed'), value: 2 },
        { title: '已完成', subtitle: get('processed'), value: 1 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.qc-main {
  width: 100%;
  height: 100%;
}

.right-nav-view {
  width: 100%;
  height: 45px;
}

.seamless-warp {
  color: white;
  height: calc(100% - 45px);
  overflow: auto;
}

//隐藏滚动条
.seamless-warp::-webkit-scrollbar {
  display: none
}

.quesChildDiv {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 3%;
  width: 100%;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-top: 8px; /*no*/

  border: 1px solid transparentize($--color-primary, 0.5);
}

.quesChildDiv:hover {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 3%;

  width: 100%;
  background-image: $--color-main-question-list;
  border-radius: 8px;
  border: 1px solid transparent;
}

.quesChildDivHover {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 3%;

  width: 100%;
  background-image: $--color-main-question-list;
  border-radius: 8px;
  border: 1px solid transparent;
}

.div-content-over {
  flex: 2;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ques-child-status {
  flex: 0.7;
  line-height: 14px;
  letter-spacing: 0;
  font-weight: 500;
  text-align: center;
}

.ques-child-status-child {
  border: 1px solid;
  width: 50px;
  height: 20px;
  border-radius: 9px;
  font-size: 12px;
  padding: 2px;
}

.ques-child-left-img {
  flex: 1;
  width: 60px;
  margin-right: 4px;
}

.ques-child-right {
  flex: 4;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  margin-left: 2%;

  .w-level {
    padding: 2px 7px 2px 7px;
    border-radius: 4px;
    margin: 0 5px;
    width: 45px;
    text-align: center;
  }
}

.abc-img {
  flex: 1;
  height: 12px;
  width: 12px;
}
</style>
