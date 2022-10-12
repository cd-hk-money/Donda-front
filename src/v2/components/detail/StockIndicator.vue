<template>
  <v-card 
    class="ml-5 mt-5"
    height="290"
    width="465"            
    outlined
  >     
    <v-card-title class="ml-5">
      보조 지표       
      <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn  
              v-on="on"
              v-bind="attrs"                
              icon                       
              @click="drawerChange"
            ><v-icon small>fa-solid fa-circle-question</v-icon>              
            </v-btn>
          </template>
          <span>자세히..</span>
        </v-tooltip> 
    </v-card-title>

    <v-card-subtitle class="ml-5">
      {{ stock.name }}의 보조지표를 확인해보세요.
    </v-card-subtitle>

    <v-card-text class="d-flex justify-center align-end">
      <v-carousel 
        v-if="!loaded && !stockLoaded && !sectorLoaded && !indicatorSectorLoaded && !indicatorDailyLoaded"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        hide-delimiters
        :show-arrows="false"
        interval="10000000"
        height="260"        
      >
        <v-carousel-item >          
          <div class="d-flex justify-center align-center">
            <v-card 
              width="500"
              height="180"
              elevation="0"
              class="d-flex justify-center align-center ml-3"
            >
              <stock-indicator-chart                       
                :chartData="indicatorChartData"
                :sector="indicatorSectorChartData"
                :height="180"      
              />         
            </v-card>
          </div>        
        </v-carousel-item>

      </v-carousel>
    
      <div class="text-center stockinfo-progress-circular" v-else>
        <v-progress-circular
          indeterminate
          color="#40E0D0"
        ></v-progress-circular>
      </div>
    </v-card-text>

  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import StockIndicatorChart from '@/v2/components/detail/StockIndicatorChart.vue'
import StockIndicatorBarChart from './StockIndicatorBarChart.vue'

import { ISimpleChartData, IStockIndicatorSectorDailyModel, IStockIndicatorSectorModel, IStockModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockIndicatorChart,
    StockIndicatorBarChart
  }
})
export default class StockIndicator extends Vue {

  overlay = false

  get width () {
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : 465
  }

  get indicatorScore () {    
    return this.indicatorSector
  }

  get indicatorChartData () {
    return {
      eps: this.indicator.eps?.value[0],
      bps: this.indicator.bps?.value[0],
      roe: this.indicator.roe?.value[0]
    }
  }

  get indicatorSectorChartData () {
    return {
      eps: this.indicatorSector?.sector_eps[3],                                
      bps: this.indicatorSector?.sector_bps[3],
      roe: this.indicatorSector?.sector_roe[3],      
    }
  }

  // get compareIndicator () {
  //   const origin = this.indicatorChartData.eps + this.indicatorChartData.bps / 20 + this.indicatorChartData.roe
  //   const sector = this.indicatorSectorChartData.eps + this.indicatorSectorChartData.bps / 20 + this.indicatorSectorChartData.roe
  //   const isHighVal = origin > sector
  //   const score = isHighVal ? (origin / sector * 100).toFixed(1) : (sector / origin * 100).toFixed(1)
  //   const text = isHighVal ? '평균 이상' : '평균 이하'
  //   const colorClass = isHighVal ? 'red--text' : 'blue--text'
    
  //   return { score, text, colorClass }

  // }
  
  @StockStoreModule.State('indicatorLoaded') loaded!: boolean
  @StockStoreModule.State('indicatorSectorLoaded') sectorLoaded!: boolean
  @StockStoreModule.State('stockLoaded') stockLoaded!: boolean  
  @StockStoreModule.State('indicatorDailyLoaded') indicatorDailyLoaded!: boolean
  @StockStoreModule.State('stock') stock!: IStockModel


  @StockStoreModule.State('indicator') indicator!: ISimpleChartData
  @StockStoreModule.State('indicatorSector') indicatorSector!: IStockIndicatorSectorModel
  @StockStoreModule.State('indicatorSectorLoaded') indicatorSectorLoaded!: boolean
  @StockStoreModule.State('indicatorSectorDaily') indicatorSectorDaily!: IStockIndicatorSectorDailyModel


  @StockStoreModule.Action('getStockIndicator') readonly getStockIndicator!: (name: string) => Promise<void>
  @StockStoreModule.Action('getStockIndicatorDaily') readonly getStockIndicatorDaily!: (stockcode: string) => Promise<void>
  @StockStoreModule.Action('getIndicatorSector') readonly getIndicatorSector!: (code: string) => Promise<void>  


  // methods
  drawerChange () {
    this.$emit('drawerChange', 4)
  }
  
  async mounted () {
    const stockcode = this.$route.params.title
    await this.getStockIndicator(stockcode)
    await this.getStockIndicatorDaily(stockcode) 
    await this.getIndicatorSector(stockcode) 
  }
}
</script> 

<style scoped>
.stockinfo-progress-circular {
  position: relative;
  transform: translateY(170%);
}
</style>