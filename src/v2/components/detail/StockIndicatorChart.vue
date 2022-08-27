<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'
import { Component, Prop } from 'vue-property-decorator'
import { mixins, Radar } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
import { ISimpleChartData, IStockModel } from '@/models/stock'
import { namespace } from 'vuex-class'

const { reactiveProp } = mixins
const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'
const StockStoreModule = namespace('StockStore')

@Component({
  extends: Radar,
  mixins: [reactiveProp],
})
export default class StockIndicatorChart extends Vue {
  
  @Prop({default: {}}) chartData!: ISimpleChartData

  chartOptions: Chart.ChartOptions = {}
  @StockStoreModule.State('stock') stock!: IStockModel

  renderChart!: (chartData: any, options: any) => any    

  applyDefaultOptions() {

    this.chartOptions.responsive = true
    this.chartOptions.legend = {
      display: true,      
    }

    this.chartOptions.plugins = {
      crosshair: false
    }
    this.chartOptions.animation = {
      duration: 1000,
      easing: 'easeOutBounce'
    }
    this.chartOptions.scale = {
      gridLines: {
        color: this.$vuetify.theme.dark ? transparentize('#fff', 0.9) : 'grey',   
        lineWidth: 1     
      },
      ticks: {
        display: false,
        stepSize: 500000
      },
      pointLabels: {
        fontSize: 20,        
      }
    }

    this.chartOptions.tooltips = {            
      enabled: true,
      titleFontSize: 25,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 20,
      cornerRadius: 10,
      displayColors: false,            
      }          
  }
  
  createChartData () {            
    return {
      labels: ['eps', 'bps', 'roe'],
      datasets: [ 
        { 
          label: this.stock.name,
          data: [
            this.chartData?.eps.value[0],
            this.chartData?.bps.value[0]/20,
            this.chartData?.roe.value[0],
          ],          
          borderColor: MAIN_COLOR,
          borderWidth: 2,          
          fill: true,
          pointRadius: 5,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          lineColor: '#fff',          
          pointBackgroundColor: MAIN_COLOR,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        },
        {
          label: '업종 평균',
          data: [
            (this.chartData?.bps.value[0]/20 + 100).toFixed(),
            (this.chartData?.roe.value[0] + 100).toFixed(),
            (this.chartData?.eps.value[0] + 10).toFixed(),
          ],          
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: SUB_COLOR,
          pointRadius: 5,
          pointBackgroundColor: SUB_COLOR,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: SUB_COLOR
        }
      ],          
    }
  }
  renderLineChart() {
    this.applyDefaultOptions()
    this.renderChart(this.createChartData(), this.chartOptions)    
  }
  mounted() {        
    this.renderLineChart()
  }    
}
</script> 