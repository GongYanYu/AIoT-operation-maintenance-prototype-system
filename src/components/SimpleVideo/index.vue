<!--
*@SimpleVideo
*@author GYY
*@date 2022/7/27 10:44
-->
<template>
  <div class="simple-video-main">
    <video-player class="vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="false"
                  :options="playerOptions" autoplay
    >
    </video-player>
  </div>
</template>

<script>
//this.$refs.videoPlayer.player.play() // 播放
// this.$refs.videoPlayer.player.pause() // 暂停
// this.$refs.videoPlayer.player.src(src) // 重置进度条
import LOG from '@/utils/self-log'

export default {
  name: 'SimpleVideo',
  props: {
    aspectRatio: {
      type: String,
      default: '16:9'
    },
    sources: {
      type: Array,
      default: () => {
        return [{
          type: 'video/mp4',  // 类型
          src: 'videoUrl'       // url地址
        }]
      }
    },
    poster: {type:String,default:null}
  },
  components: {},
  created() {
    this.$set(this.playerOptions, 'aspectRatio', this.aspectRatio)
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true,  // 如果为true,浏览器准备好时开始回放
        muted: false,     // 默认情况下将会消除任何音频。
        loop: true,      // 是否视频一结束就重新开始。
        preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: `${window.innerWidth}:${window.innerHeight + 5}`,  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: null,
        poster: null,  // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,           // 当前时间和持续时间的分隔符
          durationDisplay: false,       // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: false       // 是否显示全屏按钮
        }
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted(){
    //自动播放
    // this.$refs.videoPlayer.player.play()
    //想暂停 需要使用  .then
    this.player.play()
  },
  watch: {
    sources:{
      deep:true,
      immediate:true,
      handler(newV, _) {
        if (newV[0]&&newV[0].src!=null) {
          LOG.info(['video='+JSON.stringify(newV)])
          this.$set(this.playerOptions, 'sources', newV)
        }
      }
    },
    poster(newV, _) {
      if (newV) {
        this.$set(this.playerOptions, 'poster', newV)
      }
    }
  },
  methods: {
    updateVideo(posterUrl, videoUrl) {
      this.$set(this.playerOptions, 'poster', posterUrl)
      this.$set(this.playerOptions, 'sources', [{
        type: 'video/mp4',  // 类型
        src: videoUrl       // url地址
      }])
    }
  }
}
</script>

<style lang="scss" scoped>
//control bar
::v-deep .video-js .vjs-control-bar .video-main{
  height: auto;
  display: none;
}
::v-deep .vjs-custom-skin > .video-js .vjs-control-bar{
  display: none;
}

.simple-video-main {
  height: auto;
  width: 100% !important;
  overflow: hidden;

  ::v-deep .video-js .vjs-tech {
    height: auto;
    width: 100% !important;
  }
}
</style>
