<template>
  <div class="songList">
    <div class="back">
      <i class="iconback"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bgimg" :style="bgStyle" ref="bgimg">
      <div class="filter"></div>
    </div>
    <vscroll :data="songs" class="songScroll" ref="list">
        <v-slist :songs="songs">
        </v-slist>
    </vscroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vscroll from '../../base/scroll/scroll.vue'
  import VSlist from '../../base/songList/songList.vue'

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
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgimg})`
      }
    },
//    created () {
//      console.log(this.songs)
//    },
    mounted () {
      this.$refs.list.$el.style.top = `${this.$refs.bgimg.clientHeight}px`
    },
    components: {
      Vscroll,
      VSlist
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
      .iconback
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: white
    .title
      position: absolute
      top: 0px
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
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.1)
</style>

/*.play-wrapper
position: relative
bottom: 20px
z-index: 50
width: 100%
.play
box-sizing: border-box
width: 135px
padding: 7px 0px
margin: 0 auto
text-align: center
border: 1px solid $color-theme
border-radius: 100px
font-size: 0
.icon-play
display: inline-block
vertical-align: middle
margin-right: 6px
font-size: $font-size-medium-x
.text
display: inline-block
vertical-align: middle
font-size: $font-size-small  */
