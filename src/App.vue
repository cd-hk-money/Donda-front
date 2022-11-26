<template>
  <v-app>  
    
    <!--  상단 네이게이션  -->
    <NavBar />

    <!--  메인 뷰  -->
    <v-main>               
      <transition name="slide-fade" mode="out-in">
        <router-view :key="$route.fullPath"/>      
      </transition>  

      <!--  스낵 바  -->
      <SnackBar />
    </v-main>


  </v-app>
</template>

<script lang="ts">

  import { Component } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import SideBar from '@/v2/pages/SideBar.vue'
  import NavBar from '@/v2/pages/NavBar.vue'
  import SnackBar from '@/v2/pages/SnackBar.vue'
  import StoreMixin from '@/mixins/StoreMixin.vue'
  import { getDailySimpleRanks, getSearchTable } from '@/store/payload'


  @Component({
    components: {
      SideBar,
      NavBar,
      SnackBar,
    }
  })
  export default class App extends StoreMixin {
            
    mounted () {
      this.callRequestMarket(getDailySimpleRanks())
      this.callRequestMarket(getSearchTable())
    }

  }
</script>

<style>
html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 0px;
}

.userMenu-active {
  background-color: white;
}

.alram-type {
  font-size: 14px;
}

.alram-value {
  font-size: 14px;
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