<script lang="ts">
  import { Bar, mixins, Line } from 'vue-chartjs-typescript'
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  const { reactiveProp } = mixins

  @Component({
    extends: Line,
    mixins: [reactiveProp],
  })
  export default class BarChart extends Vue {
    @Prop()
    private chartData: any

    @Prop({default: function () { return {} }})
    private options: any
    
    public renderChart!: (chartData: any, options: any) => void

    mounted() {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>