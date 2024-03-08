<template>
  <!--  showWhatView 最重要 一定要看函数注释-->
  <div class="main-view">
    <div class="main-51world" id="map_51world">
      <relationship-chart/>
      <!--      <img src="@/assets/main/back_img_test.jpg" style="width: 100%;height: 100%" alt=""/>-->
    </div>
    <div class="main-header">
      <div class="main-header-bak"></div>
      <div class="text">
        <div class="company">智能纺织</div>
        AIoT运维原型系统
      </div>
    </div>
    <div class="main-header_shadow" v-if="showWhatView>=0"></div>
    <div class="main-board_shadow left" v-if="showWhatView>=0"></div>
    <div class="main-board_shadow right" v-if="showWhatView>=0"></div>
    <img class="main-logo" v-if="showWhatView!==1" src="@/assets/main/logo.svg" alt="logo"/>
    <time-unit class="time-unit-class"></time-unit>
    <gradient-button v-if="showWhatView===1" text="返回" class="btn-return" :is-have-left="true"
                     @click.native="showViewAndLoadData(showWhatViewTemp.value,null)"
    >
      <img src="@/assets/site-details/return.png" alt=""/>
    </gradient-button>

    <transition name="left">
      <main-left ref="mainLeft" v-if="showWhatView===0"/>
      <a-io-t-left v-else-if="showWhatView===2"/>
      <big-data-left v-else-if="showWhatView===3"/>
    </transition>
    <transition name="right">
      <main-right ref="mainRight" v-if="showWhatView===0"/>
      <a-io-t-right v-else-if="showWhatView===2"/>
      <big-data-right v-else-if="showWhatView===3"/>
    </transition>
    <bottom-tab v-if="showWhatView===1" class="main-footer" @btmTabClick="btmTabClick"></bottom-tab>
    <div class="main-footer" v-if="showWhatView!==1"><img src="@/assets/main/main_footer.png" alt=""/></div>

    <div class="btm-nav-view">
      <div class="nav-cell" style="flex: 0.7" @click="showView(0)">
        <div class="up">
          <img :src="require('@/assets/base/0'+(showWhatView===0?'-selected':'')+'.png')" alt=""/>
          <span :class="showWhatView===0?'text-selected':'text'">首页</span>
        </div>
        <div class="down" :class="{'btm-selected':showWhatView===0}"></div>
      </div>
      <div class="nav-cell" @click="showView(2)">
        <div class="up">
          <img :src="require('@/assets/base/2'+(showWhatView===2?'-selected':'')+'.png')" alt=""/>
          <span :class="showWhatView===2?'text-selected':'text'">AIoT监测</span>
        </div>
        <div class="down" :class="{'btm-selected':showWhatView===2}"></div>
      </div>
      <div class="nav-cell" @click="showView(3)">
        <div class="up">
          <img :src="require('@/assets/base/3'+(showWhatView===3?'-selected':'')+'.png')" alt=""/>
          <span :class="showWhatView===3?'text-selected':'text'">Spark监测</span>
        </div>
        <div class="down" :class="{'btm-selected':showWhatView===3}"></div>
      </div>
<!--      <div class="nav-cell" @click="showView(4)">-->
<!--        <div class="up">-->
<!--          <img :src="require('@/assets/base/4'+(showWhatView===4?'-selected':'')+'.png')" alt=""/>-->
<!--          <span :class="showWhatView===4?'text-selected':'text'">故障预测与定位</span>-->
<!--        </div>-->
<!--        <div class="down" :class="{'btm-selected':showWhatView===4}"></div>-->
<!--      </div>-->
<!--      <div class="nav-cell" @click="showView(5)">-->
<!--        <div class="up">-->
<!--          <img :src="require('@/assets/base/5'+(showWhatView===5?'-selected':'')+'.png')" alt=""/>-->
<!--          <span :class="showWhatView===5?'text-selected':'text'">人员管理</span>-->
<!--        </div>-->
<!--        <div class="down" :class="{'btm-selected':showWhatView===5}"></div>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>
import MainLeft from '@/views/main/main-left'
import MainRight from '@/views/main/main-right'
import CenterNav from '@/components/CenterNav'
import GradientButton from '@/components/GradientButton'
import MainTitle from '@/components/MainTitle'
import TimeUnit from '@/views/base-map/Component/TimeUnit'
import BottomTab from '@/components/BottomTab'
import RelationshipChart from '@/components/RelationshipChart/index.vue'
import AIoTLeft from '@/views/aiot/left.vue'
import AIoTRight from '@/views/aiot/right.vue'
import BigDataLeft from '@/views/big-data/left.vue'
import BigDataRight from '@/views/big-data/right.vue'

