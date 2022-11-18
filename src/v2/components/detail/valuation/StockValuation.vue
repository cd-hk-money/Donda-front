<template>
  <v-card     
    class="overflow-y-auto stock-indicator-detail"
    :height="mobile ? '100%' : 787"
    elevation="0"                
    :width="mobile ? 460 : '100%'"    
  >    
    <v-card-title>
      적정 주가
    </v-card-title>

    <v-card-subtitle>
      어떻게 적정 주가를 산출 했을까요?
    </v-card-subtitle>

      <v-sheet class="d-flex flex-wrap align-center justify-space-between ml-4 mr-4 mb-4">

        <v-sheet 
          elevation="0"
          class="mt-3"          
          color="rgb(40, 40, 40)" width="32%" height="270" rounded="lg"
        >
          <v-card-subtitle class="cyan--text">
            <v-icon class="mr-1">mdi-account-question</v-icon>
            적정주가가 뭔가요?
          </v-card-subtitle>
          <v-card-text>
            <v-icon class="mr-1">mdi-account-check</v-icon>
            자체 주가 분석 지수인 <span class="pink--text text--lighten-2">돈다 지수</span>를 통해 예측되는 <span class="underlined">기업의 적절한 주가입니다.</span>
          </v-card-text>
          <v-card-subtitle class="cyan--text">
            <v-icon class="mr-1">mdi-account-question</v-icon>
            저평가, 고평가가 뭔가요?
          </v-card-subtitle>
          <v-card-text>
            <v-icon class="mr-1">mdi-account-check</v-icon>
              현재 주가가 적정 주가와 얼마나 차이가 있나를 보여줍니다. 저평가된 기업은 상승할 여력이, 고평가된 기업은 하락할 가능성이 있습니다.
          </v-card-text>
        </v-sheet>


        <v-sheet
          elevation="0"          
          width="32%" height="270" rounded="lg"
          class="d-flex flex-column justify-space-between mt-3"
        >
          <v-sheet color="rgb(40, 40, 40)" elevation="0" height="80" class="d-flex justify-center align-center text-h7">            
            <span :class="scorePer.colorClass" class="text-h5">{{ scorePer.score }}%</span>                            
            <span class="ml-2"> {{ scorePer.text }} 되었습니다.</span>
            <div class="back">
              <ValuationBackgroundChart 
                :height="90" 
                :chartData="scorePer.score"
                :backgroundColor="scorePer.backgroundColor"
              />
            </div>
          </v-sheet>

          <v-sheet color="rgb(40, 40, 40)" elevation="0" height="80" class="d-flex justify-center align-center text-h7">            
            주가가 
            <span :class="['text-h5 ml-1 mr-1', `${donda.iconColor}--text`]">{{ stockEvaluationDailyLast.toLocaleString() }}₩</span>
             까지 변동될 수 있습니다.
             <!-- <div class="back">
              <v-icon :color="donda.iconColor" large>{{donda.icon}}</v-icon>
             </div> -->
          </v-sheet>

          <v-sheet color="rgb(40, 40, 40)" elevation="0" height="80" class="text-h7 d-flex flex-column justify-center align-center"> 
            <span class="ml-1 mr-1 font-weight-bold">{{ stock.name }}</span>
             에 투자 하는것을  {{ scorePer.isHighVal ? '추천드리지 않습니다.' : '추천드립니다.'}}
          </v-sheet>          
        </v-sheet>

        <v-sheet color="rgb(40, 40, 40)" elevation="0" height="270" @click.stop="dialog = true" class="OpendialogClass mt-3" width="32%">           
          <v-card-subtitle>다른 주가 분석 방법과 비교해보세요.</v-card-subtitle>
          <StockPolarAreaChart :height="mobile ? 200 : 200" :width="400"/>
        </v-sheet>                  


        <v-dialog v-model="dialog" width="500">
          <v-card>
            <StockValuationChart />
          </v-card>
        </v-dialog>

      </v-sheet>

      <v-divider />

      <v-card-title>
        주가 분석법
      </v-card-title>
      <v-card-subtitle>
        여러가지 주가 분석 방법에 대해 알아봅니다.
      </v-card-subtitle>
            
      <!-- 돈다 지수 -->
      <v-sheet 
        class="stock-indicator-detail-content" 
        @click="expandDonda = !expandDonda"      
      >
        <v-card-title class="text-h4 stock-indicator-detail-content-title">        
            돈다 지수
          <v-chip small class="ml-3"> 분기 </v-chip>
          <v-chip small class="ml-3">
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-icon 
                  v-on="on"
                  :color="donda.iconColor"                  
                >{{ donda.icon }}</v-icon>        
              </template>          
              <span>{{ donda.text }}</span>          
            </v-tooltip>
          </v-chip>        
          <v-chip small class="ml-3">
            <v-icon>mdi-star</v-icon>
          </v-chip>
        </v-card-title>
  
        <v-card-text :class="['grey--text', getStrongFontColorClass]">
          <strong >돈다</strong> 에서 자체적으로 계산한 주가 지수입니다.     
        </v-card-text>
  
        <v-expand-transition>
          <v-card v-if="expandDonda">
            <stock-valuation-single-chart                        
              label="돈다 지수"
              :dates="dates"
              :chartData="chartDatas.donda"
              :height="mobile? 250 : 100"
            />
  
            <v-divider />
  
            <v-card-text class='grey--text mt-1'>            
                 
            </v-card-text>
          </v-card>        
        </v-expand-transition>
      </v-sheet>  
  
  
      <v-divider />
  
  
      <v-sheet 
        class="stock-indicator-detail-content" 
        @click="expandEpsRoe = !expandEpsRoe"      
      >
        <v-card-title class="text-h4 stock-indicator-detail-content-title">        
            EPS-ROE 방법
          <v-chip small class="ml-3"> 분기 </v-chip>
          <v-chip small class="ml-3">
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-icon
                  v-on="on"
                  :color="epsroe.iconColor"                  
                >{{ epsroe.icon }}</v-icon>        
              </template>          
              <span>{{ epsroe.text }}</span>          
            </v-tooltip>
          </v-chip>
          
        </v-card-title>
        
        <v-card-text :class="['grey--text', getStrongFontColorClass]">
          보조지표 <strong>EPS</strong>
          <btn-badge>
            <template v-slot:text>
              <div class="text-h6 cyan--text font-weight-bold"><strong>EPS</strong> | 주당 순이익</div>
              <div>당기순이익을 유통 주식수로 나눈 값을 의미합니다.</div>
              <div>EPS가 클수록, 일반적으로 투자가치가 높다고 볼 수 있습니다.</div>
            </template>
          </btn-badge>
          와 
          <strong>ROE</strong>
          <btn-badge>
            <template v-slot:text>
              <div class="text-h6 cyan--text font-weight-bold"><strong>ROE</strong> | 자기자본이익률</div>
              <div>당기순이익을 평균 자기자본으로 나눈 백분율 수치 값을 의미합니다..</div>
              <div>ROE가 클수록, 일반적으로 주가 상승률이 높다고 판단됩니다.</div>
            </template>
          </btn-badge>
          를 활용한 적정 주가 계산 방법입니다.
        </v-card-text>
  
        <v-expand-transition>
          <v-card v-if="expandEpsRoe">
            <stock-valuation-single-chart            
              
              label="EPS-ROE"
              :dates="dates"
              :chartData="chartDatas.epsroe"
              :height="100"
            />
          </v-card>        
        </v-expand-transition>
      </v-sheet>  
  
  
      <v-divider />
  
  
      <v-sheet 
        class="stock-indicator-detail-content" 
        @click="expandSrim = !expandSrim"      
      >
        <v-card-title class="text-h4 stock-indicator-detail-content-title">        
            S-RIM 방법
          <v-chip small class="ml-3"> 분기 </v-chip>
          <v-chip small class="ml-3">
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-icon 
                  v-on="on"
                  :color="srim.iconColor"                  
                >{{ srim.icon }}</v-icon>        
              </template>          
              <span>{{ srim.text }}</span>          
            </v-tooltip>
          </v-chip>
          
        </v-card-title>
        
        <v-card-text :class="['grey--text', getStrongFontColorClass]">
          <strong>사경인 회계사</strong>
          <btn-badge>
            <template v-slot:text>
              <div class="text-h6 cyan--text font-weight-bold"><strong>사경인 회계사</strong></div>            
            </template>
          </btn-badge>
          에서 제시한 
          <strong>S-RIM</strong>
          <btn-badge>
            <template v-slot:text>
              <div class="text-h6 cyan--text font-weight-bold"><strong>S-RIM</strong></div>            
            </template>
          </btn-badge>
          모델을 활용한 주가 계산 방법입니다.
          
        </v-card-text>
  
        <v-expand-transition>
          <v-card v-if="expandSrim">
            <stock-valuation-single-chart            
              label="S-RIM"
              :dates="dates"
              :chartData="chartDatas.srim"
              :height="100"
            />
  
            <v-divider />
  
            <v-card-text class='grey--text mt-1'>            
                 
            </v-card-text>
          </v-card>        
        </v-expand-transition>
      </v-sheet>  
  
  
      <v-divider />
  
      
      <v-sheet 
        class="stock-indicator-detail-content" 
        @click="expandPer = !expandPer"      
      >
        <v-card-title class="text-h4 stock-indicator-detail-content-title">        
            PER 방법     
          <v-chip small class="ml-3">
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-icon 
                  v-on="on"
                  :color="per.iconColor"                  
                >{{ per.icon }}</v-icon>        
              </template>          
              <span>{{ per.text }}</span>          
            </v-tooltip>
          </v-chip>
          
        </v-card-title>
        
        <v-card-text :class="['grey--text', getStrongFontColorClass]">        
          보조지표 <strong>PER</strong>
          <btn-badge>
            <template v-slot:text>
              <div class="text-h6 cyan--text font-weight-bold"><strong>PER</strong></div>            
              현재 주가를 <strong>당기순이익</strong>을 <strong>유통 주식수</strong>로 나눈 <strong>EPS</strong>로 나눈 값을 의미합니다.
            </template>
          </btn-badge>
          을 활용한 주가 계산 방법입니다.
          
        </v-card-text>
  
        <v-expand-transition>
          <v-card v-if="expandPer">
            <stock-valuation-single-chart            
              
              label="PER"
              :dates="stockEvaluationDaily.date"
              :chartData="stockEvaluationDaily.value"
              :height="100"
            />
  
            <v-divider />
  
            <v-card-text class='grey--text mt-1'>            
                 
            </v-card-text>
          </v-card>        
        </v-expand-transition>
      </v-sheet>

  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IValuationContent } from '@/models/market'

