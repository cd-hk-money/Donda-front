<template>
  <v-tooltip bottom>
    <template v-slot:activator="{on, attrs}">
      <v-btn 
        v-on="on"
        v-bint="attrs"
        icon class="btn-badge">
        <v-icon x-small>
          fa-solid fa-circle-question
        </v-icon>
      </v-btn>
    </template>
    <span> {{ tooltipMessage }} </span>
  </v-tooltip>
</template>

<script lang="ts">    
import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class BtnBadge extends Vue {
    @Prop() tooltipMessage!: string
    
  }
</script>

<style scoped>
.btn-badge {
  max-width: 12px; 
  max-height: 12px;
  bottom: 10px;
}
</style>