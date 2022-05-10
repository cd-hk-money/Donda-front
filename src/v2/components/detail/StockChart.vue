<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'

import Chart from 'chart.js'

const { reactiveProp } = mixins

const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockChart extends Vue {

  @Prop({default: false})
  fill!: boolean
  
  @Prop()
  chartData!: any

  chartOptions: Chart.ChartOptions = {}

  // methods  
  renderChart!: (chartData: any, options: any) => any

  applyDefaultChartOptions (): void {

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
          callback: function(value: string) {return value.toLocaleString()},
          fontSize: 20,
        },
        gridLines: {
          display: true
        }
      }]
    }

    this.chartOptions.animation = {
      duration: 2000,
      easing: 'easeOutBounce'
    }
    
    this.chartOptions.tooltips = {
      enabled: true,
      intersect: false,
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
  SUB_COLOR

  createChartData() {
    return {
      labels: Object.keys(this.chartData).map((date: string) => date.substr(5)),
      datasets: [
        {
          data : Object.values(this.chartData),
          fill: true,
          borderColor: MAIN_COLOR,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          borderWidth: 6,
          radius: 0,
          pointStyple: 'rectRounded',
          tension: .4
        },
        {
          data : (Object.values(this.chartData) as number[]).map((value: number) => value * 0.995),
          fill: true,
          borderColor: SUB_COLOR,
          backgroundColor: transparentize(SUB_COLOR, 0.8),
          borderWidth: 6,
          radius: 0,
          pointStyple: 'rectRounded',
          tension: .4
        }
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