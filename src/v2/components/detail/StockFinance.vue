<template>
  <v-card 
    class="stock-indicator-detail overflow-y-auto"    
    outlined
    width="100%"
    height="787"
  >
    <v-card-title>
      재무제표
      <BtnBadge>
        <template v-slot:text>
          <div><strong class="text-h6 cyan--text font-weight-bold">재무제표</strong></div>
          기업의 재무상태나 경영성과 등을 보여주는 문서입니다. <br />
          <span>회사가 번성하는지, 쇠락하는지를 숫자로 간단하게 알 수 있습니다.</span>
          <div class="d-flex justify-space-between">
            <span></span>
            <a href="https://ko.wikipedia.org/wiki/%EC%9E%AC%EB%AC%B4%EC%A0%9C%ED%91%9C">출처: 위키백과</a>
          </div>
        </template>
      </BtnBadge>               
    </v-card-title>    
    <v-card-subtitle>
      {{ stock.name }}의 재무제표를 확인해보세요.
    </v-card-subtitle>

    <div v-if="!mobile" class="more"> 각 항목을 클릭하면, 더 많은 정보를 볼 수 있습니다. </div> 

    <v-divider />

    <div v-if="!loaded">
      <FinanceContentFactory
        indicatorType="asset"
        typeKorean="자산총계"
        :chartData="statement['asset']"
      >
        <template v-slot:description>
          현금, 매출채권, 제품, 공장 등 기업이 보유하고 있는 모든 자산입니다.
        </template>
        <template v-slot:information>
          <FinanceInformationFactory color="error">
            자산총계는 일반적으로 많으면 많을수록 좋습니다.
          </FinanceInformationFactory>
        </template>
      </FinanceContentFactory>

      <v-divider />

      <FinanceContentFactory
        indicatorType="equity"
        typeKorean="자기자본"
        :chartData="statement['equity']"        
      >
        <template v-slot:description>
          사업주 회사에 주주들이 스스로 납입한 자본입니다.
          <span class="font-weight-bold">자본총계</span>라고 부르기도 합니다. <br>          
        </template>
        <template v-slot:information>    
          <FinanceInformationFactory color="error">
            자산총계는 일반적으로 많으면 많을수록 좋습니다.
          </FinanceInformationFactory>                
          <FinanceInformationFactory>
            실질적으로 주주들에게 떨어지는 금액이므로, 신중하게 살펴볼 필요가 있습니다.
          </FinanceInformationFactory>
          <FinanceInformationFactory color="secondary">
            <div class="font-weight-bold">부채비율</div>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 font-weight-bold">부채비율</strong></div>
                <span class="text-h6 cyan--text"> (부채총계 / 자기자본) X 100 </span> 로 계산되는 값으로, <br>
                '남의 돈'이 '나의 돈'에 비해 얼마나 비중을 차지하는지 나타냅니다. <br>                                
                일반적으로 100~200% 수준을 적정 수준으로 보고있습니다. <br>
                부채비율이 <strong class="cyan--text">100%</strong> 이하면 아주 좋다고 말합니다. <br>
                부채비율이 <strong class="red--text">400%</strong>가 넘어가면, 기업 신용등급 하락 등의 불이익을 받으므로, 투자에 주의가 필요합니다.
                

                <v-divider class="mt-2 mb-2"/>

                현재 {{ stock.name }} 의 <strong class="cyan--text">부채비율</strong>은 
                <strong class="cyan--text"> {{ debtRatio }} </strong>입니다.
              </template>
            </BtnBadge>
            에 계산되는 값입니다.
          </FinanceInformationFactory>
        </template>
      </FinanceContentFactory>

      <v-divider />

      <FinanceContentFactory
        indicatorType="ebitda"
        typeKorean="영업이익"
        :chartData="statement['ebitda']"
      >
        <template v-slot:description>
          순수하게 영업을 통해 벌어들인 이익을 뜻합니다.
        </template>
        <template v-slot:information>     
          <FinanceInformationFactory color="error">
            영업이익은 일반적으로 많으면 많을수록 좋습니다.
          </FinanceInformationFactory>     
          <FinanceInformationFactory color="secondary">
            <div class="font-weight-bold">영업이익률</div>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 font-weight-bold">영업이익률</strong></div>
                <span class="text-h6 cyan--text"> (영업이익 / 매출액) X 100 </span> 로 계산되는 값으로, <br>
                기업의 마진율이 좋은지를 파악 할 수 있습니다. <br>
                영업이익률은 일반적으로 높을수록 좋지만, 산업군마다 영업이익률의 평균이 다르므로, 다른 산업군과의 비교는 옳지 않습니다.

                <v-divider class="mt-2 mb-2"/>

                현재 {{ stock.name }} 의 <strong class="cyan--text">영업이익률</strong>은
                <strong class="cyan--text"> {{ ofm }} </strong>입니다.
              </template>
            </BtnBadge>
            에 계산되는 값입니다.
          </FinanceInformationFactory>
        </template>
      </FinanceContentFactory>

      <v-divider />

      <FinanceContentFactory
        indicatorType="revenue"
        typeKorean="매출액"
        :chartData="statement['revenue']"
      >
        <template v-slot:description>
          기업이 영업활동을 통해 얻은 총 수익을 뜻합니다.
        </template>
        <template v-slot:information>       
          <FinanceInformationFactory color="error">
            매출액은 일반적으로 많으면 많을수록 좋습니다.
          </FinanceInformationFactory>             
          <FinanceInformationFactory color="secondary">
            <div class="font-weight-bold">영업이익률</div>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 font-weight-bold">영업이익률</strong></div>
                <span class="text-h6 cyan--text"> (영업이익 / 매출액) X 100 </span> 로 계산되는 값으로, <br>
                기업의 마진율이 좋은지를 파악 할 수 있습니다. <br>
                영업이익률은 일반적으로 높을수록 좋지만, 산업군마다 영업이익률의 평균이 다르므로, 다른 산업군과의 비교는 옳지 않습니다.

                <v-divider class="mt-2 mb-2"/>

                현재 {{ stock.name }} 의 <strong class="cyan--text">영업이익률</strong>은
                <strong class="cyan--text"> {{ ofm }} </strong>입니다.
              </template>
            </BtnBadge>
            에 계산되는 값입니다.
          </FinanceInformationFactory>
          <FinanceInformationFactory color="secondary">
            <div class="font-weight-bold">매출총이익률</div>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 font-weight-bold">영업이익률</strong></div>
                <span class="text-h6 cyan--text"> (영업이익 / 매출액) X 100 </span> 로 계산되는 값으로, <br>
                기업의 마진율이 좋은지를 파악 할 수 있습니다. <br>
                영업이익률은 일반적으로 높을수록 좋지만, 산업군마다 영업이익률의 평균이 다르므로, 다른 산업군과의 비교는 옳지 않습니다.

                <v-divider class="mt-2 mb-2"/>

                현재 {{ stock.name }} 의 <strong class="cyan--text">영업이익률</strong>은
                <strong class="cyan--text"> {{ gpm }} </strong>입니다.
              </template>
            </BtnBadge>
            에 계산되는 값입니다.
          </FinanceInformationFactory>
        </template>
      </FinanceContentFactory>

      <v-divider />

      <FinanceContentFactory
        indicatorType="liability"
        typeKorean="부채총계"
        :chartData="statement['liability']"
      >
        <template v-slot:description>          
          기업이 가지고있는 빚의 총합을 말합니다.
        </template>
        <template v-slot:information>          
          <FinanceInformationFactory color="primary">
            부채총계는 일반적으로 적으면 적을수록 좋습니다.
          </FinanceInformationFactory>
          <FinanceInformationFactory color="secondary">
            <div class="font-weight-bold">부채비율</div>        
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 font-weight-bold">부채비율</strong></div>
                <span class="text-h6 cyan--text"> (부채총계 / 자기자본) X 100 </span> 로 계산되는 값으로, <br>
                '남의 돈'이 '나의 돈'에 비해 얼마나 비중을 차지하는지 나타냅니다. <br>                                
                일반적으로 100~200% 수준을 적정 수준으로 보고있습니다. <br>
                부채비율이 <strong class="cyan--text">100%</strong>이하면 아주 좋다고 말합니다. <br>
                부채비율이 <strong class="red--text">400%</strong>가 넘어가면, 기업 신용등급 하락 등의 불이익을 받으므로, 투자에 주의가 필요합니다.
                

                <v-divider class="mt-2 mb-2"/>

                현재 {{ stock.name }} 의 <strong class="cyan--text">부채비율</strong>은 
                <strong class="cyan--text"> {{ debtRatio }} </strong>입니다.
              </template>
            </BtnBadge>
            에 계산되는 값입니다.
          </FinanceInformationFactory>
          
        
        </template>
      </FinanceContentFactory>

      <v-divider />

      <FinanceContentFactory
        indicatorType="gross_margin"
        typeKorean="매출총이익"
        :chartData="statement['gross_margin']"
      >
        <template v-slot:description>
          매출에서 매출 원가를 뺀 값으로, 이익이라고 생각되는 모든 것이 매출총이익이 됩니다.
        </template>
        <template v-slot:information>          
          <FinanceInformationFactory color="error">
            매출총이익은 많으면 많을수록 좋습니다.
          </FinanceInformationFactory>
          <FinanceInformationFactory color="secondary">
            <div class="font-weight-bold">매출총이익률</div>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 font-weight-bold">매출총이익률</strong></div>
                <span class="text-h6 cyan--text"> (매출총이익 / 매출액) X 100 </span> 로 계산되는 값으로, <br>
                매출로부터 얼마만큼의 이득을 얻는지를 나타냅니다. <br>
                매출총이익률 일반적으로 높을수록 좋지만, 유지 가능성을 고려해야합니다.

                <v-divider class="mt-2 mb-2"/>

                현재 {{ stock.name }} 의 <strong class="cyan--text">매출총이익률</strong>은
                <strong class="cyan--text"> {{ ofm }} </strong>입니다.
              </template>
            </BtnBadge>
            에 계산되는 값입니다.
          </FinanceInformationFactory>
        </template>
      </FinanceContentFactory>

      <v-divider />

      <FinanceContentFactory
        indicatorType="profit"
        typeKorean="당기순이익"
        :chartData="statement['profit']"
      >
        <template v-slot:description>
          일정기간동안의 기업의 순이익을 뜻합니다. <br>
          영업과 직접적인 관련 없는 수익과 비용을 제외하고 실제로 벌어들인 돈입니다.
        </template>
        <template v-slot:information>          
          <FinanceInformationFactory color="error">
            당기순이익은 많으면 많을수록 좋습니다.
          </FinanceInformationFactory>
          <FinanceInformationFactory color="secondary">
            <div class="font-weight-bold">ROE</div>
            <BtnBadge>
              <template v-slot:text>
                <div><strong class="text-h6 font-weight-bold">ROE</strong></div>
                <span class="text-h6 cyan--text"> (당기순이익 / 자산총계) X 100 </span> 로 계산되는 값입니다. <br>
                자세한 내용은 돈다의 <strong class="cyan--text">보조지표</strong>항목에서 알아보세요.
              </template>
            </BtnBadge>
            에 계산되는 값입니다.
          </FinanceInformationFactory>
        </template>
      </FinanceContentFactory>

      <v-divider />

      <FinanceContentFactory
        indicatorType="current_asset"
        typeKorean="유동자산"
        :chartData="statement['current_asset']"
      >
        <template v-slot:description>
          기업이 바로 현금으로 사용 가능한 자산을 의미합니다. 매각하여 현금으로 바꿀 수 있는 부동산 등의 자금은 유동자산으로 취급하지 않습니다.
        </template>
        <template v-slot:information>          
          <FinanceInformationFactory color="error">
            유동자산은 많으면 많을수록 좋습니다.
          </FinanceInformationFactory>          
        </template>
      </FinanceContentFactory>

      <v-divider />


    </div>      
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import BtnBadge from '../vuetify/BtnBadge.vue'
import StockFinanceBarChart from '@/v2/components/detail/StockFinanceBarChart.vue'
import StockFinanceLineChart from '@/v2/components/detail/StockFinanceLineChart.vue'
import FinanceContentFactory from '@/v2/components/detail/finance/FinanceContentFactory.vue'
import FinanceInformationFactory from '@/v2/components/detail/finance/InformationFactory.vue'
import { ISimpleChartData, IStockModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    BtnBadge,
    StockFinanceBarChart,
    StockFinanceLineChart,
    FinanceContentFactory,
    FinanceInformationFactory
  }
})
export default class StockFinance extends Vue {

