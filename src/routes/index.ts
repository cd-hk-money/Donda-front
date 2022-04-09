import VueRouter from "vue-router";
import Home from '@/components/Home.vue'
import Trans from '@/components/Trans.vue'
import Change from '@/components/Change.vue'
import Detail from '@/components/Detail.vue'
import Test from '@/components/Test.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/trans",
    name: "Trans",
    component: Trans
  },
  {
    path: "/change",
    name: "change",
    component: Change
  },
  {
    path: "/detail/:code",
    name: "detail",
    component: Detail
  },
  {
    path: "/test",
    name: "test",
    component: Test
  }

]

const router = new VueRouter({
  mode: "history",
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes
})

export default router