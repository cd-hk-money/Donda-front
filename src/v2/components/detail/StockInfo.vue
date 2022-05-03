<template>
  <div>
    <v-card 
      class="mt-10 ml-5 mr-5"
      height="20%"
      width="100%"
      rounded="xl"
      v-if="!loaded"    
    >    
      <v-list-item three-line>
        <v-list-item-content>
          <div class="mb-4">
            {{ stock.market }} 
          </div>
          <v-list-item-title class="text-h4 font-weight-bold m-1 ml-5">
            <span>{{ stock.name }}</span>                        
            <v-tooltip right>
              <template v-slot:activator="{on}">
                <v-icon v-on="on" size="30" class="ml-5" color="red">fa-solid fa-arrow-trend-up</v-icon>
              </template>
              <span class="red--text font-weight-bold">상승</span> 
              <span> 추세입니다.</span>
            </v-tooltip>
          </v-list-item-title>
          <v-list-item-subtitle class="text-h5 mb-1 ml-6">
            {{ stock.code }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar
          tile
          size="80"        
        >
          <v-btn icon>
            <v-icon>fa-flag</v-icon>
          </v-btn>
        </v-list-item-avatar>              
      </v-list-item>

      <v-divider></v-divider>    

      <v-row>
        <v-col cols="12" xl="5" lg="5">
          <v-card-title class="text-h5 font-weight-bold ml-5">
            <span>{{ stock.close.toLocaleString()}} ₩</span>
            <v-btn  
              class="ml-3"
              icon
              right
              x-small
            ><v-icon>fa-solid fa-circle-info</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle :class="['text-h6', 'font-weight-bold', 'ml-5', stock.changes > 0 ? 'red--text' : 'blue--text']">
            <span>{{ stock.changes > 0 ? '+' + stock.changes : stock.changes }} ({{ stock.changes_ratio > 0 ? '+' + stock.changes_ratio : stock.changes_ratio}}%)</span>                        
          </v-card-subtitle>                            
        </v-col>
        <v-col cols="12" xl="7" lg="7">
          <v-tooltip bottom>
            <template v-slot:activator="{on} ">
              <v-sheet 
                class="mt-3 mr-5"
                width="auto"
                max-height="100%"          
                v-on="on"
              >          
                <v-sparkline 
                  class="pl-2 pr-2 pt-2"
                  color="#40E0D0"
                  line-width="5"
                  smooth="100"
                  auto-draw
                  type="trend"
                  :value="sparkLineValue"
                ></v-sparkline>              
              </v-sheet>
            </template>
            <span>최근 1년간의 추이를 보여줍니다.</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { IStockModel } from '@/models/stock'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const StockStoreModule = namespace('StockStore')

@Component
export default class StockInfo extends Vue {
  @StockStoreModule.Action('getStock')
  private getStock!: (name: string) => Promise<void>

  @StockStoreModule.State('stock')
  private stock!: IStockModel

  @StockStoreModule.State('stockLoaded')
  private loaded!: boolean

  private sparkLineValue: Array<number> = []
    
  created () {
    this.getStock(this.$route.params.title)    
    this.sparkLineValue = [1, 11, 3, 4, 5, 7, 5, 9, 1, 5, 16]
  }
}
</script>