<script lang="ts">

  import { Component, Vue, Prop } from 'vue-property-decorator'
  import Chart from 'chart.js'
  import { mixins, Line  } from 'vue-chartjs-typescript'
  import { transparentize } from '@/mixins/tools'
  import { IStockModel, IStockStatementBarChartModel } from '@/models/stock'
  import { namespace } from 'vuex-class'
  
  const { reactiveProp } = mixins
  const MAIN_COLOR = '#40E0D0'
  const SUB_COLOR = 'rgb(255, 99, 132)'
  const StockStoreModule = namespace('StockStore')
  
  
  @Component({
    extends: Line,
    mixins: [reactiveProp]
  })
  export default class StockScoreBarChart extends Vue {
  
    @Prop() type!: string  
    @Prop() sector!: number[]
    @StockStoreModule.State('stock') stock!: IStockModel
    @StockStoreModule.State('indicatorDailyChartLabel') labels!: string[]
  
    chartData!: any
    chartOptions: Chart.ChartOptions = {}
  
    applyDefaultOptions() {
      this.chartOptions.maintainAspectRatio = true
      this.chartOptions.responsive = true      
      this.chartOptions.plugins = {
        crosshair: false
      }
        this.chartOptions.scales = {
        xAxes: [{
          gridLines: {
            display: false,
            zeroLineColor: '#696969',                      
          },
          ticks: {
            fontSize: 17,
            maxRotation: 0,
            maxTicksLimit: 9,    
            padding: -10,          
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
        titleFontSize: 14,
        titleFontColor: MAIN_COLOR,
        bodyFontSize: 12,
        cornerRadius: 12,
        displayColors: false,        
        mode: 'index',
      }  
    }
  
  
    createChartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            type: 'line',
            label: this.stock.name,
            data: this.chartData,
            fill: false,
            borderColor: MAIN_COLOR,        
            backgroundColor: transparentize(MAIN_COLOR, 0.6),
            borderWidth: 3,            
            tension: .4,     
            pointRadius: 0,          
          },
          {
            type: 'line',
            label: this.type + '업종 평균',
            data : this.sector,
            fill: false,
            borderColor: SUB_COLOR,        
            backgroundColor: transparentize(SUB_COLOR, 0.2),
            borderWidth: 3,
            tension: .4,   
            pointRadius: 0,                   
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
      console.log(this.sector)
    }
  }
  </script>