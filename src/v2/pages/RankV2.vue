<template>
  <div id="scroll-target">
    <v-carousel
      :class="[mobile ? 'mt-15 mr-5' : 'mt-5 ml-5']"
      v-model="model"
      mandatory
      show-arrows
      show-arrows-on-hover
      hide-delimiter-background
      hide-delimiters
      width="94%"
      height="100%"
      interval="1000000"
      cycle
    >
      <v-carousel-item
        v-for="(rankType, i) in Object.keys(dailySimpleRanks)"
        :key="i"      
      > 
        <v-card 
          class="ml-15 mr-15">
          <v-card-title class="text-h4 d-flex justify-center font-weight-bold">
            {{ rankTitle[i] }}
            <v-menu 
              open-on-hover
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                  class="ml-5"                
                  x-small
                  icon
                  v-on="on"
                  v-bind="attrs"
                ><v-icon>fa-solid fa-caret-down</v-icon>
              </v-btn>
              </template>

              <v-list>
                <v-list-item                                    
                  v-for="(item, i) in rankTitle"
                  :key="i"
                  @click="model = i"
                >
                  <v-list-item-title> {{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>     
        </v-card>
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
  </div>
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

  btnShow = false
  amount = 10
  model = 0

  @StockStoreModule.State('dailySimpleRanks')
  dailySimpleRanks!: IMarketRank

  @StockStoreModule.State('dailySimpleRanksLoaded')
  loaded!: boolean

  @StockStoreModule.Action('getDailySimpleRanks')  
  readonly getDailySimpleRanks!: () => Promise<void>

  rankTitle = ['시가총액', '상승률', '하락률', '거래량']

  toTop() {
    this.$vuetify.goTo('#scroll-target')
    this.btnShow = false
  }

  handleScroll () {
    let scrollTop = window.pageYOffset 
    this.btnShow = scrollTop > 1500 ? true : false
  }

  created () {
    this.getDailySimpleRanks().then(() => {
      console.log(this.dailySimpleRanks)
    })
  }

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }

  get mobile () {
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }

  changeAmount (amount) {
    this.amount = amount
  }
}
</script>