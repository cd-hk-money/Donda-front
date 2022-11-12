<template>
  <v-footer
    dark
    padless
    class="d-flex justify-center"
  >
    <v-card
      flat
      tile
      class="white--text text-center flex"
    >
      <v-card-title class="d-flex justify-center"> 
        <v-icon>
          mdi-github
        </v-icon>
      </v-card-title>
      
    </v-card>
  </v-footer>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class  extends Vue {
    
  }
</script>

<style scoped>

</style>