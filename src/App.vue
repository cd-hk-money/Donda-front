<template>
  <v-app id="inspire">     
    <v-main>       
      <v-row>
        <v-col cols="12" xl="10" lg="10">
          <transition name="slide-fade" mode="out-in">
            <router-view />      
            </transition>
          </v-col>
          <v-col cols="12" xl="2" lg="2">
              <menu-bar />   
              <side-bar />              
          </v-col>
      </v-row>
    </v-main>
    <v-snackbar   
      v-model="snackBar"
    >
      그룹 추가 성공
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackBarClose"
        >
          닫기
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { isMobile } from '@/mixins/tools'

import SideBar from '@/v2/pages/SideBar.vue'
import MenuBar from '@/v2/pages/MenuBar.vue'
import InterestToggle from '@/v2/pages/InterestToggle.vue'

// v2

const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')
const InterestStoreModule = namespace('InterestStore')

@Component({
  components: {
    SideBar,
    MenuBar,
    InterestToggle    
  }
})
export default class App extends Vue {

  timeout = 2000
  get height() {
    return window.pageXOffset
  }

  @StockStoreModule.Action('todayMarket')
  private readonly requestTodayMarket!: () => void

  @MarketStoreModule.Action('getTodayMarket')
  readonly getTodayMarket!: () => Promise<void>

  @MarketStoreModule.Action('getSearchTable')
  readonly getSearchTable!: () => Promise<void>
  
  @StockStoreModule.Action('getDailySimpleRanks')
  readonly getDailySimpleRanks!: () => Promise<void>

  @StockStoreModule.State('dailySimpleRanksloaded')
  rankLoaded!: boolean

  @InterestStoreModule.State('snackBar')
  snackBar!: boolean

  @InterestStoreModule.Mutation('snackBarClose')
  snackBarClose!: () => void

  isMobile = isMobile()

  created () {
    this.getDailySimpleRanks()  
    this.getTodayMarket()  
    this.getSearchTable()
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

/* .fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: all .2s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
} */

/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /{
  opacity: 0;
} */

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

</style>