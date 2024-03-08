<template>
  <div>
    <el-dialog :title="warningObj.warning_name" :visible.sync="isVisible" custom-class="customClass"
               :modal-append-to-body="true" :append-to-body="true" :modal="false"
    >
      <div class="poi-wa-main">
        <el-row>
          <m-horizontal-tab @changeTab="changeTab" class="poi-wa-tab"
                            :tab-value="[
                          { title: '预警内容', value: 0 }
                          ,{ title: '预警处置', value: 1},]"
          />
        </el-row>
        <el-row>
          <div class="poi-wa-hr"/>
        </el-row>
        <el-row v-if="showTab===0" style="margin-top: 20px;" :style="{height:heightLeft+'px'}">
          <el-col style="width:50%" v-if="showWhat===0||showWhat===1">
            <div class="pm25-main" v-if="showWhat===0">
              <div class="cell1">
                <div class="text">预警值</div>
              </div>
              <div class="cell2">
                <div class="text1">
                  <div class="left">{{ warningObj.waring_value }}</div>
                  <div class="right">{{ unitValue }}</div>
                </div>
                <div class="text2">
                  <img src="@/assets/main/up.png" alt=""/>
                  <div class="t1">{{
                      ((Number(warningObj.waring_value) / standardValue) * 100 - 100).toFixed(0)
                    }}%
                  </div>
                  <div class="t2">标准值 {{ standardValue + unitValue }}</div>
                </div>
              </div>
            </div>
            <el-image class="poi-img" v-if="showWhat===1" :src="warningObj.img_path"
                      :preview-src-list="[warningObj.img_path]" alt=""
            />
          </el-col>
          <el-col class="poi-wa-right-main" :style="{width:showWhat===2?'100%':'50%'
          ,flexDirection:showWhat===2?'row':'column'}"
          >
            <el-row class="poi-wa-right" :style="{width:showWhat===2?'49%':'100%'}">
              <span class="poi-wa-text">预警项目：</span>
              <omit-tooltip :show-length="16" class="text" :text="warningObj.project_name"/>
            </el-row>
            <el-row class="poi-wa-right" :style="{width:showWhat===2?'49%':'100%'}">
              <span class="poi-wa-text">预警点位：</span>
              <omit-tooltip :show-length="16" class="text"
                            :text="warningObj.warning_address?warningObj.warning_address:warningObj.project_name"
              />
              <!--              <span class="poi-wa-btn">查看</span>-->
            </el-row>
            <el-row class="poi-wa-right" :style="{width:showWhat===2?'49%':'100%'}">
              <span class="poi-wa-text">预警等级：</span>
              <span class="poi-wa-text-main"
                    :style="{backgroundColor:warningColorList[parseInt(warningObj.warning_level)]}"
              > {{ formatWL(warningObj.warning_level).toUpperCase() }}级</span>
            </el-row>
            <el-row class="poi-wa-right" :style="{width:showWhat===2?'49%':'100%'}">
              <span class="poi-wa-text">预警时间：</span> {{ warningObj.warning_time|formatTime }}
            </el-row>
            <el-row class="poi-wa-right" :style="{width:showWhat===2?'49%':'100%'}">
              <span class="poi-wa-text">预警状态：</span>
              <span :style="{color:colorList[warningObj.warning_processstate]}"
                    class="poi-wa-status"
              >
                  {{ warningObj.warning_processstate|format_warning_process_state }}
                </span>
            </el-row>
            <el-row class="poi-content" style="width: 100%">
              <span class="poi-wa-text">预警描述：</span> {{ warningObj.warning_content }}
            </el-row>
          </el-col>
        </el-row>

        <el-row v-else class="poi-wa-right-content">
          <div class="poi-wa-timeline">
            <flat-timeline title="上报" v-if="warningProcessList.length >=1"
                           :timestamp="warningProcessList[0].create_time|formatTime"
            >
              <div class="content">
                <div class="title">
                  <div class="title-l">问题描述：{{ warningProcessList[0].opinion }}</div>
                  <!--                  <div class="title-r">-->
                  <!--                    <div class="title-r-main">{{ warningObj.warning_name }}</div>-->
                  <!--                  </div>-->
                </div>
                <div class="subtitle">上报人：{{ warningProcessList[0].user_name }}
                  <span class="wa-name"> {{ warningObj.warning_name }}</span>
                </div>
              </div>
            </flat-timeline>
            <flat-timeline title="下发" v-if="warningProcessList.length >=2"
                           :timestamp="warningProcessList[1].handle_time|formatTime"
            >
              <div class="content">
                <div class="title" style="justify-content: flex-start;">
                  <div>下发意见：{{ warningProcessList[1].opinion }}</div>
                </div>
                <div class="subtitle">下发人：{{ warningProcessList[1].user_name }}</div>
              </div>
            </flat-timeline>
            <flat-timeline title="处理措施" v-if="warningProcessList.length >=3"
                           :timestamp="warningProcessList[2].handle_time|formatTime"
            >
              <div class="content">
                <div class="title">处理措施：{{ warningProcessList[2].opinion }}</div>
                <div class="subtitle">处理人：{{ warningProcessList[2].user_name }}</div>
              </div>
            </flat-timeline>
            <flat-timeline title="审核" v-if="warningProcessList.length >=4"
                           :timestamp="warningProcessList[3].handle_time|formatTime"
            >
              <div class="content">
                <div class="title">审核意见：{{ warningProcessList[3].opinion }}</div>
                <div class="subtitle">审核人：{{ warningProcessList[3].user_name }}</div>
              </div>
            </flat-timeline>

