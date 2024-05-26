<!--
*@canyin
*@author yuge
*@date 2023/7/12 14:49
-->
<template>
  <div class="canyin-main">
    <div ref="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getPreviousLastMonths } from '@/utils/gyy-utils'
import HomeApi from '@/api/home'

export default {
  name: "main-left-chart2",
  props: {},
  components: {},
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    this.initChart()
  },
  methods: {
    async initChart() {
      const {object} = await HomeApi.abnormalQuantityStatistics()
      // const gzData = [12.6, 25.9, 9.0, 62.4, 28.7, 70.7, 45.6, 82.2, 48.7, 18.8, 26.0, 22.3];
      // const bjData = [13.9, 15.9, 11.1, 18.27, 48.3, 69.2, 31.6, 46.6, 55.4, 28.4, 20.23, 10.7];
      // const XData = getPreviousLastMonths(12);
      const {gzData,bjData,XData}=object
      //获取当前时间的前1年所有月份

      for (let i = 0; i < bjData.length; i++) {
        XData.push();
      }
      const option = {
        title: {
          text: "异常情况总览",
          x: 'left',
          textStyle: {
            color:'#fff',
            fontSize: 14,
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor:'white',
          textStyle:{
            color:'#fff'
          },
          formatter: function(value) {
            const a0 = value[0] ? value[0].seriesName : '';
            const a1 = value[1] ? value[1].seriesName : '';
            const c0 = value[0] ? parseFloat(value[0].data) : '';
            const c1 = value[1] ? parseFloat(value[1].data) : '';
            let sum = c0 + c1;
            if(c0 != '' && c1 != ''){
              sum =sum.toFixed(2);//保留两位小数
            }
            const b = value[0] ? value[0].name : '';
            var atext='';
            var btext='';
            if(c0 != ''){
              atext='<span style="color: #BDBEC3">' + a0 + '&nbsp;&nbsp;&nbsp;</span><span style="font-size:20px;color: #0a080b"><strong>' + c0 + '</strong></span><span style="color: #0a080b">次&nbsp;&nbsp;&nbsp;</span><span style="color: red">2.85%</span><span class="test1" >&#9650<style>\n' +
                '.test1{color:red }\n' +
                '</style></span></br>';
            };
            if(c1 != ''){
              btext='<span style="color: #BDBEC3">' +a1+ '&nbsp;&nbsp;&nbsp;</span><span style="font-size:20px;color: #0a080b"><strong>' + c1 + '</strong></span><span style="color: #0a080b">次&nbsp;&nbsp;&nbsp;</span><span style="color: #00a854">2.85%</span><span class="test2" >&#9660<style>\n' +
                '.test2{color:green }\n' +
                '</style></span></br>';
            };
            return '<span style="color: #0a080b">全部&nbsp;&nbsp;&nbsp;<span style="font-size:20px;color: #0a080b"><strong>' + sum + '</strong></span><span style="color: #0a080b">次&nbsp;&nbsp;&nbsp;</span><span style="color: red">2.85%</span><span class="test" >&#9650<style>\n' +
              '.test{color:red }\n' +
              '</style></span></br>'
              + atext+ ' ' +btext +
              '<span style="color: #0a080b">' + b +'</span>';
          }

        },
        legend: {
          icon: 'roundRect',
          right: 10,
          textStyle: {
            color:'#fff',
            fontSize: 14,
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          name:'时间',
          type: 'category',
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "blue",
              opacity: 0.05,
            },
          },
          axisLabel:{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 14,
          },
          boundaryGap: false,
          data: XData
        }],
        yAxis: [{
          name:'(次)',
          type: 'value',
          splitLine:{
            show:true,
            lineStyle:{
              type:'dashed',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
            },
          },
          axisLabel:{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 14,
          },
        }],
        series: [{
          id:'y0',
          name: '故障',
          type: 'line',
          smooth: true,
          color: "orange",
          symbol:'circle',
          areaStyle: {
            opacity: 0.3,
            color: {
              type: "linear",
              x: 1,
              y: 0,
              y2: 1,
              colorStops: [{
                "offset": 0,
                "color": "orange" //0% 处的颜色
              },
                {
                  "offset": 1,
                  "color": "white" // 100% 处的颜色
                }
              ],
              "globalCoord": false // 缺省为 false
            }
          },
          data: gzData
        },
          {
            id:'y1',
            name: '报警',
            type: 'line',
            smooth: true,
            color: "red",
            // hoverAnimation:true,
            symbol:'circle',
            areaStyle: {
              opacity: 0.3,
              color: {
                type: "linear",
                x: 1,
                y: 0,
                y2: 1,
                colorStops: [{
                  "offset": 0,
                  "color": "red"
                },
                  {
                    "offset": 1,
                    "color": "white"
                  }
                ],
                "globalCoord": false
              }
            },
            data: bjData
          },
          {
            name: '报警',
            type: 'effectScatter',
            coordinateSystem: 'cartesian2d',
            data: bjData, //2d坐标系
            symbol:'circle',
            symbolSize: 10,
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            itemStyle: {
              normal: {
                color: 'red',
                borderColor:'white'
              }
            },
            zlevel: 1,
            tooltip: {
              trigger: 'item',
              backgroundColor:'white',
              textStyle:{
                color:'#000'
              },
              formatter:  '<span style="font-size:20px;color: #0a080b"><strong>{c0}</strong></span><span style="color: #0a080b">次&nbsp;&nbsp;&nbsp;</span><span style="color: green">2.85%</span><span class="test1" >&#9660<style>\n' +
                '.test1{color:green }\n' +
                '</style></span></br>' +
                '<span style="color: #0a080b">{b0}</span>'
            }
          },
          {
            name: '故障',
            type: 'effectScatter',
            coordinateSystem: 'cartesian2d',
            data: gzData, //2d坐标系
            symbolSize: 10,
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            itemStyle: {
              normal: {
                color: 'orange',
                borderColor:'white'
              }
            },
            tooltip: {
              trigger: 'item',
              backgroundColor:'white',
              textStyle:{
                color:'#000'
              },
              formatter:  '<span style="font-size:20px;color: #0a080b"><strong>{c0}</strong></span><span style="color: #0a080b">次&nbsp;&nbsp;&nbsp;</span><span style="color: red">2.85%</span><span class="test1" >&#9650<style>\n' +
                '.test1{color:red }\n' +
                '</style></span></br>' +
                '<span style="color: #0a080b">{b0}</span>'

            },
            zlevel: 1
          }
        ]
      };

      this.chart.setOption(option)
    }
  },
  destroyed() {

  }
}
</script>

<style scoped lang="scss">

div {
  height: 100%;
  width: 100%;
}
</style>
