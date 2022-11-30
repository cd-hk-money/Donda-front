<template>
  <v-row>
    <v-card           
      class="rank ml-5 mt-3"
      elevation="0"            
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
        <v-card width="180">
          <v-card-title class="text-h6">Filter</v-card-title>

          <v-divider />

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

          <v-divider />

          <v-card-actions class="d-flex justify-center">
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
      :class="[isMobile ? 'mt-15 mr-5' : 'ml-5']"
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
      <v-carousel-item v-for="(rankType, i) in Object.keys(dailySimpleRanks.data)" :key="i"> 
        <rank-component        
          :title="rankTitle[i]"  
          :contents="dailySimpleRanks.data[rankType].slice(0, amount)"
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
import { Component } from 'vue-property-decorator'
import { mobileHeight } from '@/mixins/tools'

import RankComponent from '@/v2/components/rank/RankComponent.vue'
import StoreMixin from '@/mixins/StoreMixin.vue'
import { getDailySimpleRanks } from '@/store/payload'
import { mixins } from 'vue-class-component'
import DiviceMixin from '@/mixins/DiviceMixin.vue'


@Component({
  components: {
    RankComponent
  }
})
export default class RankV2 extends mixins(StoreMixin, DiviceMixin) {

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
  radioValue = 1

  
  toTop() {
    this.$vuetify.goTo('#scroll-target')
    this.btnShow = false
  }

  handleScroll () {
    let scrollTop = window.pageYOffset 
    this.btnShow = scrollTop > 1500 ? true : false
  }
 
  changeAmount (amount) {
    this.amount = amount
  }

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    if (!this.dailySimpleRanks.data) {
      this.callRequestMarket(getDailySimpleRanks())
    }
  }
  
}
</script>

<style scoped>
.rank {
  margin-left: px;
}

</style>