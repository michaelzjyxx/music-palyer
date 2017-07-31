import Vue from 'vue'
import Router from 'vue-router'
import VRecommend from '../components/recommend/recommend.vue'
import VSearch from '../components/search/search.vue'
import VSinger from '../components/singer/singer.vue'
import VSdetail from '../components/singer-detail/singerdetail.vue'
import VDiss from '../components/diss/diss.vue'

Vue.use(Router)

export default new Router({
  name: 'router',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: VRecommend,
      children: [
        {
          path: ':id',
          component: VDiss
        }
      ]
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
          component: VSdetail
        }
      ]
    }
  ]
})
