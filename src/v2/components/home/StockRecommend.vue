<template>    
  <v-card
    class="ml-5 mr-5 align-center justify-center"
    height="410"
    width="auto"
    rounded="xl"
    elevation="3"
    v-if="!loaded"
  >
    <v-card-title             
      class="text-h4 font-weight-bold ml-5">
      추천 종목
        <v-btn
          icon      
          large
          @click="overlay = !overlay"
        >
          <v-icon>fa-solid fa-circle-info</v-icon>
        </v-btn>
    </v-card-title>    

    <v-card-subtitle class="ml-5">
      추천 종목을 확인 해 보세요.
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-carousel 
      hide-delimiter-background
      hide-delimiters
      show-arrows-on-hover
      height="310"
      cycle
      vertical
    >
      <v-carousel-item
        v-for="(content, i) in recommendArray"
        :key="i"
      >
        <v-row class="d-flex justify-center align-center">
          <v-col
            v-for="(item, j) in content"
            :key="j"
            cols="12" xl="6" ml="6"
          >
            <v-card           
              class="mt-5 ml-5 mr-5"
              height="100%"
              width="94%"
              rounded="xl"
              elevation="2"
              link
              :to="`/detail/${item.name}`"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">
                    KOSPI
                  </div>
                  <v-list-item-title class="text-h4 font-weight-bold m-1 ml-5">
                    <span>{{ item.name }}</span>                        
                    <v-tooltip right>
                      <template v-slot:activator="{on}">
                        <v-icon v-on="on" size="30" class="ml-5" color="red">fa-solid fa-arrow-trend-up</v-icon>
                      </template>
                      <span class="red--text font-weight-bold">상승</span> 
                      <span> 추세입니다.</span>
                    </v-tooltip>
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-h5 mb-1 ml-6">
                    {{ item.code }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar>
                  <v-btn icon x-large>
                    <v-icon size="40">mdi-bookmark-outline</v-icon>
                  </v-btn>
                </v-list-item-avatar>                              
              </v-list-item>

              <v-divider></v-divider>    

              <v-row>
                <v-col cols="12" xl="5" lg="5">
                  <v-card-title class="text-h5 font-weight-bold ml-5">
                    <span> {{ item.close }} ₩</span>
                    <v-btn  
                      class="ml-3"
                      icon
                      right
                      x-small
                    ><v-icon>fa-solid fa-circle-info</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-subtitle :class="['text-h6', 'font-weight-bold', 'ml-5',  item.changes_ratio > 0 ? 'red--text' : 'blue--text']">
                    <span> {{ item.changes_ratio > 0 ? '+' : ''}}{{ item.changes_ratio }} %</span>                        
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
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <v-overlay 
      :value="overlay"
      absolute
      opacity="0.88"
    >
      <div>
        추천 종목 기준에 대해, 어떤 기업을 선택하면 좋은지에 대해 설명
      </div>
      <div class="d-flex justify-center">
        <v-btn 
          bottom
          @click="overlay = false">
          닫기
        </v-btn>
      </div>
    </v-overlay>
  </v-card>
</template>

<script lang="ts">
import { StockRecommendModel } from '@/models/stock'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const MarketStoreModule = namespace('MarketStore')

@Component
export default class StockRecommend extends Vue {

  sparkLineValue = [1, 11, 3, 4, 5, 7, 5, 9, 1, 5, 16]
  model = null
  overlay = false

  @MarketStoreModule.State('recommend')
  recommend!: StockRecommendModel[]

  @MarketStoreModule.State('recommedLoaded')
  loaded!: boolean

  @MarketStoreModule.Action('getRecommend')
  readonly getRecommend!: () => Promise<void>

  @MarketStoreModule.Getter('recommendArray')
  recommendArray!: any
    
  created () {    
    this.getRecommend()
  }
}
</script>