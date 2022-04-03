<template>
  <div>
    <p>Change</p>
    <div v-if="loaded">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { StockSimpleModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component
export default class Change extends Vue {
  @StockStoreModule.State('loaded')
  private loaded!: boolean

  @StockStoreModule.State('stocks')
  private stocks!: Array<StockSimpleModel>

  @StockStoreModule.Action('todayMarket')
  private todayMarket!: () => void

  private created () {
    console.log('todayMarket()')
    this.todayMarket()
  }
 
}
</script>