<template>
  <div class="main-board right">
    <div class="line line_top"></div>
    <div class="line line_bottom"></div>
    <main-title title="Spark大数据作业监控">
    </main-title>

    <div class="project-view pointer">
      <div class="label color-a" :class="{'label-selected':showWhatOverview==='a'}"
      >作业统计
      </div>
    </div>
    <div class="con-num-main" >
      <div v-if="showWhatOverview==='a'" class="a-main">
        <icon-number icon="td" class="cell"
                     label="平均作业执行时间" :value="dataOverview()" unit="s"/>
        <icon-number icon="sjk" class="cell"
                     label="最长作业执行时间" :value="dataOverview()" unit="s"/>
        <icon-number icon="sjj" class="cell"
                     label="作业执行时间方差" :value="dataOverview()" unit="%"/>
        <icon-number icon="xlpt" class="cell"
                     label="任务成功率" :value="dataOverview()" unit="%"/>
        <icon-number icon="gzm" class="cell"
                     label="任务失败率" :value="dataOverview()" unit="%"/>
        <icon-number icon="dtjhnt" class="cell"
                     label="Shuffle时间" :value="dataOverview()" unit="s"/>
      </div>
    </div>

    <main-title title="Spark问题明细(近一年)">
      <!--      <m-horizontal-tab :tab-value="timeTabValue"-->
      <!--                        class="tab-right1" @changeTab="questionTargetObjectsChange"-->
      <!--      />-->
    </main-title>
    <div class="right-table-view">
      <question-custom-list :cell-height="104" :search-obj="{type:'bigData'}"/>
    </div>
  </div>
</template>

<script>
import IconNumber from '@/components/IconNumber'
import MHorizontalTab from '@/components/MHorizontalTab'
import MainTitle from '@/components/MainTitle'
import NormalPieChart from '@/components/NormalPieChart'
import ConstructionApi from '@/api/construction'
import QuestionCustomList from '@/components/QuestionCustomList/index.vue'
import HomeApi from '@/api/home'
import { getListNextVFunc } from '@/utils/gyy-utils'

export default {
  name: 'BigDataRight',
  components: {
    QuestionCustomList,
    NormalPieChart,
    MainTitle,
    MHorizontalTab,
    IconNumber
  },
  data() {
    return {
      chooseEntity: {},
      timeTabValue: [
        { title: '今日', value: 'day' },
        { title: '本月', value: 'month' },
        { title: '累计', value: null }
      ],
      showWhatOverview: 'a',
      //预警级别 2:A级 1:B级 0:C级
      queryOverview: { warningLevel: 2, dateType: null },
      //t+warning_content_type
      dataOverview: ()=>{},
      isShowOvertimeListDialog: false,
      queryObj: {},
      region: null
      // questionDateValue: 'day',
    }
  },
  created() {
    this.init()
  },
  mounted() {
    //this.handleRegionChange(null)
  },
  methods: {
    init(){
      HomeApi.bigDataMonitoring().then(res=>{
        this.dataOverview = getListNextVFunc(res.root)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-board {
  z-index: 100;
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
    width: 130px;
    height: 21px;
    margin-top: 5px;
  }

  .line_bottom {
    bottom: 0;
    right: 0;
    transform: scaleX(-1);
  }

  .project-view {
    width: 100%;
    height: 44px;
    position: relative;
    margin-top: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    background-image: url("../../assets/main/bj-project.png");
    background-color: $--color-board-back;
    background-size: 100% 44px;
    font-size: 16px;
    border-radius: 8px 8px 0 0;

    .label {
      flex: 1;
      opacity: 0.55;
    }

    .label-selected {
      opacity: 1;
      font-weight: 600;
      text-shadow: 0 0 11px $--color-main;
      -webkit-background-clip: text;
    }
  }

  .con-num-main {
    padding-left: 7%;
    padding-top: 16px;
    width: 100%;
    height: 235px;
    margin-bottom: 8px;
    background: $--color-board-back;
    border-radius: 0 0 8px 8px;

    .a-main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .cell {
        width: 49%;
        height: 58px;
        cursor: pointer;
      }

      .no-data {
        margin-left: 37%;
        margin-top: 30%;
      }

      .carousel-main {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right-table-view {
    width: 100%;
    margin-top: 8px;
    height: calc(100% - 400px);
  }
}

.carousel-item-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.carousel-item-inner {
  width: 100%;
  height: 100%;
  padding: 8px;
}
</style>
