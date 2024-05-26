<!--
*@NormalLineChart
*@author GYY
*@date 2022/7/19 19:28
-->
<template>
  <div ref="tranceObjChart" class="normal-line-chart-main"></div>
</template>

<script>
import resize from '@/mixins/resize-chart'
import styles from '@/styles/global.scss'
import { deepClone } from '@/utils'
import AbnormalApi from '@/api/abnormal'

export default {
  name: 'NormalLineChart',
  mixins: [resize],
  components: {},
  mounted() {
    this.chartObj = this.$echarts.init(this.$refs.tranceObjChart)
    this.doSearch()
  },
  props:{
    region: {
      type: Number,
      default:null
    },
  },
  watch:{
    region(newV,_){
      this.doSearch()
    }
  },
  data() {
    return {
      series: {
        name: '',
        type: 'line',
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 5,
        lineStyle: {
          color: styles.colorPrimary
        },
        data: []
      },
      option: {
        color:[],
        grid: {
          top: '15%',
          bottom: '25%',
          left: '30',
          right: '4%'
        },
        legend: {
          icon: 'rect',
          itemGap: 10,
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            fontSize: 14,//字体大小
            color: '#ffffff'//字体颜色
          },
          top: 'bottom',
          data: ['A级问题', 'B级问题', 'C级问题']
        },
        tooltip: {
          trigger: 'axis',
          extraCssText: 'color:white;background: rgba(8,18,18,0.70); border:0',
          label: {
            show: true
          },
          formatter:'',
        },
        xAxis: {
          boundaryGap: true, //默认，坐标轴留白策略
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisLabel:{
            formatter(v){
              return v.substring(2)
            }
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          data: []
        },
        yAxis: {
          name:'问题个数',
          type: 'value',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: 12,
            padding: [0, 10, 0, 0] // 上右下左与原位置距离
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(255,255,255,0.3)'
            }
          }
        },
        axisLabel: {
          formatter(value, index) {
            return value
          },
          color: '#FFFFFF'
        },
        series: []
      },
      chartObj: null
    }
  },
  methods: {
    renderChart(showData) {
      //预处理数据
      let xAxisData=[],aList=[],bList=[],cList=[]
      showData.forEach(e=>{
        xAxisData.push(e.date)
        aList.push(e.ANum)
        bList.push(e.BNum)
        cList.push(e.CNum)
      })
      //总体颜色
      this.option.color=[this.getColor('A级问题'),this.getColor('B级问题')
      ,this.getColor('C级问题')]

      let series = []
      series.push(this.getSeries('A级问题', aList))
      series.push(this.getSeries('B级问题', bList))
      series.push(this.getSeries('C级问题', cList))
      this.option.series = series
      this.option.xAxis.data = xAxisData

      //提示框
      this.option.tooltip.formatter=function(params) {
        let getColor = (type) =>{
          let color = 'white'
          switch (type) {
            case 'A级问题':
              color = styles.colorDanger
              break
            case 'B级问题':
              color = styles.colorStress
              break
            case  'C级问题':
              color = styles.colorPrimary
              break
          }
          return color
        }
        let result = ''
        result += params[0].name + '<span style="font-size: 12px;">'
        params.forEach((item) => {
          const dotHtml = `<span style="display:inline-block;margin-right:5px;border-radius:1px;` +
            `width:10px;height:10px;background-color:${getColor(item.seriesName)}"></span>`
          result += '</br>' + dotHtml
            + `<span style="display:inline-block;width: 40px;"> ${item.seriesName}</span>`
            + `<span style="display:inline-block;width: 50px; text-align: right"> ${item.data}</span>`
        })
        return result + '<span>'
      }

      this.chartObj.setOption(this.option)
    },
    doSearch(){
      AbnormalApi.securityWarningTrends().then(res=>{
        this.renderChart(res.root)
      })
    },
    getSeries(type, data) {
      let series = deepClone(this.series)
      series.name = type
      series.data = data
      series.lineStyle.color = this.getColor(type)
      return series
    },
    getColor(type) {
      let color = 'white'
      switch (type) {
        case 'A级问题':
          color = styles.colorDanger
          break
        case 'B级问题':
          color = styles.colorStress
          break
        case  'C级问题':
          color = styles.colorPrimary
          break
      }
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
.normal-line-chart-main {
  width: 100%;
  height: 100%;
  background-color: transparent !important;
}
</style>
