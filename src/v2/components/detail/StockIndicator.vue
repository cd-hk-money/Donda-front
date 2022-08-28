<template>
    <v-card 
      class="ml-5 mt-5"
      height="340"
      width="465"            
      outlined
    >     
      <v-card-title class="ml-5">
        보조 지표        
      </v-card-title>
  
      <v-card-subtitle class="ml-5">
        각 보조지표의 수치를 보여줍니다.  
      </v-card-subtitle>

      <v-row>
        <v-col cols="12" xl="8">
          <template v-if="!loaded && !stockLoaded && !sectorLoaded">
            <v-carousel 
              cycle
              hide-delimiter-background
              show-arrows-on-hover
              hide-delimiters
              interval="10000000"
              height="280"        
            >
              <v-carousel-item >          
                <div class="d-flex justify-center align-center">
                  <v-card 
                    width="500"
                    height="250"
                    elevation="0"
                    class="d-flex justify-center align-center ml-3"
                  >
                    <stock-indicator-chart                       
                      :chartData="indicator"
                      :height="230"      
                    />         
                  </v-card>
                </div>        
              </v-carousel-item>
        
              <v-carousel-item>        
                <div class="d-flex justify-center align-center">
                  <v-card 
                    width="250"
                    height="250"
                    elevation="0"
                    class="d-flex justify-center align-center mr-2"
                  >                                
                    <stock-indicator-bar-chart 
                      type="eps"
                      :chartData="indicator.eps"
                      :width="130"
                      :height="235"      
                    />     
                    <stock-indicator-bar-chart
                      type="bps"
                      :chartData="indicator.bps"
                      :width="130"
                      :height="235"      
                    />              
                    <stock-indicator-bar-chart 
                      type="roe"
                      :chartData="indicator.roe"
                      :width="130"
                      :height="235"      
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
        <v-col cols="12" xl="4" lg="5" sm="12" md="12" xs="12" class="text-center align-center mt-3">
          <div class="text-h4">
            
          </div>
          <div> 
            <span>
              
            </span>            
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
        </v-col>
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


  // state
  @StockStoreModule.State('indicatorLoaded') loaded!: boolean
  @StockStoreModule.State('indicatorSectorLoaded') sectorLoaded!: boolean
  @StockStoreModule.State('stockLoaded') stockLoaded!: boolean
  @StockStoreModule.State('indicator') indicator!: ISimpleChartData
  @StockStoreModule.State('indicatorSector') indicatorSector!: IStockIndicatorSectorModel
  @StockStoreModule.State('indicatorSectorDaily') indicatorSectorDaily!: IStockIndicatorSectorDailyModel


  // action
  @StockStoreModule.Action('getStockIndicator') readonly getStockIndicator!: (name: string) => Promise<void>
  @StockStoreModule.Action('getIndicatorSector') readonly getIndicatorSector!: (code: string) => Promise<void>


  // methods
  drawerChange () {
    this.$emit('drawerChange', 4)
  }
  
  async created () {
    const code = this.$route.params.title
    await this.getStockIndicator(code)
    await this.getIndicatorSector(code)
    
  }
}
</script> 

<style scoped>
.stockinfo-progress-circular {
  bottom: -100px;
  left: 30%;

}
</style>