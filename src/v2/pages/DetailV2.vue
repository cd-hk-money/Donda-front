<template>
  <v-row>
    <v-col cols="12" xl="4" lg="4">        
      <stock-info :keys="componentKey + 1"/>           
      <stock-score :keys="componentKey + 3"/>     
      <stock-indicator :keys="componentKey + 2"/>    
    </v-col>    
    <v-col cols="12" xl="8" lg="8">
      <stock-chart :keys="componentKey + 4"/>
      <!-- <stock-finance :keys="componentKey + 5"/>         -->
      <v-row>
        <v-col cols="12" xl="6" lg="6" sm="12">
          <stock-similar :keys="componentKey + 7"/>
        </v-col>
        <v-col cols="12" xl="6" lg="6" sm="12">
          <stock-news :keys="componentKey + 8"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import StockInfo from '@/v2/components/detail/StockInfo.vue'
import StockChart from '@/v2/components/detail/Stock.vue'
import StockFinance from '@/v2/components/detail/StockFinance.vue'
import StockScore from '@/v2/components/detail/StockScore.vue'
import StockIndicator from '@/v2/components/detail/StockIndicator.vue'
import StockSimilar from '@/v2/components/detail/StockSimilar.vue'
import StockNews from '@/v2/components/detail/StockNews.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockInfo,
    StockChart,
    StockFinance,
    StockScore,
    StockIndicator,
    StockSimilar,
    StockNews
  }
})
export default class DetailV2 extends Vue { 

  @StockStoreModule.Action('getStock')
  readonly getStock!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockGraphDefault')
  readonly getStockGraphDefault!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockStatement')
  readonly getStockStatement!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockStatementAll')
  readonly getStockStatementAll!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockIndicator')
  readonly getStockIndicator!: (name: string) => Promise<void>



  public componentKey = 1

  forceRender() {
    this.componentKey += 1
  }
  @Watch('$route')
  watchRoute() {    
    const title = this.$route.params.title
    this.getStock(title)
    this.getStockGraphDefault(title)
    this.getStockStatement(title)
    this.getStockStatementAll(title)
    this.getStockIndicator(title)
  }  
}
</script>