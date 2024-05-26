<template>
  <div>
    <div ref="chart"></div>

    <abnormal-info-dialog v-model="isDialogShow" :entity="entity"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import resize from '@/mixins/resize-chart'
import RelationshipGraphService from '@/moke/service/RelationshipGraphService'
import NodeStatusEnum from '@/moke/entity/NodeStatusEnum'
import AbnormalInfoDialog from '@/components/RelationshipChart/components/AbnormalInfoDialog.vue'
import HomeApi from '@/api/home'

//https://www.makeapie.cn/echarts_content/xByJm_ypsl.html
export default {
  name: 'RelationshipChart',
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mixins: [resize],
  components: { AbnormalInfoDialog },
  computed:{
    ...mapGetters(['nodeList', 'edgeList'])
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart)
    this.renderChart()
  },
  data() {
    return {
      chart: null,
      isDialogShow:false,
      entity:{}
    }
  },
  watch:{
    nodeList(){
      this.renderChart()
    },
    edgeList(){
      this.renderChart()
    },
  },
  methods: {
    renderChart() {
      const echarts = this.$echarts
      const option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
          {
          offset: 0,
          color: '#007d9d'
        }, {
          offset: 0.5,
          color: '#000'
        }, {
          offset: 1,
          color: '#007d9d'
        }]),
        grid: {
          top: '10%',
          left: '0%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {},
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        animationDuration: 3000,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'AIoT运维原型系统关系图',
            type: 'graph',
            layout: 'force',
            //color: '#00ff0090',
            force: {
              //点位排斥 即稀疏度
              repulsion: 300
            },
            data: this.nodeList,

            links: this.edgeList,
            legendHoverLink : true,
            categories:NodeStatusEnum.getCategories().map(e=>({
              name:e.name,
              itemStyle: {
                normal: {
                  color: e.color
                }
              }
            })),
            draggable: true,
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: true,
                color: '#ffffff',
                fontSize: 16,
                position: 'top'
              }
            },
            lineStyle: {
              normal: {
                color: 'source',
                width: 4,
                curveness: 0,
                type: 'solid'
              }
            }
          }]
      }
      this.chart.setOption(option)
      this.initClickEvent()
    },

    initClickEvent(){
      this.chart.on('click', (params) => {
        const data=params.data
        console.log(data)
        //是否是node
        if (data&&data.id&&data.category==='异常'){
          this.isDialogShow=true
          this.entity=data
        }
      })
    },
    destroy() {
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  height: 100%;
  width: 100%;
}
</style>
