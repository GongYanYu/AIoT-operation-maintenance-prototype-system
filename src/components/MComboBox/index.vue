<!--
*@MComboBox
*@author GYY
*@date 2022/10/17 13:34
-->
<template>
  <div class="MComboBox-main" @click="isPopUpSelect=!isPopUpSelect">
    <div>{{ showTitle }}</div>
    <img src="./img/arrow-down.png" alt=""/>
    <transition name="el-zoom-in-top">
      <div class="pop-up-main" v-show="isPopUpSelect">
        <div class="flat" v-for="(item,index) in popUpList" :key="index"
             :class="{'flat-selected':popUpSelected===index}" @click="popUpClick(index)"
        >
          <div class="text">{{ item.name }} <span v-if="item.value!=null">({{ item.value }})</span></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MComboBox',
  props: {
    title: { type: String, default: null },
    //严格格式！
    popUpList: {
      type: Array, default: () => {
        return [
          { name: 'test', value: null, type: null },
          { name: 'test', value: null, type: null },
          { name: 'test', value: null, type: null }
        ]
      }
    },
    //0~  -1代表无默认选择
    selected: { type: Number, default: 0 },
  },
  components: {},
  mounted() {
    this.popUpSelected=this.selected
    this.showTitle=this.title
    this.changeTitle(this.selected)
  },
  data() {
    return {
      isPopUpSelect:false,
      popUpSelected:0,
      showTitle:null
    }
  },
  methods: {
    popUpClick(index) {
      this.popUpSelected=index
      const data=this.popUpList[index]
      this.changeTitle(index)
      this.$emit('popUpClick', data)
    },
    changeTitle(index){
      if (this.title==null&&index>=0){
        const data=this.popUpList[index]
        this.showTitle=data.name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$--img-size: 8px;

.MComboBox-main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $--color-btn-bg;
  border-radius: 50px;
  cursor: pointer;

  img {
    width: $--img-size;
    height: $--img-size;
    margin-left: 4px;
  }


  .pop-up-main {
    z-index: 5000;
    position: absolute;
    left: -1%;
    top: 100%;
    margin: 4px 0;

    font-size: 14px;
    width: 100%;
    height: auto;
    background: $--color-extra;
    border-radius: 20px;
    border: 1px solid #C7FEFB;

    .flat {
      padding: 5px;
      width: 98%;
      height: 100%;
      border-radius: 16px;
      border: 1px solid transparent;
      cursor: pointer;

      .text {
        text-align: center;
      }
    }

    .flat-selected {
      border: 1px solid #C7FEFB;
      background: linear-gradient(360deg, #008CC650 0%, #2AF4DA50 100%);
    }
  }
}
</style>
