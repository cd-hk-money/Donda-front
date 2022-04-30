<template>
  <v-card        
    class="mt-5 ml-5"
    height="50vh"
    rounded="xl"
  >
    <v-carousel 
      v-if="!marketLoaded"                     
      height="auto"
      cycle
      hide-delimiter-background
      show-arrows-on-hover    
      hide-delimiters  
    >            
      <v-carousel-item                
        v-for="(marketRecent, i) in marketRecents"
        :key="i"
      >          
        <v-card                    
          height="auto"           
                         
        >                        
          <market-desc :desc="marketRecent" />                   
          <market-chart   
            class="ml-5 mr-5"
            :color="colors[i]"
            :height="100"
            :count="20"
            :type="marketRecent.market" />
        </v-card>
      </v-carousel-item>              
    </v-carousel>       
  </v-card>        
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// components
import MarketCarousel from '@/components/market/MarketCarousel.vue'
import MarketDesc from '@/components/market/MarketDesc.vue'
import MarketChart from '@/v2/components/home/MarketChart.vue'
import CircularLoading from '@/layout/CircularLoading.vue'

// models
import { IMarketRecentModel } from '@/models/market'


const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    MarketCarousel,
    MarketDesc,
    MarketChart,
    CircularLoading
  }
})
export default class Market extends Vue {
    private colors = ['#40E0D0', '#40E0D0', '#40E0D0']

  @MarketStoreModule.State('marketRecents')
  private marketRecents!: IMarketRecentModel[] 

  @MarketStoreModule.State('marketLoaded')
  private marketLoaded!: boolean
  
  @StockStoreModule.State('loaded')
  private loaded!: boolean

  private expand = false
  private full = false
}
</script>