<template>
  <div>
    <v-row>
      <v-col cols="12" xl="4" lg="4">        
        <stock-info />        
        <stock-news />
      </v-col>    
      <v-col cols="12" xl="8" lg="8">
        <stock-chart />
        <stock-finance />        
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import StockInfo from '@/v2/components/detail/StockInfo.vue'
import StockChart from '@/v2/components/detail/Stock.vue'
import StockFinance from '@/v2/components/detail/StockFinance.vue'
import StockNews from '@/v2/components/detail/StockNews.vue'

@Component({
  components: {
    StockInfo,
    StockChart,
    StockFinance,
    StockNews
  }
})
export default class DetailV2 extends Vue { 
  
}
</script>