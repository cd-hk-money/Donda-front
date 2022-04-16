<template>
  <canvas id="line" height="150" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component
export default class Line extends Vue {
  @Prop()
  private chartData: any
  
  @Prop({
    default: () => {
      return Chart.defaults.line
    }
  })
  private readonly options: object | undefined

  mounted() {
    this.createChart(this.chartData)
  }

  createChart(chartData: object) {
    const canvas = document.getElementById('line') as HTMLCanvasElement
    const options = {
      type: 'line',
      data: chartData,
      options: this.options,  
          
    }
    new Chart(canvas, options)
  }
}
</script>