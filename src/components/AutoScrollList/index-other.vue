<!--
*@AutoScrollList
*@author GYY
*@date 2022/7/20 11:22
-->
<template>
  <vue-j-scroll ref="scrollMain" class="auto-scroll-list-main" @click.native="autoScrollClick($event)"
                :key="keyValue" :data="listData" :steep="speed" scrollDirection="top"
                :isRoller="true" :rollerScrollDistance="30"
                v-loading="isLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <slot/>
  </vue-j-scroll>
</template>

<script>
import LOG from '@/utils/self-log'

export default {
  name: 'AutoScrollList',
  props: {
    listData: { type: Array },
    isPause: { type: Boolean, default: false },
    isLazy: { type: Boolean, default: false },
    keyValue: { type: [String, Number], default: '' }
  },
  mounted() {
    // 如果列表数据是异步获取的，记得初始化在获取数据后再调用
    //this.initScroll()
  },
  data() {
    return {
      speed: 0.3, //滚动的速度
      isLoading: false
    }
  },
  watch: {
    isPause(newValue, _) {
      if (newValue) {
        this.$refs.scrollMain.stop()
      } else {
        this.$refs.scrollMain.start()
      }
    },
    listData: {
      deep: true,
      immediate: false,
      handler(newValue, _) {
        this.$refs.scrollMain.stop()
        // this.$refs.scrollMain.start()
      }
    },
  },
  methods: {
    autoScrollClick(e) {
      let index = e.target.dataset.index
      if (!index) {
        return
      }
      //默认是number 自己改
      this.$emit('autoScrollClick', Number(index))
    }
  },
  destroyed() {
    // this.mEnter()
  }
}
</script>

<style lang="scss" scoped>
.auto-scroll-list-main {
  overflow: hidden;
  height: 100%;
  //内容元素必须添加这个
  //font-size: 14px !important;
}

//.auto-scroll-list-main::-webkit-scrollbar {
//  display: none
//}
</style>