import StockValuationChart from '@/v2/components/detail/valuation/StockValuationChart.vue'
import StockValuationSingleChart from '@/v2/components/detail/valuation/StockValuationSingleChart.vue'
import StockPolarAreaChart from '@/v2/components/detail/indicator/StockPolarAreaChart.vue'
import StockScoreBarChart from '@/v2/components/detail/valuation/StockScoreBarChart.vue'
import ValuationBackgroundChart from '@/v2/components/detail/valuation/ValuationBackgroundChart.vue'

import BtnBadge from '@/v2/components/vuetify/BtnBadge.vue'
import { IStockEvaluationModel, IStockModel } from '@/models/stock'
import StoreMixin from '@/mixins/StoreMixin.vue'


const StockStoreModule = namespace('StockStore')

type ValuationContentType = {
  origin?: number
  valuation?:  number
  text: string | undefined
  colorClass: string | undefined
  icon: string | undefined
  iconColor: string | undefined
}

type ScoreType = {
  score: string
  text: string
  colorClass: string
  backgroundColor: string
  isHighVal: boolean
}

@Component({
  components: {
    BtnBadge,
    StockValuationChart,
    StockValuationSingleChart,
    StockPolarAreaChart,
    StockScoreBarChart,
    ValuationBackgroundChart
    
  }
})
export default class StockValuation extends StoreMixin {
    
