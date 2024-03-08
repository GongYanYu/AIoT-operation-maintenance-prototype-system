<template>
  <div ref="tranceObjChart" class="thermodynamic-chart-main"></div>
</template>

<script>
import resize from '@/mixins/resize-chart'
import * as echarts from 'echarts'

export default {
  name: 'DeviceChart',
  props: {
    showData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mixins: [resize],
  components: {},
  mounted() {
    this.chart = this.$echarts.init(this.$refs.tranceObjChart)
    this.renderChart()
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    showData(newV, _) {
      this.renderChart()
    }
  },
  methods: {
    renderChart() {
      const myChart = this.chart
      var highlight = '#00b79e';

      var demoData = [
        { name: '设备1', value: 220, unit: '', pos: ['16.6%', '25%'], range: [0, 400] },
        { name: '设备2', value: 32, unit: '', pos: ['49.8%', '25%'], range: [0, 60] },
        { name: '设备3', value: 0.9, pos: ['83%', '25%'], range: [0.1, 1.0], splitNum: 9 },
        { name: '设备4', value: 6.34, unit: '', pos: ['16.6%', '75%'], range: [0, 50] },
        { name: '设备5', value: 6.28, unit: '', pos: ['49.8%', '75%'], range: [0, 50] },
        { name: '设备6', value: 50, unit: '', pos: ['83%', '75%'], range: [0, 100] }
      ];

      const option = {
        series: (function() {
          var result = [];

          demoData.forEach(function(item) {
            result.push(
              // 外围刻度
              {
                type: 'gauge',
                center: item.pos,
                radius: '30.33%',  // 1行3个
                splitNumber: item.splitNum || 10,
                min: item.range[0],
                max: item.range[1],
                startAngle: 225,
                endAngle: -45,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 2,
                    shadowBlur: 0,
                    color: [
                      [1, highlight]
                    ]
                  }
                },
                axisTick: {
                  show: true,
                  lineStyle: {
                    color: highlight,
                    width: 1
                  },
                  length: -5,
                  splitNumber: 10
                },
                splitLine: {
                  show: true,
                  length: -14,
                  lineStyle: {
                    color: highlight,
                  }
                },
                axisLabel: {
                  distance: -20,
                  textStyle: {
                    color: highlight,
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                },
                pointer: {
                  show: 0
                },
                detail: {
                  show: 0
                }
              },

              // 内侧指针、数值显示
              {
                name: item.name,
                type: 'gauge',
                center: item.pos,
                radius: '30.33%',
                startAngle: 225,
                endAngle: -45,
                min: item.range[0],
                max: item.range[1],
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 16,
                    color: [
                      [1, 'rgba(255,255,255,.1)']
                    ]
                  }
                },
                axisTick: {
                  show: 0,
                },
                splitLine: {
                  show: 0,
                },
                axisLabel: {
                  show: 0
                },
                pointer: {
                  show: true,
                  length: '105%'
                },
                detail: {
                  show: true,
                  offsetCenter: [0, '100%'],
                  textStyle: {
                    fontSize: 20,
                    color: '#fff'
                  },
                  formatter: [
                    '{value} ' + (item.unit || ''),
                    '{name|' + item.name + '}'
                  ].join('\n'),
                  rich: {
                    name: {
                      fontSize: 14,
                      lineHeight: 30,
                      color: '#ddd'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: highlight,
                  }
                },
                data: [{
                  value: item.value
                }]
              }
            );
          });

          return result;
        })()
      };
      myChart.setOption(option)
    }

  }
}
</script>

<style lang="scss" scoped>
.thermodynamic-chart-main {
  width: 100%;
  height: 100%;
}
</style>
