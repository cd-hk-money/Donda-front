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
      <term-select @toogle="toogle"/>           
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
                  :chartData="stockChart" 
                  :label="titles[n-1]"                 
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
          height="auto"
          tile
          rounded="xl"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >                                    
            <detail-chart />
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>

    <v-divider></v-divider>
    
    <v-sheet>
      <v-row>
        <v-col cols="12" sm="8">
          <stock-finance-state />        
        </v-col>
        <v-col cols="12" sm="4">
          <stock-analysis />
        </v-col>
      </v-row>
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
import StockFinanceState from '@/components/detail/StockFinanceState.vue'
import StockAnalysis from '@/components/detail/StockAnalysis.vue'

import TestChart from '@/components/detail/LineChart.vue'

const StockStoreModule = namespace('StockStore')

const year = new Date().getFullYear()

@Component({
  components: {
    StockInfo,
    DetailChart,
    TestChart,    
    TermSelect,
    StockFinanceState,
    StockAnalysis
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
          borderColor: '#0097A7',
          borderWidth: 3,       
          radius: 5,
          pointStyle: 'rectRoundedr'
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

  public toogle (index: number): void {
    console.log('전달받음.', index)
  }
}
</script>

<style>
  .v-card-title {
    position: absolute;    
  }
</style>