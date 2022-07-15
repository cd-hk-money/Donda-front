<template>
  <v-card 
    class="mt-5 ml-5 overflow-y-auto"
    height="885"
    width="94%"
    rounded="xl"
    elevation="1"
    
  >
    <v-card-title class="ml-5">
      NEWS
    </v-card-title>      
    <v-card-subtitle class="ml-5">
       종목 관련 뉴스를 보여줍니다.
    </v-card-subtitle>
    
    <v-card-text v-if="!loaded">
      <v-list two-line>
        <v-list-item 
          class="mb-3 news-list-item"
          link          
          v-for="(news, i) in newses"
          :key="i"
          @click="onClickRedirect(news.url)"
        >
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"> {{ news.subject }} </v-list-item-title>
            <v-divider></v-divider>
            
            <v-list-item-subtitle>
            </v-list-item-subtitle>            
            <v-list-tile-content class="news-card-content"> {{ news.summary.split('|')[0].split('...')[0] + '...' }} </v-list-tile-content> 
            <v-list-tile-action class="news-card-action"> {{ news.summary.split('|')[1].slice(0, 11) }} | {{ news.summary.split('|')[0].split('...')[1] }}</v-list-tile-action>
          </v-list-item-content>          
        </v-list-item>
      </v-list>
      <v-list>      
      </v-list>
    </v-card-text> 
  </v-card>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const NEWS_COUNT = 12

const StockStoreModule = namespace('StockStore')

@Component
export default class StockNews extends Vue {

  newsAll = [...new Array(NEWS_COUNT)].map((_, i) => `뉴스 ${i}`)

  @StockStoreModule.State('newsLoaded')
  loaded!: boolean

  @StockStoreModule.Action('getStockNews')
  getStockNews!: (name: string ) => Promise<void>

  @StockStoreModule.State('news')
  newses: any[]

  async mounted() {    
    await this.getStockNews(this.$route.params.title)
  }
  
  onClickRedirect (url: string) {
    window.open(url, '_blank')
  }
}
</script>

<style>
.news-card-action {
  position: absolute;
  right: 0px;
  bottom: 3px;
  opacity: .7; 
}

.news-card-content {
 opacity: .8; 
}

.news-list-item {
  height: 100px !important;
}
</style>

