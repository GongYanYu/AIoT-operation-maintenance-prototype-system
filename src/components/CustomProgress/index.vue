<!--
*@CustomProgress
*@author GYY
*@date 2022/7/29 13:39
-->
<template>
  <div class="cp-main" :style="{backgroundColor:bgColor}">
    <div class="cp-active-main" :style="{backgroundColor:color,width:(value / max )*100+'%'}"></div>
  </div>
</template>

<script>
import styles from '@/styles/global.scss'
export default {
  name: 'CustomProgress',
  props: {
    max:{type:Number,default:100},
    value:{type:Number,default:0},
    //激活颜色
    color:{type:String,default:styles.colorProgress},
    //背景颜色
    bgColor:{type:String,default:'#ffffff20'},
  },
  components: {},
  mounted() {
  },
  data() {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.cp-main{
  width: 100%;
  height: 100%;
  border-radius: 25px;

  .cp-active-main{
    height: 100%;
    border-radius: 25px;
  }
}
</style>
