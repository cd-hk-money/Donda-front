<template>
  <v-app 
    class="grey darken-4"
    id="inspire">     
    <side-bar /> 
    <app-bar />    
    <v-main class="grey darken-4"> 
      <transition name="slide-fade" mode="out-in">
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