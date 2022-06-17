<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mixins, Line } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
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
  mobile!: boolean

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

  @Watch('height')
  watchHeight(val) {
    console.log(val)
  }
  
  @Watch('fill')
  watchFill () {
    this.reRender()
  }
  
  reRender () {
    this.renderLineChart()
  }

  applyDefaultOptions() {
    this.chartOptions.responsive = true
    this.chartOptions.legend = {
      display: false,      
    }

    this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: false,                    
          drawTicks: false
        },        
        ticks: {       
          fontSize: this.mobile ? 14 : 20,     
          maxTicksLimit: 15,   
          lineHeight: 1                                                 
        },
        scaleLabel: {
          fontSize: 20
        }
      }],
      yAxes: [{
        ticks: {
          callback: function(value: string) {return value.toLocaleString()},
          fontSize: 20,    
          maxTicksLimit: 3,
          display: !this.mobile            
        },
        gridLines: {
          display: false,  
          drawTicks: false        
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
    const marketType = this.marketChart[this.type]
    return {
      labels: [...[...marketType.labels].reverse().slice(0, this.requestDate)].reverse().map((date: string) => date.substr(5)),
      datasets: [ 
        { 
          label: this.type,
          data: [...[...marketType.values].reverse().slice(0, this.requestDate)].reverse().map((k: MarketModel) => k.close),
          fill: fill,        
          borderColor: MAIN_COLOR,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          borderWidth: 5,                 
          radius: this.requestDate > 150 ? 0 : 0,
          pointStyle: 'rectRounded',
          tension: .4,          
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

  updated() {
    this.renderLineChart()    
  }
}

</script>