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

    <v-divider />

    <div v-if="!loaded">
      <div
        v-for="(type, index) in statementTypes" 
        :key="index"
      >
        <v-sheet
          class="stock-indicator-detail-content"
          elevation="0"          
          
          @click.stop="[dialog = true, dialogType = type]"
        >
          <v-card-title class="stock-indicator-detail-content-title d-flex align-end">
            <span class="text-h4"> {{ getTypeUpper(type) }} </span>
          </v-card-title>

          <v-card-subtitle class="d-flex justify-start pt-1">
            {{ types[index] }}
            <!-- <span class="ml-3"> {{ statement[type].value.at(0).toLocaleString() }} ₩ </span> -->
            <span class="stock-finance-date">
              기준일: {{ statement[type].date.at(0)}}
            </span>
          </v-card-subtitle>

          <v-card-text class="d-flex">
            <stock-finance-bar-chart
              class="ml-5 mr-5"
              :key="index"
              :chartData="statement[type]"          
              :height="100"
            />        
            <v-divider vertical/>
          </v-card-text>
        </v-sheet>        
      </div>      
    </div>
    
    <v-dialog      
      :style="dialogStyle"
      max-width="800"
      min-height="500"
      v-model="dialog"      
      overlay-opacity="0.2"      
    >
      <v-card         
        max-width="800"
        min-height="500"
        outlined      
      >
        <v-card-title class="font-weight-bold">
          {{ types[statementTypes.indexOf(dialogType)]  }}
        </v-card-title>

        <stock-finance-line-chart 
          class="mr-5"            
          :statementType="dialogType"
          :title="title"
          :height="200"
        />  
        <v-divider />
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

import BtnBadge from '../vuetify/BtnBadge.vue'
import StockFinanceBarChart from '@/v2/components/detail/StockFinanceBarChart.vue'
import StockFinanceLineChart from '@/v2/components/detail/StockFinanceLineChart.vue'
import { ISimpleChartData, IStockModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    BtnBadge,
    StockFinanceBarChart,
    StockFinanceLineChart    
  }
})
export default class StockFinance extends Vue {

  model = 0
  dialog = false
  dialogType = ''
  dialogStyle = {
    'margin-left': '20px'
  }

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

  get title () {    
    return this.codeTitleMapping[this.$route.params.title]
  }

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  getTypeUpper(str: string) {
    return str.replace(/\b[a-z]/g, char => char.toUpperCase());
  }

  

  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('statement') statement!: ISimpleChartData
  @StockStoreModule.State('statementTypes') statementTypes!: string[]
  @StockStoreModule.State('statementLoaded') loaded!: boolean  
  @StockStoreModule.Action('getStockStatement') readonly getStockStatement!: (name: string) => Promise<void>
  
  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: any

  async created() {        
    const code = this.$route.params.title
    await this.getStockStatement(code)
  }
  
}

</script>

<style scoped>
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

.stock-indicator-detail-content:hover .stock-indicator-detail-content-title,
.stock-indicator-detail-content:hover .strong-white strong,
.stock-indicator-detail-content:hover .strong-black strong
 {
  color: rgb(64, 224, 208) !important;
} 
</style>