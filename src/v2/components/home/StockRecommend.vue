<template>    
  <v-card
    class="align-center justify-center overflow-y-auto stock-news"
    width="98%"
    min-height="835"
    max-height="835"    
    elevation="0"
    rounded="xl"
  >
    <v-card-title>
      추천 종목
      <BtnBadge>
        추천 종목 기준..
      </BtnBadge>        
    </v-card-title>    

    <v-card-subtitle class="d-flex justify-space-between">
      추천 종목을 확인 해 보세요.
    </v-card-subtitle>

    <v-divider />

    <v-card-text v-if="!loaded && !stocksLoaded" class="d-flex flex-wrap justify-center">          
      <stock-similar-content
        v-for="(content, i) in recommend"
        :key="i"
        :content="content"
        :test="recommendStocks[i]"
      />
    </v-card-text>
    <v-card-text v-else>
      <div class="stockinfo-progress-circular">
        <v-progress-circular indeterminate color="#40E0D0" />         
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
  
  model = null
  overlay = false
  stockEtcs: IStockModel[] | null = null
  recommendStocks = []
  stocksLoaded = false

  @MarketStoreModule.State('recommend') recommend!: StockRecommendModel[]
  @MarketStoreModule.State('recommedLoaded') loaded!: boolean
  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: any
  @MarketStoreModule.Getter('recommendArray') recommendArray!: any
  @MarketStoreModule.Action('getRecommend') readonly getRecommend!: () => Promise<any>

  @StockStoreModule.Action('getStocks') readonly getStocks!: (codes: string[]) => Promise<any>

  colorClass (content) {
    const { changes_ratio } = content
    return changes_ratio > 0 ? 'red--text' : 'blue--text'
  }

  get mobile () {    
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }

  
  async created () {    
    this.stocksLoaded = true
    const recommendCodes = (await this.getRecommend()).map(stock => stock.code)    
    this.recommendStocks = (await this.getStocks(recommendCodes)).map(res => res.data)    
    this.stocksLoaded = false

  }
}
</script>