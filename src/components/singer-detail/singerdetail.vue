<template>
  <transition name="slide">
    <v-slist :bgimg="bgimg" :songs="songs" :title="title">
    </v-slist>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { getSingerDetail } from '../../api/singerdetail'
  import { ERR_OK } from '../../api/config'
  import { createSong } from '../../common/js/song'
  import VSlist from '../songList/songList.vue'

  export default {
    data () {
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ]),
      title () {
        return this.singer.name
      },
      bgimg () {
        return this.singer.avatar
      }
    },
    methods: {
      _getSingerDetail (id) {
        if (!id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongDetail(res.data.list)
            console.log(res.data.list)
          }
        })
      },
      _normalizeSongDetail (list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
//          console.log(item)
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    created () {
      this._getSingerDetail(this.singer.id)
    },
    components: {
      VSlist
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
