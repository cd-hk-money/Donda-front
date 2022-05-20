<template>
  <canvas id="lineChart"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize, belowGradient, getGradient, crosshairLine, aboveGradient } from '@/mixins/tools'

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

  myCrossHair = {
    id: 'mycrosshair',
    afterInit: function(chart) {
      chart.crosshair = {
				enabled: false,
				x: null,
				originalData: [],
				originalXRange: {},
				dragStarted: false,
				dragStartX: null,
				dragEndX: null,  
      }
    },
    getXScale: function(chart) {
			return chart.data.datasets.length ? chart.scales[chart.getDatasetMeta(0).xAxisID] : null;
		},
		getYScale: function(chart) {
			return chart.scales[chart.getDatasetMeta(0).yAxisID];
		},
    afterEvent: function(chart, e) {
      chart.crosshair.x = e.x
      chart.crosshair.y = e.y
      chart.draw();
    },
    drawTraceLine: (chart) => {
      const {ctx, data, chartArea: {top, bottom, left, right}, scales, width} = chart      
      const x = scales['x-axis-0']
      const y = scales['y-axis-0']
      const lineX = chart.crosshair.x
      const lineY = chart.crosshair.y
      const yScale = this.myCrossHair.getYScale(chart);
      const textWidth = ctx.measureText('0000-00-00').width + 10

      ctx.font = '12px sans-serif'      
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
            
      chart.canvas.style.cursor = 'crosshair'
      

      // crosshair
      ctx.beginPath()

        ctx.setLineDash([3, 3])
        ctx.lineWidth = 2
        ctx.strokeStyle = '#666'

        ctx.moveTo(lineX, yScale.getPixelForValue(yScale.max))
        ctx.lineTo(lineX, yScale.getPixelForValue(yScale.min))
        ctx.moveTo(left ,lineY)
        ctx.lineTo(right ,lineY)
        ctx.stroke()
        ctx.setLineDash([]);

      ctx.closePath()
      

      // y virtual value
      ctx.beginPath()
        ctx.fillStyle = 'rgba(132, 132, 132, 1)'
        ctx.fillRect(0, lineY - 10, left, 20)
      ctx.closePath()

      ctx.fillStyle = 'white'
      const maxTick = y.ticksAsNumbers[0]
      const minTick = y.ticksAsNumbers[y.ticksAsNumbers.length - 1]
      const valuePerPixel = (maxTick - minTick) / (bottom - top) 
          
      const text = minTick + valuePerPixel * (bottom - lineY)
      ctx.fillText(text.toLocaleString().split('.')[0] + '₩', left / 2, lineY)


      // x virtual value
      ctx.beginPath()
      ctx.fillStyle = 'rgba(132, 132, 132, 1)'
      ctx.fillRect(lineX - (textWidth / 2) , bottom, 90, 20)
      ctx.closePath()

      ctx.fillStyle = 'white'
      ctx.fillText(this.createChartData().labels[x.getValueForPixel(lineX)], lineX, bottom + 10)

    },
    afterDraw: function(chart, e) {      
      if(e.y > chart.chartArea.bottom || e.y < chart.chartArea.top || e.x < chart.chartArea.left || e.x > chart.chartArea.right) {
        return true
      }
      else {
        this.drawTraceLine(chart);
      }
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
        'mycrosshair': true,
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

  public createChartData() {
    return {
      labels: Object.keys(this.stockGraphDefault),
      datasets: [
        {
          data : Object.values(this.stockGraphDefault),
          fill: {
            target: {
              value: Object.values(this.stockGraphDefault)[0]
            },
            below: context => {
              const {ctx, chartArea, data, scales, width, height} = context.chart
              if(!chartArea) return null            
              return belowGradient(ctx, chartArea, data, scales)  
            },
            above: context => {
              const {ctx, chartArea, data, scales, width, height} = context.chart
              if(!chartArea) return null            
              aboveGradient(ctx, chartArea, data, scales)  
            }
          },
          borderColor: context => {
            const {ctx, chartArea, data, scales, width, height} = context.chart
            if(!chartArea) return null            
            return getGradient(ctx, chartArea, data, scales, width, height)
          },
          borderWidth: 3,
          pointStyle: 'rectRounded',          
          tension: .4,         
          pointRadius: 0,
          pointHitRadius: 10,
          pointHoverRadius: 5
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
      plugins: [this.dottedLine, zoom, this.myCrossHair]
    }
    const chartCanvas= new Chart(canvas, options)
  }

  mounted () {    
    this.applyDefaultChartOptions()    
    this.createChart(this.createChartData())
  }
}
</script>

<style>
#lineChart {
  backface-visibility: hidden
}
</style>