<!--            <div class="urge-main" v-if="warningObj.warning_processstate!=='1'">-->
<!--              <div class="btn">催一下</div>-->
<!--            </div>-->

            <flat-timeline title="完成" position="end"
                           v-if="warningObj.warning_processstate==='1'"
                           :timestamp="warningProcessList[3].handle_time|formatTime"
            >
              <div class="content">
                <div class="title">已完成</div>
                <div class="subtitle"></div>
              </div>
            </flat-timeline>
          </div>
        </el-row>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import MHorizontalTab from '@/components/MHorizontalTab'
import CrossSign from '@/components/CrossSign'
import FlatTimeline from '@/components/FlatTimeline'
import visible from '@/mixins/edit-dialog'
import styles from '@/styles/global.scss'
import MainApi from '@/api/main'
import { getAbcColor } from '@/styles'
import { StandardValue } from '@/api/standard-value'
import { removePOICovering } from '@/utils/51world/CoveringOption'
import { POIDistinguishIdTypePreFix } from '@/utils/51world/CustomPOI'
import OmitTooltip from '@/components/OmitTooltip'
import LOG from '@/utils/self-log'

export default {
  name: 'QuestionWarningDialog',
  components: { OmitTooltip, FlatTimeline, CrossSign, MHorizontalTab },
  mixins: [visible],
  data() {
    return {
      showTab: 0,
      colorList: [],
      // c:0 b:1 a:2
      warningColorList: getAbcColor(),
      warningObj: {},
      warningProcessList: [],
      // 0pm   1 img  2 notimg
      showWhat: 2,
      heightLeft: 220,
      //pm 使用
      standardValue: 1,
      unitValue: ''
    }
  },
  created() {
    this.colorList = [styles.colorStress, styles.colorSuccess, styles.colorWarning, styles.colorDanger]
  },
  props: {
    entity: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    entity(newV, _) {
      if (this.isVisible) {
        this.showTab = 0
        this.doSearch()
      }
    },
    isVisible(newV, _) {
      if (!newV) {
        removePOICovering(this.$cloudRender, POIDistinguishIdTypePreFix.question + this.entity.id, null)
      }else {
        this.doSearch()
      }
    }
  },
  methods: {
    changeTab(item) {
      this.showTab = item.value
    },
    doSearch() {
      this.listLoading = true
      let params = this.entity

      MainApi.wlwtList({
        warningId: params.id,
        pageStart: 0, pageSize: 1
      }).then(res => {
        if (res.success) {
          this.warningObj = res.data[0]
          this.changeView()
          //预警列表
          MainApi.yjlcList({
            warningId: params.id
          }).then(res => {
            if (res.success) {
              let dataList = res.data
              dataList.sort((a,b)=>{
                return a.create_time>b.create_time?1:-1
              })
              LOG.info(['ddd',dataList])
              dataList.unshift({
                  opinion: this.warningObj.warning_content,
                  user_name: '系统自动触发产生预警',
                  create_time: this.warningObj.warning_time
                }
              )
              this.warningProcessList = dataList
            }
          })
        }
      })
    },
    changeView() {
      const e = this.warningObj
      const type = Number(e.index_type)
      //0PM2.5 37PM10 2噪音 39用水量 41用电量
      if (e.warnig_type === '3' && (type === 0 || type === 37 || type === 2)) {
        this.showWhat = 0
        this.heightLeft=220
        switch (type) {
          case 0:
            //设置标准值
            this.standardValue = StandardValue['PM2.5']
            this.unitValue = 'µg/m³'
            break
          case 37:
            //设置标准值
            this.standardValue = StandardValue.PM10
            this.unitValue = 'µg/m³'
            break
          case 2:
            //设置标准值
            this.standardValue = StandardValue.noise
            this.unitValue = 'db'
            break
        }
      } else if (this.warningObj.img_path != null && this.warningObj.warnig_type !== '2') {
        this.showWhat = 1
        this.heightLeft=220
      } else {
        this.showWhat = 2
        //无图片
        this.heightLeft=150
      }
    },
    formatWL(val) {
      switch (val) {
        case 0:
          return 'c'
        case 1:
          return 'b'
        case 2:
          return 'a'
        default:
          return 'c'
      }
    }
  },
  filters: {}
}
</script>
<style lang="scss" scoped>

