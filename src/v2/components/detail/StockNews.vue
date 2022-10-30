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
import { Component, Vue, Watch} from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import NewsContentsFactory from './factories/NewsContentsFactory.vue'

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    NewsContentsFactory
  }
})
export default class StockNews extends Vue {

  @StockStoreModule.State('newsLoaded') loaded!: boolean
  @StockStoreModule.State('news') newses: any
  @StockStoreModule.Action('getStockNews') getStockNews!: (name: string ) => Promise<void>

  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: { [title: string]: string }

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

