<!--
*@HoverStyle
*@author GYY
*@date 2022/11/12 15:00
-->
<template>
  <div @mouseenter="status=1"  @mouseleave="status=-1"
       :class="{[classObj.clicked]:clicked,[classObj.hover]:!clicked&&status===1}">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'HoverStyle',
  props: {
    classObj:{
      type:Object,
      default:()=>{
        return{
          hover:'auto-scroll-cell-hover',
          clicked:'auto-scroll-cell-checked'
        }
      }
    },
    clicked:{type:Boolean,default:false}
  },
  components: {},
  mounted() {
  },
  data() {
    return {
      // 1:hover  2:click
      status:-1
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
