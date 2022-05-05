<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'
import { IStockLineChartModel } from '@/models/stock'

import Chart from 'chart.js'

const StockStoreModule = namespace('StockStore')
const { reactiveProp } = mixins
const MAIN_COLOR = '#40E0D0'

@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockChart extends Vue {


  // data
  @Prop({default: false})
  private fill!: boolean
  
  @Prop()
  private chartData!: null

  @StockStoreModule.State('stockGraphDefault')
  private stockGraphDefault!: IStockLineChartModel

  public chartOptions: Chart.ChartOptions = {}


  // methods  
  public renderChart!: (chartData: any, options: any) => any

  public applyDefaultChartOptions (): void {

    this.chartOptions.maintainAspectRatio = true
    this.chartOptions.responsive = true
    this.chartOptions.legend = {
      display: false
    }

    this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: true
        },
        ticks: {
          fontSize: 20,
          maxTicksLimit: 8
        },
        scaleLabel: {
          fontSize: 20
        }
      }],
      yAxes: [{
        ticks: {
          callback: (value: string) => value.toLocaleString(),
          fontSize: 20,
          maxTicksLimit: 3
        },
        gridLines: {
          display: true
        }
      }]
    }

    this.chartOptions.animation = {
      duration: 1200,
      easing: 'easeOutBounce'
    }
    
    this.chartOptions.tooltips = {
      enabled: true,
      titleFontSize: 25,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 40,
      cornerRadius: 10,
      displayColors: false,
      callbacks: {
        label: (tooltipItem) => tooltipItem.yLabel as string,        
      }
    }  
  }

  public createChartData() {
    return {
      labels: Object.keys(this.stockGraphDefault).map((date: string) => date.substr(5)),
      datasets: [
        {
          data : Object.values(this.stockGraphDefault),
          fill: false,
          borderColor: MAIN_COLOR,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          borderWidth: 6,
          radius: 4,
          pointStyple: 'rectRounded',
          tension: .4
        }
      ]
    }
  }

  public renderLineChart () {    
    this.applyDefaultChartOptions()
    this.renderChart(this.createChartData(), this.chartOptions)    
  }

  // hooks
  mounted () {    
    this.renderLineChart()    
  }
}
</script>