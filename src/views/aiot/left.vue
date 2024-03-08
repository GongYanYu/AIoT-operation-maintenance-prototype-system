<template>
  <div class="main-board left">
    <div class="line line_top"></div>
    <div class="line line_bottom"></div>
    <main-title title="纺织安全问题总览">
                <span>
                  <m-horizontal-tab
                    class="left-overview-tab"
                    :tab-value="tabValue" default="2"
                  />
                </span>
    </main-title>

    <div class="project-ques-view">
      <div class="pq-item">
        <span class="pq-item-top">预警设备</span>
        <div class="pq-item-btm">
          <span class="pqib_num level_a">{{ conAnalysisData.projectNum }}</span>
          <span class="pqib_unit">个</span>
        </div>
      </div>
      <div class="pq-item">
        <span class="pq-item-top">事件预警</span>
        <div class="pq-item-btm">
          <span class="pqib_num level_b">{{ conAnalysisData.recordNum }}</span>
          <span class="pqib_unit">条</span>
        </div>
      </div>
      <div class="pq-item">
        <span class="pq-item-top">预警处置率</span>
        <div class="pq-item-btm">
          <span class="pqib_num level_c">{{ conAnalysisData.percent }}</span>
          <span class="pqib_unit">%</span>
        </div>
      </div>
    </div>
    <div class="right-chart-view">
      <normal-pie-chart :show-data="pieChartData"/>
    </div>

    <main-title title="安全预警趋势" class="span-site"></main-title>
    <normal-line-chart class="trance-obj-chart" :region="region"/>
    <main-title title="纺织预警通知设置"></main-title>
    <div class="left-top10-main">
      <notify-setting/>
    </div>
  </div>
</template>

<script>
import MainTitle from '@/components/MainTitle'
import IconNumber from '@/components/IconNumber'
import CenterNav from '@/components/CenterNav'
import CardNumber from '@/components/CardNumber'
import MHorizontalTab from '@/components/MHorizontalTab'
import AutoScrollList from '@/components/AutoScrollList'
import ProgressListCell from '@/components/AutoScrollList/Component/ProgressListCell'
import LOG from '@/utils/self-log'
import ConstructionApi from '@/api/construction'
import EnvironmentApi from '@/api/environment'
import NormalPieChart from '@/components/NormalPieChart'
import NormalLineChart from '@/views/aiot/components/NormalLineChart/index.vue'
import NotifySetting from '@/components/NotifySetting/index.vue'

export default {
  name: 'ConstructionLeft',
  components: {
    NotifySetting,
    NormalLineChart,
    NormalPieChart,
    ProgressListCell,
    AutoScrollList,
    MHorizontalTab,
    MainTitle,
    IconNumber,
    CenterNav,
    CardNumber
  },
  data() {
    return {
      topList: [],
      isShowEnvWaListDialog: false,
      chooseEntity: {},
      topListTitle: { value1: '序号', value2: '项目名称', value3: '本月安全预警', progress: null, colorList: [] },
      tabValue: [{ title: '今日', value: 'day' }, { title: '本月', value: 'month' }, { title: '累计', value: null }],
      tranceDataList: [],
      topListTabValue: null,
      checked: -1,
      conAnalysisData: { projectNum: '14', recordNum: '113', percent: '97' },
      pieChartData: [
        { value: 15, name: '处理中' },
        { value: 95, name: '已处理' },
        { value: 3, name: '未处理' },
        { value: 113, name: '预警数' }
      ],
      isShowOverEnvListDialog: false,
      region: null,
      dateAnalyseValue: null
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.main-board {
  z-index: 200;
  width: 21.5%;
  height: 93.3%;
  position: absolute;
  bottom: 0.7%;
  background: $--main-board-background;
  padding: 10px 16px;
  color: #FFFFFF;

  .line {
    position: absolute;
    height: 2px;
    width: calc(100% - 20px);
    background-image: $--main-board-line;
  }
}

.main-board.left {
  left: 0;
  border-radius: 0 8px 8px 0;

  .line_top {
    top: 0;
    left: 0;
  }

  .line_bottom {
    bottom: 0;
    left: 0;
  }

  .left-overview-tab {
    width: 130px;
    height: 21px;
    margin-top: 3%
  }

  .span-site {
    margin-top: 6px;
  }

  .trance-obj-num {
    width: 100%;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 17px;
    text-align: right;
    padding-right: 25px;
  }

  .trance-obj-chart {
    width: 100%;
    height: 211px;
    background: $--main-board-background !important;
    border-radius: 8px;
    margin: 7px 0 6px 0;
  }

  .left-top10-tab {
    width: 112px;
    height: 21px;
    margin-top: 3%
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
    height: 190px;
    margin: 10px 0;
    overflow: hidden;
    border-radius: 8px;
    background: $--color-board-back;
  }

  .left-top10-main {
    width: 100%;
    height: calc(100% - 666px);
    background: $--main-board-background;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;

    .top10-hr {
      height: 1px;
      background: #FFFFFF;
      opacity: 0.09;
      margin: 10px 0 12px 0;
    }

    .scroll-top10list {
      height: 85%;

      .list-cell {
        margin-top: 20px;
      }
    }
  }
}

</style>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  color: #ffffff;
  background-color: transparent !important;
  border: 1px solid rgba(85, 90, 96, .6);
  border-radius: 8px;
}

//轮播图指示器样式
::v-deep .el-carousel__indicator--horizontal {
  padding: 4px;
  margin-top: 8px;
}

::v-deep .el-carousel__indicators--horizontal {
  //可以在这里修改总体位置

  .el-carousel__indicator--horizontal button {
    width: 8px;
    height: 8px;
    margin-top: 14px;
    background: #ffffff40;
    border-radius: 50%;
  }

  .el-carousel__indicator--horizontal.is-active button {
    width: 8px;
    height: 8px;
    background: #ffffff;
    margin-top: 14px;
  }
}

</style>
