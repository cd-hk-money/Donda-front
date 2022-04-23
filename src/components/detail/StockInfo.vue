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
    <v-card-text>
      <span class="text-h6">종가 </span>      
      <span class="text-h7">{{ stockDetail.close }}</span>      
      <span class="text-h6">시가 </span>      
      <span class="text-h7">{{ stockDetail.open }}</span>      
      <span class="text-h6">고가 </span>      
      <span class="text-h7">{{ stockDetail.high }}</span>      
      <span class="text-h6">저가 </span>      
      <span class="text-h7">{{ stockDetail.low }}</span>      
      <span class="text-h6">변화량 </span>      
      <span class="text-h7">{{ stockDetail.change }}</span>      
      <span class="text-h6">변동률 </span>      
      <span class="text-h7">{{ stockDetail.changeRatio }}</span>      
      <span class="text-h6">거래량 </span>      
      <span class="text-h7">{{ stockDetail.volume }}</span>      
    </v-card-text>    
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

  private detail!: any

}
</script>
