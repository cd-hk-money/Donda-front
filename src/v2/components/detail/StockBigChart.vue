<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize, belowGradient, getGradient } from '@/mixins/tools'

import  zoom from 'chartjs-plugin-zoom'
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
export default class StockBigChart extends Vue {

  @Prop({default: false})
  fill!: boolean
  
  @Prop()
  chartData!: never

  @StockStoreModule.State('stockGraphDefault')
  stockGraphDefault!: any

  chartOptions: Chart.ChartOptions = {}

  // methods  
  renderChart!: (chartData: any, options: any) => any

  applyDefaultChartOptions (): void {

    this.chartOptions.maintainAspectRatio = true
    this.chartOptions.responsive = true
    this.chartOptions.legend = {
      display: false
    }

    this.chartOptions.plugins = {
      zoom: {
        zoom: {
          whell: {
            enabled: true
          }
        }
      }
    }

    this.chartOptions.scales = {
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
          callback: function(value: string) {return value.toLocaleString()},
          fontSize: 20,
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
      enabled: true,
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

    this.chartOptions.plugins = {
      'dottedLine': true
    }
  }

  

  createChartData() {
    return {
      labels: Object.keys(this.stockGraphDefault).map((date: string) => date.substr(5)),
      datasets: [
        {
          data : Object.values(this.stockGraphDefault),
          fill: {
            target: {
              value: () => {
                console.log(Object.values(this.stockGraphDefault)[0])
              }
            },
            below: context => {
              const {ctx, chartArea, data, scales, width, height} = context.chart
              if(!chartArea) return null            
              return belowGradient(ctx, chartArea, data, scales, width, height)
            }
          },
          borderColor: context => {
            const {ctx, chartArea, data, scales, width, height} = context.chart
            if(!chartArea) return null            
            return getGradient(ctx, chartArea, data, scales, width, height)
          },
          borderWidth: 5,
          radius: 0,
          pointStyle: 'rectRounded',          
          tension: .4,         
          pointRadius: 0,
          pointHitRadius: 10,
          hoverPointRadius: 0
        },
      ]
    }
  }

  renderLineChart () {    
    this.applyDefaultChartOptions()
    this.renderChart(this.createChartData(), this.chartOptions)    
  }

  mounted () {    
    Chart.plugins.register(zoom)    
    this.renderLineChart()    
  }

  dottedLine = {
    id: 'dottedLine',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data, chartArea: {left, right}, width, scales} = chart
      const x = scales['x-axis-0']
      const y = scales['y-axis-0']

      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.setLineDash([1, 5])
      ctx.strokeStyle = 'rgba(102, 102, 102, 0.2)'
      ctx.moveTo(left, y.getPixelForValue(data.datasets[0].data[0]))
      ctx.lineTo(right, y.getPixelForValue(data.datasets[0].data[0]))
      ctx.stroke()
      ctx.closePath()
      ctx.setLineDash([])
    }
  }

  getGradient (ctx, chartArea, data, scales, width, height) {
    const {left, right, top, bottom} = chartArea
    const x = scales['x-axis-0']
    const y = scales['y-axis-0']
    const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom)   
    const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom

    gradientBorder.addColorStop(0, 'rgba(28, 24, 222, 1)')
    gradientBorder.addColorStop(shift, 'rgba(75, 192, 192, 1)')
    gradientBorder.addColorStop(shift, 'rgba(255, 26, 104, 1)')
    gradientBorder.addColorStop(1, 'rgba(255, 26, 104, 1)')

    return gradientBorder
  }

  belowGradient (ctx, chartArea, data, scales, width, height) {
    const {left, right, top, bottom} = chartArea
    const x = scales['x-axis-0']
    const y = scales['y-axis-0']
    const gradientBackground = ctx.createLinearGradient(
      0, y.getPixelForValue(data.datasets[0].data[0]), 0, bottom) 

    gradientBackground.addColorStop(0, 'rgba(255, 26, 104, 0)')
    gradientBackground.addColorStop(0, 'rgba(255, 26, 104, 0.4)')
    console.log('fucl')
    return gradientBackground
  }
}
</script>