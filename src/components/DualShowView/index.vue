<!--
*@DualShowView
*@author GYY
*@date 2022/9/9 13:44
-->
<template>
  <div class="dual-show-main"
       :style="{ background: this.styleImg===1?`url(${imgUrl}) 0% 0% / 100% 100% no-repeat `:'' }">
    <div class="up" v-if="typeValue===1"
         :style="{ background: this.styleImg===2?`url(${imgUrl2}) 0% 0% / 100% 100% no-repeat `:'' }">
      <slot name="up"></slot>
    </div>
    <div v-if="this.styleImg===2" style="height: 10%"></div>
    <div class="down" v-if="typeValue===1"
         :style="{ background: this.styleImg===2?`url(${imgUrl2})  0% 0% / 100% 100% no-repeat `:'' }">
      <slot name="down"></slot>
    </div>
    <slot v-if="typeValue!==1"></slot>
  </div>
</template>

<script>
export default {
  name: 'DualShowView',
  props: {
    styleImg:{type: Number,default:1},
    typeValue:{type: Number,default:1},
  },
  components: {},
  mounted() {
  },
  data() {
    return {
      imgUrl: require('./img/people_bj.png'),
      imgUrl2: require('./img/car_right_bj.png'),
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.dual-show-main{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  //background: url("./img/people_bj.png") 100% 100% no-repeat;
  .up{
    height: 50%;
    width: 100%;
    padding-left: 5px;
    @include centerVertical
  }
  .down{
    height: 50%;
    width: 100%;
    padding-left: 5px;
    @include centerVertical
  }
}
</style>
