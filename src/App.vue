<template>
  <v-app id="inspire">
    <v-main>
      <app-bar />
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
    AppBar
  },

  data: () => ({

  }),

});
</script>

