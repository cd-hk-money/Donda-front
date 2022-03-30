<template>
  <v-app>
    <v-main>
      <Landing />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Landing from './components/Landing.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Landing
  },

  data: () => ({
    //
  }),
});
</script>
