<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'
import Vue from 'vue'

import { IMarketChartModel, MarketModel } from '@/models/market'

const { reactiveProp } = mixins
const MarketStoreModule = namespace('MarketStore')

const MIN = 60000
const MAX = 73000

const POINT_RADIUS = 2
const BORDER_RADIUS = 2

@Component({
  extends: Line,
  mixins: [reactiveProp],
})
export default class LineChart extends Vue {
  @Prop()
  private type!: string

  @Prop()
  private chartData!: null

  @Prop({
    default: 199
  })
  private count!: number

  @Prop()
  private color!: string

  @Prop({default: function () { return {} }})
  options!: object

  @MarketStoreModule.State('marketChart')
  private marketChart!: IMarketChartModel

  private readonly options2: object | undefined
  
  public renderChart!: (chartData: any, options: any) => any    

  mounted() {

    let marketType
    if(this.type === 'KOSPI') { marketType = this.marketChart.kospi }
    else if(this.type === 'NASDAQ') { marketType = this.marketChart.nasdaq }
    else { marketType = this.marketChart.snp500 }

    this.renderChart({
      labels: marketType.labels.reverse().slice(0, 20),
      datasets: [ 
        { 
          label: this.type,
          data: marketType.data.reverse().slice(0, 20).map((k: MarketModel) => k.close),
          height: 30,
          fill: 'start',          
          borderColor: this.color,
          backgroundColor: transparentize(this.color, 0.9),
          borderWidth: BORDER_RADIUS,                 
          radius: POINT_RADIUS,
          pointStyle: 'rectRoundedr',
          tension: .4,          
        },
      ],          
    }, {      
      legend: {
        display: false,
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
            // stepSize: 1000,
            display: true,
          },
          // min: 0,
          // max: MAX,          
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
        },
        plugins: {
          filler: {
            propagate: false
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