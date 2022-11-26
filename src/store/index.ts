/* eslint-disable @typescript-eslint/no-explicit-any */

import Vue from 'vue'
import Vuex from 'vuex'

import StockStore from './StockStore'
import MarketStore from './MarketStore'
import InterestStore from './InterestStore'
import UserStore from './UserStore'
import axios from 'axios'

export interface StoreState {
  data: any
  error: any
  loading: boolean
}

Vue.use(Vuex)

export default new Vuex.Store({ 
  modules: {
    StockStore,
    MarketStore,
    InterestStore,
    UserStore
  }
})

const enhanceAccessToeken = () => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) return
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

enhanceAccessToeken()