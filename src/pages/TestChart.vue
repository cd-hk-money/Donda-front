<script lang="ts">
  import { Bar, mixins, Line } from 'vue-chartjs-typescript'
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  const { reactiveProp } = mixins

  @Component({
    extends: Line,
    mixins: [reactiveProp],
  })
  export default class LineChart extends Vue {
    @Prop()
    private chartData: any

    @Prop({default: function () { return {} }})
    options!: object

    private readonly options2: object | undefined
    
    public renderChart!: (chartData: any, options: any) => any    

    mounted() {
      this.renderChart(this.chartData, {
        legend: {
          labels: {
            fontColor: 'grey',
            fontStyle: 'bold',
            fontSize: 13
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