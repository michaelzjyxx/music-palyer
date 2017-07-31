<template>
  <transition name="slide">
    <v-songlist :songs="disses" :bgimg="bgimg" :title="title"></v-songlist>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { getDissDetail } from '../../api/diss'
  import { createDiss } from '../../common/js/song'
  import { ERR_OK } from '../../api/config'
  import VSonglist from '../../components/songList/songList.vue'

  export default {
    data () {
      return {
        disses: []
      }
    },
    created () {
      this._getDissDetail(this.diss.dissid)
    },
    methods: {
      _getDissDetail (id) {
        if (!id) {
          this.$router.push('/recommend')
          return
        }
        getDissDetail(id).then((res) => {
          if (res.code === ERR_OK) {
            this.disses = this._normalize(res.cdlist[0].songlist)
            console.log(this.disses)
          }
        })
      },
      _normalize (list) {
        let ret = []
        list.forEach((item) => {
          if (item.songid && item.albumid) {
            ret.push(createDiss(item))
          }
        })
        return ret
      }
    },
    components: {
      VSonglist
    },
    computed: {
      ...mapGetters([
        'diss'
      ]),
      title () {
        return this.diss.dissname
      },
      bgimg () {
        return this.diss.imgurl
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
