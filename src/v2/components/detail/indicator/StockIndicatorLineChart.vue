<script lang="ts">

  import { Component, Vue, Prop } from 'vue-property-decorator'
  import Chart from 'chart.js'
  import { mixins, Line  } from 'vue-chartjs-typescript'
  import { transparentize } from '@/mixins/tools'
  import { IStockModel } from '@/models/stock'
  import { namespace } from 'vuex-class'
  
  const { reactiveProp } = mixins
  const MAIN_COLOR = '#00BCD4'
  const SUB_COLOR = 'rgb(255, 99, 132)'
  const StockStoreModule = namespace('StockStore')
  
  
  @Component({
    extends: Line,
    mixins: [reactiveProp]
  })
  export default class StockScoreLineChart extends Vue {
  
    @Prop() type!: string  
    @Prop() sector!: number[]
    @StockStoreModule.State('stock') stock!: IStockModel
    @StockStoreModule.State('indicatorDailyChartLabel') labels!: string[]
  
    chartData!: number[] | undefined
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
  
          },
          gridLines: {
            display: false,                  
            color: '#696969',  
            zeroLineWidth: 4,
            zeroLineColor: 'white'
          },      
        }], 
      },

      animation: {
        duration: 2000,
        easing: 'easeOutQuad'
      },
      
      tooltips: {      
        enabled: true,
        titleFontSize: 14,
        titleFontColor: MAIN_COLOR,
        bodyFontSize: 12,
        cornerRadius: 12,
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
            pointHitRadius: 100,            
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
            pointHitRadius: 100             
          }
        ]
      }    
    }
  
    renderChart!: (chartData: unknown, options: unknown) => unknown
        
    mounted () {
      // console.log(this.labels, 'labels')
      // console.log('mounted!')
      // this.renderChart(this.createChartData(), this.chartOptions)
    }
  }
  </script>