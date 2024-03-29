<script lang="ts">
import Chart from 'chart.js'
import { Component, Prop } from 'vue-property-decorator'
import { mixins, Radar } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
import StockStoreMixin from '@/mixins/StockStoreMixin.vue'

const { reactiveProp } = mixins
const MAIN_COLOR = '#00BCD4'
const SUB_COLOR = 'rgb(255, 99, 132)'
const LABEL_INDEX = ['EPS', 'BPS', 'ROE']

interface ISector {
  eps: number | undefined
  bps: number | undefined
  roe: number | undefined
}

@Component({
  extends: Radar,
  mixins: [reactiveProp],
})
export default class StockIndicatorChart extends StockStoreMixin {
  
  @Prop({default: {}}) chartData!: ISector
  @Prop() sector!: ISector


  chartOptions: Chart.ChartOptions = {
    responsive: true,
    legend: {
      display: true,      
    },

    plugins: {
      crosshair: false
    },    

    scale: {
      gridLines: {
        color: this.$vuetify.theme.dark ? transparentize('#fff', 0.9) : 'grey',   
        lineWidth: 1     
      },
      ticks: {
        display: false,
      },
      pointLabels: {
        fontSize: 20,        
      },
    },

    animation: {
      duration: 1000,
      easing: 'easeOutBounce'
    },

    tooltips: {            
      enabled: true,
      titleFontSize: 13,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 13,
      cornerRadius: 10,
      displayColors: false,            
      mode: 'index',
      callbacks: {
        title: item => LABEL_INDEX[item[0].index]
      }      
    }   
  }
    
  createChartData () {            
    return {
      labels: ['EPS', 'BPS', 'ROE'],
      datasets: [ 
        { 
          label: this.stock.data.name,
          data: [
            this.chartData.eps?.toFixed(),
            (this.chartData.bps / 20)?.toFixed(),
            ((this.chartData.roe + 20) * 30)?.toFixed(),
          ],          
          borderColor: MAIN_COLOR,
          borderWidth: 1.5,
          fill: true,
          pointRadius: 4,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          lineColor: '#fff',          
          pointBackgroundColor: MAIN_COLOR,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
        {
          label: '업종 평균',
          data: [
            this.sector.eps?.toFixed(),
            (this.sector.bps / 20)?.toFixed(),
            ((this.sector.roe + 20) * 30)?.toFixed(),            
          ],          
          borderWidth: 1.5,
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: SUB_COLOR,
          pointRadius: 4,
          pointBackgroundColor: SUB_COLOR,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: SUB_COLOR
        }
      ],          
    }
  }

  renderChart!: (chartData: unknown, options: unknown) => unknown    
  
  mounted() {        
    this.renderChart(this.createChartData(), this.chartOptions)    
  }    
}
</script> 