<template>
  <v-card
    dark
    class="mx-auto"    
  >    
    <v-row>      
      <v-col cols="12" sm="10">
        <v-card-text>                  
          <div class="text-h6" style="color: grey;">{{ code }}</div>
          <span class="text-h4 font-weight-bold">
            {{ title }}
          </span>                          
        </v-card-text>
      </v-col>
      <v-col cols="12" sm="5">
      </v-col>
    </v-row>
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
          height="200"
          tile
          rounded="xl"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <h3 class="text-h6">
              {{ titles[model]}} 자세한 정보들..
            </h3>
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

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    MarketChart
  }
}) 
export default class StockDetail extends Vue {

  @StockStoreModule.State('code')
  private code!: string 

  @StockStoreModule.State('title')
  private title!: string 

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
  
}
</script>