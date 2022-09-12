<template>
  <v-card     
    class="mt-5 ml-5 mr-5 mb-5 overflow-y-auto stock-indicator-detail"
    height="885"
    outlined
    elevation="0"                
    :width="isMobile ? 460 : '94%'"
    v-if="!indicatorLoaded && !indicatorSectorLoaded"
  >    
    <v-card-title>
      보조 지표
    </v-card-title>

    <v-card-subtitle>
      각 보조 지표가 의미하는 바를 알아보세요.
    </v-card-subtitle>


    <v-divider></v-divider>


    <!-- EPS -->
    <v-sheet 
      class="stock-indicator-detail-content" 
      @click="expandEps = !expandEps"      
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">        
          EPS        
        <v-chip small class="ml-3"> 분기 </v-chip>
        <v-chip small class="ml-3">
          <v-tooltip top>
            <template v-slot:activator="{on}">
              <v-icon 
                v-on="on"
                :color="epsMean.iconColor"                  
              >{{ epsMean.icon }}</v-icon>        
            </template>          
            <span> 투자 가치가 상대적으로 {{ epsMean.text }}</span>          
          </v-tooltip>
        </v-chip>
        
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <span>
          <strong>E</strong>arnings <strong>P</strong>er <strong>S</strong>hare |  주당 순이익
        </span>        
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">

        <strong>당기순이익</strong>
        <btn-badge>
          <template v-slot:text>
            <div><strong class="text-h6 cyan--text font-weight-bold">당기순이익</strong></div>
            일정 회계기간 동안 발생한 기업의 전체 수익에서 비용을 차감한 금액으로,
            <div class="d-flex justify-space-between">
              <span>
                <strong class="cyan--text">일정 기간동안 기업이 창출한 순이익</strong>을 뜻합니다.
              </span>
              <a href="https://terms.naver.com/entry.naver?docId=67170&cid=43667&categoryId=43667">출처: 네이버 지식백과</a>
            </div>
          </template>
        </btn-badge>
        을 
        <strong>유통 주식수</strong>
        <btn-badge>
          <template v-slot:text>
            <div><strong class="text-h6 cyan--text font-weight-bold">유통 주식수</strong></div>
            상장법인의 총발행 주식 중 최대주주 지분 및 정부 소유주 등을 제외한,
            <div class="d-flex justify-space-between">
              <span>
                <strong class="cyan--text">실제 시장에서 유통 가능한 주식 수</strong>를 뜻합니다.
              </span>
              <a href="https://econowide.com/3598">출처: 이코노와이드 블로그</a>
            </div>
          </template>
        </btn-badge>
        로 나눈 값을 의미합니다.

      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandEps">
          <stock-indicator-bar-chart 
            type="EPS"
            :chartData="indicators.eps"   
            :sector="indicatorSector.sector_eps"
            :height="100"      
          />          

          <v-divider></v-divider>

          <v-card-text :class="['grey--text mt-1', getStrongFontColorClass]">            
            <div>
              <strong>{{ stock.name }}</strong>의 1년 <strong>EPS 평균값은</strong> <strong>{{ epsMean.origin.toLocaleString() }}</strong>으로,
              <strong class="sector">동종 업계 1년 평균 {{ epsMean.sector.toLocaleString() }}</strong> 보다  
              <strong :class="epsMean.colorClass">{{ epsMean.text }}</strong>
              <v-icon :color="epsMean.iconColor" size="20" class="ml-2">{{ epsMean.icon}}</v-icon>
            </div>          

            <v-divider class="mt-2"></v-divider>
            
            <v-sheet 
              outlined 
              class="pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center indicator-detail-card" 
              rounded="lg" 
              color="blue-grey lighten-1"
            >
              <v-icon class="mr-1">mdi-information</v-icon>
              <strong class="mr-1">EPS</strong> 가 평균보다 높을수록, <span>투자 가치가 높다고 볼 수 있습니다</span>
            </v-sheet>                  

            <v-sheet 
              outlined 
              class="pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center indicator-detail-card" 
              rounded="lg" 
              color="blue-grey lighten-1"
            >
              <v-icon class="mr-1">mdi-information</v-icon>
              <strong class="mr-1">EPS</strong>와<strong class="mr-1 ml-1">BPS</strong>가 동시에 늘어나는 종목에 투자하는 것이 일반적으로 가장 높은 수익률을 거둘 수 있습니다.              
            </v-sheet>                  
          </v-card-text>
      </v-card>        
      </v-expand-transition>
    </v-sheet>    


    <v-divider></v-divider>


    <!-- BPS -->
    <v-sheet 
      class="stock-indicator-detail-content"
      @click="expandBps = !expandBps" 
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        BPS
        <v-chip small class="ml-3"> 분기 </v-chip>
        <v-chip small class="ml-3"> 
          <v-tooltip top>
            <template v-slot:activator="{on}">
              <v-icon 
                v-on="on"
                :color="bpsMean.iconColor"                 
              >{{ bpsMean.icon }}</v-icon>        
            </template>
            <span> 투자 가치가 상대적으로 {{ bpsMean.text }}</span>
          </v-tooltip>
        </v-chip>
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>B</strong>ookvalue <strong>P</strong>er <strong>S</strong>hare | 주당 순자산가치
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">

        <strong>순자산</strong>
        <btn-badge>
          <template v-slot:text>            
            <div><strong class="text-h6 cyan--text font-weight-bold">순자산</strong></div>
            총자산에서 부채를 뺀 것을 의미합니다. <strong class="cyan--text">자기자본</strong> 이라고도 합니다.
            <div class="d-flex justify-space-between">
              <div></div>
              <a href="https://econowide.com/3598">출처: 매일경제 경제용어사전</a>
            </div>
          </template>
        </btn-badge>        
        을 
        <strong>발행 주식수</strong> 로 나눈 값을 의미합니다.

      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandBps">
          <stock-indicator-bar-chart 
            type="BPS"
            :chartData="indicators.bps"   
            :sector="indicatorSector.sector_bps"
            :height="100"      
          />

          <v-divider></v-divider>

          <v-card-text :class="['grey--text mt-1', getStrongFontColorClass]">            
            <div>
              <strong>{{ stock.name }}</strong>의 1년 <strong>BPS 평균값은</strong> <strong>{{ bpsMean.origin.toLocaleString() }}</strong>으로,
              <strong class="sector">동종 업계 1년 평균 {{ bpsMean.sector.toLocaleString() }}</strong> 보다  
              <strong :class="bpsMean.colorClass">{{ bpsMean.text }}</strong>
              <v-icon :color="bpsMean.iconColor" size="20" class="ml-2">{{ bpsMean.icon}}</v-icon>
            </div>

            <v-divider class="mt-2"></v-divider>
            
            <v-sheet 
              outlined 
              class="pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center indicator-detail-card" 
              rounded="lg" 
              color="blue-grey lighten-1"
            >
              <v-icon class="mr-1">mdi-information</v-icon>
              <strong class="mr-1">BPS</strong> 가 높으면, 자기 자본의 비중이 크거나, <span>회사의 가치가 높다고 판단됩니다</span>
            </v-sheet>

            <v-sheet 
              outlined 
              class="pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center" 
              rounded="lg" 
              color="blue-grey lighten-1"
            >
              <v-icon class="mr-1">mdi-information</v-icon>
              <strong class="mr-1">BPS</strong> 에는 주가 정보가 고려되있지 않기 때문에, 주가와의 상관관계를 파악하기 위해 주로<strong class="ml-1 mr-1">PBR</strong>을 같이 확인하여 투자 가치를 판단합니다.
            </v-sheet>

            <v-sheet 
              outlined 
              class="pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center indicator-detail-card" 
              rounded="lg" 
              color="blue-grey lighten-1"
            >
              <v-icon class="mr-1">mdi-information</v-icon>
              <strong class="mr-1">BPS</strong>와<strong class="mr-1 ml-1">EPS</strong>가 동시에 늘어나는 종목에 투자하는 것이 일반적으로 가장 높은 수익률을 거둘 수 있습니다.              
            </v-sheet>     
          </v-card-text>
        </v-card>      
      </v-expand-transition>

    </v-sheet>    


    <v-divider></v-divider>


    <!-- ROE -->
    <v-sheet 
      class="stock-indicator-detail-content"
      @click="expandRoe = !expandRoe"
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        ROE
        <v-chip small class="ml-3"> 분기 </v-chip>
        <v-chip small class="ml-3">
          <v-tooltip top>
            <template v-slot:activator="{on}">
              <v-icon 
                v-on="on"
                :color="roeMean.iconColor"                 
              >{{ roeMean.icon }}</v-icon>        
            </template>
            <span> 투자 가치가 상대적으로 {{ roeMean.text }}</span>
          </v-tooltip>
        </v-chip>
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>R</strong>eturn <strong>O</strong>n <strong>E</strong>quity | 자기자본이익률
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>당기순이익</strong>
        <btn-badge>
          <template v-slot:text>
            <div><strong class="text-h6 cyan--text font-weight-bold">당기순이익</strong></div>
            일정 회계기간 동안 발생한 기업의 전체 수익에서 비용을 차감한 금액으로,
            <div class="d-flex justify-space-between">
              <span>
                <strong class="cyan--text">일정 기간동안 기업이 창출한 순이익</strong>을 뜻합니다.
              </span>
              <a href="https://terms.naver.com/entry.naver?docId=67170&cid=43667&categoryId=43667">출처: 네이버 지식백과</a>
            </div>
          </template>
        </btn-badge>
        을                 
        <strong>평균 자기자본</strong>
        <btn-badge>
          <template v-slot:text>
            <div><strong class="text-h6 cyan--text font-weight-bold">평균 자기자본</strong></div>
            일정기간동안 자기자본의 평균을 뜻합니다.
            <div class="d-flex justify-space-between">
              <span></span>
              <a href="https://terms.naver.com/entry.naver?docId=67170&cid=43667&categoryId=43667">출처: 페페 주식정보 블로그</a>
            </div>
          </template>
        </btn-badge>
        으로 나눈 수치 백분율 값을 의미합니다.
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandRoe">
          <stock-indicator-bar-chart 
            type="ROE"
            :chartData="indicators.roe"   
            :sector="indicatorSector.sector_roe"
            :height="100"      
          />
            <v-card-text :class="['grey--text mt-1', getStrongFontColorClass]">
              <div>
                <strong>{{ stock.name }}</strong>의 1년 <strong>ROE 평균값은</strong> <strong>{{ roeMean.origin.toLocaleString() }}</strong>으로,
                <strong class="sector">동종 업계 1년 평균 {{ roeMean.sector.toLocaleString() }}</strong> 보다  
                <strong :class="roeMean.colorClass">{{ roeMean.text }}</strong>
                <v-icon :color="roeMean.iconColor" size="20" class="ml-2">{{ roeMean.icon}}</v-icon>
              </div>

              <v-divider class="mt-2"></v-divider>
              
              <v-sheet 
                outlined 
                class="pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center indicator-detail-card" 
                rounded="lg" 
                color="blue-grey lighten-1"
              >
                <v-icon class="mr-1">mdi-information</v-icon>
                <strong>ROE</strong> 가 높으면, 자기 자본으로 더 많은 이익을 내며, <span>주가 상승률이 높다고 판단됩니다.</span>
              </v-sheet>
            </v-card-text>
        </v-card>
      </v-expand-transition>      
    </v-sheet>    


    <v-divider></v-divider>


    <!-- PSR -->
    <v-sheet 
      class="stock-indicator-detail-content"
      @click="expandPsr = !expandPsr"
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        PSR
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>P</strong>rice <strong>S</strong>elling <strong>R</strong>atio | 주가매출액비율
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>현재 주가</strong>
        를 <strong>1주당 매출액</strong>으로 나눈 값을 의미합니다.
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandPsr">
          <stock-indicator-bar-chart 
            type="PSR"
            :chartData="indicators.roe"   
            :sector="indicatorSector.sector_roe"
            :height="100"      
          />
        </v-card>
      </v-expand-transition>
    </v-sheet>  
    
    
    <v-divider></v-divider>


    <!-- PER -->
    <v-sheet 
      class="stock-indicator-detail-content"
      @click="expandPer = !expandPer"
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        PER
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>P</strong>rice to <strong>E</strong>arning <strong>R</strong>atio | 주가수익비율
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>현재 주가</strong>
        를 <strong>EPS</strong>로 나눈 값을 의미합니다.
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandPer">
          <stock-indicator-bar-chart 
            type="PSR"
            :chartData="indicators.roe"   
            :sector="indicatorSector.sector_roe"
            :height="100"      
          />
        </v-card>
      </v-expand-transition>
    </v-sheet>    


    <v-divider></v-divider>


    <!-- PBR -->
    <v-sheet 
      class="stock-indicator-detail-content"
      @click="expandPbr = !expandPbr"
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        PBR
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>P</strong>rice to <strong>B</strong>ook-value <strong>R</strong>atio | 주가순자산비율
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>현재 주가</strong>
        를 <strong>BPS</strong>로 나눈 값을 의미합니다.
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandPbr">
          <stock-indicator-bar-chart 
            type="PSR"
            :chartData="indicators.roe"   
            :sector="indicatorSector.sector_roe"
            :height="100"      
          />
        </v-card>
      </v-expand-transition>
    </v-sheet>    


    <!-- 주당순이익(EPS)과 주당순자산(BPS)이 동시에 늘어나는 종목에 투자하는 것이 가장 높은 수익률을 거두는 것으로 -->

  </v-card>
