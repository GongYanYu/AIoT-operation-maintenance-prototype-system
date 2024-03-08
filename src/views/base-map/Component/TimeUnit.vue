<!--
*@TimeUnit
*@author GYY
*@date 2022/7/15 13:23
-->
<template>
  <div class="tu-main">
    <div class="cell-1">{{ time1 }}</div>
    <div class="line">
      <div class="main"></div>
    </div>
    <div class="cell-2">{{ time2 }}</div>
    <div class="line">
      <div class="main"></div>
    </div>
    <div class="cell-3">
      <img src="@/assets/main/settings.png" @click="settingsOptions" alt=""/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TimeUnit',
  props: {},
  components: {},
  mounted() {
    this.startTime()
  },
  data() {
    return {
      time1: '',
      time2: '',
      timeLoop: null
    }
  },
  methods: {
    startTime() {
      this.timeLoop = setInterval(() => {
        let dateStr = moment().format('YYYY年MM月DD日HH:mm:ss')
        this.time1 = dateStr.substr(0, 11)
        this.time2 = dateStr.substr(11)
      }, 1000)
    },
    closeTime() {
      if (this.timeLoop != null) {
        clearInterval(this.timeLoop)
        this.timeLoop = null
      }
    },
    settingsOptions(){
      this.$message({type:'info',message:'暂无功能'})
    }
  },
  destroy() {
    this.closeTime()
  }
}
</script>

<style lang="scss" scoped>
.tu-main {
  width: 304px;
  height: 24px;
  font-size: 20px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 24px;
  font-family: TG-TYPE-Regular;

  text-align: center;
  display: flex;

  .cell-1 {
    width: 145px;
    height: 28px;
    font-weight: 400;
    line-height: 24px;
  }

  .cell-2 {
    width: 66px;
    height: 24px;
    font-weight: 400;
    line-height: 24px;
  }

  .cell-3 {
    img{
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  .line {
    width: 33px;
    height: 100%;
    .main {
      margin-top: 6px;
      margin-left: 16px;
      width: 1px;
      height: 14px;
      border-radius: 1px;
      border-left: 2px solid #D8D8D8;
    }
  }
}
</style>
