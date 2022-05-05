<template>
  <v-card     
    class="mt-10 ml-10"
    height="500"
    rounded="xl"
    outlined        
  >
    <v-carousel
      height="auto"
      v-if="!loaded"      
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
          <stock-chart 
            class="ml-5 mr-5"                      
            :height="'200'"
          />
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace} from 'vuex-class'
import StockChart from '@/v2/components/detail/StockChart.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockChart
  }
})
export default class Stock extends Vue {
  
  @StockStoreModule.State('stockGraphDefault')
  private stockGraphDefault: any

  @StockStoreModule.State('stockGraphDefaultLoaded')
  private loaded!: boolean

  @StockStoreModule.Action('getStockGraphDefault')
  private getStockGraphDefaultLoaded!: (name: string) => Promise<void>

  created () {
    this.getStockGraphDefaultLoaded(this.$route.params.title)
  }
}

</script>