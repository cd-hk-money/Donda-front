<template>
  <v-card
    dark
    class="mx-auto"    
  >    
    <stock-info />
    <v-divider></v-divider>
    <v-sheet
      class="mx-auto"
      elevation="8"
    >
      <v-slide-group
        v-model="model"
        class="pa-4"
        show-arrows
      >
        <v-slide-item
          v-for="n in 4"
          :key="n"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? 'grey lighten-1' : 'grey darken-3'"
            class="ma-4"
            height="210"
            width="480"
            @click="toggle"
          >
            <v-card-title color="grey-lighten-1">
              {{ titles[n-1]}}              
            </v-card-title>
            <market-chart color="white"/>
          </v-card>
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet
          v-if="model != null"
          height="400"
          tile
          rounded="xl"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >            
            <v-card 
              class="grey darken-4"
              min-height="90%"
              min-width="90%"
              rounded="ml" 
            >
              <v-card-title>
                {{ titles[model]}} 자세한 정보들..
              </v-card-title>
              <detail-chart />
            </v-card>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
    <v-divider></v-divider>
    <v-sheet>
      <v-card
        min-height="200"
      ></v-card>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import MarketChart from '@/components/market/MarketChart.vue'
import StockInfo from '@/components/detail/StockInfo.vue'
import DetailChart from '@/components/detail/DetailChart.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    MarketChart,
    StockInfo,
    DetailChart
  }
}) 
export default class StockDetail extends Vue {

  @StockStoreModule.State('code')
  private code!: string 

  @StockStoreModule.State('title')
  private title!: string 
  
  @StockStoreModule.Action('searchContents')
  private searchContent!: (code: string) => void

  private reveal = false
  private model = null
  private titles: Array<string> = [
    '주가',
    '매출액',
    '영업이익',
    'EPS'
  ]
  
  private labels: Array<string> = ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA']
  private time = 0

  created () {  
    this.searchContent(this.code)
  }
 
}
</script>