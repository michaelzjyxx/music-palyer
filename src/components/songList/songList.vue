<template>
  <div class="songList">
    <div class="back" @click="click">
      <img class="icon" src="../../common/image/back.png" width="24" height="24"/>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bgimg" :style="bgStyle" ref="bgimg">
      <div class="player-wrapper" ref="playerwrapper">
        <div class="play">
          <img src="../../common/image/play.png" class="icon-play" width="45" height="45"/>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filt"></div>
    </div>
    <div class="bglayer" ref="layer"></div>
    <vscroll :data="songs"
             class="songScroll"
             ref="list"
             :probe-type="probeType"
             :listen-scroll="listenScroll"
             @scroll="scroll"
    >
      <div class="list-wrapper">
        <v-slist :songs="songs">
        </v-slist>
      </div>
    </vscroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vscroll from '../../base/scroll/scroll.vue'
  import VSlist from '../../base/songList/songList.vue'
  import VLoading from '../../base/loading/loading.vue'

  const BAR_HEIGHT = 40
  export default {
    props: {
      bgimg: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    data () {
      return {
        scrollY: 0
      }
    },
    methods: {
      scroll (pos) {
        this.scrollY = pos.y
      },
      click () {
        this.$router.back()
      }
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgimg})`
      }
    },
    mounted () {
      this.imageHeight = this.$refs.bgimg.clientHeight
      this.minHeight = -this.imageHeight + BAR_HEIGHT
      this.$refs.list.$el.style.top = `${this.$refs.bgimg.clientHeight}px`
    },
  
    components: {
      Vscroll,
      VSlist,
      VLoading
    },
    watch: {
      scrollY (newY) {
        let newHeight = Math.max(this.minHeight, newY)
        let zIndex = 0
        let scale = 1
        let blur = 0

        const percent = Math.abs(newY / this.imageHeight)
        this.$refs.layer.style['transform'] = `translate3d(0,${newHeight}px,0)`
        this.$refs.layer.style['webkitTransform'] = `translate3d(0,${newHeight}px,0)`
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
          this.$refs.bgimg.style['transform'] = `scale(${scale})`
          this.$refs.bgimg.style['webkitTransform'] = `scale(${scale})`
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filt.style['backdrop-filter'] = `blur(${blur}px)`
        this.$refs.filt.style['webkitBackdrop-filter'] = `blur(${blur}px)`
        if (newY < this.minHeight) {
          this.$refs.bgimg.style.paddingTop = 0
          this.$refs.bgimg.style.height = `${BAR_HEIGHT}px`
          this.$refs.playerwrapper.style.display = 'none'
          zIndex = 10
        } else if (newY < 0) {
          this.$refs.bgimg.style.paddingTop = '70%'
          this.$refs.bgimg.style.height = 0
          this.$refs.playerwrapper.style.display = ''
          zIndex = 0
        }
        this.$refs.bgimg.style.zIndex = zIndex
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .songList
    position: fixed
    z-index: 100
    top: 0px
    right: 0px
    bottom: 0px
    left: 0px
    background: white
    .back
      position: absolute
      top: 0
      left: 6
      z-index: 50
      .icon
        display: block
        top: 8px
        padding: 10px
    .title
      position: absolute
      top: 4px
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: white
    .bgimg
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .player-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0px
          margin: 0 auto
          text-align: center
          border: 1px solid $color-background
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 0px
            margin-top: -15px
            margin-left: -15px
            margin-bottom: -15px
          .text
            display: inline-block
            vertical-align: middle
            color: $color-background
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bglayer
      position: relative
      height: 100%
      background: white
    .songScroll
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: white
      .list-wrapper
        padding: 20px 30px
      .loadingcontainer
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
