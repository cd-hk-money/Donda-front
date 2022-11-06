<template>
  <v-app>     
    <NavBar />
    <v-main>               
      <transition name="slide-fade" mode="out-in">
        <router-view />      
      </transition>  
      <SnackBar />
    </v-main>
    <Footer v-if="mobile" />
  </v-app>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import SideBar from '@/v2/pages/SideBar.vue'
  import MenuBar from '@/v2/pages/MenuBar.vue'
  import NavBar from '@/v2/pages/NavBar.vue'
  import SnackBar from '@/v2/pages/SnackBar.vue'
  import Footer from '@/v2/pages/Footer.vue'

  const StockStoreModule = namespace('StockStore')
  const MarketStoreModule = namespace('MarketStore')

  @Component({
    components: {
      SideBar,
      MenuBar,
      NavBar,
      SnackBar,
      Footer
    }
  })
  export default class App extends Vue {

    @MarketStoreModule.Action('getTodayMarket') readonly getTodayMarket!: () => Promise<void>
    @MarketStoreModule.Action('getSearchTable') readonly getSearchTable!: () => Promise<void>    
    @StockStoreModule.Action('getDailySimpleRanks') readonly getDailySimpleRanks!: () => Promise<void>
    @StockStoreModule.State('dailySimpleRanksloaded') rankLoaded!: boolean

    get mobile () {
      return this.$vuetify.breakpoint.name === 'xs'
    }

    async created () {
      await this.getDailySimpleRanks()  
      await this.getTodayMarket()  
      await this.getSearchTable()
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

.stockinfo-progress-circular {
  top: 50%;
  left: 50%;
  right: 50%;
  position: absolute;
}

</style>