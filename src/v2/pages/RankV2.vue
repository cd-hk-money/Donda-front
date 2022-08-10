<template>
  <v-row>
    <v-card     
      class="mt-5 menu"
      elevation="0"      
      outlined
      width="100%"
    >
      <v-card-title class="text-h4 d-flex justify-center font-weight-bold">
        {{ rankTitle[model] }} TOP 10
      </v-card-title>    
      <v-menu 
        v-model="filterMenu"
        transition="scale-transition"
        origin="center center"
        offset-x
        :close-on-content-click="false"
        :nudge-width="300"            
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
        <v-btn 
          v-on="on"
          v-bind="attrs"
          left top absolute icon outlined 
          elevation="0" 
        >
          <v-icon>mdi-format-line-spacing</v-icon>
        </v-btn> 
        </template>
        <v-card>
          <v-card-title class="text-h6">Filter</v-card-title>

          <v-divider></v-divider>

          <v-row>
            <v-col cols="12" xl="6">
              <v-radio-group 
                class="ml-3"
                v-model="radioValue">
                <v-radio
                  v-for="(title, n) in rankTitle"
                  :key="n"
                  :label="title"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>            
          </v-row>

          <v-divider></v-divider>


          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="filterMenu = false"
            >
              취소
            </v-btn>
            <v-btn                  
              text
              @click="(filterMenu = false, model = radioValue)"
            >
              적용
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-card>
    <v-carousel
      :class="[mobile ? 'mt-15 mr-5' : 'ml-5']"
      v-model="model"
      mandatory
      :show-arrows="false"
      hide-delimiter-background
      hide-delimiters
      width="100%"
      height="100%"
      interval="1000000"
      cycle
    >
      <v-carousel-item
        v-for="(rankType, i) in Object.keys(dailySimpleRanks)"
        :key="i"      
      > 
        <rank-component        
          :title="rankTitle[i]"  
          :contents="dailySimpleRanks[rankType].slice(0, amount)"
          @seeMore="changeAmount"
        />        
      </v-carousel-item>
    </v-carousel>
    <transition name="fade">
      <v-btn 
        class="mr-20"  
        fixed
        v-if="btnShow"
        bottom
        right
        fab
        @click="toTop"
        rounded
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </transition>
  </v-row>
</template>

<script lang="ts">
import { IMarketRank } from '@/models/stock'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

import RankComponent from '@/v2/components/rank/RankComponent.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    RankComponent
  }
})
export default class RankV2 extends Vue {

  // toTop 버튼 표시 유무
  btnShow = false

  // 랭크 필터 메뉴
  filterMenu = false

  // 랭크 리스트 개수 
  amount = 10

  // 초기 필터
  model = 0

  // 필터 메뉴들
  rankTitle = ['시가총액', '상승률', '하락률', '거래량']

  // 초기 라디오 값
  radioValue: any = '시가총액'

  @StockStoreModule.State('dailySimpleRanks') dailySimpleRanks!: IMarketRank
  @StockStoreModule.State('dailySimpleRanksLoaded') loaded!: boolean
  @StockStoreModule.Action('getDailySimpleRanks') readonly getDailySimpleRanks!: () => Promise<void>


  toTop() {
    this.$vuetify.goTo('#scroll-target')
    this.btnShow = false
  }

  handleScroll () {
    let scrollTop = window.pageYOffset 
    this.btnShow = scrollTop > 1500 ? true : false
  }
 


  get mobile () {
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }

  changeAmount (amount) {
    this.amount = amount
  }

  created () {
    this.getDailySimpleRanks().then(() => {
      console.log(this.dailySimpleRanks)
    })
  }

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
.menu {
  margin-left: 80px;
  margin-right: 60px;
}
</style>