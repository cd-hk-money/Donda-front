<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Chart from 'chart.js'
import { mixins, Bar } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
import { IStockModel } from '@/models/stock'

const { reactiveProp } = mixins

const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#00BCD4'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockScoreBarChart extends Vue {

  chartOptions: Chart.ChartOptions = {}

  @Prop() chartData!: null

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
          fontStyle: 'bold',
        },

        scaleLabel: {
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
      labels: ['현재주가', '적정주가' ,'EPS-ROE', 'S-RIM'],
      datasets: [
        {
          type: 'bar',
          data: [
            this.stock.close,
            Number(this.stockEvaluationDailyLast).toFixed(),
            this.stockEvaluation['proper-price'][11],
            this.stockEvaluation['S-rim'][11]
          ],
          fill: true,
          borderColor: [MAIN_COLOR, SUB_COLOR, '#943', '#6495ed'],        
          backgroundColor: [transparentize(MAIN_COLOR, 0.3) ,transparentize(SUB_COLOR, 0.3), transparentize('#943', 0.3), transparentize('#6495ed', 0.3)],
          borderWidth: 5,
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
    console.log(this.stockEvaluation)
  }
}
</script>