  types = [
    '자산총계',              // asset
    '자본총계',              // equity
    '자본총계(비지배)',      // equity_non
    '부채총계',             // liability
    '유동자산',             // current_asset
    '당기순이익',           // profit
    '당기순이익(비지배)',   // profit_non
    '매출액',              // revenue
    '현금흐름',            // cash
    '영업이익',            // ebitda
    '매출총이익',          // gross_margin    
  ]

  get debtRatio () {
    return (this.statement.liability.value[0] / this.statement.equity.value[0] * 100).toFixed(1) + '%'
  }

  get ofm () {
    return (this.statement.ebitda.value[0] / this.statement.revenue.value[0] * 100).toFixed(1) + '%'
  }

  get gpm () {
    return (this.statement['gross_margin'].value[0] / this.statement.revenue.value[0] * 100).toFixed(1) + '%'
  }

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }
  
  get title () {
    return this.codeTitleMapping[this.$route.params.title]
  }
      
  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('statement') statement!: ISimpleChartData
  @StockStoreModule.State('statementTypes') statementTypes!: string[]
  @StockStoreModule.State('statementLoaded') loaded!: boolean  
  @StockStoreModule.State('statementAllLoaded') statementAllLoaded!: boolean  
  @StockStoreModule.Action('getStockStatement') readonly getStockStatement!: (name: string) => Promise<void>
  
  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: { [title: string]: string }

  async mounted() {        
    const code = this.$route.params.title
    await this.getStockStatement(code)    
  }  
}

</script>

<style scoped>
.more {
  position: absolute;
  right: 5px;  
  top: 60px;
  font-size: 12px;
  opacity: .8;
  color: grey !important;
}
.stock-finance-date {
  position: absolute;
  right: 10px;
  font-size: 12px !important;
}

.stock-indicator-detail {
  transition: all .3s ease;  
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

.stock-indicator-detail:hover {
  color: #00BCD4;
}

.BtnBadge-text {
  font-size: 10px !important;
}

.stock-indicator-detail-content {
  transition: all .5s;  
  opacity: .5;
}

.stock-indicator-detail-content:hover {
  cursor: pointer;
  opacity: 1;  
} 

</style>