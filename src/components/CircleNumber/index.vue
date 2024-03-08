<!--
*@CircleNumber
*@author GYY
*@date 2022/7/29 11:01
-->
<template>
  <div class="pv-invest-cell">
    <div class="in-top">{{title}}</div>
    <div class="in-bottom">
      <span class="in-value number-font-bold">{{value}}</span>
      <span class="in-unit"> {{ unit}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircleNumber',
  props: {
    title:{type:[String],default:'标\n题'},
    value:{type:[String,Number],default:'-'},
    unit:{type:[String],default:' '},
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.pv-invest-cell {
  width: 33%;
  height: 100px;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  text-align: center;

  .in-top {
    flex: 3;
    background: url("./Icon/investment-bg.png") no-repeat center center;
    background-size: 54px 56px;
    font-size: 16px;
    @include centerVertical;
    height: 56px;
    white-space: pre;
  }

  .in-bottom {
    letter-spacing: 0;
    font-weight: 700;
    margin-top: 8px;
    flex: 2;

    .in-value {
      font-size: 20px;
    }

    .in-unit {
      font-size: 12px;
    }
  }
}
</style>
