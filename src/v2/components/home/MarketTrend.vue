<template>
  <v-card-text v-if="!market.loading && !marketValuation.loading">
    <MarketTrendFactory
      :computedMarket="computedMarket.kospi"
      :valuation="marketValuation.data[0]" 
      contry="korea"
    />
          
    <MarketTrendFactory
      :computedMarket="computedMarket.nasdaq"
      :valuation="marketValuation.data[1]"
      contry="usa"
    />
      
    <MarketTrendFactory
      :computedMarket="computedMarket.usdkrw"
      :valuation="marketValuation.data[3]"
      contry="korea"
    />
      
    <MarketTrendFactory
      :computedMarket="computedMarket.snp500"
      :valuation="marketValuation.data[2]"
      contry="usa"
    />      
  </v-card-text>
</template>

<script lang="ts">
  import { IMarketRecentValueModel } from '@/models/market'
  import { MarketModel } from '@/models/market'
  import { Component } from 'vue-property-decorator'

  import MarketChart from '@/v2/components/home/MarketChart.vue'
  import MarketTrendFactory from '@/v2/components/home/MarketTrendFactory.vue'
  import StoreMixin from '@/mixins/StoreMixin.vue'
  import { getMarketValuation, getTodayMarket } from '@/store/payload'
  
  const marketTypes = ['kospi', 'nasdaq', 'usdkrw', 'snp500']

  export interface ComputedMarket extends IMarketRecentValueModel {
    color: string
    sparkLineDatas: number[]
    type?: string
    trendIcon?: string
    trendIconColor?: string
    changes: number
  }

  interface IMarket {
    kospi?: ComputedMarket
    nasdaq?: ComputedMarket
    usdkrw?: ComputedMarket
    snp500?: ComputedMarket
  }

  @Component({
    components: {
      MarketChart,
      MarketTrendFactory
    }
  })
  export default class MarketTrend extends StoreMixin {
        
    createComputedMarketContent(marketType: string): ComputedMarket {
      const {changes, close} = this.marketRecents[marketType]
      return {
        ...this.marketRecents[marketType],        
        changes: this.marketRecents[marketType].changes,
        color: (changes / 100 * close) > 0 ? 'red--text' : 'blue--text',
        sparkLineDatas: this.market.data[marketType].values.slice(-12, ).map((value: MarketModel) => value.close),
        type: marketType,
        trendIcon: changes > 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
        trendIconColor: changes > 0 ? 'red' : 'blue'
      }
    }

    get computedMarket(): IMarket {    
      return marketTypes.reduce((acc, cur) => {
        acc[cur] = this.createComputedMarketContent(cur)
        return acc
      },{})
    }

     mounted () {      
      if(!this.market.data) {
        this.callRequestMarket(getTodayMarket())
        this.callRequestMarket(getMarketValuation())
      }      
    }

  }
</script>