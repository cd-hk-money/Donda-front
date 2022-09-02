<template>
  <canvas id="evalChart" :height="height"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'
import Chart from 'chart.js'
import { namespace } from 'vuex-class'

const { reactiveProp } = mixins
const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'
const myCrossHair = {
  id: 'myCrosshair',
  afterInit: function(chart) {
    chart.crosshair = {
      enabled: false,
      x: null,
      y: null,
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
    chart.crosshair.x = e.event.x
    chart.crosshair.y = e.event.y
    chart.draw();
  },
  drawTraceLine: (chart) => {
    const {ctx, data, chartArea: {top, bottom, left, right}, scales, width} = chart      
    const x = scales['x-axis-0']
    const y = scales['y-axis-0']
    const lineX = chart.crosshair.x
    const lineY = chart.crosshair.y
    const yScale = myCrossHair.getYScale(chart);
    const textWidth = ctx.measureText('0000-00-00').width + 10
    
    ctx.beginPath()          
    ctx.lineWidth = 2
    ctx.strokeStyle = '#a1a1a3'

    ctx.moveTo(lineX, yScale.getPixelForValue(yScale.max))
    ctx.lineTo(lineX, yScale.getPixelForValue(yScale.min))

    ctx.stroke()
    ctx.closePath()      

    crosshairPoint(chart, chart.crosshair)
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

function crosshairPoint(chart, mousemove) {
  const {ctx, data, chartArea: {top, bottom, left, right}, scales: {x, y}, width} = chart   
  
  const coorX = mousemove.x
  const coorY = mousemove.y

  ctx.beginPath()
  ctx.fillStyle = 'rgba(255, 26, 104, 1)'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2
  ctx.setLineDash([6, 0])

  const angle = Math.PI / 180
  const segments = x._gridLineItems.length - 1

  if(data.datasets[1]) {
    for(let i = 0; i < segments; i++) {
      if(coorX >= x._gridLineItems[i].tx1 && coorX <= x._gridLineItems[i + 1].tx1) {
        let y1Start = y.getPixelForValue(data.datasets[0].data[i])
        let y1End = y.getPixelForValue(data.datasets[0].data[i + 1])
  
        let y2Start = y.getPixelForValue(data.datasets[1].data[i])
        let y2End = y.getPixelForValue(data.datasets[1].data[i + 1])
  
        if(x._gridLineItems.length !== data.datasets[0].data.length) {
          y1Start = y.getPixelForValue(data.datasets[0].data[i * 2])
          y1End = y.getPixelForValue(data.datasets[0].data[i * 2 + 2])
          y2Start = y.getPixelForValue(data.datasets[1].data[i * 2])
          y2End = y.getPixelForValue(data.datasets[1].data[i * 2 + 2])
        }
  
        // console.log(data.datasets[0].data[i], y1Start, y1End, y2Start, y2End, x._gridLineItems[i].tx1)
  
        // 297.13867999999997 283.01309999999995 297.144385 290.86888500000003 764.5
        // 41.94262 33.25580666666666 77.72438000000001 71.75314666666668 775.5
  
        ctx.beginPath()
        ctx.fillStyle = '#5383e8'
        ctx.arc(
          coorX, 
          y1Start + ((y1End - y1Start) / (width / segments) * (coorX - x._gridLineItems[i].tx1)), 
          5, angle * 0, angle * 360, false
        )
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
  
        ctx.beginPath()
        ctx.fillStyle = '#e84057'
        ctx.arc(
          coorX, 
          y2Start + ((y2End - y2Start) / (width / segments) * (coorX - x._gridLineItems[i].tx1)), 
          5, angle * 0, angle * 360, false
        )
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
      }
    }

  } else {
    for(let i = 0; i < segments; i++) {
      if(coorX >= x._gridLineItems[i].tx1 && coorX <= x._gridLineItems[i + 1].tx1) {
        let y1Start = y.getPixelForValue(data.datasets[0].data[i])
        let y1End = y.getPixelForValue(data.datasets[0].data[i + 1])
  
        if(x._gridLineItems.length !== data.datasets[0].data.length) {
          y1Start = y.getPixelForValue(data.datasets[0].data[i * 2])
          y1End = y.getPixelForValue(data.datasets[0].data[i * 2 + 2])

        }

        ctx.beginPath()
        ctx.fillStyle = '#5383e8'
        ctx.arc(
          coorX, 
          y1Start + ((y1End - y1Start) / (width / segments) * (coorX - x._gridLineItems[i].tx1)), 
          5, angle * 0, angle * 360, false
        )
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

      }
    }
  }

  ctx.closePath()
}

@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockValuationChart extends Vue {

  chart = {}
  chartOptions: Chart.ChartOptions = {}
  close: string[] = []

  get donda () {
    return this.close.map(k => Number(k) * 1.050)
  }
  
  @Prop({default: false}) fill!: boolean  
  @Prop() chartData!: any
  @Prop() height: number
0
  @StockStoreModule.State('stockGraphDefault') stockGraphDefault!: any
  @StockStoreModule.State('stockGraphAll') stockGraphAll!: any
  @StockStoreModule.State('stockEvaluation') stockEvaluation!: any
  @StockStoreModule.Action('getStockEvaluation') getStockEvaluation!: (stockCode: string) => Promise<void>
  
  renderChart!: (chartData: any, options: any) => any

  

  get chartDatasets () {
    return [
      {
        type: 'line',
        label: '현재주가',
        data : this.close,
        borderColor: MAIN_COLOR,
        backgroundColor: transparentize(MAIN_COLOR, 0.8),
        radius: 0,
        fill: false,
        pointStyple: 'rectRounded',
        tension: .4
      },
      {
        type: 'line',
        label: '돈다지수',
        data : this.donda,
        borderColor: SUB_COLOR,
        backgroundColor: transparentize(SUB_COLOR, 0.8),
        radius: 0,
        fill: false,
        pointStyple: 'rectRounded',
        tension: .4
      },
      {
        type: 'line',
        label: 'EPS-ROE',
        data : this.stockEvaluation['proper-price'],
        borderColor: '#943',
        backgroundColor: transparentize('#943', 0.8),
        fill: false,
        radius: 0,        
        pointStyple: 'rectRounded',
      },
      {
        type: 'line',
        label: 'S-RIM',
        data : this.stockEvaluation['S-rim'],
        borderColor: '#6495ed',
        backgroundColor: transparentize('#6495ed', 0.8),
        fill: false,
        radius: 0,
        pointStyple: 'rectRounded',
      }
    ]
  }

  applyDefaultChartOptions () {

    this.chartOptions.maintainAspectRatio = true
    this.chartOptions.responsive = true
    this.chartOptions.legend = {
      display: true
    }

    this.chartOptions.plugins = {      
      'dottedLine': false,
      'myCrosshair': false,
      'mycrosshair': false,
    }  
    
    this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: true,
          
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
      duration: 800,
      easing: 'easeInOutQuint'
    }
    
    this.chartOptions.tooltips = {
      enabled: true,
      intersect: false,
      titleFontSize: 25,
      bodyFontSize: 14,       
      mode: 'index',
      // bodyAlign: 'left',
      // bodyFontColor: [MAIN_COLOR, SUB_COLOR, '#943', '#6495ed'],
      // callbacks: {
      //   label: _ => '',
      //   afterBody: k => {          
      //     const index = this.stockEvaluation?.date.indexOf(k[0].label)
      //     console.log(
      //       this.close[index],
      //       this.donda[index],
      //       this.stockEvaluation['proper-price'][index],
      //       this.stockEvaluation['S-rim'][index],
      //     )
      //     return [
      //       '현재 주가 : ' + this.close[index].toLocaleString(),
      //       '돈다 지수 : ' + this.donda[index].toLocaleString(),
      //       'EPS-ROS :' + this.stockEvaluation['proper-price'][index].toLocaleString(),
      //       'S-RIM :' + this.stockEvaluation['S-rim'][index].toLocaleString(),
      //     ]
      //   }
      // }
      
      // titleFontSize: 10,
      // titleFontColor: MAIN_COLOR,
      // bodyFontSize: 20,
      // cornerRadius: 10,
      // displayColors: false,
      // // callbacks: {
      // //   label: (tooltipItem, i) => {
      // //     console.log(tooltipItem.xLabel )
      // //     return ''
      // //   },        
      // //   afterBody: (tooltipItem) => 'ss',
      // //   footer: (s) => 'z'
      // // }
    }  
  }

  createChartData() {
    return {
      labels: [...this.stockEvaluation.date.reverse()],
      datasets: this.chartDatasets
    }
  }

  createChart() {
    const canvas = document.getElementById('evalChart') as HTMLCanvasElement    
    this.applyDefaultChartOptions()
    const options = {
      data: this.createChartData(),
      options: this.chartOptions,      
    }    

    this.chart = new Chart(canvas, options as Chart.ChartConfiguration).update()            

  }

  mounted () {          
    this.close =
      this.stockEvaluation?.date.map(k => 
        Object.entries(this.stockGraphAll).filter((v, _) => (v[0] as string).substr(0, 7) === k)[0][1]        
      )
    
    this.createChart()         
  }
}
</script>