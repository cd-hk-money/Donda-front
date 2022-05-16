<template>
  <v-card     
    class="mt-8 ml-5 mr-5 mb-5"
    height="875"
    rounded="xl"
    width="95%"
    v-if="!loaded"      
  >
    <v-card-title>
      주가
    </v-card-title>
    <v-card-subtitle>
      {{ stock.name }}의 주가 정보를 확인해보세요.
    </v-card-subtitle>
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
            :height="280"
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