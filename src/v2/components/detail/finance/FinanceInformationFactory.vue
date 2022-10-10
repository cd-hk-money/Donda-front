<template>
    <v-sheet
    outlined
    max-height="40"
    class="ml-2 pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center"
    rounded="lg"
    color="blue-grey lighten-1"
  >
  <v-icon small class="mr-1">mdi-information</v-icon>
  <slot></slot>
</v-sheet> 
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class  extends Vue {
    
  }
</script>

<style scoped>

</style>