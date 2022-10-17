<template>
  <v-row class="mt-2">
    <v-col cols="12" xl="4" lg="4">
      <v-card max-height="835" class="ml-5 overflow-y-auto stock-news" v-if="!mobile">
        <v-card-title>
          주식 시장
        </v-card-title>          
        <v-card-subtitle>
          주식 시장 현황을 살펴보세요.
        </v-card-subtitle>
        <v-divider />
        <market-trend />
      </v-card>
      <market-trend v-else/>
    </v-col>
    <v-col cols="12" xl="8" lg="8" sm="12">
      <stock-recommend />      
    </v-col>
  </v-row>        
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
  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }
}
</script>