export default {
  name: 'index',
  components: {
    BigDataRight,
    BigDataLeft,
    AIoTRight,
    AIoTLeft,
    RelationshipChart,
    BottomTab,
    TimeUnit,
    MainTitle,
    GradientButton,
    CenterNav,
    MainRight,
    MainLeft
  },
  data() {
    return {
      //-999代表hideAll -2代表51地图大小恢复 -1代表BIM对比
      // 0代表主页 1代表详情页 2代表环境监测 3代表安全施工 4代表进度管控 5代表人员总揽
      showWhatView: 0,
      //1项目概况 2设备管理 3预警管理
      showWhatSiteView: 1,
      regionCode: null,
      is51Show: true,
      projectId: null,
      //只可以在 showWhatView 数据备份 备份上一个状态
      showWhatViewTemp: {
        isHave: false,
        value: 0,
        data: null
      },
      isLoadAllPOI: -1
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    emitOrder(obj) {
      switch (obj.showWhatView) {
        case 3:
          this.$refs.constructionRight.handleOrder(obj)
          break
      }
    },
    //注意一定是要 等待地图装配好在运行
    handleRegionChange(regionCode, isChangeMap = true) {
      this.regionCode = regionCode

      switch (this.showWhatView) {
        case 0:
          this.$refs.mainLeft.handleRegionChange(this.regionCode)
          this.$refs.mainRight.handleRegionChange(this.regionCode)
          break
        case 2:
          this.$refs.environmentLeft.handleRegionChange(this.regionCode)
          this.$refs.environmentRight.handleRegionChange(this.regionCode)
          break
        case 3:
          this.$refs.constructionLeft.handleRegionChange(this.regionCode)
          this.$refs.constructionRight.handleRegionChange(this.regionCode)
          break
        case 4:
          this.$refs.progressLeft.handleRegionChange(this.regionCode)
          this.$refs.progressRight.handleRegionChange(this.regionCode)
          break
        case 5:
          this.$refs.peopleLeft.handleRegionChange(this.regionCode)
          this.$refs.peopleRight.handleRegionChange(this.regionCode)
          break
      }
    },
    //为了动画
    showView(showWhatView) {
      this.showWhatView = -999
      //切换重置地区！
      this.regionCode = null
      setTimeout(() => this.showWhatView = showWhatView, 400)
    },
    showViewAndLoadData(showWhatView) {
      this.showView(showWhatView)
    },
    //加载详情页 和数据
    btmTabClick(value) {
      this.showWhatSiteView = value
      this.$nextTick(() => {
        this.$refs['siteDetailLeft' + value].doSearch(this.projectId)
        if (value === 1) {
          this.$refs.siteDetailBottom.doSearch(this.projectId)
        }
        if (value !== 2) {
          this.$refs['siteDetailRight' + value].doSearch(this.projectId)
        }
      })
    },
    siteDetailLeft3TabChange(obj) {
      this.$refs.siteDetailRight3.tabChange(obj)
    }
  },
  destroyed() {
  }
}
</script>

<style lang="scss" scoped>
/* 设置持续时间和动画函数 */
.left-enter-active, .left-leave-active {
  transition: all .4s ease;
}

.left-enter, .left-leave-to {
  transform: translateX(- 200px);
  opacity: 0;
}

.right-enter-active, .right-leave-active {
  transition: all .4s ease;
}

.right-enter, .right-leave-to {
  transform: translateX(200px);
  opacity: 0;
}


.is51Disabled {
  pointer-events: none
}

.bim-51main {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  line-height: 0;
}

.bim-iframe-main {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  line-height: 0;
  z-index: 1000;
}

.main-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  background-color: #141819;

  .main-51world {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 0;
  }

  .bim-51main-small {
    width: 47%;
    height: 633px;
    position: absolute;
    left: 2.5%;
    top: 162px;
    border-radius: 4px 4px 0 0;
  }

  .main-header {
    z-index: 200;
    width: 64%;
    position: absolute;
    top: 0;
    left: calc(50% - 32%);
    line-height: 0;

    .main-header-bak {
      z-index: -1;
      position: absolute;
      top: 0;
      width: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.9), #1e7a8e90);
      height: 3vh;
      box-shadow: 0 0 11px #1e7a8e90;
      border-radius: 0 0 20px 20px;
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 6vh;
      font-size: 36px;
      color: rgba(255, 255, 255, 0.8);
      letter-spacing: 10px;
      text-shadow: #1e7a8e 0 0 11px;

      .company {
        text-shadow: #0D1F34 0 0 11px;
        color: rgb(255, 184, 0, .8);
      }
    }
  }

  .btn-return {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 200;
    width: 114px;
    height: 34px;
    font-size: 14px;

    img {
      height: 14px;
      width: 16px;
      margin-right: 12px;
    }
  }

  .main-header_shadow {
    height: 120px;
    width: 100%;
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    background-image: $--bg-main-header-shadow;
  }

  .main-board_shadow {
    height: 100%;
    width: 413px;
    z-index: 20;
    background-image: $--bg-main-border-shadow;
  }

  .main-board_shadow.left {
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(-1);
  }

  .main-board_shadow.right {
    position: absolute;
    top: 0;
    right: 0;
  }

  .main-logo {
    position: absolute;
    top: 12px;
    left: 16px;
    height: 4%;
    width: auto;
    z-index: 200;
  }

  .time-unit-class {
    z-index: 50;
    color: #FFFFFF;
    position: absolute;
    top: 22px;
    right: 16px;
  }

  .center-nav-view {
    z-index: 20;
    position: absolute;
    left: 23%;
    top: 53%;
    display: flex;
    flex-direction: column;

    .nav-item {
      cursor: pointer;
      margin-bottom: 50px;
      display: block;
      position: relative;
    }
  }

  .bottom-tab {
    z-index: 100;
    position: absolute;
    left: 23%;
    bottom: 53%;
  }

  .site-detail-b {
    z-index: 100;
    position: absolute;
    left: calc(21.3% + 60px);
    bottom: 46px;
  }

  .robot-main {
    z-index: 50;
    position: absolute;
    left: 0;
    bottom: 0;

    .robot-up {
      height: 120px;
      width: 85px;
      position: absolute;
      left: 465px;
      bottom: 74px;
    }

    .robot-down {
      height: 116px;
      width: 108px;
      position: absolute;
      left: 456px;
      bottom: 18px;
    }
  }

  .main-footer {
    z-index: 51;
    width: 57%;
    position: absolute;
    bottom: 0;
    left: calc(50% - 28.5%);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
    }
  }

  .btm-nav-view {
    z-index: 50;
    position: absolute;
    left: 612px;
    bottom: 20px;
    width: 800px;
    height: 40px;
    display: flex;

    .nav-cell {
      flex: 1;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      flex-direction: column;

      .up {
        display: flex;
        align-items: center;
        height: 32px;

        img {
          width: 32px;
          height: 32px;
        }

        .text {
          height: 28px;
          color: #FFFFFF;
          line-height: 33px;
        }

        .text-selected {
          height: 28px;
          color: #FFFFFF;
          line-height: 33px;
          font-weight: 600;
          text-shadow: 0 0 11px $--color-main;
          -webkit-background-clip: text;
        }
      }

      .down {
        height: 8px;
        width: 55%;
        margin-left: 4%;
      }

      .btm-selected {
        height: 8px;
        background-color: $--color-main;
        filter: blur(5px);
      }
    }
  }
}

</style>
