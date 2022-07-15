<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'
import Chart from 'chart.js'
import { namespace } from 'vuex-class'

const { reactiveProp } = mixins
const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockValuationChart extends Vue {

  @Prop({default: false})
  fill!: boolean
  
  @Prop()
  chartData!: never

  @StockStoreModule.State('stockGraphDefault')
  stockGraphDefault!: any

  chartOptions: Chart.ChartOptions = {}

  // methods  
  renderChart!: (chartData: any, options: any) => any

  applyDefaultChartOptions () {

    this.chartOptions.maintainAspectRatio = true
    this.chartOptions.responsive = true
    // this.chartOptions.legend = {
    //   display: false
    // }

    this.chartOptions.plugins = {      
      crosshair: false
    }  
    
    this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false,
          // fontSize: 20,
          // maxTicksLimit: 8
        },
        scaleLabel: {
          // fontSize: 20
        }        
      }],
      yAxes: [{
        ticks: {
          display: true,     
          maxTicksLimit: 5,
          callback: ctx => ctx.toLocaleString()
        },
        gridLines: {
          display: false
        }
      }]
    }

    this.chartOptions.animation = {
      duration: 2000,
      easing: 'easeOutBounce'
    }
    
    this.chartOptions.tooltips = {
      enabled: false,
      intersect: false,
      titleFontSize: 10,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 20,
      cornerRadius: 10,
      displayColors: false,
      callbacks: {
        label: (tooltipItem) => tooltipItem.yLabel as string,        
      }
    }  
  }

  createChartData() {
    return {
      labels: Object.keys(this.stockGraphDefault).map((date: string) => date.substr(5)),
      datasets: [
        {
          label: '현재주가',
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
          label: '돈다 지수',
          data : (Object.values(this.stockGraphDefault) as number[]).map((value: number) => value * 1.005),
          fill: this.fill,
          borderColor: SUB_COLOR,
          backgroundColor: transparentize(SUB_COLOR, 0.8),
          borderWidth: 2,
          radius: 0,
          pointStyple: 'rectRounded',
          tension: .4
        },
        {
          label: '방법 1',
          data : (Object.values(this.stockGraphDefault) as number[]).map((value: number) => value * 1.010),
          fill: this.fill,
          borderColor: '#943',
          backgroundColor: transparentize(SUB_COLOR, 0.8),
          borderWidth: 2,
          radius: 0,
          pointStyple: 'rectRounded',
          tension: .4
        },             
      ]
    }
  }

  renderLineChart () {    
    this.applyDefaultChartOptions()
    this.renderChart(this.createChartData(), this.chartOptions)    
  }

  mounted () {    
    this.renderLineChart()    
    
  }
}
</script>