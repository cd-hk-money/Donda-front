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
const REQUEST_DATE = [10, 30, 120]

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
  @Prop() range!: string[]

  @Prop({default: function () { return {} }}) options!: object

  @MarketStoreModule.State('market') market!: IMarketChartModel
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
  watchCount () {
    this.createChart()
  }

  @Watch('range')
  watchRange (val) {
    if(val.length !== 0) this.createChart()  
  }
  
  createChartData (count: number | number[]): Chart.ChartData {
    const market = this.market[this.type]         
    const isNumber = typeof count === 'number'  
    const labels = isNumber
      ? market.labels.slice(count * (-1)).map(label => label.substr(5))
      : market.labels.slice(count[0], count[1]).map(label => label.substr(5))

    const data = isNumber
      ? market.values.slice(count * (-1)).map((value: MarketModel) => value.close)
      : market.values.slice(count[0], count[1]).map((value: MarketModel) => value.close) 
    
    return {
      labels,      
      datasets: [ 
        { 
          type: 'line',
          label: this.type,
          data, 
          fill: false,        
          borderColor: MAIN_COLOR,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          borderWidth: 3.5,                           
          pointStyle: 'circle',
          pointHitRadius: data.length > 50 ? 1 : 200,
          pointRadius: data.length > 50 ? 0 : 3,
          pointHoverRadius: 10,
          pointBackgroundColor: MAIN_COLOR,
          pointHoverBackgroundColor: '#fff',          
          pointBorderColor: '#fff',
          pointBorderWidth: data.length > 50 ? 0 : 2.5,       
        },
      ],          
    }
  }

  createChart() {
    if(this.chart) this.chart.destroy()

    const canvas = document.getElementById(this.type) as HTMLCanvasElement
    if(!canvas) return

    const options: Chart.ChartConfiguration = {
      data: this.createChartData(this.getRequestDate()),
      options: this.chartOptions,
      plugins: []
    }

    this.chart = new Chart(canvas, options)
  }

  getRequestDate(): number | number[] {    
    if(!this.range.length) return REQUEST_DATE[this.count]    

    let range = [...this.range]    
    const x = new Date(this.range[0])
    const y = new Date(this.range[1])

    if(x > y) range = [this.range[1], this.range[0]]
        
    return [
      this.correctionsDate(range[0]),
      this.correctionsDate(range[1])
    ]
        
  }

  correctionsDate(date) {
    const labels = this.market[this.type].labels
    const whileCondition = true
    let result
    let findDate = date
    while(whileCondition) {      
      const index = labels.indexOf(findDate)
      if(index !== -1) {
        result = index
        break
      }
      const k = new Date(findDate)
      findDate = new Date(k.setDate(k.getDate() - 1)).toISOString().substr(0, 10)
    }
    return result
  }
  
  mounted() {            
    this.createChart()
  }    

  updated() {
    this.createChart()
  }
}

</script>