  toggle_exclusive = [0, 1, 2, 3]
  colors: string[] = ['#ff6384', '#994433', '#6495ed', '#800080']
  formula = '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
  
  expandBoard = false
  expandDonda = false
  expandEpsRoe = false 
  expandSrim = false
  expandPer = false

  dialog = false

  roe = {
    date: ['3', '6', '9', '12'],
    datas: [1, 2, 3, 4]
  }

  valuations: IValuationContent[] = [
    {
      color: '#00BCD4',
      title: '현재 주가',
      content: '내용'
    },
    {
      color: '#ff6384',
      title: '돈다 지수',
      content: '내용'
    },
    {
      color: '#994433',
      title: 'EPS-ROE',
      content: '내용'
    },
    {
      color: '#6495ed',
      title: 'S-RIM',
      content: '내용'
    },
  ]  

  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('stockGraphDefaultLoaded') loaded!: boolean
  @StockStoreModule.State('stockGraphAllLoaded') allLoaded!: boolean
  @StockStoreModule.State('stockEvaluationDailyLoaded') dailyLoaded!: boolean
  @StockStoreModule.State('stockEvaluationLoaded') evalLoaded!: boolean
  @StockStoreModule.State('stockEvaluation') stockEvaluation!: any
  @StockStoreModule.State('stockEvaluationDaily') stockEvaluationDaily!: IStockEvaluationModel
  @StockStoreModule.State('stockGraphAll') stockGraphAll!: any
      
