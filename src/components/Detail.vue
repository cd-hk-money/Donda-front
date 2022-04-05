<template>
  <v-app id="inspire">

    <v-main class="grey darken-4">              
      <v-container>
        <v-row >
          <v-col            
            cols="12"
            sm="2"            
          >                    
          </v-col>                              
          <v-col                      
            cols="12"
            sm="8"
          >       
            <v-sheet
              class="grey darken-2"
              min-height="910px"
              rounded="xl"
            >            
              <stock-detail />
            </v-sheet>               
          </v-col>        
          <v-col
            cols="12"
            sm="2"
          >        
          </v-col>          
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import NavBar from '@/components/layout/NavBar.vue'
import TransList from '@/components/layout/TransList.vue'
import StockDetail from '@/components/layout/StockDetail.vue'

import { StockSimpleModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    NavBar,
    TransList,
    StockDetail
  }
})
export default class Trans extends Vue {

  @StockStoreModule.State('stocks')
  private stocks!: Array<StockSimpleModel>

  private simpleStock!: StockSimpleModel | undefined

  private created (): void {
    // const code = this.$route.params.code
    // this.simpleStock = this.stocks.find((stock: StockSimpleModel) => stock.code === code)
  }
}
</script>