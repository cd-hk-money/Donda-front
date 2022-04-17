<template>
  <v-card 
    class="mr-5 mt-7 mb-5 grey darken-4"
    min-height="340"
    elevation="0"        
    link
    @click="active"
  >
    <v-card-title class="text-h5">
      분석결과 컴포넌트..
    </v-card-title>
    <stock-finance-state-chart :height="300"/>
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
  private active = false
  private doActive() {
    this.active = !this.active
    this.$emit('analysis', this.active)
  }
}
</script>