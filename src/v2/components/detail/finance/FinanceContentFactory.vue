<template>
  <v-sheet
    class="stock-indicator-detail-content"
    elevation="0"    
    @click="expand = !expand"        
  >
    <v-card-title class="stock-indicator-detail-content-title d-flex align-end">
      <span class="text-h4"> {{ upper(indicatorType) }} </span>
        <v-chip small class="ml-3 mb-1">
        <v-icon :color="iconColor">
          {{ icon }}
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
          :statementType="indicatorType"
          :height="mobile ? 300 : 100"
        />
      </v-card>
    </v-expand-transition>
  </v-sheet>
</template>

<script lang="ts">    
import { Component, Vue, Prop } from 'vue-property-decorator';
import StockFinanceBarChart from '@/v2/components/detail/StockFinanceBarChart.vue'
import StockFinanceLineChart from '@/v2/components/detail/StockFinanceLineChart.vue'
import { getFirstUpper } from '@/mixins/tools'
import { IStockStatementBarChartModel } from '@/models/stock';
import StoreMixin from '@/mixins/StoreMixin.vue';
import { getStockStatementAll } from '@/api/stocks';
import { namespace } from 'vuex-class';

  const StockStoreModule = namespace('StockStore')

  @Component({
    components: {
      StockFinanceBarChart,
      StockFinanceLineChart
    }
  })
  export default class BtnBadge extends StoreMixin {
    @Prop() chartData!: IStockStatementBarChartModel
    @Prop() typeKorean!: string
    @Prop() indicatorType!: string
    @Prop({default: 0}) level!: number

    @StockStoreModule.State('statementAllLoaded') loaded!: boolean

    
    expand = false
    icon = ''
    iconColor = ''

    get mobile () {
      return this.$vuetify.breakpoint.name === 'xs'
    }

    getIcon() {
      if(!this.chartData.value) return ''
      return this.chartData?.value[0] > this.chartData?.value[1] ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'
    }

    getIconColor() {
      if(!this.chartData.value) return ''
      return this.chartData?.value[0] > this.chartData?.value[1] ? 'red' : 'blue'
    }

    upper(str: string) {
      return getFirstUpper(str)
    } 

    mounted () {
      this.icon = this.getIcon()
      this.iconColor = this.getIconColor()      
      this.getAPI(getStockStatementAll(this.$route.params.title, this.indicatorType))
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