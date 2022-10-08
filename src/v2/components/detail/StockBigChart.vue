<template>  
  <canvas id="lineChart" :height="height"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize,  meanStockData, maxStockData, minStockData} from '@/mixins/tools'

import Chart from 'chart.js'
import { namespace } from 'vuex-class'
import { IUpdateStateModel } from '@/models/payload'

const { reactiveProp } = mixins
const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#40E0D0'
const zoomScale = 1


@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockBigChart extends Vue {

  // datas
  chart!: Chart
  tempCount = 20
  chartOptions: Chart.ChartOptions = {}
  yLabel: string

  // props
  @Prop({default: false}) fill!: boolean | undefined
  @Prop({default: 300}) height!: number | undefined    
  @Prop() chartData!: never
  @Prop({default: true}) gradient!: boolean | undefined
  @Prop({default: false}) volume!: boolean | undefined


  // stores
  @StockStoreModule.State('stockGraphLength') count!: number
  @StockStoreModule.State('stockGraphDefault') stockGraphDefault!: any
  @StockStoreModule.State('stockGraphAll') stockGraphAll!: any
  @StockStoreModule.State('stockGraphVolumeFlag') volumeFlag!: boolean
  @StockStoreModule.State('stockGraphVolume') stockGraphVolume!: boolean
  @StockStoreModule.Action('getStockGraphVolume') getStockGraphVolume!: (name: string) => Promise<void>
  @StockStoreModule.Mutation('updateState') updateCount!: (payload: IUpdateStateModel) => void


  // watches
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
  
  getChartDatas (): number[] {
    return Object.values(this.stockGraphAll)
  }

  getLabel () {
    return this.yLabel
  }
  

  // 현재 그래프 날짜 간격의 평균 주가를 기준으로 dash 선을 생성
  dottedLine = {
    id: 'dottedLine',    
    beforeDatasetsDraw: (chart) => {
      const {ctx, data, chartArea: {left, right, bottom}, width, scales} = chart
      const x = scales['x-axis-0']
      const y = scales['y-axis-0']        
      const min = chart.config.options.scales.xAxes[0].ticks.min
      const currentDatas = data.datasets[0].data.slice(chart.config.data.labels.indexOf(min))
      const meanStock = meanStockData(currentDatas) ?? 0
      const startingPoint = meanStock.toFixed(0).toLocaleString() ?? 0

      if(chart.data.datasets[0].fill && startingPoint > 0) {
        const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom)
        const shift = y.getPixelForValue(meanStockData(currentDatas)) / bottom        

        gradientBorder.addColorStop(0, 'rgba(28, 24, 222, 1)')
        gradientBorder.addColorStop(shift, 'rgba(75, 192, 192, 1)')
        gradientBorder.addColorStop(shift, 'rgba(255, 26, 104, 1)')
        gradientBorder.addColorStop(1, 'rgba(255, 26, 104, 1)')
        chart.data.datasets[0].borderColor = gradientBorder
      }

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

      const yText = this.getLabel()
            
      ctx.fillText(yText, lineX, bottom + 10)
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
            min: labels[0],
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
            maxTicksLimit: 2
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
          label: (tooltipItem) => {
            this.yLabel = tooltipItem.label            
            return (tooltipItem.yLabel as string).toLocaleString() + ' ₩'
          },        
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
    
  createChartData(): any {    
    const labels = this.getChartLabels()
    const data = this.getChartDatas()
    return {      
      labels,
      datasets: [
        {
          type: 'line',
          data,
          fill: this.gradient,
          borderColor: MAIN_COLOR,
          backgroundColor: transparentize(MAIN_COLOR, 1),
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

  // 차트 렌더링 준비
  renderingChart() {

    // 차트 옵션과 데이터 준비
    const chartData = this.createChartData()
    this.applyDefaultChartOptions()    

        
    // 거래량이 로딩되지 않았다면, 로딩
    if(!this.volumeFlag) { 
      this.getStockGraphVolume(this.$route.params.title).then(() => {        
        this.createChart(chartData)
      })
      
    } 
    
  
    // 거래량 옵션이 설정되어있으면 애니메이션 삭제, 설정되어있으면 거래량 데이터 푸시
    else {      
      if(this.volume && this.chartOptions.scales.yAxes.length !== 2) {        
        const data = Object.values(this.stockGraphVolume)
        this.chartOptions.scales.yAxes.push({
          id: 'volume',
          type: 'linear',
          position: 'right',
          ticks: {
            min: 0,
            max: 100000000,
            display: false
          },
          gridLines: {
            display: false
          }                  
        })        
        chartData.datasets.push({
          label: '거래량ㅎ',
          type: 'bar',
          data,
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
  myZoom (chart: Chart, e) {
    const labels = this.getChartLabels()
    const datas = this.getChartDatas()

    const min = chart.config.options.scales.xAxes[0].ticks.min
    const max = chart.config.options.scales.xAxes[0].ticks.max
    const yMin = minStockData(datas.slice(labels.indexOf(min)))        
    const yMax = maxStockData(datas.slice(labels.indexOf(min)))

    if(min !== max) {
      if(e.wheelDeltaY >= 0) {
        chart.config.options.scales.xAxes[0].ticks.min = labels[labels.indexOf(min) + zoomScale]
        chart.config.options.scales.xAxes[0].ticks.max = labels[labels.indexOf(max) - zoomScale]                        
        chart.config.options.scales.yAxes[0].ticks.min = yMin - yMin * 0.1
        chart.config.options.scales.yAxes[0].ticks.max = yMax + yMax * 0.1
      }
    }

    if(e.wheelDeltaY < 0) {
      chart.config.options.scales.xAxes[0].ticks.min = labels[labels.indexOf(min) - zoomScale]
      chart.config.options.scales.xAxes[0].ticks.max = labels[labels.indexOf(max) + zoomScale]      
      chart.config.options.scales.yAxes[0].ticks.min = yMin - yMin * 0.1
      chart.config.options.scales.yAxes[0].ticks.max = yMax + yMax * 0.1
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
    
    if(!canvas) return
    const options = {
      data: chartData,
      options: this.chartOptions,
      plugins: [this.dottedLine, this.myCrossHair]
    }    
    
    this.chart = new Chart(canvas, options)        
    this.chart.canvas.addEventListener('mousewheel', e => {      
      this.myZoom(this.chart, e)
    }, {
      passive: false,
    })    

    this.chart.config.options.scales.xAxes[0].ticks.min = this.chart.config.data.labels[this.chart.config.data.labels.length - 1 - this.count]                
    const datas = this.getChartDatas()
    const min = minStockData(datas.slice(datas.length - 1 - this.count))
    const max = maxStockData(datas.slice(datas.length - 1 - this.count))
    this.chart.config.options.scales.yAxes[0].ticks.min = min - min * 0.2
    this.chart.config.options.scales.yAxes[0].ticks.max = max + max * 0.2

    this.chart.update()
  }

  mounted () {        
    this.renderingChart()
  }

  beforeDestroy () {
    if(this.chart) this.chart.destroy()
  }
    
}
</script>

<style>
#lineChart {
  backface-visibility: hidden;
}
</style>