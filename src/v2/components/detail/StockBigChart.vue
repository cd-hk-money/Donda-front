<template>  
  <canvas id="lineChart" :height="height"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize, belowGradient, getGradient, crosshairLine, aboveGradient, meanStockData } from '@/mixins/tools'

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

  @Prop({default: 300})
  height!: number

  @Prop({default: 20})
  count!: number
  
  @Prop()
  chartData!: never

  @Prop({default: true})
  gradient!: boolean

  @Prop({default: false})
  volume!: boolean

  @StockStoreModule.State('stockGraphDefault')
  stockGraphDefault!: any

  @StockStoreModule.State('stockGraphAll')
  stockGraphAll!: any

  @StockStoreModule.Action('getStockGraphVolume')
  getStockGraphVolume!: (name: string) => Promise<void>


  @StockStoreModule.State('stockGraphVolumeFlag')
  volumeFlag!: boolean

  @StockStoreModule.State('stockGraphVolume')
  stockGraphVolume!: boolean


  @Watch('count')
  watchCount() {
    this.renderingChart()
  }

  @Watch('gradient')
  watchGradient() {
    this.renderingChart()
  }

  @Watch('volume')
  watchVolume() {
    this.renderingChart()
  }

  getChartLabels () {
    return Object.keys(this.stockGraphAll)
  }  
  
  chartOptions: Chart.ChartOptions = {}


  // 2주간 평균 주가를 기준으로 dash 선을 생성하는 chart.js custom plugin
  dottedLine = {
    id: 'dottedLine',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data, chartArea: {left, right}, width, scales} = chart
      const x = scales['x-axis-0']
      const y = scales['y-axis-0']
            
      const startingPoint = meanStockData(data.datasets[0].data)

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


  // 마우스 포인터를 십자선으로 바꾸고, 포인터에 수평 수직선을 추가하는 chart.js plugin
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
      ctx.fillText(chart.data.labels[x.getValueForPixel(lineX)], lineX, bottom + 10)



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
    const labels = this.getChartLabels()
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
            display: false
          },
          ticks: {
            display: true,
            fontSize: 12,
            min: labels[labels.length - 1 - this.count],
            max: labels[labels.length - 1],
            maxTicksLimit: 10
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
            display: false
          },      
                       
        }],        
      },

      animation: {
        duration: 1500,
        easing: 'easeOutQuart'        
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
          zoom: {
            enabled: false,
          },
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
  
  public createChartData(): any {    
    const labels = this.getChartLabels()
    const data = Object.values(this.stockGraphAll)    
    return {      
      labels: [...[...labels].reverse().slice(0, this.count)].reverse(),
      datasets: [
        {
          type: 'line',
          data: [...[...data].reverse().slice(0, this.count)].reverse(),
          fill: {
            target: {
              value: Object.values(this.stockGraphAll)[0]
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
          borderColor: this.gradient ? context => {
            const {ctx, chartArea, data, scales, width, height} = context.chart
            if(!chartArea) return null            
            return getGradient(ctx, chartArea, data, scales, width, height)
          } : MAIN_COLOR,
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

  renderingChart() {
    this.applyDefaultChartOptions()    
    const chartData = this.createChartData()

    if(!this.volumeFlag) { 
      this.getStockGraphVolume(this.$route.params.title).then(() => {
        this.createChart(chartData)
      })
    } 
    else {      
      if(this.volume) {
        const data = Object.values(this.stockGraphVolume)
        this.chartOptions.scales.yAxes.push({
          id: 'volume',
          type: 'linear',
          position: 'right',
          ticks: {
            min: 0,
            max: 10000000,
            display: false
          },
          gridLines: {
            display: false
          }                  
        })
        chartData.datasets.push({
          label: '거래량ㅎ',
          type: 'bar',
          data: [...[...data].reverse().slice(0, this.count)].reverse(),
          fill: true,
          yAxisID: 'volume',
          backgroundColor: transparentize(MAIN_COLOR, 0.8)
        })
        this.createChart(chartData)
      }
      else {
        this.createChart(chartData)
      }
    }
  }

  // 마우스 휠에 대응하는 zoom 이벤트 콜백
  myZoom (chart, e) {
    const labels = this.getChartLabels()

    const min = chart.config.options.scales.xAxes[0].ticks.min
    const max = chart.config.options.scales.xAxes[0].ticks.max

    if(min !== max) {
      if(e.wheelDeltaY >= 0) {
        chart.config.options.scales.xAxes[0].ticks.min = labels[labels.indexOf(min) + 1]
        chart.config.options.scales.xAxes[0].ticks.max = labels[labels.indexOf(max) - 1]
      }
    }

    if(e.wheelDeltaY < 0) {
      chart.config.options.scales.xAxes[0].ticks.min = labels[labels.indexOf(min) - 1]
      chart.config.options.scales.xAxes[0].ticks.max = labels[labels.indexOf(max) + 1]
    }

    if(+(labels[labels.indexOf(min)]) <= 0) {
      chart.config.options.scales.xAxes[0].ticks.min = labels[0]
    }

    if((labels[labels.indexOf(max)]) >= labels[labels.length - 1]) {
      chart.config.options.scales.xAxes[0].ticks.max = labels[labels.length - 1]
    }


    this.chart.options.animation = null
    this.chart.update()
  }

  createChart(chartData: object) {                    
    if(this.chart) {
      this.chart.destroy()      
    }    

    const canvas = document.getElementById('lineChart') as HTMLCanvasElement
    const options = {
      data: chartData,
      options: this.chartOptions,
      plugins: [this.dottedLine, this.myCrossHair]
    }    
    this.chart = new Chart(canvas, options)    
    this.chart.canvas.addEventListener('mousewheel', e => {
      
      this.myZoom(this.chart, e)
    })
  }

  chart!: Chart

  mounted () {    
    this.renderingChart()
  }
    
}
</script>

<style>
#lineChart {
  backface-visibility: hidden
}
</style>