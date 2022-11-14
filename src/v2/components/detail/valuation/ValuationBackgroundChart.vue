<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Chart from 'chart.js'
import { mixins, HorizontalBar } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
import { IStockModel } from '@/models/stock'

const { reactiveProp } = mixins

const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#00BCD4'

@Component({
  extends: HorizontalBar,
  mixins: [reactiveProp]
})
export default class StockScoreBarChart extends Vue {

  chartOptions: Chart.ChartOptions = {}

  @Prop() chartData!: null
  @Prop() backgroundColor!: string

  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('stockEvaluationDaily') stockEvaluationDaily!: any
  @StockStoreModule.State('stockEvaluation') stockEvaluation!: any

  get stockEvaluationDailyLast () {
    return this.stockEvaluationDaily?.value.slice(-1)[0] || ''
  }

  
  applyDefaultOptions() {
    this.chartOptions.maintainAspectRatio = true
    this.chartOptions.responsive = true
    
    this.chartOptions.plugins = {      
      crosshair: false
    }  

    this.chartOptions.legend = {
      display: false
    }
      this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: false,          
        },

        ticks: {
          fontSize: 20,
          display: false,
          fontStyle: 'bold',
          max: 100,
          min: 0
        },

        scaleLabel: {
          display: false,
          fontSize: 15
        }
      }],
      yAxes: [{
        ticks: {
          display: false,
          fontSize: 15,  
          fontColor: 'white',     
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
      enabled: false,
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
      labels: '현재 주가',
      datasets: [
        {
          type: 'horizontalBar',
          data: [
            this.chartData,
          ],
          fill: true,
          borderColor: this.backgroundColor,        
          backgroundColor: transparentize(this.backgroundColor, 0.9),
          borderWidth: 0,
          radius: 4,
          barThickness: 300,
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
    console.log(this.stockEvaluation)
  }
}
</script>