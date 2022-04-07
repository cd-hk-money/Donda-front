<template>
  <v-app id="inspire">      
    <app-bar />
    <v-main class="grey darken-4"> 
      <router-view />        
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/layout/AppBar.vue'

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
</style>