<!--
*@RootCauseLocalization
*@author yuge
*@date 2024/1/20 10:42
-->
<template>
  <div class="container-predict">
    <div class="upper">
      <div class="left1">
        <main-title title="状态总览" use-size="2"></main-title>
        <div class="lower-inner">
          <div class="flex-flat">
            <icon-number label="CPU使用率" :value="42.5" unit="%" icon="zc"/>
            <icon-number label="CPU请求率" :value="70.1" unit="%" icon="tq"/>
          </div>
          <div class="flex-flat">
            <icon-number label="总内存" :value="12" unit="GiB" icon="wlldf"/>
            <icon-number label="使用量" :value="10.1" unit="GiB" icon="wlldf"/>
          </div>
          <liquid-number style="height: 70px; " :size="7" fill-str="0" :show-data="rootId">
            <div>Spark异常节点ID</div>
          </liquid-number>
          <div class="flex-flat">
            <icon-number label="储存总量" :value="128" unit="GiB" icon="zc"/>
            <icon-number label="使用量" :value="57.1" unit="GiB" icon="zh"/>
          </div>
          <div class="flex-flat">
            <icon-number label="Spark节点数" :value="34" unit="个" icon="zc"/>
            <icon-number label="异常节点数" :value="8" unit="个" icon="zh"/>
          </div>

        </div>
      </div>
      <div class="left2">
        <main-title title="Spark预测异常概率排序" use-size="2"></main-title>

        <div class="lower-inner">
          <progress-list-cell :item="topListTitle" :checked="-99"></progress-list-cell>
          <hr/>
          <div class="list-main">
            <progress-list-cell v-for="(item, index) in topList" :item="item" :index="index"
                                :key="index" class="pointer"
            />
          </div>
        </div>

      </div>
      <div class="right">
        <main-title title="实时流量监控" use-size="2"></main-title>
        <network-chart class="lower-inner"/>
      </div>
    </div>
    <main-title title="大数据历史异常热力图" use-size="3"></main-title>
    <div class="lower">
      <point-chart/>
    </div>
  </div>
</template>

<script>
import CircleNumber from '@/components/CircleNumber/index.vue'
import ProgressListCell from '@/components/AutoScrollList/Component/ProgressListCell.vue'
import AutoScrollList from '@/components/AutoScrollList/index.vue'
import MainTitle from '@/components/MainTitle/index.vue'
import PointChart from '@/components/PointChart/index.vue'
import NetworkChart from '@/components/NetworkChart/index.vue'
import AbnormalService from '@/moke/service/AbnormalService'
import IconNumber from '@/components/IconNumber/index.vue'
import LiquidNumber from '@/components/LiquidNumber/index.vue'

export default {
  name: 'RootCauseLocalization',
  components: {
    LiquidNumber,
    IconNumber,
    NetworkChart,
    PointChart,
    MainTitle,
    AutoScrollList,
    ProgressListCell,
    CircleNumber
  },
  data() {
    return {
      topList: [
        { value1: '序列ID', value2: '节点名称', value3: '异常问题', progress: 12, progressColor: 'red' }
      ],
      topListTitle: { value1: '序列ID', value2: '节点名称', value3: '异常问题', progress: null, colorList: [] },
      dataList:[],
      rootId:'',
    }
  },
  props: {
    /*
    {
    "id": "GA61510011",
    "name": "GA61510011",
    "bigNodeId": "1001",
    "nodeStatus": {
        "name": "异常",
        "color": {
            "type": "radial",
            "x": 0.5,
            "y": 0.5,
            "r": 0.5,
            "colorStops": [
                {
                    "offset": 0,
                    "color": "#ff0000"
                },
                {
                    "offset": 0.7,
                    "color": "#ff0000"
                },
                {
                    "offset": 1,
                    "color": "#ff000090"
                }
            ],
            "global": false
        }
    },
    "category": "异常",
    "symbolSize": 30
}
     */
    entity: {
      type: Object,
      default: () => {
        return { title: '未定义' }
      }
    }
  },
  watch: {
    isVisible() {
    }
  },
  created() {
    console.log(this.entity)
    this.initData()
  },
  methods: {
    initData() {
      let i = 0
      const list = AbnormalService.getWarningList('bigData', true, true)
      this.dataList=list
      this.rootId=list[0].bindId
      this.topList = list.map(e => {
        return {
          value1: ++i,
          value2: e.bindId,
          value3: e.typeEnum.name,
          progress: e.abnormalProbability,
          progressColor: 'red'
        }
      })
    }
  },
  destroyed() {
  }
}
</script>

<style scoped lang="scss">
.list-main {
  width: 100%;
  height: calc(100% - 45px);
  overflow-y: auto;
}

.container-predict {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .upper {
    height: calc(100% - 350px);
    display: flex;
    justify-content: space-between;

    div {
      flex-grow: 0;
    }

    .left1 {
      height: 100%;
      flex: 1;
    }

    .left2 {
      height: 100%;
      width: 30%;
      margin: 0 8px;
    }

    .right {
      height: 440px;
      width: 45%;
    }

    .lower-inner {
      height: calc(100% - 45px);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .flex-flat {
      margin-top: 8px;
      display: flex;
      justify-content: space-around;

      div{
        width: 40%;
      }
    }
  }

  .lower {
    height: 350px;
  }
}
</style>
