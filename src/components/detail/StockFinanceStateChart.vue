<script lang="ts">
import { mixins, Line, Doughnut } from 'vue-chartjs-typescript'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { LineChartModel } from '@/models/stock'

const { reactiveProp } = mixins

@Component({
  extends: Doughnut,
  mixins: [reactiveProp],
})
export default class StockFinanceStateChart extends Vue {
  @Prop()
  private chartData: any

  @Prop()
  private label!: string

  @Prop({default: function () { return {} }})
  options!: object

  private readonly options2: object | undefined
  
  public renderChart!: (chartData: any, options: any) => any    

  mounted() {
    console.log('mounted')
    this.renderChart({
      labels: [
        'Red',
        'Blue',
        "Yellow"
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [1300, 50, 100],
        backgroundColor: [
          '#00BCD4',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4,        
        borderJoinStyle: 'round',
        borderWidth: 2,
        borderRadius: 30,
        hoverBorderColor: [
          '#00BCD4'
        ]
      }],
    }, {
      legend: {
        display: false,        
      }
    })
  }    
}
</script>