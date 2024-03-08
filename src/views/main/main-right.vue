<template>
  <div class="main-board right">
    <div class="line line_top"></div>
    <div class="line line_bottom"></div>
    <main-title title="综合设备问题总览">
        <span>
          <m-horizontal-tab :tab-value="[{title:'本月',value:'month'},{title:'累计',value:null},]" default="1"
                            class="tab-right1"
          />
        </span>
    </main-title>
    <div class="right-icon-view">
      <div class="ri-item" :class="{'ri-selected':riSelectedWl}">
        <icon-number label="预警问题" :value="113" icon="wlgz"/>
      </div>
      <div class="ri-item" :class="{'ri-selected':!riSelectedWl}">
        <icon-number label="人工巡检问题" :value="47" icon="rgxj"/>
      </div>
    </div>
    <div class="project-ques-view">
      <div class="pq-item">
        <span class="pq-item-top">A级问题</span>
        <div class="pq-item-btm">
          <span class="pqib_num level_a">{{ questionNumTotal.a }}</span>
          <span class="pqib_unit">个</span>
        </div>
      </div>
      <div class="pq-item">
        <span class="pq-item-top">B级问题</span>
        <div class="pq-item-btm">
          <span class="pqib_num level_b">{{ questionNumTotal.b }}</span>
          <span class="pqib_unit">个</span>
        </div>
      </div>
      <div class="pq-item">
        <span class="pq-item-top">C级问题</span>
        <div class="pq-item-btm">
          <span class="pqib_num level_c">{{ questionNumTotal.c }}</span>
          <span class="pqib_unit">个</span>
        </div>
      </div>
    </div>
    <main-title title="高频预警问题"></main-title>
    <div class="right-chart-view">
      <hot-word-chart :word-data="hotWordData"/>
    </div>
    <main-title title="综合预警问题明细">
      <m-horizontal-tab :tab-value="[{title:'今日',value:'day'},{title:'本周',value:'week'},
      {title:'本月',value:'month'}]" default="2" class="tab-right2"
      />
    </main-title>
    <div class="right-table-view">
      <question-custom-list  />
    </div>
  </div>
</template>

<script>
import IconNumber from '@/components/IconNumber'
import MHorizontalTab from '@/components/MHorizontalTab'
import HotWordChart from '@/components/HotWordChart'
import MainTitle from '@/components/MainTitle'
import MainApi from '@/api/main'
import QuestionCustomList from '@/components/QuestionCustomList/index.vue'

export default {
  name: 'MainRight',
  components: {
    QuestionCustomList,
    MainTitle,
    HotWordChart,
    MHorizontalTab,
    IconNumber
  },
  data() {
    return {
      //地区代码
      regionCode: null,
      chooseEntity: {},
      //113
      hotWordData: [
        {
          name: 'Shuffle失败',
          value: 31,
          searchObj: { type: '1' }
        },
        {
          name: '任务超时',
          value: 42,
          searchObj: { type: '1' }
        },
        {
          name: '资源竞争',
          value: 12,
          searchObj: { type: '1' }
        },
        {
          name: '内存不足',
          value: 4,
          searchObj: { type: '1' }
        },
        {
          name: '任务失败',
          value: 113-31-42-12-4,
          searchObj: { type: '1' }
        }
      ],
      warningList: [],
      isMonth: true,
      questionNumTotal: { a: 42, b: 23, c: 113 - 42 - 23 },
      qtTabValue: null,
      searchObj: {
        dateType: 'month'
      },
      riSelectedWl: true,
      bigType: null,
      isQuestionDialogShow: false,
      entity: {}
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.main-board {
  z-index: 190;
  width: 21.5%;
  height: 93.3%;
  position: absolute;
  bottom: 0.7%;
  background: $--main-board-background;
  padding: 10px 16px;

  .line {
    position: absolute;
    height: 2px;
    width: calc(100% - 20px);
    background-image: $--main-board-line;
  }
}

.main-board.right {
  right: 0;
  border-radius: 8px 0 0 8px;

  .line_top {
    top: 0;
    right: 0;
    transform: scaleX(-1);
  }

  .tab-right1 {
    width: 112px;
    height: 21px;
    margin-top: 5px;
  }

  .tab-right2 {
    width: 185px;
    height: 21px;
    margin-top: 5px;
  }

  .line_bottom {
    bottom: 0;
    right: 0;
    transform: scaleX(-1);
  }

  .right-icon-view {
    margin: 10px 0;
    width: 100%;
    display: flex;

    .ri-selected {
      padding-left: 10px;
      background-image: $--color-main-question-list;
      border-radius: 25px;
    }

    .ri-item {
      position: relative;
      flex: 1;
      padding-left: 16px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  .project-ques-view {
    margin: 10px 0;
    width: 100%;
    height: 76px;
    background: $--color-board-back;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;

    .pq-item {
      position: relative;
      display: flex;
      flex-direction: column;
      cursor: pointer;

      .pq-item-top {
        font-size: 14px;
        color: #FFFFFF;
      }

      .pq-item-btm {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        line-height: 1;
        margin-top: 5px;
        font-family: TG-TYPE-Regular;

        .pqib_num {
          font-size: 20px;
          color: #FFFFFF;
          letter-spacing: 1px;
        }

        .pqib_num.level_a {
          color: $--color-danger;
        }

        .pqib_num.level_b {
          color: $--color-warning;
        }

        .pqib_num.level_c {
          color: $--color-primary;
        }

        .pqib_unit {
          font-size: 12px;
          margin-left: 6px;
          color: #ebebeb;
        }
      }
    }
  }

  .right-chart-view {
    width: 100%;
    height: 210px;
    margin: 10px 0;
    overflow: hidden;
  }

  .right-nav-view {
    width: 100%;
    height: 45px;
    margin: 10px 0;
  }

  .right-table-view {
    width: 100%;
    margin: 10px 0;
    height: calc(100% - 545px);
  }
}
</style>
