<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Chart from 'chart.js'
import { mixins, Bar } from 'vue-chartjs-typescript'

import { numToKorean, transparentize } from '@/mixins/tools'
import { ISimpleChartData } from '@/models/stock'

const { reactiveProp } = mixins
const StockStoreModule = namespace('StockStore')
const MAIN_COLOR = '#00BCD4'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockFinanceLineChart extends Vue {

  @Prop() chartData!: null
  @Prop() statementType!: string  
  
  @StockStoreModule.Action('getStockStatementAll')
  readonly getStockStatementAll!: (payload: {code: string, statementType: string}) => Promise<void>

  @StockStoreModule.State('statementAll') statementAll!: ISimpleChartData

  chartOptions: Chart.ChartOptions = {
    maintainAspectRatio: true,
    responsive: true,    
    legend: {
      display: false
    },

    plugins: {
      crosshair: false
    },

    scales: {
      xAxes: [{
        gridLines: {
          display: false,
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
          callback: (value: number) => numToKorean(value),
          fontSize: 15,       
        },
        gridLines: {
          display: false
        },      
      }], 
    },

    animation: {
      duration: 1300,
      easing: 'easeOutQuad'
    },
    
    tooltips: {      
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
      labels: Object.keys(this.statementAll) ?? [],
      datasets: [
        {
          data : Object.values(this.statementAll) ?? [],
          fill: false,
          borderColor: ctx => ctx.dataset.data[ctx.dataIndex] > 0 ? MAIN_COLOR : SUB_COLOR,
          backgroundColor: ctx => ctx.dataset.data[ctx.dataIndex] > 0 ? transparentize(MAIN_COLOR, 0.85) : transparentize(SUB_COLOR, 0.85),
          borderWidth: 3,                    
          radius: 4,          
          barThickness: 30,
          pointStyle: 'rectRounded',
          tension: .4,               
        }
      ]
    }    
  }

  numToKorean(number: number) {
    if(number > 1000000000000) return number % 1000000000000 + '조'
  }

  renderChart!: (chartData: unknown, options: unknown) => unknown
  
  async mounted () {
    await this.getStockStatementAll({code: this.$route.params.title, statementType: this.statementType})
    this.renderChart(this.createChartData(), this.chartOptions)
  }
    
}
</script>