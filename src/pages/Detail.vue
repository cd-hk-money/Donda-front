<template>       
  <v-container >
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
          class="grey darken-4"
          min-height="auto"
          max-height="auto"       
        >         
          <v-row>
            <v-col cols="12" xl="2" ml="3">
              <stock-title :title="stockTitle"/>
            </v-col>

            <v-col cols="12" xl="10" ml="9">
              <stock-info />
            </v-col>
          </v-row>  
          <v-row>
            <v-col cols="12" xl="12">
              <stock-chart />
            </v-col>
          </v-row>  
          <v-row>
            <v-col cols="12" xl="8">
              <v-card class="grey darken-3" link rounded="xl" min-height="40vh">
                <v-card-title>
                  ㅇㅇ;;
                </v-card-title>
              </v-card>
            </v-col>

            <v-col cols="12" xl="4">
              <v-card class="grey darken-3" link rounded="xl" min-height="40vh">
                <v-card-title>
                  ㅇㅇ;;
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>        
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


// 재설계
import StockTitle from '@/components/detail/StockTitle.vue'
import StockInfo from '@/components/detail/StockInfo.vue'
import StockChart from '@/components/detail/StockChart.vue'

import { StockSimpleModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    TransList,
    StockDetail,
    SideBar,
    News,
    Similar,

    StockTitle,
    StockInfo,
    StockChart
    
  }
})
export default class Trans extends Vue {

  @StockStoreModule.State('stocks')
  private stocks!: Array<StockSimpleModel>

  @StockStoreModule.Action('searchContents')
  private searchContents!: (code: string) => Promise<any>
  
  private stockTitle!: {
    title: string
    code: string,
  }
  
  private created (): void {               
    try{
      this.searchContents(this.$route.params.code)
      const stock = this.stocks.find((stock: StockSimpleModel) => stock.code === this.$route.params.code) as StockSimpleModel            
      this.stockTitle = {
        title: stock.title,
        code: this.$route.params.code
      }
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