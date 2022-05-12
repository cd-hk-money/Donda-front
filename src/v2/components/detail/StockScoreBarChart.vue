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
export default class StockScoreBarChart extends Vue {

  @Prop()
  chartData!: number[]
  
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
          fontSize: 20,
          fontStyle: 'bold'
          
        },
        scaleLabel: {
          fontSize: 15
        }
      }],
      yAxes: [{
        ticks: {
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
      duration: 2000,
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
        label: (tooltipItem) => tooltipItem.yLabel.toLocaleString() + ' ₩'
      }    
    }  
  }


  createChartData() {
    return {
      labels: ['현재주가', '적정주가'],
      datasets: [
        {
          type: 'bar',
          data : [...this.chartData],
          fill: true,
          borderColor: [MAIN_COLOR, SUB_COLOR],        
          backgroundColor: [transparentize(MAIN_COLOR, 0.8) ,transparentize(SUB_COLOR, 0.8)],
          borderWidth: 4,
          radius: 4,
          pointStyple: 'rectRounded',
          tension: .4,              
          indexAxis: 'y'                    
        },
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