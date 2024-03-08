<!--
*@PopUpButton
*@author GYY
*@date 2022/10/20 13:50
-->
<template>
  <div class="PopUpButton-main" @mouseenter="isShowCell=true" @mouseleave="isShowCell=false">
    <div class="main-default" @click="popUpButtonClick({},-1)">
      <img alt="" :src="selected>=0?defaultIcon.iconSelected:defaultIcon.icon"/>
    </div>
    <transition name="el-zoom-in-bottom">
      <div class="pup-up-main" v-show="isShowCell">
        <img alt="" v-for="(item,index) in dataList" @click="popUpButtonClick(item,index)"
             :src="selected===index?item.iconSelected:item.icon" :key="index"
        />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PopUpButton',
  props: {
    dataList: {
      type: Array,
      default: () => {
        //从上到下
        return [
          {
            icon: require('./img/pm25.png'),
            iconSelected: require('./img/pm25-selected.png'),
            indexType: 0
          },
          {
            icon: require('./img/pm10.png'),
            iconSelected: require('./img/pm10-selected.png'),
            indexType: 37
          },
          {
            icon: require('./img/noise.png'),
            iconSelected: require('./img/noise-selected.png'),
            indexType: 2
          }
        ]
      }
    },
    defaultIcon: {
      type: Object,
      default: () => {
        return {
          icon: require('./img/default.png'),
          iconSelected: require('./img/default-selected.png')
        }
      }
    },
    selectedIndex: { type: Number, default: -1 }
  },
  components: {},
  mounted() {
    this.selected = this.selectedIndex
  },
  data() {
    return {
      selected: -1,
      isShowCell: false
    }
  },
  methods: {
    popUpButtonClick(item, index) {
      this.isShowCell = false
      this.selected = index
      //-1 时候使用
      item.gyyIndex = index
      this.$emit('popUpButtonClick', item)
    }
  }
}
</script>

<style lang="scss" scoped>
$--pop-up-bg: rgba(10, 35, 38, 0.5);

.PopUpButton-main {
  width: 64px;
  height: 64px;
  cursor: pointer;
  padding-top: 8px;

  img {
    width: 48px;
    height: 48px;
    margin: 8px;
  }

  .main-default {
    width: 64px;
    height: 64px;
    background: $--pop-up-bg;
    box-shadow: 0 0 4px 0 $--pop-up-bg;
    border-radius: 36px;

  }

  .pup-up-main {
    position: absolute;
    bottom: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 64px;
    height: 208px;
    background: $--pop-up-bg;
    box-shadow: 0 0 4px 0 $--pop-up-bg;
    border-radius: 36px;
  }
}
</style>
