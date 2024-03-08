<template>
  <div class="all-main">
    <div ref="tranceObjChart" class="all-main"></div>
    <div>
      <m-horizontal-tab class="options-main" :tab-value="tabValue" default="0" @changeTab="changeTab"/>
    </div>
  </div>
</template>

<script>
import resize from '@/mixins/resize-chart'
import * as echarts from 'echarts'
import MHorizontalTab from '@/components/MHorizontalTab/index.vue'

export default {
  name: 'RootPointChart',
  props: {
    list:{  type: Array,},
    showData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mixins: [resize],
  components: { MHorizontalTab },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.tranceObjChart)
    this.changeTab({value: '1' })
  },
  data() {
    return {
      chart: null,
      option: 'FP-growth排名染色',
      tabValue: [
        { title: '挖掘可疑节点', value: '1' },
        { title: '计算可疑得分', value: '2' },
        { title: 'FP-growth排名染色', value: '3' }
      ]
    }
  },
  watch: {
    showData(newV, _) {
      this.changeTab({value: '3' })
    }
  },
  methods: {
    changeTab(e){
      let points = [
        //0
        {
          name: 'master-node-1',
          symbolSize: 80,
          category: 2,

        },
        {
          name: 'worker-node-3',
          symbolSize: 80,
          category: 2
        },
        {
          name: 'GA61510031',
          symbolSize: 80,
          category: 0
        },
        {
          name: 'GA61510032',
          symbolSize: 80,
          category: 0
        },
        {
          name: 'GA61511',
          symbolSize: 80,
          category: 0
        },
        //2
        {
          name: 'worker-node-4',
          symbolSize: 80,
          category: 1
        },
        {
          name: 'GA61510041',
          symbolSize: 80,
          category: 1
        },
        {
          name: 'GA61510042',
          symbolSize: 80,
          category: 1
        },
        {
          name: 'GA61510033',
          symbolSize: 80,
          category: 1
        },
        //3
        {
          name: 'other1',
          symbolSize: 80,
          category: 2
        },
        {
          name: 'other2',
          symbolSize: 80,
          category: 2
        }
      ]
      let links = [
        {
          source: 'GA61510033',
          target: 'worker-node-3'
        },
        {
          source: 'GA61510031',
          target: 'worker-node-3'
        },
        {
          source: 'GA61510032',
          target: 'worker-node-3'
        },
        {
          source: 'worker-node-3',
          target: 'master-node-1'
        },
        {
          source: 'master-node-1',
          target: 'other1'
        },
        {
          source: 'master-node-1',
          target: 'other2'
        },
        {
          source: 'GA61510041',
          target: 'worker-node-4'
        },
        {
          source: 'GA61510042',
          target: 'worker-node-4'
        },
        {
          source: 'worker-node-4',
          target: 'master-node-1'
        },
        {
          source: 'GA61511',
          target: 'master-node-1'
        }
      ]
      const v=e.value

      let color=['#ff0000', '#ffb800', '#00da00']

      switch (v) {
        case '1':
          color[1]='#d2cfcf'
          color[2]='#d2cfcf'
          break
        case '2':
          color[1]='#d2cfcf'
          color[2]='#d2cfcf'
          console.log(this.list)
          points.forEach(e=>{
            const cell=this.list.find(v=>e.name===v.value2)||{}
            cell.progress=cell.progress||0
            e.name+=`（${cell.progress.toFixed(2)} %）`
          })
          break
      }
      console.log(points)
      this.renderChart(points,links,color)

    },
    renderChart(points,links,color) {
      const option = {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        color,
        legend:{
          bottom:20,
          right:20,
          textStyle: {
            color: 'rgba(255,255,255,0.8)',
            fontSize:14,
          }
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 1500,
              edgeLength: 30
            },
            roam: true,
            label: {
              normal: {
                show: true
              },
            },
            data: points,
            links: links,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 5,
                curveness: 0
              }
            },
            categories: [{ name: '异常' }, { name: '影响' }, { name: '正常' }]
          }
        ]
      }

      this.chart.setOption(option)
    }

  }
}
</script>

<style lang="scss" scoped>
.all-main {
  width: 100%;
  height: 100%;
  position: relative;

  .options-main {
    position: absolute;
    top: 2%;
    right: 2%;
    width: 400px;
    height: 40px;
    border-radius: 52px !important;
  }
}
</style>
