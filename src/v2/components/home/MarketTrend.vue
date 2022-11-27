<template>
  <div>
    <v-card-text v-if="!market.loading && !marketValuation.loading">      
      <MarketTrendFactory
        :computedMarket="computedMarket.kospi"
        :valuation="marketValuation.data[0]"
        contry="korea"
      />

      <MarketTrendFactory
        :computedMarket="computedMarket.nasdaq"
        :valuation="marketValuation.data[1]"
        contry="usa"
      />

      <MarketTrendFactory
        :computedMarket="computedMarket.usdkrw"
        :valuation="marketValuation.data[3]"
        contry="korea"
      />

      <MarketTrendFactory
        :computedMarket="computedMarket.snp500"
        :valuation="marketValuation.data[2]"
        contry="usa"
      />
    </v-card-text>
    <ProgressCircular v-else />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import MarketChart from "@/v2/components/home/MarketChart.vue";
import MarketTrendFactory from "@/v2/components/home/MarketTrendFactory.vue";
import StoreMixin from "@/mixins/StoreMixin.vue";
import ProgressCircular from "@/v2/components/vuetify/ProgressCircular.vue";


export interface ComputedMarket {
  close?: number;
  recent?: string;
  color: string;
  sparkLineDatas: number[];
  type?: string;
  trendIcon?: string;
  trendIconColor?: string;
  changes: number;
}

interface IMarket {
  kospi?: ComputedMarket;
  nasdaq?: ComputedMarket;
  usdkrw?: ComputedMarket;
  snp500?: ComputedMarket;
}

const marketTypes = ["kospi", "nasdaq", "usdkrw", "snp500"];

@Component({
  components: {
    MarketChart,
    MarketTrendFactory,
    ProgressCircular,
  },
})
export default class MarketTrend extends StoreMixin {

  createComputedMarketContent(marketType: string): ComputedMarket {
    const { changes, close } = this.marketRecents[marketType];
    return {
      ...this.marketRecents[marketType],
      color: (changes / 100) * close > 0 ? "red--text" : "blue--text",
      sparkLineDatas: this.market.data[marketType].values
        .slice(-12)
        .map((value: { close: number }) => value.close),
      type: marketType,
      trendIcon:
        changes > 0
          ? "fa-solid fa-arrow-trend-up"
          : "fa-solid fa-arrow-trend-down",
      trendIconColor: changes > 0 ? "red" : "blue",
    };
  }

  get computedMarket(): IMarket {
    return marketTypes.reduce((acc, cur) => {
      acc[cur] = this.createComputedMarketContent(cur);
      return acc;
    }, {});
  }
}
</script>
