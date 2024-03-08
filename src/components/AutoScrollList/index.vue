<!--
*@AutoScrollList
*@author GYY
*@date 2022/7/20 11:22
-->
<template>
  <div ref="scrollMain" class="auto-scroll-list-main" @click="autoScrollClick($event)"
       :key="keyValue" @mouseenter="mEnter" @mouseleave="mLeave"
       v-loading="isLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div ref="scrollItemBox" class="seamless-warp-box">
      <slot/>
    </div>
    <!--      <div v-html="copyHtml" class="seamless-warp-box"></div>-->
  </div>
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
      scrollTop: 0, //列表滚动高度   =0时表示回归高度
      speed: 70, //滚动的速度
      copyHtml: null,
      scrollInterval: null,
      isLoading: false
    }
  },
  watch: {
    isPause(newValue, _) {
      if (newValue) {
        this.mEnter()
      } else {
        this.mLeave()
      }
    },
    listData: {
      deep: true,
      immediate: false,
      handler(newValue, _) {
        //刷新高度为0
        this.scrollTop = 0
        this.mEnter()
        this.initScroll()
      }
    },
    //刷新高度为0
    keyValue(newV, _) {
      this.scrollTop = 0
    }
  },
  methods: {
    // 判断是否有滚动条
    isHasScrolled(element, direction) {
      if (direction === 'vertical') {
        return element.scrollHeight > element.clientHeight
      } else if (direction === 'horizontal') {
        return element.scrollWidth > element.clientWidth
      }
      return false
    },
    initScroll() {
      this.$nextTick(() => {
        // this.copyHtml = this.$refs.scrollItemBox.innerHTML
        this.startScroll()
      })
    },
    // 鼠标移入停止滚动
    mEnter() {
      if (this.scrollInterval) {
        clearInterval(this.scrollInterval)
        this.scrollInterval = null
      }
    },
    // 鼠标移出继续滚动
    mLeave() {
      this.startScroll()
    },
    // 开始滚动
    startScroll() {
      if (this.scrollInterval || !this.$refs.scrollMain) {
        return
      }
      if (this.isHasScrolled(this.$refs.scrollMain, 'vertical')) {
        if (this.scrollTop !== 0) {
          //在当前位置开始滚动
          this.scrollTop = this.$refs.scrollMain.scrollTop
        }
        this.scrollInterval = setInterval(this.scroll, this.speed)
      } else {
        LOG.info(['this list don\'t need to scroll!'])
      }
    },
    // 滚动处理方法
    scroll() {
      this.scrollTop = this.scrollTop + 1
      this.$refs.scrollMain.scrollTop = this.scrollTop
      // 获取需要滚动的盒子的高度
      let scrollItemBox = this.$refs.scrollMain.scrollHeight
      // 当判断滚动的高度大于等于盒子高度时
      if (this.scrollTop >= scrollItemBox) {
        //懒加载
        if (this.isLazy) {
          this.$emit('doLoadData')
        }
        //从头开始滚动
        else {
          this.scrollTop = 0
        }
      }
      // LOG.info(['scrollItemBox '+scrollItemBox+'  this.scrollTop '+this.scrollTop])
    },
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
    this.mEnter()
  }
}
</script>

<style lang="scss" scoped>
.auto-scroll-list-main {
  overflow: auto;
  height: 100%;
}

.auto-scroll-list-main::-webkit-scrollbar {
  display: none
}

.seamless-warp-box {
  width: 100%;
}
</style>
