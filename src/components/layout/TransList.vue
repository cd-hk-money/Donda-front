<template>
  <v-card    
    dark  
  >
    <v-list                   
      two-line>
      <v-list-item-group>
        <template v-for="(item, index) in items">            
          <v-list-item  
            class="ranking-content"            
            :key="item.code"    
            :to="`/detail/${item.code}`"
            replace         
          >
                <v-list-item-avatar>
                  <p class="text-h4 font-weight-bold">{{ index + 1 }}</p>
                </v-list-item-avatar>            
                <v-list-item-content>                
                  <v-list-item-title 
                    class="text-h5"
                    v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle                  
                    v-text="item.code"
                  ></v-list-item-subtitle>                
                </v-list-item-content>                          
                <v-col cols="12" sm="2">
                  <p>₩ {{ item.stock }} </p> <p></p>
                </v-col>
                <v-col cols="12" sm="2">
                  <p>변동률 ...</p>
                </v-col>
              <v-list-item-action>                

                <v-icon                  
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>
              </v-list-item-action>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
      <v-container
        fluid
        class="text-center"
      >
        <v-btn @click="moreTran"          
          >
          <v-icon>
            mdi-arrow-down
          </v-icon>
        </v-btn>
      </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { StockSimpleModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component 
export default class TransList extends Vue {

  @StockStoreModule.Mutation('setCode')
  private setCode!:(code: string) => void

  @StockStoreModule.Mutation('setTitle')
  private setTitle!:(code: string) => void

  @StockStoreModule.Getter('getStocks')
  private getStocks!: Array<StockSimpleModel>
  
  @StockStoreModule.Action('searchContents')
  private readonly searchContents!:(code: string) => Promise<any>

  private count = 5
  private items: Array<StockSimpleModel> = []
  
  private moreTran(): void {
    this.items = this.getStocks.slice(0, this.count += 10)    
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 500)    
  }    

  created() {
    this.items = this.getStocks.slice(0, this.count += 5)
  }

}
</script>

<style scoped>
.ranking-content {
  height: 73px;
}
</style>