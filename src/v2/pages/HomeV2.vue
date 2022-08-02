<template>
  <div>    
    <v-row class="mt-2">
      <v-col cols="12" xl="4" lg="4">
        <market />
        <market-trend />                
      </v-col>
      <v-col cols="12" xl="8" lg="8">
        <stock-recommend />      
      </v-col>
    </v-row>        
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Market from '@/v2/components/home/Market.vue'
import MarketTrend from '@/v2/components/home/MarketTrend.vue'
import StockRecommend from '@/v2/components/home/StockRecommend.vue'
import HomeNav from '@/v2/components/home/HomeNav.vue'

@Component({
  components: {
    Market,
    MarketTrend,
    StockRecommend,
    HomeNav
  }
})
export default class HomeV2 extends Vue {

}
</script>