<template>
  <div ref="tranceObjChart" class="speed-chart-main"></div>
</template>

<script>
import resize from '@/mixins/resize-chart'
import styles from '@/styles/global.scss'
import { deepClone } from '@/utils'
import LOG from '@/utils/self-log'

export default {
  name: 'SpeedChart',
  props: {
    showData: {
      type: Object,
      default: () => {
        return {
          value: 60.1,
          name:"进度正常"
        }
      }
    }
  },
  watch:{
    showData(newV,_){
      this.renderChart()
    }
  },
  mixins: [resize],
  components: {},
  mounted() {
    this.chartObj = this.$echarts.init(this.$refs.tranceObjChart)
  },
  data() {
    return {
      chartObj: null
    }
  },
  methods: {
    renderChart() {
      let dataShow=this.showData
      dataShow.value=Number(dataShow.value).toFixed(1)
      const myChart = this.chartObj
      const echarts = this.$echarts
      const option = {
        title: [
          {
            text: dataShow.name,
            x: 'center',
            top: '59%',
            textStyle: {
              color: '#ffffff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: dataShow.value+'%',
            x: 'center',
            top: '32%',
            textStyle: {
              fontSize: '25',
              color: '#ffffff',
              fontFamily: 'Lato',
              foontWeight: '600'
            }
          }],
        polar: {
          radius: ['94%', '73%'],
          center: ['50%', '50%']
        },
        angleAxis: {
          max: 100,
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false

          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            'name': 'CPU分配率 外圈',
            'radius': ['96%', '85%'],
            'clockWise': false,
            'hoverAnimation': false,
            'type': 'pie',
            'data': [{
              'value': dataShow.value,
              'name': '',
              'labelLine': {
                'show': false
              },
              'itemStyle': {
                'normal': {
                  'color': styles.colorSuccess,
                  'borderColor': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00a2ff'
                  }, {
                    offset: 1,
                    color: '#70ffac'
                  }]),
                  'borderWidth': 1
                },
                'emphasis': {
                  'color': '#5886f0',
                  'borderColor': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#85b6b2'
                  }, {
                    offset: 1,
                    color: '#6d4f8d'
                  }]),
                  'borderWidth': 1
                }
              }
            }, {
              'name': ' ',
              'value': 100-dataShow.value,
              'itemStyle': {
                'normal': {
                  'label': {
                    'show': false
                  },
                  'labelLine': {
                    'show': false
                  },
                  'color': 'rgba(0,0,0,0)',
                  'borderColor': 'rgba(0,0,0,0)',
                  'borderWidth': 0
                },
                'emphasis': {
                  'color': 'rgba(0,0,0,0)',
                  'borderColor': 'rgba(0,0,0,0)',
                  'borderWidth': 0
                }
              }
            }]
          }
        ]
      }

      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.speed-chart-main {
  width: 100%;
  height: 100%;
  background-color: transparent !important;
}
</style>
