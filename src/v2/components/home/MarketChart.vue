<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'

import Vue from 'vue'
import Chart, { ChartData, ChartOptions } from 'chart.js'
import VueChart from 'vue-chartjs'
import zoom from 'chartjs-plugin-zoom'
// import datalabels from 'chartjs-plugin-datalabels'
import { IMarketChartModel, MarketModel } from '@/models/market'

const { reactiveProp } = mixins
const MarketStoreModule = namespace('MarketStore')

const MIN = 60000
const MAX = 73000
const MAIN_COLOR = '#40E0D0'

const POINT_RADIUS = 4
const BORDER_RADIUS = 6

@Component({
  extends: Line,
  mixins: [reactiveProp],
})
export default class LineChart extends Vue {
  @Prop()
  private type!: string

  @Prop()
  private chartData!: null

  @Prop()
  private fill!: boolean

  @Prop()
  private color!: string

  @Prop({default: function () { return {} }})
  options!: object

  @MarketStoreModule.State('marketChart')
  private marketChart!: IMarketChartModel

  @MarketStoreModule.State('requestDate')
  private requestDate!: number
  
  public renderChart!: (chartData: any, options: any) => any    

  public chartOptions: Chart.ChartOptions = {}

  @Watch('requestDate')
  private watchRequestDate () {
    this.$nextTick(() => {
      this.reRender()
    })
  }

  @Watch('chartOptions')
  private watchChartOptions () {
    this.reRender()
  }
  
  @Watch('fill')
  private watchFill () {
    this.reRender()
  }
  
  public reRender () {
    this.$nextTick(() => {
      this.renderLineChart()
    })    
  }

  private applyDefaultOptions() {
    Chart.plugins.register(zoom)    

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
      duration: 1200,
      easing: 'easeOutBounce'
    }

    this.chartOptions.plugins = {      
      zoom: {
        zoom: {          
          drag: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'x'
        }
      },      
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
      }
    }    
  }

  public createChartData (type: string, count: number, fill: boolean | string) {
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
          height: 30,
          fill: fill,
          borderColor: this.color,
          backgroundColor: transparentize(this.color, 0.8),
          borderWidth: this.requestDate > 150 ? 4 : 6,                 
          radius: this.requestDate > 150 ? 0.5 : 4,
          pointStyle: 'rectRounded',
          tension: .4,          
        },
      ],          
    }
  }

  public renderLineChart() {
    this.applyDefaultOptions()
    this.renderChart(this.createChartData(this.type, this.requestDate, this.fill), this.chartOptions)    
  }

  mounted() {        
    this.renderLineChart()
  }    
}
</script>