<template>
  <div>Detail</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// stores
const StockStoreModule = namespace('StockStore')


@Component 
export default class Detail extends Vue {
  @StockStoreModule.State('loaded')
  private loaded!: boolean
}
</script>