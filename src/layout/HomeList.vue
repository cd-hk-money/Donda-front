<template>   
  <v-card 
    class="mt-mb-2 grey darken-3"    
    rounded="xl"
    max-width="100%"
  >  
      <v-list two-line>
      <v-list-item>        
        <v-list-item-content>
          <v-list-item-title>이준하</v-list-item-title>          
          <v-list-item-subtitle>ruddud1123@naver.com</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <stock-search />
        </v-list-item-action>
      </v-list-item>    
    </v-list> 
    <v-carousel      
      class="grey darken-3"        
      cycle
      delimiter-icon="mdi-minus"
      hide-delimiter-background
      show-arrows-on-hover      
      height="44.9vh"
    >    
      <v-carousel-item        
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"          
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h2 white--text font-weight-bold">
              {{ slide }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>      
    </v-carousel>     
  </v-card>   
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// components
import StockSearch from '@/layout/StockSearch.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockSearch
  }
})
export default class HomeList extends Vue {

  @StockStoreModule.State('loaded')
  private loaded!: boolean

  private full = false

  private colors = [
    'secondary',
    'secondary',
    'secondary',
    'secondary'
  ]
  
  private slides = [
    '관심종목1',
    '관심종목2',
    '관심종목3',
    '관심종목4',      
  ]

  private cycle = false
}
</script>