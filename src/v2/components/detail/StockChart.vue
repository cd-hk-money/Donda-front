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
export default class StockChart extends Vue {

  @Prop({default: false}) fill!: boolean
  @Prop() height!: number  
  @Prop() chartData!: never

  @StockStoreModule.State('stockGraphDefault') stockGraphDefault!: any
  
  // methods  
  renderChart!: (chartData: any, options: any) => any
  chartOptions: Chart.ChartOptions = {
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
          data : (Object.values(this.stockGraphDefault) as number[]).map((value: number) => value * 1.005),
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

  renderLineChart () {        
    this.renderChart(this.createChartData(), this.chartOptions)      
  }

  mounted () {    
    this.renderLineChart()    
  }
}
</script>