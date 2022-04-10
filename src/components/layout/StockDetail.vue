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
            :color="active ? 'grey lighten-1' : 'grey darken-3'"
            class="ma-4"
            height="210"
            width="480"
            @click="toggle"
          >
            
            <!-- <v-card-title               
              class="pa-2"
              color="grey-lighten-1">
              {{ titles[n-1]}}              
            </v-card-title>                     -->
              <div v-if="!loading">
                <!-- <market-chart color="white" /> -->
                <test-chart       
                  :options="options"            
                  :chartData="createChart(titles[n-1])"                  
                  :height="170"/>
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
      ></v-card>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { LineChartModel } from '@/models/stock'

import MarketChart from '@/components/market/MarketChart.vue'
import StockInfo from '@/components/detail/StockInfo.vue'
import DetailChart from '@/components/detail/DetailChart.vue'
import TestChart from '@/components/TestChart.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    MarketChart,
    StockInfo,
    DetailChart,
    TestChart
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
  
  @StockStoreModule.Action('searchContents')
  private searchContent!: (code: string) => void

  @StockStoreModule.State('stockChart')
  private stockChart!: Array<LineChartModel>

  private reveal = false
  private model = null
  private titles: Array<string> = [
    '주가',
    '매출액',
    '영업이익',
    'EPS'
  ]

  private options = {
    plugins: {
      title: {
        display: true,
        text: 'test..'
      }
    },
    maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: 'red'
        }
      } ,      
      yAxes: [
        {
          ticks: {
            
          },
        },
      ],
    },    
  }
    
  private createChart(label: string): object {
    return {
      labels: this.stockChart.map((stock: LineChartModel) => stock.date),
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
            "rgba(255,255,255,1)",
            // "rgba(54, 162, 235, 1)",
            // "rgba(255, 206, 86, 1)",
            // "rgba(75, 192, 192, 1)",
            // "rgba(153, 102, 255, 1)",
            // "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 5,        
        }
      ]
    }
  }

  created () {  
    this.searchContent(this.code)
  } 
  
}
</script>

<style>
  .v-card-title {
    position: absolute;    
  }
</style>