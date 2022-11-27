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
    
    <v-card-text v-if="!newes.loading">
      <v-list two-line>
        <NewsContentsFactory 
          v-for="(news, i) in newes.data"
          :key="i"
          :news=news 
        />      
      </v-list>      
    </v-card-text> 
  </v-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import NewsContentsFactory from './NewsContentsFactory.vue'
import StockStoreMixin from '@/mixins/StockStoreMixin.vue'


@Component({
  components: {
    NewsContentsFactory
  }
})
export default class StockNews extends StockStoreMixin {}
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

