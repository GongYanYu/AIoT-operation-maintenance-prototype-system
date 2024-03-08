<!--
*@LeftVerticalTab
*@author GYY
*@date 2022/9/14 12:11
-->
<template>
  <div class="left-v-tab">
    <slot/>
    <img src="./img/arrow-up.png" alt="" v-if="isShowArrowIcon">
    <div class="tab-main">
      <div class="tab pointer" v-for="(item,index) in tabList" :key="index"
           :class="{'selected':index===selected}" @click="tabChange(index)"
      >
        <img v-if="item.imgSrc" :src="item.imgSrc" alt="">
        <div :class="{text:!item.imgSrc,text2:item.imgSrc}">{{ item.name + '（' + item.value + '）' }}</div>
      </div>
    </div>
    <img src="./img/arrow-down.png" alt="" v-if="isShowArrowIcon">
  </div>
</template>

<script>
export default {
  name: 'LeftVerticalTab',
  props: {
    tabList: {
      type: Array,
      default: () => {
        return [
          { name: '全部设备', value: 30, imgSrc: require('./img/tab-test-icon.png') },
          { name: '视频监控', value: 5, imgSrc: null },
          { name: '塔吊', value: 5, imgSrc: null },
          { name: '升降机', value: 5, imgSrc: null },
          { name: '卸料平台', value: 5, imgSrc: null },
          { name: '扬尘监控', value: 5, imgSrc: null },
          { name: '噪音监控', value: 5, imgSrc: null },
        ]
      }
    },
    defaultTab: { type: Number, default: 0 },
    maxShowTab: { type: Number, default: 11 },
  },
  watch:{
    tabList(newV,_){
      this.selected = this.defaultTab
    }
  },
  components: {},
  data() {
    return {
      selected: -1,
    }
  },
  computed:{
    isShowArrowIcon(){
      return this.tabList.length>this.maxShowTab
    }
  },
  methods: {
    tabChange(index) {
      this.selected = index
      this.$emit('tabChange', this.tabList[index])
    }
  }
}
</script>

<style lang="scss" scoped>
.left-v-tab {
  width: 100%;
  height: 100%;
  background: url("./img/site2-bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;

  //justify-content: center;

  .tab-main {
    width: 100%;
    height: calc(46px * 11);
    display: flex;
    flex-direction: column;
    overflow: auto;

    .tab {
      width: 242px;
      height: 40px;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 28px;
      margin-left: 24px;
      margin-bottom: 6px;
      display: flex;

      .text {
        padding: 7px 7px 7px 16px;
      }

      .text2 {
        padding-top: 7px;
        padding-left: 7px;
      }

      img {
        width: 16px;
        height: 16px;
        margin: 13px 0 0 20px;
      }
    }

    .selected {
      background: url("./img/tab-selected.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .tab-main::-webkit-scrollbar {
    display: none;
  }
  img{
    width: 61px;
    height: 25px;
    margin-left: 39px;
    margin-bottom: 17px;
    margin-top: 15px;
  }

}
</style>
