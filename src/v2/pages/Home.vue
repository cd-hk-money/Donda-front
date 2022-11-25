<template>

  <!-- 홈페이지 레이아웃 -->
  <div class="d-flex mt-2 flex-wrap justify-space-around">
    
    <!-- 주식현황 레이아웃 -->
    <MarketTrendLayout />
  
    <!-- 추천 종목 -->
    <StockRecommend />      
  </div>

</template>

<script lang="ts">  
  import { Vue, Component } from 'vue-property-decorator'

  import MarketTrend from '@/v2/components/home/MarketTrend.vue'
  import StockRecommend from '@/v2/components/home/StockRecommend.vue'
  import MarketTrendLayout from '@/v2/components/home/MarketTrendLayout.vue';

  @Component({
    components: {
      MarketTrend,
      StockRecommend,
      MarketTrendLayout
    }
  })
  export default class HomeV2 extends Vue {}
</script>