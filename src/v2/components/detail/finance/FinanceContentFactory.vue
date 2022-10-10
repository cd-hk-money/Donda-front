<template>
  <v-sheet
    class="stock-indicator-detail-content"
    elevation="0"    
    @click="callback()"
  >
    <v-card-title class="stock-indicator-detail-content-title d-flex align-end">
      <span class="text-h4"> {{ getTypeUpper(indicatorType) }} </span>
        <v-chip small class="ml-3 mb-1">
          <v-icon :color="iconColor">
            {{ icon }}
          </v-icon>
        </v-chip>
    </v-card-title>

    <v-card-subtitle class="pt-1 font-weight-bold text-h7">
      {{ typeKorean }}
    </v-card-subtitle>

    <v-card-text class="d-flex">
      <stock-finance-bar-chart
        class="ml-5 mr-5"
        :chartData="chartData"
        :height="100"
      />
      <v-divider vertical/>
      
      <div class="pl-3">
        <div class="mr-1 font-weight-bold">
          <strong> {{ getTypeUpper(indicatorType) }} </strong> | {{ typeKorean }}
          <slot name="description"></slot>
        </div>
        <div class="d-flex">
          <slot name="information"></slot> 
        </div>
      </div>
    </v-card-text>      
    <v-expand-transition>
      <v-card v-if="expand" height="350" elevation="0">
        <StockFinanceLineChart 
          class="mr-5"            
          :statementType="indicatorType"
          :height="100"
        />
      </v-card>
    </v-expand-transition>
  </v-sheet>
</template>

<script lang="ts">    
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import StockFinanceBarChart from '@/v2/components/detail/StockFinanceBarChart.vue'
import StockFinanceLineChart from '@/v2/components/detail/StockFinanceLineChart.vue'
import { IStockStatementBarChartModel } from '@/models/stock';

  @Component({
    components: {
      StockFinanceBarChart,
      StockFinanceLineChart
    }
  })
  export default class BtnBadge extends Vue {
    @Prop() chartData!: IStockStatementBarChartModel
    @Prop() typeKorean!: string
    @Prop() indicatorType!: string
    @Prop() iconColor!: string
    @Prop() icon!: string

    expand = false

    callback () {
      this.expand = !this.expand
    }

    getTypeUpper(str: string) {
      return str.replace(/\b[a-z]/g, char => char.toUpperCase());
    }

  }
</script>

<style>
.stock-indicator-detail-content:hover .stock-indicator-detail-content-title,
.stock-indicator-detail-content:hover strong
 {
  color: rgb(64, 224, 208) !important;
} 



</style>