<template>
  <v-col                      
    cols="12"
    sm="8"
  >     
    <v-sheet
      class="grey lighten-3"
      min-height="80vh"
      rounded="xl"
    >            
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
          <v-card>            
          </v-card>
          <v-carousel
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
      
    </v-sheet>  
  </v-col>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// components
import MarketCarousel from '@/components/market/MarketCarousel.vue'
import MarketDesc from '@/components/market/MarketDesc.vue'
import MarketChart from '@/components/market/MarketChart.vue'

// models
import { MarketDescModel } from '@/models/market'

@Component({
  components: {
    MarketCarousel,
    MarketDesc,
    MarketChart
  }
})
export default class Market extends Vue {
    private colors: Array<string> = [
    'grey lighten-2',
    'grey lighten-2',
    'grey lighten-2',    
  ]

  private slides: MarketDescModel[] = [
    {
      market: 'KOPSI',
      close: '2233',
      trans: '23112'
    },
    {
      market: 'nyse',
      close: '265442',
      trans: '221223'
    },
    {
      market: 'codma',
      close: '2254',
      trans: '2322454'
    }
  ]
}

</script>
