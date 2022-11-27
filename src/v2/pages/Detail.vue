<template>
  <div class="d-flex flex-wrap justify-space-between">
    <v-sheet
      :width="isMobile ? '100vw' : '465'"
      color="rgb(18, 18, 18)"
      :class="['mt-3', isMobile ? 'ml-5 mr-5' : '']"
    >
      <StockInfo @drawerChange="drawerChange" />
      <StockScore @drawerChange="drawerChange" />
      <StockIndicator @drawerChange="drawerChange" />
    </v-sheet>
    <div>
      <v-card 
        :width="isMobile ? '100vw' : '74.5vw'" 
        :class="['mt-3', isMobile ? 'ml-5 mr-5' : '']"
      >
        <v-tabs v-show="!isMobile" v-model="drawer" fixed-tabs>
          <v-tabs-slider color="cyan"></v-tabs-slider>

          <v-tab
            v-for="item in tabItems"
            :key="item"
            class="vTab"
            active-class="cyan--text font-weight-bold vTab--active"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-divider />

        <v-tabs-items v-model="drawer">
          <v-tab-item>
            <Stock />
          </v-tab-item>

          <v-tab-item>
            <StockValuation />
          </v-tab-item>

          <v-tab-item>
            <StockIndicatorDetail />
          </v-tab-item>

          <v-tab-item>
            <StockFinance />
          </v-tab-item>

          <v-tab-item>
            <div class="d-flex flex-warp">
              <StockSimilar />
              <StockNews />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
    <v-menu open-on-hover offset-y v-if="isMobile">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="5"
          x-large
          outlined
          fixed
          bottom
          right
          fab
          v-on="on"
          v-bind="attrs"
          class="mb-3 mr-5"
        ><v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(menu, i) in menus" :key="i" @click="menu.callback">
          {{ menu.title }}
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator"

import StockInfo from "@/v2/components/detail/stock/StockInfo.vue"
import StockFinance from "@/v2/components/detail/finance/StockFinance.vue"
import StockScore from "@/v2/components/detail/valuation/StockScore.vue"
import StockDrawer from "@/v2/components/detail/StockDrawer.vue"
import StockIndicator from "@/v2/components/detail/indicator/StockIndicator.vue"
import StockSimilar from "@/v2/components/detail/similar/StockSimilar.vue"
import StockNews from "@/v2/components/detail/similar/StockNews.vue"
import Stock from "@/v2/components/detail/stock/Stock.vue"
import StockValuation from "@/v2/components/detail/valuation/StockValuation.vue"
import StockIndicatorDetail from "@/v2/components/detail/indicator/StockIndicatorDetail.vue"

import {
  getStock,
  getStockDonda,
  getStockEvaluation,
  getStockEvaluationDaily,
  getStockGraphAll,
  getStockGraphDefault,
  getStockIndicator,
  getStockIndicatorDaily,
  getStockIndicatorSector,
  getStockIndicatorSectorDaily,
  getStockNews,
  getStockSimilarContents,
  getStockStatement,
  getStockStatementAll,
  getStockVolume,
} from "@/store/payload"
import { mixins } from "vue-class-component"

import DiviceMixin from "@/mixins/DiviceMixin.vue"
import StockStoreMixin from "@/mixins/StockStoreMixin.vue"

const statementTypes = [
  "asset",
  "equity",
  "equityNon",
  "liability",
  "currentAsset",
  "profit",
  "profitNon",
  "revenue",
  "cash",
  "ebitda",
  "grossMargin",
]

interface IMenu {
  icon?: string
  tooltip?: string
  color?: string
  link?: boolean
  to?: string
  callback?: () => void
  tile?: boolean
  enable?: boolean
  title?: string
}

@Component({
  components: {
    StockInfo,
    StockFinance,
    StockScore,
    StockIndicator,
    StockSimilar,
    StockNews,
    StockDrawer,
    Stock,
    StockValuation,
    StockIndicatorDetail,
  },
})
export default class Detail extends mixins(StockStoreMixin, DiviceMixin) {

  drawer = 0
  tabItems = ["주가", "적정주가", "보조지표", "재무제표", "유사종목 및 뉴스"]

  menus: IMenu[] = this.tabItems.map((item, i) => ({
    title: item,
    callback: () => this.drawerChange(i),
  }))

  drawerChange(val: number | null) {
    this.drawer = val;
    setTimeout(() => window.scrollTo(0, 900), 100)
  }

  fetchStock() {
    const code = this.$route.params.title

    this.callRequest(getStockGraphAll(code))
    this.callRequest(getStockGraphDefault(code))
    this.callRequest(getStockEvaluation(code))
    this.callRequest(getStockEvaluationDaily(code))
    this.callRequest(getStockGraphDefault(code))
    this.callRequest(getStock(code))
    this.callRequest(getStockStatement(code))
    this.callRequest(getStockNews(code))
    this.callRequest(getStockIndicator(code))
    this.callRequest(getStockIndicatorDaily(code))
    this.callRequest(getStockSimilarContents(code))
    this.callRequest(getStockIndicatorSector(code))
    this.callRequest(getStockIndicatorSectorDaily(code))
    this.callRequest(getStockVolume(code))
    this.callRequest(getStockDonda(code))

    statementTypes.forEach((statementType) =>
      this.callRequest(getStockStatementAll(code, statementType))
    )
  }

  mounted() {
    this.drawer = 0
    this.fetchStock()
  }
}
</script>
