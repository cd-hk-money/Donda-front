<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'
import { Component, Prop } from 'vue-property-decorator'
import { mixins, Radar } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
import { ISimpleChartData } from '@/models/stock'

const { reactiveProp } = mixins
const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Radar,
  mixins: [reactiveProp],
})
export default class StockIndicatorChart extends Vue {
  
  @Prop({default: {}})
  chartData!: ISimpleChartData

  chartOptions: Chart.ChartOptions = {}

  renderChart!: (chartData: any, options: any) => any    

  applyDefaultOptions() {

    this.chartOptions.responsive = true
    this.chartOptions.legend = {
      display: false,      
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
      bodyFontSize: 10,
      cornerRadius: 10,
      displayColors: false,      
      intersect: false
      }          
  }
  
  createChartData () {            
    return {
      labels: ['eps', 'bps', 'roe'],
      datasets: [ 
        { 
          label: this.$route.params.title,
          data: [
            this.chartData?.eps.value[0],
            this.chartData?.bps.value[0]/100,
            this.chartData?.roe.value[0],
          ],          
          borderColor: MAIN_COLOR,
          borderWidth: 2,
          fill: true,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          lineColor: '#fff',
          pointBackgroundColor: MAIN_COLOR,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        },
        {
          label: this.$route.params.title,
          data: [
            this.chartData?.bps.value[0]/100 + 5000,
            this.chartData?.roe.value[0] + 5000,
            this.chartData?.eps.value[0] + 10,
          ],          
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: SUB_COLOR,
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