<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import Chart from 'chart.js'
import { mixins, Bar } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
import { IStockStatementBarChartModel } from '@/models/stock'

const { reactiveProp } = mixins

const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockFinanceLineChart extends Vue {

  chartData!: IStockStatementBarChartModel
  chartOptions: Chart.ChartOptions = {}

  applyDefaultOptions() {
    this.chartOptions.maintainAspectRatio = true
    this.chartOptions.responsive = true
    
    this.chartOptions.legend = {
      display: false
    }
      this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: false,
          zeroLineColor: '#696969',          
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
          callback: function(value: string) {return value.toLocaleString()},
          display: false,
          fontSize: 15,       
          maxTicksLimit: 1   
        },
        gridLines: {
          display: false,                  
          color: '#696969',  
          zeroLineWidth: 4,
          zeroLineColor: 'white'
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