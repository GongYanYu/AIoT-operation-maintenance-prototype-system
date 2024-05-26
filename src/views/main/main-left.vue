<template>
  <div class="main-board left">
    <div class="line line_top"></div>
    <div class="line line_bottom"></div>
    <main-title title="节点资源总览">
    </main-title>
    <div class="project-view">
      <img class="icon" src="@/assets/main/icon_project.png" alt=""/>
      <span class="label">全部节点</span>
      <div class="number-view">
        <span class="number number-font">{{ nodeResources() }}</span>
        <span class="unit">个</span>
        <div class="border"></div>
      </div>
    </div>
    <div class="carousel-view">
      <el-carousel trigger="click" :interval=5000 height="168px" arrow="never">
<!--        <el-carousel-item key="inner_01">-->
<!--          <div class="carousel-item-inner inner_01">-->
<!--            <div class="inner_01-item pointer">-->
<!--              <icon-number label="未开工" :value="objectOverview.wkgnum" icon="wkg"/>-->
<!--            </div>-->
<!--            <div class="inner_01-item pointer">-->
<!--              <icon-number label="已开工" :value="objectOverview.zjnum" icon="ykg"/>-->
<!--            </div>-->
<!--            <div class="inner_01-item pointer">-->
<!--              <icon-number label="完工" :value="objectOverview.wgnum" icon="wg"/>-->
<!--            </div>-->
<!--            <div class="inner_01-item pointer">-->
<!--              <icon-number label="停工" :value="objectOverview.tgnum" icon="tg"/>-->
<!--            </div>-->
<!--            <div class="inner_01-item pointer">-->
<!--              <icon-number label="竣工" :value="objectOverview.jgnum" icon="jg"/>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-carousel-item>-->
        <el-carousel-item key="inner_02">
          <div class="carousel-item-inner inner_02">
            <div class="inner_02-item">
              <card-number label="节点内存比" :value="nodeResources()" unit="个"/>
            </div>
            <div class="inner_02-item">
              <card-number label="内存使用率" :value="nodeResources()" unit="%"/>
            </div>
            <div class="inner_02-item">
              <card-number label="内存请求率" :value="nodeResources()" unit="%"/>
            </div>
            <div class="inner_02-item">
              <card-number label="内存限制率" :value="nodeResources()" unit="%" style-class="red"/>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="project-moni-view flex-flat">
      <icon-number label="CPU使用率" :value="nodeResources()" unit="%" icon="zc"/>
      <icon-number label="CPU请求率" :value="nodeResources()" unit="%" icon="tq"/>
      <icon-number label="CPU限制率" :value="nodeResources()" unit="%" icon="zh" />
    </div>
    <div class="project-moni-view flex-flat">
      <icon-number label="节点数"  :value="nodeResources()"  icon="zc"/>
      <icon-number label="Pod数"   :value="nodeResources()" icon="tq"/>
      <icon-number label="上限Pod" :value="nodeResources()" icon="zh" />
    </div>
    <div class="project-moni-view flex-flat">
      <icon-number label="总内存" :value="nodeResources()" unit="GiB" icon="wlldf"/>
      <icon-number label="使用量" :value="nodeResources()" unit="GiB" icon="wlldf"/>
      <icon-number label="请求量" :value="nodeResources()" unit="GiB" icon="wlldf"/>
    </div>
    <main-title title="节点信息明细"></main-title>
    <div class="start-project-view">
      <main-left-chart2/>
    </div>
  </div>
</template>

<script>
import MainTitle from '@/components/MainTitle'
import IconNumber from '@/components/IconNumber'
import CenterNav from '@/components/CenterNav'
import CardNumber from '@/components/CardNumber'
import MHorizontalTab from '@/components/MHorizontalTab'
import LiquidNumber from '@/components/LiquidNumber'
import DualShowView from '@/components/DualShowView'
import RelationshipGraphService from '@/moke/service/RelationshipGraphService'
import MainLeftChart1 from '@/views/main/components/main-left-chart1.vue'
import MainLeftChart2 from '@/views/main/components/main-left-chart2.vue'
import CityImageBlock from '@/components/CityImageBlock/index.vue'
import HomeApi from '@/api/home'
import { getListNextVFunc } from '@/utils/gyy-utils'

export default {
  name: 'MainLeft',
  components: {
    CityImageBlock,
    MainLeftChart2,
    MainLeftChart1,
    DualShowView,
    LiquidNumber,
    MHorizontalTab,
    MainTitle,
    IconNumber,
    CenterNav,
    CardNumber
  },
  data() {
    return {
      nodeResources:()=>{}
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init(){
      HomeApi.getNodeResources().then(res=>{
        this.nodeResources = getListNextVFunc(res.root)
      })
    }
  },
  filters: {}
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

  display: flex;
  flex-direction: column;

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
    width: 190px;
    height: 21px;
    margin-top: 3%
  }

  .project-view {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 26px;
    position: relative;
    margin-top: 12px;

    background-image: url("../../assets/main/bj-project.png");
    background-size: 100% 44px;

    .icon {
      width: 20px;
      height: 20px;
    }

    .label {
      font-size: calc(14rem / 12);
      color: #FFFFFF;
      margin-left: 3px;
      letter-spacing: 1px;
    }

    .number-view {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
      padding: 10px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      line-height: 1;
      border-radius: 8px;
      border-bottom: 1px solid #AFC0C4;

      .number {
        font-size: 24px;
        color: #FFFFFF;
        letter-spacing: 1px;
      }

      .unit {
        font-size: 12px;
        margin-left: 6px;
        color: #ebebeb;
      }

      .border {
        z-index: 200;
        width: 50%;
        position: absolute;
        bottom: -14px;
        left: calc(50% - 25%);
        height: 8px;
        border-radius: 50%;
        background: #AFC0C4;
        box-shadow: 0 0 10px 10px #AFC0C4;
      }
    }
  }

  .carousel-view {
    margin-top: 12px;
    margin-bottom: 10px;
    width: 100%;
    height: 168px;
    background: $--color-board-back;
    border-radius: 8px;
    overflow: hidden;
  }

  .project-moni-view {
    margin-top: 12px;
    margin-bottom: 10px;
    width: 100%;
    height: 50px;
    div{
      flex: 1;
    }
  }

  .start-project-view {
    margin-top: 12px;
    width: 100%;
    background: $--color-board-back;
    border-radius: 8px;
    flex: 1;
    padding: 16px;
  }
}

.carousel-item-inner {
  width: 100%;
  height: 168px;
  padding: 8px;
}

.carousel-item-inner.inner_01 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;

  .inner_01-item {
    width: 33.33%;
    position: relative;
  }
}

.carousel-item-inner.inner_02 {
  display: flex;
  flex-wrap: wrap;

  .inner_02-item {
    width: 50%;
    flex-shrink: 0;
    position: relative;
    padding: 5px 8px;
    box-sizing: border-box;
    cursor: pointer;
    height: 62px;
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

</style>
