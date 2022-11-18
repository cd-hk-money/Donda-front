<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins, Bar } from 'vue-chartjs-typescript'
import Chart from 'chart.js'

import { transparentize } from '@/mixins/tools'

const { reactiveProp } = mixins

const MAIN_COLOR = '#00BCD4'
const SUB_COLOR = 'rgb(255, 99, 132)'

@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockFinanceBarChart extends Vue {

  @Prop() chartData!: any

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
          display: false,
          fontSize: 15,                 
        },
        gridLines: {
          display: true,                             
          drawBorder: false    
        },      
      }], 
    },
    animation: {
      duration: 2000,
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
      labels: Object.keys(this.chartData).slice(-4),
      datasets: [
        {
          data : Object.values(this.chartData).slice(-4),
          fill: true,
          borderColor: ctx => ctx.dataset.data[ctx.dataIndex] > 0 ? MAIN_COLOR : SUB_COLOR,
          backgroundColor: ctx => ctx.dataset.data[ctx.dataIndex] > 0 ? transparentize(MAIN_COLOR, 0.85) : transparentize(SUB_COLOR, 0.85),          
          borderWidth: 3,
          radius: 4,
          pointStyple: 'rectRounded',
          tension: .4,         
          barThickness: 60,
          minBarLength: 10,
          
        }
      ]
    }    
  }

  renderChart!: (chartData: unknown, options: unknown) => unknown

  @Watch('chartData')
  watchRoute () {    
    
    console.log('ㅇㄴ~~')
  }

  mounted () {        
    this.renderChart(this.createChartData(), this.chartOptions)
  }

}
</script>