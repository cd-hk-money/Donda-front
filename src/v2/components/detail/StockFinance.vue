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
      <div
        v-for="(type, index) in statementTypes" 
        :key="index"
      >
        <v-sheet
          class="stock-indicator-detail-content"
          elevation="0"                              
          @click="expandsPannel(index)"
        >
          <v-card-title class="stock-indicator-detail-content-title d-flex align-end">
            <span class="text-h4"> {{ getTypeUpper(type) }} </span>
            <v-chip small class="ml-3 mb-1">
              <v-icon :color="contents2[index].iconColor">
                {{ contents2[index].icon }}
              </v-icon>
            </v-chip>
          </v-card-title>

          <v-card-subtitle class="pt-1 font-weight-bold text-h7">
            {{ types[index] }}
          </v-card-subtitle>

          <v-card-text class="d-flex">
            <stock-finance-bar-chart
              class="ml-5 mr-5"
              :key="index"
              :chartData="statement[type]"          
              :height="100"
            />        
            <v-divider vertical/>

            <div class="pl-3">
              <div class=" mr-1 font-weight-bold"> {{ getTypeUpper(type) }} | {{ types[index] }} </div>
              {{ contents[index] }}
              <div class="d-flex">
                <v-sheet
                  v-for="content in stateInformationsHTML[index]"
                  :key="content"
                  outlined
                  max-height="40"
                  class="ml-2 pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center"
                  rounded="lg"
                  color="blue-grey lighten-1"
                >
                  <v-icon small class="mr-1">mdi-information</v-icon>
                  <span v-html="content"></span>
                </v-sheet>        
              </div>
            </div>          
          </v-card-text>
          <v-expand-transition>
            <v-card v-if="expands[index]" height="350">
              <stock-finance-line-chart 
                class="mr-5"            
                :statementType="type"
                :height="100"
              />
            </v-card>
          </v-expand-transition>
        </v-sheet>       

        <v-divider />
      </div>      
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import BtnBadge from '../vuetify/BtnBadge.vue'
import StockFinanceBarChart from '@/v2/components/detail/StockFinanceBarChart.vue'
import StockFinanceLineChart from '@/v2/components/detail/StockFinanceLineChart.vue'
import { ISimpleChartData, IStockModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

interface IStatementInfo {
  type: string
  description?: string
  informations: string[]
}

@Component({
  components: {
    BtnBadge,
    StockFinanceBarChart,
    StockFinanceLineChart    
  }
})
export default class StockFinance extends Vue {

  expands = [false, false, false, false, false, false, false, false, false, false]

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

  contents = [
    '현금, 매출채권, 제품, 공장 등 기업이 보유하고 있는 모든 자산입니다.',
    '의미합니다',
    '의미합니다',
    '의미합니다',
    '의미합니다',
    '의미합니다',
    '의미합니다',
    '의미합니다',
    '의미합니다',
    '의미합니다',
  ]
  
  statements: IStatementInfo[] = [
    {
      type: '자산총계',
      description: '현금, 매출채권, 제품, 공장 등 기업이 보유하고 있는 모든 자산입니다.',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '자본총계',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '자본총계(비지배)',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '부채총계',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '유동자산',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '당기순이익',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '당기순이익(비지배)',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '매출액',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '현금흐름',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '영업이익',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },
    {
      type: '영업총이익',
      informations: ['는 많으면 많을수록 좋습니다.', '']
    },    
  ]

  get statementInformationHTML () {
    return this.statements.map(statement => this.createStatementinformationHTML(statement))
  }

  stateInformationsHTML = [
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자본총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
    ['<strong class="ml-1">자산총계</strong>는 많으면 많을수록 좋습니다.'],
  ]
  
  createStatementinformationHTML = (statements:{type: string, informations: string[]}): string[] => (
    statements.informations.map((information, i) => {
      if(!i) return '<strong class="ml-1">' + statements.type + '</strong>' + information
      else return information
    })
  )
      
  get contents2 () {        
    return Object.values(this.statement)?.splice(1).map((statement, i) => {      
      const isHighVal = statement.value[0] > statement.value[1]
      return {
        chartData: [...statement.value].reverse(),
        type: this.statementTypes[i],
        html: this.statementInformationHTML[i],
        description: this.statements[i].description,
        lastDate: statement.date[0],
        icon: isHighVal ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
        iconColor: isHighVal ? 'red' : 'blue'
      }
    })        
  }

  get title () {    
    return this.codeTitleMapping[this.$route.params.title]
  }

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  getTypeUpper(str: string) {
    return str.replace(/\b[a-z]/g, char => char.toUpperCase());
  }

  expandsPannel(index: number) {
    this.expands[index] = !this.expands[index]    
    this.expands = [...this.expands]
  }
      
  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('statement') statement!: ISimpleChartData
  @StockStoreModule.State('statementTypes') statementTypes!: string[]
  @StockStoreModule.State('statementLoaded') loaded!: boolean  
  @StockStoreModule.Action('getStockStatement') readonly getStockStatement!: (name: string) => Promise<void>
  
  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: { [title: string]: string }

  async created() {        
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