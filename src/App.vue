<template>
  <v-app>
    <v-main>
      <v2 />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// import Landing from './components/Landing.vue'
import V2 from './components/V2Component.vue'

export default Vue.extend({
  name: 'App',

  components: {
    // Landing
    V2
  },

  data: () => ({
    //
  }),
});
</script>
