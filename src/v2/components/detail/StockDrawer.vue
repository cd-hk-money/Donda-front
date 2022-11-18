<template>
  <v-card 
    :width="mobile ? '465' : '97%'"
    class="ml-5 mt-5 mr-5" 
  >
    <v-tabs
      v-show="!mobile"
      v-model="drawer"
      fixed-tabs
    >
      <v-tabs-slider color="cyan"></v-tabs-slider>

      <v-tab
        v-for="item in tabItems"
        :key="item"
        active-class="cyan--text"        
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="drawer">
      <v-tab-item>
        <stock />
      </v-tab-item>

      <v-tab-item>
        <stock-valuation />
      </v-tab-item>

      <v-tab-item>
        <stock-indicator-detail />
      </v-tab-item>

      <v-tab-item>
        <stock-finance :key="componentKey" />
      </v-tab-item>


      <v-tab-item>
        <v-row>
          <v-col cols="12" xl="6" lg="6" sm="12">
            <stock-similar />
          </v-col>
          <v-col cols="12" xl="6" lg="6" sm="12">
            <stock-news />
          </v-col>
        </v-row>
      </v-tab-item>

    </v-tabs-items>
  </v-card>

</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
import Stock from '@/v2/components/detail/stock/Stock.vue'
import StockSimilar from '@/v2/components/detail/similar/StockSimilar.vue'
import StockNews from '@/v2/components/detail/similar/StockNews.vue'
import StockFinance from '@/v2/components/detail/finance/StockFinance.vue'
import StockValuation from '@/v2/components/detail/valuation/StockValuation.vue'
import StockIndicatorDetail from './indicator/StockIndicatorDetail.vue'

@Component({
  components: {
    Stock,
    StockSimilar,
    StockNews,
    StockFinance,
    StockValuation,
    StockIndicatorDetail
  }
})
export default class StockDrawer extends Vue {

  // datas
  fab = false
  componentKey = 0
  tabItems = ['주가', '적정주가', '보조지표', '재무제표', '유사종목 및 뉴스']

  get width () {
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : '100%'
  }

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  @Prop() drawer!: number
  
  drawerChange(select: number) {
    this.$emit('drawerChange', select)
  }
  

}
</script>

<style>

</style>