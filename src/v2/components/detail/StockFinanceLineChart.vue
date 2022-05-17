<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Chart from 'chart.js'
import { mixins, Line } from 'vue-chartjs-typescript'

import { getGradient, transparentize } from '@/mixins/tools'
import { ISimpleChartData, IStockStatementBarChartModel } from '@/models/stock'

const { reactiveProp } = mixins
const StockStoreModule = namespace('StockStore')

const MAIN_COLOR = '#40E0D0'
const SUB_COLOR = 'rgb(255, 99, 132)'
const END_LABEL_INDEX = 23

@Component({
  extends: Line,
  mixins: [reactiveProp]
})
export default class StockFinanceLineChart extends Vue {

  @Prop()
  chartData!: null

  @Prop()
  type!: string

  @Prop()
  title!: string

  chartOptions: Chart.ChartOptions = {}

  @StockStoreModule.Action('getStockStatementAll')
  readonly getStockStatementAll!: (name: string) => Promise<void>

  @StockStoreModule.State('statementAll')
  statementAll!: ISimpleChartData

  applyDefaultOptions() {
    this.chartOptions.maintainAspectRatio = true
    this.chartOptions.responsive = true
    
    this.chartOptions.legend = {
      display: false
    }
    this.chartOptions.plugins = {
      crosshair: false
    }
      this.chartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: false,
          zeroLineColor: '#444444',          
        },
        ticks: {
          fontSize: 12,
        },
        scaleLabel: {
          fontSize: 15
        }
      }],
      yAxes: [{
        ticks: {
          callback: function(value: string) {return value.toLocaleString()},
          display: false,
          fontSize: 15,       
          beginAtZero: true,
        },
        gridLines: {
          display: true,             
          lineWidth: 0,
          zeroLineWidth: 2,       
          zeroLineBorderDash: [10, ],        
          zeroLineColor: this.$vuetify.theme.dark ?  '#fff' : 'gray'
        },      
      }], 
    }
    this.chartOptions.animation = {
      duration: 800,
      easing: 'easeOutQuad'
    }
    
    this.chartOptions.tooltips = {      
      enabled: true,
      titleFontSize: 15,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 20,
      cornerRadius: 10,
      displayColors: false,      
      callbacks: {
        label: (tooltipItem) => {
          const temp = tooltipItem.yLabel as string  
          return temp.toLocaleString() + ' ₩'
        }
      },
    }  
  }


  createChartData() {
    return {
      labels: Object.keys(this.statementAll),
      datasets: [
        {
          data : Object.values(this.statementAll),
          fill: false,
          borderColor: context => {
            const {ctx, chartArea, data, scales, width, height} = context.chart
            if(!chartArea) return null            
            return getGradient(ctx, chartArea, data, scales, width, height)
          },        
          backgroundColor: transparentize(MAIN_COLOR, 0.9),
          borderWidth: 3,          
          radius: ctx => (ctx.dataIndex === END_LABEL_INDEX || ctx.dataIndex === 0) ? 4 : 0,          
          pointStyple: 'rectRounded',
          tension: .4,               
        }
      ]
    }    
  }

  renderChart!: (chartData: any, options: any) => any

  renderLineChart() {
    this.applyDefaultOptions()
    this.renderChart(this.createChartData(), this.chartOptions)
  }

  mounted () {
    this.getStockStatementAll(this.title).then(() => {
      console.log(this.statementAll)
      this.renderLineChart()
    })    
  }
  
}
</script>