<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import Chart from 'chart.js'
import { mixins, Bar } from 'vue-chartjs-typescript'

import { numToKorean, transparentize } from '@/mixins/tools'

const { reactiveProp } = mixins
const MAIN_COLOR = '#00BCD4'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockFinanceLineChart extends Vue {

  @Prop() chartData!: any
  @Prop() statementType!: string  
  

  get mobile () {
     return this.$vuetify.breakpoint.name === 'xs'
  }

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
      labels: Object.keys(this.chartData) ?? [],
      datasets: [
        {
          data : Object.values(this.chartData) ?? [],
          fill: false,
          borderColor: ctx => ctx.dataset.data[ctx.dataIndex] > 0 ? MAIN_COLOR : SUB_COLOR,
          backgroundColor: ctx => ctx.dataset.data[ctx.dataIndex] > 0 ? transparentize(MAIN_COLOR, 0.85) : transparentize(SUB_COLOR, 0.85),
          borderWidth: 3,                    
          radius: 4,          
          barThickness: this.mobile ? 5 : 30,
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
  
  mounted () {        
    console.log(this.chartData)
    this.renderChart(this.createChartData(), this.chartOptions)
  }
    
}
</script>