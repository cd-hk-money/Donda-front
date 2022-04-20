<template>   
  <v-card 
    class="mt-2 grey darken-3"
    rounded="xl"
    max-width="100%"        
  > 
    <v-carousel
      min-height="52vh"
      max-height="52vh"
      class="grey darken-3"        
      cycle
      hide-delimiter-background
      show-arrows-on-hover      
    >            
      <v-carousel-item                
        v-for="(slide, i) in slides"
        :key="i"
      >  
        <v-flex
          v-if="!loaded"
          class="align-center text-center"
        >                  
          <circular-loading />
        </v-flex>        
        <v-card          
          v-else
          :color="colors[i]"
          height="100%"      
          @click="full = true"                
        >                        
          <market-desc 
            :desc="slide"
            :color="colors[i]"
          />                   
          <market-chart color="grey" />
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
import MarketChart from '@/components/market/MarketChart.vue'
import CircularLoading from '@/layout/CircularLoading.vue'

// models
import { MarketDescModel } from '@/models/market'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    MarketCarousel,
    MarketDesc,
    MarketChart,
    CircularLoading
  }
})
export default class Market extends Vue {
    private colors: Array<string> = [
    'grey darken-3',
    'grey darken-3',
    'grey darken-3',    
  ]

  private slides: MarketDescModel[] = [
    {
      market: '시장1',
      close: '2233',
      trans: '23112',
      code: '주가'
    },
    {
      market: '시장2',
      close: '265442',
      trans: '221223',
      code: '주가'
    },
    {
      market: '시장3',
      close: '2254',
      trans: '2322454',
      code: '주가'
    }
  ]

  @StockStoreModule.State('loaded')
  private loaded!: boolean

  private expand = false
  private full = false
}

</script>

<style>
.loading {
  margin-top: 160px;
}
 
</style>