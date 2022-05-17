<template>
  <v-card     
    class="mt-8 ml-5 mr-5 mb-5"
    height="870"
    rounded="xl"
    width="95%"                  
  >
    <v-card-title>
      주가
    </v-card-title>
    <v-card-subtitle>
      {{ stock.name }}의 주가 정보를 확인해보세요.
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text v-if="!loaded">
      <stock-big-chart   
        :height="250"
      />        
    </v-card-text>  
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import StockBigChart from '@/v2/components/detail/StockBigChart.vue'
import { IStockModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockBigChart
  }
})
export default class Stock extends Vue {
  
  @StockStoreModule.State('stock')
  stock!: IStockModel

  @StockStoreModule.State('stockGraphDefaultLoaded')
  loaded!: boolean
  
  @StockStoreModule.Action('getStockGraphAll')
  getStockGraphAll!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockGraphDefault')
  getStockGraphDefault!: (name: string) => Promise<void>

  created () {
    this.getStockGraphDefault(this.$route.params.title)  
  }
  
}

</script>