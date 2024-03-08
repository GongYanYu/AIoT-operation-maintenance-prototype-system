<template>
  <div class="card-number-view">
    <img class="cn-back-img" src="./img/back.png"/>
    <div class="cn-info-view">
      <span class="cni_label">{{ label }}</span>
      <div class="cni_number-view" :class="styleClass">
        <span class="cni_num">{{ value }}</span>
        <span class="cni_unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardNumber',
  props: {
    label: {
      type: String,
      default: '标题'
    },
    value: {
      type: Number | String,
      default: ''
    },
    //单位
    unit: {
      type: String,
      default: '个'
    },
    styleClass:{}
  },
  data() {
    return {}
  }

}
</script>

<style lang="scss" scoped>
.card-number-view {
  width: 100%;
  height: 100%;
  position: relative;

  .cn-back-img {
    width: 100%;
    height: 100%;
  }

  .cn-info-view {
    position: absolute;
    top: 0;
    left: 12px;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .cni_label {
      line-height: 1;
      font-size: 16px;
      color: #FFFFFF;
    }

    .cni_number-view {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      line-height: 1;

      .cni_num {
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 1px;
        font-family: TG-TYPE-Regular;
      }

      .cni_unit {
        font-size: 12px;
        margin-left: 6px;
        color: #ebebeb;
      }
    }

  }

  .red{
    .cni_num,.cni_unit{
      color: $--color-danger !important;
    }
  }
}
</style>

