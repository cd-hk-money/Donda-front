import Vue from 'vue'
import Vuex from 'vuex'

import StockStore from './StockStore'
import MarketStore from './MarketStore'
import InterestStore from './InterestStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    StockStore,
    MarketStore,
    InterestStore
  }
})
