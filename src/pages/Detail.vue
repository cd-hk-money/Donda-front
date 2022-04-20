<template>       
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
        <news />
        <similar />         
      </v-col>          
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import SideBar from '@/layout/SideBar.vue'
import TransList from '@/layout/TransList.vue'
import StockDetail from '@/layout/StockDetail.vue'
import News from '@/layout/News.vue'
import Similar from '@/layout/Similar.vue'

import { StockSimpleModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    TransList,
    StockDetail,
    SideBar,
    News,
    Similar
  }
})
export default class Trans extends Vue {

  @StockStoreModule.State('stocks')
  private stocks!: Array<StockSimpleModel>

  @StockStoreModule.Mutation('setCode')
  private setCode!:(code: string) => void

  @StockStoreModule.Mutation('setTitle')  
  private setTitle!:(code: string) => void
  
  private created (): void {           
    this.setCode(this.$route.params.code)   
    try{
      const stock = this.stocks.find((stock: StockSimpleModel) => stock.code === this.$route.params.code) as StockSimpleModel      
      this.setTitle(stock.title)
    } catch(e: any) {     
      this.$router.push({name: 'Home', params:{error: 'true'}})
    }   
  }    
}
</script>

<style scoped>
.main-content {
  margin-top: 30px;
}
</style>