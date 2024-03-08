<!--
*@BottomTab
*@author GYY
*@date 2022/9/13 13:12
-->
<template>
  <div class="btm-tab-main">
    <div class="tab1" @click="btmTab(1)"
         :style="{backgroundImage:`url(${bjMap[selected===1?'tab1Selected':'tab1']})`}">
      <img :src="iconMap[selected===1?'tab1Selected':'tab1']" alt=""/>
      <span class="text">项目概况</span>
    </div>
    <div class="tab2" @click="btmTab(2)"
         :style="{backgroundImage:`url(${bjMap[selected===2?'tab2Selected':'tab2']})`}">
      <img :src="iconMap[selected===2?'tab2Selected':'tab2']" alt=""/>
      <span class="text">设备管理</span>
    </div>
    <div class="tab3" @click="btmTab(3)"
         :style="{backgroundImage:`url(${bjMap[selected===3?'tab3Selected':'tab3']})`}">
      <img :src="iconMap[selected===3?'tab3Selected':'tab3']" alt=""/>
      <span class="text">预警管理</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomTab',
  props: {},
  components: {},
  mounted() {
  },
  data() {
    return {
      bjMap: {
        tab1: require('./img/tab1.png'),
        tab1Selected: require('./img/tab1-selected.png'),
        tab2: require('./img/tab2.png'),
        tab2Selected: require('./img/tab2-selected.png'),
        tab3: require('./img/tab3.png'),
        tab3Selected: require('./img/tab3-selected.png')
      },
      iconMap:{
        tab1: require('./img/tab1-icon.png'),
        tab1Selected: require('./img/tab1-icon-selected.png'),
        tab2: require('./img/tab2-icon.png'),
        tab2Selected: require('./img/tab2-icon-selected.png'),
        tab3: require('./img/tab3-icon.png'),
        tab3Selected: require('./img/tab3-icon-selected.png')
      },
      selected: 1
    }
  },
  methods: {
    btmTab(value){
      this.selected=value
      this.$emit('btmTabClick',value)
    }
  }
}
</script>

<style lang="scss" scoped>
.btm-tab-main {
  width: 1357px;
  height: 47px;
  display: flex;
  color: white;
  align-items: center;
  cursor: pointer;
  .text{
    padding-top: 2px;
    padding-left: 3px;
  }

  .tab1 {
    background-size: 100% 100%;
    width: 461px;
    height: 43px;
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 20px;
    img{
      width: 14px;
      height: 14px;
    }
  }
  .tab2 {
    background-size: 100% 100%;
    width: 179px;
    height: 47px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 14px;
      height: 14px;
    }
  }
  .tab3 {
    background-size: 100% 100%;
    width: 461px;
    height: 43px;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 20px;
    img{
      width: 14px;
      height: 14px;
    }
  }
}
</style>
