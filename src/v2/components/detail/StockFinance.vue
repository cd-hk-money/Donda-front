<template>
  <div>
    <v-card 
      class="overflow-y-auto stock-indicator-detail"    
      outlined
      width="100%"
      height="787"
    >
      <v-card-title>
        재무제표
      </v-card-title>
      <v-card-subtitle>
        각 재무제표가 의미하는 바를 알아보세요.
      </v-card-subtitle>

      <v-divider></v-divider>

      <v-sheet
        v-if="!loaded"
        class="ml-5 d-flex flex-wrap justify-center"        
        width="100%"    
      >
      <v-card
        height="266.5"
        :width="height > 500 ? 322.9 : 500"
        outlined
        v-for="(type, index) in statementTypes.slice(0, 9)"
        :key="index"
        @click.stop="[dialog = true, dialogType = types[index]]"
      >
        <v-card-title>
          {{ types[index] }}
          <span>
            <v-btn  
              class="ml-2"
              icon
              right
              x-small
            ><v-icon>fa-solid fa-circle-info</v-icon>
            </v-btn>  
          </span>
        </v-card-title>
  
        <v-card-text>
          <stock-finance-bar-chart
            class="ml-5 mr-5"
            :key="index"
            :chartData="statement[type]"          
            :height="height > 500 ? 300 : 180"
          />
        </v-card-text>
      </v-card>
  
      <v-dialog      
        :style="dialogStyle"
        max-width="800"
        min-height="500"
        v-model="dialog"      
        overlay-opacity="0.2"      
      >
        <v-card         
          max-width="800"
          min-height="500"
          outlined      
        >
          <v-card-title class="font-weight-bold">
            {{ dialogType }}
          </v-card-title>

          <stock-finance-line-chart 
            class="mr-5"            
            :type="dialogType"
            :title="title"
            :height="200"
          />  
          <v-divider></v-divider>
        </v-card>
      </v-dialog>

      </v-sheet>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

import StockFinanceBarChart from '@/v2/components/detail/StockFinanceBarChart.vue'
import StockFinanceLineChart from '@/v2/components/detail/StockFinanceLineChart.vue'
import { ISimpleChartData } from '@/models/stock'

// import StockFinanceChart from '@/v2/components/detail/StockFinanceChart.vue'

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    StockFinanceBarChart,
    StockFinanceLineChart
  }
})
export default class StockFinance extends Vue {

  model = 0
  dialog = false
  dialogType = ''
  dialogStyle = {
    'margin-left': '20px'
  }

  types = [
    '자산총계',              // asset
    '자본총계',              // equity
    '자본총계(비지배)',      // equity_non
    '부채총계',             // liability
    '유동자산',             // current_asset
    '당기순이익',           // profit
    '당기순이익(비지배)',   // profit_non
    '매출액',              // revenue
    '현금흐름',            // cash
    '영업이익',            // ebitda
    '영업총이익',          // gross_margin    
  ]

  get title () {
    return this.$route.params.title
  }

  get height () {
    return mobileHeight(this.$vuetify.breakpoint.name)
  }

  @StockStoreModule.State('statement') statement!: ISimpleChartData
  @StockStoreModule.State('statementTypes') statementTypes!: string[]
  @StockStoreModule.State('statementLoaded') loaded!: boolean
  @StockStoreModule.State('statementAll') statementAll!: ISimpleChartData
  @StockStoreModule.Action('getStockStatement') readonly getStockStatement!: (name: string) => Promise<void>
  @StockStoreModule.Action('getStockStatementAll') readonly getStockStatementAll!: (name: string) => Promise<void>

  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: any

  async created() {        
    const code = this.$route.params.title
  
    await this.getStockStatement(code)
    await this.getStockStatementAll(code)    
  }
  
}

</script>