</template>

<script lang="ts">
import { ISimpleChartData, IStockIndicatorDailyModel, IStockIndicatorSectorDailyModel, IStockIndicatorSectorModel, IStockModel } from '@/models/stock';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
import StockIndicatorBarChart from '@/v2/components/detail/StockIndicatorBarChart.vue'
import BtnBadge from '@/v2/components/vuetify/BtnBadge.vue'

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    BtnBadge,
    StockIndicatorBarChart
  }
})
export default class StockIndicatorDetail extends Vue {

  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('indicator') indicators!: ISimpleChartData  
  @StockStoreModule.State('indicatorDaily') indicatorDaily!: IStockIndicatorDailyModel
  @StockStoreModule.State('indicatorSector') indicatorSector!: IStockIndicatorSectorModel
  @StockStoreModule.State('indicatorSectorDaily') indicatorSectorDaily!: IStockIndicatorSectorDailyModel  
  @StockStoreModule.State('indicatorLoaded') indicatorLoaded!: boolean
  @StockStoreModule.State('indicatorSectorLoaded') indicatorSectorLoaded!: boolean

  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: { [name: string]: string }
  
  expandEps = false
  expandBps = false
  expandRoe = false  
  expandPsr = false
  expandPer = false
  expandPbr = false  

  get epsMean () {
    return this.getIndicatorMean('eps')
  }

  get bpsMean () {
    return this.getIndicatorMean('bps')
  }

  get roeMean () {
    return this.getIndicatorMean('roe')
  }

  get psrMean () {
    return this.getIndicatorMean('eps')
  }

  getIndicatorMean(indicatorType: string) {
    const origin = Number((this.indicators[indicatorType]?.value.reduce((acc: number, cur: number) => acc + cur, 0) / 4).toFixed(1))
    const sector = Number((this.indicatorSector[`sector_${indicatorType}`]?.reduce((acc: number, cur: number) => acc + cur, 0) / 4).toFixed(1))
    const isHighVal = origin > sector
    return {
      origin,
      sector,
      text: isHighVal ? "높습니다." : "낮습니다.",
      colorClass: isHighVal ? '' : 'sector',
      icon: isHighVal ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
      iconColor: isHighVal ? 'red' : 'blue'
    }        
  }

  get isMobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }
  
  get getStrongFontColorClass () {
    return this.$vuetify.theme.dark ? 'strong-white' : 'strong-black'
  }

  mounted () {
    this.expandEps = true
  }

}
</script>

<style scoped>
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