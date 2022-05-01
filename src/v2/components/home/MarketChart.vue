<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mixins, Line } from 'vue-chartjs-typescript'
import { transparentize } from '@/mixins/tools'
import Vue from 'vue'

import { IMarketChartModel, MarketModel } from '@/models/market'

const { reactiveProp } = mixins
const MarketStoreModule = namespace('MarketStore')

const MIN = 60000
const MAX = 73000

const POINT_RADIUS = 3
const BORDER_RADIUS = 4

@Component({
  extends: Line,
  mixins: [reactiveProp],
})
export default class LineChart extends Vue {
  @Prop()
  private type!: string

  @Prop()
  private chartData!: null

  @Prop()
  private fill!: boolean

  @Prop()
  private color!: string

  @Prop({default: function () { return {} }})
  options!: object

  @Prop()
  private chartOptions: any

  @MarketStoreModule.State('marketChart')
  private marketChart!: IMarketChartModel

  @MarketStoreModule.State('requestDate')
  private requestDate!: number
  
  public renderChart!: (chartData: any, options: any) => any    

  @Watch('requestDate')
  private watchRequestDate () {
    this.$nextTick(() => {
      this.reRender()
    })
  }

  @Watch('chartOptions')
  private watchChartOptions () {
    this.reRender()
  }
  
  @Watch('fill')
  private watchFill () {
    this.reRender()
  }
  
  public reRender () {
    this.$nextTick(() => {
      this.renderLineChart()
    })    
  }

  public createChartData (type: string, count: number, fill: boolean | string) {
    let marketType

    if(type === 'KOSPI') { marketType = this.marketChart.kospi }
    else if(type === 'NASDAQ') { marketType = this.marketChart.nasdaq }
    else { marketType = this.marketChart.snp500 }

    return {
      labels: [...[...marketType.labels].reverse().slice(0, this.requestDate)].reverse().map((date: string) => date.substr(5)),
      datasets: [ 
        { 
          label: this.type,
          data: [...[...marketType.data].reverse().slice(0, this.requestDate)].reverse().map((k: MarketModel) => k.close),
          height: 30,
          fill: fill,
          borderColor: this.color,
          backgroundColor: transparentize(this.color, 0.9),
          borderWidth: BORDER_RADIUS,                 
          radius: POINT_RADIUS,
          pointStyle: 'rectRoundedr',
          tension: .4,          
        },
      ],          
    }
  }

  public renderLineChart() {
    this.renderChart(this.createChartData(this.type, this.requestDate, this.fill), this.chartOptions)    
  }

  mounted() {        
    this.renderLineChart()
  }    
}
</script>