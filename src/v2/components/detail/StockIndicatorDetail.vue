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


    <v-sheet 
      class="stock-indicator-detail-content" 
      @click="expandEps = !expandEps"      
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        EPS
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>E</strong>arnings <strong>P</strong>er <strong>S</strong>hare |  주당 순이익
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>당기 순이익</strong><btn-badge/>
        을 <strong>유통 주식수</strong><btn-badge/>로 나눈 값을 의미합니다.
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandEps">
          <stock-indicator-bar-chart 
            type="EPS"
            :chartData="indicators.eps"   
            :sector="indicatorSector.sector_eps"
            :height="100"      
          />
        </v-card>
      </v-expand-transition>

    </v-sheet>    


    <v-divider></v-divider>


    <v-sheet 
      class="stock-indicator-detail-content"
      @click="expandBps = !expandBps" 
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        BPS
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>B</strong>ookvalue <strong>P</strong>er <strong>S</strong>hare | 주당 순자산가치
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>순자산</strong><btn-badge/>
        을 <strong>발행 주식수</strong><btn-badge/>로 나눈 값을 의미합니다.
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandBps">
          <stock-indicator-bar-chart 
            type="BPS"
            :chartData="indicators.bps"   
            :sector="indicatorSector.sector_bps"
            :height="100"      
          />
        </v-card>
      </v-expand-transition>

    </v-sheet>    


    <v-divider></v-divider>


    <v-sheet 
      class="stock-indicator-detail-content"
      @click="expandRoe = !expandRoe"
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        ROE
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>R</strong>eturn <strong>O</strong>n <strong>E</strong>quity, ROE | 자기자본이익률
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>당기순이익</strong><btn-badge/>
        을 <strong>평균 자기자본</strong><btn-badge/>으로 나눈 수치 백분율 값을 의미합니다.
      </v-card-text>

      <v-expand-transition>
        <v-card v-if="expandRoe">
          <stock-indicator-bar-chart 
            type="ROE"
            :chartData="indicators.roe"   
            :sector="indicatorSector.sector_roe"
            :height="100"      
          />
        </v-card>
      </v-expand-transition>      
    </v-sheet>    


    <v-divider></v-divider>


    <v-sheet 
      class="stock-indicator-detail-content"
      @click="expandPsr = !expandPsr"
    >
      <v-card-title class="text-h4 stock-indicator-detail-content-title">
        PSR
      </v-card-title>

      <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
        <strong>P</strong>rice <strong>S</strong>elling <strong>R</strong>atio, PSR | 주가매출액비율
      </v-card-subtitle>

      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>현재 주가</strong><btn-badge/>
        를 <strong>1주당 매출액</strong><btn-badge/>으로 나눈 값을 의미합니다.
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


    <!-- 주당순이익(EPS)과 주당순자산(BPS)이 동시에 늘어나는 종목에 투자하는 것이 가장 높은 수익률을 거두는 것으로 -->

  </v-card>
</template>

<script lang="ts">
import { ISimpleChartData, IStockIndicatorSectorDailyModel, IStockIndicatorSectorModel } from '@/models/stock';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
import StockIndicatorBarChart from '@/v2/components/detail/StockIndicatorBarChart.vue'
import BtnBadge from '@/v2/components/vuetify/BtnBadge.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    BtnBadge,
    StockIndicatorBarChart
  }
})
export default class StockIndicatorDetail extends Vue {

  @StockStoreModule.State('indicator') indicators!: ISimpleChartData  
  @StockStoreModule.State('indicatorSector') indicatorSector!: IStockIndicatorSectorModel
  @StockStoreModule.State('indicatorSectorDaily') indicatorSectorDaily!: IStockIndicatorSectorDailyModel  
  @StockStoreModule.State('indicatorLoaded') indicatorLoaded!: boolean
  @StockStoreModule.State('indicatorSectorLoaded') indicatorSectorLoaded!: boolean

  expandEps = false
  expandBps = false
  expandRoe = false  
  expandPsr = false
 
  get isMobile() {
    return this.$vuetify.breakpoint.name === 'xs'
  }
  
  get getStrongFontColorClass () {
    return this.$vuetify.theme.dark ? 'strong-white' : 'strong-black'
  }

  get sector_eps () {
    return {
      date: this.indicatorSector.date,
      value: this.indicatorSector.sector_eps
    }
  }

  get bps () {
    return {
      date: this.indicatorSector.date,
      value: this.indicatorSector.sector_eps
    }
  }

  get roe () {
    return {
      date: this.indicatorSector.date,
      value: this.indicatorSector.sector_eps
    }
  }

  created () {
    const dates = console.log(Object.keys(this.indicatorSectorDaily))
    const values = console.log(Object.values(this.indicatorSectorDaily))

    console.log(dates, values)
  }
}
</script>

<style scoped>
strong {  
  letter-spacing: .5px;
}

.strong-white strong {
  color: white;
}

.strong-black strong {
  color: black;
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
</style>