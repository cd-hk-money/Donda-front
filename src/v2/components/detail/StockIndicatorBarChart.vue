<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'
import Chart from 'chart.js'
import { mixins, Bar } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'
import { IStockModel, IStockStatementBarChartModel } from '@/models/stock'
import { namespace } from 'vuex-class'

const { reactiveProp } = mixins
const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'
const StockStoreModule = namespace('StockStore')


@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockScoreBarChart extends Vue {

  @Prop() type!: string  
  @Prop() sector!: number[]
  @StockStoreModule.State('stock') stock!: IStockModel

  chartData!: IStockStatementBarChartModel
  chartOptions: Chart.ChartOptions = {
    maintainAspectRatio: true,
    responsive: true,      
    plugins: {
      crosshair: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          zeroLineColor: '#696969',          
        },
        ticks: {
          fontSize: 15,
        },
        scaleLabel: {
          fontSize: 15
        }
      }],
      yAxes: [{
        ticks: {
          display: false,
          fontSize: 15,                                     
        },
        gridLines: {
          display: true,                  
          color: '',            
          zeroLineWidth: 2,
          zeroLineColor: '#fff',    
          drawBorder: false                
        },      
      }], 
    },

    animation: {
      duration: 2000,
      easing: 'easeOutQuad'
    },
    
    tooltips: {      
      enabled: true,
      titleFontSize: 15,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 15,
      cornerRadius: 8,
      displayColors: true,        
      mode: 'index',
    }  
  }

  createChartData() {
    return {
      labels: [...this.chartData.date].reverse(),
      datasets: [
        {
          type: 'bar',
          label: this.stock.name,
          data: [...this.chartData.value].reverse(),
          fill: true,
          borderColor: MAIN_COLOR,        
          backgroundColor: transparentize(MAIN_COLOR, 0.6),
          borderWidth: 4,
          radius: 4,
          tension: .4,               
          barThickness: 130,
          minBarLength: 60
        },
        {
          type: 'bar',
          label: this.type + '업종 평균',
          data : this.sector,
          fill: false,
          borderColor: SUB_COLOR,        
          backgroundColor: transparentize(SUB_COLOR, 0.6),          
          borderWidth: 4,
          radius: 4,          
          tension: .4,                      
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