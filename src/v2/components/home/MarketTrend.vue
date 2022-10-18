<template>
  <div v-if="!marketLoaded && !marketValuationLoaded">    
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
  </div>
</template>

<script lang="ts">
  import {  IMarketChartModel, IMarketRecentModel, IMarketRecentValueModel } from '@/models/market'
  import { MarketModel } from '@/models/market'
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import MarketChart from '@/v2/components/home/MarketChart.vue'
  import MarketTrendFactory from '@/v2/components/home/MarketTrendFactory.vue'
  
  const MarketStoreModule = namespace('MarketStore')

  export interface ComputedMarket extends IMarketRecentValueModel {
    changeValue: string
    color: string
    sparkLineDatas: number[]
    type?: string
    trendIcon?: string
    trendIconColor?: string
  }

  @Component({
    components: {
      MarketChart,
      MarketTrendFactory
    }
  })
  export default class MarketTrend extends Vue {
        
    @MarketStoreModule.State('marketRecents') marketRecents!: IMarketRecentModel
    @MarketStoreModule.State('marketLoaded') marketLoaded!: boolean
    @MarketStoreModule.State('marketValuation') marketValuation!: any
    @MarketStoreModule.State('marketValuationLoaded') marketValuationLoaded!: boolean
    @MarketStoreModule.State('marketChart') marketChart!: IMarketChartModel

    @MarketStoreModule.Action('getMarketValuation') getMarketValuation!: () => Promise<void>
    @MarketStoreModule.Action('getTodayMarket') getTodayMarket!: () => Promise<void>

    expandKospi = false
    selectionChipGroup = 0


    get mobile () { return this.$vuetify.breakpoint.name === 'xs'}    


    createComputedMarketContent(marketType: string): ComputedMarket {
      const {changes, close} = this.marketRecents[marketType]
      const {changeValue, color} = this.getChangeValue(changes, close)    
      const closes = this.marketChart[marketType].values.slice(-12, ).map((value: MarketModel) => value.close)

      return {
        ...this.marketRecents[marketType],        
        changeValue,
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

    getChangeValue(changes: number, close: number) {
      const changeValue = (changes * close)
      return {
        changeValue: (changeValue > 0 ? '+' : '') + changeValue.toFixed(2),
        color: changeValue > 0 ? 'red--text' : 'blue--text'
      }
    }

    async mounted () {
      if(!this.marketValuation) await this.getMarketValuation()
      if(!this.marketRecents) await this.getTodayMarket()    
      console.log(this.marketValuation)    
    }

  }
</script>

<style scoped>

</style>