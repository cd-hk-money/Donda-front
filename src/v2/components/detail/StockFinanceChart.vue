<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Chart from 'chart.js'
import { mixins, Bar } from 'vue-chartjs-typescript'

const StockStoreModule = namespace('StockStore')
const { reactiveProp } = mixins

@Component({
  extends: Bar,
  mixins: [reactiveProp]
})
export default class StockFinanceChart extends Vue {

  private chartOptions: Chart.ChartOptions = {}

  private applyDefaultOptions() {
    this.chartOptions.responsive = true
  }

  @Prop()
  private chartData!: string

  private createChartData() {
    return {

    }
  }

  public renderChart!: (chartData: any, options: any) => any

  private renderBarChart() {
    this.applyDefaultOptions()
    this.renderChart(this.createChartData(), this.chartOptions)
  }

  mounted () {
    this.renderBarChart()
  }
}
</script>