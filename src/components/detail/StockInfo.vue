<template>
  <v-card
    class="grey darken-3"
    min-height="auto"
    max-height="auto"    
    rounded="xl"
    dark
    v-if="!loading"
    link
  >
    <v-card-title>
      {{ stockDetail }}
    </v-card-title>    
    <v-card-subtitle>
      ㅋㅋ
    </v-card-subtitle>    
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const StockStoreModule = namespace('StockStore')

@Component
export default class StockInfo extends Vue {
  @StockStoreModule.State('loading') 
  private loading!: boolean

  @StockStoreModule.State('stockDetail')
  private stockDetail!: any
}
</script>