  get chartHeight (): number {
    return this.$vuetify.breakpoint.name === 'xs' ? 200 : 100
  }

  get dates (): string[] {
    return this.stockEvaluation.date
  }

  get closes () {
    return this.stockEvaluation.date
            ?.map(k => Object.entries(this.stockGraphAll).filter((v, _) => (v[0] as string).substr(0, 7) === k)[0][1])
  }

  get donda () {
    return this.getValuation('donda')
  }

  get epsroe () {
    return this.getValuation('epsroe')
  }

  get srim () {
    return this.getValuation('srim')
  }

  get chartDatas () {
    return {
      donda: this.closes?.map(k => Number(k) * 1.050),
      epsroe: this.stockEvaluation['proper-price'],
      srim: this.stockEvaluation['S-rim']
    }
  }

  get stockEvaluationDailyLast () {
    return this.stockEvaluationDaily?.value.slice(-1)[0] || ''
  }

  get per (): ValuationContentType {
    const isHighVal = this.stock.close > Number(this.stockEvaluationDailyLast)        
    return {
      text: isHighVal ? '더 낮은 주가로 예측됩니다.' : '더 높은 주가로 예측됩니다.',
      colorClass : isHighVal ? 'sector' : '',
    icon: isHighVal ? 'fa-solid fa-arrow-trend-down' : 'fa-solid fa-arrow-trend-up',
      iconColor: isHighVal ? 'blue' : 'red'
    }
  }

  get scorePer () : ScoreType {    
    const [close, valuation] = [this.stock.close, Number(Number(this.stockEvaluationDailyLast).toFixed())]
    const isHighVal = close > valuation
    const score = isHighVal ? ((close / valuation) * 100 - 100).toFixed() : ((valuation / close) * 100 - 100).toFixed() 
    const text = isHighVal ? '고평가': '저평가'
    const colorClass = isHighVal ? 'red--text' : 'blue--text'
    const backgroundColor = isHighVal ? '#EF5350' : '#00BCD4'
    return { score, text, colorClass, backgroundColor, isHighVal }
  }
  
  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  get getStrongFontColorClass () {
    return this.$vuetify.theme.dark ? 'strong-white' : 'strong-black'
  }

