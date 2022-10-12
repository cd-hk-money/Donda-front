<template>
  <v-card 
    class="ml-5 mr-5 mt-7"
    :height="cardHeight"
    outlined    
    width="465"    
  >
    <v-card-title class="ml-5">
      적정주가
    </v-card-title>

    <v-card-subtitle class="ml-5">
      자체 계산한 적정 주가를 보여줍니다.
    </v-card-subtitle>
    <v-row>
      <v-col cols="12" xl="7">
        <template v-if="!loaded && !graphLoaded && !evalLoaded && !dailyLoaded">
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
              <stock-score-bar-chart :height="230" class="mt-4"/>
            </v-carousel-item>
            <v-carousel-item>
              <stock-chart :height="230" class="mt-4"/>                
            </v-carousel-item>
          </v-carousel>
        </template>
        <template v-else>
          <div class="text-center stockinfo-progress-circular">
            <v-progress-circular indeterminate color="#40E0D0" />            
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
        </div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn  
              v-on="on"
              v-bind="attrs"
              class="ml-1"
              icon                  
            ><v-icon small>fa-solid fa-circle-question</v-icon>
            </v-btn>
          </template>
          <span>자세히..</span>
        </v-tooltip>
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

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

type ScoreType = {
  score: string
  text: string
  colorClass: string
}

@Component({
  components: {
    StockScoreBarChart,
    StockChart
  }
})
export default class StockScore extends Vue {

  overlay = false
  carousel = 0

  @StockStoreModule.State('stockLoaded') loaded!: boolean
  @StockStoreModule.State('stockGraphDefaultLoaded') graphLoaded!: boolean
  @StockStoreModule.State('getStockEvaluationDaily') evalLoaded!: boolean
  @StockStoreModule.State('stockEvaluationDailyLoaded') dailyLoaded!: boolean
  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.Getter('stockEvaluationDailyLast') stockEvaluationDailyLast!: string
  @StockStoreModule.Action('getStockGraphDefault') readonly getStockGraphDefault!: (name: string) => Promise<void>
  @StockStoreModule.Action('getStockEvaluationDaily') getStockEvaluationDaily!: (stockCode: string) => Promise<void>

  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: {[title: string]: number}

  get mobile () { 
    return mobileHeight(this.$vuetify.breakpoint.name) < 500 
  }

  get cardHeight (): number { 
    return this.$vuetify.breakpoint.name === 'xs' ? 520 : 260 
  }  

  get scorePer () : ScoreType {    
    const [close, valuation] = [this.stock.close, Number(Number(this.stockEvaluationDailyLast).toFixed())]
    const isHighVal = close > valuation
    const score = isHighVal ? (valuation / close * 100).toFixed() : (close / valuation * 100).toFixed()
    const text = isHighVal ? '고평가': '저평가'
    const colorClass = isHighVal ? 'red--text' : 'blue--text'
        
    return { score, text, colorClass }
  }


  // methods
  drawerChange () {
    this.$emit('drawerChange', 2)
  }


  // hooks
  async created () {
    const code = this.$route.params.title    
    await this.getStockGraphDefault(code)
    await this.getStockEvaluationDaily(code)
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