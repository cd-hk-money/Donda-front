<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'
import { Component, Prop } from 'vue-property-decorator'
import { mixins, Radar } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
import { ISimpleChartData, IStockIndicatorSectorModel, IStockModel } from '@/models/stock'
import { namespace } from 'vuex-class'

const { reactiveProp } = mixins
const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'
const StockStoreModule = namespace('StockStore')
const LABEL_INDEX = ['EPS', 'BPS', 'ROE']

@Component({
  extends: Radar,
  mixins: [reactiveProp],
})
export default class StockIndicatorChart extends Vue {
  
  @Prop({default: {}}) chartData!: any
  @Prop() sector!: any

  @StockStoreModule.State('stock') stock!: IStockModel

  chartOptions: Chart.ChartOptions = {}

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
      },
      pointLabels: {
        fontSize: 20,        
      },
    }

    this.chartOptions.tooltips = {            
      enabled: true,
      titleFontSize: 13,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 13,
      cornerRadius: 10,
      displayColors: false,            
      mode: 'index',
      callbacks: {
        title: item => LABEL_INDEX[item[0].index]
      }      
    }          
  }
  
  createChartData () {            
    return {
      labels: ['EPS', 'BPS', 'ROE'],
      datasets: [ 
        { 
          label: this.stock.name,
          data: [
            this.chartData.eps?.toFixed(),
            (this.chartData.bps / 20)?.toFixed(),
            ((this.chartData.roe + 20) * 30)?.toFixed(),
          ],          
          borderColor: MAIN_COLOR,
          borderWidth: 1.5,
          fill: true,
          pointRadius: 4,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          lineColor: '#fff',          
          pointBackgroundColor: MAIN_COLOR,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
        {
          label: '업종 평균',
          data: [
            this.sector.eps?.toFixed(),
            (this.sector.bps / 20)?.toFixed(),
            ((this.sector.roe + 20) * 30)?.toFixed(),            
          ],          
          borderWidth: 1.5,
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: SUB_COLOR,
          pointRadius: 4,
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