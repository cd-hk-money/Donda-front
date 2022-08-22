<template>
  <v-app>     
    <v-main>               
      <div class="d-flex">
        <transition name="slide-fade" mode="out-in">
          <router-view />      
        </transition>  
          <div>
            <menu-bar />             
          </div>
      </div>
      <v-snackbar 
        v-model="SnackBar" timeout="3000"
        @blur="updateState({
          snackBar: false,
          snackBarMessage: ''
        })"  
      >
        {{ snackBarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="error"
            text
            v-bind="attrs"
            @click="updateState({
              snackBar: false,
              snackBarMessage: ''
            })"          
          >
            닫기
          </v-btn>
        </template>
      </v-snackbar>

      <side-bar v-show="mobile"/>
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
import { IUpdateStateModel } from './models/payload'

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
  menuToggle = true
  isMobile = isMobile()
  
  get btnIcon () {
    return this.menuToggle ? 'mdi-arrow-expand-right' : 'mdi-arrow-expand-left'
  }

  get mobile () {
     return this.$vuetify.breakpoint.name === 'xs'
  }

  get SnackBar () {
    return this.snackBar
  }

  set SnackBar (value) {
    this.updateState({
      snackBar: value
    })
  }

  @MarketStoreModule.Action('getTodayMarket') readonly getTodayMarket!: () => Promise<void>
  @MarketStoreModule.Action('getSearchTable') readonly getSearchTable!: () => Promise<void>
  
  @StockStoreModule.Action('getDailySimpleRanks') readonly getDailySimpleRanks!: () => Promise<void>
  @StockStoreModule.State('dailySimpleRanksloaded') rankLoaded!: boolean
  
  @InterestStoreModule.State('snackBar') snackBar!: boolean
  @InterestStoreModule.Mutation('snackBarClose') snackBarClose!: () => void
  @InterestStoreModule.State('snackBarMessage') snackBarMessage!: string
  @InterestStoreModule.Mutation('updateState') updateState!: (payload: IUpdateStateModel) => void

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

.menu-toggle-btn {
  position: fixed;
  right: 10px;
}

body {
  min-height: 100%;
  overflow: hidden;
}

</style>