<template>
  <div ref="tranceObjChart" class="thermodynamic-chart-main"></div>
</template>

<script>
import resize from '@/mixins/resize-chart'
import styles from '@/styles/global.scss'
import moment from 'moment'
import { StandardValue } from '@/api/standard-value'
import AbnormalApi from '@/api/abnormal'

export default {
  name: 'PointChart',
  props: {
    showData: {
      type: String,
      default: ''
    }
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

    }
  },
  watch: {
    showData(newV, _) {
      this.renderChart()
    }
  },
  methods: {
    getGrade(v){
      //异常 不在正常概率序列内
      if (v>100) return 2
      //警告 在正常概率序列15外
      else if (v>50) return 1
      //正常 在正常概率序列前15内
      return 0
    },
    async renderChart() {
      let dataList = this.showData
      const getGrade=this.getGrade
      if (!dataList) {
        return
      }
      const dataListFormat = []
      // LOG.info(['dataList='+JSON.stringify(dataList)])
      for (let i = 0, j = 0; i < 45; i++) {
        const dateStr = moment().subtract(i, 'hours').format('yyyy-MM-DD HH:mm:ss')
        if (dataList.length <= j || dateStr !== dataList[j].warningTime) {
          dataListFormat.push({
            pm2Top: 0, pm10Top: 0, noiseTop: 0, waterTop: 0, eleTop: 0,
            warningTime: dateStr
          })
        } else {
          dataListFormat.push(dataList[j++])
        }
      }
      dataList = dataListFormat.reverse()

      const yNames = ['历史T1', '历史T2', '历史T3', '历史T4', '历史T5', '历史T6', '历史T7', '历史T8', '本次']
      const xNames = []

      function getRandomNum() {
        return Math.floor(Math.random() * 100)
      }

      for (let i = 0; i < dataList.length; i++) {
        const e = dataList[i]
        xNames.push(e.warningTime)
        // for (let j = 0; j < yNames.length; j++) {
        //   if (j < yNames.length - 1) {
        //     data.push([i, j, getRandomNum()])
        //   } else {
        //     data.push([i, j, getRandomNum()+50])
        //   }
        // }
      }

      const res =await AbnormalApi.getPredictData({nodeId:this.showData})

      const data =JSON.parse(res.object)

      const textList=['正常','疑似','异常']
      const option = {
        tooltip: {
          position: 'top',
          formatter(params) {
            return '时间: ' + params.name + '<br>' + yNames[params.data[1]] +
              ` ${textList[getGrade(params.data[2])]}序列:` + params.value[2]
          }
        },
        // animation: fa5lse,
        grid: {
          height: '83%',
          width: '95%',
          left: '5%',
          top: '5%'
        },
        xAxis: {
          type: 'category',
          data: xNames,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#ffffff',
            fontSize: 10,
            formatter(params) {
              return params.substring('2022-03-'.length)
            }
          }
        },
        yAxis: {
          type: 'category',
          data: yNames,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#ffffff',
            fontSize: 10
          }
        },
        series: [{
          name: '',
          type: 'heatmap',
          data: data,
          itemStyle: {
            normal: {
              borderWidth: 3,
              color: (params) => {
                const data = params.data
                const colorList = ['#5ca08d', styles.colorWarning, styles.colorDanger]
                return colorList[this.getGrade(data[2])]
              },
              borderColor: '#434e47'
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
        ]
      }

      this.chartObj.setOption(option)
    }

  }
}
</script>

<style lang="scss" scoped>
.thermodynamic-chart-main {
  width: 100%;
  height: 100%;
  background-color: transparent !important;
}
</style>
