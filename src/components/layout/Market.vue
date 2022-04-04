<template>        
  <v-row>
    <v-col
      cols="12"
      sm="1"
    >
    </v-col>
    <v-col
      cols="12"
      sm="10"                  
    >      
      <v-carousel
        class="market-carousel"        
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >            
        <v-carousel-item              
          v-for="(slide, i) in slides"
          :key="i"
        >               
          <v-sheet
            :color="colors[i]"
            height="100%"
          >                
            <v-row          
              height="50%"
            >          
              
            </v-row>
            <v-row
              class="fill-height"        
              align="center"
              justify="center"
            >
              <v-col                      
                cols="12"
                sm="10"
              >          
                <market-desc 
                  :desc="slide"
                  :color="colors[i]"
                />         
              </v-col>
              <v-col                
                cols="12"
                sm="12"
              >
                <market-chart color="grey" />
              </v-col>
            </v-row>
          </v-sheet>
        </v-carousel-item>      
      </v-carousel>                  
    </v-col>
    <v-col
      cols="12"
      sm="1"
    >                
    </v-col>        
  </v-row>                
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
      market: 'KOPSI',
      close: '2233',
      trans: '23112',
      code: '0'
    },
    {
      market: 'NYSE',
      close: '265442',
      trans: '221223',
      code: '1'
    },
    {
      market: 'CODMA',
      close: '2254',
      trans: '2322454',
      code: '2'
    }
  ]

  @StockStoreModule.State('loaded')
  private loaded!: boolean
}

</script>

<style>
 .market-carousel {
   margin-top: 30px;
 }
</style>