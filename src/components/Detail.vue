<template>
  <div>{{ code }}</div>
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

  @StockStoreModule.State('code')
  private code!: string 

  @StockStoreModule.Mutation('setCode')
  // eslint-disable-next-line no-unused-vars
  private setCode!:(newCode: string) => void

  created() {
    this.setCode(this.$route.params.code)
  }
}
</script>