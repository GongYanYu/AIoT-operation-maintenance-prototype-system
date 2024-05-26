<!--
*@index
*@author yuge
*@date 2024/1/26 12:10
-->
<template>
  <div class="notify-setting-main"
       v-loading="isChange"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="item-main" v-for="(item,index) in notifyList" :key="item.name">
      <div class="left">
        <img src="./img/notify.svg" alt="">
        <div>
          <div class="title">{{item.name}}</div>
          <div class="status">状态：{{item.checked?'正常':'关闭'}}</div>
        </div>
      </div>
      <div class="right">
        <el-switch size="large" v-model="item.checked" active-color="#49C04B" inactive-color="#00000050"
        @change="changeSwitch(item)">
        </el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import StatusApi from '@/api/status'

export default {
  name: 'NotifySetting',
  props: {
  },
  components: {},
  data() {
    return {
      notifyList:[
        {name:'微信', checked:true},
        {name:'邮箱', checked:true},
        {name:'短信', checked:true},
        {name:'企业微信' ,checked:true},
      ],
      isChange:false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      StatusApi.getStatus({group:'notify'})
        .then(res=>{
          this.notifyList=res.root.map(item=>({
            name:item.key,
            id:item.id,
            checked:item.value==1
          }))
        })
    },
    changeSwitch( item){
      this.isChange=true
      StatusApi.updateStatus({
        id:item.id,
        value:item.checked?1:0
      }).then(res=>{
        this.isChange=false
      })
    }
  },
  destroyed() {
  }
}
</script>

<style scoped lang="scss">
.notify-setting-main {
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .item-main{
    display: flex;
    margin-top: 16px;
    background: rgba(0, 0, 0, 0.20);
    border-radius: 8px;
    padding: 16px 32px;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      img{
        margin-right: 4px;
      }
      .title{
        font-weight: bold;
      }
      .status{
        color: #ffffff90;
        line-height: 24px;
      }
    }
    .right{

    }
  }
}
</style>
