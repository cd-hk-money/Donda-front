<template>
  <v-card     
    class="mt-5 ml-5 mr-5 mb-5"    
    outlined
    :width="width"                  
  >
    <v-card-title>
      주가
    </v-card-title>
    <v-card-subtitle>
      <span>{{ stock.name }}의 주가 정보를 확인해보세요.</span>
      <v-btn  
        class="ml-3"
        icon
        right
        x-small
      ><v-icon>fa-solid fa-circle-info</v-icon>
      </v-btn>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card
      elevation="0"
      height="50"
      class="d-flex justify-end align-center"
    > 
      <v-btn
        v-for="(menu, i) in menus"
        :key="i"
        icon
        class="mr-5"
        elevation="0"
        tile
        small
        v-model="menu.enable"
        @click="menu.callback"
      >
        <v-icon>{{ menu.icon }}</v-icon>
      </v-btn>
    </v-card>
    <v-divider></v-divider>
    <v-card-text v-if="!loaded">
      <stock-big-chart   
        :height="174"        
        :gradient="gradientEnable"
        :volume="volumeEnable"
      />        
    </v-card-text>  
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IStockModel } from '@/models/stock'
import { IMenu } from '@/v2/pages/MenuBar.vue'
import StockBigChart from '@/v2/components/detail/StockBigChart.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockBigChart
  }
})
export default class Stock extends Vue {
  
  count = 20
  dateOverlay = false

  get width (): string | number { 
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : '94%'
  }

  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('stockGraphAllLoaded') loaded!: boolean
  @StockStoreModule.State('stockGraphAllFlag') flag!: boolean  
  @StockStoreModule.Action('getStockGraphAll') getStockGraphAll!: (name: string) => Promise<void>
  @StockStoreModule.Action('getStockGraphDefault') getStockGraphDefault!: (name: string) => Promise<void>
  
  gradientEnable = true
  getGradient () { return this.gradientEnable }
  @Watch('gradientEnable')
  watchGradient () {
    const content = this.menus.find((menu: IMenu) => menu.title === 'gradient')
    content.enable = !content.enable
  }

  volumeEnable = false
  @Watch('volumeEnable')
  getVolumeEnable () { return this.volumeEnable }
  watchVolume () {
    const content = this.menus.find((menu: IMenu) => menu.title === 'volume')
    content.enable = !content.enable
  }

  menus: IMenu[] = [    
    {
      title: 'dateFicker',
      icon: 'mdi-calendar-expand-horizontal',
      callback: () => this.changeChartOptions({

      }),
      enable: false
    },
    {
      title: 'volume',
      icon: 'mdi-chart-bar',
      callback: () => this.changeChartOptions({
        volumeEnable: !this.getVolumeEnable()
      }),      
      enable: this.volumeEnable,
    },
    {
      title: 'gradient',
      icon: 'mdi-gradient-vertical',
      callback: () => this.changeChartOptions({
        gradientEnable: !this.getGradient()
      }),
      enable: this.gradientEnable,
    },        
  ]

  changeChartOptions(payload) {
    Object.entries(payload).forEach(state => {
      this[state[0]] = state[1]
    })         
  }

  mounted () {
    const title = this.$route.params.title
    this.getStockGraphDefault(title)  
    this.getStockGraphAll(title)
  }
  
}

</script>