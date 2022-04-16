<template>
  <v-card
    dark
    class="mx-auto"    
  >    
    <stock-info />
    <v-divider></v-divider>
  
    <v-sheet
      class="mx-auto"
      elevation="8"
    >
      <v-row class="align-end">     
        <!-- <v-btn
          class="ma-1"
          :loading="loading"
          :disabled="loading"
          color="secondary"
          @click="refreshContent(code, requestDate + 1)"
        >
          날짜 선택
        </v-btn> -->

      </v-row>
      <term-select />           
      <v-slide-group
        v-model="model"
        class="pa-4"
        show-arrows
      >        
        <v-slide-item
          v-for="n in 4"
          :key="n"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? 'grey darken-4' : 'grey darken-4'"
            class="ma-4"
            height="220"
            width="480"                       
            @click="toggle" 
          >                      
            <div v-if="!loading">
              <!-- <market-chart color="white" /> -->
              <v-col col="12">
                <test-chart                                     
                  :chartData="createChartData(titles[n-1])"                  
                  :height="170"/>                               
              </v-col>              
            </div>
            <div v-else>
              <v-progress-linear
                v-if="loading"
                bottom
                height="10"
                absolute
                color="grey"
                indeterminate
                dark                  
              ></v-progress-linear>
            </div>              
          </v-card>
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>

        <v-sheet
          v-if="model != null"
          height="400"
          tile
          rounded="xl"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >            
            <v-card 
              class="grey darken-4"
              min-height="90%"
              min-width="90%"
              rounded="ml" 
            >                            
              <detail-chart />
            </v-card>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
    <v-divider></v-divider>
    <v-sheet>
      <v-card
        min-height="200"
      >

      </v-card>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { LineChartModel } from '@/models/stock'

import StockInfo from '@/components/detail/StockInfo.vue'
import DetailChart from '@/components/detail/DetailChart.vue'
import TermSelect from '@/components/detail/TermSelect.vue'

import TestChart from '@/pages/TestChart.vue'

const StockStoreModule = namespace('StockStore')

const year = new Date().getFullYear()

@Component({
  components: {
    StockInfo,
    DetailChart,
    TestChart,    
    TermSelect
  }
}) 
export default class StockDetail extends Vue {

  
  @StockStoreModule.State('code')
  private code!: string 

  @StockStoreModule.State('title')
  private title!: string 

  @StockStoreModule.State('loading')
  private loading!: boolean
  
  @StockStoreModule.State('requestDate')
  private requestDate!: string
  
  @StockStoreModule.State('stockChart')
  private stockChart!: Array<LineChartModel>

  @StockStoreModule.State('stockDetail')
  private stockDetail!: any

  @StockStoreModule.Action('searchContents')
  private searchContents!: (code: string) => Promise<any>

  @StockStoreModule.Mutation('updateRequestDate')
  private updateRequestDate!: (payload: number) => void

  private reveal = false
  private model = null
  private titles: Array<string> = [
    '주가',
    '매출액',
    '영업이익',
    'EPS'
  ]

    
  private createChartData(label: string): object {
    return {
      labels: this.stockChart
                .map((stock: LineChartModel) => stock.date.substr(5)),
      datasets: [ 
        { 
          label: label,
          data: this.stockChart.map((stock: LineChartModel) => stock.value),
          height: 30,
          fill: false,
          backgroundColor: [
            // "rgba(255, 99, 132, 0.2)",
            // "rgba(54, 162, 235, 0.2)",
            // "rgba(255, 206, 86, 0.2)",
            // "rgba(75, 192, 192, 0.2)",
            // "rgba(153, 102, 255, 0.2)",
            // "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            '#0097A7'
            // "rgba(255,255,255,1)",
            // "rgba(54, 162, 235, 1)",
            // "rgba(255, 206, 86, 1)",
            // "rgba(75, 192, 192, 1)",
            // "rgba(153, 102, 255, 1)",
            // "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 5,        
        }
      ],
    }
  }

  private refreshContent(code: string, requestDate: number): void {
    this.updateRequestDate(requestDate)
    this.searchContents(this.code).then(() => {
      console.log(typeof year)  
    })
  }

  created () {          
    this.refreshContent(this.code, 10)    
  } 
}
</script>

<style>
  .v-card-title {
    position: absolute;    
  }
</style>