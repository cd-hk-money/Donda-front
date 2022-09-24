<template>
  <v-card 
    class="overflow-auto stock-news"
    height="840"
    width="100%"    
    outlined
    elevation="1"    
  >
    <v-card-title class="ml-5">
      NEWS
    </v-card-title>      
    <v-card-subtitle class="ml-5">
       종목 관련 뉴스를 보여줍니다.
    </v-card-subtitle>

    <v-divider></v-divider>
    
    <v-card-text v-if="!loaded">
      <v-list two-line>
        <v-list-item 
          class="mb-10 news-list-item"
          link          
          v-for="(news, i) in newses"
          :key="i"
          @click="onClickRedirect(news.url)"
        >
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"> {{ news.subject }} </v-list-item-title>
            <v-divider></v-divider>
                        
            <v-list-item-content class="news-card-content">               
              {{ news.summary.split('|')[0].split('...')[0] + '...' }} 
            </v-list-item-content> 
            <v-list-item-action class="news-card-action mt-10 mr-3">               
              {{ news.summary.split('|')[1].slice(0, 11) }} /
              {{ news.summary.split('|')[1].slice(11, 16) }} / 
              {{ news.summary.split('|')[0].split('...').at(-1) }}
            </v-list-item-action>
          </v-list-item-content>          
        </v-list-item>
      </v-list>
      <v-list>      
      </v-list>
    </v-card-text> 
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component
export default class StockNews extends Vue {

  @StockStoreModule.State('newsLoaded') loaded!: boolean
  @StockStoreModule.State('news') newses: any[]
  @StockStoreModule.Action('getStockNews') getStockNews!: (name: string ) => Promise<void>

  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: any

  @Watch('$route')
  watchRoute() {            
    this.getNews()
  }  

  mounted() {    
    this.getNews()
  }

  getNews () {  
    this.getStockNews(this.$route.params.title)
  }
    
  onClickRedirect (url: string) {
    window.open(url, '_blank')
  }
}
</script>

<style style="scss">
.stock-news {
  transition: all .3s ease;  
}

.stock-news:hover {
  color: rgba(64, 224, 208, 1);
}

.stock-news::-webkit-scrollbar-thumb,
.stock-news::-webkit-scrollbar {    
  width: 4px;    
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

.news-card-action {
  position: absolute;
  right: 5px;
  bottom: -10px;
  font-size: 13px;
  opacity: .7; 
}

.news-card-content {
 opacity: 1; 
}

.news-list-item {
  height: 120px !important;    
}
</style>

