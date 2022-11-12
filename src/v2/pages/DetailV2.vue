<template>
  <v-row :keys="componentKey">
    <v-col cols="12" xl="3" lg="4" md="4">        
      <stock-info @drawerChange="drawerChange"/>           
      <stock-score @drawerChange="drawerChange"/>     
      <stock-indicator @drawerChange="drawerChange"/>    
    </v-col>    
    <v-col cols="12" xl="9" lg="8" class="mb-10">
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IMenu } from '@/v2/pages/MenuBar.vue'
import StockInfo from '@/v2/components/detail/StockInfo.vue'
import StockChart from '@/v2/components/detail/Stock.vue'
import StockFinance from '@/v2/components/detail/StockFinance.vue'
import StockScore from '@/v2/components/detail/StockScore.vue'
import StockDrawer from '@/v2/components/detail/StockDrawer.vue'
import StockIndicator from '@/v2/components/detail/StockIndicator.vue'
import StockSimilar from '@/v2/components/detail/StockSimilar.vue'
import StockNews from '@/v2/components/detail/StockNews.vue'
import Stock from '@/v2/components/detail/Stock.vue'
import StockValuation from '@/v2/components/detail/StockValuation.vue'
import StockIndicatorDetail from '@/v2/components/detail/StockIndicatorDetail.vue'

import { getStock, getStockGraphDefault } from '@/api/market'
import StoreMixin from '@/mixins/StoreMixin.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockInfo,
    StockChart,
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
  
  @StockStoreModule.Action('getStock') getStock!: (name: string) => Promise<void>
  @StockStoreModule.Action('getStockGraphAll') getStockGraphAll!: (name: string) => Promise<void>
  @StockStoreModule.Action('getSimilarContents') readonly getSimilarContent!: (code: string) => Promise<void>

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  drawerChange (val: number | null) {        
    this.drawer = val
  }


  @Watch('$route')
  watchRoute() {        
    this.drawer = 0
    const code = this.$route.params.title
    this.getStockGraphAll(code)

    this.getAPI(getStockGraphDefault(code))
    this.getAPI(getStock(code))
    
    this.getSimilarContent(code)

  }  

  mounted () {
    this.drawer = 0
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