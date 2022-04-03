<template>
  <v-col cols="2">
    <v-sheet      
      v-if="loaded"         
      rounded="lg">
      <v-list                 
        color="transparent">
        <v-list-item                   
          v-for="stock in stocks.slice(0, 10)"                  
          :key="stock.code"                  
          link
        >
          <v-list-item-content
            @click="searchStock" 
          >                                        
            <v-list-item-title>
              {{ stock.title }} 
            </v-list-item-title> 
            <v-list-item-subtitle>
              {{ stock.code}}  
            </v-list-item-subtitle>                   
          </v-list-item-content>
          
        </v-list-item>

        <v-divider class="my-2"></v-divider>
      </v-list>              
    </v-sheet>            
    <v-progress-circular
      v-else
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-col>  
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { StockSimpleModel } from '@/models/stock';

const StockStoreModule = namespace('StockStore')


@Component
export default class TopList extends Vue{
  @StockStoreModule.State('loaded')
  private loaded!: boolean

  @StockStoreModule.State('title')
  private title!: string

  @StockStoreModule.State('stocks')
  private stocks!: StockSimpleModel[]

  @StockStoreModule.Action('todayMarket')
  private todayMarket!: () => void

  @StockStoreModule.Action('searchContents')
  // eslint-disable-next-line no-unused-vars
  private searchContents!: (payload: string) => void

  private searchStock(arg: any) {
    if(typeof arg.target.innerHTML === 'string') 
      this.searchContents(arg.target.innerHTML)
  }
}
</script>