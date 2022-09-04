<template>
  <v-card     
    class="mt-5 ml-5 mr-5 mb-5 overflow-y-auto stock-indicator-detail"
    height="885"
    outlined
    elevation="0"                
    :width="isMobile ? 460 : '94%'"
  >
    <v-card-title>
      적정 주가?
    </v-card-title>
    <v-card-subtitle>
      어떻게 적정 주가를 산출 했을까요?
    </v-card-subtitle>
    <v-divider></v-divider>
    
    <!-- <div v-if="!loaded && !evalLoaded && !allLoaded">
      <stock-valuation-chart 
        class="mt-2 ml-2 mr-2"
        :height="isMobile ? 250 : 50"        
      />
    </div> -->
    

    <v-divider></v-divider>


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
            :chartData="chartDatas.donda"
            :height="100"
          />

          <v-divider></v-divider>

          <v-card-text class='grey--text mt-1'>            
               
          </v-card-text>
        </v-card>        
      </v-expand-transition>
    </v-sheet>  


    <v-divider></v-divider>


    <v-sheet 
      class="stock-indicator-detail-content" 
      @click="expandEpsRoe = !expandEpsRoe"      
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">        
          EPS-ROE
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
        <strong>EPS</strong>
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
        를 활용한 적정 주가 계산 공식입니다.
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandEpsRoe">
          <stock-valuation-single-chart 
            label="EPS-ROE"
            :chartData="chartDatas.epsroe"
            :height="100"
          />

          <v-divider></v-divider>

          <v-card-text class='grey--text mt-1'>            
               
          </v-card-text>
        </v-card>        
      </v-expand-transition>
    </v-sheet>  


    <v-divider></v-divider>


    <v-sheet 
      class="stock-indicator-detail-content" 
      @click="expandSrim = !expandSrim"      
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">        
          S-RIM
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
        모델을 활용한 주가 계산 공식입니다.
        
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandSrim">
          <stock-valuation-single-chart 
            label="S-RIM"
            :chartData="chartDatas.srim"
            :height="100"
          />

          <v-divider></v-divider>

          <v-card-text class='grey--text mt-1'>            
               
          </v-card-text>
        </v-card>        
      </v-expand-transition>
    </v-sheet>  

    <!-- 돈다 지수 -->
    <!-- <strong>돈다</strong> 에서 자체적으로 계산한 주가 지수입니다. -->

    <!-- EPS-ROE -->
    <!-- <strong>EPS</strong>와 <strong>ROE</strong>를 활용한 적정 주가 계산 공식입니다. -->

    <!-- S-RIM -->
    <!-- <strong>사경인 회계사</strong>
      <v-icon size="13" class="valuation-two-tootip">fa-solid fa-circle-question</v-icon>
    </span>
      에서 제시한 <strong>RIM 모델</strong>을 활용한 주가 계산 공식입니다. -->

    <!-- PER 방법 -->

      

  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IValuationContent } from '@/models/market'

import StockValuationChart from '@/v2/components/detail/StockValuationChart.vue'
import StockValuationSingleChart from '@/v2/components/detail/StockValuationSingleChart.vue'
import BtnBadge from '@/v2/components/vuetify/BtnBadge.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    BtnBadge,
    StockValuationChart,
    StockValuationSingleChart
  }
})
export default class StockValuation extends Vue {
  
  tab = 0
  toggle_exclusive = [0, 1, 2, 3]
  colors: string[] = ['#ff6384', '#994433', '#6495ed', '#800080']
  formula = '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
  v = {
    roe: [1,2,3,4,5,6,7,7,8,],    
    's-rim': [1,2,3,4,5,8,9],
  }

  expandDonda = false
  expandEpsRoe = false 
  expandSrim = false

  roe = {
    date: ['3', '6', '9', '12'],
    datas: [1, 2, 3, 4]
  }

  valuations: IValuationContent[] = [
    {
      color: '#40E0D0',
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

  @StockStoreModule.State('stockGraphDefaultLoaded') loaded!: boolean
  @StockStoreModule.State('stockGraphAllLoaded') allLoaded!: boolean
  @StockStoreModule.State('stockEvaluation') stockEvaluation!: any
  @StockStoreModule.State('stockEvaluationLoaded') evalLoaded!: boolean
  @StockStoreModule.State('stockGraphAll') stockGraphAll!: any
  @StockStoreModule.Action('getStockEvaluation') getStockEvaluation!: (stockCode: string) => Promise<void>
  
  get chartHeight (): number {
    return this.$vuetify.breakpoint.name === 'xs' ? 200 : 100
  }

  get closes () {
    return this.stockEvaluation?.date
          .map(k => Object.entries(this.stockGraphAll).filter((v, _) => (v[0] as string).substr(0, 7) === k)[0][1])
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
      donda: this.closes.map(k => Number(k) * 1.050),
      epsroe: this.stockEvaluation['proper-price'],
      srim: this.stockEvaluation['S-rim']
    }
  }

  getValuation (valuationType: string) {
    const origin = this.closes.at(-1)
    const valuation = this.chartDatas[valuationType].at(-1)
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

  get isMobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  get getStrongFontColorClass () {
    return this.$vuetify.theme.dark ? 'strong-white' : 'strong-black'
  }

  async mounted () {
    await this.getStockEvaluation(this.$route.params.title)    
    console.log(this.donda)
    console.log(this.closes)
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

.strong-white span {
  font-size: 16px;
  font-weight: bold;
}


.strong-black strong {
  color: black;
}
.strong-black span {
  font-weight: bold;
}

.stock-indicator-detail {
  transition: all .3s ease;  
}

.stock-indicator-detail:hover {
  color: rgba(64, 224, 208, 1);
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



.stock-indicator-detail-content:hover .stock-indicator-detail-content-title,
.stock-indicator-detail-content:hover .strong-white strong,
.stock-indicator-detail-content:hover .strong-black strong
 {
  color: rgb(64, 224, 208) !important;
} 

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


</style>