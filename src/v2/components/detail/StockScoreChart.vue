<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'
import { Component, Prop } from 'vue-property-decorator'
import { mixins, Radar } from 'vue-chartjs-typescript'

import { transparentize } from '@/mixins/tools'
import { ISimpleChartData } from '@/models/stock'

const { reactiveProp } = mixins
const MAIN_COLOR = '#40E0D0'

@Component({
  extends: Radar,
  mixins: [reactiveProp],
})
export default class StockScoreChart extends Vue {
  
  @Prop({default: {}})
  chartData!: ISimpleChartData

  chartOptions: Chart.ChartOptions = {}

  renderChart!: (chartData: any, options: any) => any    

  applyDefaultOptions() {

    this.chartOptions.responsive = true
    this.chartOptions.legend = {
      display: false,      
    }
    this.chartOptions.animation = {
      duration: 1000,
      easing: 'easeOutBounce'
    }
    this.chartOptions.scale = {
      gridLines: {
        color: this.$vuetify.theme.dark ? transparentize('#fff', 0.9) : 'grey',   
        lineWidth: 1     
      },
      ticks: {
        display: false,
        stepSize: 500000
      },
      pointLabels: {
        fontSize: 20,        
      }
    }

    this.chartOptions.tooltips = {            
      enabled: true,
      titleFontSize: 25,
      titleFontColor: MAIN_COLOR,
      bodyFontSize: 10,
      cornerRadius: 10,
      displayColors: false,      
      intersect: false
      }          
  }
  
  createChartData () {            
    return {
      labels: ['eps', 'bps', 'roe'],
      datasets: [ 
        { 
          label: this.$route.params.title,
          data: [
            this.chartData?.eps.value[0],
            this.chartData?.bps.value[0]/100,
            this.chartData?.roe.value[0],
          ],          
          borderColor: MAIN_COLOR,
          borderWidth: 2,
          backgroundColor: transparentize(MAIN_COLOR, 0.8),
          lineColor: '#fff'
        },
      ],          
    }
  }
  renderLineChart() {
    this.applyDefaultOptions()
    this.renderChart(this.createChartData(), this.chartOptions)    
  }
  mounted() {        
    this.renderLineChart()
  }    
}
</script> 