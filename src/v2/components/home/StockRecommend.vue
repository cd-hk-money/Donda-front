<template>    
  <v-card
    class="align-center justify-center overflow-y-auto stock-news"
    :width="isMobile ? 550 : '68vw'"    
    height="835"
    elevation="0"
  >
    <v-card-title>
      추천 종목      
      <v-tooltip left>        
        <template v-slot:activator="{on}">
          {{on}}
          <v-btn 
            icon 
            absolute 
            right 
            top 
            large
            v-on="on"
            @click="reload"
          >
            <v-icon>mdi-reload</v-icon>                        
          </v-btn>      
        </template>
        <span> 추천종목을 새로 로드합니다.</span>
      </v-tooltip>
    </v-card-title>    

    <v-card-subtitle>
      DONDA가 상대적으로 기업가치가 저평가되어있는 종목들을 추천해줍니다.
    </v-card-subtitle>


    <v-card-text v-if="!recommendStocks.loading" class="d-flex flex-wrap justify-space-between">          
      <StockRecommendContnet
        v-for="(content, i) in recommendStocks.data"
        :key="i"
        :content="content"
      />
    </v-card-text>
    <v-card-text v-else>
      <ProgressCircularVue />
    </v-card-text>
    
  </v-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { getStocks, getStockRecommend } from '@/store/payload'

import StockRecommendContnet from '@/v2/components/home/StockRecommendContent.vue'
import ProgressCircularVue from '../vuetify/ProgressCircular.vue'

import StoreMixin from '@/mixins/StoreMixin.vue'
import DiviceMixin from '@/mixins/DiviceMixin.vue'
import StockStoreMixin from '@/mixins/StockStoreMixin.vue'
import BtnTooltip from '@/v2/components/vuetify/BtnTooltip.vue'

@Component({  
  components: {
    StockRecommendContnet,
    ProgressCircularVue,
    BtnTooltip
  }
})
export default class StockRecommend extends mixins(DiviceMixin, StoreMixin, StockStoreMixin) {
                  
  reload () {    
    this.callRequest(getStocks(this.recommendStockCodes.data))
  }

  async mounted () {    
    await this.callRequest(getStockRecommend())
    
    if(!this.recommendStocks.data) {
      this.callRequest(getStocks(this.recommendStockCodes.data))        
    }

    console.log(this)
  }
}
</script>
