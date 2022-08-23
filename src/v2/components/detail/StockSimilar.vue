<template>
  <v-card 
    class="mt-5 ml-5 mr-5 overflow-y-auto stock-similar"
    height="885"    
    :width="width"
    outlined
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

  @MarketStoreModule.State('recommend') recommend!: StockRecommendModel[]
  @MarketStoreModule.State('recommedLoaded') loaded!: boolean
  @MarketStoreModule.Action('getRecommend') readonly getRecommend!: () => Promise<void>

  get width (): string | number { 
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : '94%'
  }

  async created () {
    await this.getRecommend()    
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
  width: 4px;    
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