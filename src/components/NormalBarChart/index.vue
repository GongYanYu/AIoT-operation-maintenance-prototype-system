<template>
  <div ref="tranceObjChart" class="normal-bar-chart-main"
       @mouseover="isPause=true" @mouseleave="isPause=false"
  ></div>
</template>

<script>
import resize from '@/mixins/resize-chart'
import styles from '@/styles/global.scss'
import { deepClone } from '@/utils'
import LOG from '@/utils/self-log'

export default {
  name: 'NormalBarChart',
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
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
      option: {
        tooltip: {
          //extraCssText: 'color:white;background: rgba(8,18,18,0.70); border:0',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [],
          // align: 'center',
          bottom: 0,
          textStyle: {
            fontSize: 14,//字体大小
            color: '#ffffff',//字体颜色
            formatter(name) {
              return name
            }
          }
        },
        grid: {
          top: '15%',
          left: '0%',
          right: '20',
          bottom: '20%',
          containLabel: true
        },
        dataZoom: [
          {
            xAxisIndex: 0,// 这里是从X轴的0刻度开始
            show: true, // 是否显示滑动条，不影响使用
            //type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            showDataShadow: false,//是否显示数据阴影 默认auto
            showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
            realtime: true, //是否实时更新

            endValue: 4, // 一次性展示多少个。
            height: 10//这里可以设置dataZoom的尺寸
          }
        ],
        xAxis: {
          inside: true,
          interval: 0,
          boundaryGap: true, //默认，坐标轴留白策略
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          type: 'category',
          data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
        },
        yAxis: [
          {
          type: 'value',
          name: '管理人员数：人',
          axisLabel: {
            formatter: '{value}'
          },
          //nameGap: 50,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(255,255,255,0.1)'
            }
          },
          nameTextStyle: {
            color: '#ffffff',
            fontSize: 12,
            padding: [0, 0, 0, 40] // 上右下左与原位置距离
          }
        },{
          type: 'value',
          name: '天',
          axisLabel: {
            formatter: '{value}'
          },
          //nameGap: 50,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(255,255,255,0.1)'
            }
          },
          nameTextStyle: {
            color: '#ffffff',
            fontSize: 12,
            padding: [0, 0, 0, 0] // 上右下左与原位置距离
          }
        } ],
        axisLabel: {
          formatter(value, index) {
            return value
          },
          color: '#FFFFFF'
        },
        series:  [
          {
            name: '管理人员',
            type: 'bar',
            data: [
              { value: 20, id: 112323, name: '崖州湾项目A' }
              , { value: 20, id: 112323, name: '崖州湾项目A' }
              , { value: 20, id: 112323, name: '崖州湾项目A' }
              , { value: 20, id: 112323, name: '崖州湾项目A' }
              , { value: 20, id: 112323, name: '崖州湾项目A' }
              , { value: 20, id: 112323, name: '崖州湾项目A' }
            ],
            color:styles.colorPrimary,
            barWidth: 8,
            barGap: 0
          },
          {
            name: '出勤天数',
            type: 'bar',
            yAxisIndex: 1,//使用第二个y轴
            data: [
              { value: 10, id: 112323, name: '崖州湾项目A' }
              , { value: 20, id: 112323, name: '崖州湾项目A' }
              , { value: 10, id: 112323, name: '崖州湾项目A' }
              , { value: 20, id: 112323, name: '崖州湾项目A' }
              , { value: 10, id: 112323, name: '崖州湾项目A' }
              , { value: 20, id: 112323, name: '崖州湾项目A' }
            ],
            color:styles.colorDanger,
            barWidth: 8,
            barGap: 0
          }
        ]
      },
      autoInterval: null,
      isPause: false
    }
  },
  methods: {
    renderChart() {
      //seriesList
      this.option.series = this.seriesList
      //nameList
      let nameList = []
      this.seriesList.forEach(e => nameList.push(e.name))
      this.option.legend.data = nameList
      //x轴data
      let xAxisList = []
      this.seriesList[0].data.forEach(e => {
        xAxisList.push(e.name.substring(0, 4) + '\n' + e.name.substring(4))
      })
      this.option.xAxis.data = xAxisList

      let option = this.option
      this.chartObj.setOption(option)

      // 定时自动滚动
      if (this.option.xAxis.data.length > 5) {
        this.autoInterval = setInterval(() => {
          if (this.isPause) {
            return
          }
          if (option.dataZoom[0].endValue === this.option.xAxis.data.length) {
            option.dataZoom[0].startValue = 0
            option.dataZoom[0].endValue = 4
          } else {
            option.dataZoom[0].startValue++
            option.dataZoom[0].endValue++
          }
          this.chartObj.setOption(option)
        }, 3000)
      }

      this.chartObj.on('click', (params) => {
        LOG.info(['bar====' + JSON.stringify(params.data)])
        this.$emit('clickBar', params)
      })
    },
    destroy() {
      if (this.autoInterval) {
        clearInterval(this.autoInterval)
        this.autoInterval = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.normal-bar-chart-main {
  height: 100%;
  width: 100%;
  background-color: transparent !important;
}
</style>
