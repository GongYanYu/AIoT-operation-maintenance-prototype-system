<template>
  <div :class="{'close':!isHover,'close-hover':isHover}"
       @mouseover="isHover=true" @mouseout="isHover=false"
       :style="{width:size,height:size}" @click="handlerClick"
  />
</template>

<script>
export default {
  name: 'CrossSign',
  data() {
    return {
      isHover: false
    }
  },
  props: {
    size: {
      type: String,
      default: '16px'
    }
  },
  methods: {
    handlerClick() {
      this.$emit('clickExit')
    }
  }
}
</script>

<style scoped lang="scss">

.close::before,
.close::after {
  position: absolute;
  content: '';
  background-color: #FFFFFF;
  width: 1px;/*no*/
  height: 20px;/*no*/
}

.close::before {
  transform: rotate(45deg);
}

.close::after {
  transform: rotate(-45deg);
}

.close-hover {
  position: relative;
}

.close-hover::before,
.close-hover::after {
  position: absolute;
  content: '';
  background-color: $--color-extra;
  width: 1px;/*no*/
  height: 20px;/*no*/
  cursor: pointer;
}

.close-hover::before {
  transform: rotate(45deg);
}

.close-hover::after {
  transform: rotate(-45deg);
}
</style>
