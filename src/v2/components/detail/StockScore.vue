<template>
  <v-card 
    class="ml-5 mr-5 mt-7"
    :height="cardHeight"    
    width="465"
    @click="$emit('drawerChange', 1)"
  >
    <v-card-title> 적정주가 </v-card-title>
    <v-card-subtitle>
      현재 기업의 적정 주가입니다. 클릭하여 자세한 내용을 살펴보세요.
    </v-card-subtitle>
    <v-card-text class="d-flex align-center flex-wrap justify-space-between">
      <div>
        <template v-if="!loaded && !graphLoaded && !dailyLoaded">
          <StockScoreBarChart :height="mobile ? 130 : 150" :width="250"/>
        </template>
        <template v-else>
          <div class="text-center stockinfo-progress-circular">
            <v-progress-circular indeterminate color="#00BCD4" />            
          </div>
        </template>
      </div>
      <div>
        <template v-if="!loaded && !graphLoaded && !dailyLoaded">
          <div class="text-h4">
            <span :class="scorePer.colorClass">
              {{ scorePer.score }} 
            </span> %          
          </div>
          <div> 
            <span :class="scorePer.colorClass">
              {{ scorePer.text }}
            </span>
            되었습니다.
          </div>
        </template>
        <template v-else>
          <div class="text-center stockinfo-progress-circular">
            <v-progress-circular indeterminate color="#00BCD4" />            
          </div>
        </template>
      </div>

    </v-card-text>    
  </v-card>      
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import StockScoreBarChart from './StockScoreBarChart.vue'
import StockChart from '@/v2/components/detail/StockChart.vue'
import { IStockModel } from '@/models/stock'
import BtnBadge from '../vuetify/BtnBadge.vue'
import StoreMixin from '@/mixins/StoreMixin.vue'

const StockStoreModule = namespace('StockStore')

type ScoreType = {
  score: string
  text: string
  colorClass: string
}

@Component({
  components: {
    StockScoreBarChart,
    StockChart,
    BtnBadge
  }
})
export default class StockScore extends StoreMixin {

  overlay = false
  carousel = 0

  @StockStoreModule.State('stockLoaded') loaded!: boolean
  @StockStoreModule.State('stockGraphDefaultLoaded') graphLoaded!: boolean
  
  @StockStoreModule.State('stockEvaluationDaily') stockEvaluationDaily!: any
  @StockStoreModule.State('stockEvaluationDailyLoaded') dailyLoaded!: boolean
  @StockStoreModule.State('stock') stock!: IStockModel  
  
  
  get stockEvaluationDailyLast () {
    return this.stockEvaluationDaily?.value.slice(-1)[0] || ''
  }

  get mobile () { 
    return this.$vuetify.breakpoint.name === 'xs'
  }

  get cardHeight (): number { 
    return this.$vuetify.breakpoint.name === 'xs' ? 260 : 260 
  }  

  get scorePer () : ScoreType {    
    const [close, valuation] = [this.stock.close, Number(Number(this.stockEvaluationDailyLast).toFixed())]
    const isHighVal = close > valuation
    const score = isHighVal ? ((close / valuation) * 100 - 100).toFixed() : ((valuation / close) * 100 - 100).toFixed() 
    const text = isHighVal ? '고평가': '저평가'
    const colorClass = isHighVal ? 'red--text' : 'blue--text'
    return { score, text, colorClass }
  }


  drawerChange () {
    this.$emit('drawerChange', 2)
  }

}
</script>

<style scoped>
#date {
  margin-left: 180px;
  font-size: 13px;
}

.stockinfo-progress-circular {
  top: 50%;
  left: 30%;  
  position: absolute;
}
</style>