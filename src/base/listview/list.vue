<template>
  <v-scroll class="listview"
            :data="data"
            ref="listview"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll"
  >
    <ul>
      <li v-for="group in data" class="list-group" ref="listgroup">
        <h2 class="list-title">{{group.title}}</h2>
        <ul v-for="item in group.items" class="list-item">
          <img v-lazy="item.avatar" class="avatar"/>
          <span class="name">{{item.name}}</span>
        </ul>
      </li>
    </ul>
    <div class="shortcutList"
         @touchstart="shortcutonTouch"
         @touchmove.stop.prevent="shortcutonMove"
         id="shortcutList"
    >
      <ul>
        <li v-for="(item,index) in shortcutList"
            class="shortcut"
            :class="{'current': currentPageIndex=== index}"
            :data-index="index"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="fixedList" v-show="fixTitle" ref="fixe">
      <h1 class="fixedTitle">{{fixTitle}}</h1>
    </div>
    <div class="loadingcontainer" v-show="false">
      <v-loading></v-loading>
    </div>
  </v-scroll>
</template>

<script type="text/ecmascript-6">
  import VScroll from '../scroll/scroll.vue'
  import { getData } from '../../common/js/dom'
  import VLoading from '../loading/loading.vue'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30
  export default {
    created () {
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    data () {
      return {
        scrollY: -1,
        currentPageIndex: 0,
        diff: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    methods: {
      shortcutonTouch (e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        if (!anchorIndex) {
          return
        }
        this.scrollTo(anchorIndex)
      },
      shortcutonMove (e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        if (delta !== 0 || anchorIndex > 0) {
          this.scrollTo(anchorIndex)
        }
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      scrollTo (Index) {
        if (!Index && Index < 0) {
          return
        }
        if (Index < 0) {
          Index = 0
        } else if (Index > this.listHeight.length - 2) {
          Index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[Index]
        this.$refs.listview.scrollToElement(this.$refs.listgroup[Index], 0)
      },
      coculateHeight () {
        this.listHeight = []
        const list = this.$refs.listgroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    computed: {
      shortcutList () {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentPageIndex] ? this.data[this.currentPageIndex].title : ''
      }
    },
    components: {
      VScroll,
      VLoading
    },
    watch: {
      data () {
        setTimeout(() => {
          this.coculateHeight()
        }, 20)
      },
      scrollY (newY) {
        const listHeight = this.listHeight
        if (newY > 0) {
          this.currentPageIndex = 0
          return
        }
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentPageIndex = i
            this.diff = height2 + newY
            return
          }
          this.currentPageIndex = listHeight.length - 2
        }
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? (newVal - TITLE_HEIGHT) : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixe.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: white
    .list-group
      padding-bottom: 30px
      .list-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: black
        background: #f5f5f5
      .list-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius 50%
        .name
          margin-left: 20px
          color: black
          font-size: $font-size-medium

    .shortcutList
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0px
      /*border-radius: 10px*/
      /*border-color : #e6e6e6*/
      /*border-width :1px*/
      /*border-style :solid*/
      text-align: center
      background: rgba(182, 64, 119, 0)
      font-family: Helvetica
      .shortcut
        padding: 3px
        line-height: 1
        color: black
        font-size: $font-size-small
        &.current
          color: $color-background
    .fixedList
      position: absolute
      top: 0
      left: 0px
      width: 100%
      .fixedTitle
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: black
        background: #f5f5f5
    .loadingcontainer
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
