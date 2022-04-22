<template>
  <v-card 
    class="grey darken-3"
    min-height="auto"
    max-height="auto"
    rounded="xl"
    dark    
    link
  >
    <v-slide-group
      v-model="model"
      class="pa-4 md"
      show-arrows
    >        
      <v-slide-item
        v-for="n in 4"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'grey darken-4' : 'grey darken-4'"
          class="ma-4 mt-1 "
          elevation="0"
          height="220"
          min-width="480"
          width="480"                       
          @click="toggle" 
        >                      
          <div v-if="!loading">
            <v-col col="12">
              <line-chart                                     
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
        class="grey darken-3"
        v-if="model != null"        
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
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import TermSelect from '@/components/detail/TermSelect.vue'
import DetailChart from '@/components/detail/DetailChart.vue'
import LineChart from '@/components/detail/LineChart.vue'

import { LineChartModel } from '@/models/stock'


const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    TermSelect,
    DetailChart,
    LineChart    
  }
})
export default class StockChart extends Vue {

  @StockStoreModule.State('loading') 
  private loading!: boolean  

  @StockStoreModule.State('stockChart')
  private stockChart!: Array<LineChartModel>

  private titles = [
    '주가',
    '매출액',
    '영업이익',
    'EPS'
  ]

  private model = null

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
}
</script>