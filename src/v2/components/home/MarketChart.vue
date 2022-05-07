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
  color!: string

  @Prop({default: function () { return {} }})
  options!: object

  @MarketStoreModule.State('marketChart')
  marketChart!: IMarketChartModel

  @MarketStoreModule.State('requestDate')
  requestDate!: number
  
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
      duration: 1000,
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

  renderLineChart() {
    this.applyDefaultOptions()
    this.renderChart(this.createChartData(this.type, this.requestDate, this.fill), this.chartOptions)    
  }

  mounted() {        
    this.renderLineChart()
  }    
}
</script>