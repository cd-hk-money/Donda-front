<template>       
  <v-container>
    <v-row >
      <v-col            
        cols="12"
        sm="2"            
      >                    
      </v-col>                
        <side-bar />

      <v-col                      
        cols="12"
        sm="8"
      >       
        <v-sheet
          class="grey darken-2"
          min-height="800px"
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import SideBar from '@/components/layout/SideBar.vue'
import TransList from '@/components/layout/TransList.vue'
import StockDetail from '@/components/layout/StockDetail.vue'

import { StockSimpleModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    TransList,
    StockDetail,
    SideBar
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

<style scoped>
.main-content {
  margin-top: 30px;
}
</style>