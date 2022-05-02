<template>
  <v-row>
    <v-col cols="12" xl="10" lg="10">      
      <market />    
      <v-row>
        <v-col cols="12" xl="4" lg="4">
          <market-trend />
        </v-col>
        <v-col cols="12" xl="8" lg="8">
          <stock-recommend />      
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" xl="2" lg="2" ml="2">      
      <menu-bar />   
      <side-bar />
      <interest-toggle />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Market from '@/v2/components/home/Market.vue'
import MarketTrend from '@/v2/components/home/MarketTrend.vue'
import StockRecommend from '@/v2/components/home/StockRecommend.vue'

import SideBar from '@/v2/pages/SideBar.vue'
import MenuBar from '@/v2/pages/MenuBar.vue'
import InterestToggle from '@/v2/pages/InterestToggle.vue'

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    Market,
    MarketTrend,
    StockRecommend,


    SideBar,
    MenuBar,
    InterestToggle
  }
})
export default class HomeV2 extends Vue {

  @MarketStoreModule.Action('getTodayMarket')
  public getTodayMarket!: () => Promise<void>

  @MarketStoreModule.Action('getSearchTable')
  public getSearchTable!: () => Promise<void>

  @StockStoreModule.Action('getRecommendStock')
  public getRecommendStock!: () => Promise<void>

  created () {
    this.getTodayMarket()  
    this.getSearchTable()
    this.getRecommendStock()
  }
}
</script>