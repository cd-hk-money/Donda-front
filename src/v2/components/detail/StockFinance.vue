<template>
  <div>
    <v-card 
      width="94%"
      class="mt-5 ml-5"      
    >
      <v-card-title>
        재무제표
      </v-card-title>
      <v-card-subtitle>
        재무제표
      </v-card-subtitle>
    </v-card>
    <v-card 
      v-show="!loaded"
      class="ml-5 d-flex flex-wrap justify-center"
      :height="height > 500 ? 800 : '100%'"
      width="94%"    
    >    
      <v-card
        height="266.5"
        :width="height > 500 ? 327.8 : 500"
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
            :chartData="statement[type]"          
            :height="height > 500 ? 300 : 180"
          />
        </v-card-text>
      </v-card>
  
      <v-dialog      
        class="ml-15"
        max-width="700"
        min-height="800"
        v-model="dialog"      
        overlay-opacity="0.2"      
      >
        <v-card         
          max-width="700"
          min-height="500"
          outlined
        >
          <v-card-title>
            {{ dialogType }}
          </v-card-title>
  
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

import StockFinanceBarChart from '@/v2/components/detail/StockFinanceBarChart.vue'
import { ISimpleChartData } from '@/models/stock'

// import StockFinanceChart from '@/v2/components/detail/StockFinanceChart.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockFinanceBarChart
  }
})
export default class StockFinance extends Vue {

  model = 0
  dialog = false
  dialogType!: string

  @StockStoreModule.State('statement')
  statement!: ISimpleChartData

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

  @StockStoreModule.State('statementTypes')
  statementTypes!: string[]

  @StockStoreModule.State('statementLoaded')
  loaded!: boolean

  @StockStoreModule.State('statementAll')
  statementAll!: ISimpleChartData

  @StockStoreModule.State('statementAllLoaded')
  loadedAll!: boolean

  @StockStoreModule.Action('getStockStatement')
  readonly getStockStatement!: (name: string) => Promise<void>

  @StockStoreModule.Action('getStockStatementAll')
  readonly getStockStatementAll!: (name: string) => Promise<void>

  get height () {
    return mobileHeight(this.$vuetify.breakpoint.name)
  }

  created() {        
    console.log('re')
    const title = this.$route.params.title

    this.getStockStatement(title).then(() => {
      this.getStockStatementAll(title).then(() => {
        console.log(this.statementAll)
      })
      console.log(this.statementTypes)
    })
  }
  
}

</script>