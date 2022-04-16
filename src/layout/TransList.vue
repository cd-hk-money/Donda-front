<template>
  <v-card dark>  
    <v-list                   
      two-line>
      <v-list-item-group>    
        <v-list-item class="ranking-content cyan darken-2">          
          <v-list-item-action>         
            <v-row justify="center">
              <v-btn 
                @click="doFilter('title')"
                icon>
                <v-icon>mdi-sort</v-icon>
              </v-btn>
            </v-row>
          </v-list-item-action>          
            <v-list-item-content>
              <v-list-item-title class="text-h6 font-weight-bold">
                종목명              
              </v-list-item-title>              
              <v-list-item-subtitle>
                코드
              </v-list-item-subtitle>
            </v-list-item-content>          
            <v-col 
              cols="12" sm="2"
              :key="filter.title"
              v-for="filter in filters"
            >
              <span class="text-h6 font-weight-bold">{{ filter.title }}</span>
              <v-btn 
                @click="doFilter(filter.sort)"
                icon>
                  <v-icon>mdi-sort</v-icon>
              </v-btn>
            </v-col>
        </v-list-item>  

        <template v-for="(item, index) in items">       
          <v-list-item              
            class="ranking-content"            
            :key="item.code"    
            :to="`/detail/${item.code}`"
            replace         
          >
            <v-list-item-action>         
              <v-icon color="grey lighten-1">
                mdi-star-outline
              </v-icon>
            </v-list-item-action>          
            <v-list-item-content>                
              <v-list-item-title 
                class="text-h5"
                v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle                  
                v-text="item.code"
              ></v-list-item-subtitle>                              
            </v-list-item-content>                   
            <v-col cols="12" sm="2">
              <p class="text-h5">₩ {{ item.stock.toLocaleString() }} </p> <p></p>
            </v-col>
            <v-col cols="12" sm="2">
              <p>시가총액 ...</p>
            </v-col>
            <v-col cols="12" sm="2">
              <p>변동률 ...</p>
            </v-col>
            <v-col cols="12" sm="2">
              <p>변동률 ...</p>
            </v-col>
          </v-list-item>
          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>        
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <v-container
      fluid
      class="text-center"
    >
      <v-btn @click="moreTran">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>      
    </v-container>            
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { StockSimpleModel } from '@/models/stock'

import * as _ from 'lodash'

const StockStoreModule = namespace('StockStore')

@Component
export default class TransList extends Vue {

  @StockStoreModule.Mutation('setCode')
  private setCode!:(code: string) => void

  @StockStoreModule.Mutation('setTitle')
  private setTitle!:(code: string) => void

  @StockStoreModule.Getter('getStocks')
  private getStocks!: Array<StockSimpleModel>
  
  @StockStoreModule.Action('searchContents')
  private readonly searchContents!:(code: string) => Promise<any>

  private dialog = false
  private count = 5
  private items: Array<StockSimpleModel> = []
  private scroll = 0
  private filters = [    
    {
      title: '전일종가',
      sort: 'stock'
    },
    {
      title: '시가총액',
      sort: 'marcap'
    },
    {
      title: '변동률',
      sort: 'trans'
    },
    {
      title: '거래대금',
      sort: 'charge'
    }
  ]
  private filter = ''
  
  private moreTran(): void {
    this.items = this.getStocks.slice(0, this.count += 10)        
    this.$nextTick(() => {
      if (this.filter !== ''){
        this.doFilter('title')
      } 
      window.scrollTo(0, document.body.scrollHeight)
    })    
  }    

  private doFilter(filter: string) {         
     if (this.filter === filter && filter!== ''){
      this.items.reverse()
     }else {
      this.items = _.sortBy(this.items, filter)
      this.filter = filter
     }
  }
  
  created() {
    this.items = this.getStocks.slice(0, this.count += 5)    
  }  
}
</script>

<style scoped>
.ranking-content {
  height: 73px;
}
</style>