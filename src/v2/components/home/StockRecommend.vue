<template>    
  <v-card
    class="align-center justify-center overflow-y-auto stock-news"
    :width="isMobile ? 550 : '70vw'"
    height="835"
    elevation="0"
  >
    <v-card-title>
      추천 종목      
      <v-tooltip left>
        <template v-slot:activator="{on, attrs}">
          <v-btn 
            icon 
            absolute 
            right 
            top 
            large
            v-on="on"
            v-bind="attrs"
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

    <v-divider />

    <v-card-text v-if="!recommendStocksLoaded" class="d-flex flex-wrap justify-space-around">          
      <StockSimilarContent
        v-for="(content, i) in recommendStocks"
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
import { IStockModel } from '@/models/stock'
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { getStocks, getStockRecommend } from '@/store/payload'

import StockSimilarContent from '@/v2/components/detail/similar/StockSimilarContents.vue'
import StockRecommendContnet from '@/v2/components/home/StockRecommendContent.vue'
import ProgressCircularVue from '../vuetify/ProgressCircular.vue'

import StoreMixin from '@/mixins/StoreMixin.vue'
import DiviceMixin from '@/mixins/DiviceMixin.vue'

const StockStoreModule = namespace('StockStore')

@Component({  
  components: {
    StockSimilarContent,
    StockRecommendContnet,
    ProgressCircularVue
  }
})
export default class StockRecommend extends mixins(DiviceMixin, StoreMixin) {
                
  @StockStoreModule.State('recommendStockCodes') recommendStockCodes!: string[] 
  @StockStoreModule.State('recommendStocks') recommendStocks!: IStockModel[]
  @StockStoreModule.State('recommendStocksLoaded') recommendStocksLoaded!: boolean  

  reload () {    
    this.callRequest(getStocks(this.recommendStockCodes))
  }

  async mounted () {    
    await this.callRequest(getStockRecommend())
    
    if(this.recommendStocks.length === 0) {
      this.callRequest(getStocks(this.recommendStockCodes))        
    }
  }
}
</script>