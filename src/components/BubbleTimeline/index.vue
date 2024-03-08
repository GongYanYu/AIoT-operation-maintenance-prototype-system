<template>
  <div class="bubble-tl-main"  @click="clickTimestamp($event)">
    <div v-for="(item, index) in formatData"  :data-index="index"  :key="index">
      <hover-style class="cell-btl" :data-index="index" :clicked="index===clicked">
        <div class="cell-1" v-if="item.timestamp!==null" :data-index="index">
          {{ item.timestamp }}
        </div>
        <div v-else style="flex: 2.5;" :data-index="index"></div>
        <div class="cell-2" :data-index="index">
          <div :class="index<=lightUpNum?'dot-light':'dot-not-light'"></div>
          <span :class="index+1<=lightUpNum?'line-light':'line-not-light'"
                v-if="index+1<formatData.length"></span>
        </div>
        <div class="cell-3" :data-index="index">
          <div class="text" :data-index="index"> {{ item.title }}</div>
        </div>
      </hover-style>
    </div>
  </div>
</template>

<script>
import HoverStyle from '@/components/HoverStyle'
export default {
  name: 'BubbleTimeline',
  components: { HoverStyle },
  data() {
    return {
      lightUpNum: -1,
      clicked: -1
    }
  },
  props: {
    width: {//px
      type: Number,
      default: 261
    },
    data: {
      type: Array,
      default:()=>{
        return  [
          { timestamp:  '2021-09-12', title: '设计阶段', value: '1' },
          { timestamp:  '2021-09-12', title: '基础开挖', value: '1' },
          { timestamp:  '2021-09-12', title: '管沟埋设', value: '1' },
          { timestamp:  '2021-09-12', title: '土方回填', value: '1' },
          { timestamp:  '2021-09-12', title: '路基工程', value: '1' },
          { timestamp:  '2021-09-12', title: '路面工程', value: '1' },
          { timestamp:  '2021-09-12', title: '交通及绿化', value: '1' }
        ]
      }
    },
    num: {
      type: Number,
      default: 7
    }
  },
  computed: {
    formatData() {
      if (this.data===null){
        return this.data
      }
      let ans = this.data
      // for (let i = this.data.length - 1; i >= 0; i--) {
      //   let datum = this.data[i]
      //   let number = ans.findIndex(e => e.title === datum.projectStage)
      //   if (number >= 0) {
      //     if (this.lightUpNum === -1) {
      //       this.lightUpNum = number
      //     }
      //     //赋值操作
      //     ans[number].timestamp = datum.timestamp
      //   }
      // }
      this.lightUpNum = ans.length
      return ans
    }
  },
  methods:{
    clickTimestamp(e){
      let index=e.target.dataset.index
      if (!index){
        return
      }
      index=Number(index)
      this.clicked=index
      this.$emit('clickTimestamp',this.data[index])
    }
  },
  filters: {
    formatTime(val){
      return val.substring(5,7)+'月'
    }
  }
}
</script>
<style scoped lang="scss">
.bubble-tl-main {
  display: flex;
  color: #FFFFFF;
  padding-top: 10px;
  padding-bottom:10px;

  .cell-btl {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 147px;
    height: 120px;
    padding: 5px 0;
    cursor: pointer;
    justify-content: start;

    .cell-1 {
      flex: 2.5;
      width: 120px;
      height: 42px;
      background: url("./icon/bubble.png") no-repeat center center;
      background-size: 100% 100%;
      @include centerVertical;

      @include numFontFamily;
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
    }

    .cell-2 {
      flex: 1;
      width: 100%;
      margin-left: 127px;
      display: flex;

      .dot-light {
        width: 22px;
        height: 20px;
        background: url("./icon/dot-light.png") no-repeat center center;
        background-size: 100% 100%;
      }

      .dot-not-light {
        width: 22px;
        height: 22px;
        background: url("./icon/dot-not-light.png") no-repeat center center;
        background-size: 100% 100%;
      }

      .line-light{
        border-top: 2px solid $--color-main;
        width: 95%;
        margin-top: 10px;
      }
      .line-not-light{
        border-top: 2px dashed white;
        width: 100%;
        margin-top: 10px;
      }
    }

    .cell-3 {
      flex: 3;
      width: 90%;
      flex-shrink: 0;
      //flex-grow: 0;
      text-align: center;
      .text{
        margin-top: 12px;
        font-weight: 500;
        font-size: 16px;
        line-height: 17px;
      }
    }
  }
}
</style>
