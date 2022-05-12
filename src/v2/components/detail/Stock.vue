<template>
  <v-card     
    class="mt-8 ml-5 mr-5"
    height="500"
    rounded="xl"
    width="95%"
    v-if="!loaded"      
  >
    <v-row>      
      <v-col cols="12" xl="12" sm="12" class="d-flex justify-center align-center">
        <!-- <span class="text-h6 mr-2">
          시가 {{  stock.open.toLocaleString() }}
        </span>
        <span class="text-h6 mr-2">                  
          고가 {{  stock.high.toLocaleString() }}
        </span>
        <span class="text-h6 mr-2">
          저가 {{  stock.low.toLocaleString() }}
        </span>
        <span class="text-h6 mr-2">
          종가 {{  stock.close.toLocaleString() }}
        </span>           
        <span class="text-h6 mr-2">
          거래량 {{ stock.amount.toLocaleString() }}
        </span>  -->
      </v-col>
    </v-row> 
    <v-divider></v-divider>
    <v-carousel
      height="auto"
      cycle
      hide-delimiter-background
      show-arrows-on-hover    
      hide-delimiters  
      interval="200000"
    >
      <v-carousel-item
        v-for="i in 2"
        :key="i"
      >        
        <v-card height="auto">                             
          <v-divider></v-divider>
          <stock-chart 
            class="ml-5 mr-5 mt-10"                      
            :height="160"
            :chartData="stockGraphDefault"
          />
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import StockChart from '@/v2/components/detail/StockChart.vue'
import { IStockModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockChart
  }
})
export default class Stock extends Vue {
  
  @StockStoreModule.State('stockGraphDefault')
  stockGraphDefault!: any

  @StockStoreModule.State('stock')
  stock!: IStockModel

  @StockStoreModule.State('stockGraphDefaultLoaded')
  loaded!: boolean

  @StockStoreModule.Action('getStockGraphDefault')
  getStockGraphDefault!: (name: string) => Promise<void>

  created () {
    this.getStockGraphDefault(this.$route.params.title)    
  }
}

</script>