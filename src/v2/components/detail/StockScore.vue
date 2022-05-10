<template>
  <v-card 
    class="ml-5 mr-5 mt-7"
    :height="height > 500 ? 260 : 400"
    rounded="xl"
    width="95%"
  >
    <v-card-title class="ml-5">
      적정주가
      <v-btn  
        class="ml-3"
        icon
        right
        x-small
        @click="overlay = true"
      ><v-icon>fa-solid fa-circle-question</v-icon>
      </v-btn>
      <!-- <span id="date">
        기준일 :{{ stock.date }}
      </span> -->
    </v-card-title>

    <v-card-subtitle class="ml-5">
      자체 계산한 적정 주가를 보여줍니다.
    </v-card-subtitle>
    <v-row>
      <v-col cols="12" xl="7" xs="7">
        <stock-score-bar-chart 
          v-if="!loaded"
          :chartData="[stock.close, stock.close * 1.1]"
          :height="height > 500 ? 240 : 135"
        />
      </v-col>      
      <v-divider vertical></v-divider>

      <v-col cols="12" xl="5" sm="5" class="text-center align-center mt-7">
        <div class="text-h4">20%</div>
        <div> 저평가 되었습니다.</div>
        <v-btn  
          class="ml-1"
          icon
          @click="overlay = true"
        ><v-icon>fa-solid fa-circle-info</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-overlay 
      :value="overlay"
      opacity="0.88"
      absolute
      height="300"
    >
      <div>
        주가 계산 방법에 대한 설명..
      </div>
      <div class="d-flex justify-center">
        <v-btn 
          bottom
          @click="overlay = false">
          닫기
        </v-btn>
      </div>
    </v-overlay>
  </v-card>      
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

import StockScoreBarChart from './StockScoreBarChart.vue'
import { IStockModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockScoreBarChart
  }
})
export default class StockScore extends Vue {
  overlay = false

  @StockStoreModule.State('stock')
  stock!: IStockModel

  @StockStoreModule.State('stockLoaded')
  loaded!: boolean

  get height () {
    return mobileHeight(this.$vuetify.breakpoint.name)
  }
}
</script>

<style>
  #date {
    margin-left: 180px;
    font-size: 13px;
  }
</style>