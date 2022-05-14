<template>
  <v-card 
    class="mt-5 ml-5"
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
    
    <v-card-text>
      <v-list two-line>
        <v-list-item 
          link
          v-for="(news, i) in newsAll"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ news }}
            </v-list-item-title>
            <v-list-item-subtitle>
              뉴스사
            </v-list-item-subtitle>
            <v-divider></v-divider>
          </v-list-item-content>          
        </v-list-item>
      </v-list>
    </v-card-text> 
  </v-card>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

const NEWS_COUNT = 10

@Component
export default class StockNews extends Vue {
  newsAll = [...new Array(NEWS_COUNT)].map((_, i) => `뉴스${i}`)
}
</script>