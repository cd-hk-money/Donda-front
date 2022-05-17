<template>
  <v-row>
    <v-col cols="12" xl="4" lg="4">        
      <stock-info :keys="componentKey + 1"/>           
      <stock-score @drawerChange="drawerChange" :keys="componentKey + 3"/>     
      <stock-indicator :keys="componentKey + 2"/>    
    </v-col>    
    <v-col cols="12" xl="8" lg="8">
      <stock-drawer 
        :keys="componentKey + 4"
        @drawerChange="drawerChange" :drawer="drawer" 
      />
      <v-menu
        open-on-hover
        offset-y
      >
        <template v-slot:activator="{ on, attrs}">
          <v-btn 
            elevation="5"
            small
            absolute
            bottom
            fab          
            v-on="on"
            v-bind="attrs"
            class="mb-15 ml-10"
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
    </v-col>
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
    StockDrawer
  }
})
export default class DetailV2 extends Vue { 

  @StockStoreModule.Action('getStock')
  readonly getStock!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockGraphDefault')
  readonly getStockGraphDefault!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockGraphAll')
  readonly getStockGraphAll!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockStatement')
  readonly getStockStatement!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockStatementAll')
  readonly getStockStatementAll!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockIndicator')
  readonly getStockIndicator!: (name: string) => Promise<void>

  drawer = 0
  componentKey = 1

  menus: IMenu[] = [
    {
      title: '주가',
      callback: () => this.drawerChange(0)
    },
    {
      title: '재무제표',
      callback: () => this.drawerChange(1)
    },
    {
      title: '추천종목',
      callback: () => this.drawerChange(2)
    }
  ]

  stockLoad(title: string) {
    this.getStock(title)
    this.getStockGraphAll(title)
    this.getStockGraphDefault(title)
    this.getStockStatement(title)
    this.getStockStatementAll(title)
    this.getStockIndicator(title)
    this.drawer = 0
  }

  created () {
    this.stockLoad(this.$route.params.title)
  }

  drawerChange (val) {
    this.drawer = val
  }

  forceRender() {
    this.componentKey += 1
  }
  @Watch('$route')
  watchRoute() {    
   this.stockLoad(this.$route.params.title)
  }  


}
</script>