<script lang="ts">
import { mixins, Line } from 'vue-chartjs-typescript'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { LineChartModel } from '@/models/stock'

const { reactiveProp } = mixins

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
          fill: false,          
          borderColor: '#00BCD4',
          borderWidth: 3,       
          radius: 5,
          pointStyle: 'rectRoundedr'
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
            callback: function(value: string) {return '₩' + value.toLocaleString()},            
          },
          gridLines: {
            display: false
          }
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
        duration: 2000
      }
    })
  }    
}
</script>