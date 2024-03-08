<template>
  <div class="main">
    <span class="arrUp" @click="clickUp" :style="{ 'border-bottom-color': color1 }"></span>
    <span class="arrDown" @click="clickDown" :style="{ 'border-top-color': color2 }"></span>
  </div>
</template>

<script>
export default {
  name: "SmallTriangle",
  data() {
    return {
      color1: "#0099ff",
      color2: "#ffffff",
      isPositiveSequence: true
    }
  },
  methods: {
    clickUp() {
      if (this.isPositiveSequence) {
        return
      }
      this.isPositiveSequence = true
      this.temp()
      this.$emit('clickTriangle', true);
      console.log("SmallTriangle---------clickUp");
    },
    clickDown() {
      if (!this.isPositiveSequence) {
        return
      }
      this.isPositiveSequence = false
      this.temp()
      this.$emit('clickTriangle', false);
      console.log("SmallTriangle---------clickDown");
    },
    temp() {
      let temp = this.color1;
      this.color1 = this.color2;
      this.color2 = temp;
    }
  }
}
</script>

<style scoped lang="scss">

$--icon-size:6px;

.main {
  display: flex;
  flex-direction: column;
}

.arrUp {
  width: 0;
  height: 0;
  border-right: $--icon-size solid transparent;
  border-left: $--icon-size solid transparent;
  border-bottom: $--icon-size solid gray;
  cursor: pointer;
}

.arrDown {
  width: 0;
  height: 0;
  margin-top: 2px;
  border-right: $--icon-size solid transparent;
  border-left: $--icon-size solid transparent;
  border-top: $--icon-size solid gray;
  cursor: pointer;
}

</style>
