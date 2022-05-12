<template>
  <v-card 
    :class="['ml-5', mobile ? 'mt-15' : 'mt-5']"    
    :height="mobile ? 410 : 240"
    width="95%"
    rounded="xl"
    v-if="!loaded"    
  >    
    <v-list-item three-line>

      <v-list-item-content>
        <div class="mb-4">
          {{ stock.market }} 
        </div>
        <v-list-item-title class="text-h4 font-weight-bold m-1 ml-5">
          <span>{{ stock.name }}</span>                        
          <v-tooltip right>
            <template v-slot:activator="{on}">
              <v-icon v-on="on" size="30" class="ml-5" color="red">fa-solid fa-arrow-trend-up</v-icon>
            </template>
            <span class="red--text font-weight-bold">상승</span> 
            <span> 추세입니다.</span>
          </v-tooltip>
        </v-list-item-title>
        <v-list-item-subtitle class="text-h5 mb-1 ml-6">
          {{ stock.code }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar>                  
        <v-dialog
          v-model="dialog"
          width="auto"
          height="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon x-large
              v-on="on"
              @click="bookmarked ? removeBookmarking : null"
              v-bind="attrs"
            >
              <v-icon size="40">{{ bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5">
              관심 종목 추가
            </v-card-title>

            <v-card-text>
              어느 그룹에 추가하시겠습니까?
            </v-card-text>

            <v-divider></v-divider>
          
            <v-list>                  
              <v-list-item 
                :key="group.title"
                v-for="group in interestGroups"
                @click="activeBookmarking(group, stock)"
              >
                <v-list-item-content>
                  <v-list-item-title class="ml-2">
                    {{ group.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                확인
              </v-btn>
            </v-card-actions>              
          </v-card>
        </v-dialog>
      </v-list-item-avatar>              

    </v-list-item>

    <v-card 
      rounded="xl"
      elevation="0"
      @click="expand++"
    >        
      <v-divider></v-divider>    
      <v-carousel
        v-model="expand"
        height="auto"
        hide-delimiter-background
        hide-delimiters
        :show-arrows="false"
      >
        <v-carousel-item>
          <v-row>
            <v-col cols="12" xl="5" lg="5">
              <v-card-title class="text-h5 font-weight-bold ml-5">
                <span>{{ stock.close.toLocaleString()}} ₩</span>
                <v-btn  
                  class="ml-3"
                  icon
                  right
                  x-small
                ><v-icon>fa-solid fa-circle-info</v-icon>
                </v-btn>
              </v-card-title>

              <v-card-subtitle :class="['text-h6', 'font-weight-bold', 'ml-5', stock.changes > 0 ? 'red--text' : 'blue--text']">
                <span>{{ stock.changes > 0 ? '+' + stock.changes : stock.changes }} ({{ stock.changes_ratio > 0 ? '+' + stock.changes_ratio : stock.changes_ratio}}%)</span>                        
              </v-card-subtitle>                            
            </v-col>
            <v-col cols="12" xl="7" lg="7">
              <v-tooltip bottom>
                <template v-slot:activator="{on} ">
                  <v-sheet 
                    class="mt-3 mr-5"
                    width="auto"
                    max-height="100%"          
                    v-on="on"
                  >          
                    <v-sparkline 
                      class="pl-2 pr-2 pt-2"
                      color="#40E0D0"
                      line-width="5"
                      smooth="100"
                      auto-draw
                      type="trend"
                      :value="sparkLineValue"
                    ></v-sparkline>              
                  </v-sheet>
                </template>
                <span>최근 1년간의 추이를 보여줍니다.</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-carousel-item>
        <v-carousel-item class="ml-5">
          <v-row>
            <v-col cols="12" xl="6" lg="6">
              <div><span class="text-h7">저가</span></div>
              <div><span class="text-h7">고가</span></div>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="12" xl="6" lg="6">
              <div><span class="text-h7">거래량</span></div>
              <div><span class="text-h7">ETC</span></div>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IStockModel } from '@/models/stock'
import { IInterestGroup, IInterestGroupItem } from '@/models/interest'
import { mobileHeight } from '@/mixins/tools'

const StockStoreModule = namespace('StockStore')
const InterestStoreModule = namespace('InterestStore')

@Component
export default class StockInfo extends Vue {

  dialog = false
  bookmarked = false
  sparkLineValue =  [1,5,4,8,5,10,2,17]
  expand = 0

  @StockStoreModule.Action('getStock')
  getStock!: (name: string) => Promise<void>

  @StockStoreModule.State('stock')
  stock!: IStockModel

  @InterestStoreModule.Mutation('snackBarOpen')
  snackBarOpen!: () => void

  @StockStoreModule.State('stockLoaded')
  loaded!: boolean

  @InterestStoreModule.State('interestGroups')
  interestGroups!: IInterestGroup[]

  @InterestStoreModule.Mutation('addInterestGroupItem')
  addInterestGroupItem!: (payload: {title: string, item: IInterestGroupItem}) => void

  @InterestStoreModule.Mutation('initInterestGroup')
  readonly initInterestGroup!: () => void

  @InterestStoreModule.Mutation('removeInterestGroupItem')
  removeInterestGroupItem!: (itemTitle: string) => void

  @InterestStoreModule.State('snackBar')
  snackBar!: boolean

  activeBookmarking (group: IInterestGroup, stock: IStockModel): void {
    this.addInterestGroupItem({
      title: group.title,
      item: {
        title: stock.name,
        code: stock.code
      }
    })

    this.dialog = false
    this.bookmarked = true    
    this.snackBarOpen()
  }

  removeBookmarking () {
    console.log('click')
    this.bookmarked = false
    this.removeInterestGroupItem(this.stock.name)
  }

  get mobile () {
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }
      
  created () {    
    this.getStock(this.$route.params.title)
  }
  
}
</script>