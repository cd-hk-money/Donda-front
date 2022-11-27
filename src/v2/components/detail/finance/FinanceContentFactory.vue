<template>
  <v-sheet
    class="stock-indicator-detail-content"
    elevation="0"    
    @click="expand = !expand"            
  >
    <v-card-title class="stock-indicator-detail-content-title d-flex align-end">
      <span class="text-h4"> {{ upper(indicatorType) }} </span>
        <v-chip small class="ml-3 mb-1">
        <v-icon :color="icon.color">
          {{ icon.icon }}
        </v-icon>
      </v-chip>
      <v-chip v-if="level" small class="ml-3 mb-1 d-flex">
        <v-icon v-for="(star, i) in level" :key="i" color="#FDD835">
          mdi-star
        </v-icon>
      </v-chip>
    </v-card-title>

    <v-card-subtitle class="pt-1 font-weight-bold text-h7">
      {{ typeKorean }}
    </v-card-subtitle>

    <v-card-text :class="mobile ? '' : 'd-flex align-center'">
      <stock-finance-bar-chart
        class="ml-5 mr-5"
        :chartData="chartData"
        :height="mobile ? 170 : 100"
      />
            
      <div class="pl-3">        
        <div class="ml-3">
          <slot name="description"></slot>
        </div>
        <div class="d-flex flex-wrap">
          <slot name="information"></slot> 
        </div>
      </div>
    </v-card-text>      
    <v-expand-transition>
      <v-card v-if="expand" height="350" elevation="0">
        <StockFinanceLineChart                     
          class="mr-5"            
          :chartData="lineChartData"
          :height="mobile ? 300 : 100"
        />
      </v-card>
    </v-expand-transition>
  </v-sheet>
</template>

<script lang="ts">    
import { Component, Prop } from 'vue-property-decorator';
import StockFinanceBarChart from '@/v2/components/detail/finance/StockFinanceBarChart.vue'
import StockFinanceLineChart from '@/v2/components/detail/finance/StockFinanceLineChart.vue'
import { getFirstUpper } from '@/mixins/tools'
import StoreMixin from '@/mixins/StoreMixin.vue';


  @Component({
    components: {
      StockFinanceBarChart,
      StockFinanceLineChart
    }
  })
  export default class BtnBadge extends StoreMixin {
    @Prop() lineChartData!: any
    @Prop() typeKorean!: string
    @Prop() indicatorType!: string
    @Prop({default: 0}) level!: number
    @Prop() loaded!: boolean

    get chartData () {
      return {...this.lineChartData}
    }
        
    expand = false

    get icon () {

      const last = Object.values(this.lineChartData)[25] as number
      const current = Object.values(this.lineChartData)[26] as number

      return {
        icon: current > last ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
        color: current > last ? 'red' : 'blue'
      }
    }
    
    get mobile () {
      return this.$vuetify.breakpoint.name === 'xs'
    }

    upper(str: string) {
      return getFirstUpper(str)
    }             

    mounted () {
      console.log('mount..!')
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