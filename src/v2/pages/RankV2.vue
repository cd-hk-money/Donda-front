<template>
  <div id="scroll-target">
    <v-carousel
    class="ml-5 mt-5"
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
        v-for="rankType in Object.keys(dailySimpleRanks)"
        :key="rankType"      
      >
        <rank-component
          :type="rankType"
          :contents="dailySimpleRanks[rankType].slice(0, amount)"
          @seeMore="amount = 50"
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
}
</script>