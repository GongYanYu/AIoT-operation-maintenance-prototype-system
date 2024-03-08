<template>
  <span class="t-ellipsis" :title="this.text">
    {{ formatText }}
  </span>
</template>

<script>
export default {
  name: 'OmitTooltip',
  data() {
    return {
      isShow: false
    }
  },
  props: {
    text: {
      type: [String, Number],
      default: 'null'
    },
    showLength: {
      type: Number,
      default: null
    },
    isSingleRow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formatText() {
      let value = this.text
      if (value == null) {
        return '-'
      }
      value = value.toString()
      if (!this.showLength||value.length <= this.showLength) {
        return value
      } else {
        this.isShow = true
        //所返回数据length超过时 添加"..."
        return value.substring(0, this.showLength) + '...'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.t-ellipsis {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

</style>
