<template>
  <v-card-text v-if="!marketLoaded && !marketValuationLoaded">
    <MarketTrendFactory
      :market="computedMarket.kospi"
      :marketValuation="marketValuation[0]" 
      contry="korea"
    />
          
    <MarketTrendFactory
      :market="computedMarket.nasdaq"
      :marketValuation="marketValuation[1]"
      contry="usa"
    />
      
    <MarketTrendFactory
      :market="computedMarket.usdkrw"
      :marketValuation="marketValuation[3]"
      contry="korea"
    />
      
    <MarketTrendFactory
      :market="computedMarket.snp500"
      :marketValuation="marketValuation[2]"
      contry="usa"
    />      
  </v-card-text>
</template>

<script lang="ts">
  import {  IMarketChartModel, IMarketRecentModel, IMarketRecentValueModel, IMarketValuationModel } from '@/models/market'
  import { MarketModel } from '@/models/market'
  import { Component } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import MarketChart from '@/v2/components/home/MarketChart.vue'
  import MarketTrendFactory from '@/v2/components/home/MarketTrendFactory.vue'
import DiviceMixin from '@/mixins/DiviceMixin.vue'
  
  const MarketStoreModule = namespace('MarketStore')

  export interface ComputedMarket extends IMarketRecentValueModel {
    changeValue: string | number
    color: string
    sparkLineDatas: number[]
    type?: string
    trendIcon?: string
    trendIconColor?: string
    changes: number
  }

  @Component({
    components: {
      MarketChart,
      MarketTrendFactory
    }
  })
  export default class MarketTrend extends DiviceMixin {
        
    @MarketStoreModule.State('marketRecents') marketRecents!: IMarketRecentModel
    @MarketStoreModule.State('marketLoaded') marketLoaded!: boolean
    @MarketStoreModule.State('marketValuation') marketValuation!: IMarketValuationModel[]
    @MarketStoreModule.State('marketValuationLoaded') marketValuationLoaded!: boolean
    @MarketStoreModule.State('marketChart') marketChart!: IMarketChartModel

    @MarketStoreModule.Action('getMarketValuation') getMarketValuation!: () => Promise<void>
    @MarketStoreModule.Action('getTodayMarket') getTodayMarket!: () => Promise<void>

    expandKospi = false
    selectionChipGroup = 0
    
    createComputedMarketContent(marketType: string): any {
      const {changes, close} = this.marketRecents[marketType]
      const {color} = this.getChangeValue(changes, close, marketType)    
      const closes = this.marketChart[marketType].values.slice(-12, ).map((value: MarketModel) => value.close)
      return {
        ...this.marketRecents[marketType],        
        changes,
        color,
        sparkLineDatas: closes,
        type: marketType,
        trendIcon: changes > 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
        trendIconColor: changes > 0 ? 'red' : 'blue'
      }
    }

    get computedMarket() {    
      return {
        kospi: this.createComputedMarketContent('kospi'),
        nasdaq: this.createComputedMarketContent('nasdaq'),
        usdkrw: this.createComputedMarketContent('usdkrw'),
        snp500: this.createComputedMarketContent('snp500')
      }
    }

    getChangeValue(changes: number, close: number, marketType: string): { changeValue: string, color: string } {
      const changeValue = marketType === 'nasdaq' ? (changes / 100 * close) : (changes / 100 * close)
      
      return {
        changeValue: (changeValue > 0 ? '+' : '') + changeValue.toFixed(2),
        color: changeValue > 0 ? 'red--text' : 'blue--text'
      }
    }

    async mounted () {
      if(!this.marketValuation) await this.getMarketValuation()
      if(!this.marketRecents) await this.getTodayMarket()     
    }

  }
</script>

<style scoped>

</style>