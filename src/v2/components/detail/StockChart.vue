<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'
import { ChartOptions, ChartData } from 'chart.js'
import { namespace } from 'vuex-class'
import { IStockEvaluationModel } from '@/models/stock'

const { reactiveProp } = mixins
const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#00BCD4'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockChart extends Vue {

  @Prop({default: false}) fill!: boolean
  @Prop() height!: number    
  @Prop() chartData!: any

  @StockStoreModule.State('stockGraphDefault') stockGraphDefault!: any
  @StockStoreModule.State('stockEvaluationDaily') stockEvaluationDaily!: IStockEvaluationModel

  renderChart!: (chartData: ChartData, options: ChartOptions) => any

  get getChartData (): ChartData | any {
    return {
      labels: Object.keys(this.stockGraphDefault).map((date: string) => date.substr(5)),
      datasets: [
        {
          label: '현재 주가',
          data : Object.values(this.stockGraphDefault),
          fill: this.fill,
          borderColor: MAIN_COLOR,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          borderWidth: 2,
          radius: 0,
          pointStyple: 'rectRounded',
          tension: .4
        },
        {
          label: '적정 주가',
          data : (Object.values(this.stockGraphDefault) as number[]).map((v: number) => v * 1.005),
          fill: this.fill,
          borderColor: SUB_COLOR,
          backgroundColor: transparentize(SUB_COLOR, 0.8),
          borderWidth: 2,
          radius: 0,
          pointStyple: 'rectRounded',
          tension: .4
        }
      ]
    }
  }
    
  chartOptions: ChartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: true
    },
    plugins: {
      crosshair: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false,
          fontSize: 20,
          maxTicksLimit: 8
        },
        scaleLabel: {
          fontSize: 20
        }
      }],
      yAxes: [{
        ticks: {
          display: false,
          callback: (value: string) => value.toLocaleString(),
          fontSize: 20,
        },
        gridLines: {
          display: false
        }
      }],      
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce'
    },
    tooltips: {
      enabled: true,
      intersect: false,
      titleFontSize: 15,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 16,
      cornerRadius: 10,
      displayColors: true,
      mode: 'index',      
      callbacks: {
        label: (tooltipItem, _) => 
          ` ${_.datasets[tooltipItem.datasetIndex].label} : ${tooltipItem.yLabel.toLocaleString().split('.')[0]} ₩`          
      }    
    }
  }
  
  mounted () {    
    this.renderChart(this.getChartData, this.chartOptions)      
  }
}
</script>