  getValuation (valuationType: string): ValuationContentType {
    const origin = this.closes?.at(-1)
    const valuation = this.chartDatas[valuationType]?.at(-1)
    const isHighVal = origin > valuation
    return {
      origin,
      valuation,
      text: isHighVal ? '더 낮은 주가로 예측됩니다.' : '더 높은 주가로 예측됩니다.',
      colorClass : isHighVal ? 'sector' : '',
      icon: isHighVal ? 'fa-solid fa-arrow-trend-down' : 'fa-solid fa-arrow-trend-up',
      iconColor: isHighVal ? 'blue' : 'red'
    }
  }
  

}

</script>

<style scoped>
.valuation-label {
  max-height: 120px;    
  min-height: 120px;    
  text-align: center;
  border-radius: 25px;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  overflow: hidden;
  width: 40px;
}


.valuation-active-donda {
  font-weight: bold !important;
  color: #ff6384 !important;  
}

.valuation-donda strong {
  color: #ff6384;
}
.valuation-active-one {
  font-weight: bold !important;
  color: #943 !important;
}

.valuation-active-two {
  font-weight: bold !important;
  color: #6495ed !important;
}

.valuation-active-three {
  font-weight: bold !important;
  color: #800080 !important;
}

.valuation-title {
  font-weight: bold;
  font-size: 20px;
}

.valuation-two-tootip {
  position: relative;
  top: -5px;
  right: 0px;
}

.valuation-one strong {
  color: #994433;
}

.valuation-two strong {
  color: #6495ed;
}

.valuation-three strong {
  color: #800080;
}

.valuation-btn-toggle {
  position: absolute;
  right: 0;  
  top: 87px;
}

strong {  
  letter-spacing: .5px;
}

.strong-white strong {
  color: white;
  font-size: 16px;
}

.strong-white .calculate strong {
  font-size: 23px;
}

.calculate {
  line-height: 23px; 
  font-size: 23px;
}


.strong-white span {
  font-size: 16px;
  font-weight: bold;
}


.strong-black strong {
  color: black;
  font-size: 16px;
}
.strong-black span {
  font-weight: bold;
}

.stock-indicator-detail {
  transition: all .3s ease;  
}

.stock-indicator-detail:hover {
  color: #00BCD4;
}

.stock-indicator-detail::-webkit-scrollbar-thumb,
.stock-indicator-detail::-webkit-scrollbar {    
  width: 2px;    
  transition: all 1s;    
  background-clip: padding-box;
}

*::-webkit-scrollbar-thumb {        
  box-shadow: inset 0 0 0 10px;
}



.stock-indicator-detail-content {
  transition: all .5s;  
  opacity: .5;
}

.stock-indicator-detail-content:hover {
  cursor: pointer;
  opacity: 1;
} 



/* .stock-indicator-detail-content:hover .stock-indicator-detail-content-title,
.stock-indicator-detail-content:hover .strong-white strong,
.stock-indicator-detail-content:hover .strong-black strong
 {
  color: #00BCD4 !important;
}  */

.stock-indicator-detail-content:hover .strong-white .sector,
.stock-indicator-detail-content:hover .strong-black .sector
 {
  color: rgb(255, 99, 132) !important;
} 

.btn-badge-text {
  font-size: 10px !important;
}

.indicator-detail-card span {
  margin-left: 4px;
  text-decoration: underline;
  font-size: 14px !important;
  font-weight: normal !important;
}

.underlined {
  text-decoration: underline;
}

.back {
  position: absolute;
  margin-top: 8px;
  margin-left: -52px;
  z-index: 0;
}

.OpendialogClass {
  cursor: pointer;
}


</style>