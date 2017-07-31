<template>
  <div class="singer">
    <v-list @select="selectSinger" :data="singerList"></v-list>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSingerList } from '../../api/singerList'
  import { ERR_OK } from '../../api/config'
  import Singer from '../../common/js/singer'
  import VList from '../../base/listview/list.vue'
  import { mapMutations } from 'vuex'

  const HOT_NAME = '热门'
  const HOT_NUM = 10
  export default {
    name: 'v-singer',
    data () {
      return {
        singerList: []
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singerList = this.normalizeSongList(res.data.list)
            console.log(res.data.list)
          }
        })
      },
      normalizeSongList (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_NUM) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })

        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
          ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
          })
        }
        return hot.concat(ret)
      },
      selectSinger (singerList) {
        this.$router.push({
          path: `/singer/${singerList.id}`
        })
        this.setSinger(singerList)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      VList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0px
    width: 100%
</style>
