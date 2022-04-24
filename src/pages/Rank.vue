<template>       
  <v-container id="scroll-target">
    <v-row>      
      <v-col            
        cols="12"
        sm="2"            
      ></v-col>       
                             
      <v-col                      
        cols="12"
        sm="8"
      >       
        <v-row>
          <v-col
            cols="12"
            v-for="(filter, index) in filters"
            :key="index"
            xl="3"            
          >   
            <v-card 
              dark              
              color="grey darken-3"
            > 
              <v-row>
                <v-col cols="12" xl="9">
                  <div class="pl-5 ml-7 text-center text-h6 font-weight-bold">
                    {{ filter.title }}
                  </div>
                </v-col>

                <v-col cols="12" xl="3">
                  <v-btn
                    class="mx-2"
                    right                                                  
                    icon
                    @click="closeRankContent(filter.title)"                    
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>

            <rank-contents  
              :type="filter.title"
              :contents="(contents.find((content) => filter.title === content.title)).content"/>                            
          </v-col>
        </v-row>
      </v-col>        

      <v-col
        cols="12"
        sm="2"
      >        
        <v-row>
          <v-dialog
            v-model="dialog"
            scrollable            
            max-width="720px"
          >
            <template v-slot:activator="{ on, attrs }">              
              <v-btn  
                class="mx-2"
                fab
                outlined
                dark            
                x-large            
                v-bind="attrs"
                v-on="on"
                icon
                color="white"
              >
                <v-icon>mdi-sort</v-icon>
              </v-btn>
            </template>

            <v-card dark>
              <v-card-title class="grey darken-3 font-weight-bold">정렬 옵션</v-card-title>              

              <v-divider></v-divider>

              <v-card-text style="height: 300px;">
                <v-combobox
                  v-model="filtersTemp"
                  :items="filtersItems"
                  multiple
                  chips
                ></v-combobox>              
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn                  
                  text
                  @click="dialog = false"
                >
                  닫기
                </v-btn>
                <v-btn                  
                  text
                  @click="dialogSave"
                >
                  저장
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>              

        <transition name="fade">
          <v-btn   
            dark
            class="cyan"
            v-if="btnShow"
            bottom
            fixed
            fab
            @click="toTop"
            rounded>
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
        </transition>
      </v-col>  
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import * as _ from 'lodash'

// model
import { StockSimpleModel } from '@/models/stock'

// components
import SideBar from '@/layout/SideBar.vue'
import TransList from '@/layout/TransList.vue'
import RankContents from '@/components/rank/RankContents.vue'

const StockStoreModule = namespace('StockStore')

const DEFAULT_COUNT = 11

@Component({
  components: {
    SideBar,
    TransList,
    RankContents
  }
})
export default class Rank extends Vue {

  private btnShow = false

  private dialogm1 = ''
  private dialog = false

  private contents: {
    title: string
    content: Array<any>
  }[] = []

  private filtersItems = [
    '시가총액',
    '변동률',
    '거래대금',    
    '종가'
  ]

  private filters = [
    {
      title: '시가총액',
      filter: 'stock'
    },
    {
      title: '변동률',
      filter: 'stock'
    },
    {
      title: '거래대금',
      filter: 'stock'
    },
    {
      title: '종가',
      filter: 'stock'
    }
  ]

  private filtersTemp = [
    '시가총액',
    '변동률',
    '거래대금',
    '종가'
  ]
  
  @StockStoreModule.Getter('getStocks')
  private getStocks!: Array<StockSimpleModel>

  private toTop() {
    this.$vuetify.goTo('#scroll-target')
    this.btnShow = false
  }

  private handleScroll () {
    let scrollTop = window.pageYOffset 
    this.btnShow = scrollTop > 1500 ? true : false
  }

  private dialogSave () {
    this.dialog = false
    this.filters = this.filtersTemp.map((title: any) => {
      return {
        title: title,
        filter: 'stock'
      }
    })    
  }

  private loadRank (count: number) {
    const content = this.getStocks.slice(0, count) 
    this.contents = [
      {
        title: '시가총액',
        content: _.sortBy(content, 'stock')
      },
      {
        title: '변동률',
        content: _.sortBy(content, 'stock')
      },
      {
        title: '거래대금',
        content: _.sortBy(content, 'stock')
      },
      {
        title: '종가',
        content: _.sortBy(content, 'title')
      }      
    ]
  }

  private closeRankContent(targetTitle: string) {
    this.filters = this.filters.filter((obj: {title: string, filter: string}) => obj.title !== targetTitle )
  }
  
  created () {
    // created 할때 미리 모든 차트 데이터셋 저장.
    this.loadRank(DEFAULT_COUNT)
  }

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.main-content {
  margin-top: 30px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>