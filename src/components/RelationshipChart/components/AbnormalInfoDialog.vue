<template>
  <el-dialog v-if="!!entity" :title="entity.name+'异常详情'" :append-to-body="true" top="8vh"
             :visible.sync="isVisible" custom-class="customClass" :modal-append-to-body="false" :modal="true">
    <abnormal-prediction :entity="entity" v-if="showPredict==='predict'"/>
    <root-cause-localization :entity="entity" v-else/>
  </el-dialog>
</template>

<script>
import visible from '@/mixins/edit-dialog'
import RootCauseLocalization from './RootCauseLocalization.vue'
import AbnormalPrediction from '@/components/RelationshipChart/components/AbnormalPrediction.vue'

export default {
  name: 'AbnormalInfoDialog',
  components: { AbnormalPrediction, RootCauseLocalization },
  mixins: [visible],
  props: {
    entity: {
      type: Object,
      default: () => {
        return { title: '未定义'}
      }
    }
  },
  computed:{
    showPredict(){
      console.log(this.entity)
      return !!this.entity.bigNodeId? 'AIoT':'predict'
    }
  },
  data() {
    return{
      //isVisible:true,
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">

.container{
  height: 100%;
  $upper-height: 200px;
  color: white;
  .upper{
    height: $upper-height;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: $--main-board-background;
    border-radius: 8px;
    padding: 16px;

  }
  .lower{
    width: 100%;
    height: calc(100% - $upper-height);
    background: $--main-board-background;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;

    .top10-hr {
      height: 1px;
      background: #FFFFFF;
      opacity: 0.09;
      margin: 10px 0 12px 0;
    }

    .scroll-top10list {
      height: 85%;

      .list-cell {
        margin-top: 20px;
      }
    }
  }
}

/*
这个是 el-dialog
*/
::v-deep .customClass {
  line-height: 10px;
  padding: 0;
  border: 1px solid white;
  width: 1280px; /*no*/
  height: fit-content; /*no*/
  background: $--color-dialog-bg;
  border: 1px solid $--color-main;
  border-radius: 16px;

  z-index: 9999 !important;
}

::v-deep .el-dialog__title, .el-dialog__header {
  font-size: 22px;
  color: $--color-stress;
  text-align: left;
  font-weight: 600;
  line-height: 20px;
}

::v-deep .el-dialog__body {
  height: calc(100% - 50px);
  padding-top: 0;
}

/*图标颜色*/
::v-deep .el-dialog__close {
  color: white;
}
</style>
