<template>
  <v-app id="inspire">      
    <app-bar />
    <side-bar />
    <v-main class="grey darken-4"> 
      <transition name="fade">
        <router-view />      
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import AppBar from '@/layout/AppBar.vue'
import SideBar from '@/layout/SideBar.vue'
import FloatingNav from '@/layout/FloatingNav.vue'
const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    AppBar,
    SideBar,
    FloatingNav
  }
})
export default class App extends Vue {

  @StockStoreModule.Action('todayMarket')
  private readonly requestTodayMarket!: () => void

  created () {
    this.requestTodayMarket()
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>