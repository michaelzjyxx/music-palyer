<template>
  <div class="recommend">
    <v-scroll ref="scroll" class="recommend-content" :data="songList">
      <div>
        <div v-if='recommends.length' class="slider-wrapper">
          <v-slider>
            <div v-for="item in recommends">
              <a :href="item.jumpurl">
                <img @load='imageLoad' :src="item.pic"/>
              </a>
            </div>
          </v-slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门推荐</h1>
          <ul>
            <li @click="selectDiss(item)" v-for="item in songList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!songList.length">
        <v-loading></v-loading>
      </div>
    </v-scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getRecommend, getSongList } from '../../api/recommend'
  import { ERR_OK } from '../../api/config'
  import VSlider from '../../base/slider/slider.vue'
  import VScroll from '../../base/scroll/scroll.vue'
  import VLoading from '../../base/loading/loading.vue'
  import { mapMutations } from 'vuex'

  export default {
    name: 'v-recommend',
    data () {
      return {
        recommends: [],
        songList: [],
        refreshed: false
      }
    },
    components: {
      VSlider,
      VScroll,
      VLoading
    },
    created () {
      this._getRecommend()
      this._getSongList()
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.focus
          }
        })
      },
      _getSongList () {
        getSongList().then((res) => {
          if (res.code === ERR_OK) {
            this.songList = res.data.list
          }
        })
      },
      selectDiss (songList) {
        this.$router.push({
          path: `/recommend/${songList.dissid}`
        })
        this.setDiss(songList)
      },
      ...mapMutations({
        setDiss: 'SET_DISS'
      }),
      imageLoad () {
        if (!this.refreshed) {
          this.$refs.scroll.refresh()
          this.refreshed = true
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          text-align: center
          height: 65px
          line-height: 65px
          font-size: $font-size-medium
          color: $color-background
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: black
            .desc
              color: black
      .loading-container
        position: absolute
        top: 50%
        width: 100%

  //transform: translateY(-50%)
</style>
