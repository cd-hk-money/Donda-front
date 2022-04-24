<script lang="ts">
import { mixins, Line } from 'vue-chartjs-typescript'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { LineChartModel } from '@/models/stock'

const { reactiveProp } = mixins

const MIN = 60000
const MAX = 73000
const POINT_RADIUS = 2

@Component({
  extends: Line,
  mixins: [reactiveProp],
})
export default class LineChart extends Vue {
  @Prop()
  private chartData: any

  @Prop()
  private label!: string

  @Prop({default: function () { return {} }})
  options!: object

  private readonly options2: object | undefined
  
  public renderChart!: (chartData: any, options: any) => any    

  mounted() {
    this.renderChart({
      labels: this.chartData
                .map((stock: LineChartModel) => stock.date.substr(5)),
      datasets: [ 
        { 
          label: this.label,
          data: this.chartData.map((stock: LineChartModel) => stock.value),
          height: 30,
          fill: 'origin',          
          borderColor: '#00BCD4',
          borderWidth: 3,       
          radius: POINT_RADIUS,
          pointStyle: 'rectRoundedr',
          tension: .5,          
        },
        {
          label: '적정 주가',
          data: this.chartData.map((stock: LineChartModel) => Math.floor(stock.value * (Math.random()*0.05 + 0.95))),
          height: 30,
          fill: false,          
          borderColor: '#00FF00',
          borderWidth: 3,       
          radius: POINT_RADIUS,          
          tension: .5
        }
      ],          
    }, {      
      legend: {
        labels: {
          fontColor: 'grey',
          fontStyle: 'bold',
          fontSize: 14
        },
        onclick: function() {return }
      },
      scales: {              
        xAxes: [{
          title: {
            color: '#fff'
          },
          gridLines: {
            display: false
          },
        }],
        yAxes: [{            
          ticks: {
            callback: function(value: string) {return '₩ ' + value.toLocaleString()},            
            stepSize: MAX - MIN - 1000,
            display: true,
          },
          min: MIN,
          max: MAX,          
          gridLines: {
            display: false
          },          
        }],          
      },
      plugins: {
        legend: {
          title: {
            display: true,
            text: 'Legend Title',
          }
        }
      },
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 1000,       
        easing: 'easeInOutCubic'         
      }
    })
  }    
}
</script>