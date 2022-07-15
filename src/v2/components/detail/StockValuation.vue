<template>
  <v-card     
    class="mt-5 ml-5 mr-5 mb-5"
    height="885"
    outlined
    elevation="0"
    width="95%"                  
  >
    <v-card-title>
      적정 주가?
    </v-card-title>
    <v-card-subtitle>
      어떻게 적정 주가를 산출 했을까요?
    </v-card-subtitle>

    <v-divider></v-divider>

    
    <stock-valuation-chart 
      class="mt-2 ml-2 mr-2"
      :height="150"
      v-if="!loaded"
    />

    <v-divider></v-divider>

      
    <v-card-content class="d-flex">
     <v-card 
      height="418"
      width="34%"
      elevation="0"
      outlined
    >
      <div class="valuation-label-1">
        계산 방법 1 
      </div>
      
      
     </v-card>
     <v-card
      width="34%"
      elevation="0"
      outlined
    >
      <div class="valuation-label-2">
        돈다 지수
      </div>
     </v-card>
     <v-card
      width="34%"
      elevation="0"
      outlined
    >
      <div class="valuation-label-3">
        방법 1
      </div>
     </v-card>
    </v-card-content>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StockValuationChart from '@/v2/components/detail/StockValuationChart.vue'
import { namespace } from 'vuex-class'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockValuationChart
  }
})
export default class StockValuation extends Vue {
  @StockStoreModule.State('stockGraphDefaultLoaded')
  loaded!: boolean
  
}

</script>

<style>
.valuation-label-1 {
  background-color: #40E0D0;
  height: 30px;  
  text-align: center;
  line-height: 30px;
  border-radius: 0px !important;  
}
.valuation-label-2 {
  background-color: rgb(255, 99, 132);
  height: 30px;  
  text-align: center;
  line-height: 30px;
  border-radius: 0px !important;  
}
.valuation-label-3 {
  background-color: #943;
  height: 30px;  
  text-align: center;
  line-height: 30px;
  border-radius: 0px !important;  
}
</style>