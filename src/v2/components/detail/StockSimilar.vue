<template>
  <v-card 
    class="mt-5 ml-5 mr-5"
    height="885"
    width="94%"
    rounded="xl"
    elevation="1"
  >  
    <v-card-title class="ml-5">
      Similar
      <v-btn  
        class="ml-3"
        icon
        right
        x-small
        @click="overlay = true"
      ><v-icon>fa-solid fa-circle-question</v-icon>
      </v-btn>
    </v-card-title>      
    <v-card-subtitle class="ml-5">
      유사 종목을 보여줍니다.
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text v-if="!loaded">
      <div 
        v-for="(content, i) in recommend.slice(0, 3)"
        :key="i"
      >
        <stock-similar-content 
          :title="content.name"
          :code="content.code"
        />
      </div>
              
    </v-card-text>
    <v-divider></v-divider>
    <v-overlay 
      :value="overlay"      
      opacity="0.88"
      absolute
      height="300"
    >
      <div>
        추천 종목 기준에 대한 설명..
      </div>
      <div class="d-flex justify-center">
        <v-btn
          bottom
          @click="overlay = false"
        >
          닫기
        </v-btn>         
      </div>
    </v-overlay>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

const MarketStoreModule = namespace('MarketStore')

import StockSimilarContent from '@/v2/components/detail/StockSimilarContents.vue'
import { StockRecommendModel } from '@/models/stock'

@Component({
  components: {
    StockSimilarContent
  }
})
export default class StockSimilar extends Vue {
  overlay = false

  @MarketStoreModule.State('recommend')
  recommend!: StockRecommendModel[]

  @MarketStoreModule.State('recommedLoaded')
  loaded!: boolean

  @MarketStoreModule.Action('getRecommend')
  readonly getRecommend!: () => Promise<void>

  created () {
    this.getRecommend().then(() => {
      console.log(this.recommend)
    })
  }
  
  
}
</script>