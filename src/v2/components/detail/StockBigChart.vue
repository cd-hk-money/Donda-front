<template>
  <canvas id="lineChart"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize, belowGradient, getGradient, crosshairLine } from '@/mixins/tools'

import zoom from 'chartjs-plugin-zoom'
import crosshair from '@sashke-er/chartjs-plugin-crosshair'
import Chart from 'chart.js'
import { namespace } from 'vuex-class'

const { reactiveProp } = mixins
const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'
const END_LABEL_INDEX = 11

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

  dottedLine = {
    id: 'dottedLine',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data, chartArea: {left, right}, width, scales} = chart
      const x = scales['x-axis-0']
      const y = scales['y-axis-0']

      const startingPoint = data.datasets[0].data[0]

      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.setLineDash([5, 7])
      ctx.strokeStyle = 'rgba(102, 102, 102, 0.2)'
      ctx.moveTo(left, y.getPixelForValue(startingPoint))
      ctx.lineTo(right, y.getPixelForValue(startingPoint))
      ctx.stroke()
      ctx.closePath()
      ctx.setLineDash([])

      ctx.beginPath()
      ctx.fillStyle = 'rgba(102, 102, 102, 0.9)'
      ctx.fillRect(0, y.getPixelForValue(startingPoint) - 10, left, 20)
      ctx.closePath()

      ctx.font = '15px sans-serif'
      ctx.fillStyle = 'white'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.fillText(startingPoint.toLocaleString() + '₩', left / 2, y.getPixelForValue(startingPoint))
    }
  }

  applyDefaultChartOptions (): void {
    this.chartOptions = {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false
      },

      layout: {
        padding: {
          left: 10
        }
      },

      scales: {
        xAxes: [{
          gridLines: {
            display: true
          },
          ticks: {
            display: true,
            fontSize: 12,
            maxTicksLimit: 20
          },
          scaleLabel: {
            fontSize: 20
          }
        }],
        yAxes: [{
          ticks: {
            display: true,
            callback: function(value: string) {return value.toLocaleString() + '₩'},
            fontSize: 17,
          },
          gridLines: {
            display: true
          },
        }],
      },

      animation: {
      duration: 1200,
      easing: 'easeOutBounce'        
      },

      tooltips: {
        enabled: true,
        intersect: false,
        titleFontSize: 20,
        titleFontColor: MAIN_COLOR,
        bodyFontSize: 20,
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => (tooltipItem.yLabel as string).toLocaleString() + ' ₩',        
        }
      },

      plugins: {
        'dottedLine': true,
        zoom: {
          pan: {
            enabled: false,
          },
          enabeld: true,
          mode: 'xy',
          sensitivity: 3,
          speed: 0.1
        },
        crosshair: {
          line: {
            color: '#666',
            width: 2,
            dashPattern: [3, 3]
          },
          sync: {
            enabled: true,            
            suppressTooltips: true
          },        
          zoom: {
            enabled: false
          },
        }
      }
    }
  }

  createChartData() {
    return {
      labels: Object.keys(this.stockGraphDefault),
      datasets: [
        {
          data : Object.values(this.stockGraphDefault),
          fill: false,
          borderColor: context => {
            const {ctx, chartArea, data, scales, width, height} = context.chart
            if(!chartArea) return null            
            return getGradient(ctx, chartArea, data, scales, width, height)
          },
          borderWidth: 2,
          pointStyle: 'rectRounded',          
          tension: 0,         
          pointHitRadius: 10,
          hoverPointRadius: 20
        },
      ]
    }
  }

  createChart(chartData: object) {    
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement
    const options = {
      type: 'line',
      data: chartData,
      options: this.chartOptions,
      plugins: [this.dottedLine, zoom, crosshair]
    }
    const chartCanvas= new Chart(canvas, options)
    chartCanvas.canvas.addEventListener('mousemove', e => {
      crosshairLine(chartCanvas, e)      
    })
  }

  mounted () {    
    this.applyDefaultChartOptions()    
    setTimeout(() => {
      this.createChart(this.createChartData())
    }, 500)
  }
}
</script>