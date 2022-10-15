<template>
  <canvas :id="type" :height="height"></canvas>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mixins, Line } from 'vue-chartjs-typescript'

import { transparentize, myCrossHair } from '@/mixins/tools'
import { IMarketChartModel, MarketModel } from '@/models/market'


const { reactiveProp } = mixins
const MarketStoreModule = namespace('MarketStore')

const MAIN_COLOR = '#00BCD4'
const REQUEST_DATE = [14, 30, 120]

@Component({
  extends: Line,
  mixins: [reactiveProp],
})
export default class LineChart extends Vue {
  @Prop() type!: string
  @Prop() chartData!: null
  @Prop() fill!: boolean
  @Prop() mobile!: boolean
  @Prop({default: 40}) height: number
  @Prop({default: 0}) count!: number

  @Prop({default: function () { return {} }}) options!: object

  @MarketStoreModule.State('marketChart') marketChart!: IMarketChartModel
  @MarketStoreModule.State('requestDate') requestDate!: number
  
  renderChart!: (chartData: any, options: any) => HTMLCanvasElement    

  chart!: Chart
  chartOptions: Chart.ChartOptions = {
    responsive: true,
    legend: {
      display: false,      
    },
       
    scales: {
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
          callback: (value: string) => value.toLocaleString(),          
          fontSize: 15,              
          padding: 18,                   
          display: !this.mobile            
        },
        gridLines: {
          display: false,  
          drawTicks: false        
        }
      }]
    },

    animation: {
      duration: 1000,
      easing: 'easeOutBounce'
    },

    plugins: {      
      'dottedLine': false,
    },
    
    tooltips: {
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
      intersect: false,
      mode: 'index'
    }       
  }

  crosshairPoint = {
    id: 'crosshairPoint',
    
  } 

  
  @Watch('count')
  watchFill () {
    this.createChart()
  }
  
  createChartData (type: string, count: number): Chart.ChartData {
    const market = this.marketChart[this.type]    
    console.log(this.count)
    return {
      labels: market.labels.slice(count * (-1)).map(label => label.substr(5)),      
      datasets: [ 
        { 
          type: 'line',
          label: this.type,
          data: market.values.slice(count * (-1)).map((value: MarketModel) => value.close), 
          fill: false,        
          borderColor: MAIN_COLOR,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          borderWidth: 3.5,                           
          pointStyle: 'circle',
          pointHitRadius: this.count === 2 ? 1 : 200,
          pointRadius: this.count === 2 ? 0 : 3,
          pointHoverRadius: 10,
          pointBackgroundColor: MAIN_COLOR,
          pointHoverBackgroundColor: '#fff',          
          pointBorderColor: '#fff',
          pointBorderWidth: this.count === 2 ? 0 : 2.5,   
    
        },
      ],          
    }
  }

  createChart() {
    if(this.chart) this.chart.destroy()

    const canvas = document.getElementById(this.type) as HTMLCanvasElement
    if(!canvas) return

    const options: Chart.ChartConfiguration = {
      data: this.createChartData(this.type, REQUEST_DATE[this.count]),
      options: this.chartOptions,
      plugins: []
    }

    this.chart = new Chart(canvas, options)
  }
  
  mounted() {            
    this.createChart()
  }    

  updated() {
    this.createChart()
  }
}

</script>