<script lang="ts">
  import { Bar, mixins } from 'vue-chartjs-typescript'
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  const { reactiveProp } = mixins

  @Component({
    extends: Bar,
    mixins: [reactiveProp],
  })
  export default class BarChart extends Vue {
    @Prop()
    private chartData: any

    @Prop({default: function () { return {} }})
    private options!: object

    public renderChart!: (chartData: any, options: any) => void

    mounted() {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>