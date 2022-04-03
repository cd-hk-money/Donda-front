import VueRouter from "vue-router";
import Home from '@/components/Home.vue'
import Trans from '@/components/Trans.vue'
import Change from '@/components/Change.vue'
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
  }
]
const router = new VueRouter({
  routes
})

export default router