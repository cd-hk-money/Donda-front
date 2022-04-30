import Vue from 'vue'
import Vuex from 'vuex'

import StockStore from './StockStore'
import MarketStore from './MarketStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  getters: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    StockStore,
    MarketStore
  }
})
