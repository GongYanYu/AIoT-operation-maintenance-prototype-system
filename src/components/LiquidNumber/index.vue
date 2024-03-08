<!--
*@LiquidNumber
*@author GYY
*@date 2022/9/8 20:18
-->
<template>
  <div class="liquid-num-main">
    <div class="ln-up">
      <slot/>
    </div>
    <div class="ln-down">
      <div class="cell" v-for="(item,index) in showDataFormat"
           :key="index" :class="{'unit':!(item>='0'&&item<='9')}"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiquidNumber',
  props: {
    showData: {
      type: [String, Number],
      default: '#000'
    },
    size: { type: Number, default: 4 },
    fillStr: { type: String, default: ' ' }
  },
  computed: {
    showDataFormat() {
      let data = this.showData.toString()
      if (data.length > this.size) {
        return data.substring(this.size).split('')
      } else {
        for (let i = data.length; i < this.size; i++) {
          data = this.fillStr + data
        }
        return data.split('')
      }
    }
  },
  mounted() {
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.liquid-num-main {
  width: 100%;
  height: 100%;
  color: #FFFFFF;
  background: --color-bg(0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px 4px 0 0;

  .ln-up {
    width: 100%;
    height: 30%;
    padding: 8px 0 5px 8px;
    font-weight: bold;
  }

  .ln-down {
    width: 100%;
    height: 60%;
    display: flex;
    text-align: center;
    align-items: center;

    .cell {
      height: 100%;
      flex: 1;
      background: url("./img/people_num.png") no-repeat;
      background-size: 100% 100%;
      font-size: 36px;
      line-height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .unit {
      font-size: 30px;
      font-weight: bold;
      padding-top: 3px;
    }

  }
}
</style>
