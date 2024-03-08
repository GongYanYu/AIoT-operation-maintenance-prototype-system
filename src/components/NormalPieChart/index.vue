<template>
  <div ref="tranceObjChart" class="normal-pie-chart-main"></div>
</template>

<script>
import resize from '@/mixins/resize-chart'
import styles from '@/styles/global.scss'
import { deepClone } from '@/utils'
import LOG from '@/utils/self-log'

export default {
  name: 'NormalPieChart',
  props: {
    showData: {
      type: Array,
      default: () => {
        return [
          { value: 50, name: '处理中' },
          { value: 40, name: '已处理' },
          { value: 10, name: '超期未处理' },
          { value: 100, name: '预警数' },
        ]
      }
    },
    color:{type:Array,default:()=>{return[styles.colorMain,styles.colorPrimary,'#6268DA']}},
    labelPosition:{type:Array,default:()=>{return[]}}
  },
  mixins: [resize],
  components: {},
  mounted() {
    this.chartObj = this.$echarts.init(this.$refs.tranceObjChart)
    this.renderChart()
  },
  data() {
    return {
      chartObj: null,
      option:{
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right:20,
          top:'center',
          icon: 'circle',
          itemGap: 18,
          itemWidth: 14,
          itemHeight: 14,
          textStyle:{
            fontSize: 14,//字体大小
            color: '#ffffff',//字体颜色
            rich:{
              a:{
                fontSize:14,
                color:"#ffffff",
                padding:[0,0,7,0],
              },
              b:{
                fontSize:12,
                color:"#ffffff90"
              }
            }
          },
          formatter:null,
        },
        graphic:{
          type:'text',
          left:93,
          top:87,
          style:{
            text:'预警数\n'+'100', //使用“+”可以使每行文字居中
            textAlign:'center',
            font:'bolder 16px',
            fill:'#ffffff',
            height:20,
            fontSize:15,
            width:20,
            padding:20,
            backgroundColor:'#1C232460',
            borderRadius:100,
          }
        },
        series: [
          {
            center: ['115px', '97px'],
            type: 'pie',
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [],
            color:[]
          }
        ]
      },
    }
  },
  watch:{
    showData(newV,_){this.renderChart()}
  },
  methods: {
    renderChart() {
      let showData=deepClone(this.showData).map(e=>{
        e.value=e.value==null?0:e.value
        return e
      })
      let pop = showData.pop()
      this.option.graphic.style.text=pop.name+'\n'+pop.value
      this.option.series[0].data=showData

      this.option.legend.formatter=(name)=>{
        let target=this.showData.find(e=>e.name===name)
        let arr=["{a|"+(target.value==null?'0':target.value)+"个}","{b|"+name+"}"]
        return arr.join("\n")
      }
      this.option.series[0].color=this.color

      //4个字微调
      if (pop.name.length>3){
        // let left = this.option.graphic.left
        let left=93
        left=left-(pop.name.length-3)*6
        this.option.graphic.left=left
      }

      this.chartObj.setOption(this.option)

      this.chartObj.on('click', (params) => {
        if (params.data==null){
          LOG.info(['====pie params.data为空 已拦截点击事件===='])
          return
        }
        LOG.info(['pie===='+JSON.stringify(params.data)])
        this.$emit('clickPie', params)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.normal-pie-chart-main {
  width: 100%;
  height: 100%;
  background-color: transparent !important;
}
</style>
