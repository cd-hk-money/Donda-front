<template>
  <v-card 
    class="stock-indicator-detail overflow-y-auto"    
    outlined
    width="100%"
    height="787"
  >
    <v-card-title>
      재무제표
      <btn-badge>
        <template v-slot:text>
          <div><strong class="text-h6 cyan--text font-weight-bold">재무제표</strong></div>
          기업의 재무상태나 경영성과 등을 보여주는 문서입니다. <br />
          <span>회사가 번성하는지, 쇠락하는지를 숫자로 간단하게 알 수 있습니다.</span>
          <div class="d-flex justify-space-between">
            <span></span>
            <a href="https://ko.wikipedia.org/wiki/%EC%9E%AC%EB%AC%B4%EC%A0%9C%ED%91%9C">출처: 위키백과</a>
          </div>
        </template>
      </btn-badge>               
    </v-card-title>    
    <v-card-subtitle>
      {{ stock.name }}의 재무제표를 확인해보세요.
    </v-card-subtitle>

    <div class="more"> 각 항목을 클릭하면, 더 많은 정보를 볼 수 있습니다. </div> 

    <v-divider />

    <div v-if="!loaded">
      <FinanceContentFactory
        indicatorType="asset"
        icon="fa-solid fa-arrow-trend-up"
        iconColor="red"
        typeKorean="자산총계"
        :chartData="statement['asset']"
      >
        <template v-slot:description>
          현금, 매출채권, 제품, 공장 등 기업이 보유하고 있는 모든 자산입니다.
        </template>
        <template v-slot:information>
          <FinanceInformationFactory>
            <strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.
          </FinanceInformationFactory>
        </template>
      </FinanceContentFactory>

      <FinanceContentFactory
        indicatorType="equity"
        icon="fa-solid fa-arrow-trend-up"
        iconColor="red"
        typeKorean="자기자본"
        :chartData="statement['equity']"
      >
        <template v-slot:description>
          사업주 회사에 주주들이 스스로 납입한 자본입니다. 자기자본이라고 부르기도 합니다.
        </template>
        <template v-slot:information>          
          <FinanceInformationFactory>
            <strong class="ml-1">자기자본</strong>은 많으면 많을수록 좋습니다.
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
import FinanceInformationFactory from '@/v2/components/detail/finance/FinanceInformationFactory.vue'
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
    '영업총이익',          // gross_margin    
  ]

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
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

    console.log(this.statement)
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
  color: rgba(64, 224, 208, 1);
}

.btn-badge-text {
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