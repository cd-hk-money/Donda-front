<template>
  <v-card 
    class="ml-5 mt-5"
    max-height="290"
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
      각 보조지표의 수치를 보여줍니다.  
    </v-card-subtitle>

    <v-row>
      <v-col cols="12" xl="12">
        <template v-if="!loaded && !stockLoaded && !sectorLoaded && !indicatorSectorLoaded && !indicatorDailyLoaded">
          <v-carousel 
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
        </template>
        <template v-else>
          <div class="text-center stockinfo-progress-circular">
            <v-progress-circular
              indeterminate
              color="#40E0D0"
            ></v-progress-circular>
          </div>
        </template>
      </v-col>  
      
      <!-- <v-col cols="12" xl="4" lg="5" sm="12" md="12" xs="12" class="text-center align-center mt-3">
        <div class="text-h4 mt-4">
          <span :class="compareIndicator.colorClass">
          {{ compareIndicator.score }} 
        </span> %
        </div>
        <div>             
          <span :class="compareIndicator.colorClass">
          {{ compareIndicator.text }}
        </span>
          입니다.
        </div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn  
              v-on="on"
              v-bind="attrs"
              class="ml-1"
              icon         
              @click="drawerChange"
            ><v-icon>fa-solid fa-circle-question</v-icon>              
            </v-btn>
          </template>
          <span>자세히..</span>
        </v-tooltip>
      </v-col> -->
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import StockIndicatorChart from '@/v2/components/detail/StockIndicatorChart.vue'
import StockIndicatorBarChart from './StockIndicatorBarChart.vue'

import { ISimpleChartData, IStockIndicatorSectorDailyModel, IStockIndicatorSectorModel } from '@/models/stock'

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
  bottom: -100px;
  left: 30%;
}
</style>