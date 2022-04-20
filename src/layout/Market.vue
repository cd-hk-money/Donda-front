<template>   
  <v-card 
    class="mt-2"
    rounded="xl"
  >
    <v-carousel    
      height="52vh"
      class="market-carousel"        
      cycle
      hide-delimiter-background
      show-arrows-on-hover
    >            
      <v-carousel-item                
        v-for="(slide, i) in slides"
        :key="i"
        link="/"
      >               
        <v-sheet          
          :color="colors[i]"
          height="100%"
        >                        
          <market-desc 
            :desc="slide"
            :color="colors[i]"
          />                   
          <market-chart color="grey" />
        </v-sheet>
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

// models
import { MarketDescModel } from '@/models/market'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    MarketCarousel,
    MarketDesc,
    MarketChart
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
}

</script>

<style>

 
</style>