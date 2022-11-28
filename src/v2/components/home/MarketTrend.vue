<template>
  <div>
    <v-card-text v-if="!market.loading && market.data && !marketValuation.loading">      
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
  color?: string;
  sparkLineDatas?: number[];
  type?: string;
  trendIcon?: string;
  trendIconColor?: string;
  changes?: number;
}

interface IMarket {
  kospi?: ComputedMarket
  nasdaq?: ComputedMarket
  usdkrw?: ComputedMarket
  snp500?: ComputedMarket
}

const marketTypes = ["kospi", "nasdaq", "usdkrw", "snp500"];

const marketMapping = {
	'KOSPI': 'kospi',
	'NASDAQ': 'nasdaq',
	'S&P500': 'snp500',
	'US1YT': 'us1yt',
	'US5YT': 'us5yt',
	'US10YT': 'us10yt',
	'USD/KRW': 'usdkrw'
}

@Component({
  components: {
    MarketChart,
    MarketTrendFactory,
    ProgressCircular,
  },
})
export default class MarketTrend extends StoreMixin {

  get marketRecents () {
		const market = this.market.data

		return Object.values(marketMapping)?.reduce((acc, cur) => {
			acc[cur] = {
				close: market[cur].values.at(-1).close || 0,
				changes: market[cur].values.at(-1).changes || 0,
			}
			return acc
		}, {
      kospi: {}
    })    
  }

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
    if(this.market.loading) return {
      kospi: {},
      nasdaq: {},
      usdkrw: {},
      snp500: {}
    }
    return marketTypes.reduce((acc, cur) => {
      acc[cur] = this.createComputedMarketContent(cur);
      return acc;
    }, {});
  }

}
</script>
