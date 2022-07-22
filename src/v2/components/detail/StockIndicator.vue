<template>
    <v-card 
      class="ml-5 mr-5 mt-5"
      height="340"
      width="94%"
      outlined
    >     
      <v-card-title class="ml-5">
        보조 지표
        <v-btn  
          class="ml-3"
          icon
          right
          x-small
          @click="overlay = true"
        ><v-icon>fa-solid fa-circle-question</v-icon>
        </v-btn>
      </v-card-title>
  
      <v-card-subtitle class="ml-5">
        각 보조지표의 수치를 보여줍니다.  
      </v-card-subtitle>
      <v-responsive>
        <template v-if="!loaded">
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
                  width="250"
                  height="250"
                  elevation="0"
                  class="d-flex justify-center align-center">
                  <stock-indicator-chart 
                    :chartData="indicator"
                    :height="250"      
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
                  class="d-flex justify-center align-center"
                >                                
                  <stock-indicator-bar-chart 
                    type="eps"
                    :chartData="indicator.eps"
                    :width="150"
                    :height="200"      
                  />              
                  <stock-indicator-bar-chart
                    type="bps"
                    :chartData="indicator.bps"
                    :width="150"
                    :height="200"      
                  />              
                  <stock-indicator-bar-chart 
                    type="roe"
                    :chartData="indicator.roe"
                    :width="150"
                    :height="200"      
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
      </v-responsive>
      <v-overlay 
        :value="overlay"
        opacity="0.88"
        absolute
        height="300"
      >
        <div>
          각 보조지표의 의미는 무엇인가?
        </div>
        <div class="d-flex justify-center">
          <v-btn 
            bottom
            @click="overlay = false">
            닫기
          </v-btn>
        </div>
      </v-overlay>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import StockIndicatorChart from '@/v2/components/detail/StockIndicatorChart.vue'
import StockIndicatorBarChart from './StockIndicatorBarChart.vue'

import { ISimpleChartData } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockIndicatorChart,
    StockIndicatorBarChart
  }
})
export default class StockIndicator extends Vue {

  overlay = false

  @StockStoreModule.State('indicatorLoaded') loaded!: boolean
  @StockStoreModule.State('indicator') indicator!: ISimpleChartData

  @StockStoreModule.Action('getStockIndicator') readonly getStockIndicator!: (name: string) => Promise<void>

  created () {
    this.getStockIndicator(this.$route.params.title)
  }
}
</script> 

<style scoped>
.stockinfo-progress-circular {
  bottom: -100px;
  left: 30%;

}
</style>