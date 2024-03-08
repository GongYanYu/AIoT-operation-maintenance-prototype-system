<!--
*@RateImg
*@author GYY
*@date 2022/9/13 18:27
-->
<template>
  <img class="rate-img-main" :src="isUp?iconMap.up:iconMap.down" alt=""/>
</template>

<script>
export default {
  name: 'RateImg',
  props: {
    isUp:{type:Boolean,default:true}
  },
  components: {},
  mounted() {
  },
  data() {
    return {
      iconMap:{
        up:require('./img/arrow-up.png'),
        down:require('./img/arrow-down.png'),
      },
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.rate-img-main{
  width: 7px;
  height: 9px;
}
</style>
