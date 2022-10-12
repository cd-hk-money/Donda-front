<template>
  <v-card 
    class="overflow-y-auto stock-similar"    
    height="787"
    :width="width"    
    min-width="465"
    outlined
  >  
    <v-card-title>
      유사 종목
      <v-btn  
        class="ml-3"
        icon
        right
        x-small
        @click="overlay = true"
      ><v-icon>fa-solid fa-circle-question</v-icon>
      </v-btn>
    </v-card-title>      
    <v-card-subtitle>
      유사 종목을 보여줍니다.
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text v-if="!loaded" class="d-flex flex-wrap justify-center">
      <stock-similar-content 
        v-for="(content, i) in similarContents"
        :key="i"
        :content="content"
      />
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

const MarketStoreModule = namespace('MarketStore')
const StockStoreModule = namespace('StockStore')

import StockSimilarContent from '@/v2/components/detail/StockSimilarContents.vue'
import { IStockModel, StockRecommendModel } from '@/models/stock'

@Component({
  components: {
    StockSimilarContent
  }
})
export default class StockSimilar extends Vue {
  overlay = false

  @MarketStoreModule.State('recommend') recommend!: StockRecommendModel[]
  @MarketStoreModule.State('recommedLoaded') loaded!: boolean
  @MarketStoreModule.Action('getRecommend') readonly getRecommend!: () => Promise<void>

  @StockStoreModule.State('similarContents') similarContents!: IStockModel[]
  @StockStoreModule.Action('getSimilarContents') readonly getSimilarContent!: (code: string) => Promise<void>

  get width (): string | number { 
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : '60%'
  }

  async created () {
    const code = this.$route.params.title
    await this.getRecommend()
    await this.getSimilarContent(code)    
    console.log(this.similarContents)
  }

}
</script>
<style>

.stock-similar {
  transition: all .3s ease;  
}

.stock-similar:hover {
  color: rgba(64, 224, 208, 1);
}

.stock-similar::-webkit-scrollbar-thumb,
.stock-similar::-webkit-scrollbar {    
  width: 2px;    
  transition: all 1s;    
  background-clip: padding-box;
}

*::-webkit-scrollbar-thumb {        
  box-shadow: inset 0 0 0 10px;
}

.stock-similar::-webkit-scrollbar-thumb {
  height: 30%; /* 스크롤바의 길이 */
  background: rgb(64, 224, 208); /* 스크롤바의 색상 */  
  border-radius: 10px;
}

</style>