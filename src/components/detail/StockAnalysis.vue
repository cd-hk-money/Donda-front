<template>
  <v-card 
    class="mr-5 mt-7 mb-5 grey darken-4"
    min-height="320">
    <v-card-title class="text-h5">
      분석결과 컴포넌트..
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StockFinanceStateChart from '@/components/detail/StockFinanceStateChart.vue'

@Component({
  components: {
    StockFinanceStateChart
  }
})
export default class StockFinanceState extends Vue {
  
}
</script>