<template>
  <v-row :keys="componentKey">
    <v-col cols="12" xl="3" lg="4" md="4">        
      <StockInfo @drawerChange="drawerChange"/>           
      <StockScore @drawerChange="drawerChange"/>     
      <StockIndicator @drawerChange="drawerChange"/>    
    </v-col>    
    <v-col cols="12" xl="9" lg="8" class="mb-5">
      <v-card 
        :width="mobile ? '465' : '97%'"
        :height="mobile ? '100%' : 'auto'"
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
            class="vTab"
            active-class="cyan--text font-weight-bold vTab--active"        
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-divider />
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
            <div class="d-flex flex-warp">
              <stock-similar />
              <stock-news />
            </div>  
          </v-tab-item>

        </v-tabs-items>
      </v-card>
    </v-col>
    <v-menu
      open-on-hover
      offset-y
      v-if="mobile"
    >
      <template v-slot:activator="{ on, attrs}">
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
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          @click="menu.callback"
        >
          {{ menu.title }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import StockInfo from '@/v2/components/detail/stock/StockInfo.vue'
import StockFinance from '@/v2/components/detail/finance/StockFinance.vue'
import StockScore from '@/v2/components/detail/valuation/StockScore.vue'
import StockDrawer from '@/v2/components/detail/StockDrawer.vue'
import StockIndicator from '@/v2/components/detail/indicator/StockIndicator.vue'
import StockSimilar from '@/v2/components/detail/similar/StockSimilar.vue'
import StockNews from '@/v2/components/detail/similar/StockNews.vue'
import Stock from '@/v2/components/detail/stock/Stock.vue'
import StockValuation from '@/v2/components/detail/valuation/StockValuation.vue'
import StockIndicatorDetail from '@/v2/components/detail/indicator/StockIndicatorDetail.vue'

import { getStock, getStockEvaluation, getStockEvaluationDaily, getStockGraphAll, getStockGraphDefault, getStockIndicator, getStockIndicatorDaily, getStockIndicatorSector, getStockIndicatorSectorDaily, getStockNews, getStockSimilarContents, getStockStatement, getStockStatementAll, getStockVolume } from '@/store/payload'
import StoreMixin from '@/mixins/StoreMixin.vue'

const StockStoreModule = namespace('StockStore')

interface IMenu {
  icon?: string,
  tooltip?: string,
  color?: string
  link?: boolean 
  to?: string 
  callback?: () => void ,
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
    StockIndicatorDetail
  }
})
export default class DetailV2 extends StoreMixin { 

  // Datas
  drawer = 0
  tabItems = ['주가', '적정주가', '보조지표', '재무제표', '유사종목 및 뉴스']
  componentKey = 1 
  menus: IMenu[] = [
    {
      title: '주가',
      callback: () => this.drawerChange(0)
    },
    {
      title: '적정주가',
      callback: () => this.drawerChange(1)
    },
    {
      title: '보조지표',
      callback: () => this.drawerChange(2)
    },
    {
      title: '재무제표',
      callback: () => this.drawerChange(3)
    },
    {
      title: '유사종목 및 뉴스',
      callback: () => this.drawerChange(4)
    }
  ]
      
  @StockStoreModule.Action('getIndicatorSector') readonly getIndicatorSector!: (code: string) => Promise<void>  

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  statementTypes = ["asset", "equity", "equityNon", "liability", "currentAsset", "profit", "profitNon",
    "revenue", "cash", "ebitda","grossMargin"
  ]

  drawerChange (val: number | null) {        
    this.drawer = val
  }

  async fetchStock () {
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

    this.statementTypes.forEach(statementType => this.callRequest(getStockStatementAll(code, statementType)))    
  
  }

  mounted () {    
    this.drawer = 0
    this.fetchStock()
  }

}

</script>

<style>
.vTab {
  transition: font-size 0.1s;
}

.vTab--active {
  font-size: 16px;
}
</style>