.poi-wa-timeline {
  height: 100%;

  .content {
    margin: 1% 0 1% 16px;
    display: flex;
    flex-direction: column;

    .title {
      flex: 1;
      font-size: 16px;
      color: #FFFFFF;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;


      .title-l {
        flex: 5;
      }

      .title-r {
        padding: 2%;
        border-radius: 24px 0 0 24px;
        background: $--color-primary;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title-r-main {
          text-align: center;
          font-size: 14px;
          letter-spacing: 0;
          font-weight: 500;
        }
      }
    }

    .subtitle {
      flex: 1;
      font-size: 12px;
      color: rgba(255, 255, 255, .8);
      font-weight: 400;

      .wa-name {
        padding: 3px;
        border-radius: 4px;
        background-color: $--color-extra;
      }
    }
  }
}

.poi-wa-main {
  width: 100%;
  height: min-content;
  font-size: 14px;
  color: white;
  line-height: 18px;

  .poi-img {
    height: 220px;
    width: 95%;
  }

  .poi-wa-right-content {
    margin-top: 10px;
    overflow: auto;
    height: 340px;

    .urge-main {
      margin: 0 0 0 112px;

      .btn {
        width: 74px;
        height: 24px;
        background-image: $--color-btn-bg;
        border: 1px solid $--color-success;
        border-radius: 12px;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        font-weight: 500;
        cursor: pointer;
        @include centerVertical
      }
    }
  }
}

.poi-wa-head {
  width: 198px;
  height: 30px;
  font-size: 22px;
  color: $--color-stress;
  text-align: left;
  font-weight: 500;
}

.poi-wa-tab {
  width: 30%;
  height: 24px;
  margin-top: 16px;
  margin-bottom: 16px;
}

.poi-wa-hr {
  width: 100%;
  height: 1px;
  opacity: 0.3;
  transform: scaleY(-1);
  background: #FFFFFF;
  border-radius: 4px;
}

.poi-wa-right-main-change {
  width: 100% !important;
}

.poi-wa-right-main {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.pm25-main {
  display: flex;
  flex-direction: column;
  height: 240px;
  width: 90%;

  .cell1 {
    flex: 2;
    height: 80px;
    background: --color-bg(.5);
    border-radius: 4px;
    font-size: 32px;

    .text {
      margin: 36px 0 0 32px;
    }
  }

  .cell2 {
    flex: 3.5;
    background: --color-bg(.2);
    border-radius: 0 0 4px 4px;

    padding: 25px 0 0 32px;

    .text1 {
      display: flex;
      align-items: flex-end;
      height: 65px;

      .left {
        font-size: 48px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 65px;
      }

      .right {
        width: 62px;
        font-size: 20px;
        margin-bottom: 20px;
      }
    }

    .text2 {
      display: flex;
      align-items: flex-end;
      height: 35px;

      img {
        width: 14.47px;
        height: 16px;
      }

      .t1 {
        color: $--color-danger;
        font-size: 20px;
      }

      .t2 {
        margin-left: 20px;
      }
    }
  }
}

.poi-wa-right {
  height: 36px;
  display: flex;
  justify-content: start;
  text-align: left;
}

.poi-content {
  height: 16px;
  line-height: 20px;
}

.poi-wa-text {
  width: 70px;
  opacity: 0.8;
  font-size: 14px;
  line-height: 15px;
  color: #FFFFFF;
  display: inline-block;
  padding-top: 1px;
}
.text{
  width: 75%;
}

.poi-wa-text-main {
  height: 20px;
  padding: 2px 4px 2px 4px;
  border-radius: 5px;
}

.poi-wa-status {
  height: 20px;
  border: 1px solid;
  border-radius: 9px;
  padding: 0 3px 0 3px;
}

.poi-wa-btn {
  background-image: $--color-poi-wa-btn;
  border: 1px solid $--color-success;
  border-radius: 10px;
  padding: 0 5px 0 5px;
  cursor: pointer;
}
</style>
<style scoped lang="scss">
/*
这个是 el-dialog
*/
::v-deep .customClass {
  line-height: 10px;
  padding: 0;
  border: 1px solid white;
  width: 690px;
  background: $--color-dialog-bg;
  border: 1px solid $--color-main;
  border-radius: 16px;
}

::v-deep .el-dialog__title, .el-dialog__header {
  font-size: 22px;
  color: $--color-stress;
  text-align: left;
  font-weight: 600;
  line-height: 20px;
}

::v-deep .el-dialog__body {
  padding-top: 0;
}

/*图标颜色*/
::v-deep .el-dialog__close {
  color: white;
}
</style>
