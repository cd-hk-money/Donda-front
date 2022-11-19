// 첫번째 버전
import VueRouter from "vue-router";

// 두번째 버전 
import HomeV2 from '@/v2/pages/Home.vue'
import DetailV2 from '@/v2/pages/Detail.vue'
import RankV2 from '@/v2/pages/RankV2.vue'

import goTo from "vuetify/lib/services/goto";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeV2
  },
  {
    path: "/detail/:title",
    name: "detail",
    component: DetailV2,    
  },
  {
    path: "/rank",
    name: "rank",
    component: RankV2
  }
]

const router = new VueRouter({
  mode: "history",
  scrollBehavior: (to, from, savedPosition) => {
    setTimeout(() => {
      let scrollTo = 0
      if (to.hash) {
        scrollTo = to.hash
      } else if (savedPosition) {
        scrollTo = savedPosition.y
      }
      return goTo(scrollTo)
    }, 10)
  },
  routes
})

export default router