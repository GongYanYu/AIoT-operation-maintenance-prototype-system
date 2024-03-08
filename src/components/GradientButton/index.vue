<template>
  <div  :class="{'gradient-button-main3':isHaveLeft,
  'gradient-button-main2':isUser2,'gradient-button-main':!isHaveLeft&&!isUser2}">
    <slot v-if="isUseSlot"></slot>
    <div v-else class="gradient-button-main-cell">
      <div class="gb-left" v-if="isHaveLeft">
        <slot></slot>
      </div>
      <div class="gb-right">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradientButton',
  props: {
    text: {
      type: String,
      default: 'null'
    },
    isHaveLeft:{
      type:Boolean,
      default: false
    },
    isUser2:{
      type:Boolean,
      default: false
    },
    isUseSlot:{
      type:Boolean,
      default: false
    },
  }
}
</script>

<style scoped lang="scss">
.gradient-button-main-cell{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .gb-left {
    //flex: 2;
    text-align: center;
  }

  .gb-right {
    //text-align: left;
    //flex: 3;
  }
}
.gradient-button-main {
  cursor: pointer;
  background-image: $--color-btn-bg;
  border: 1px solid $--color-main;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  color: #FFFFFF;
  font-weight: 400;
}
.gradient-button-main2{
  width: 100%;
  height: 100%;
  background: $--color-btn-bg;
  border-radius: 16px;
  color: #FFFFFF;
  text-align: center;
  cursor:pointer;
  @include centerVertical;
}
.gradient-button-main3{
  width: 100%;
  height: 100%;
  background: url("./img/base-return.png") no-repeat;
  background-size: 100% 100%;
  color: #FFFFFF;
  text-align: center;
  cursor:pointer;
  @include centerVertical;
}
</style>
