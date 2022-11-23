<template>
  <div>
    <v-card
      v-if="!isMobile"
      class="overflow-y-auto stock-news"
      elevation="0"
      min-width="30vw"
      height="835"  
    >
      <v-card-title>주식 시장</v-card-title>  
      <v-card-subtitle>주식 시장 현황을 살펴보세요.</v-card-subtitle>        
    
      <v-divider />

      <MarketTrend/>    
    </v-card>

    <MarketTrend v-else/>
</div>
</template>

<script lang="ts">
  import DiviceMixin from '@/mixins/DiviceMixin.vue';
  import MarketTrend from '@/v2/components/home/MarketTrend.vue'
  import { Component } from 'vue-property-decorator';

  @Component({
    components: { MarketTrend }
  })
  export default class MarketTrendLayout extends DiviceMixin {}
</script>

<style>

</style>