<!--
*@canyin
*@author yuge
*@date 2023/7/12 14:49
-->
<template>
  <div class="canyin-main">
    <div ref="rightChartTrand"></div>
  </div>
</template>

<script>
import UnitNumber from "@/components/UnitNumber.vue";
import SpotLabel from "@/components/SpotLabel.vue";
import * as echarts from 'echarts'
import AutoScrollTable from '@/components/auto-scroll-table.vue'

export default {
  name: "main-left-chart1",
  props: {},
  components: { AutoScrollTable, SpotLabel, UnitNumber},
  data() {
    return {
      baseDataT: {
        t1: 24, t2: 4, t3: 5, t4: 0, t5: 0,
      },
      tableHeads: [
        {props: 'tableIndex', name: '序号'},
        {props: 'name', name: '餐饮名称'},
        {props: 'address', name: '地址'},
        {props: 'fzr', name: '负责人'},
        {props: 'region', name: '区域'},
      ],
      tableData: [
        {name: '川味坊', address: '海市崇明区东平镇前哨农场前哨公路40弄2号', fzr: '王淑月', region: '厨房'},
        {name: '食悦阁', address: '上海市崇明区林风公路325号', fzr: '郭冰玉', region: '大厅'},
        {name: '湘菜馆', address: '上海市松江区松江人民北路与云清路交叉口1号', fzr: '洪振霞', region: '洗手间'},
        {name: '望湘园', address: '上海市黄浦区绍兴路与陕西南路交叉路口', fzr: '李子玲', region: '店门'},
        {name: '周小厨餐饮店', address: '上海市松江区松江人民北路与云清路交叉口1号', fzr: '林婉婷', region: '橱窗'},
      ]
    }
  },
  mounted() {
    this.rightChartTrand()
  },
  methods: {
    rightChartTrand(chartData) {
      const myChart = echarts.init(this.$refs.rightChartTrand)

      const option = {
        grid: {
          left: 20,
          top:15,
          bottom: 20,
          right: 20,
          // containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer:{
            lineStyle:'line'
          },
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            show: true
          },
          splitArea: {
            // show: true,
            color: '#f00',
            lineStyle: {
              color: '#f00'
            },
          },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: ['2018', '2019', '2020', '2021', '2022', '2023'],

        }],

        yAxis: [{
          type: 'value',
          min: 0,
          // max: 140,
          splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            margin: 20,
            textStyle: {
              color: '#d1e6eb',

            },
          },
          axisTick: {
            show: false,
          },
        }],
        series: [
          {
            name: '',
            type: 'line',
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: "#00ca95",
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#00ca95',
              }
            },

            itemStyle: {
              color: "#00ca95",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,202,149,0.3)'
                },
                  {
                    offset: 1,
                    color: 'rgba(0,202,149,0)'
                  }
                ], false),
                shadowColor: 'rgba(0,202,149, 0.9)',
                shadowBlur: 20
              }
            },
            data: [5, 4, 6, 7, 8, 9],
          },
        ]
      };

      myChart.setOption(option);
    },
    rightChartGender(chartData) {
      const myChart = echarts.init(this.$refs.rightChartGender)
      const dataList = [
        {"name": "前进居委", "value": 9},
        {"name": "东风居委", "value": 12},
        {"name": "前哨居委", "value": 13},
        {"name": "风伟居委", "value": 10},
        {"name": "长江居委", "value": 11},
        {"name": "桂林居委", "value": 15}
      ];
      const data = dataList.map(e=>e.value),xAxis=dataList.map(e=>e.name)

      const option = {
        grid: {
          left:10,
          top:0,
          bottom:0,
          right:10,
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          data: xAxis,
          axisLine: {
            lineStyle: {
              color: '#0177d4'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 9,
            rotate:45
          }
        },
        yAxis: {
          name: "（家）",
          nameTextStyle: {
            color: '#fff',
            fontSize: 10
          },
          axisLine: {
            lineStyle: {
              color: '#0177d4',
              fontSize: 10
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 14
          },
          splitLine: {
            show:false,
            lineStyle: {
              color: '#0177d4'
            }
          },
        },
        series: [{
          type: 'bar',
          barWidth: 10,
          itemStyle:{
            normal:{
              color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00b0ff'
              }, {
                offset: 0.8,
                color: '#7052f4'
              }], false)
            }
          },
          data
        }]
      };

      myChart.setOption(option);
    },
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
