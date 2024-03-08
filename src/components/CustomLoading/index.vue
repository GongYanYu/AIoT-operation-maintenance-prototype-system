<!--
*@CustomLoading
*@author GYY
*@date 2022/11/16 10:06
-->
<template>
  <div v-loading="loading" class="CustomLoading-main"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'CustomLoading',
  props: {
    loading:{type:Boolean,default:false}
  },
  components: {},
  mounted() {
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.CustomLoading-main{
}
</style>
