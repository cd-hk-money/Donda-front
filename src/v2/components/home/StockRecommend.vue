<template>    
  <div>
    <v-card
      class="ml-5 mr-5 align-center justify-center overflow-y-auto"
      :width="mobile ? 460 : 1150"
      height="890"
      elevation="0"
      outlined
    >
      <v-card-title             
        class="text-h4 font-weight-bold ml-5">
        추천 종목
          <v-btn
            icon      
            large
            @click="overlay = !overlay"
          >
            <v-icon>fa-solid fa-circle-info</v-icon>
          </v-btn>
      </v-card-title>    

      <v-card-subtitle class="ml-5 d-flex justify-space-between">
        <span>추천 종목을 확인 해 보세요.</span>      
        <span>갱신일 : 2022-07-27 </span>      
      </v-card-subtitle>

      <v-divider></v-divider>

      <v-card-text v-if="!loaded">
        <div
          v-for="(content, i) in recommend"
          :key="i"
        >
          <stock-similar-content
            :content="content" 
            :name="content.name"
            :code="content.code"
          />
        </div>
      </v-card-text>
    </v-card>

  </div>
  
</template>

<script lang="ts">
import { mobileHeight } from '@/mixins/tools'
import { StockRecommendModel } from '@/models/stock'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import StockSimilarContent from '@/v2/components/detail/StockSimilarContents.vue'

const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    StockSimilarContent
  }
})
export default class StockRecommend extends Vue {

  sparkLineValue = [1, 11, 3, 4, 5, 7, 5, 9, 1, 5, 16]
  model = null
  overlay = false

  @MarketStoreModule.State('recommend') recommend!: StockRecommendModel[]
  @MarketStoreModule.State('recommedLoaded') loaded!: boolean
  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: any
  @MarketStoreModule.Action('getRecommend') readonly getRecommend!: () => Promise<void>
  @MarketStoreModule.Getter('recommendArray') recommendArray!: any

  colorClass (content) {
    const { changes_ratio } = content
    return changes_ratio > 0 ? 'red--text' : 'blue--text'
  }

  get mobile () {    
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }  
    
  created () {    
    this.getRecommend()
  }
}
</script>