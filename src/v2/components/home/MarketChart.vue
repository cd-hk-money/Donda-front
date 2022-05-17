<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mixins, Line } from 'vue-chartjs-typescript'

import { getGradient, transparentize } from '@/mixins/tools'
import { IMarketChartModel, MarketModel } from '@/models/market'

import zoom from 'chartjs-plugin-zoom'

const { reactiveProp } = mixins
const MarketStoreModule = namespace('MarketStore')

const MAIN_COLOR = '#40E0D0'

@Component({
  extends: Line,
  mixins: [reactiveProp],
})
export default class LineChart extends Vue {
  @Prop()
  type!: string

  @Prop()
  chartData!: null

  @Prop()
  fill!: boolean

  @Prop()
  color!: string

  @Prop({default: function () { return {} }})
  options!: object

  @MarketStoreModule.State('marketChart')
  marketChart!: IMarketChartModel

  @MarketStoreModule.State('requestDate')
  requestDate!: number

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
  
  renderChart!: (chartData: any, options: any) => any    

  chartOptions: Chart.ChartOptions = {}

  @Watch('requestDate')
  watchRequestDate () {
    this.$nextTick(() => {
      this.reRender()
    })
  }

  @Watch('chartOptions')
  watchChartOptions () {
    this.reRender()
  }
  
  @Watch('fill')
  watchFill () {
    this.reRender()
  }
  
  reRender () {
    this.$nextTick(() => {
      this.renderLineChart()
    })    
  }

  applyDefaultOptions() {
    this.chartOptions.responsive = true
    this.chartOptions.legend = {
      display: false,      
    }

    this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: true,
        },        
        ticks: {       
          fontSize: this.requestDate > 150 ? 15 : 20,          
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
          maxTicksLimit: 3            
        },
        gridLines: {
          display: true
        }
      }]
    }

    this.chartOptions.animation = {
      duration: 1000,
      easing: 'easeOutBounce'
    }

    this.chartOptions.plugins = {      
      crosshair: false
    }  
    
    this.chartOptions.tooltips = {
      enabled: true,
      titleFontSize: 25,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 40,
      cornerRadius: 10,
      displayColors: false,
      callbacks: {
        label: (tooltipItem) => tooltipItem.yLabel as string,        
      },
      intersect: false
    }    
  }

  createChartData (type: string, count: number, fill: boolean | string) {
    let marketType

    if(type === 'KOSPI') marketType = this.marketChart.kospi 
    else if(type === 'NASDAQ') marketType = this.marketChart.nasdaq 
    else marketType = this.marketChart.snp500 

    return {
      labels: [...[...marketType.labels].reverse().slice(0, this.requestDate)].reverse().map((date: string) => date.substr(5)),
      datasets: [ 
        { 
          label: this.type,
          data: [...[...marketType.data].reverse().slice(0, this.requestDate)].reverse().map((k: MarketModel) => k.close),
          fill: fill,
          borderColor: context => {
            const {ctx, chartArea, data, scales, width, height} = context.chart
            if(!chartArea) return null            
            return getGradient(ctx, chartArea, data, scales, width, height)
          },
          backgroundColor: transparentize(this.color, 0.8),
          borderWidth: 2,                 
          radius: this.requestDate > 150 ? 0.5 : 4,
          pointStyle: 'rectRounded',
          tension: 0,          
          pointHitRadius: 10,
          hoverPointRadius: 10          
        },
      ],          
    }
  }

  renderLineChart() {
    this.applyDefaultOptions()
    this.renderChart(this.createChartData(this.type, this.requestDate, this.fill), this.chartOptions)    
  }

  mounted() {        
    this.renderLineChart()
  }    
}

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
</script>