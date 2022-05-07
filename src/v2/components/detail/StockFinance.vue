<template>
  <div>
    <v-card 
      v-show="!loaded"
      class="mt-5 ml-5"
      rounded="xl"
      outlined
      height="360"
      width="94%"
    >
      <v-carousel 
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
        height="100%"
        cycle
        v-model="model"
        interval="10000"
      >
        <v-carousel-item 
          v-for="(type, index) in statementTypes"
          :key="index"
        >
          <div class="text-center text-h4 mt-5 mb-5">
            {{ type.toUpperCase() }}
          </div>
          <stock-finance-chart
            class="ml-5 mr-5"
            :chartData="statement[type]"
            :type="type"
            :height="height > 500 ? 100 : 180"
          />

        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

import StockFinanceChart from '@/v2/components/detail/StockFinanceChart.vue'
import { ISimpleChartData } from '@/models/stock'

// import StockFinanceChart from '@/v2/components/detail/StockFinanceChart.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockFinanceChart
  }
})
export default class StockFinance extends Vue {

  model = 0

  @StockStoreModule.State('statement')
  statement!: ISimpleChartData

  @StockStoreModule.State('statementTypes')
  statementTypes!: string[]

  @StockStoreModule.State('statementLoaded')
  loaded!: boolean

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
    const title = this.$route.params.title

    this.getStockStatement(title).then(() => {
      this.getStockStatementAll(title)
    })
  }
  
}

</script>