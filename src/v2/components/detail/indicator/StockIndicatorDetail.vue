<template>
  <div class="cover">
    <v-card     
    class="stock-indicator-detail"    
      elevation="0"    
      :height="mobile ? '100%' : 787"
    >    
      <v-card-title>
        보조 지표
      </v-card-title>
  
      <v-card-subtitle>
        {{ stock.data.name }}의 보조지표를 확인해보세요.
      </v-card-subtitle>
            
      <div v-if="!indicator.loading && !indicatorSector.loading && !indicatorSectorDaily.loading">
  
        <!-- EPS -->
        <IndicatorContentFactory       
          indicatorType="eps"
          :iconColor="epsMean.iconColor"
          :icon="epsMean.icon"
          :tooltipMessage="epsMean.text"
          :chartData="indicator.data.eps"
          :sectorData="indicatorSector.data.sector_eps"
        >
          <template v-slot:title>
            <strong>E</strong>arnings <strong>P</strong>er <strong>S</strong>hare |  주당 순이익
          </template>
  
          <template v-slot:description>
            <strong>당기순이익</strong>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 cyan--text font-weight-bold">당기순이익</strong></div>
                일정 회계기간 동안 발생한 기업의 전체 수익에서 비용을 차감한 금액으로,
                <div class="d-flex justify-space-between">
                  <span><strong class="cyan--text">일정 기간동안 기업이 창출한 순이익</strong>을 뜻합니다.</span>
                  <a href="https://terms.naver.com/entry.naver?docId=67170&cid=43667&categoryId=43667">출처: 네이버 지식백과</a>
                </div>
              </template>
            </BtnBadge>을 
            <strong>유통 주식수</strong>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 cyan--text font-weight-bold">유통 주식수</strong></div>
                상장법인의 총발행 주식 중 최대주주 지분 및 정부 소유주 등을 제외한,
                <div class="d-flex justify-space-between">
                  <span><strong class="cyan--text">실제 시장에서 유통 가능한 주식 수</strong>를 뜻합니다.</span>
                  <a href="https://econowide.com/3598">출처: 이코노와이드 블로그</a>
                </div>
              </template>
            </BtnBadge> 로 나눈 값을 의미합니다.
          </template>
  
          <template v-slot:compareSector>
            <strong>{{ stock.data.name }}</strong>의 1년 <strong>EPS 평균값은</strong> <strong>{{ epsMean.origin.toLocaleString() }}</strong>으로,
            <strong class="sector">동종 업계 1년 평균 {{ epsMean.sector.toLocaleString() }}</strong> 보다  
            <strong :class="epsMean.colorClass">{{ epsMean.text }}</strong>
            <v-icon :color="epsMean.iconColor" size="20" class="ml-2">{{ epsMean.icon}}</v-icon>
          </template>
        
          <template v-slot:information>
            <InformationFactory :addinationalClass="'indicator-detail-card'">
              <strong class="mr-1">EPS</strong> 가 평균보다 높을수록, <span>투자 가치가 높다고 볼 수 있습니다</span>
            </InformationFactory>
  
            <InformationFactory>
              <strong class="mr-1">EPS</strong>와<strong class="mr-1 ml-1">BPS</strong>가 동시에 늘어나는 종목에 투자하는 것이 일반적으로 가장 높은 수익률을 거둘 수 있습니다.
            </InformationFactory>
          </template>
        </IndicatorContentFactory>
  
        <v-divider />
  
        <!-- BPS -->
        <IndicatorContentFactory       
          indicatorType="bps"
          :iconColor="bpsMean.iconColor"
          :icon="bpsMean.icon"
          :tooltipMessage="bpsMean.text"
          :chartData="indicator.data.bps"
          :sectorData="indicatorSector.data.sector_bps"
        >
          <template v-slot:title>
            <strong>E</strong>arnings <strong>P</strong>er <strong>S</strong>hare |  주당 순이익
          </template>
  
          <template v-slot:description>
            <strong>순자산</strong>
              <BtnBadge>
                <template v-slot:text>            
                  <div><strong class="text-h6 cyan--text font-weight-bold">순자산</strong></div>
                  총자산에서 부채를 뺀 것을 의미합니다. <strong class="cyan--text">자기자본</strong> 이라고도 합니다.
                  <div class="d-flex justify-space-between">
                    <div></div>
                    <a href="https://econowide.com/3598">출처: 매일경제 경제용어사전</a>
                  </div>
                </template>
              </BtnBadge>        
              을 
              <strong>발행 주식수</strong> 로 나눈 값을 의미합니다.  
          </template>
  
          <template v-slot:compareSector>
            <strong>{{ stock.data.name }}</strong>의 1년 <strong>BPS 평균값은</strong> <strong>{{ bpsMean.origin.toLocaleString() }}</strong>으로,
            <strong class="sector">동종 업계 1년 평균 {{ bpsMean.sector.toLocaleString() }}</strong> 보다  
            <strong :class="bpsMean.colorClass">{{ bpsMean.text }}</strong>
            <v-icon :color="bpsMean.iconColor" size="20" class="ml-2">{{ bpsMean.icon}}</v-icon>        
          </template>
  
          <template v-slot:information>
            <InformationFactory :addinationalClass="'indicator-detail-card'">
              <strong class="mr-1">BPS</strong> 가 높으면, 자기 자본의 비중이 크거나, <span>회사의 가치가 높다고 판단됩니다</span>
            </InformationFactory>
  
            <InformationFactory>
              <strong class="mr-1">BPS</strong> 에는 주가 정보가 고려되있지 않기 때문에, 주가와의 상관관계를 파악하기 위해 주로<strong class="ml-1 mr-1">PBR</strong>을 같이 확인하여 투자 가치를 판단합니다.
            </InformationFactory>
  
            <InformationFactory>
              <strong class="mr-1">BPS</strong>와<strong class="mr-1 ml-1">EPS</strong>가 동시에 늘어나는 종목에 투자하는 것이 일반적으로 가장 높은 수익률을 거둘 수 있습니다.
            </InformationFactory>
          </template>
        </IndicatorContentFactory>
  
        <v-divider />
  
        <!-- ROE  -->
        <IndicatorContentFactory
          indicatorType="roe"
          :iconColor="roeMean.iconColor"
          :icon="roeMean.icon"
          :tooltipMessage="roeMean.text"
          :chartData="indicator.data.roe"
          :sectorData="indicatorSector.data.sector_roe"
        >
           <template v-slot:title>
            <strong>R</strong>eturn <strong>O</strong>n <strong>E</strong>quity | 자기자본이익률
          </template>
  
          <template v-slot:description>
            <strong>당기순이익</strong>
            <BtnBadge>
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
            </BtnBadge>
            을                 
            <strong>평균 자기자본</strong>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 cyan--text font-weight-bold">평균 자기자본</strong></div>
                일정기간동안 자기자본의 평균을 뜻합니다.
                <div class="d-flex justify-space-between">
                  <span></span>
                  <a href="https://terms.naver.com/entry.naver?docId=67170&cid=43667&categoryId=43667">출처: 페페 주식정보 블로그</a>
                </div>
              </template>
            </BtnBadge>
            으로 나눈 수치 백분율 값을 의미합니다.
          </template>
  
          <template v-slot:compareSector>
            <strong>{{ stock.data.name }}</strong>의 1년 <strong>ROE 평균값은</strong> <strong>{{ roeMean.origin.toLocaleString() }}</strong>으로,
              <strong class="sector">동종 업계 1년 평균 {{ roeMean.sector.toLocaleString() }}</strong> 보다  
              <strong :class="roeMean.colorClass">{{ roeMean.text }}</strong>
              <v-icon :color="roeMean.iconColor" size="20" class="ml-2">{{ roeMean.icon}}</v-icon>
          </template>
        
          <template v-slot:information>
            <InformationFactory :addinationalClass="'indicator-detail-card'">
              <strong>ROE</strong> 가 높으면, 자기 자본으로 더 많은 이익을 내며, <span>주가 상승률이 높다고 판단됩니다.</span>
            </InformationFactory>
          </template>
        </IndicatorContentFactory>
  
        <v-divider />
        
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
              <StockIndicatorLineChart 
                type="PSR"
                :chartData="indicatorDaily.data.PSR"   
                :sector="indicatorSectorDaily.data.value.PSR"
                :height="mobile ? 200 : 100"      
              />
              <v-card-text :class="['grey--text mt-1', getStrongFontColorClass]">
                <div>
                  <strong>{{ stock.data.name }}</strong>의 1년 <strong>PSR</strong>평균값은 <strong>{{ psrMean.origin.toLocaleString() }}</strong>으로,
                  <strong class="sector">동종 업계 1년 평균 {{ psrMean.sector.toLocaleString() }}</strong> 보다  
                  <strong :class="psrMean.colorClass">{{ psrMean.text }}</strong>
                  <v-icon :color="psrMean.iconColor" size="20" class="ml-2">{{ psrMean.icon}}</v-icon>
                </div>
    
                <v-divider class="mt-2" />
                    
                <InformationFactory>
                  <strong>PSR</strong> 의 수치가 낮을수록 저평가된 기업입니다. 
                </InformationFactory>

                <InformationFactory>
                  다른 주식과 비교해서, <strong class="ml-1">PER</strong>은 같은데, <strong class="ml-1">PSR</strong>이 낮은 주식은 <strong>순이익률</strong>이 낮다고 판단되므로, 매수에 신중을 요할 필요가 있습니다.
                </InformationFactory>
    

              </v-card-text>              
            </v-card>
          </v-expand-transition>
        </v-sheet>  
              
        <v-divider />
      
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
              <StockIndicatorLineChart 
                type="PSR"
                :chartData="indicatorDaily.data.PER"   
                :sector="indicatorSectorDaily.data.value.PER"
                :height="mobile ? 200 : 100"      
              />
              <v-card-text :class="['grey--text mt-1', getStrongFontColorClass]">
                <div>
                  <strong>{{ stock.data.name }}</strong>의 1년 <strong>PER</strong>평균값은 <strong>{{ perMean.origin.toLocaleString() }}</strong>으로,
                  <strong class="sector">동종 업계 1년 평균 {{ perMean.sector.toLocaleString() }}</strong> 보다  
                  <strong :class="perMean.colorClass">{{ perMean.text }}</strong>
                  <v-icon :color="perMean.iconColor" size="20" class="ml-2">{{ perMean.icon}}</v-icon>
                </div>
    
                <v-divider class="mt-2" />
                    
                <InformationFactory>
                  일반적으로 <strong>PER</strong> 의 수치가 낮을수록 저평가된 기업입니다. 
                </InformationFactory>                

                <InformationFactory>
                  산업 특성상<strong class="ml-1">PER</strong>이 높은 군이 있고, 낮은 군이 존재하므로, 동종 업계와의 비교를 요합니다.
                </InformationFactory>                
                    
              </v-card-text>  
            </v-card>
          </v-expand-transition>
        </v-sheet>    
      
        <v-divider />
      
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
              <StockIndicatorLineChart 
                type="PSR"
                :chartData="indicatorDaily.data.PSR"   
                :sector="indicatorSectorDaily.data.value.PSR"
                :height="mobile ? 200 : 100"      
              />
              <v-card-text :class="['grey--text mt-1', getStrongFontColorClass]">
                <div>
                  <strong>{{ stock.data.name }}</strong>의 1년 <strong>PBR</strong>평균값은 <strong>{{ pbrMean.origin.toLocaleString() }}</strong>으로,
                  <strong class="sector">동종 업계 1년 평균 {{ pbrMean.sector.toLocaleString() }}</strong> 보다  
                  <strong :class="pbrMean.colorClass">{{ pbrMean.text }}</strong>
                  <v-icon :color="pbrMean.iconColor" size="20" class="ml-2">{{ pbrMean.icon}}</v-icon>
                </div>
    
                <v-divider class="mt-2" />

                <InformationFactory>                  
                  일반적으로 <strong class="ml-1">PSR</strong>이 섹터 평균보나 낮거나. <strong class="ml-1">0.7</strong>보다 낮다면, 투자를 고려해 볼 만 합니다.
                </InformationFactory>

                <InformationFactory>
                  <strong>PSR</strong>이 <strong>1.5</strong>보다 높다면, 투자를 권장하지 않습니다.
                </InformationFactory>                    
              </v-card-text>  
            </v-card>
          </v-expand-transition>
        </v-sheet>    
      </div>        
    </v-card>
    <div class="scroll-box"></div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import StockIndicatorBarChart from '@/v2/components/detail/indicator/StockIndicatorBarChart.vue'
