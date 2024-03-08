<template>
  <div class="icon-number-view" :data-obj="dataObjT">
    <img class="icon-left-img" :src="iconMap[icon]" :data-obj="dataObjT" alt=""/>
    <div class="icon-right-info" :data-obj="dataObjT">
      <span class="iri_lable" :data-obj="dataObjT">{{ label }}</span>
      <div class="iri_number-view" :data-obj="dataObjT">
        <span class="iri_num" :data-obj="dataObjT">{{ value }}</span>
        <span class="iri_unit" :data-obj="dataObjT">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconNumber',
  props: {
    label: {
      type: String,
      default: '标题'
    },
    value: {
      type: Number | String,
      default: 0
    },
    //单位
    unit: {
      type: String,
      default: '个'
    },
    icon: {
      type: String,
      default: 'wkg'
    },
    dataObj: {
      type: [String,Object,Number],
      default: null
    }
  },
  data() {
    return {
      iconMap: {
        //未开工
        wkg: require('./img/wkg.png'),
        //已开工
        ykg: require('./img/ykg.png'),
        //完工
        wg: require('./img/wg.png'),
        //停工
        tg: require('./img/tg.png'),
        //竣工
        jg: require('./img/jg.png'),
        //人员实名制
        rysmz: require('./img/rysmz.png'),
        //接入摄像头
        jrsxj: require('./img/jrsxj.png'),
        //滞后
        zh: require('./img/zh.png'),
        //正常
        zc: require('./img/zc.png'),
        //提前
        tq: require('./img/tq.png'),
        //物联感知
        wlgz: require('./img/wlgz.png'),
        //人工巡检
        rgxj: require('./img/rgxj.png'),
        //超标项目
        cbxm: require('./img/cbxm.png'),
        //超标事件
        cbsj: require('./img/cbsj.png'),
        //峰值
        fz: require('./img/fz.png'),

        //2022年7月28日19:12:14 加入
        //人员聚集
        ryjj: require('./img/ryjj.png'),
        //人员越界攀爬
        ryyjpp: require('./img/ryyjpp.png'),
        //重点机械未授权
        zdjxwsq: require('./img/zdjxwsq.png'),
        //渣土车未加盖
        ztcwjg: require('./img/ztcwjg.png'),
        //危险区域闯入
        wxqycr: require('./img/wxqycr.png'),
        //物料乱堆放
        wlldf: require('./img/wlldf.png'),
        //车辆进出场异常
        cljccyc: require('./img/cljccyc.png'),
        //塔吊
        td: require('./img/td.png'),
        //升降机
        sjj: require('./img/sjj.png'),
        //深基坑
        sjk: require('./img/sjk.png'),
        //卸料平台
        xlpt: require('./img/xlpt.png'),
        //高支模
        gzm: require('./img/gzm.png'),
        //大体积混凝土
        dtjhnt: require('./img/dtjhnt.png'),
        //未戴安全帽
        wdaqm: require('./img/wdaqm.png'),

        //2022年9月8日20:06:04 加入
        //视频监控
        spjk:require('./img/spjk.png'),
        //扬尘监测
        ycjc:require('./img/ycjc.png'),
        //噪音监控
        zyjk:require('./img/zyjk.png'),
        //参与核酸项目
        cyhsxm:require('./img/cyhsxm.png'),
        //当前在场人数
        dqzcrs:require('./img/dqzcrs.png'),
        //未戴口罩
        wdkz:require('./img/wdkz.png'),
      }
    }
  },
  computed:{
    dataObjT(){
      let dataObj =this.dataObj
      if (typeof dataObj==='object'){
        dataObj=JSON.stringify(dataObj)
      }
      return dataObj
    }
  }

}
</script>

<style lang="scss" scoped>
.icon-number-view {
  width: fit-content;
  height: 58px;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;

  .icon-left-img {
    width: 46px;
    height: 58px;
    flex-shrink: 0;
  }

  .icon-right-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0 10px 8px;

    .iri_lable {
      font-size: 14px;
      color: #FFFFFF;
    }

    .iri_number-view {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      line-height: 1;

      .iri_num {
        font-family: TG-TYPE-Regular;
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: 1px;
      }

      .iri_unit {
        font-size: 12px;
        margin-left: 6px;
        color: #ebebeb;
      }
    }
  }
}
</style>

