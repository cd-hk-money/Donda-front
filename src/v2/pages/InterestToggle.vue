<template>
  <v-card 
    class="mt-5"
    rounded="xl"
    width="256"    
    min-height="573"        
  >      
    <v-card-title v-text="'MARCAP TOP 6'">      
    </v-card-title>
    <v-divider></v-divider>
    <v-list>
      <v-list-item    
        class="text-h5"
        v-for="(content, i) in dailySimpleRanks.marcap.slice(0, 7)"
        :key="i"
        @click="listClick(content[1])"        
      >   
        <span class="mr-3 font-weight-bold"> {{ i }}</span>     
        <v-list-item-content>          
          <v-list-item-title class="text-h7" v-text="content[1]"></v-list-item-title>
          <v-list-item-subtitle class="text-h9" v-text="content[0]"></v-list-item-subtitle>        
        <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IMarketRank } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component
export default class InterestToggle extends Vue {
  
  @StockStoreModule.State('dailySimpleRanks')
  private dailySimpleRanks!: IMarketRank

  @StockStoreModule.Action('getStock')
  private getStock!: (name: string) => Promise<void>

  private listClick(name: string) {
    this.getStock(name).then(() => {
      this.$router.push(`/detail/${name}`)
    })
  }
  
}
</script>