<template>
  <v-row :keys="componentKey">
    <v-col cols="12" xl="3" lg="4" md="4">        
      <stock-info/>           
      <stock-score @drawerChange="drawerChange"/>     
      <stock-indicator @drawerChange="drawerChange"/>    
    </v-col>    
    <v-col cols="12" xl="9" lg="8">
      <stock-drawer @drawerChange="drawerChange" :drawer="drawer"/>
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

  // Datas
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
      title: '유사종목 및 뉴스',
      callback: () => this.drawerChange(2)
    }
  ]

  @StockStoreModule.Action('getStock') getStock!: (name: string) => Promise<void>
  @StockStoreModule.Action('getStockGraphAll') getStockGraphAll!: (name: string) => Promise<void>
  @StockStoreModule.Action('getStockGraphDefault') getStockGraphDefault!: (name: string) => Promise<void>

  stockLoad(title: string) {    
    this.drawer = 0        
  }

  drawerChange (val: any) {        
    document.getElementById('stock-drawer').scrollIntoView()
    this.drawer = val
  }

  forceRender() {
    this.componentKey += 1
  }
  @Watch('$route')
  watchRoute() {        
    this.drawer = 0
    const code = this.$route.params.title
    this.getStock(code)   
    this.getStockGraphAll(code)
    this.getStockGraphDefault(code)
  }  

  created () {
    window.scrollTo(0, 0)
    this.stockLoad(this.$route.params.title)
  }
}
</script>