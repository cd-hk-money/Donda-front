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
      <BtnBadge>
        <div><strong class="text-h6 cyan--text font-weight-bold">유사종목</strong></div>
        <span class="font-weight-bold cyan--text">{{ stock.data.sector }} </span> 에 속하는 기업들에서
        <span class="font-weight-bold cyan--text">{{ stock.data.name }}</span> 과 유사한 기업을 추천해줍니다.        
      </BtnBadge>
    </v-card-title>      
    <v-card-subtitle>
      유사 종목을 보여줍니다.
    </v-card-subtitle>

    <v-divider />
    
    <v-card-text v-if="!similarContents.loading" class="d-flex flex-wrap justify-center">
      <StockSimiarContent 
        v-for="(content, i) in similarContents.data"
        :key="i"
        :content="content"        
      />
    </v-card-text>
    
    <v-overlay 
      :value="overlay"      
      opacity="0.88"
      absolute
      height="300"
    >
      <div>
        유사 종목 기준에 대한 설명..
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
import { Component} from 'vue-property-decorator'

import BtnBadge from '../../vuetify/BtnBadge.vue'
import StockSimiarContent from '@/v2/components/detail/similar/StockSimiarContent.vue'
import StockStoreMixin from '@/mixins/StockStoreMixin.vue'

@Component({
  components: {
    BtnBadge,
    StockSimiarContent
  }
})
export default class StockSimilar extends StockStoreMixin {
  overlay = false
  

  get width (): string | number { 
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : '60%'
  }

}
</script>
<style>

.stock-similar {
  transition: all .3s ease;  
}

.stock-similar:hover {
  color: #00BCD4;
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