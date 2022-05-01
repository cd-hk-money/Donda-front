<template>
  <v-card 
    class="mt-5"
    rounded="xl"
    width="256"    
    min-height="573"        
  >      
    <v-card-title v-if="loaded">
    </v-card-title>
  </v-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IMarketRanksContents } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component
export default class InterestToggle extends Vue {
  
  @StockStoreModule.State('dailySimpleRanks')
  private dailySimpleRanks!: IMarketRanksContents

  @StockStoreModule.State('dailySimpleRanksLoaded')
  private loaded!: boolean

  @StockStoreModule.Action('getDailySimpleRanks')
  private getDailySimpleRanks!: () => Promise<void>

  created() {
    this.getDailySimpleRanks()
  }
  
}
</script>