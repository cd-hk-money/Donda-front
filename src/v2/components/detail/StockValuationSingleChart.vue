<template>
  <canvas :id="label" :height="height"></canvas>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'
import Chart from 'chart.js'
import { namespace } from 'vuex-class'

const { reactiveProp } = mixins
const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockValuationSingleChart extends Vue {
  chart = {}  
  close: string[] = []

  get donda () {
    return this.close.map(k => Number(k) * 1.050)
  }

  @Prop({default: false}) fill!: boolean  
  @Prop() chartData!: any
  @Prop() height: number | string
  @Prop({default: 'undefined'}) label!: string
  @Prop({default: []}) dates!: string[]

  @StockStoreModule.State('stockGraphDefault') stockGraphDefault!: any
  @StockStoreModule.State('stockGraphAll') stockGraphAll!: any
  @StockStoreModule.State('stockEvaluation') stockEvaluation!: any
  @StockStoreModule.Action('getStockEvaluation') getStockEvaluation!: (stockCode: string) => Promise<void>  

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
        label: this.label,
        data : this.chartData,
        borderColor: SUB_COLOR,
        backgroundColor: transparentize(SUB_COLOR, 0.8),
        radius: 0,
        fill: false,
        pointStyple: 'rectRounded',
        tension: .4
      },
    ]
  }


  get chartOptions (): Chart.ChartOptions {
    return {
      maintainAspectRatio: true,
      responsive: true,

      legend: {
        display: true
      },

      plugins: {      
        'dottedLine': false,
        'myCrosshair': false,
        'mycrosshair': false,
      },

      scales: {
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
      },

      animation: {
        duration: 800,
        easing: 'easeInOutQuint'
      },

      tooltips: {
        enabled: true,
        intersect: false,
        titleFontSize: 25,
        bodyFontSize: 14,       
        mode: 'index'
      }
    }
  }

  createChart() {
    const canvas = document.getElementById(this.label) as HTMLCanvasElement        
    const labels = this.dates
    const datasets = this.chartDatasets
    const options = {
      data: { labels, datasets },
      options: this.chartOptions,      
    }    

    this.chart = new Chart(canvas, options as Chart.ChartConfiguration).update()            
  }

  mounted () {          
    this.close = 
      this.label !== 'PER' 
      ? this.stockEvaluation?.date
          .map(k => Object.entries(this.stockGraphAll).filter((v, _) => (v[0] as string).substr(0, 7) === k)[0][1])
      : Object
          .values(this.stockGraphAll)
          .slice(Object.values(this.stockGraphAll).length - this.dates.length, )
            
    this.createChart()         
  }

}
</script>

<style scoped>

</style>