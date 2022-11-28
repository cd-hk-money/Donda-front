<template>
  <v-card 
    min-height="290"
    @click="$emit('drawerChange', 2)"    
    class="mt-3"
  >     
    <v-card-title>
      보조 지표       
      <BtnBadge>
        <div><strong class="text-h6 cyan--text font-weight-bold">보조지표</strong></div>
        기업의 재무제표를 기반으로 계산된 시장 예측을 가능하게 하는 지표들입니다. <br />
        <v-divider class="mt-2 mb-2"/>
        <div class="d-flex align-center">
          <v-icon small>fa-solid fa-circle-question</v-icon>
          <span class="mt-1 ml-2 mb-2 cyan--text">왜 EPS, ROE, BPS 3개를 대표적으로 보여주나요?</span>
        </div>
        EPS, ROE, BPS는 크면 클수록 투자가치가 높다고 판단됩니다. 업종 평균과의 그래프 면적 비교를 통해
        해당 종목의 투자 가치를 대략적으로 파악 할 수 있습니다.
        <div>
          자세한 내용은 보조지표 탭을 참조하세요.
        </div>        
      </BtnBadge>      
    </v-card-title>

    <v-card-subtitle>
      EPS, ROE, BPS 지수를 업종 평균과 비교하여 보여줍니다.
    </v-card-subtitle>

    <v-card-text>
      <div 
        v-if="!indicator.loading 
          && indicator.data
          && !indicatorSector.loading 
          && indicatorSector.data
          && !indicatorSectorDaily.loading
          && indicatorSectorDaily.data
        "        
        class="d-flex justify-center align-center ml-3"
      >
        <StockIndicatorChart
          :chartData="indicatorChartData"
          :sector="indicatorSectorChartData"
          :height="180"      
        />         
      </div>      
      <div class="text-center stockinfo-progress-circular" v-else>
        <v-progress-circular indeterminate color="#00BCD4" />            
      </div>
    </v-card-text>
    

  </v-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import StockIndicatorChart from '@/v2/components/detail/indicator/StockIndicatorChart.vue'

import BtnBadge from '../../vuetify/BtnBadge.vue'
import StockStoreMixin from '@/mixins/StockStoreMixin.vue'

@Component({
  components: {
    StockIndicatorChart,
    BtnBadge
  }
})
export default class StockIndicator extends StockStoreMixin {


  overlay = false

  get width () {
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : 465
  }

  get indicatorScore () {    
    return this.indicatorSector.data
  }

  get indicatorChartData () {
    return {
      eps: this.indicator.data.eps?.value[0],
      bps: this.indicator.data.bps?.value[0],
      roe: this.indicator.data.roe?.value[0]
    }
  }

  get indicatorSectorChartData () {
    return {
      eps: this.indicatorSector.data?.sector_eps[3],                                
      bps: this.indicatorSector.data?.sector_bps[3],
      roe: this.indicatorSector.data?.sector_roe[3],      
    }
  }
    
  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  // methods
  drawerChange () {
    this.$emit('drawerChange', 4)
  }

}
</script> 
