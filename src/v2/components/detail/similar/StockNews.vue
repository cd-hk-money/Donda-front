<template>
  <v-card 
    class="overflow-auto stock-news"
    height="787"
    width="100%"    
    min-width="465"
    outlined
    elevation="1"    
  >
    <v-card-title> 뉴스 </v-card-title>      
    <v-card-subtitle> 종목 관련 뉴스를 보여줍니다. </v-card-subtitle>

    <v-divider />
    
    <v-card-text v-if="!loaded">
      <v-list two-line>
        <NewsContentsFactory 
          v-for="(news, i) in newses"
          :key="i"
          :news=news 
        />      
      </v-list>      
    </v-card-text> 
  </v-card>
</template>

<script lang="ts">
import { NewsType } from '@/models/stock'
import StoreMixin from '@/mixins/StoreMixin.vue'
import { Component} from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import NewsContentsFactory from './NewsContentsFactory.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    NewsContentsFactory
  }
})
export default class StockNews extends StoreMixin {

  @StockStoreModule.State('newsLoaded') loaded!: boolean
  @StockStoreModule.State('news') newses: NewsType[]
  
}
</script>

<style style="scss">
.stock-news {
  transition: all .3s ease;    
}

.stock-news:hover {
  color: #00BCD4;
}

.stock-news::-webkit-scrollbar-thumb,
.stock-news::-webkit-scrollbar {    
  width: 2px;    
  transition: all 1s;    
  background-clip: padding-box;
}

*::-webkit-scrollbar-thumb {        
  box-shadow: inset 0 0 0 10px;
}

.stock-news::-webkit-scrollbar-thumb {
  height: 30%; /* 스크롤바의 길이 */
  background: rgb(64, 224, 208); /* 스크롤바의 색상 */  
  border-radius: 10px;
}

</style>