import StockIndicatorLineChart from '@/v2/components/detail/indicator/StockIndicatorLineChart.vue'
import IndicatorContentFactory from '@/v2/components/detail/indicator/IndicatorContentFactory.vue'
import BtnBadge from '@/v2/components/vuetify/BtnBadge.vue'
import InformationFactory from '@/v2/components/detail/finance/InformationFactory.vue';
import StockStoreMixin from '@/mixins/StockStoreMixin.vue';

@Component({
  components: {
    BtnBadge,
    InformationFactory,
    IndicatorContentFactory,
    StockIndicatorBarChart,    
    StockIndicatorLineChart
  }
})
export default class StockIndicatorDetail extends StockStoreMixin {
        
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
    return this.getIncicatorDailyMean('PSR')
  }

  get perMean () {
    return this.getIncicatorDailyMean('PER')
  }

  get pbrMean () {
    return this.getIncicatorDailyMean('PBR')
  }

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  

  getIndicatorMean(indicatorType: string) {        
    const origin = Number((this.indicator.data[indicatorType]?.value.reduce((acc: number, cur: number) => acc + cur, 0) / 4).toFixed(1))
    const sector = Number((this.indicatorSector.data[`sector_${indicatorType}`]?.reduce((acc: number, cur: number) => acc + cur, 0) / 4).toFixed(1))
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

  getIncicatorDailyMean(indicatorType: string) {
    const length = this.indicatorDaily.data.PBR.length
    const origin = Number((this.indicatorDaily.data[indicatorType]?.reduce((acc: number, cur: number) => acc + cur, 0) / length).toFixed(1))
    const sector = Number((this.indicatorSectorDaily.data.value[indicatorType]?.reduce((acc: number, cur: number) => acc + cur, 0) / length).toFixed(1))
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
  position: relative;
  overflow-y: scroll;
}


.stock-indicator-detail::-webkit-scrollbar {
  width: 2px; 
}

.stock-indicator-detail::-webkit-scrollbar,
.stock-indicator-detail::-webkit-scrollbar-thumb {
  color: #00BCD4;
}

.stock-indicator-detail::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,.2); 
}

.scroll-box {
  position: absolute;
  -webkit-transition: all .3s;
  width: 2px;
  height: 100%;
  top: 0px;
  right: 0px;
  opacity: 1;
  color: #00BCD4;
  background-color: rgb(30, 30, 30);
  
}

.cover:hover .scroll-box {
  opacity: 0;
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
  color: #00BCD4 !important;
} 

.stock-indicator-detail-content:hover .strong-white .sector,
.stock-indicator-detail-content:hover .strong-black .sector
 {
  color: rgb(255, 99, 132) !important;  
} 

.BtnBadge-text {
  font-size: 10px !important;
}

.indicator-detail-card span {
  margin-left: 4px;
  text-decoration: underline;
  font-size: 14px !important;
  font-weight: normal !important;
}
</style>