<template>
  <v-card        
    class="mt-5 ml-5 mr-5"
    height="465"
    rounded="xl"
    elevation="3"         
  >
    <v-carousel        
      height="auto"
      cycle
      hide-delimiter-background
      show-arrows-on-hover    
      hide-delimiters  
      interval="200000"
      v-if="!marketLoaded"                     
    >            
      <v-carousel-item                
        v-for="(marketType, i) in marketTypes"
        :key="i"                
      >          
        <v-card height="auto">
          <market-desc 
            @fillChange="onFill"
            @changeRequestDate="changeRequestDate"            
            :type="marketType" />                   
          <market-chart   
            :fill="fill"
            class="ml-5 mr-5"
            :height="100"
            :count="count"            
            :type="marketType" />
        </v-card>
      </v-carousel-item>              
    </v-carousel>       
  </v-card>        
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// components
import MarketDesc from '@/v2/components/home/MarketDesc.vue'
import MarketChart from '@/v2/components/home/MarketChart.vue'


// models
import { IMarketRecentModel } from '@/models/market'


const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    MarketDesc,
    MarketChart,
  }
})
export default class Market extends Vue {
  
  @MarketStoreModule.State('marketRecents')
  marketRecents!: IMarketRecentModel[] 

  marketTypes = ['kospi', 'nasdaq', 'snp500', 'us10yt', 'us1yt', 'us5yt', 'usdkrw']

  @MarketStoreModule.State('marketLoaded')
  marketLoaded!: boolean
    

  // 그래프의 채움 
  fill: boolean | string = false

  // 초기 라벨 개수
  count = 20

  changeRequestDate (date: number) {    
    this.count = this.count + date
  }

  onFill (payload: boolean | string) {
    this.fill = payload
  }
}
</script>