import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

import router from './routes'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
