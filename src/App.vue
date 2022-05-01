<template>
  <v-app id="inspire">     
    <!-- <side-bar v-if="!isMobile"/>  -->
    <!-- <app-bar v-if="!isMobile"/>     -->
    <v-main class="grey darken-4"> 
      <transition name="slide-fade" mode="out-in">
        <router-view />      
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { isMobile } from '@/mixins/tools'

// v1
// import AppBar from '@/layout/AppBar.vue'
import SideBar from '@/layout/SideBar.vue'

// v2
import AppBar from '@/v2/pages/AppBar.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    AppBar,
    SideBar,
  }
})
export default class App extends Vue {

  @StockStoreModule.Action('todayMarket')
  private readonly requestTodayMarket!: () => void
  
  get height() {
    return window.pageXOffset
  }

  private isMobile = isMobile()

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