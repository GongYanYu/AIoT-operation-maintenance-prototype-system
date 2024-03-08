<!--
*@ProgressListCell
*@author GYY
*@date 2022/7/20 11:23
-->
<template>
  <div @mouseenter="isHover=true"  @mouseleave="isHover=false" :data-index="index"
       class="ep-main" :class="{'auto-scroll-cell-hover':checked!==-99&&checked!==index&&isHover,
  'auto-scroll-cell-checked':checked===index}">
    <div class="ep-container" :data-index="index">
      <div class="ep-childDiv1" :style="{flex:flexList[0]}" :data-index="index">
        <omit-tooltip :data-index="index" :text="item.value1" :show-length="10"  />
      </div>
      <div class="ep-childDiv2" :style="{flex:flexList[1]}" :data-index="index">
        <omit-tooltip :data-index="index" :text="item.value2" :show-length="10"  />
      </div>
      <div class="ep-childDiv3" :style="{justifyContent:item.value4?'left':'right',flex:flexList[2],color:getColor(2)}"
           :data-index="index" :title="item.value3">
        {{ item.value3 }}
      </div>
      <div v-if="item.value4" class="ep-childDiv3" :style="{flex:flexList[3],color:getColor(3)}" :data-index="index">
        {{ item.value4 }}
      </div>
      <slot/>
    </div>
    <div v-if="item.progress!=null" :data-index="index">
      <custom-progress class="ep-progress" :data-index="index" :max="100"
                       :value="Number(item.progress)" :color="item.progressColor" />
    </div>
  </div>
</template>

<script>
import OmitTooltip from '@/components/OmitTooltip'
import CustomProgress from '@/components/CustomProgress'
export default {
  name: 'ProgressListCell',
  props: {
    index:{
      type:Number,
      default:null
    },
    //checked =-99 不可选择
    checked:{
      type:Number,
      default:-1
    },
    item: {
      type:Object,
      default:()=>{
        return{value1:'1', value2:'2', value3:'3', progress:10,colorList:[] }
      }
    },
    flexList:{
      type:Array,
      default:()=>{
        return ['2','6','3']
      }
    },
  },
  components: { CustomProgress, OmitTooltip },
  mounted() {
  },
  data() {
    return {
      isHover:false
    }
  },
  methods: {
    getColor(index){
      const data=this.item
      if (data.colorList&&data.colorList.length>index){
        return data.colorList[index]
      }
      return null
    }
  }
}
</script>


<style scoped lang="scss">
.ep-container {
  display: flex;
  width: 100%;
  color: white;
  font-size: 14px;

}
.ep-main{
  width: 100%;
  padding: 15px 10px 15px 10px;
}

.ep-childDiv1 {
  height: 100%;
  padding: 4px 0;
}

.ep-childDiv2 {
  height: 100%;
  padding: 4px 0;
  align-items: center;
  text-align: left;
}

.ep-childDiv3 {
  height: 100%;
  padding: 4px 0;
  display: flex;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  .st-main{
    margin-top: 0.1rem;
    margin-left: 0.2rem;
  }
}

.ep-progress {
  border-radius: 8px;
  width: 100%;
  height: 10px;
  margin-top: 2%;
}
</style>
