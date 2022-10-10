<template>
    <v-sheet
    outlined
    max-height="40"
    class="ml-2 pt-3 pb-3 pr-3 pl-3 mt-3 d-flex align-center"
    rounded="lg"    
    :color="color"
  >
  <v-icon small class="mr-1">mdi-information</v-icon>
  <slot></slot>
</v-sheet> 
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  
  @Component
  export default class  extends Vue {
    @Prop({default: 'blue-grey lighten-1'}) color!: string  
  }
</script>

<style scoped>

</style>