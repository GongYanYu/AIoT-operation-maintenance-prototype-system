<template>
  <div ref="tranceObjChart" class="thermodynamic-chart-main"></div>
</template>

<script>
import resize from '@/mixins/resize-chart'
import * as echarts from 'echarts'
import StatusApi from '@/api/status'

export default {
  name: 'NetworkChart',
  props: {
    showData: {
      type: String,
      default: ''
    },
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
    showData(v, _) {
      this.renderChart(v)
    }
  },
  methods: {
    renderChart(v) {
      const myChart = this.chart
      let [in_new, in_min, in_max, in_avg] = ['0', '0', '0', '0',]
      let [out_new, out_min, out_max, out_avg] = ['0', '0', '0', '0',]


// 格式化时间
      function getTime() {
        var ts = arguments[0] || 0;
        var t, h, i, s;
        t = ts ? new Date(ts * 1000) : new Date();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
      }


      const option = {
        title: [
          {
            text: '图表名称',
            x: 15,
            y: '20',
            textBaseline: 'middle',
            textStyle: {
              fontSize: 20,
              fontWeight: '500'
            }
          }, {
            text: '设备接口',
            x: 15,
            y: '40',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 16,
              fontWeight: '100'
            }
          }, {
            text: '最新',
            x2: 235,
            y: '10',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: '最小',
            x2: 165,
            y: '10',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: '最大',
            x2: 95,
            y: '10',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: '平均',
            x2: 20,
            y: '10',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: in_new,
            x2: 235,
            y: '26',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: in_min,
            x2: 165,
            y: '26',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: in_max,
            x2: 95,
            y: '25',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: in_avg,
            x2: 20,
            y: '25',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: out_new,
            x2: 235,
            y: '40',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: out_min,
            x2: 165,
            y: '40',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: out_max,
            x2: 95,
            y: '40',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }, {
            text: out_avg,
            x2: 20,
            y: '40',
            textBaseline: 'middle',
            textStyle: {
              color: '#ccd9ff',
              fontSize: 12,
              fontWeight: '100'
            }
          }],
        legend: [{
          x2: 300,
          y: 20,
          icon: 'rect',
          itemGap: 3,
          itemWidth: 11,
          itemHeight: 11,
          orient: 'vertical',
          data: ['接收', '发送'],
          textStyle: {
            color: "#ffffff"
          }
        }],
        grid: [{
          left: 20,
          right: 20,
          top: 80,
          bottom: 0,
          containLabel: true
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#ccd9ff'
            }
          },
          data: []
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccd9ff'
            }
          },
          axisLabel: {
            formatter: '{value}Mbps',
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {
            lineStyle: {
              color: '#cccccc'
            }
          }
        }],
        series: [
          {
            name: '发送',
            type: 'line',
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 0
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(255,255,255, .7)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(105,105,250)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0,0,255, 0.5)'
                }])
              },
            },
            data: []
          }, {
            name: '接收',
            type: 'line',
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 0
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(0,255,0)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,255,0,1)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0,255,0, 0.5)'
                }])
              },
            },
            data: []
          }]
      };

      StatusApi.getNodeFlowData({nodeId:this.showData})
        .then(res=>{
          const data=res.root
          //初始化数据
          let date=data.map(e=>e['createTime'])
          let in_data=data.map(e=>e['inData'])
          let out_data=data.map(e=>e['outData'])
          setInterval(function() {
            date.shift()
            in_data.shift();
            out_data.shift();
            in_data.push(Math.ceil(Math.random() * 500));
            out_data.push(Math.ceil(Math.random() * 800));
            date.push(getTime(Math.round(new Date().getTime() / 1000)))

            in_new = in_data[in_data.length - 1]
            out_new = out_data[out_data.length - 1]
            in_min = Math.min.apply(null, in_data);
            in_max = Math.max.apply(null, in_data);
            out_min = Math.min.apply(null, out_data);
            out_max = Math.max.apply(null, out_data);
            in_avg = in_data.reduce(function(tmp, item, index) {
              if (index != in_data.length - 1) {
                return tmp + item;
              } else {
                return (tmp + item) / out_data.length;
              }
            });
            out_avg = out_data.reduce(function(tmp, item, index) {
              if (index != out_data.length - 1) {
                return tmp + item;
              } else {
                return (tmp + item) / out_data.length;
              }
            });

            myChart.setOption({
              title: [{
                text: ' ',
                textStyle: {
                  color:'#fff'
                }
              }, {
                text: 'GigabitEthernet 0/24'
              }, {
                text: '最新'
              }, {
                text: '最小',
              }, {
                text: '最大'
              }, {
                text: '平均'
              }, {
                text: in_new + 'Mbps'
              }, {
                text: in_min + 'Mbps'
              }, {
                text: in_max + 'Mbps'
              }, {
                text: in_avg + 'Mbps'
              }, {
                text: out_new + 'Mbps'
              }, {
                text: out_min + 'Mbps'
              }, {
                text: out_max + 'Mbps'
              }, {
                text: out_avg + 'Mbps'
              }],
              series: [{
                data: out_data
              }, {
                data: in_data
              }],
              xAxis: [{
                data: date
              }],
            });
          }, 1000)
        })



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
