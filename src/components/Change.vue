<template>
  <div>
    <p>Change</p>
    <div v-if="loaded">

    </div>
  </div>
</template>

<script lang="ts">
import { Component,  Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { StockSimpleModel } from '@/models/stock'

import TopListMixin from '@/mixins/TopListMixin.vue'

const StockStoreModule = namespace('StockStore')

@Component
export default class Change extends Mixins(TopListMixin) {
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