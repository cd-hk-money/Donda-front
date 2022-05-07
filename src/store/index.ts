import Vue from 'vue'
import Vuex from 'vuex'

import StockStore from './StockStoreV2'
import MarketStore from './MarketStore'
import InterestStore from './InterestStore'

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
    MarketStore,
    InterestStore
  }
})
