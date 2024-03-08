<template>
  <div class="main-title-view2">
    <img :src="iconList[Number(useSizeT)]"  alt=""/>
    <span class="title">{{title}}</span>
    <div class="slot-view">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainTitle",
  props: {
    title: {
      type: String,
      default: '标题',
    },
    useSize:{
      type:[Number,String],
      default: 1
    },
    isUseSecond:{
      type:Boolean,
      default: false
    },
  },
  computed:{
    useSizeT(){
      if (this.useSize===1){
        return 2
      }
      return this.useSize
    }
  },
  data(){
    return{
      iconList:[
        ' ',
        require('./img/mt_frame1.png')
        ,require('./img/mt_frame2.png')
        ,require('./img/mt_frame3.png')]
    }
  }


};
</script>

<style lang="scss" scoped>
.main-title-view {
    line-height: 1;
    width: 100%;
    height: 56px;
    position: relative;

    img{
        width: 100%;
        height: 100%;
    }
    .title{
        position: absolute;
        top: 5px;
        left: 16px;
        font-size: 20px;
        color: #ffffff;
        font-weight: 600;
        letter-spacing: 1px;
    }
    .slot-view{
        position: absolute;
        top: 0;
        right: 0;
    }
}
.main-title-view2 {
  line-height: 1;
  width: 100%;
  height: 44px;
  position: relative;

  img{
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .title{
    position: absolute;
    top: 5px;
    left: 16px;
    font-size: 16px;
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .slot-view{
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>

