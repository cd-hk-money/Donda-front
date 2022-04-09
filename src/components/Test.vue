<template>
  <test-chart 
    :chartData="chartData"
    :options="options"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TestChart from '@/components/TestChart.vue'

@Component({
  components: {
    TestChart
  }
}) 
export default class Test extends Vue {
  private chartData = {
    labels: [ 'January', 'February', 'March' ],
    datasets: [ 
      { 
        label: '# of Votes',
        data: [20, 20, 12],
          backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      }       
    ]
  }
  private options = {
    maintainAspectRatio: false, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
}
</script>

