import Vue from 'vue'
import Router from 'vue-router'
import VRank from '../components/rank/rank.vue'
import VRecommend from '../components/recommend/recommend.vue'
import VSearch from '../components/search/search.vue'
import VSinger from '../components/singer/singer.vue'
import VSdetail from '../components/singer-detail/singerdetail.vue'
import VSplay from '../components/songList/songList.vue'

Vue.use(Router)

export default new Router({
  name: 'router',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: VRank
    },
    {
      path: '/recommend',
      component: VRecommend
    },
    {
      path: '/search',
      component: VSearch
    },
    {
      path: '/singer',
      component: VSinger,
      children: [
        {
          path: ':id',
          component: VSdetail,
          children: [
            {
              path: ':songid',
              component: VSplay
            }
          ]
        }
      ]
    }
  ]
})
