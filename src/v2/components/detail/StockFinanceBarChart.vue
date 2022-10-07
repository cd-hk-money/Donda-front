<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mixins, Bar } from 'vue-chartjs-typescript'
import Chart from 'chart.js'

import { transparentize } from '@/mixins/tools'
import { IStockStatementBarChartModel } from '@/models/stock'
import { namespace } from 'vuex-class'

const { reactiveProp } = mixins

const MAIN_COLOR = '#40E0D0'

@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockFinanceBarChart extends Vue {

  chartData!: IStockStatementBarChartModel
  chartOptions: Chart.ChartOptions = {}

  applyDefaultOptions() {
    this.chartOptions.maintainAspectRatio = true
    this.chartOptions.responsive = true
    
    this.chartOptions.legend = {
      display: false
    }
    this.chartOptions.plugins = {
      crosshair: false
    }
    this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          fontSize: 12,
        },
        scaleLabel: {
          fontSize: 15
        }
      }],
      yAxes: [{
        ticks: {          
          callback: value => value.toLocaleString(),
          display: false,
          fontSize: 15,                 
        },
        gridLines: {
          display: true,                             
          zeroLineWidth: 2,
          zeroLineColor: '#fff',    
          drawBorder: false    
        },      
      }], 
    }
    this.chartOptions.animation = {
      duration: 800,
      easing: 'easeOutQuad'
    }
      
    this.chartOptions.tooltips = {      
      enabled: true,
      titleFontSize: 15,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 20,
      cornerRadius: 10,
      displayColors: false,      
      callbacks: {
        label: (tooltipItem) => {
          const temp = tooltipItem.yLabel as string  
          return temp.toLocaleString() + ' ₩'
        }
      },
    }  
  }


  createChartData() {
    return {
      labels: [...this.chartData.date].reverse(),
      datasets: [
        {
          data : [...this.chartData.value].reverse().map((value: number) => `${value}`),
          fill: true,
          borderColor: MAIN_COLOR,        
          backgroundColor: transparentize(MAIN_COLOR, 0.9),
          borderWidth: 3,
          radius: 4,
          pointStyple: 'rectRounded',
          tension: .4,         
          minBarLength: 30,
          barThickness: 60,
          
        }
      ]
    }    
  }

  renderChart!: (chartData: any, options: any) => any

  renderBarChart() {
    this.applyDefaultOptions()
    this.renderChart(this.createChartData(), this.chartOptions)
  }

  mounted () {    
    this.renderBarChart()
  }
}
</script>