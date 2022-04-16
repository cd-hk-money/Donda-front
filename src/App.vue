<template>
  <v-app id="inspire">      
    <app-bar />
    <v-main class="grey darken-4"> 
      <transition name="fade">
        <router-view />      
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/layout/AppBar.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
  },

  data: () => ({

  }),

});
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