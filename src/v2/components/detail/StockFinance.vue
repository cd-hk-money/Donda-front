<template>
  <div>
    <v-card 
      v-show="!loaded"
      class="mt-5 ml-10"
      rounded="xl"
      outlined
      height="360"
      width="95%"
    >
      <v-carousel 
        show-arrows-on-hover
        hide-delimiter-background
        height="100%"
      >
        <v-carousel-item 
          v-for="index in Object.keys(statement)"
          :key="index"
        >
          <v-sheet
            height="100%"
            tile
          >
            <!-- <stock-finance-chart               
            :label="index"  
            :data="index"
            /> -->
            
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script lang="ts">
import { IStockStatementModel } from '@/models/stock'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// import StockFinanceChart from '@/v2/components/detail/StockFinanceChart.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    // StockFinanceChart
  }
})
export default class StockFinance extends Vue {

  private model = 0

  @StockStoreModule.State('statement')
  private statement!: IStockStatementModel

  @StockStoreModule.State('statementLoaded')
  private loaded!: boolean

  @StockStoreModule.Action('getStockStatement')
  private getStockStatement!: (name: string) => Promise<void>

  created() {    
    this.getStockStatement(this.$route.params.title).then(() => {
      console.log(this.statement)
    })
  }
  
}

</script>