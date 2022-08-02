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
  @Prop() type!: string
  @Prop() chartData!: null
  @Prop() fill!: boolean
  @Prop() mobile!: boolean
  @Prop() height: number

  @Prop({default: function () { return {} }})
  options!: object

  @MarketStoreModule.State('marketChart')
  marketChart!: IMarketChartModel

  @MarketStoreModule.State('requestDate')
  requestDate!: number

  
  renderChart!: (chartData: any, options: any) => HTMLCanvasElement    

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
          fontSize: 13,               
          fontStyle: 'normal',          
          maxRotation: 0,
          maxTicksLimit: 10,             
        },
        scaleLabel: {
          fontSize: 15
        }
      }],
      yAxes: [{
        ticks: {
          callback: function(value: string) {return value.toLocaleString()},
          fontSize: 15,              
          maxTicksLimit: 3, 
          padding: 18,                   
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
      zoom
    }  
    
    this.chartOptions.tooltips = {
      enabled: true,
      titleFontSize: 15,
      backgroundColor: '#666',
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 25,
      cornerRadius: 7,
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
          borderWidth: 3,                 
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
    const chart = this.renderChart(this.createChartData(this.type, this.requestDate, this.fill), this.chartOptions)    
  }

  mounted() {            
    this.renderLineChart()    
  }    

  updated() {
    this.renderLineChart()    
  }
}

</script>