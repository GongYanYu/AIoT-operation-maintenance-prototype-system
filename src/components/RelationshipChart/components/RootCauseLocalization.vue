<!--
*@RootCauseLocalization
*@author yuge
*@date 2024/1/20 10:42
-->
<template>
  <div class="container-root-cause">
    <div class="upper">
      <div class="left1">
        <main-title title="状态总览" use-size="2"></main-title>
        <div class="lower-inner">
          <div class="flex-flat">
            <icon-number label="CPU使用率" :value="overview()" unit="%" icon="zc"/>
            <icon-number label="CPU请求率" :value="overview()" unit="%" icon="tq"/>
          </div>
          <div class="flex-flat">
            <icon-number label="总内存" :value="overview()" unit="GiB" icon="wlldf"/>
            <icon-number label="使用量" :value="overview()" unit="GiB" icon="wlldf"/>
          </div>
          <liquid-number style="height: 70px; " :size="rootId?rootId.length:0" fill-str="0" :show-data="rootId">
            <div>根因定位ID</div>
          </liquid-number>
          <div class="flex-flat">
            <icon-number label="储存总量" :value="64" unit="GiB" icon="zc"/>
            <icon-number label="使用量" :value="24" unit="GiB" icon="zh"/>
          </div>
          <div class="flex-flat">
            <icon-number label="纺织控制数" :value="8" unit="个" icon="zc"/>
            <icon-number label="纺织工作率" :value="80.9" unit="%" icon="zh"/>
          </div>

        </div>
      </div>
      <div class="left2">
        <main-title title="根因概率排序" use-size="2"></main-title>

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
        <main-title title="实时纺织转速监控" use-size="2"></main-title>
        <device-chart class="lower-inner" :show-data="monitor"/>
      </div>
    </div>
    <main-title title="根因定位关系图" use-size="3"></main-title>
    <div class="lower">
      <root-point-chart :list="topList"/>
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
import RootPointChart from '@/components/RootPointChart/index.vue'
import DeviceChart from '@/components/DeviceChart/index.vue'

import { mapGetters } from 'vuex'
import { getListNextVFunc } from '@/utils/gyy-utils'
import AbnormalApi from '@/api/abnormal'
export default {
  name: 'RootCauseLocalization',
  components: {
    DeviceChart,
    RootPointChart,
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
      overview:()=>'-',
      monitor: [],
    }
  },
  computed:{
    ...mapGetters(['nodeList'])
  },
  props: {
    entity: {
      type: Object,
      default: () => {
        return { title: '未定义' }
      }
    }
  },
  watch: {
    entity:{
      handler(v) {
        v&&this.initData()
      },
      immediate:true
    }
  },
  created() {
  },
  methods: {
    initData() {
      const v=this.entity
      console.log('root change ',v)
      this.overview=getListNextVFunc(v.nodeJson.overview)
      this.monitor=v.nodeJson.monitor
      this.rootId=v.id
      AbnormalApi.abnormalInfo({
        nodeType:'aiot'
      }).then(res=>{
        let i=0
        const topList = res.root
          .map(e => {
            e.typeEnum=JSON.parse(e.typeEnum)
            return {
              value1: ++i,
              value2: e.bindId,
              value3: e.typeEnum.name,
              progress: e.abnormalProbability,
              progressColor: 'red'
            }
          })
        topList.sort((a, b)=>b.progress-a.progress)
        this.topList=topList
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

.container-root-cause {
  height: fit-content;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .upper {
    height: 450px;
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
      height: 100%;
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
    height: 850px;
  }
}
</style>
