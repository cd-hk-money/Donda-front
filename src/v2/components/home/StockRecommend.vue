<template>    
  <v-card
    class="align-center justify-center overflow-y-auto stock-news"
    width="98%"
    min-height="835"
    max-height="835"    
    elevation="0"
  >
    <v-card-title>
      추천 종목      
      <v-tooltip left>
        <template v-slot:activator="{on, attrs}">
          <v-btn 
            icon absolute right top large class=""
            @click="reload"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>mdi-reload</v-icon>
          </v-btn>      
        </template>
        <span> 추천종목을 새로 로드합니다.</span>
      </v-tooltip>
    </v-card-title>    

    <v-card-subtitle class="d-flex justify-space-between">
      DONDA가 상대적으로 기업가치가 저평가되어있는 종목들을 추천해줍니다.
    </v-card-subtitle>

    <v-divider />

    <v-card-text v-if="!loaded && !recommendStocksLoaded" class="d-flex flex-wrap justify-center">          
      <StockSimilarContent
        v-for="(content, i) in recommendStocks"
        :key="i"
        :content="content"
      />
    </v-card-text>
    <v-card-text v-else>
      <div class="stockinfo-progress-circular">
        <v-progress-circular indeterminate color="#00BCD4" />         
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { mobileHeight } from '@/mixins/tools'
import { IStockModel, StockRecommendModel } from '@/models/stock'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import StockSimilarContent from '@/v2/components/detail/StockSimilarContents.vue'
import StockRecommendContnet from '@/v2/components/home/StockRecommendContent.vue'
import BtnBadge from '../vuetify/BtnBadge.vue'

const MarketStoreModule = namespace('MarketStore')
const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    BtnBadge,
    StockSimilarContent,
    StockRecommendContnet
  }
})
export default class StockRecommend extends Vue {
          
  @MarketStoreModule.State('recommend') recommend!: StockRecommendModel[]
  @MarketStoreModule.State('recommedLoaded') loaded!: boolean
  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: any
  @MarketStoreModule.Getter('recommendArray') recommendArray!: any
  @MarketStoreModule.Action('getRecommend') readonly getRecommend!: () => Promise<any>

  @StockStoreModule.State('recommendStocks') recommendStocks!: IStockModel[]
  @StockStoreModule.State('recommendStocksLoaded') recommendStocksLoaded!: boolean
  @StockStoreModule.Action('getStocks') readonly getStocks!: (codes: string[]) => Promise<any>

    
  get mobile () {    
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }
  
  colorClass (content) {
    const { changes_ratio } = content
    return changes_ratio > 0 ? 'red--text' : 'blue--text'
  }

  async reload () {
    const recommendCodes = (await this.getRecommend()).map(stock => stock.code)
    await this.getStocks(recommendCodes)
  }

  async mounted () {    
    const recommendCodes = (await this.getRecommend()).map(stock => stock.code)
    if(!this.recommendStocks.length) await this.getStocks(recommendCodes)
  }
}
</script>