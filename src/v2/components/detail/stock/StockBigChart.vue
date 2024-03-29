<template>  
  <canvas id="lineChart" :height="height"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize,  meanStockData, maxStockData, minStockData, priceFormatter} from '@/mixins/tools'

import Chart from 'chart.js'
import StockStoreMixin from '@/mixins/StockStoreMixin.vue'

const { reactiveProp } = mixins
const MAIN_COLOR = '#00BCD4'
const zoomScale = 1


@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockBigChart extends StockStoreMixin {

  // datas
  chart!: Chart  
  chartOptions: Chart.ChartOptions = {}
  yLabel: string
  count = 20

  // props
  @Prop({default: false}) fill!: boolean | undefined  
  @Prop() chartData!: never
  @Prop({default: true}) gradient!: boolean | undefined
  @Prop({default: false}) volume!: boolean | undefined
  @Prop() height: number | string

  @Watch('volume')
  watchVolume() {
    this.renderingChart()
  }

  getChartLabels () {
    return Object.keys(this.stockGraphAll.data)
  }  
  
  getChartDatas (): number[] {
    return Object.values(this.stockGraphAll.data)
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
      ctx.fillText(priceFormatter.format(startingPoint as number), left / 2, y.getPixelForValue(startingPoint))                                    

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
      ctx.fillText(priceFormatter.format(text), left / 2, lineY)


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
            callback: v => priceFormatter.format(v as number),
            fontSize: 17,    
            maxTicksLimit: 2
          },
          gridLines: {
            display: false
          },                
                       
        }],        
      },

      animation: {
        duration: 0,
        easing: 'easeOutQuart',
      },

    tooltips: {
        enabled: true,
        intersect: false,
        titleFontSize: 25,
        titleFontColor: MAIN_COLOR,
        bodyFontSize: 30,
        cornerRadius: 10,
        displayColors: false,
        bodyAlign: 'center',
        callbacks: {
          label: (tooltipItem) => {
            this.yLabel = tooltipItem.label
            return priceFormatter.format(tooltipItem.yLabel as number) 
            
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
    
  createChartData(): Chart.ChartData {    
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
          lineTension: .4,         
          pointRadius: 0,
          pointHitRadius: 10,
          pointHoverRadius: 5
        },                
      ]
    }
  }

  createCloseData() {
    return {
      type: 'line',
          data: this.getChartDatas(),
          fill: this.gradient,
          borderColor: MAIN_COLOR,
          backgroundColor: transparentize(MAIN_COLOR, 1),
          borderWidth: 3,
          pointStyle: 'rectRounded',          
          lineTension: .4,         
          pointRadius: 0,
          pointHitRadius: 10,
          pointHoverRadius: 5
    }
  }

  createVolueData() {
    return {
      label: '거래량',
      type: 'bar',
      data: Object.values(this.stockGraphVolume.data),
      fill: true,
      yAxisID: 'volume',
      backgroundColor: transparentize(MAIN_COLOR, 0.8),            
      minBarLength: 5,
    }
  }

  get getChartData(): Chart.ChartData {
    return this.createChartData()
  }

  // 차트 렌더링 준비
  renderingChart() {

    const labels = this.getChartLabels()
    
    this.applyDefaultChartOptions()    
                  
    if(this.volume) {        

      this.chartOptions.scales.yAxes.push({
        id: 'volume',
        type: 'linear',
        position: 'right',
        ticks: {            
          display: true
        },
        gridLines: {
          display: false
        }                  
      })         

      const chartData = {
        labels,
        datasets: [this.createCloseData(), this.createVolueData()]
      }

      this.createChart(chartData)
    } else {
      const chartData = {
        labels,
        datasets: [this.createCloseData()]
      }
      this.createChart(chartData)
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
                
    this.chart.update()    

  }

  event (e) {
    this.myZoom(this.chart, e)
  }

  createChart(chartData: object) {                
            
    if(this.chart) {      
      this.chart.clear()     
    }   
                
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement
        
    const options = {
      data: chartData,
      options: this.chartOptions,
      plugins: [this.dottedLine, this.myCrossHair]
    }    

    this.chart = new Chart(canvas, options)   
        
    this.chart.canvas.removeEventListener('mousewheel', this.event)
    this.chart.canvas.addEventListener('mousewheel', this.event, {passive: false})    
    
    this.chart.config.options.scales.xAxes[0].ticks.min = this.chart.config.data.labels[this.chart.config.data.labels.length - 1 - this.count]                
    this.chart.options.animation = null

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