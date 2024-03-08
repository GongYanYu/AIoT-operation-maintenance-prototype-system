<template>
  <div class="ftl-main" :style="{height:height}">
    <div class="left">
      <div class="title">
        <div class="title-main">{{ title }}</div>
      </div>
      <div class="timestamp">{{formatTimestamp}}</div>
    </div>
    <div class="middle">
      <div class="dot">
        <div class="dot-main"></div>
      </div>
      <div class="line">
        <div class="line-main" v-if="position==='start'"></div>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <slot v-if="content===null"/>
        <div v-else>{{ content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlatTimeline',
  props: {
    //end 没有线 start有线
    position: {
      type: String,
      default: 'start'
    },
    title: {
      type: String,
      default: 'title'
    },
    timestamp: {
      type: String,
      default: '2022-06-27 10:23:45'
    },
    content: {
      type: String,
      default: null
    },
    height:{
      type: String,
      default:"80px"
    }
  },
  computed: {
    //格式一定要是这样2022-06-27 10:23:45
    formatTimestamp() {
      let val=this.timestamp;
      if (val == null) {
        return ''
      }
      let split = val.split(' ')
      return split[0] + '\n' + split[1]
    }
  }
}
</script>

<style lang="scss" scoped>
.ftl-main {
  display: flex;
  width: 100%;

  .left {
    flex: 6;
    display: flex;
    flex-direction: column;
    text-align: right;

    .title {
      flex: 2;
      display: flex;
      flex-direction: column;
      text-align: right;
      justify-content: flex-end;

      .title-main {
        color: $--color-primary;
        line-height: 16px;
      }
    }

    .timestamp {
      margin-top: 10%;
      flex: 3;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      text-align: right;
      line-height: 14px;
      font-weight: 400;
      white-space: pre;
    }
  }

  .middle {
    margin: 1%;
    flex: 1;
    height: 135%;
    width: 25px;
    display: flex;
    flex-direction: column;

    .dot {
      flex: 5;
      justify-content: center;
      align-items: flex-end;
      display: flex;

      .dot-main {
        width: 6px;
        height: 6px;
        background-color: $--color-main;
        border-radius: 100%;
      }
    }

    .line {
      justify-content: center;
      align-items: center;
      display: flex;
      flex: 15;

      .line-main {
        height: 100%;
        border-left: 1px solid rgba(255, 255, 255, 0.9);
      }
    }
  }

  .right {
    flex: 40;
    background: rgba(17, 126, 124, 0.5);
    border-radius: 4px;
    margin: 1%;

    .content {
      height: 100%;
    }
  }
}
</style>
