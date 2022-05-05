<template>
  <v-app id="inspire">     
    <!-- <side-bar v-if="!isMobile"/>  -->
    <!-- <app-bar v-if="!isMobile"/>     -->
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
          <!-- <interest-toggle v-if="!rankLoaded"/>           -->
        </v-col>
      </v-row>
    </v-main>
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


@Component({
  components: {
    SideBar,
    MenuBar,
    InterestToggle    
  }
})
export default class App extends Vue {

  @StockStoreModule.Action('todayMarket')
  private readonly requestTodayMarket!: () => void
  
  get height() {
    return window.pageXOffset
  }

  @MarketStoreModule.Action('getTodayMarket')
  public getTodayMarket!: () => Promise<void>

  @MarketStoreModule.Action('getSearchTable')
  public getSearchTable!: () => Promise<void>

  @MarketStoreModule.Action('getRecommend')
  public getRecommend!: () => Promise<void>
  
  @StockStoreModule.Action('getDailySimpleRanks')
  private getDailySimpleRanks!: () => Promise<void>

  @StockStoreModule.State('dailySimpleRanksloaded')
  private rankLoaded!: boolean

  private isMobile = isMobile()

  created () {
    this.getDailySimpleRanks()  
    this.getTodayMarket()  
    this.getSearchTable()
    this.getRecommend()
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