<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins, Bar } from 'vue-chartjs-typescript'
import Chart from 'chart.js'

import { transparentize } from '@/mixins/tools'
import { IStockStatementBarChartModel } from '@/models/stock'

const { reactiveProp } = mixins

const MAIN_COLOR = '#40E0D0'

@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockFinanceBarChart extends Vue {

  chartData!: IStockStatementBarChartModel
  chartOptions: Chart.ChartOptions = {
    maintainAspectRatio: true,
    responsive: true,    
    legend: {
      display: false
    },
    plugins: {
      crosshair: false
    },
    scales: {
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
          drawBorder: false    
        },      
      }], 
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuad'
    },
      
    tooltips: {      
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

  renderChart!: (chartData: unknown, options: unknown) => unknown

  mounted () {    
    this.renderChart(this.createChartData(), this.chartOptions)
  }
}
</script>