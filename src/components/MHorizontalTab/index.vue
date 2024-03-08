<template>
  <div class="m-tab-main" :style="{borderRadius}">
    <div v-for="(item,index) in tabValue" @click="changeTab(item,index)" :key="index"
         class="m-tab-child" @mouseover="hoverThis(index)" @mouseout="isHover=-1"
         :class="{'m-tab-child-selected':index===defaultIndex,'m-tab-child-hover':index===isHover}">

        <div v-if="!isHaveSubtitle">{{ item.title }}</div>
        <div v-else >
<!--          <div style="display: flex;flex-direction: column;-->
<!--        justify-content: center;align-items: center;"-->
<!--          >-->
<!--            <div>{{ item.title }}</div>-->
<!--            <div class="m-tab-subtitle">{{ item.subtitle }}</div>-->
<!--          </div>-->
          {{ item.title }} (<span class="number-font">{{item.subtitle}}</span>)
        </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'MHorizontalTab',
  data() {
    return {
      defaultIndex: 0,
      borderRadius: '10.5px',
      isHover:-1,
    }
  },
  created() {
    if (!this.isHaveSubtitle) {
      this.borderRadius = '10.5px'
    } else {
      this.borderRadius = '24px'
    }

    this.defaultIndex=Number(this.default)
  },
  props: {
    tabValue: {
      type: Array,
      default: () => {
        return [
          //有subtitle 会有第二行
          { title: '测试1', subtitle: 'subtitle', value: '1' },
          { title: '测试2', subtitle: 'subtitle', value: '2' },
          { title: '全部', subtitle: 'subtitle', value: '2' }
        ]
      }
    },
    //是否有副标题
    isHaveSubtitle: {
      type: Boolean,
      default: false
    },
    //是否有副标题
    default: {
      type: [String,Number],
      default: 0
    },
  },
  methods: {
    changeTab(item, index) {
      this.defaultIndex = index
      this.$emit('changeTab', item)
    },
    hoverThis(index){
      if (!this.$isPanelEquipment())
        this.isHover=index
    }
  }
}
</script>

<style scoped lang="scss">

.m-tab-main {
  display: flex;
  background-image: linear-gradient-main-transparency(0.4,0.4);
  font-size: 12px;
  color: #FFFFFF;
  height: 100%;
  border-radius: 24px;
}

.m-tab-child {
  cursor: pointer;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.m-tab-child-selected {
  border-radius: 24px;
  background-image: linear-gradient-main-transparency(0.7,0.7);
}

.m-tab-child-hover {
  border-radius: 24px;
  background-image: linear-gradient-main-transparency(0.2,0.2);
}

.m-tab-subtitle{
  font-size: 12px;
  margin-top: 4%;
}
</style>
