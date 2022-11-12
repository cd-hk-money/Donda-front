<template>
  <v-card 
    class="ml-5 mr-5 mt-7"
    :height="cardHeight"    
    width="465"
  >
    <v-card-title> 적정주가 </v-card-title>
    <v-card-subtitle>
      돈다지수
      <BtnBadge>
        <div><strong class="text-h6 cyan--text font-weight-bold">돈다지수</strong></div>
        DONDA에서 자체적으로 계산된 주가 적정 수치입니다. 자세한건 적정주가 항목을 참고하세요.
      </BtnBadge>
      에 근거한 적정주가와 평가 가치를 보여줍니다.
    </v-card-subtitle>
    
    <v-row>
      <v-col cols="12" xl="7">
        <template v-if="!loaded && !graphLoaded && !dailyLoaded">
          <v-carousel 
            cycle
            hide-delimiter-background
            hide-delimiters
            vertical
            interval="5000"
            height="100%"
            v-model="carousel"
            :show-arrows="false"            
          >
            <v-carousel-item>
              <StockScoreBarChart :height="180" class="mt-4 ml-1"/>
            </v-carousel-item>
            <v-carousel-item>
              <StockChart :height="180" class="mt-4 ml-1"/>                
            </v-carousel-item>
          </v-carousel>
        </template>
        <template v-else>
          <div class="text-center stockinfo-progress-circular">
            <v-progress-circular indeterminate color="#00BCD4" />            
          </div>
        </template>
      </v-col>            

      <v-col cols="12" xl="5" lg="5" sm="12" md="12" xs="12" class="text-center align-center mt-3">
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
           <BtnBadge>
            <div><strong class="text-h6 cyan--text font-weight-bold">저평가?고평가?</strong></div>
            <span class="blue--text">저평가</span>되어 있는 종목은 해당 %만큼 상승 여력이 있다고 판단할 수 있습니다. <br>
            <span class="red--text">고평가</span>되어 있는 종목은 해당 %만큼 하락 가능성이 있다고 판단할 수 있습니다.
           </BtnBadge>
        </div>

      </v-col>
    </v-row>
  </v-card>      
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

import StockScoreBarChart from './StockScoreBarChart.vue'
import StockChart from '@/v2/components/detail/StockChart.vue'
import { IStockModel } from '@/models/stock'
import BtnBadge from '../vuetify/BtnBadge.vue'
import StoreMixin from '@/mixins/StoreMixin.vue'
import { getStockEvaluationDaily, getStockGraphDefault } from '@/api/market'

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
    return mobileHeight(this.$vuetify.breakpoint.name) < 500 
  }

  get cardHeight (): number { 
    return this.$vuetify.breakpoint.name === 'xs' ? 420 : 260 
  }  

  get scorePer () : ScoreType {    
    const [close, valuation] = [this.stock.close, Number(Number(this.stockEvaluationDailyLast).toFixed())]
    const isHighVal = close > valuation
    const score = isHighVal ? ((close / valuation) * 100).toFixed() : ((valuation / close) * 100).toFixed()
    const text = isHighVal ? '고평가': '저평가'
    const colorClass = isHighVal ? 'red--text' : 'blue--text'
    return { score, text, colorClass }
  }


  drawerChange () {
    this.$emit('drawerChange', 2)
  }

  created () {
    const code = this.$route.params.title    
    this.getAPI(getStockGraphDefault(code))
    this.getAPI(getStockEvaluationDaily(code))        
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