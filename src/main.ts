import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './routes'
import kiContext from '@kiyoaki_w/vue-context'
import applyDirectives from './plugins/directive'


Vue.use(kiContext)
Vue.config.productionTip = false
Vue.use(VueRouter)
applyDirectives()



new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
